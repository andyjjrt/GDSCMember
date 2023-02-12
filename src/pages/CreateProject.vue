<template>
  <n-space vertical>
    <div class="flex flex-col gap-1">
      <span>專案名稱</span>
      <n-input
        placeholder="專案名稱"
        v-model:value="name"
        :disabled="loading"
      />
    </div>
    <div class="flex flex-col gap-1">
      <span>專案敘述</span>
      <n-input
        :disabled="loading"
        placeholder="專案敘述"
        v-model:value="description"
        type="textarea"
        maxlength="30"
        show-count
      />
    </div>
    <n-space justify="end">
      <n-button @click="handleSubmit" :loading="loading">新增專案</n-button>
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
import { useMessage } from "naive-ui";
import { useUserStore } from "../store/user";

const user = useUserStore();
const message = useMessage();
const router = useRouter();
const name = ref("");
const description = ref("");
const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  try {
    await user.createProject(name.value, description.value);
    message.success("成功新增專案");
    router.push({ name: "My Projects" });
  } catch (e: any) {
    message.error(e.message);
  }
  loading.value = false;
};
</script>
