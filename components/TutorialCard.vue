<script lang="ts" setup>
import { CommentRaws } from "postcss/lib/comment";

type Poster = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type Meta = {
  duration: string;
  views: number;
  likes: number;
  comments: number;
};

type Comments = {
  topLevel: {
    author: string;
    image: string;
    text: string;
    date: string;
  };
  replies: {
    author: string;
    image: string;
    text: string;
    date: string;
  };
};

type Tutorial = {
  slug: string;
  title: string;
  description: string;
  poster: Poster;
  publicationDate: string;
  videoId: string;
  githubLink?: string;
  content?: string;
  meta: Meta;
  comments?: Comments;
  tags: [];
  transcript: string;
};

defineProps<Tutorial>();
</script>
<template>
  <div class="flex w-full">
    <article class="tutorial">
      <div class="relative mb-2">
        <AtomsImage
          :alt="poster.alt"
          :width="poster.width"
          :height="poster.height"
          :public-id="poster.src"
          :widths="[375, 500, 700]"
          loading="lazy"
          fetchpriority="low"
          :fetch="true"
          class="fancy-image"
        />
        <div class="absolute left-1 bottom-1 space-x-1 text-sm">
          <span class="bg-black bg-opacity-50 px-1">{{ meta.duration }}</span>
          <span class="bg-black bg-opacity-50 px-1"
            >{{ meta.views }} {{ meta.views === 1 ? "view" : "views" }}</span
          >
          <span class="bg-black bg-opacity-50 px-1"
            >{{ meta.comments }} comments</span
          >
        </div>
      </div>
      <h3 class="text-xl font-bold mb-2">
        {{ title }}
      </h3>
      <ul class="flex space-x-3">
        <li v-for="tag in tags" class="uppercase text-sm">
          <!-- <nuxt-link class="text-grey" :to="`/tag/${tag}`">{{ tag }}</nuxt-link> -->
          <a class="text-grey" href="#">{{ tag }}</a>
        </li>
      </ul>
      <!-- <div v-html="transcript" /> -->
    </article>
  </div>
</template>
