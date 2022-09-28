<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
}>();

const comments = computed(() => props.component.data.commentsData.comments);
const meta = computed(() => props.component.data.commentsData.meta);
const videoId = computed(() => props.component.data.commentsData.videoId);
</script>

<template>
  <div class="comments">
    <AtomsLeTitle as="h4" :lines="`Comments (${meta.comments})`" />
    <p class="mb-4" v-if="comments.length > 0">
      <a
        target="_blank"
        rel="noopener"
        :href="`https://youtube.com/watch?v=${videoId}`"
        >Comment on YouTube</a
      >
    </p>

    <ul v-if="comments.length > 0">
      <li v-for="comment in comments" :key="comment.topLevel.date">
        <article class="mb-4 bg-[#1a2f4b] p-4">
          <p class="font-bold">
            {{ comment.topLevel.author }}
          </p>
          <p v-html="comment.topLevel.text" />
        </article>

        <ul v-if="comment.replies" class="ml-4">
          <li
            v-for="reply in comment.replies"
            :key="reply.date"
            class="bg-[#1a3151] p-4 mb-4"
          >
            <p class="font-bold">
              {{ reply.author }}
            </p>
            <p v-html="reply.text" />
          </li>
        </ul>
      </li>
    </ul>

    <p class="my-4" v-if="comments.length > 0">
      <a
        target="_blank"
        rel="noopener"
        :href="`https://youtube.com/watch?v=${videoId}`"
        >Comment on YouTube</a
      >
    </p>

    <p v-else>
      No comments yet.
      <a
        target="_blank"
        rel="noopener"
        :href="`https://youtube.com/watch?v=${videoId}`"
        >Comment on YouTube</a
      >
    </p>
  </div>
</template>
