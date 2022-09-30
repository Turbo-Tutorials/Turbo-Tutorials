<script lang="ts" setup>
export type Poster = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Meta = {
  duration: string;
  views: number;
  likes: number;
  comments: number;
};

export type Comments = {
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

export type Tutorial = {
  slug: string;
  objectID?: string;
  _highlightresult?: {};
  title: string;
  description: string;
  poster: Poster;
  publicationDate: string;
  videoId: string;
  githubLink?: string;
  content?: string;
  meta?: Meta;
  comments?: Comments;
  tags: [];
  transcript: string;
  complexity: "Easy" | "Intermediate" | "Complex";
  small?: Boolean;
};

const props = defineProps<Tutorial>();

const { data: metadata } = await useAsyncData(
  `video-meta--${props.videoId}`,
  () => $fetch(`/api/video?videoId=${props.videoId}`)
);
</script>
<template>
  <div
    class="flex w-full"
    :class="{ 'flex-col md:flex-row': small, 'flex-col': !small }"
  >
    <div
      class="relative mb-2 aspect-[16/9]"
      :class="{ 'md:max-w-[280px] md:mr-4': small }"
    >
      <nuxt-link :to="`/tutorials/${slug}`">
        <AtomsImage
          v-if="poster"
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
      </nuxt-link>
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
    </div>
    <article>
      <h3 class="text-xl font-bold mb-1 md:line-clamp-2" v-if="title">
        <nuxt-link
          :to="`/tutorials/${slug}`"
          :class="{ underline: small, 'no-underline': !small }"
          >{{ title }}</nuxt-link
        >
      </h3>
      <p
        v-if="small && description"
        v-html="description"
        class="mb-4 md:line-clamp-2 hidden md:block"
      />
      <ul class="flex space-x-3">
        <li v-if="tags" v-for="tag in tags" class="uppercase text-sm">
          <!-- <nuxt-link class="text-grey" :to="`/tag/${tag}`">{{ tag }}</nuxt-link> -->
          <a class="text-grey" href="#">{{ tag }}</a>
        </li>
      </ul>

      <pre>{{ metadata }}</pre>
    </article>
  </div>
</template>
