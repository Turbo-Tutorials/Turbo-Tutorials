import Donut from "vue-css-donut-chart";
import "vue-css-donut-chart/dist/vcdonut.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Donut);
});
