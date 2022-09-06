<script lang="ts" setup>
import { resolveRenderer } from "./components/componentMapping";

useSchemaOrg([
  defineWebSite({
    name: "Tim Benniks Press kit",
  }),
  definePerson({
    name: "Tim Benniks",
    image: "/icon.png",
    sameAs: ["https://timbenniks.dev/"],
  }),
  defineWebPage(),
]);
useHead({
  viewport: "width=device-width, initial-scale=1",
  charset: "utf-8",
  htmlAttrs: {
    lang: "en",
  },
  link: [
    { rel: "icon", href: "/icon.png" },
    { rel: "apple-touch-icon", href: "/icon.png" },
    { rel: "manifest", href: "/manifest.json" },
  ],
  meta: [
    {
      name: "theme-color",
      content: "#14356b",
    },
    {
      name: "description",
      content: "Press kit page for Tim Benniks",
    },
    {
      name: "og:description",
      content: "Press kit page for Tim Benniks",
    },
    {
      name: "twitter:description",
      content: "Press kit page for Tim Benniks",
    },
    {
      property: "og:site_name",
      content: "Tim Benniks Press kit",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://presskit.timbenniks.dev",
    },
    {
      property: "og:title",
      content: "Tim Benniks Press kit",
    },
    {
      property: "og:image",
      content:
        "https://res.cloudinary.com/dwfcofnrd/image/upload/f_auto,q_auto,w_1280/Presskit/FDLC2019_462.jpg",
    },
    {
      property: "twitter:image",
      content:
        "https://res.cloudinary.com/dwfcofnrd/image/upload/f_auto,q_auto,w_1280/Presskit/FDLC2019_462.jpg",
    },
    {
      property: "twitter:title",
      content: "Tim Benniks Press kit",
    },
    {
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      property: "twitter:url",
      content: "https://presskit.timbenniks.dev/",
    },
    {
      property: "twitter:domain",
      content: "presskit.timbenniks.dev",
    },
    {
      property: "twitter:site",
      content: "@timbenniks",
    },
  ],
});

// const { $useComposition } = useNuxtApp();
// const { data } = await $useComposition({ slug: "/" });
// const composition = computed(() => data.value.composition);
</script>
<template>
  <Head>
    <Link rel="preconnect" href="https://res.cloudinary.com"></Link>
    <Link rel="preconnect" href="https://fonts.googleapis.com"></Link>
    <Link rel="canonical" href="https://presskit.timbenniks.dev"></Link>
    <Meta name="viewport" content="width=device-width, initial-scale=1"></Meta>
    <Style
      href="https://fonts.googleapis.com/css2?family=Lato:wght@400;900&display=swap"
    ></Style>
    <Title>Tim Benniks Press kit</Title>
  </Head>
  <main class="max-w-[1512px] mx-auto">
    <!-- <Composition
      v-if="composition"
      :data="composition"
      :resolve-renderer="resolveRenderer"
    >
      <SlotContent name="components" />
    </Composition> -->

    <h1>Hi</h1>
  </main>
</template>
