<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";
import type { Tutorial } from "../types";

const transcriptShown = ref(false);

const props = defineProps<{
  component: ComponentInstance;
  video: Tutorial;
}>();

const video = computed(() => props.component.data.video);
</script>

<template>
  <div class="max-w-[1440px] mx-auto px-4 xl:p-0 mb-16">
    <figure class="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-6 mb-4">
      <section>
        <lite-youtube
          params="modestbranding=2&rel=0"
          :videoid="video.videoId"
          :play-label="video.title"
        ></lite-youtube>
        <div
          class="bg-black p-2 cursor-pointer"
          @click="transcriptShown = !transcriptShown"
        >
          <span
            class="font-black inline-block transition-all"
            :class="{ 'rotate-90': transcriptShown }"
            >&rsaquo;</span
          >
          <button class="underline pl-2 bg-none">Transcript</button>
        </div>
        <div
          class="p-4 columns-2 bg-opacity-50 bg-black"
          v-show="transcriptShown"
          v-html="video.transcript"
        ></div>
      </section>

      <figcaption class="pr-8">
        <article class="mb-6">
          <p class="uppercase px-2 py-1 bg-black mb-2 font-bold inline-block">
            Description
          </p>
          <p v-html="video.description"></p>
        </article>
        <section class="mb-6">
          <p class="uppercase px-2 py-1 bg-black mb-2 font-bold inline-block">
            Tags
          </p>
          <ul class="flex space-x-2">
            <li class="uppercase" v-for="tag in video.tags" :key="tag">
              <a href="#">{{ tag }}</a>
            </li>
          </ul>
        </section>
        <section class="mb-6">
          <p class="uppercase px-2 py-1 bg-black mb-2 font-bold inline-block">
            Links
          </p>
          <ul class="flex space-x-2">
            <li><AtomsLeIcon icon="github" :url="video.githubLink" /></li>
            <li>
              <AtomsLeIcon
                icon="youtube"
                :url="`https://youtube.com/watch?v=${video.videoId}`"
              />
            </li>
          </ul>
        </section>
        <section>
          <p class="uppercase px-2 py-1 bg-black mb-2 font-bold inline-block">
            Metadata
          </p>
          <ul class="list-disc list-inside">
            <li v-if="video.meta.duration">{{ video.meta.duration }}</li>
            <li v-if="video.meta.views">
              {{ video.meta.views }}
              {{ video.meta.views === 1 ? "view" : "views" }}
            </li>
            <li v-if="video.meta.comments">
              {{ video.meta.comments }} comments
            </li>
            <li v-if="video.meta.likes">
              {{ video.meta.likes }}
              {{ video.meta.likes === 1 ? "like" : "likes" }}
            </li>
          </ul>
        </section>
      </figcaption>
    </figure>

    <div v-html="video.content" class="mb-12 rich-text"></div>
  </div>
</template>
