<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
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

  let left = "w-full md:w-2/4";
  let right = "w-full md:w-2/4";

  if (variant === "rightSmall") {
    left = "w-full md:w-3/5";
    right = "w-full md:w-2/5";
  }

  if (variant === "leftSmall") {
    left = "w-full md:w-3/5";
    right = "w-full md:w-2/5";
  }

  return {
    left,
    right,
  };
});
</script>

<template>
  <div class="bg-lblue p-6 mb-12">
    <article class="mb-12">
      <AtomsLeTitle
        v-if="title"
        :as="titleType"
        :lines="title"
        class="text-3xl md:text-4xl font-bold uppercase leading-none mb-4"
      />

      <div v-if="description" v-html="description"></div>
    </article>

    <div class="flex flex-col md:flex-row">
      <div class="pb-8 md:pb-0 md:pr-4" :class="variant.left">
        <SlotContent name="columnA" />
      </div>
      <div class="md:pl-4" :class="variant.right">
        <SlotContent name="columnB" />
      </div>
    </div>
  </div>
</template>
