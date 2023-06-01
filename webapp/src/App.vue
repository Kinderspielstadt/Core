<template>
  <MoleculeNavigationDrawer
    :drawer-id="drawerId"
    :navigation-entries="navigationEntries"
  >
    <RouterView />
  </MoleculeNavigationDrawer>
</template>

<script setup lang="ts">
import { INavigationEntry } from './interfaces/navigation-entry.interface';
import {
  IdentificationIcon,
  BuildingLibraryIcon,
  ArrowRightOnRectangleIcon,
  MusicalNoteIcon,
  ArrowTrendingUpIcon,
  UserIcon,
} from '@heroicons/vue/24/outline';
import MoleculeNavigationDrawer from './components/molecules/MoleculeNavigationDrawer.vue';

const drawerId = 'default-drawer';
const navigationEntries: INavigationEntry[] = [
  {
    name: 'Stammdaten',
    icon: UserIcon,
    to: '/data',
  },
  {
    name: 'Einstempeln',
    icon: IdentificationIcon,
    to: '/checkin',
  },
  {
    name: 'Bank',
    icon: BuildingLibraryIcon,
    to: '/bank',
  },
  {
    name: 'Börse',
    icon: ArrowTrendingUpIcon,
    to: '/stocks',
    disabled: true,
  },
  {
    name: 'Radio',
    icon: MusicalNoteIcon,
    to: '/radio',
    disabled: true,
  },
  // {
  //   name: 'divider',
  // },
  // {
  //   name: 'Abmelden',
  //   icon: ArrowRightOnRectangleIcon,
  //   to: '/logout',
  // },
];
</script>

<style lang="scss" scoped>

</style>