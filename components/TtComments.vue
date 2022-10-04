<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
}>();

const meta = computed(() => props.component.data.commentsData.meta);
const videoId = computed(() => props.component.data.commentsData.videoId);
</script>

<template>
  <Comments :videoId="videoId" :meta="meta" />
</template>
