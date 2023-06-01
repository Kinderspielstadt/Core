<template>
  <AtomModal
    :id="id"
    close-button
    w-auto
  >
    <div class="-my-16 overflow-x-auto">
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
            <div
              class="stat cursor-pointer"
              @click="truncateEmail = !truncateEmail"
            >
              <div class="stat-title">E-Mail-Adresse</div>
              <div
                class="stat-value"
                :class="{'truncate': truncateEmail}"
              >
                {{ accountDetails.expand.personalData.email }}
              </div>
              <div class="stat-desc">Um die E-Mail-Adresse komplett anzuzeigen, bitte drücken und scrollen.</div>
            </div>
            <div
              class="stat cursor-pointer"
              @click="truncatePhone = !truncatePhone"
            >
              <div class="stat-title">Telefonnummer</div>
              <div
                class="stat-value"
                :class="{'truncate': truncatePhone}"
              >
                {{ accountDetails.expand.personalData.phone }}
              </div>
              <div class="stat-desc">Um die Telefonnummer komplett anzuzeigen, bitte drücken und scrollen.</div>
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
import { ref, watch } from 'vue';
import { AccountsDataResponse, AccountsResponse } from '../../types/pocketbase.types';
import { AccountService } from '../../services/account.service';
import { DateService } from '../../services/date.service';
import AtomModal from '../atoms/AtomModal.vue';

const accountDetails = ref<AccountsResponse<{personalData: AccountsDataResponse}>>();
const truncateEmail = ref(true);
const truncatePhone = ref(true);

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  contactId: {
    type: String,
    required: true,
  },
});

watch(() => props.contactId, async (contactId) => {
  if(contactId) {
    accountDetails.value = await AccountService.getAccountDetails(contactId);
  }
});
</script>

<style lang="scss" scoped>

</style>