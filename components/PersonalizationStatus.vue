<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
  title?: string;
  description?: string;
  titleType?: string;
}>();

const title = computed(
  () => (props.component.parameters?.title?.value as string) || false
);
const titleType = computed(
  () => (props.component.parameters?.titleType?.value as string) || "h3"
);
const description = computed(
  () => props.component.parameters?.description?.value || false
);
</script>

<template>
  <div class="bg-lblue max-w-[1440px] mx-auto p-8 mb-16">
    <div class="mb-12">
      <AtomsLeTitle v-if="title" :as="titleType" :lines="title" />
      <p v-html="description" v-if="description" class="max-w-4xl text-xl" />
    </div>
    <PersonalizationStats />
  </div>
</template>
