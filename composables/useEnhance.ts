import type { Ref } from "vue"
import { compose, enhance, CompositionGetResponse, EnhancerBuilder } from "@uniformdev/canvas";
import { cloudinaryEnhancer, CLOUDINARY_PARAMETER_TYPES } from "../enhancers/cloudinary";
import { algoliaQueryEnhancer, CANVAS_ALGOLIA_QUERY_PARAMETER_TYPES } from "../enhancers/algolia";
import { contentfulModelConverter } from "../enhancers/helpers"
import { tutorialYouTubeEnhancer } from "../enhancers/youtube"

import {
  contentfulEnhancer,
  contentfulQueryEnhancer,
  CANVAS_CONTENTFUL_PARAMETER_TYPES,
  CANVAS_CONTENTFUL_QUERY_PARAMETER_TYPES
} from "../enhancers/contentful";

export async function useEnhance(composition: Ref<CompositionGetResponse>, slug: string) {
  const { data, pending, error } = await useAsyncData(`composition-enhancer-${slug}`, async () => {
    const compositionClone = { ...composition.value.composition }

    await enhance({
      composition: compositionClone,
      enhancers: new EnhancerBuilder()
        .parameterType(CANVAS_CONTENTFUL_PARAMETER_TYPES,
          compose(
            contentfulEnhancer(),
            contentfulModelConverter
          )
        )
        .parameterType(CANVAS_CONTENTFUL_QUERY_PARAMETER_TYPES,
          compose(
            contentfulQueryEnhancer(),
            contentfulModelConverter,
            tutorialYouTubeEnhancer
          )
        )
        .parameterType(CLOUDINARY_PARAMETER_TYPES, cloudinaryEnhancer())
        .parameterType(CANVAS_ALGOLIA_QUERY_PARAMETER_TYPES, algoliaQueryEnhancer()),
      context: {},
    });

    return compositionClone
  });

  return { data, pending, error };
}