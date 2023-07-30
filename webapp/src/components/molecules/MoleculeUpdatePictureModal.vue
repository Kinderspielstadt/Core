<template>
  <AtomModal
    :id="id"
    ref="modal"
    @close="nextTick(() => { videoPaused = false; video?.play(); })"
  >
    <div class="flex flex-col gap-4">
      <select
        v-model="currentCamera"
        class="select select-primary w-full"
      >
        <option
          v-for="camera of cameras"
          :value="camera.deviceId"
        >
          {{ camera.label }}
        </option>
      </select>
      <video
        ref="video"
        muted
        autoplay
        playsinline
        class="h-full w-auto rounded-lg"
      />
      <button
        v-if="!videoPaused"
        class="btn btn-primary"
        @click.prevent="video?.pause(); videoPaused = true"
      >
        <CameraIcon class="h-5 w-5" />Foto
      </button>
      <div
        v-else
        class="flex gap-2"
      >
        <button
          class="btn btn-primary grow"
          @click.prevent="video?.play(); videoPaused = false"
        >
          <ArrowPathIcon class="h-5 w-5" />Neuer Versuch
        </button>
        <button
          class="btn btn-primary grow"
          @click.prevent="screenshot"
        >
          <ArrowUpTrayIcon class="h-5 w-5" />Foto hochladen
        </button>
      </div>
    </div>
  </AtomModal>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch, watchEffect } from 'vue';
import { useDevicesList, useUserMedia } from '@vueuse/core';
import { ArrowPathIcon, ArrowUpTrayIcon, CameraIcon } from '@heroicons/vue/24/outline';
import { AccountService } from '../../services/account.service';
import AtomModal from '../atoms/AtomModal.vue';

const currentCamera = ref<string>();
const modal = ref<InstanceType<typeof AtomModal>>();
const accountId = ref('');
const videoPaused = ref(false);

const { videoInputs: cameras } = useDevicesList({
  requestPermissions: true,
  onUpdated() {
    if(!cameras.value.find(i => i.deviceId === currentCamera.value))
    {currentCamera.value = cameras.value[0]?.deviceId;}
  },
});

const video = ref<HTMLVideoElement>();
const { stream, enabled } = useUserMedia({
  constraints: { video: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    deviceId: currentCamera,
    width: 1920,
    height: 1080,
    // aspectRatio: 1, // TODO: Fix aspect ratio
    frameRate: 30,
  } },
});

watchEffect(() => {
  if(video.value) {
    video.value.srcObject = stream.value!;
  }
});

async function screenshot() {
  const canvas = document.createElement('canvas');
  canvas.width = video.value!.videoWidth;
  canvas.height = video.value!.videoHeight;
  canvas.getContext('2d')?.drawImage(video.value!, 0, 0);
  const image = atob(canvas.toDataURL('image/png').split(',')[1]);
  const array = new Uint8Array(image.length);
  for(let i = 0; i < image.length; i++) {
    array[i] = image.charCodeAt(i);
  }
  const formData = new FormData();
  formData.append('picture', new File([array], 'picture.png', { type: 'image/png' }));
  await AccountService.updatePicture(accountId.value, formData);
  modal.value?.close();
  videoPaused.value = false;
}

function disableCamera() {
  enabled.value = false;
  videoPaused.value = false;
}

watch(currentCamera, () => {
  enabled.value = false;
  nextTick(() => enabled.value = true);
});

defineProps<{
  id: string,
}>();

defineExpose({
  show: (id: string) => {
    accountId.value = id;
    modal.value?.show();
    enabled.value = true;
  },
  close: () => modal.value?.close(),
  isOpen: () => modal.value?.isOpen(),
  disableCamera,
});
</script>

<style lang="scss" scoped>

</style>