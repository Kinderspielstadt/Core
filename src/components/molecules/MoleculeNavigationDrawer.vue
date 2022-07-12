<template>
  <div class="drawer drawer-mobile">
    <input
      :id="drawerId"
      type="checkbox"
      class="drawer-toggle"
    />
    <div class="drawer-content flex flex-col lg:p-6 lg:pt-0 bg-base-200 h-screen">
      <div
        class="navbar shadow-lg bg-neutral-focus text-neutral-content lg:hidden sticky top-0 z-50 max-w-7xl place-self-center"
      >
        <div class="flex-none">
          <label
            :for="drawerId"
            class="btn btn-ghost rounded-btn lg:hidden"
          >
            <MenuIcon class="h-7 w-7" />
          </label>
          <label
            tabindex="0"
            class="btn btn-ghost avatar"
          >
            <AtomLogo class="w-12" />
          </label>
        </div>
      </div>
      <slot />
    </div>
    <div class="drawer-side">
      <label
        :for="drawerId"
        class="drawer-overlay"
      />
      <ul class="menu p-4 overflow-y-auto w-80">
        <li class="pointer-events-none">
          <a>
            <AtomLogo class="w-28" />
          </a>
        </li>
        <li
          v-for="navigationEntry of navigationEntries"
          :class="navigationEntry.name === 'divider' ? 'menu-title' : null"
        >
          <RouterLink
            v-if="navigationEntry.name !== 'divider'"
            :to="navigationEntry.to"
            active-class="active"
          >
            <component
              :is="navigationEntry.icon"
              class="h-6 w-6"
            />{{ navigationEntry.name }}
          </RouterLink>
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

<script lang="ts" setup>
import { PropType } from 'vue';
import { isDark, toggleDark } from '../../utils/darkMode';
import { INavigationEntry } from '../../interfaces/navigation-entry.interface';
import { MenuIcon, MoonIcon, SunIcon } from '@heroicons/vue/outline';
import AtomLogo from '../atoms/AtomLogo.vue';
import AtomSwap from '../atoms/AtomSwap.vue';

defineProps({
  drawerId: {
    type: String,
    required: true,
  },
  navigationEntries: {
    type: Array as PropType<INavigationEntry[]>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
</style>