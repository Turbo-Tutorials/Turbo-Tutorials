<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
}>();

const entry = computed(() => props.component.parameters?.entry?.value[0]);
const title = computed(() => props.component.parameters?.title?.value);
</script>

<template>
  <div class="max-w-[1440px] mx-auto px-4 lg:p-0 mb-4" v-if="entry">
    <AtomsImage
      v-if="entry"
      :alt="title as string"
      :width="entry.width"
      :height="entry.height"
      :public-id="entry.id"
      :widths="[375, 500, 700]"
      loading="lazy"
      fetchpriority="low"
      :fetch="false"
      class="fancy-image"
    />
    <p class="mt-2 text-grey" v-if="title">{{title}}</p>
  </div>
</template>