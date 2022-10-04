<script lang="ts" setup>
const props = defineProps<{
  enrichment: string;
  value: string;
}>();

const { bus, emit } = useEventBus();

const { $useUniformContext: useUniformContext } = useNuxtApp();
const { context } = useUniformContext();

const scoreForEnrichment = usePersonalizationForEnrichment(
  props.enrichment,
  props.value
);

const val = ref(scoreForEnrichment.value);
const cap = ref(scoreForEnrichment.cap);

async function scoreIt() {
  await context.update({
    enrichments: [
      {
        str: val.value,
        cat: scoreForEnrichment.enrichmentId,
        key: scoreForEnrichment.valueId,
      },
    ],
  });

  emit("EnrichmentsUpdated");

  watch(
    () => bus.value.get("ResetEnrichment"),
    () => {
      val.value = 0;
    }
  );
}
</script>

<template>
  <div class="flex space-x-4 mb-4">
    <input
      class="block w-40"
      type="range"
      v-model="val"
      min="0"
      :max="cap"
      step="1"
      :id="`${enrichment}-${value}`"
      @change="scoreIt"
    />
    <label
      :for="`${enrichment}-${value}`"
      class="block font-bold uppercase text-sm"
    >
      {{ value }}
    </label>
  </div>
</template>
