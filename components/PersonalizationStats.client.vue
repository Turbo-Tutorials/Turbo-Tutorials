<script lang="ts" setup>
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
          colors: ["#fff", "#fff", "#fff", "#fff", "#fff"],
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
          colors: ["#fff", "#fff", "#fff", "#fff", "#fff"],
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

const { $useUniformContext } = useNuxtApp();
const { context } = $useUniformContext();
const scores = ref(parseScores());

const showGraphs = computed(() => {
  const interestHasScore = scores.value.interest.series[0].data.find(
    (score) => score > 0
  );

  const complexityHasScore = scores.value.complexity.series[0].data.find(
    (score) => score > 0
  );

  if (interestHasScore || complexityHasScore) {
    return true;
  } else {
    return false;
  }
});

async function forgetMe() {
  await context.forget(true);
  scores.value = parseScores();
}
</script>

<template>
  <div class="grid grid-col-1 md:grid-cols-2 gap-8 mb-4" v-if="showGraphs">
    <figure>
      <figcaption class="text-center font-bold text-xl uppercase">
        Interest
      </figcaption>
      <apexchart
        class="relative left-[15px]"
        height="400"
        :options="scores.interest.options"
        :series="scores.interest.series"
      />
    </figure>
    <figure>
      <figcaption class="text-center font-bold text-xl uppercase">
        Complexity
      </figcaption>
      <apexchart
        class="relative left-[15px]"
        height="400"
        :options="scores.complexity.options"
        :series="scores.complexity.series"
      />
    </figure>
  </div>

  <div v-else>
    <AtomsLeTitle as="h4" lines="You don't have a profile yet" />
    <p class="max-w-4xl text-xl">
      Start watching some Turbo's! We'll create you a profile to optimize the
      content to your liking!
    </p>
  </div>
</template>
