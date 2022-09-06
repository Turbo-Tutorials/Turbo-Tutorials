<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
}>();

const title = computed(() => props.component.parameters.title.value);
const image1 = computed(() => props.component.parameters.image1.value[0]);
const image2 = computed(() => props.component.parameters.image2.value[0]);
const image3 = computed(() => props.component.parameters.image3.value[0]);
const image4 = computed(() => props.component.parameters.image4.value[0]);
</script>

<template>
  <section class="bg-grey py-8">
    <div class="max-w-[1440px] mx-auto px-8 lg:p-0">
      <h3
        class="text-3xl md:text-5xl font-bold uppercase leading-none mb-8"
        v-if="title"
      >
        <span class="inline-block bg-black p-2">
          <span class="flowing-title inline">{{ title }}</span>
        </span>
        <br />
      </h3>

      <figure class="media-grid">
        <div class="media-1">
          <a :href="image1.url" target="_blank" rel="noopener">
            <AtomsImage
              :alt="image1.alt"
              :width="image1.width"
              :height="image1.height"
              :public-id="image1.publicId"
              :widths="image1.widths.split(',')"
              loading="lazy"
              class="fancy-image"
              fetchpriority="low"
            />
          </a>
        </div>
        <div class="media-2">
          <a :href="image2.url" target="_blank" rel="noopener">
            <AtomsImage
              :alt="image2.alt"
              :width="image2.width"
              :height="image2.height"
              :public-id="image2.publicId"
              :widths="image2.widths.split(',')"
              loading="lazy"
              class="fancy-image"
              fetchpriority="low"
            />
          </a>
        </div>
        <div class="media-3">
          <a :href="image3.url" target="_blank" rel="noopener">
            <AtomsImage
              :alt="image3.alt"
              :width="image3.width"
              :height="image3.height"
              :public-id="image3.publicId"
              :widths="image3.widths.split(',')"
              loading="lazy"
              class="fancy-image"
              fetchpriority="low"
            />
          </a>
        </div>
      </figure>
    </div>
  </section>

  <AtomsImage
    :alt="image4.alt"
    :width="image4.width"
    :height="image4.height"
    :public-id="image4.publicId"
    :widths="image4.widths.split(',')"
    loading="lazy"
    fetchpriority="low"
  />
</template>

<style lang="postcss">
.media-grid {
  @apply grid gap-8 grid-cols-1 md:grid-cols-[0.472fr_0.6fr] md:grid-rows-[1fr_1fr];
}

.media-1 {
  @media (min-width: 768px) {
    grid-area: 1/1/3/2;
  }
}

.media-2 {
  @media (min-width: 768px) {
    grid-area: 1/2/2/3;
  }
}

.media-3 {
  @media (min-width: 768px) {
    grid-area: 2/2/3/3;
  }
}
</style>
