<script lang="ts" setup>
import type { ComponentInstance } from "@uniformdev/canvas";

const props = defineProps<{
  component: ComponentInstance;
}>();

const image = computed(() => props.component.parameters.image.value[0]);
</script>

<template>
  <div class="max-w-[1440px] mx-auto px-8 lg:p-0">
    <section class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-40">
      <SlotContent name="left" v-slot="{ child, component }">
        <article>
          <component :is="child" v-bind="{ component }" />
        </article>
      </SlotContent>

      <SlotContent name="right" v-slot="{ child, component }">
        <article>
          <component :is="child" v-bind="{ component }" />
        </article>
      </SlotContent>
    </section>
  </div>

  <AtomsImage
    :alt="image.alt"
    :width="image.width"
    :height="image.height"
    :public-id="image.publicId"
    :widths="image.widths.split(',')"
    loading="lazy"
    fetchpriority="low"
  />
</template>
