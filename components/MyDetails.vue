<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
}>();

const entry = computed(() => props.component.parameters.entry.value?.id);

const { data: myDetails } = await useAsyncData(entry.value.toString(), () => {
  return queryContent(`/${entry.value}`).findOne();
});
</script>

<template>
  <section class="bg-grey py-8">
    <div class="max-w-[1440px] mx-auto px-8 lg:p-0">
      <h3 class="text-3xl md:text-5xl font-bold uppercase leading-none mb-8">
        <span class="inline-block bg-black p-2">
          <span class="flowing-title inline">{{ myDetails.title }}</span>
        </span>
        <br />
      </h3>

      <ul class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <li v-for="dd in myDetails.data" :key="dd.key">
          <dl>
            <dt
              class="bg-black text-2xl font-bold text-white inline-block py-1 px-2 mb-2"
            >
              {{ dd.label }}
            </dt>
            <dd class="text-xl" v-if="dd.link">
              <a :href="dd.link" target="_blank" rel="noopener">{{ dd.val }}</a>
            </dd>
            <dd class="text-xl" v-else>{{ dd.val }}</dd>
          </dl>
        </li>
      </ul>
    </div>
  </section>
</template>
