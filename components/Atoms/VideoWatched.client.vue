<script lang="ts" setup>
const props = defineProps<{
  videoId: string;
}>();

const videoWatched = ref(useVideoWatched(props.videoId as string));
</script>

<template>
  <span
    class="absolute right-2 top-2 bg-black bg-opacity-50 px-1 text-sm"
    v-if="videoWatched"
    >watched</span
  >
</template>
