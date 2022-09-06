<script lang="ts" setup>
function createSrcSet(widths: Array<number>, publicId: string) {
  const baseUrl = "https://res.cloudinary.com/dwfcofnrd/image/upload";

  const result = widths.map((width) => {
    return `${baseUrl}/f_auto,q_auto,w_${width}/${publicId} ${width}w`;
  });

  return result.join(",");
}

const props = defineProps<{
  publicId: string;
  width: number | string;
  height: number | string;
  widths: Array<number>;
  alt: string;
  loading: "lazy" | "eager";
  fetchpriority: "low" | "high";
}>();

const srcset = computed(() => {
  return createSrcSet(props.widths, props.publicId);
});
</script>

<template>
  <img
    :srcset="srcset"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="loading"
    :fetchpriority="fetchpriority"
  />
</template>
