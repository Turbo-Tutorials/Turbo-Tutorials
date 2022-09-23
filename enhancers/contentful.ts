import {
  createContentfulEnhancer,
  createContentfulQueryEnhancer,
  ContentfulClientList,
} from "@uniformdev/canvas-contentful";

import { getContentfulClient, enhanceContentfulItem } from './helpers'
export { CANVAS_CONTENTFUL_PARAMETER_TYPES, CANVAS_CONTENTFUL_QUERY_PARAMETER_TYPES } from "@uniformdev/canvas-contentful";
import { getVideoMeta } from "./youtube"

export const contentfulEnhancer = () => {
  return createContentfulEnhancer({
    client: getContentfulClient(),
    createQuery: ({ defaultQuery }) => {
      return {
        ...defaultQuery,
        select: "fields,metadata.tags",
      };
    },
  });
};

export const contentfulQueryEnhancer = () => {
  const clientList = new ContentfulClientList({ client: getContentfulClient() });

  return createContentfulQueryEnhancer({
    clients: clientList,
    createQuery: ({ defaultQuery }) => {
      return {
        ...defaultQuery,
        select: "fields,metadata.tags",
      };
    },
  });
};

export const contentfulTutorialListByTagsEnhancer = async ({ component }) => {
  const { tags, limit } = component.parameters

  const client = getContentfulClient()

  const tutorialListByTags = await client.getEntries({
    content_type: "turboTutorial",
    "metadata.tags.sys.id[all]": tags.value,
    order: "-fields.publicationDate",
    limit: limit.value,
  });

  const enhanceTutorials = async () => {
    const result = await Promise.all(tutorialListByTags.items.map(async (item) => {
      const tutorial = enhanceContentfulItem(item)
      const videoMeta = await getVideoMeta(tutorial.videoId, false)

      return {
        ...tutorial,
        ...videoMeta
      }
    }))

    return result
  }

  return await enhanceTutorials()
}