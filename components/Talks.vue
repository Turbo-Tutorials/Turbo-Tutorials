<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
}>();

const title = computed(() => props.component.parameters.title.value);

const limit = ref(10);

const {
  data: talks,
  pending,
  refresh,
} = await useAsyncData("talks", () =>
  $fetch(
    `https://timbenniks-compositions.vercel.app/api/talks?limit=${limit.value}`
  )
);

function seeAll() {
  limit.value = 200;
  refresh();
}
</script>
<template>
  <div class="max-w-[1440px] mx-auto px-8 lg:p-0 my-8">
    <h3
      class="text-3xl md:text-5xl font-bold uppercase leading-none mb-8"
      v-if="title"
    >
      <span class="inline-block bg-black p-2">
        <span class="flowing-title inline">{{ title }}</span>
      </span>
      <br />
    </h3>

    <p class="mb-8 text-xl">
      <template v-if="limit === 10">
        <span class="mr-2">Showing the 10 latest talks.</span>
        <button class="cta fancy-image" @click="seeAll">Load all</button>
      </template>
      <template v-if="pending">Loading all talks...</template>
      <template v-if="limit !== 10 && !pending">
        Showing {{ talks.items.length }} talks</template
      >
    </p>

    <section
      v-if="talks"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
    >
      <Talk v-for="talk in talks.items" :talk="talk" :key="talk.slug" />
    </section>
  </div>
</template>
