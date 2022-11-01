<script lang="ts" setup>
import Vue3Apexcharts from "../../lib/ApexCharts";

const props = defineProps<{
  timeseries: [
    {
      date: string;
      visitors: number;
    }
  ];
}>();

const install = (app) => {
  app.component(Vue3Apexcharts.name, Vue3Apexcharts);
};

Vue3Apexcharts.install = install;

const { vueApp } = useNuxtApp();
vueApp.use(Vue3Apexcharts as any);

const series = computed(() => {
  return props.timeseries.map((serie) => {
    return serie.visitors;
  });
});

const dates = computed(() => {
  return props.timeseries.map((serie) => {
    return serie.date;
  });
});

const chartOptions = {
  chart: {
    type: "bar",
    height: 350,
    foreColor: "#fff",
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
    },
  },
  dataLabels: {
    enabled: true,
  },
  stroke: {
    show: false,
  },
  colors: ["#d1258c"],
  xaxis: {
    categories: dates.value,
  },
  yaxis: {
    title: {
      text: "Visitors",
    },
  },
  tooltip: {
    enabled: false,
  },
};
</script>

<template>
  <apexchart
    type="bar"
    height="350"
    :series="[{ name: 'Visitors', data: series }]"
    :options="chartOptions"
  />
</template>
