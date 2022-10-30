<script lang="ts" setup>
defineProps<{
  small: boolean;
}>();

const {
  public: { algoliaIndex },
} = useRuntimeConfig();

const index = useAlgoliaInitIndex(algoliaIndex);
const { algoliaQueryFilter } = useContextScores();

const searchOptions = ref({
  sumOrFiltersScores: true,
  getRankingInfo: true,
  hitsPerPage: 6,
  optionalFilters: algoliaQueryFilter.value,
});

let searchResult = await index.search("", searchOptions.value);
const hits = ref(searchResult.hits);

watch(algoliaQueryFilter, async () => {
  searchOptions.value = {
    sumOrFiltersScores: true,
    getRankingInfo: true,
    hitsPerPage: 6,
    optionalFilters: algoliaQueryFilter.value,
  };

  searchResult = await index.search("", searchOptions.value);
  hits.value = searchResult.hits;
});
</script>

<template>
  <TutorialCard
    v-if="hits.length > 0"
    v-for="tutorial in hits"
    v-bind="tutorial"
    :small="small"
  />
  <p v-else>No results found.</p>
</template>
