<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
}>();

const entry = computed(() => props.component.parameters.entry.value?.id);

const { data: richtext } = await useAsyncData(entry.value.toString(), () => {
  return queryContent(`/${entry.value}`).findOne();
});
</script>

<template>
  <ContentRenderer
    v-if="richtext"
    :value="richtext"
    :class="{
      'max-w-[1440px] mx-auto px-8 lg:p-0 mb-12': entry === 'intro',
    }"
  />
</template>
