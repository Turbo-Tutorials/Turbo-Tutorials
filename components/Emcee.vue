<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
}>();

const entry = computed(() => props.component.parameters.entry.value?.id);

const { data: emcee } = await useAsyncData(entry.value.toString(), () => {
  return queryContent(`/${entry.value}`).findOne();
});

const image = computed(() => props.component.parameters.image.value[0]);
</script>

<template>
  <div class="max-w-[1440px] mx-auto px-8 lg:p-0 my-8">
    <section class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-40">
      <ContentRenderer v-if="emcee" :value="emcee" tag="article" />

      <figure>
        <AtomsImage
          :alt="image.alt"
          :width="image.width"
          :height="image.height"
          :public-id="image.publicId"
          :widths="image.widths.split(',')"
          loading="lazy"
          class="fancy-image"
          fetchpriority="low"
        />
      </figure>
    </section>
  </div>
</template>
