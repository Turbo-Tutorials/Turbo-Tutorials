import {
  EnhancerBuilder,
  CanvasClient,
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
  enhance,
} from "@uniformdev/canvas";

import { getContentfulClient, enhanceContentfulItem } from "../enhancers/helpers"
import { getVideoMeta } from "../enhancers/youtube"

export default function handler(request, response) {

  const { slug } = request.query

  const canvas = new CanvasClient({
    apiKey: process.env.UNIFORM_API_KEY,
    apiHost: process.env.UNIFORM_API_HOST,
    projectId: process.env.UNIFORM_PROJECT_ID,
  });

  const { composition } = await canvas.getCompositionBySlug({
    slug: "/tt",
    state: process.env.NODE_ENV === "development" ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
  });

  const ctfClient = getContentfulClient();

  const tutorials = await ctfClient.getEntries({
    content_type: "turboTutorial",
    "fields.slug[match]": slug,
  });

  const tutorial = enhanceContentfulItem(tutorials.items[0]);
  const videoMeta = await getVideoMeta(tutorial.videoId, true)

  const video = {
    ...tutorial,
    ...videoMeta
  }

  const comments = video.comments

  const selectedTags = tutorial.tags.join(",");

  const tutorialsForTagsData = await ctfClient.getEntries({
    content_type: "turboTutorial",
    "metadata.tags.sys.id[all]": tutorial.tags[0],
    "sys.id[nin]": tutorials.items[0].sys.id,
    limit: 3,
  });

  const relatedTutorials = tutorialsForTagsData.items.map((item) => enhanceContentfulItem(item));

  const enhancers = new EnhancerBuilder()
    .data("selectedTags", () => {
      return selectedTags;
    })
    .data("complexity", () => {
      return tutorial.complexity;
    })
    .component("turboTutorial", (turboTutorial) =>
      turboTutorial.data("metadata", () => {
        return {
          type: "video",
          title: tutorial.title,
          description: tutorial.description,
          image: tutorial.poster.src,
          publicationDate: tutorial.publicationDate,
          canonical: `https://timbenniks.dev/turbo-tutorial/${slug}`,
          structuredData: {
            "@context": "http://schema.org",
            "@type": "VideoObject",
            name: tutorial.title,
            description: tutorial.description,
            thumbnailUrl: [tutorial.poster.src],
            embedUrl: `https://www.youtube.com/embed/${tutorial.videoId}`,
            contentUrl: `https://timbenniks.dev/turbo-tutorial/${slug}`,
            uploadDate: tutorial.publicationDate,
          },
        };
      })
    )
    .component("ttTitle", (ttTitle) =>
      ttTitle.data("title", () => {
        return tutorial.title
      })
    )
    .component("ttComments", (ttComments) =>
      ttComments.data("commentsData", () => {
        return {
          videoId: video.videoId,
          meta: video.meta,
          comments
        }

      })
    )
    .component("ttVideo", (ttVideo) =>
      ttVideo.data("video", () => {
        const res = video

        video.comments = null
        delete video.comments

        return res;
      })
    )
    .component("ttSimilar", (ttSimilar) =>
      ttSimilar.data("similar", () => {
        return relatedTutorials;
      })
    );

  await enhance({
    composition,
    enhancers,
  });

  //return composition

  response.status(200).json({
    composition
  })
})