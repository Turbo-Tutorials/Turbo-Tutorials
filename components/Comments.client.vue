<script lang="ts" setup>
const props = defineProps<{
  meta: {};
  videoId: string;
}>();

// no cache for this one
const { data: videoData } = await useAsyncData(() =>
  $fetch(`/api/video?videoId=${props.videoId}&withComments=true`)
);
</script>

<template>
  <div class="comments px-4 md:p-0 mb-8 md:mb-0">
    <AtomsLeTitle as="h4" :lines="`Comments (${videoData.meta.comments})`" />
    <p class="mb-4" v-if="videoData.comments.length > 0">
      <a
        target="_blank"
        rel="noopener"
        :href="`https://youtube.com/watch?v=${videoId}`"
        >Comment on YouTube</a
      >
    </p>

    <ul v-if="videoData.comments.length > 0">
      <li v-for="comment in videoData.comments" :key="comment.topLevel.date">
        <article class="mb-2 bg-[#1a2f4b] p-4">
          <p class="font-bold">
            {{ comment.topLevel.author }}
          </p>
          <p v-html="comment.topLevel.text" />
        </article>

        <ul v-if="comment.replies" class="ml-4">
          <li
            v-for="reply in comment.replies"
            :key="reply.date"
            class="bg-[#1a3151] p-2 mb-2"
          >
            <p class="font-bold">
              {{ reply.author }}
            </p>
            <p v-html="reply.text" />
          </li>
        </ul>
      </li>
    </ul>

    <p class="my-4" v-if="videoData.comments.length > 0">
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
