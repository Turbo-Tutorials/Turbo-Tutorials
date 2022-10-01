<script lang="ts" setup>
const scores = usePersonalizationScores();
useHead({
  script: [
    {
      hid: "donutty",
      src: "https://cdn.jsdelivr.net/npm/donutty@2.3.1/dist/donutty.min.js",
      defer: true,
    },
  ],
});
</script>

<template>
  <ul v-if="scores.length > 0" class="grid grid-cols-3 gap-8">
    <li v-for="score in scores" :key="score.value" class="relative block">
      <p class="text-center font-bold text-xl mb-2">{{ score.category }}</p>
      <div
        class="w-32 h-32 aspect-[32/32] mx-auto overflow-hidden"
        data-donutty
        data-min="0"
        data-thickness="25"
        data-round="true"
        data-circle="false"
        :data-max="score.cap"
        :data-value="score.score"
        data-color="#D1258C"
        data-padding="10"
        data-bg="rgba(37, 106, 209, 0.40)"
      ></div>
      <p class="relative text-center -top-[5rem] font-bold text-xl">
        {{ score.score }}%
      </p>
      <p class="text-center relative -top-[2rem]">{{ score.value }}</p>
    </li>
  </ul>
  <div v-else>
    <AtomsLeTitle as="h4" lines="Couldn't find a Turbo profile yet" />
    <p class="max-w-3xl text-xl">
      Start watching some Turbo's! We'll optimize the content to your liking!
    </p>
  </div>
</template>
