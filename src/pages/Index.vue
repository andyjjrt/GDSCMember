<template>
  <n-space vertical>
    <n-card @click="showModal = true" class="cursor-pointer">
      <template v-slot:header>
        <div class="flex justify-between">
          <div class="flex gap-2 items-center">
            <IconCheckin />
            <h2>社課簽到</h2>
          </div>
        </div>
      </template>
    </n-card>
    <n-card class="cursor-not-allowed">
      <template v-slot:header>
        <div class="flex justify-between">
          <div class="flex gap-2 items-center">
            <IconForm />
            <h2>表單和各式連結</h2>
          </div>
        </div>
      </template>
    </n-card>
    <n-divider />
    <RouterLink to="/link-discord">
      <n-card>
        <template v-slot:header>
          <div class="flex justify-between">
            <div class="flex gap-2 items-center">
              <IconDiscord />
              <h2>Discord綁定</h2>
            </div>
            <span class="flex items-center text-green-600 text-2xl">
              <IconFinished v-if="user.isDiscordConnected" />
            </span>
          </div>
        </template>
      </n-card>
    </RouterLink>
    <RouterLink to="/user">
      <n-card>
        <template v-slot:header>
          <div class="flex justify-between">
            <div class="flex gap-2 items-center">
              <IconPerson />
              <h2>個人資料</h2>
            </div>
            <span class="flex items-center text-green-600 text-2xl">
              <IconFinished v-if="user.isUserCompleted" />
            </span>
          </div>
        </template>
      </n-card>
    </RouterLink>
    <RouterLink to="/projects">
      <n-card>
        <template v-slot:header>
          <div class="flex justify-between">
            <div class="flex gap-2 items-center">
              <IconEnterProject />
              <h2>我的專案</h2>
            </div>
          </div>
        </template>
      </n-card>
    </RouterLink>
    <n-divider />
    <Receipt />
  </n-space>
  <n-modal v-model:show="showModal" transform-origin="center">
    <n-card
      class="max-w-xs rounded-2xl"
      title="社課簽到"
      :bordered="false"
      role="dialog"
      aria-modal="true"
    >
      <n-space vertical>
        <n-space justify="center">
          <vue-qrcode :value="checkinUrl" />
        </n-space>
        <n-divider />
        <n-alert title="請出示此QRcode給幹部" type="info"></n-alert>
      </n-space>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { useUserStore } from "../store/user";

const user = useUserStore();

const showModal = ref(false);

const checkinUrl = computed(() => {
  return `${
    import.meta.env.DEV ? "http://localhost:3000" : "https://member.andyjjrt.cc"
  }/checkin?id=${user.getId}`;
});
</script>
