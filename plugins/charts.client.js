import Vue3Apexcharts from "../lib/ApexCharts";

const install = (app) => {
  app.component(Vue3Apexcharts.name, Vue3Apexcharts);
};

Vue3Apexcharts.install = install;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Apexcharts);
});
