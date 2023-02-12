<template>
  <n-layout-header class="h-18 p-5" bordered>
    <div class="flex w-full items-center justify-between">
      <RouterLink
        :to="{ name: 'Home' }"
        tag="div"
        class="flex items-center gap-2"
      >
        <n-avatar :src="Logo" color="."></n-avatar>
        <h2 class="text-xl">GDSC Member</h2>
      </RouterLink>

      <div class="flex items-center gap-2" v-if="user.credential">
        <n-button size="medium" @click="handleLogout">登出</n-button>
        <n-avatar round :src="user.getAvatar" :fallback-src="Logo" />
      </div>
    </div>
  </n-layout-header>
</template>

<script setup lang="ts">
import Logo from "../assets/Logo.png";
import { useUserStore } from "../store/user";

const user = useUserStore();
const router = useRouter();

const handleLogout = () => {
  user.googleLogout();
  router.push({ name: "Login" });
};
</script>
