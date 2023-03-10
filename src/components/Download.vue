<template>
  <n-button @click="download" :disabled="disabled">下載</n-button>
</template>

<script setup lang="ts">
const props = defineProps({
  url: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    default: ""
  },
  disabled: {
    type: Boolean,
    default: true
  }
})
const download = () => {
  const link = document.createElement("a");
  link.href = props.url;
  link.download = props.name;
  link.click();
}
</script>
