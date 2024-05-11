<script lang="ts" setup>
import { ref } from 'vue';
import { AuthService } from '../../services/auth.service';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/outline';
import AtomInput from '../atoms/AtomInput.vue';

const email = ref('');
const password = ref('');

async function handleAuth() {
  await AuthService.loginAsAdmin(email.value, password.value);
}
</script>

<template>
  <div class="hero min-h-full">
    <form
      class="hero-content flex-col text-center"
      @submit.prevent="handleAuth"
    >
      <AtomInput
        v-model="email"
        placeholder="Admin-Email"
        type="email"
        required
      />
      <AtomInput
        v-model="password"
        placeholder="Passwort"
        type="password"
        required
      />
      <button class="btn btn-primary gap-2 self-end">
        <ArrowRightStartOnRectangleIcon class="size-6" />
        Login
      </button>
    </form>
  </div>
</template>
