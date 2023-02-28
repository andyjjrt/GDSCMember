<template>
  <n-space vertical>
    <div class="flex flex-col gap-1">
      <span>社課場次</span>
      <n-select :options="options" />
    </div>
  </n-space>
</template>

<script setup lang="ts">
import { classList } from "../utils/classList";

const options = computed(() => {
  return classList.map((_class) => ({
    label: `${new Date(_class.time).toLocaleDateString()} ${_class.title}@${
      _class.location
    }`,
    value: new Date(_class.time).toISOString(),
  }));
});
</script>
