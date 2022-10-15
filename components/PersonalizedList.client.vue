<script lang="ts" setup>
defineProps<{
  small: boolean;
}>();

const {
  public: { algoliaIndex },
} = useRuntimeConfig();

const index = useAlgoliaInitIndex(algoliaIndex);
const filter = usePersonalizationForAlgolia();
const result = await index.search("", {
  sumOrFiltersScores: true,
  getRankingInfo: true,
  hitsPerPage: 10,
  optionalFilters: filter,
});
</script>

<template>
  <TutorialCard
    v-if="result.hits.length > 0"
    v-for="tutorial in result.hits"
    v-bind="tutorial"
    :small="small"
  />
  <p v-else>No results found.</p>
</template>
