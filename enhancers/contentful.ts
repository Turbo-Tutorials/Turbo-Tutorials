import {
  createContentfulEnhancer,
  createContentfulQueryEnhancer,
  ContentfulClientList,
} from "@uniformdev/canvas-contentful";

import { getContentfulClient } from './helpers'
export { CANVAS_CONTENTFUL_PARAMETER_TYPES, CANVAS_CONTENTFUL_QUERY_PARAMETER_TYPES } from "@uniformdev/canvas-contentful";

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