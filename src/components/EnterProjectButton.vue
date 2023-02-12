<template>
  <n-alert
    title="已是專案主持人"
    type="info"
    v-if="isProjectLeader(id)"
  ></n-alert>
  <n-alert
    title="已經加入專案"
    type="success"
    v-else-if="isInProject(id)"
  ></n-alert>
  <n-alert type="warning" v-else-if="!user.isUserCompleted || !user.isDiscordConnected">
    <template #header>
      <div class="flex justify-between items-center">
        <div>請先填寫個人資料及綁定discord</div>
        <RouterLink to="/"><n-button type="warning" size="tiny">回到首頁</n-button></RouterLink>
      </div>
    </template>
  </n-alert>
  <n-input-group class="mt-2" v-else>
    <n-input
      placeholder="authCode"
      v-model:value="authCode"
      :disabled="loading"
    />
    <n-button type="primary" ghost :loading="loading" @click="handleEnter">
      加入
    </n-button>
  </n-input-group>
</template>

<script setup lang="ts">
import { useMessage } from "naive-ui";
import { useUserStore } from "../store/user";

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
});

const user = useUserStore();
const message = useMessage();
const authCode = ref("");
const loading = ref(false);

const isInProject = computed(() => {
  return (id: string) => {
    return user.joinedProjects.findIndex((item: any) => item.id === id) >= 0;
  };
});

const isProjectLeader = computed(() => {
  return (id: string) => {
    return user.createdProjects.findIndex((item: any) => item.id === id) >= 0;
  };
});

const handleEnter = async () => {
  loading.value = true;
  try {
    await user.joinProject(props.id, authCode.value);
    message.success("成功加入專案");
  } catch (e: any) {
    message.error(e.message);
  }
  loading.value = false;
};
</script>
