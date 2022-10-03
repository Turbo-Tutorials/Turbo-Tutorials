<script setup>
import { AisMenu } from "vue-instantsearch/vue3/es/index.js";

const props = defineProps({ component: Object });
const attribute = computed(
  () => props.component.parameters?.attribute?.value || ""
);
</script>
<template>
  <client-only>
    <ais-menu :attribute="attribute" v-if="attribute" class="mb-4" />
  </client-only>
</template>
