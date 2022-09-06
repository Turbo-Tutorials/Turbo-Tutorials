<template>
  <component :is="tag" class="date-field inline-bloc">
    <div class="mr-4 item-date">
      <div
        class="date-wrap fancy-image bg-black py-2 px-4 text-white uppercase text-center font-bold"
      >
        <span class="block leading-none text-4xl pb-1">{{ day }}</span>
        <span class="block leading-none text-base pb-1 uppercase">{{
          month
        }}</span>
        <span class="block leading-none text-base pb-1">{{ year }}</span>
      </div>
    </div>
  </component>
</template>

<script>
export default {
  name: "Date",
  props: {
    day: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },

    tag: {
      type: String,
      required: false,
      default: "div",
    },
  },
};
</script>

<style scoped lang="postcss">
.item-date {
  @apply relative;
  aspect-ratio: 6/7;

  .date-wrap {
    @apply relative z-10;
  }
}
</style>
