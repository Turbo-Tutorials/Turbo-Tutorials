import algoliasearch from "algoliasearch";
import { getContentfulClient, enhanceContentfulItem } from "../../enhancers/helpers"
import { getVideoMeta } from "../../enhancers/youtube"

export default defineEventHandler(async () => {
  const algoliaClient = algoliasearch(
    process.env.ALGOLIA_ID,
    process.env.ALGOLIA_ADMIN_API_KEY
  )

  const ctfClient = getContentfulClient();
  const rawTutorials = await ctfClient.getEntries({
    content_type: "turboTutorial",
  });

  const enhanceTutorials = async () => {
    const result = await Promise.all(rawTutorials.items.map(async (item) => {
      const tutorial = enhanceContentfulItem(item)
      const videoMeta = await getVideoMeta(tutorial.videoId, false)

      return {
        ...tutorial,
        ...videoMeta
      }
    }))

    return result
  }

  const tutorials = await enhanceTutorials()

  const algoliaReadyResults = tutorials.map((tutorial) => {
    return {
      objectID: tutorial.slug,
      ...tutorial,
    }
  })

  const algoliaIndex = algoliaClient.initIndex(process.env.ALGOLIA_INDEX)

  const algoliaObjectIds = await algoliaIndex
    .saveObjects(algoliaReadyResults)
    .catch((err) => console.log(err))

  if (algoliaObjectIds) {
    return {
      message:
        'The Algolia turbo_tutorials index has been updated with all tutorials from Contentful.',
    }
  }
  else {
    return {
      message:
        'Something went belly-up',
    }
  }
})