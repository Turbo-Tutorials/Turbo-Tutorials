<script setup lang="ts">
import { resolveRenderer } from "../../components/componentMapping";

const route = useRoute();
const { $useComposition } = useNuxtApp();
const slug = "/tutorials";
const { data } = await $useComposition({ slug });

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const { data: composition } = await useEnhance(data, slug as string);
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
  <Composition
    v-if="composition"
    :data="composition"
    :resolve-renderer="resolveRenderer"
    behaviorTracking="onLoad"
  >
    <SlotContent name="content" />
  </Composition>
</template>
