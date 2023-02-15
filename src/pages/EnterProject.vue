<template>
  <n-card :title="queryId ? '加入專案' : '所有專案'">
    <n-space vertical>
      <template v-if="loading">
        <n-skeleton text :repeat="2" /> <n-skeleton text style="width: 60%" />
      </template>
      <n-empty
        :description="queryId ? '無此專案' : '尚無專案'"
        v-else-if="filteredProjects.length === 0"
      >
        <template #extra v-if="queryId">
          <RouterLink :to="{ name: 'Enter Project' }">
            <n-button size="small">瀏覽所有專案</n-button>
          </RouterLink>
        </template>
      </n-empty>
      <n-card :title="project.name" v-for="project in filteredProjects" v-else>
        <template #header-extra>{{ project.leader }}</template>
        <n-space vertical>
          {{ project.description }}
          <n-popconfirm
            :negative-text="null"
            @positive-click="handleOpen(project.link)"
          >
            <template #trigger>
              <n-button text tag="a" type="primary">專案連結</n-button>
            </template>
            <template #default>
              即將前往: {{ project.link }}<br />
              此網站由{{ project.name }}提供，請留意網路安全
            </template>
          </n-popconfirm>
          <EnterProjectButton :id="project.id" />
        </n-space>
      </n-card>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { useMessage } from "naive-ui";
import { useUserStore } from "../store/user";
import { fetchApi } from "../utils/api";

const message = useMessage();
const route = useRoute();
const router = useRouter();

const user = useUserStore();
const projects = ref<any[]>([]);
const loading = ref(true);

const queryId = computed(() => route.query.id || null);

const filteredProjects = computed(() => {
  if (queryId.value) {
    return [
      projects.value.find((project: any) => project.id === queryId.value),
    ].filter((item) => item !== undefined);
  }
  return projects.value;
});

onMounted(async () => {
  const response = await fetchApi("get", {
    params: {
      type: "projects",
      uid: user.getId,
    },
  });
  loading.value = false;
  const { data, success } = response.data;
  if (!success) {
    message.error(data);
    return;
  }
  projects.value = data;
});

const handleOpen = (url: string) => {
  window.open(url);
};
</script>
