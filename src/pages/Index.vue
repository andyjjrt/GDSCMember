<template>
  <n-space vertical>
    <!-- <RouterLink to="/link-discord"> -->
    <n-card disabled>
      <template v-slot:header>
        <div class="flex justify-between">
          <div class="flex gap-2 items-center">
            <h2>體驗社課登記 (維護中)</h2>
          </div>
        </div>
      </template>
    </n-card>
    <!-- </RouterLink> -->
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
</template>

<script lang="ts" setup>
import { useUserStore } from "../store/user";

const user = useUserStore();
</script>
