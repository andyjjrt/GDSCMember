<template>
  <n-space vertical>
    <n-card v-for="_class in classes">
      <template v-slot:header>
        <div class="flex justify-between">
          <div class="flex gap-2 items-center">
            <Icon icon="mdi:file-document-edit" />
            <h2>{{ _class }}社課筆記</h2>
          </div>
          <Download :name="_class + '社課筆記'" :url="'/files/notes/' + _class + '.pdf'" />
        </div>
      </template>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
const classes = ["20230308"]
</script>
