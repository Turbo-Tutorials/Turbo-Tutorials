<script lang="ts" setup>
const props = defineProps<{
  videoId: string;
}>();

const { data: metadata } = await useAsyncData(props.videoId, () =>
  $fetch(`/api/video?videoId=${props.videoId}`)
);
const { meta } = metadata.value;
</script>
<template>
  <div v-if="meta" class="absolute left-1 bottom-1 space-x-1 text-sm">
    <span v-if="meta.duration" class="bg-black bg-opacity-50 px-1">{{
      meta.duration
    }}</span>
    <span v-if="meta.views" class="bg-black bg-opacity-50 px-1"
      >{{ meta.views }} {{ meta.views === 1 ? "view" : "views" }}</span
    >
    <span v-if="meta.comments" class="bg-black bg-opacity-50 px-1"
      >{{ meta.comments }} comments</span
    >
  </div>
</template>
