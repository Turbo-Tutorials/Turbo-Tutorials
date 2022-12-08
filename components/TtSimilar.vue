<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
}>();

const list = computed(() => props.component.data?.similar);
</script>

<template>
  <div class="px-4 md:p-0">
    <AtomsLeTitle as="h4" lines="Similar Turbos" />

    <section class="grid grid-cols-1 gap-8 md:grid-cols-1">
      <TutorialCard
        v-if="list"
        v-for="tutorial in list"
        v-bind="tutorial"
        :small="true"
      />
    </section>
  </div>
</template>
