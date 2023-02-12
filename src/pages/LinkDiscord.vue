<template>
  <DiscordProfile v-if="user.discordData" :discordData="user.discordData" />
  <DiscordLoginButton v-else />
</template>

<script setup lang="ts">
import { useUserStore } from "../store/user";
const user = useUserStore();
</script>
