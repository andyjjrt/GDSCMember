<template>
  <n-space vertical>
    <n-card v-for="form in formList">
      <template v-slot:header>
        <div class="flex justify-between">
          <div class="flex gap-2 items-center">
            <Icon icon="mdi:file-document-edit" />
            <h2>{{ form.name}}</h2>
          </div>
          <n-button text tag="a" target="blank" :href="form.url">前往</n-button>
        </div>
      </template>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import { formList } from '../utils/formList';
</script>
