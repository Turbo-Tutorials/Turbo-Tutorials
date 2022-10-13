<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const { $useUniformContext } = useNuxtApp();
const { context } = $useUniformContext();

defineProps<{
  component: ComponentInstance;
  title?: string;
  titleType?: string;
}>();

async function setQuirk() {
  await context.update({
    quirks: {
      coffeeClick: true,
    },
  });
}
</script>

<template>
  <div class="max-w-[1440px] mx-auto px-4 xl:p-0 mb-12 rich-text text-xl">
    <AtomsLeTitle :as="titleType" :lines="title" />
    <p>
      This website is created and maintained by
      <a
        href="https://timbenniks.dev"
        title="Tim's Website"
        rel="noopener"
        target="_blank"
        >Tim Benniks</a
      >. It will always be free and it uses the
      <a href="/pwyw" rel="noopener" title="PWYW Wikipedia"
        >Pay What You Want</a
      >
      model.
    </p>
    <p>
      If the content helps you in any way, feel free to donate by buying Tim a
      few coffee's at:
      <a
        @click="setQuirk"
        href="https://www.buymeacoffee.com/timbenniks"
        rel="noopener"
        title="Buy Me A Coffee"
        target="_blank"
      >
        <img
          loading="lazy"
          class="w-44 block mt-4"
          width="180"
          height="50"
          src="https://timbenniks.dev/_nuxt/image/300411.png"
          alt="Buy Me A Coffee"
        />
      </a>
    </p>
  </div>
</template>
