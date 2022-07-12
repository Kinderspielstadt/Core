<template>
  <MoleculeNavigationDrawer
    :drawer-id="drawerId"
    :navigation-entries="navigationEntries"
  >
    <router-view />
  </MoleculeNavigationDrawer>
</template>

<script setup lang="ts">
import {
  IdentificationIcon,
  LibraryIcon,
  LogoutIcon,
  MusicNoteIcon,
  TrendingUpIcon,
  UserIcon,
} from '@heroicons/vue/outline';
import { INavigationEntry } from './interfaces/navigation-entry.interface';
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
    icon: LibraryIcon,
    to: '/bank',
  },
  {
    name: 'Börse',
    icon: TrendingUpIcon,
    to: '/stocks',
  },
  {
    name: 'Radio',
    icon: MusicNoteIcon,
    to: '/radio',
  },
  {
    name: 'divider',
    to: '',
  },
  {
    name: 'Abmelden',
    icon: LogoutIcon,
    to: '/logout',
  },
];
</script>

<style lang="scss" scoped>
</style>