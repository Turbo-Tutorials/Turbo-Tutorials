<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
  title?: string;
  titleType?: string;
}>();

const title = computed(() => props.component.parameters?.title?.value || false);
const titleType = computed(
  () => props.component.parameters?.titleType?.value || "h3"
);

const simpleTitle = computed(
  () => props.component.parameters?.simpleTitle?.value || false
);

const limit = computed(() => props.component.parameters?.limit?.value || 3);

const variant = computed(() => props.component?.variant || false);
</script>

<template>
  <div
    class="max-w-[1440px] mx-auto px-4 xl:p-0"
    :class="{
      'mb-0': variant === 'list',
      'mb-16 md:mb-24': variant !== 'list',
    }"
  >
    <AtomsLeTitle
      v-if="title"
      :as="titleType"
      :lines="title"
      :variant="simpleTitle ? 'simple' : 'default'"
      :uppercase="simpleTitle ? false : true"
    />
    <section
      class="grid grid-cols-1 gap-8"
      :class="{
        'md:grid-cols-1': variant === 'list',
        'md:grid-cols-3': variant !== 'list',
      }"
    >
      <personalized-list :small="variant === 'list'" :limit="limit" />
    </section>
  </div>
</template>
