<template>
  <div class="flex w-full flex-col items-center gap-4 p-8">
    <h1 class="text-4xl">Abstimmungsergebnisse</h1>
    <div
      v-if="results"
      class="stats"
    >
      <div class="stat place-items-center">
        <div class="stat-title">Option A</div>
        <div class="stat-value">{{ results.filter((poll) => poll.option === 'A').length }}</div>
        <div class="stat-desc">Abstimmungen</div>
      </div>
      <div class="stat place-items-center">
        <div class="stat-title">Option B</div>
        <div class="stat-value">{{ results.filter((poll) => poll.option === 'B').length }}</div>
        <div class="stat-desc">Abstimmungen</div>
      </div>
      <div class="stat place-items-center">
        <div class="stat-title">Option C</div>
        <div class="stat-value">{{ results.filter((poll) => poll.option === 'C').length }}</div>
        <div class="stat-desc">Abstimmungen</div>
      </div>
      <div class="stat place-items-center">
        <div class="stat-title">Option D</div>
        <div class="stat-value">{{ results.filter((poll) => poll.option === 'D').length }}</div>
        <div class="stat-desc">Abstimmungen</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { UnsubscribeFunc } from 'pocketbase';
import { PollsResponse } from '../../types/pocketbase.types';
import { PollsService } from '../../services/polls.service';

const results = ref<PollsResponse[]>();
const subscription = ref<UnsubscribeFunc>();

onMounted(async () => {
  results.value = await PollsService.getPollResult();
  subscription.value = await PollsService.subscribeToPollChanges((pollSubscription) => {
    if(results.value) {
      switch (pollSubscription.action) {
      case 'create':
        results.value.push(pollSubscription.record);
        break;
      case 'update':
        results.value = results.value.map((result) => {
          if(result.id == pollSubscription.record.id) {
            result = pollSubscription.record;
          }
          return result;
        });
        break;
      case 'delete':
        results.value = results.value.filter((result) => result.id !== pollSubscription.record.id);
        break;
      }
    }
  });
});

onUnmounted(() => {
  subscription.value?.();
});
</script>

<style lang="scss" scoped>

</style>