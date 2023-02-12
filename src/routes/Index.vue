<template>
  <n-spin :show="!user.isAppReady" class="h-full">
    <PageHeader v-if="route.name !== 'Login'" />
    <BreadCrumb v-if="user.isAppReady && route.name !== 'Login'" />
    <div class="p-5" :class="{'h-full': route.name === 'Login'}">
      <RouterView />
    </div>
  </n-spin>
</template>

<script lang="ts" setup>
import { useLoadingBar } from "naive-ui";
import { useUserStore } from "../store/user";

const user = useUserStore();
const route = useRoute();
if (route.name !== "Login") {
  await user.googleLogin();
}
</script>

<style>
.n-spin-content {
  @apply h-full;
}
</style>
