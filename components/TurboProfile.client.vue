<script lang="ts" setup>
import { useScores } from "@uniformdev/context-vue";

defineProps<{
  controls: boolean;
}>();

const { $useUniformContext } = useNuxtApp();
const { context } = $useUniformContext();
const { scores } = useContextScores();
const sliderValues = useScores();

async function update(forget = false) {
  // remove reactivty...
  const values = Object.assign({}, sliderValues.value);
  await useUpdateTurboProfile(values, context, forget);
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div class="p-6 bg-blue mb-4 flex flex-col space-y-6 md:col-span-1">
      <AtomsEnrichmentSlider
        v-for="score in scores"
        :key="score.id"
        v-model="sliderValues[score.id]"
        :category="score.category"
        :val="score.value"
      />
    </div>
    <div
      class="p-6 bg-blue mb-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:col-span-2 content-center"
    >
      <AtomsChart v-model="scores" caption="Interest" />
      <AtomsChart v-model="scores" caption="Complexity" />
    </div>
  </div>

  <div class="flex space-x-4">
    <button
      class="block fancy-image bg-black px-3 py-2 no-underline uppercase font-bold"
      @click="update(false)"
    >
      Update Profile
    </button>
    <button
      class="block fancy-image bg-black px-3 py-2 no-underline uppercase font-bold"
      @click="update(true)"
    >
      Reset Profile
    </button>
  </div>
</template>
