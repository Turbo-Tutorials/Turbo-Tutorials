<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
  title?: string;
  titleType?: string;
  text?: string;
  description?: string;
  variant?: {
    left: string;
    right: string;
  };
}>();

const title = computed(() => props.component.parameters?.title?.value || false);
const titleType = computed(
  () => props.component.parameters?.titleType?.value || "h3"
);
const description = computed(
  () => props.component.parameters?.description?.value || false
);

const variant = computed(() => {
  const variant = props.component?.variant;

  let left = "w-full lg:w-2/4";
  let right = "w-full lg:w-2/4";

  if (variant === "rightSmall") {
    left = "w-full lg:w-3/5";
    right = "w-full lg:w-2/5";
  }

  if (variant === "leftSmall") {
    left = "w-full lg:w-3/5";
    right = "w-full lg:w-2/5";
  }

  return {
    left,
    right,
  };
});
</script>

<template>
  <div class="bg-lblue mb-24 two-column py-4 lg:p-6">
    <article class="pb-0 mb-8" v-if="title || description">
      <AtomsLeTitle v-if="title" :as="titleType" :lines="title" />
      <p v-if="description" v-html="description" class="text-xl"></p>
    </article>

    <div class="flex flex-col lg:flex-row">
      <div class="lg:pr-6" :class="variant.left">
        <SlotContent name="columnA" />
      </div>
      <div class="lg:pl-6" :class="variant.right">
        <SlotContent name="columnB" />
      </div>
    </div>
  </div>
</template>
