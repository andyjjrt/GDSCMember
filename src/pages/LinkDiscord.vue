<template>
  <DiscordProfile v-if="user.discordData" :discordData="user.discordData" />
  <DiscordLoginButton v-else />
  <n-divider />
  <h2 class="text-2xl text-center mb-4">Join our discord</h2>
  <iframe
    src="https://discord.com/widget?id=902904317986607165&theme=dark"
    width="100%"
    height="500"
    allowtransparency="true"
    frameborder="0"
    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
  ></iframe>
</template>

<script setup lang="ts">
import { useUserStore } from "../store/user";
const user = useUserStore();
</script>
