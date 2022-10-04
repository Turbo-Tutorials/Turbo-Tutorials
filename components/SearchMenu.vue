<script setup>
import { AisRefinementList } from "vue-instantsearch/vue3/es/index.js";

const props = defineProps({ component: Object });
const attribute = computed(
  () => props.component.parameters?.attribute?.value || ""
);
</script>
<template>
  <ais-refinement-list
    :sort-by="['name']"
    :attribute="attribute"
    v-if="attribute"
    class="mb-4 bg-black py-2 px-3 fancy-image"
    :class-names="{
      'ais-RefinementList-item': 'mb-1',
      'ais-RefinementList-checkbox': 'mr-2',
      'ais-RefinementList-label': 'w-full flex',
      'ais-RefinementList-count': 'ml-auto',
    }"
  />
</template>

<style lang="postcss">
.ais-RefinementList-item:last-child {
  margin: 0;
}
</style>
