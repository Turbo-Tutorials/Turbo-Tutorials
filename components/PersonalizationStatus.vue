<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
  title?: string;
  description?: string;
  titleType?: string;
  variant?: string;
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

const variant = computed(() => props.component.variant);
</script>

<template>
  <div class="bg-lblue max-w-[1440px] mx-auto p-8 pb-4 mb-16">
    <div class="mb-16">
      <AtomsLeTitle
        v-if="title"
        :as="titleType"
        :lines="title"
        :uppercase="false"
        variant="simple"
      />
      <div v-html="description" v-if="description" class="text-xl" />
    </div>
    <TurboProfile :controls="variant !== 'noControls'" />
  </div>
</template>
