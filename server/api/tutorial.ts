import { H3Event } from 'h3';
import { createClient } from "contentful";

import {
  EnhancerBuilder,
  CanvasClient,
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
  enhance,
} from "@uniformdev/canvas";

import { getContentfulClient, enhanceContentfulItem } from "../../enhancers/helpers"

export default defineEventHandler(async (event: H3Event) => {
  const { slug } = useQuery(event)

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
        return {
          title: tutorial.title,
        };
      })
    )
    .component("ttVideo", (ttVideo) =>
      ttVideo.data("video", () => {
        return tutorial;
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

  return composition
})