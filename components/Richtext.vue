<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
  entry?: {
    title?: string;
    title_type?: string;
    uppercase?: boolean;
    simple_variant?: boolean;
    copy?: string;
  };
}>();

const entry = computed(() => props.component.parameters?.entry?.value);
</script>

<template>
  <div class="max-w-[1440px] mx-auto px-4 xl:p-0 mb-12 rich-text" v-if="entry">
    <AtomsLeTitle
      v-if="entry.title"
      :lines="entry.title"
      :as="entry.title_type"
      :variant="entry.simple_variant ? 'simple' : 'default'"
      :uppercase="entry.uppercase"
    />

    <article
      class="max-w-prose text-xl"
      v-if="entry.copy"
      v-html="entry.copy"
    />
  </div>
</template>
