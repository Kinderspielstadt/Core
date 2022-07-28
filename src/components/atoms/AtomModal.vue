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
        :class="`modal-box${darker ? ' bg-base-300' : ''}`"
        for=""
      >
        <label
          v-if="closeButton"
          :for="id"
          class="btn btn-sm btn-circle absolute right-2 top-2"
        >✕</label>
        <h3 class="font-bold text-lg">{{ title }}</h3>
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
    required: true,
  },
  darker: {
    type: Boolean,
    default: false,
  },
  closeButton: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['open']);
</script>

<style lang="scss" scoped>

</style>