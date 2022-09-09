import type { Ref } from "vue"
import { compose, enhance, CompositionGetResponse, EnhancerBuilder } from "@uniformdev/canvas";
import { contentfulEnhancer, contentfulQueryEnhancer, contentfulModelConverter, contentfulTutorialListByTagsEnhancer, CANVAS_CONTENTFUL_PARAMETER_TYPES, CANVAS_CONTENTFUL_QUERY_PARAMETER_TYPES } from "../enhancers/contentful";
import { cloudinaryEnhancer, CLOUDINARY_PARAMETER_TYPES } from "../enhancers/cloudinary";

export async function useEnhance(composition: Ref<CompositionGetResponse>) {
  const { data, pending, error } = await useAsyncData('composition', async () => {
    const compositionClone = { ...composition.value.composition }

    await enhance({
      composition: compositionClone,
      enhancers: new EnhancerBuilder()
        .parameterType(CANVAS_CONTENTFUL_PARAMETER_TYPES,
          compose(contentfulEnhancer(), contentfulModelConverter))
        .parameterType(CANVAS_CONTENTFUL_QUERY_PARAMETER_TYPES,
          compose(contentfulQueryEnhancer(), contentfulModelConverter))
        .parameterType(CLOUDINARY_PARAMETER_TYPES, cloudinaryEnhancer())
        .component("tutoriallistbytags", (tutoriallistbytags) =>
          tutoriallistbytags.data("entry", contentfulTutorialListByTagsEnhancer)
        ),
      context: {},
    });

    return compositionClone
  });

  return { data, pending, error };
}