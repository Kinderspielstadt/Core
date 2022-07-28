<template>
  <AtomHeroText>
    {{ message }}
    <div
      v-if="accountNotFound"
      class="alert alert-error shadow-lg mt-6"
    >
      <div>
        <XCircleIcon class="w-6 h-6" />
        <span class="text-base font-normal">Fehler: Der Account wurde nicht gefunden.</span>
      </div>
    </div>
  </AtomHeroText>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { onKeyStroke, promiseTimeout } from '@vueuse/core';
import { AccountService } from '../services/account.service';
import { DateService } from '../services/date.service';
import AtomHeroText from '../atoms/AtomHeroText.vue';

const DEFAULT_MESSAGE = 'Bitte Karte scannen...';
const accountId = ref<string>('');
const message = ref<string>(DEFAULT_MESSAGE);
const accountNotFound = ref<boolean>(false);

onKeyStroke(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Enter'], async (e) => {
  e.preventDefault();
  accountNotFound.value = false;
  if(e.key === 'Enter') {
    try {
      const account = await AccountService.checkIn(accountId.value);
      accountId.value = '';
      message.value = `${account.firstName} ${account.lastName} um ${DateService.toTime(account.lastCheckIn)}`;
      await promiseTimeout(5000);
      message.value = DEFAULT_MESSAGE;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if(error.message == 'Account not found') {
        accountId.value = '';
        accountNotFound.value = true;
        await promiseTimeout(3000);
        accountNotFound.value = false;
      } else {
      // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  } else {
    accountId.value += e.key;
  }
});
</script>

<style lang="scss" scoped>

</style>