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
    <div class="flex flex-col lg:flex-row">
      <div class="lg:pr-6 w-full md:w-2/4">
        <AtomsLeTitle v-if="title" :as="titleType" :lines="title" />
        <p v-html="description" v-if="description" class="max-w-3xl text-xl" />
      </div>
      <div class="lg:pl-6 w-full md:w-2/4">
        <PersonalizationStats />
      </div>
    </div>
  </div>
</template>
