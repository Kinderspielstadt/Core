<template>
  <Teleport to="body">
    <input
      :id="id"
      type="checkbox"
      class="modal-toggle"
      @change="$emit('open', {id, open: ($event.target as HTMLInputElement).checked})"
    />
    <label
      :for="id"
      class="modal cursor-pointer"
    >
      <label
        class="modal-box"
        :class="{
          'bg-base-300': darker,
          'w-auto': wAuto,
        }"
        for=""
      >
        <label
          v-if="closeButton"
          :for="id"
          class="btn-sm btn-circle btn sticky left-full top-2"
        >✕</label>
        <h3
          v-if="title"
          class="text-lg font-bold"
        >{{ title }}</h3>
        <p class="py-4"><slot /></p>
        <div class="modal-action">
          <slot name="action" />
        </div>
      </label>
    </label>
  </Teleport>
</template>

<script lang="ts" setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  darker: {
    type: Boolean,
    default: false,
  },
  closeButton: {
    type: Boolean,
    default: false,
  },
  wAuto: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['open']);
</script>

<style lang="scss" scoped>

</style>