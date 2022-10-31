<script lang="ts" setup>
const route = useRoute();

usePageMeta({
  title: "Turbo Stats",
  description: "Turbo Stats",
  slug: route.params.slug as string,
  image: "",
});

const { data: aggregate } = await usePlausibleAggregate();
const { data: realtime, refresh } = await usePlausibleRealtime();
const { data: timeseries } = await usePlausibleTimePeriod();
const { data: toppages } = await usePlausibleTopPages();

setInterval(refresh, 10000);
</script>
<template>
  <main class="max-w-[1440px] mx-auto pt-36 md:pt-48">
    <GlobalHeader />
    <AtomsLeTitle as="h1" lines="Turbo Stats" />
    <pre>{{ aggregate }}</pre>
    <pre>{{ realtime }}</pre>
    <pre>{{ timeseries }}</pre>
    <pre>{{ toppages }}</pre>

    <GlobalFooter />
  </main>
</template>
