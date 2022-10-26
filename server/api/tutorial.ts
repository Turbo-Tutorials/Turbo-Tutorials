import { H3Event } from 'h3';
import algoliarecommend from '@algolia/recommend';

import {
  EnhancerBuilder,
  CanvasClient,
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
  enhance,
} from "@uniformdev/canvas";

import { getContentfulClient, enhanceContentfulItem } from "../../enhancers/helpers"
import { getVideoMeta } from "../../enhancers/youtube"

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
  const videoMeta = await getVideoMeta(tutorial.videoId, false)

  const video = {
    ...tutorial,
    ...videoMeta as object
  }

  const selectedTags = tutorial.tags.join(",");

  // Algolia recommend. Only possible when more than 10 tutorials
  const { public: { algoliaId, algoliaSearchApi, algoliaIndex } } = useRuntimeConfig()
  const algoliaClient = algoliarecommend(
    algoliaId,
    algoliaSearchApi
  )

  const relatedTutorials = await algoliaClient.getRelatedProducts([
    {
      indexName: algoliaIndex,
      objectID: tutorial.slug,
      maxRecommendations: 3,
      threshold: 60
    },
  ])

  // const tutorialsForTagsData = await ctfClient.getEntries({
  //   content_type: "turboTutorial",
  //   "metadata.tags.sys.id[all]": tutorial.tags[0],
  //   "sys.id[nin]": tutorials.items[0].sys.id,
  //   limit: 3,
  // });

  // const relatedTutorials = tutorialsForTagsData.items.map((item) => enhanceContentfulItem(item));

  function getEducationalLevel(complexity) {
    let result = ''

    switch (complexity) {
      case "easy":
        result = 'beginner'
        break;

      case "intermediate":
        result = 'Intermediate'
        break;

      case "complex":
        result = 'Advanced'
        break;
    }

    return result
  }

  const enhancers = new EnhancerBuilder()
    .data("selectedTags", () => {
      return selectedTags;
    })
    .data("complexity", () => {
      return tutorial.complexity;
    })
    .data("videoId", () => {
      return tutorial.videoId;
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
            "@type": ["VideoObject", "LearningResource"],
            name: tutorial.title,
            description: tutorial.description,
            learningResourceType: "How-to",
            educationalLevel: getEducationalLevel(tutorial.complexity),
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
    // there are fetched client side
    .component("ttComments", (ttComments) =>
      ttComments.data("commentsData", () => {
        return {
          videoId: video.videoId,
          meta: video.meta,
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
        return relatedTutorials.results[0].hits;
      })
    );

  await enhance({
    composition,
    enhancers,
    context: { preview: false }
  });

  return composition
})