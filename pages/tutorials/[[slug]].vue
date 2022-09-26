<script lang="ts" setup>
import { resolveRenderer } from "../../components/componentMapping";

const route = useRoute();
const { data: composition } = await useFetch(
  `/api/tutorial?slug=${route.params.slug}`
);

if (!composition.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

usePageMeta({
  title: composition.value.data.metadata?.title as string,
  description: composition.value.data.metadata?.description as string,
  slug: route.params.slug as string,
  image: `https://res.cloudinary.com/dwfcofnrd/image/fetch/w_1200,q_auto/${
    composition.value.data.metadata?.image as string
  }`,
  structuredData: composition.value.data.metadata?.structuredData,
});
</script>
<template>
  <main class="max-w-[1440px] mx-auto pt-36 md:pt-48">
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
