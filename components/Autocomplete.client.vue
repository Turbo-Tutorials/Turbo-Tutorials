<script setup>
import {
  AisInstantSearch,
  AisAutocomplete,
} from "vue-instantsearch/vue3/es/index.js";

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
  <ais-instant-search
    :index-name="indexName"
    :search-client="algolia"
    :routing="routing"
  >
    <ais-autocomplete>
      <template v-slot="{ currentRefinement, indices, refine }">
        <input
          type="search"
          :value="currentRefinement"
          placeholder="Search for a turbo"
          @input="refine($event.currentTarget.value)"
          class="text-white text-xl p-4 border-none w-full bg-blue"
        />
        <ul
          v-if="currentRefinement"
          v-for="index in indices"
          :key="index.indexId"
          class="w-full bg-blue px-4 py-2 border-t-dark border-t-4"
        >
          <li
            v-for="hit in index.hits"
            :key="hit.objectID"
            class="py-2 flex space-x-4"
          >
            <nuxt-link :to="`/tutorials/${hit.slug}/`">
              <AtomsImage
                v-if="hit.poster"
                :alt="hit.poster.alt"
                :width="hit.poster.width"
                :height="hit.poster.height"
                :public-id="hit.poster.src"
                :widths="[60, 100, 120]"
                loading="lazy"
                fetchpriority="low"
                :fetch="true"
                class="fancy-image self-start w-24"
              />
            </nuxt-link>
            <div>
              <nuxt-link
                :to="`/tutorials/${hit.slug}/`"
                class="font-bold mb-2"
                >{{ hit.title }}</nuxt-link
              >
              <p class="text-grey">{{ hit.tags.join(", ") }}</p>
            </div>
          </li>
        </ul>
      </template>
    </ais-autocomplete>
  </ais-instant-search>
</template>
