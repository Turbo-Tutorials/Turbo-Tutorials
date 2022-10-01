<script lang="ts" setup>
useHead({
  script: [
    {
      hid: "donutty",
      src: "https://cdn.jsdelivr.net/npm/donutty@2.3.1/dist/donutty.min.js",
      defer: true,
    },
  ],
});

const scores = ref(usePersonalizationScores());
const { $useUniformContext } = useNuxtApp();
const { context } = $useUniformContext();

async function forgetMe() {
  await context.forget(true);
  scores.value = usePersonalizationScores();
}
</script>

<template>
  <div v-if="scores.length > 0">
    <ul class="grid grid-cols-3 gap-8">
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
    <p>
      Not entirly happy with your profile? Click
      <button @click="forgetMe">Forget me</button> to start over.
    </p>
  </div>

  <div v-else>
    <AtomsLeTitle as="h3" lines="You don't have a profile yet" />
    <p class="max-w-3xl text-xl">
      Start watching some Turbo's! We'll create you a profile to optimize the
      content to your liking!
    </p>
  </div>
</template>
