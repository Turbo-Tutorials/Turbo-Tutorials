<script lang="ts" setup>
import { resolveRenderer } from "../components/componentMapping";

const route = useRoute();
const { $useComposition } = useNuxtApp();
const { data } = await $useComposition({
  slug: route.params.slug ? route.params.slug : "/",
});

console.log("##############", data.value.composition._name, data.value);

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const { data: composition } = await useEnhance(data);
const title = composition.value.parameters?.title?.value || "No Title";
const description =
  composition.value.parameters?.description?.value || "No Description";
const image = composition.value.parameters.image;

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
  <main class="max-w-[1440px] mx-auto pt-36">
    <GlobalHeader />
    <Composition
      v-if="composition"
      :data="composition"
      :resolve-renderer="resolveRenderer"
    >
      <SlotContent name="content" />
    </Composition>
  </main>
</template>
