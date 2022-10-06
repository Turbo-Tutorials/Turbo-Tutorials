<script lang="ts" setup>
defineProps<{
  controls: boolean;
}>();

const { bus, emit } = useEventBus();

function parseScores() {
  const chartOptions = {
    plotOptions: {
      radar: {
        polygons: {
          strokeColor: "#fefefe",
          fill: {
            colors: ["rgba(37,106,209,0.3)"],
          },
        },
      },
    },
    tooltip: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["#d1258c"],
      dashArray: 0,
    },
    fill: {
      opacity: 0.8,
      type: "solid",
    },
    colors: ["#d1258c"],
    yaxis: {
      show: false,
    },
    markers: {
      size: 0,
    },
    chart: {
      foreColor: "#fff",
      type: "radar",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: false,
      },
    },
  };

  const scores = usePersonalizationScores();

  const interestOptions = {
    ...chartOptions,
    xaxis: {
      categories: scores.radars.interests.names,
      labels: {
        style: {
          colors: ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff"],
          fontSize: "14px",
          fontFamily: "Lato, sans-serif",
          fontWeight: 700,
        },
      },
    },
  };

  const interestSeries = [{ data: scores.radars.interests.scores }];

  const complexityOptions = {
    ...chartOptions,
    xaxis: {
      categories: scores.radars.complexity.names,
      labels: {
        style: {
          colors: ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"],
          fontSize: "14px",
          fontFamily: "Lato, sans-serif",
          fontWeight: 700,
        },
      },
    },
  };

  const complexitySeries = [{ data: scores.radars.complexity.scores }];

  return {
    interest: {
      options: interestOptions,
      series: interestSeries,
    },
    complexity: {
      options: complexityOptions,
      series: complexitySeries,
    },
  };
}

const { $useUniformContext: useUniformContext } = useNuxtApp();
const { context } = useUniformContext();
const scores = ref(parseScores());

async function forgetMe() {
  await context.forget(true);
  scores.value = parseScores();
  emit("ResetEnrichment");
}

watch(
  () => bus.value.get("EnrichmentsUpdated"),
  () => {
    scores.value = parseScores();
  }
);
</script>

<template>
  <div class="grid grid-col-1 md:grid-cols-2 mb-4">
    <figure class="relative">
      <figcaption class="text-center font-bold text-xl uppercase">
        Interest
      </figcaption>
      <apexchart
        class="relative md:left-[15px]"
        height="400"
        :options="scores.interest.options"
        :series="scores.interest.series"
      />
      <div v-if="controls" class="relative -top-12 text-white mx-auto w-2/4">
        <p
          class="bg-black py-2 px-3 fancy-image uppercase table mb-4 font-bold text-sm"
        >
          Create your own Interest profile
        </p>
        <AtomsEnrichmentSlider
          v-for="cat in scores.interest.options.xaxis.categories"
          :key="cat"
          enrichment="Interest"
          :value="cat"
        />
      </div>
    </figure>
    <figure>
      <figcaption class="text-center font-bold text-xl uppercase">
        Complexity
      </figcaption>
      <apexchart
        class="relative md:left-[15px]"
        height="400"
        :options="scores.complexity.options"
        :series="scores.complexity.series"
      />
      <div v-if="controls" class="relative -top-12 text-white mx-auto w-2/4">
        <p
          class="bg-black py-2 px-3 fancy-image uppercase table mb-4 font-bold text-sm"
        >
          Create your own Complexity profile
        </p>
        <AtomsEnrichmentSlider
          v-for="cat in scores.complexity.options.xaxis.categories"
          :key="cat"
          enrichment="Complexity"
          :value="cat"
        />
      </div>
    </figure>

    <p v-if="controls" class="p-4 bg-blue">
      Want to start fresh?<br />Click
      <button @click="forgetMe">forget me</button> to reset all
      personalization.<br />
      It's advised to <button @click="forgetMe">reset</button> your
      personalization profile before using these sliders.
    </p>
  </div>
</template>
