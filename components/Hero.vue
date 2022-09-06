<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
}>();

const image = computed(() => props.component.parameters.image.value[0]);
const title1 = computed(
  () => props.component.parameters.title.value.split("_")[0]
);
const title2 = computed(
  () => props.component.parameters.title.value.split("_")[1]
);
</script>
<template>
  <section class="relative aspect-[1512/872] mb-6">
    <AtomsImage
      class="md:absolute"
      :alt="image.alt"
      :width="image.width"
      :height="image.height"
      :public-id="image.publicId"
      :widths="image.widths.split(',')"
      loading="eager"
      fetchpriority="high"
    />

    <a
      class="absolute top-4 md:top-8 left-4 md:left-10"
      href="https://timbenniks.dev"
      >timbenniks.dev</a
    >

    <h1
      class="absolute bottom-7 md:bottom-14 left-4 md:left-10 text-3xl md:text-6xl lg:text-8xl font-bold uppercase leading-none lg:leading-[5rem]"
    >
      <span class="inline-block bg-black p-2">
        <span class="flowing-title inline">{{ title1 }}</span>
      </span>
      <br />
      <span class="inline-block bg-black p-2" v-if="title2">
        <span class="flowing-title inline">{{ title2 }}</span>
      </span>
      <br />
    </h1>
  </section>
</template>
