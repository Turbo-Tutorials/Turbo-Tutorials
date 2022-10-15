import { H3Event } from 'h3';
import { compose, enhance, CompositionGetResponse, EnhancerBuilder } from "@uniformdev/canvas";
import { cloudinaryEnhancer, CLOUDINARY_PARAMETER_TYPES } from "../../enhancers/cloudinary";
import { algoliaQueryEnhancer, CANVAS_ALGOLIA_QUERY_PARAMETER_TYPES } from "../../enhancers/algolia";
import { contentfulModelConverter } from "../../enhancers/helpers"
import { tutorialYouTubeEnhancer } from "../../enhancers/youtube"
import {
  contentfulEnhancer,
  contentfulQueryEnhancer,
  CANVAS_CONTENTFUL_PARAMETER_TYPES,
  CANVAS_CONTENTFUL_QUERY_PARAMETER_TYPES
} from "../../enhancers/contentful";

import {
  prismicEnhancer,
  prismicModelConverter,
  CANVAS_PRISMIC_PARAMETER_TYPES
} from "../../enhancers/prismic"

export default defineEventHandler(async (event: H3Event) => {
  const body = await useBody(event)
  const compositionClone = body.composition

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
      .parameterType(CANVAS_PRISMIC_PARAMETER_TYPES,
        compose(
          prismicEnhancer(),
          prismicModelConverter
        )
      )
      .parameterType(CLOUDINARY_PARAMETER_TYPES, cloudinaryEnhancer())
      .parameterType(CANVAS_ALGOLIA_QUERY_PARAMETER_TYPES, algoliaQueryEnhancer()),
    context: {},
  });

  return compositionClone
})