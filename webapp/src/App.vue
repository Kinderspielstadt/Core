<script setup lang="ts">
import { INavigationEntry } from './interfaces/navigation-entry.interface';
import {
  IdentificationIcon,
  BuildingLibraryIcon,
  MusicalNoteIcon,
  ArrowTrendingUpIcon,
  AdjustmentsHorizontalIcon,
  BoltIcon,
} from '@heroicons/vue/24/outline';
import MoleculeNavigationDrawer from './components/molecules/MoleculeNavigationDrawer.vue';
import AtomFooter from './components/atoms/AtomFooter.vue';
import { useRoute } from 'vue-router';

const drawerId = 'default-drawer';
const navigationEntries: INavigationEntry[] = [
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
  },
  {
    name: 'Abstimmungen',
    icon: BoltIcon,
    to: '/polls',
  },
  {
    name: 'Einstellungen',
    icon: AdjustmentsHorizontalIcon,
    to: '/settings',
  },
];
const route = useRoute();
</script>

<template>
  <MoleculeNavigationDrawer
    :drawer-id="drawerId"
    :navigation-entries="navigationEntries"
  >
    <RouterView />
    <AtomFooter v-if="!['admin', 'bank'].includes(route.name as string)" />
  </MoleculeNavigationDrawer>
</template>
