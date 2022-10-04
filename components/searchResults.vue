<script setup>
import { AisHits } from "vue-instantsearch/vue3/es/index.js";
</script>
<template>
  <ais-hits
    :class-names="{
      'ais-Hits-list': 'grid grid-cols-1 gap-8 md:grid-cols-3',
    }"
  >
    <template v-slot:item="{ item }">
      <TutorialCard v-bind="item" />
    </template>
  </ais-hits>
</template>
