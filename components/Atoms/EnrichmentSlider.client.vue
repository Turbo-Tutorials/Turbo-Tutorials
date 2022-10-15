<script lang="ts" setup>
import { useScores } from "@uniformDev/context-vue";

const props = defineProps<{
  enrichment: string;
  value: string;
}>();

const { $useUniformContext: useUniformContext } = useNuxtApp();
const { context } = useUniformContext();
const enrInfo = usePersonalizationForEnrichment(props.enrichment, props.value);
const scores = useScores();
const val = ref(scores.value[`${enrInfo.enrichmentId}_${enrInfo.valueId}`]);
const cap = ref(enrInfo.cap);

watch(scores, () => {
  val.value = scores.value[`${enrInfo.enrichmentId}_${enrInfo.valueId}`];
});

async function scoreIt() {
  await context.update({
    enrichments: [
      {
        str: val.value,
        cat: enrInfo.enrichmentId,
        key: enrInfo.valueId,
      },
    ],
  });
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
