<script lang="ts" setup>
const props = defineProps<{
  lines: string;
  as: string;
}>();

const lines = computed(() => {
  return props.lines.split("_");
});
</script>

<template>
  <component
    :is="as"
    class="text-3xl font-bold uppercase leading-none mb-4"
    :class="{
      'md:text-6xl': as === 'h1',
      'md:text-5xl': as === 'h2',
      'md:text-4xl': as === 'h3',
    }"
  >
    <template v-for="line in lines">
      <span class="inline-block bg-black p-2">
        <span class="flowing-title inline">{{ line }}</span>
      </span>
      <br />
    </template>
  </component>
</template>
