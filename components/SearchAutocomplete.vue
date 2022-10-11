<script setup lang="ts">
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
  title?: string;
  titleType?: string;
}>();

const title = computed(
  () => (props.component.parameters?.title?.value as string) || false
);
const titleType = computed(
  () => (props.component.parameters?.titleType?.value as string) || "h3"
);
</script>
<template>
  <div class="px-4 lg:p-0">
    <AtomsLeTitle v-if="title" :as="titleType" :lines="title" />
    <Autocomplete />
  </div>
</template>
