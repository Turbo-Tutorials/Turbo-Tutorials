<script lang="ts" setup>
import { AisStats } from "vue-instantsearch/vue3/es/index.js";
import type { ComponentInstance } from "@uniformdev/canvas";
defineProps<{
  component: ComponentInstance;
}>();
</script>
<template>
  <ais-stats class="text-sm mb-2" />
</template>
