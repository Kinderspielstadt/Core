<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useEventBus } from '@vueuse/core';
import { UnsubscribeFunc } from 'pocketbase';
import { AccountService } from '../../services/account.service';
import {
  AccountsListResponse,
  ColorsResponse,
} from '../../types/pocketbase.types';
import { AuthService } from '../../services/auth.service';
import { BankService } from '../../services/bank.service';
import { ColorService } from '../../services/color.service';
import {
  FunnelIcon,
  VideoCameraIcon,
  VideoCameraSlashIcon,
} from '@heroicons/vue/24/outline';
import AtomInput from '../atoms/AtomInput.vue';
import MoleculeContactModal from '../molecules/MoleculeContactModal.vue';
import MoleculeDataTable, {
  TableHeaderType,
} from '../molecules/MoleculeDataTable.vue';
import MoleculeAuthDialog from '../molecules/MoleculeAuthDialog.vue';
import MoleculeChanceAccountNumberModal from '../molecules/MoleculeChanceAccountNumberModal.vue';
import MoleculeUpdatePictureModal from '../molecules/MoleculeUpdatePictureModal.vue';
import MoleculePicturePreviewModal from '../molecules/MoleculePicturePreviewModal.vue';
import AtomCheckbox from '../atoms/AtomCheckbox.vue';

const isAuthenticated = ref(false);
const accountsSubscription = ref<UnsubscribeFunc>();
const transactionsSubscription = ref<UnsubscribeFunc>();
const changeAccountNumberModal =
  ref<InstanceType<typeof MoleculeChanceAccountNumberModal>>();
const contactInformationModal =
  ref<InstanceType<typeof MoleculeContactModal>>();
const updatePictureModal =
  ref<InstanceType<typeof MoleculeUpdatePictureModal>>();
const picturePreviewModal =
  ref<InstanceType<typeof MoleculePicturePreviewModal>>();
const colors = ref<ColorsResponse[]>([]);
const cameraEnabled = ref(false);
const accounts = ref<AccountsListResponse<number, string>[]>([]);
const initAccounts = ref<AccountsListResponse<number, string>[]>([]);
const searchQuery = ref('');
const tableHeaders = ref([
  {
    title: 'Knr.',
    key: 'accountNumber',
    type: TableHeaderType.STRING,
    selected: true,
  },
  {
    title: 'Bild',
    key: 'picture',
    type: TableHeaderType.PICTURE,
    selected: true,
  },
  {
    title: 'Name',
    key: 'name',
    type: TableHeaderType.STRING,
    selected: true,
  },
  {
    title: 'Farbe',
    key: 'color',
    type: TableHeaderType.COLOR,
    selected: true,
  },
  {
    title: 'Essen',
    key: 'vegetarian',
    type: TableHeaderType.VEGETARIAN,
    selected: true,
  },
  {
    title: 'Letzter Check-In',
    key: 'lastCheckIn',
    type: TableHeaderType.DATETIME,
    selected: true,
  },
  {
    title: 'Kontostand',
    key: 'balance',
    type: TableHeaderType.CURRENCY,
    selected: true,
  },
  {
    title: 'Trans.',
    key: '',
    type: TableHeaderType.BUTTON_ACCOUNT,
    selected: true,
  },
  {
    title: 'Daten',
    key: '',
    type: TableHeaderType.BUTTON_CONTACT,
    selected: true,
  },
  {
    title: 'Änd.',
    key: '',
    type: TableHeaderType.BUTTON_CHANGE_ACCOUNT_NUMBER,
    selected: true,
  },
]);

function changeAccountNumber(account: { id: string; accountNumber: string }) {
  AccountService.updateAccountNumber(account.id, account.accountNumber);
}

function updateColor(id: string, colorId?: string) {
  AccountService.updateColor(id, colorId);
}

useEventBus<boolean>('isAuthenticated').on((state) => {
  isAuthenticated.value = state;
  if (isAuthenticated.value) {
    getData();
  }
});

async function getData() {
  initAccounts.value = await AccountService.getAccounts();
  accounts.value = initAccounts.value;
}

function toggleCameraEnabled() {
  cameraEnabled.value = !cameraEnabled.value;
  if (!cameraEnabled.value) {
    updatePictureModal.value?.disableCamera();
  }
}

watch(searchQuery, (value) => {
  search(value);
});

function search(value: string) {
  if (initAccounts.value) {
    accounts.value = initAccounts.value.filter(
      (account) =>
        account.accountNumber?.includes(value) ||
        account.name?.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
    );
  }
}

onMounted(async () => {
  isAuthenticated.value = AuthService.isAuthenticated();
  colors.value = await ColorService.getColors();
  if (isAuthenticated.value) {
    getData();
  }
  accountsSubscription.value = await AccountService.subscribeToAccountChanges(
    async () => {
      await getData();
      search(searchQuery.value);
    },
  );
  transactionsSubscription.value =
    await BankService.subscribeToTransactionChanges(async () => {
      await getData();
      search(searchQuery.value);
    });
});

onUnmounted(() => {
  accountsSubscription.value?.();
  transactionsSubscription.value?.();
});
</script>

<template>
  <div class="min-h-full">
    <MoleculeAuthDialog v-if="!isAuthenticated" />
    <div v-else class="flex h-full flex-col p-6">
      <div class="join mb-4">
        <AtomInput
          v-model="searchQuery"
          placeholder="Nach Name oder Kontonummer suchen"
          class="join-item"
        />
        <details class="dropdown dropdown-end dropdown-bottom">
          <summary class="btn btn-outline btn-primary rounded-l-none">
            <FunnelIcon class="size-6" />
          </summary>
          <ul
            class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li v-for="header in tableHeaders" :key="header.key">
              <AtomCheckbox v-model="header.selected" :label="header.title" />
            </li>
          </ul>
        </details>
      </div>
      <MoleculeDataTable
        v-if="accounts"
        :table-headers="tableHeaders.filter((header) => header.selected)"
        :data="accounts"
        :colors="colors"
        default-sort-key="name"
        :camera-enabled="cameraEnabled"
        @change-account-number="changeAccountNumberModal?.show($event)"
        @open-contact-modal="contactInformationModal?.show($event)"
        @update-color="updateColor"
        @picture-click="
          cameraEnabled
            ? updatePictureModal?.show($event)
            : picturePreviewModal?.show($event)
        "
      />
      <MoleculeChanceAccountNumberModal
        id="changeAccountNumber"
        ref="changeAccountNumberModal"
        title="Kontonummer ändern"
        @submit="changeAccountNumber"
      />
    </div>
    <MoleculeContactModal
      id="contactInformation"
      ref="contactInformationModal"
    />
    <MoleculeUpdatePictureModal
      v-if="cameraEnabled"
      id="updatePicture"
      ref="updatePictureModal"
    />
    <MoleculePicturePreviewModal
      v-else
      id="previewPicture"
      ref="picturePreviewModal"
    />
    <button
      class="btn btn-circle btn-primary fixed bottom-4 right-4 size-14"
      @click="toggleCameraEnabled"
    >
      <VideoCameraIcon v-if="cameraEnabled" class="size-8" />
      <VideoCameraSlashIcon v-else class="size-8" />
    </button>
  </div>
</template>
