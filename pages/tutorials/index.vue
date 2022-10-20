<script setup lang="ts">
import { resolveRenderer } from "../../components/componentMapping";
import {
  useCompositionInstance,
  createApiEnhancer,
} from "@uniformdev/canvas-vue";

const route = useRoute();
const { $useComposition } = useNuxtApp();
const slug = "/tutorials";

const { data: rawComposition } = await $useComposition({ slug });
const { data: enhancedComposition } = await useEnhance(
  rawComposition.value?.composition,
  slug as string
);
const { composition } = useCompositionInstance({
  composition: enhancedComposition.value.composition,
  enhance: createApiEnhancer({
    apiUrl: "/api/enhance",
  }),
});

if (!composition.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const title = composition.value?.parameters?.title?.value || "No Title";
const description = composition.value?.parameters?.description?.value || "";
const image = composition.value?.parameters?.image;

usePageMeta({
  title: title as string,
  description: description as string,
  slug: route.params.slug as string,
  image:
    (image?.value[0]?.baseurl.replace(
      "image/upload/",
      "image/upload/w_1200,"
    ) as string) || "",
});
</script>

<template>
  <main class="max-w-[1440px] mx-auto pt-36 md:pt-48">
    <GlobalHeader />
    <Composition
      v-if="composition"
      :data="composition"
      :resolve-renderer="resolveRenderer"
      behaviorTracking="onLoad"
    >
      <SlotContent name="content" />
    </Composition>
    <GlobalFooter />
  </main>
</template>
