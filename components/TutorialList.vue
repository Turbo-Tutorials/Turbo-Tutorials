<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
}>();

const list = computed(() => props.component.parameters.entry.value);
const title = computed(() => props.component.parameters.title.value);
</script>

<template>
  <div class="max-w-[1440px] mx-auto px-8 lg:p-0">
    <AtomsLeTitle
      v-if="title"
      as="h2"
      :lines="title"
      class="text-3xl md:text-4xl font-bold uppercase leading-none mb-4"
    />

    <section class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <TutorialCard v-for="tutorial in list" v-bind="tutorial" />
    </section>
  </div>
</template>
