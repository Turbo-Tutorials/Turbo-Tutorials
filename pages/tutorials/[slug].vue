<script lang="ts" setup>
import { resolveRenderer } from "../../components/componentMapping";

const route = useRoute();
const slug = route.params.slug;

const { data: composition } = await useAsyncData(
  `composition-tutorial-${slug}`,
  () => $fetch(`/api/tutorial?slug=${slug}`)
);

if (!composition.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

usePersonalization({
  interests: {
    interest: composition.value.data?.selectedTags as string,
    strength: 1,
  },
  complexity: {
    value: composition.value.data.complexity as string,
    strength: 1,
  },
});

usePageMeta({
  title: `Turbo Tutorial - ${composition.value.data.metadata?.title}` as string,
  description: composition.value.data.metadata?.description as string,
  slug: slug as string,
  image: `https://res.cloudinary.com/dwfcofnrd/image/fetch/w_1200,q_auto/${
    composition.value.data.metadata?.image as string
  }`,
  structuredData: composition.value.data.metadata?.structuredData,
});

if (!process.server) {
  useSetVideoWatched(composition.value.data?.videoId as string);
}
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
