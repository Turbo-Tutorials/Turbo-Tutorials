<script lang="ts" setup>
import Vue3Apexcharts from "../../lib/ApexCharts";

const props = defineProps<{
  caption: string;
  modelValue: any;
}>();

const install = (app) => {
  app.component(Vue3Apexcharts.name, Vue3Apexcharts);
};

Vue3Apexcharts.install = install;

const { vueApp } = useNuxtApp();
vueApp.use(Vue3Apexcharts as any);

const emit = defineEmits(["update:modelValue"]);
const model = computed({
  get() {
    return props.modelValue.filter((score) => score.category === props.caption);
  },
  set(value) {
    return emit("update:modelValue", value);
  },
});

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

function setChartScores() {
  const namesList = [];
  const scoresList = [];
  model.value.forEach((category) => {
    namesList.push(category.value);
    scoresList.push(category.score);
  });

  return {
    namesList,
    scoresList: [{ data: scoresList }],
  };
}

watch(model, () => {
  chartScores.value = setChartScores();
});

const chartScores = ref(setChartScores());

const options = ref({
  ...chartOptions,
  xaxis: {
    categories: chartScores.value.namesList,
    labels: {
      style: {
        colors: ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff"],
        fontSize: "14px",
        fontFamily: "Lato, sans-serif",
        fontWeight: 700,
      },
    },
  },
});
</script>
<template>
  <figure class="relative md:mt-28">
    <figcaption class="text-center font-bold text-xl uppercase">
      {{ caption }}
    </figcaption>
    <apexchart
      class="relative md:left-[20px]"
      height="400"
      :options="options"
      :series="chartScores.scoresList"
    />
  </figure>
</template>
