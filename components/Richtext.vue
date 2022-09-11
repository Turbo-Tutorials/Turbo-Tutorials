<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
}>();

const title = computed(() => props.component.parameters.title.value as string);
const titleType = computed(
  () => props.component.parameters.titleType.value as string
);
const text = computed(() => props.component.parameters.text.value);
</script>

<template>
  <section class="mb-8">
    <AtomsLeTitle
      v-if="title"
      :as="titleType"
      :lines="title"
      class="text-3xl md:text-6xl font-bold uppercase leading-none mb-4"
    />
    <div v-html="text" v-if="text" class="max-w-3xl text-xl" />
  </section>
</template>
