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

    <div class="w-[1000px] mb-12 bg-lblue p-6">
      <AtomsLeTitle as="h1" lines="Turbo Stats" />

      <ul class="grid grid-cols-4 gap-8">
        <li>
          <AtomsLeTitle
            as="h3"
            lines="Bounce rate"
            variant="simple"
            :uppercase="false"
          />

          <div class="space-x-1">
            <span class="text-5xl font-bold">
              {{ aggregate.results.bounce_rate.value }}%
            </span>
            <span
              :class="{
                'text-[#00D100]': aggregate.results.pageviews.change > 0,
                'text-[#D10000]': aggregate.results.pageviews.change < 0,
              }"
            >
              <span v-if="aggregate.results.pageviews.change > 0">&uarr;</span>
              <span v-else>&darr;</span>
              {{ aggregate.results.pageviews.change }}%</span
            >
          </div>
        </li>
        <li>
          <AtomsLeTitle
            as="h3"
            lines="Page views"
            variant="simple"
            :uppercase="false"
          />
          <div class="space-x-1">
            <span class="text-5xl font-bold">
              {{ aggregate.results.pageviews.value }}
            </span>
            <span
              :class="{
                'text-[#00D100]': aggregate.results.pageviews.change > 0,
                'text-[#D10000]': aggregate.results.pageviews.change < 0,
              }"
            >
              <span v-if="aggregate.results.pageviews.change > 0">&uarr;</span>
              <span v-else>&darr;</span>
              {{ aggregate.results.pageviews.change }}%</span
            >
          </div>
        </li>
        <li>
          <AtomsLeTitle
            as="h3"
            lines="Visits"
            variant="simple"
            :uppercase="false"
          />
          <div class="space-x-1">
            <span class="text-5xl font-bold">
              {{ aggregate.results.visits.value }}
            </span>
            <span
              :class="{
                'text-[#00D100]': aggregate.results.pageviews.change > 0,
                'text-[#D10000]': aggregate.results.pageviews.change < 0,
              }"
            >
              <span v-if="aggregate.results.pageviews.change > 0">&uarr;</span>
              <span v-else>&darr;</span>
              {{ aggregate.results.pageviews.change }}%</span
            >
          </div>
        </li>
        <li>
          <AtomsLeTitle
            as="h3"
            lines="Realtime"
            variant="simple"
            :uppercase="false"
          />
          <div class="space-x-1">
            <span class="text-5xl font-bold">
              {{ realtime }}
            </span>
          </div>
        </li>
      </ul>
    </div>

    <div class="mb-12 bg-lblue p-6 w-[1000px]">
      <AtomsLeTitle as="h2" lines="Turbo Top Pages" />

      <ul class="w-[600px]">
        <li
          v-for="result in toppages.results"
          class="bg-blue p-2 mb-1 flex justify-between"
        >
          <span>{{ result.page }}</span>
          <span>{{ result.visitors }}</span>
        </li>
      </ul>
    </div>

    <div class="mb-12 bg-lblue p-6 w-[1000px]">
      <AtomsLeTitle as="h2" lines="Visitors in the last 30 days" />
      <AtomsBarChart :timeseries="timeseries.results" />
    </div>

    <GlobalFooter />
  </main>
</template>
