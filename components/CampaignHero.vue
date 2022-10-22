<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
}>();

const entry = computed(() => props.component.parameters?.entry?.value[0]);
const title = computed(() => props.component.parameters?.title?.value);
const titleType = computed(
  () => props.component.parameters?.titleType?.value || "h3"
);
const description = computed(() => props.component.parameters?.description?.value);
</script>

<template>
  <div class="max-w-[1440px] mx-auto px-4 xl:p-0 mb-4 md:mb-16 relative aspect-[1500/600] flex flex-col md:block" v-if="entry">
    <AtomsImage
      v-if="entry"
      :alt="(title as string)"
      :width="entry.width"
      :height="entry.height"
      :public-id="entry.id"
      :widths="[375, 500, 700, 900, 1280, 1400, 1500]"
      loading="eager"
      fetchpriority="high"
      :fetch="false"
      class="fancy-image hidden md:block mb-4 md:mb-0 order-2"
    />

    <article class="md:absolute top-8 left-8 order-1">
    <AtomsLeTitle
      v-if="title"
      :lines="title"
      :as="titleType"
      variant="default"
      class=""
    />

    <div v-if="description" v-html="description" class="max-w-prose text-xl" />
  </article>
  </div>
</template>