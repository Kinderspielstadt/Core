<template>
  <AtomHeroText>
    <div
      v-if="!option"
      class="flex flex-col gap-4"
    >
      <span>Option auswählen:</span>
      <div class="flex flex-wrap gap-4">
        <button
          class="btn btn-primary grow"
          @click="option = PollsOptionOptions.A"
        >
          Option A
        </button>
        <button
          class="btn btn-primary grow"
          @click="option = PollsOptionOptions.B"
        >
          Option B
        </button>
        <button
          class="btn btn-primary grow"
          @click="option = PollsOptionOptions.C"
        >
          Option C
        </button>
        <button
          class="btn btn-primary grow"
          @click="option = PollsOptionOptions.D"
        >
          Option D
        </button>
      </div>
    </div>
    <div v-else>
      Option: {{ option }}
    </div>
    <div
      v-if="error"
      class="alert alert-error mt-6 shadow-lg"
    >
      <XCircleIcon class="h-6 w-6" />
      <span class="text-base font-normal"><b>Fehler:</b> {{ error }}</span>
    </div>
    <Transition enter-active-class="animate__animated animate__fast animate__tada">
      <div
        v-if="success"
        class="alert alert-success mt-6 shadow-lg"
      >
        <CheckCircleIcon class="h-6 w-6" />
        <span class="text-base font-normal">Erfolgreich abgestimmt</span>
      </div>
    </Transition>
  </AtomHeroText>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import { PollsOptionOptions } from '../../types/pocketbase.types';
import { PollsService } from '../../services/polls.service';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline';
import AtomHeroText from '../atoms/AtomHeroText.vue';

const option = ref<PollsOptionOptions>();
const accountId = ref<string>('');
const error = ref('');
const success = ref(false);
const timeout = ref<number>();

onKeyStroke(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Enter'], async (e) => {
  e.preventDefault();
  error.value = '';
  if(e.key === 'Enter' && option.value) {
    clearTimeout(timeout.value);
    try {
      success.value = false;
      error.value = '';
      await PollsService.addPollOption({ accountNumber: accountId.value, option: option.value });
      accountId.value = '';
      success.value = true;
      timeout.value = setTimeout(() => {
        success.value = false;
      }, 3000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      success.value = false;
      if(e.status == 404) {
        accountId.value = '';
        error.value = 'Der Account wurde nicht gefunden.';
        timeout.value = setTimeout(() => {
          error.value = '';
        }, 3000);
      } else if(e.status == 400 && e.data?.data.accountNumber.code == 'validation_not_unique') {
        accountId.value = '';
        error.value = 'Der Account hat bereits abgestimmt.';
        timeout.value = setTimeout(() => {
          error.value = '';
        }, 3000);
      } else {
        error.value = 'Ein unerwarteter Fehler ist aufgetreten. Bitte kontaktiere einen Administrator.';
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }
  } else {
    accountId.value += e.key;
  }
});
</script>

<style lang="scss" scoped>

</style>