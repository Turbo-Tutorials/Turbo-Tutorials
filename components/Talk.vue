<template>
  <div class="flex w-full">
    <AtomsDate
      :day="talk.date.day"
      :month="talk.date.month"
      :year="talk.date.year"
      class="w-24"
    />
    <article class="talk-list-item">
      <p
        v-if="talk.date.upcoming"
        class="font-bold text-sm inline-block flowing-title mb-1"
      >
        UPCOMING
      </p>
      <h4 class="text-lg uppercase font-bold mb-2">
        <a :href="talk.link" class="underline" rel="noopener" target="_blank">{{
          talk.conference
        }}</a>
      </h4>
      <p class="mt-1 line-clamp-2">{{ talk.talk }}</p>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    talk: {
      type: Object,
      required: true,
    },
  },
};
</script>
