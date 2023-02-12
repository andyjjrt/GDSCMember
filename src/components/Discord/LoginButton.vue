<template>
  <a
    :href="uri"
  >
    <n-button>
      <template #icon><IconDiscord /></template>
      Discord Login
    </n-button>
  </a>
</template>

<script setup lang="ts">
const uri = computed(() => `https://discord.com/api/oauth2/authorize?client_id=1069510883719520266&redirect_uri=${import.meta.env.DEV ? "http%3A%2F%2Flocalhost:3000" : "https%3A%2F%2Fmember.andyjjrt.cc"}%2Fauth%2Fcallback%2Fdiscord&response_type=code&scope=identify%20email`)
</script>