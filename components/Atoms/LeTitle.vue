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
  <component :is="as">
    <template v-for="line in lines">
      <span class="inline-block bg-black p-2">
        <span class="flowing-title inline">{{ line }}</span>
      </span>
      <br />
    </template>
  </component>
</template>
