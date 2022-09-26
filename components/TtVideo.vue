<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";
import type { Tutorial } from "../types";

const props = defineProps<{
  component: ComponentInstance;
  video: Tutorial;
}>();

const video = computed(() => props.component.data.video);
</script>

<template>
  <div class="max-w-[1440px] mx-auto px-4 xl:p-0 mb-16">
    <div>
      <lite-youtube
        params="modestbranding=2&rel=0"
        :videoid="video.videoId"
        :play-label="video.title"
      ></lite-youtube>
      <div>dddd</div>
    </div>

    <pre>{{ video }}</pre>
  </div>
</template>
