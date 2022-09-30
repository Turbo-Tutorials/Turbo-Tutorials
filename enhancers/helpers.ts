import contentful from "contentful"
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export function getContentfulClient() {
  const { public: { contentfulSpaceId, contentfulDeliveryApiKey, contentfulEnvironment } } = useRuntimeConfig()
  return contentful.createClient({
    space: contentfulSpaceId,
    environment: contentfulEnvironment,
    accessToken: contentfulDeliveryApiKey,
  });
}

export function enhanceContentfulItem(item) {
  const entry = contentfulModelConverter({
    parameter: { value: item },
  });

  return entry;
}

export const contentfulModelConverter = ({ parameter }) => {
  const entries = parameter.value;
  let result = null;

  if (entries.fields) {
    result = transformContentfulFields(entries);
  } else {
    result = [];
    entries.forEach((entry) => {
      result.push(transformContentfulFields(entry));
    });
  }

  parameter.value = result;

  return parameter.value;
};

function transformContentfulFields(entry) {
  if (entry) {
    const content = { ...entry.fields };

    Object.keys(content).map((fieldKey) => {
      if (
        Array.isArray(content[fieldKey]) &&
        content[fieldKey].length > 0 &&
        content[fieldKey][0]?.sys?.type === "Asset"
      ) {
        const transformedImages = content[fieldKey].map((asset) =>
          transformContentfulImage(asset)
        );
        content[fieldKey] = transformedImages;
      } else if (Array.isArray(content[fieldKey])) {
        const flattenedFields = content[fieldKey].map((entry) => {
          return { ...entry.fields };
        });
        content[fieldKey] = flattenedFields;
      } else if (content[fieldKey]?.sys?.type === "Asset") {
        content[fieldKey] = transformContentfulImage(content[fieldKey]);
      } else if (content[fieldKey]?.nodeType === "document") {
        const html = documentToHtmlString(content[fieldKey]);
        content[fieldKey] = html.replace(/\n/g, "<br />");
      }
    });

    const metadata = [...entry.metadata.tags];

    content.tags = metadata.map(tag => {
      return tag.sys.id
    })

    return content;
  }
}

function transformContentfulImage(imageField) {
  let imageUrl = imageField?.fields?.file?.url;
  if (imageUrl.startsWith("//")) {
    imageUrl = imageUrl.replace("//", "https://");
  }
  return {
    src: imageUrl,
    alt: imageField?.fields?.title,
    width: imageField?.fields?.file?.details?.image?.width,
    height: imageField?.fields?.file?.details?.image?.height,
  };
}