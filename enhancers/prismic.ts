import { createPrismicEnhancer, PrismicClientList } from '@uniformdev/canvas-prismic';
import * as Prismic from '@prismicio/client';
import PrismicDOM from 'prismic-dom';
export { CANVAS_PRISMIC_PARAMETER_TYPES } from "@uniformdev/canvas-prismic";

const endpoint = Prismic.getEndpoint('turbo-tutorials');
const client = Prismic.createClient(endpoint);
const clientList = new PrismicClientList({ client });

export const prismicEnhancer = () => {
  return createPrismicEnhancer({ clients: clientList });
}

export const prismicModelConverter = ({ parameter }) => {
  const { data } = parameter.value
  const content = { ...data };

  Object.keys(content).map((fieldKey) => {
    if (Array.isArray(content[fieldKey])) {
      content[fieldKey] = PrismicDOM.RichText.asHtml(content[fieldKey])
    }
  })

  parameter.value = content
  return parameter.value;
}