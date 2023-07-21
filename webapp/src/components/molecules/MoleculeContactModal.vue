<template>
  <AtomModal
    :id="id"
    ref="modal"
    close-button
    w-auto
  >
    <div class="-my-10 overflow-x-auto">
      <template v-if="accountDetails">
        <div class="stats stats-vertical">
          <div class="stat">
            <div class="stat-title">Name des Kindes</div>
            <div class="stat-value">{{ accountDetails.firstName }} {{ accountDetails.lastName }}</div>
            <div class="stat-desc">Vorname Nachname</div>
          </div>
          <div class="stat">
            <div class="stat-title">Kontonummer</div>
            <div class="stat-value">{{ accountDetails.accountNumber }}</div>
            <div class="stat-desc">ID: {{ accountDetails.id }}</div>
          </div>
          <div class="stat">
            <div class="stat-title">Letzter Check-In</div>
            <div class="stat-value">{{ accountDetails.lastCheckIn ? DateService.toTime(new Date(accountDetails.lastCheckIn)) : 'N/A' }}</div>
            <div
              v-if="accountDetails.lastCheckIn"
              class="stat-desc"
            >
              {{ DateService.toShortString(new Date(accountDetails.lastCheckIn)) }}
            </div>
          </div>
          <template v-if="accountDetails.expand?.personalData">
            <div class="stat">
              <div class="stat-title">Essen</div>
              <div class="stat-value">{{ accountDetails.expand.personalData.vegetarian ? 'Vegetarisch' : 'Fleisch-Esser:in' }}</div>
            </div>
            <div class="stat">
              <div class="stat-title">Unverträglichkeiten</div>
              <div class="stat-value">{{ accountDetails.expand.personalData.intolerances || 'N/A' }}</div>
            </div>
            <div class="stat">
              <div class="stat-title">Teilnahme</div>
              <div class="stat-value">{{ accountDetails.expand.personalData.oneweek ? 'Eine Woche' : 'Zwei Wochen' }}</div>
            </div>
            <div class="stat">
              <div class="stat-title">Geburtstag</div>
              <div class="stat-value">{{ DateService.toShortString(new Date(accountDetails.expand.personalData.birthday)) }}</div>
            </div>
            <div class="stat">
              <div class="stat-title">Name der Eltern</div>
              <div class="stat-value">
                {{ accountDetails.expand.personalData.firstNameParent }}
                {{ accountDetails.expand.personalData.lastNameParent }}
              </div>
              <div class="stat-desc">Vorname Nachname</div>
            </div>
            <div class="stat">
              <div class="stat-title">Adresse</div>
              <div class="stat-value">{{ accountDetails.expand.personalData.street }}</div>
              <div class="stat-desc">{{ accountDetails.expand.personalData.zipCode }} {{ accountDetails.expand.personalData.city }}</div>
            </div>
            <div class="stat">
              <div class="stat-title">E-Mail-Adresse</div>
              <div
                class="stat-value"
              >
                {{ accountDetails.expand.personalData.email }}
              </div>
            </div>
            <div class="stat">
              <div class="stat-title">Telefonnummer</div>
              <div
                class="stat-value"
              >
                {{ accountDetails.expand.personalData.phone }}
              </div>
            </div>
          </template>
          <template
            v-else
          >
            <div class="stat">
              <div class="stat-title">Keine Persönlichen Daten vorhanden</div>
              <div class="stat-desc">Dies ist vermutlich ein technischer Fehler.</div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </AtomModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { AccountsDataResponse, AccountsResponse } from '../../types/pocketbase.types';
import { AccountService } from '../../services/account.service';
import { DateService } from '../../services/date.service';
import AtomModal from '../atoms/AtomModal.vue';

const modal = ref<InstanceType<typeof AtomModal>>();
const accountDetails = ref<AccountsResponse<{personalData: AccountsDataResponse}>>();

defineProps<{
  id: string,
}>();

defineExpose({
  show: async (id: string) => {
    accountDetails.value = await AccountService.getAccountDetails(id);
    modal.value?.show();
  },
  close: () => modal.value?.close(),
  isOpen: () => modal.value?.isOpen(),
});
</script>

<style lang="scss" scoped>

</style>