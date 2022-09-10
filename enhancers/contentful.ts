import {
  createContentfulEnhancer,
  createContentfulQueryEnhancer,
  ContentfulClientList,
} from "@uniformdev/canvas-contentful";

import pkg from "contentful";
const { createClient } = pkg;
// import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import * as duration from 'duration-fns'

export { CANVAS_CONTENTFUL_PARAMETER_TYPES, CANVAS_CONTENTFUL_QUERY_PARAMETER_TYPES } from "@uniformdev/canvas-contentful";

export const contentfulEnhancer = () => {
  const { public: { contentfulSpaceId, contentfulDeliveryApiKey, contentfulEnvironment } } = useRuntimeConfig()

  const contentfulClient = createClient({
    space: contentfulSpaceId,
    environment: contentfulEnvironment,
    accessToken: contentfulDeliveryApiKey,
  });

  return createContentfulEnhancer({
    client: contentfulClient,
    createQuery: ({ defaultQuery }) => {
      return {
        ...defaultQuery,
        select: "fields,metadata.tags",
      };
    },
  });
};

export function enhanceContentfulItem(item) {
  const entry = contentfulModelConverter({
    parameter: { value: item },
  });

  return entry;
}

export const contentfulQueryEnhancer = () => {
  const { public: { contentfulSpaceId, contentfulDeliveryApiKey, contentfulEnvironment } } = useRuntimeConfig()

  const client = createClient({
    space: contentfulSpaceId,
    environment: contentfulEnvironment,
    accessToken: contentfulDeliveryApiKey,
  });

  const clientList = new ContentfulClientList({ client });

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

  const {
    public: {
      contentfulSpaceId,
      contentfulDeliveryApiKey,
      contentfulEnvironment
    }
  } = useRuntimeConfig()

  const client = createClient({
    space: contentfulSpaceId,
    environment: contentfulEnvironment,
    accessToken: contentfulDeliveryApiKey,
  });

  const tutorialListByTags = await client.getEntries({
    content_type: "turboTutorial",
    "metadata.tags.sys.id[all]": tags.value,
    order: "-fields.publicationDate",
    limit: limit.value,
  });

  return tutorialListByTags.items.map(item => enhanceContentfulItem(item))
}

export const tutorialYouTubeEnhancer = async ({ component, parameter }) => {
  if (component.type !== 'tutorialList') {
    return parameter.value
  }

  const getVideoSpecs = async (id: string) => {
    const result = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${id}&key=${process.env.YOUTUBE_KEY}`)
    const data = await result.json();
    const durationRaw = data.items[0].contentDetails.duration;
    const durationObj = duration.parse(durationRaw)
    const { viewCount, likeCount, commentCount } = data.items[0].statistics

    return {
      duration: `${durationObj.minutes}:${durationObj.seconds}`,
      views: Number(viewCount),
      likes: Number(likeCount),
      comments: Number(commentCount)
    }
  }

  const enhanceTutorials = async () => {
    const result = await Promise.all(parameter.value.map(async (tutorial) => {
      const videoSpecs = await getVideoSpecs(tutorial.videoId)

      return {
        ...tutorial,
        ...videoSpecs
      }
    }))

    return result;
  }

  parameter.value = await enhanceTutorials();
  return parameter.value;
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
        content[fieldKey] = html;
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