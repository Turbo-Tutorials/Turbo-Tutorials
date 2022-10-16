<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  cap: {
    type: Number,
    default: 50,
  },
  category: String,
  val: String,
});

const emit = defineEmits(["update:modelValue"]);
const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    return emit("update:modelValue", Number(value));
  },
});
</script>

<template>
  <div>
    <label :for="`${category}-${val}`" class="block mb-1">
      <strong>{{ category }}</strong
      >: {{ val }} ({{ model }}/{{ cap }})
    </label>
    <input
      :id="`${category}-${val}`"
      class="w-full"
      type="range"
      min="0"
      :max="cap"
      step="1"
      v-model="model"
    />
  </div>
</template>
