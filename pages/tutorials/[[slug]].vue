<script lang="ts" setup>
import { resolveRenderer } from "../../components/componentMapping";

const route = useRoute();
const { data } = await useFetch(`/api/tutorial?slug=${route.params.slug}`);

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

// usePageMeta({
//   title: composition.data.metadata.title.value as string,
//   description: composition.data.metadata.value as string,
//   slug: route.params.slug as string,
//   image: composition.data.metadata.value[0].baseurl.replace(
//     "image/upload/",
//     "image/upload/w_1200,"
//   ) as string,
// });
</script>
<template>
  <main class="max-w-[1440px] mx-auto pt-36">
    <GlobalHeader />
    <pre>{{ data }}</pre>
    <!-- <Composition
      v-if="composition"
      :data="composition"
      :resolve-renderer="resolveRenderer"
    >
      <SlotContent name="content" />
    </Composition> -->
  </main>
</template>
