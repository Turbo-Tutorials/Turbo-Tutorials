<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
  entry?: string;
  copy?: string;
}>();

const entry = computed(() => {
  const res = props.component.parameters?.copy?.value.id;

  if (res) {
    return res.split("content")[1].replace(".md", "");
  } else {
    return false;
  }
});

const { data: richtext } = await useAsyncData(entry.value.toString(), () => {
  return queryContent(`${entry.value}`).findOne();
});
</script>

<template>
  <div class="max-w-[1440px] mx-auto px-4 xl:p-0 mb-12 rich-text">
    <ContentRenderer v-if="richtext" :value="richtext" />
  </div>
</template>
