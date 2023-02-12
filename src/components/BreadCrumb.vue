<template>
  <n-breadcrumb separator=">" class="p-5 pb-0">
    <n-breadcrumb-item v-for="item in routes.meta.breadCrumb">
      <RouterLink :to="(item as any).to" v-if="(item as any).to">{{
        (item as any).text
      }}</RouterLink>
      <template v-else>{{ (item as any).text }}</template>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
const routes = useRoute();
</script>
