<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
}>();

const list = computed(() => props.component.parameters.entry.value);
</script>

<template>
  <div class="max-w-[1440px] mx-auto px-8 lg:p-0">
    <section class="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-20">
      <fieldset>
        <legend>TutorialList</legend>
        <pre>{{ list }}</pre>
      </fieldset>
    </section>
  </div>

  <!-- <AtomsImage
      :alt="image.alt"
      :width="image.width"
      :height="image.height"
      :public-id="image.publicId"
      :widths="image.widths.split(',')"
      loading="lazy"
      fetchpriority="low"
    /> -->
</template>
