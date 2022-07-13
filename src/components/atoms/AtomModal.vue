<template>
  <Teleport to="body">
    <input
      :id="id"
      type="checkbox"
      class="modal-toggle"
      @change="$emit('open', {id, open: ($event.target as HTMLInputElement).checked})"
    />
    <div class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">{{ title }}</h3>
        <p class="py-4"><slot /></p>
        <div class="modal-action">
          <slot name="action" />
        </div>
      </div>
    </div>
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
});

defineEmits(['open']);
</script>

<style lang="scss" scoped>

</style>