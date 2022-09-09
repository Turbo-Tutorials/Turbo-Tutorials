<script lang="ts" setup>
import { resolveRenderer } from "../components/componentMapping";
const route = useRoute();

const { $useComposition } = useNuxtApp();
const { data } = await $useComposition({
  slug: route.params.slug ? route.params.slug : "/",
});

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const { data: composition } = await useEnhance(data);
const { title, description, image } = composition.value.parameters;

usePageMeta({
  title: title.value as string,
  description: description.value as string,
  slug: route.params.slug as string,
  image: image.value[0].baseurl.replace(
    "image/upload/",
    "image/upload/w_1200,"
  ) as string,
});
</script>
<template>
  <main class="max-w-[1512px] mx-auto">
    <Composition
      v-if="composition"
      :data="composition"
      :resolve-renderer="resolveRenderer"
    >
      <SlotContent name="content" />
    </Composition>
  </main>
</template>
