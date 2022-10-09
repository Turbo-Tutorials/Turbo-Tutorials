<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
  title?: string;
  crumbs?: [];
}>();

const title = computed(() => props.component.data?.title || false);
const complexity = computed(() =>
  props.component.data?.complexity.toLowerCase()
);
const tags = computed(() => {
  return props.component.data?.selectedTags.replace(/,/g, ", ");
});

const crumbs = computed(() => {
  const route = useRoute();
  const pathArray = route.path.split("/");
  pathArray.shift();

  const breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
    if (path) {
      breadcrumbArray.push({
        path,
        to: breadcrumbArray[idx - 1]
          ? "/" + breadcrumbArray[idx - 1].path + "/" + path
          : "/" + path,
        text: path
          .replace(/-/g, " ")
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      });
    }
    return breadcrumbArray;
  }, []);

  return breadcrumbs;
});
</script>

<template>
  <div class="max-w-[1440px] mx-auto px-4 xl:p-0 mb-16">
    <ol itemscope itemtype="https://schema.org/BreadcrumbList">
      <li
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <nuxt-link
          to="/"
          itemtype="https://schema.org/Thing"
          itemprop="item"
          class="underline"
        >
          <span itemprop="name">HOME</span>
        </nuxt-link>
        <meta itemprop="position" content="1" />
      </li>
      <li
        v-for="(crumb, index) in crumbs"
        :key="crumb.path"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <nuxt-link
          :to="
            crumb.to.includes('/tutotials/') ? `/videos${crumb.to}/` : crumb.to
          "
          itemtype="https://schema.org/Thing"
          itemprop="item"
        >
          <span itemprop="name" class="line-clamp-1 underline uppercase">{{
            crumb.text
          }}</span>
        </nuxt-link>

        <meta :content="index + 2" itemprop="position" />
      </li>
    </ol>
    <AtomsLeTitle v-if="title" as="h1" :lines="title" :uppercase="false" />
    <p class="text-grey">
      Personalizing for interest: {{ tags }} and complexity: {{ complexity }}.
      Manage your
      <nuxt-link to="/personalization-profile/"
        >personalisation profile</nuxt-link
      >.
    </p>
  </div>
</template>

<style lang="postcss" scoped>
ol {
  @apply flex text-base mr-3 mb-2 text-grey;

  li {
    @apply mr-5 relative;
  }

  li:before {
    content: "›";
    @apply font-black -left-3 absolute top-0;
  }

  li:last-child {
    @apply m-0;
  }

  li:first-child::before {
    @apply hidden;
  }
}
</style>
