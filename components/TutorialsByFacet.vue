<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
  title?: string;
  titleType?: string;
  description?: string;
  variant?: string;
  list?: [];
}>();

const list = computed(() => props.component.parameters?.entry?.value || false);
const title = computed(() => props.component.parameters?.title?.value || false);
const titleType = computed(
  () => props.component.parameters?.titleType?.value || "h3"
);
const description = computed(
  () => props.component.parameters?.description?.value || false
);
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
      :variant="variant === 'list' ? 'simple' : 'default'"
      :uppercase="variant === 'list' ? false : true"
    />
    <p v-if="description" v-html="description" class="mb-4" />

    <section
      class="grid grid-cols-1 gap-8"
      :class="{
        'md:grid-cols-1': variant === 'list',
        'md:grid-cols-3': variant !== 'list',
      }"
    >
      <TutorialCard
        v-if="list"
        v-for="tutorial in list"
        v-bind="tutorial"
        :small="variant === 'list'"
      />
    </section>
  </div>
</template>
