<template>
  <n-config-provider :theme="darkTheme" class="h-full w-full">
    <n-loading-bar-provider>
      <n-message-provider>
        <Suspense>
          <RouteIndex />
          <template #fallback>
            <n-spin loading class="h-full w-full"></n-spin>
          </template>
        </Suspense>
      </n-message-provider>
    </n-loading-bar-provider>
    <!-- Provide body with theme -->
    <n-global-style />
  </n-config-provider>
</template>

<script lang="ts" setup>
import { darkTheme } from "naive-ui";
import RouteIndex from "./routes/Index.vue";
</script>
