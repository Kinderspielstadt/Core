<script lang="ts" setup>
import { ref } from 'vue';
import AtomInput from './AtomInput.vue';

const input = ref<InstanceType<typeof HTMLInputElement>>();
const error = ref(false);
const dirty = ref(false);

const props = withDefaults(
  defineProps<{
    min?: number;
    max?: number;
    value?: number;
  }>(),
  {
    perHour: false,
    min: 1,
    max: 1_000_000,
    value: undefined,
  },
);

const model = defineModel<number>();

function onKeyUp(event: KeyboardEvent) {
  error.value = false;
  const value = parseInt((event.target as HTMLInputElement).value);

  if (isNaN(value)) {
    error.value = true;
  } else if (value < props.min) {
    error.value = true;
  } else if (value > props.max) {
    error.value = true;
  } else {
    emit('change', value);
  }
}

function reset() {
  if (input.value) {
    input.value.value = '';
  }
}

const emit = defineEmits<{
  change: [value: number];
}>();

defineExpose({
  reset,
});
</script>

<template>
  <div class="relative">
    <AtomInput
      v-model="model"
      type="number"
      class="pr-16 text-right"
      :class="{
        '!border-error': error && dirty,
      }"
      step="1"
      :min="min"
      :max="max"
      @keyup="onKeyUp"
      @keydown="dirty = true"
    />
    <span class="pointer-events-none absolute top-2/4 -ml-16 -mt-3 opacity-50"
      >,00 Öro</span
    >
  </div>
</template>
