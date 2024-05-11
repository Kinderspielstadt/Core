<script lang="ts" setup>
import { ref } from 'vue';
import { onKeyStroke, promiseTimeout } from '@vueuse/core';
import { AccountService } from '../../services/account.service';
import { DateService } from '../../services/date.service';
import { XCircleIcon } from '@heroicons/vue/24/outline';
import AtomHeroText from '../atoms/AtomHeroText.vue';

const DEFAULT_MESSAGE = 'Bitte Karte scannen...';
const accountId = ref<string>('');
const message = ref<string>(DEFAULT_MESSAGE);
const error = ref('');

onKeyStroke(
  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Enter'],
  async (e) => {
    e.preventDefault();
    error.value = '';
    if (e.key === 'Enter') {
      try {
        const account = await AccountService.checkIn(accountId.value);
        accountId.value = '';
        message.value = `${account.firstName} ${account.lastName} um ${DateService.toTime(new Date(account.lastCheckIn))}`;
        await promiseTimeout(5000);
        message.value = DEFAULT_MESSAGE;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (e.status == 404) {
          accountId.value = '';
          error.value = 'Der Account wurde nicht gefunden.';
          await promiseTimeout(3000);
          error.value = '';
        } else {
          error.value =
            'Ein unerwarteter Fehler ist aufgetreten. Bitte kontaktiere einen Administrator.';
          // eslint-disable-next-line no-console
          console.error(e);
        }
      }
    } else {
      accountId.value += e.key;
    }
  },
);
</script>

<template>
  <AtomHeroText>
    {{ message }}
    <div v-if="error" class="alert alert-error mt-6 shadow-lg">
      <XCircleIcon class="h-6 w-6" />
      <span class="text-base font-normal"><b>Fehler:</b> {{ error }}</span>
    </div>
  </AtomHeroText>
</template>
