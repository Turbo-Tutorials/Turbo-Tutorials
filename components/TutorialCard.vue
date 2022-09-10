<script lang="ts" setup>
type Poster = {
  src: string;
  alt: string;
  width: number;
  height: number;
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
  duration: string;
  views: number;
  likes: number;
  comments: number;
  tags: [];
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
          <span class="bg-black bg-opacity-50 px-1">{{ duration }}</span>
          <span class="bg-black bg-opacity-50 px-1">{{ views }} views</span>
          <span class="bg-black bg-opacity-50 px-1"
            >{{ comments }} comments</span
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
    </article>
  </div>
</template>
