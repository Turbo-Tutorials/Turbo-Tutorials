<script setup>
import {
  AisInstantSearch,
  AisSearchBox,
  AisHits,
  AisRefinementList,
  AisClearRefinements,
} from "vue-instantsearch/vue3/es/index.js";

const indexName = ref("turbo_tutorials");
const algolia = useAlgoliaRef();
</script>

<template>
  <main class="max-w-[1440px] mx-auto pt-36 md:pt-48">
    <GlobalHeader />

    <client-only>
      <ais-instant-search :index-name="indexName" :search-client="algolia">
        <ais-search-box />
        <ais-clear-refinements />
        <ais-refinement-list attribute="tags" />
        <ais-refinement-list attribute="complexity" />
        <ais-hits
          :class-names="{
            'ais-Hits-list': 'grid grid-cols-1 gap-8 md:grid-cols-3',
          }"
        >
          <template v-slot:item="{ item }">
            <TutorialCard v-bind="item" />
          </template>
        </ais-hits>
      </ais-instant-search>
    </client-only>
    <GlobalFooter />
  </main>
</template>
