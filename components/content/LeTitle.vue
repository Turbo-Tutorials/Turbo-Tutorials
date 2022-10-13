<script lang="ts" setup>
export interface Props {
  lines: string;
  as: string;
  uppercase?: boolean;
  variant?: "simple" | "default";
}

const props = withDefaults(defineProps<Props>(), {
  uppercase: true,
  variant: "default",
});

const lines = computed(() => {
  return props.lines.split("_");
});
</script>

<template>
  <component
    :is="as"
    class="text-3xl font-bold leading-none mb-4"
    :class="{
      'md:text-6xl': as === 'h1',
      'md:text-5xl': as === 'h2',
      'md:text-4xl': as === 'h3',
      'md:text-3xl': as === 'h4',
      'md:text-2xl': as === 'h5',
      'flowing-title': variant === 'simple',
      uppercase: uppercase,
    }"
  >
    <template v-if="variant === 'default'" v-for="line in lines">
      <span class="inline-block bg-black p-2">
        <span class="flowing-title inline">{{ line }}</span>
      </span>
      <br />
    </template>
    <template v-else>
      {{ lines.join(" ") }}
    </template>
  </component>
</template>
