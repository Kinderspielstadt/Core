<script lang="ts" setup>
import { onMounted, useSlots } from 'vue';

const slots = useSlots();

const props = withDefaults(
  defineProps<{
    id: string;
    title?: string;
    darker?: boolean;
    closeButton?: boolean;
    wAuto?: boolean;
  }>(),
  {
    title: '',
    darker: false,
    closeButton: false,
    wAuto: false,
  },
);

function show(): void {
  (document.getElementById(props.id) as HTMLDialogElement)?.showModal();
}

function close(): void {
  (document.getElementById(props.id) as HTMLDialogElement)?.close();
}

function isOpen(): boolean {
  return (document.getElementById(props.id) as HTMLDialogElement)?.open;
}

onMounted(() => {
  (document.getElementById(props.id) as HTMLDialogElement).addEventListener(
    'close',
    () => {
      emit('close');
    },
  );
});

const emit = defineEmits<{
  close: [];
}>();

defineExpose({
  show,
  close,
  isOpen,
});
</script>

<template>
  <Teleport to="body">
    <dialog :id="id" class="modal">
      <form
        method="dialog"
        class="modal-box"
        :class="{
          'bg-base-300': darker,
          'w-auto': wAuto,
          'max-w-none': wAuto,
        }"
      >
        <button
          v-if="closeButton"
          class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 v-if="title" class="text-lg font-bold">
          {{ title }}
        </h3>
        <p class="py-4"><slot /></p>
        <div v-if="slots['action']" class="modal-action">
          <slot name="action" />
        </div>
      </form>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </Teleport>
</template>
