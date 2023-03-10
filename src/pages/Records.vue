<template>
  <n-space vertical>
    <n-card v-for="note in noteList">
      <template v-slot:header>
        <div class="flex justify-between">
          <div class="flex gap-2 items-center">
            <Icon icon="mdi:file-document-edit" />
            <h2>{{ note.noteId }}社課筆記</h2>
          </div>
          <Download :name="note.noteId + '社課筆記'" :url="'/files/notes/' + note.fileId + '.pdf'" />
        </div>
      </template>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import { noteList } from '../utils/noteList';
</script>
