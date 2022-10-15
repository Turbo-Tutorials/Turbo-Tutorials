<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
  entry?: {
    title?: string;
    title_type?: string;
    uppercase?: boolean;
    simple_variant?: boolean;
    copy?: string;
  };
}>();

const entry = computed(() => props.component.parameters?.entry?.value);
const copy = computed(() => {
  const res = props.component.parameters?.copy?.value.id;

  if (res) {
    return res.split("content")[1].replace(".md", "");
  } else {
    return false;
  }
});

const { data: richtext } = await useAsyncData(copy.value.toString(), () => {
  return queryContent(`${copy.value}`).findOne();
});
</script>

<template>
  <div class="max-w-[1440px] mx-auto px-4 xl:p-0 mb-12 rich-text">
    <template v-if="richtext">
      <ContentRenderer v-if="richtext" :value="richtext" />
    </template>
    <template v-else>
      <le-title
        v-if="entry.title"
        :lines="entry.title"
        :as="entry.title_type"
        :variant="entry.simple_variant ? 'simple' : 'default'"
        :uppercase="entry.uppercase"
      ></le-title>

      <article
        class="max-w-prose text-xl"
        v-if="entry.copy"
        v-html="entry.copy"
      />
    </template>
  </div>
</template>
