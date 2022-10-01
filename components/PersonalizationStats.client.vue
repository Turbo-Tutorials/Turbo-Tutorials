<script lang="ts" setup>
function hashCode(str: string) {
  let hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function pickColor(str: string) {
  return `hsl(${hashCode(str) % 360}, 100%, 50%)`;
}

function parseScores() {
  const scores = usePersonalizationScores();

  if (scores.length === 0) {
    return {
      interests: false,
      complexity: false,
    };
  }

  const interestValues = scores.filter((c) => c.category === "Interest");
  const complexityValues = scores.filter((c) => c.category === "Complexity");

  const interests = {
    cap: interestValues[0].cap,
    label: interestValues[0].category,
    values: interestValues,
  };

  const complexity = {
    cap: complexityValues[0].cap,
    label: complexityValues[0].category,
    values: complexityValues,
  };

  return {
    interests,
    complexity,
  };
}

const { $useUniformContext } = useNuxtApp();
const { context } = $useUniformContext();
const scores = ref(parseScores());

async function forgetMe() {
  await context.forget(true);
  scores.value = parseScores();
}

const interestDonut = ref({});
const complexityDonut = ref({});

if (scores.value.interests) {
  interestDonut.value = {
    size: 160,
    sections: scores.value.interests.values.map((val) => {
      return {
        label: val.value,
        value: val.score,
        color: pickColor(val.value),
      };
    }),
    thickness: 40,
    hasLegend: true,
    foreground: "rgba(37, 106, 209, 1)",
    background: "rgba(24, 51, 87, 1)",
    total: scores.value.interests?.cap || 100,
    legendPlacement: "bottom",
  };
}

if (scores.value.complexity) {
  complexityDonut.value = {
    size: 160,
    sections: scores.value.complexity.values.map((val) => {
      return {
        label: val.value,
        value: val.score,
        color: pickColor(val.value),
      };
    }),
    thickness: 40,
    hasLegend: true,
    foreground: "rgba(37, 106, 209, 1)",
    background: "rgba(24, 51, 87, 1)",
    total: scores.value.complexity?.cap || 100,
    legendPlacement: "bottom",
  };
}
</script>

<template>
  <div v-if="scores.interests || scores.complexity">
    <div class="grid grid-cols-2 gap-8 mb-4">
      <vc-donut v-bind="interestDonut">{{ scores.interests.label }}</vc-donut>
      <vc-donut v-bind="complexityDonut">{{
        scores.complexity.label
      }}</vc-donut>
    </div>
    <p>
      Not entirly happy with your profile? Click
      <button @click="forgetMe">forget me</button> to start over.
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
