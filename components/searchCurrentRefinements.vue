<script lang="ts" setup>
import { AisCurrentRefinements } from "vue-instantsearch/vue3/es/index.js";

import type { ComponentInstance } from "@uniformdev/canvas";
defineProps<{
  component: ComponentInstance;
}>();
</script>
<template>
  <ais-current-refinements
    :class-names="{
      'ais-CurrentRefinements': 'mb-4 mt-[8px]',
      'ais-CurrentRefinements-list': 'flex',
      'ais-CurrentRefinements-label': 'hidden',
      'ais-CurrentRefinements-category':
        'bg-black fancy-image py-2 px-3 text-white mr-2',
      'ais-CurrentRefinements-categoryLabel': 'mr-3',
      'ais-CurrentRefinements-delete': 'font-bold no-underline',
    }"
  />
</template>

<style lang="postcss">
.ais-CurrentRefinements--noRefinement {
  display: none;
}
</style>
