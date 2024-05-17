<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useEventBus } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { INavigationEntry } from '../../interfaces/navigation-entry.interface';
import { AuthService } from '../../services/auth.service';
import { isDark, toggleDark } from '../../utils/darkMode';
import {
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  ExclamationTriangleIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/vue/24/outline';
import AtomLogo from '../atoms/AtomLogo.vue';
import AtomSwap from '../atoms/AtomSwap.vue';

const isAuthenticated = ref(false);
const router = useRouter();
const drawerCheckbox = ref();

defineProps<{
  drawerId: string;
  navigationEntries: INavigationEntry[];
}>();

function getNavigationEntryClass(navigationEntry: INavigationEntry) {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'menu-title !p-0': navigationEntry.name === 'divider',
    disabled: navigationEntry.disabled,
  };
}

useEventBus<boolean>('isAuthenticated').on(
  (state) => (isAuthenticated.value = state),
);

onMounted(() => {
  isAuthenticated.value = AuthService.isAuthenticated();
});

router.afterEach(() => {
  drawerCheckbox.value.checked = false;
});
</script>

<template>
  <div class="drawer lg:drawer-open">
    <input
      :id="drawerId"
      ref="drawerCheckbox"
      type="checkbox"
      class="drawer-toggle"
    />
    <div
      class="drawer-content flex h-screen flex-col overflow-y-scroll bg-base-300"
    >
      <div class="navbar top-0 max-w-7xl place-self-center shadow-lg lg:hidden">
        <div class="flex-none">
          <label :for="drawerId" class="btn btn-ghost rounded-btn lg:hidden">
            <Bars3Icon class="size-7" />
          </label>
          <label tabindex="0" class="avatar btn btn-ghost">
            <AtomLogo class="w-12" />
          </label>
        </div>
      </div>
      <slot />
    </div>
    <div class="drawer-side">
      <label :for="drawerId" class="drawer-overlay" />
      <ul class="menu h-full w-64 overflow-y-auto bg-base-100 p-4">
        <li class="pointer-events-none">
          <AtomLogo class="w-28" />
        </li>
        <template v-if="isAuthenticated">
          <li
            class="pointer-events-none rounded-md bg-warning uppercase text-warning-content"
          >
            <span>
              <ExclamationTriangleIcon class="size-6" />
              Admin-Modus
              <ExclamationTriangleIcon class="size-6" />
            </span>
          </li>
          <li>
            <span @click="AuthService.logout()">
              <ArrowRightStartOnRectangleIcon class="size-6" />
              Abmelden
            </span>
          </li>
          <li class="menu-title !p-0" />
        </template>
        <li
          v-for="navigationEntry of navigationEntries"
          :key="navigationEntry.name"
          :class="getNavigationEntryClass(navigationEntry)"
        >
          <component
            :is="
              !navigationEntry.to || navigationEntry.disabled
                ? 'span'
                : 'router-link'
            "
            v-if="navigationEntry.name !== 'divider'"
            :to="navigationEntry.to"
            active-class="active"
          >
            <component :is="navigationEntry.icon" class="size-6" />{{
              navigationEntry.name
            }}
          </component>
        </li>
        <AtomSwap
          class="mt-auto place-self-end"
          :on-icon="SunIcon"
          :off-icon="MoonIcon"
          :checked="isDark"
          @change="toggleDark()"
        />
      </ul>
    </div>
  </div>
</template>
