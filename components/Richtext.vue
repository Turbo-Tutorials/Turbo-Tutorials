<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
  title?: string;
  text?: string;
  titleType?: string;
}>();

const title = computed(
  () => (props.component.parameters?.title?.value as string) || false
);
const titleType = computed(
  () => (props.component.parameters?.titleType?.value as string) || "h3"
);
const text = computed(() => props.component.parameters?.text?.value || false);
</script>

<template>
  <div class="max-w-[1440px] mx-auto px-4 xl:p-0 mb-16">
    <AtomsLeTitle v-if="title" :as="titleType" :lines="title" />
    <div v-html="text" v-if="text" class="max-w-3xl text-xl" />
  </div>
</template>
