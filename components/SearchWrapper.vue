<script setup>
import { AisInstantSearch } from "vue-instantsearch/vue3/es/index.js";
import { history } from "instantsearch.js/es/lib/routers";
import { simple } from "instantsearch.js/es/lib/stateMappings";

const {
  public: { algoliaIndex },
} = useRuntimeConfig();

const indexName = algoliaIndex;
const algolia = useAlgoliaRef();
const routing = {
  router: history(),
  stateMapping: simple(),
};
</script>

<template>
  <client-only>
    <ais-instant-search
      :index-name="indexName"
      :search-client="algolia"
      :routing="routing"
    >
      <div class="flex flex-col lg:flex-row p-4">
        <div class="lg:pr-4 w-full md:w-1/6">
          <SlotContent name="sidebar" />
        </div>
        <div class="lg:pl-4 w-full md:w-5/6">
          <SlotContent name="hits" />
        </div>
      </div>
    </ais-instant-search>
  </client-only>
</template>
