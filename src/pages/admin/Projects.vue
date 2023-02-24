<template>
  <n-spin :show="loading">
    <n-collapse>
      <n-collapse-item
        v-for="item in projectData"
        :title="item.name"
        :name="item.id"
      >
        {{ item.description }}
        <n-divider />
        <div class="flex flex-wrap items-center gap-2">
          <span>Leader:</span>
          <a :href="`/payment?id=${item.leader.id}`" target="_blanks">
            <n-button type="info">{{ item.leader.name }}</n-button>
          </a>
        </div>
        <br />
        <div class="flex flex-wrap  items-center gap-2">
          <span>Members:</span>
          <a
            v-for="member in item.members"
            :href="`/payment?id=${member.id}`"
            target="_blanks"
          >
            <n-button type="primary">{{ member.name }}</n-button>
          </a>
        </div>
        <template #header-extra> {{ item.leader.name }} </template>
      </n-collapse-item>
    </n-collapse>
  </n-spin>
</template>

<script lang="ts" setup>
import { h } from "vue";
import { NButton, useMessage, useLoadingBar } from "naive-ui";
import { useUserStore } from "../../store/user";
import { fetchApi } from "../../utils/api";

const route = useRoute();
const message = useMessage();
const loadingbar = useLoadingBar();
const loading = ref(false);
const user = useUserStore();

const projectData = ref<Project[]>([]);

const init = async () => {
  loadingbar.start();
  loading.value = true;
  const response = await fetchApi("get", {
    params: {
      type: "projectsByCore",
      uid: user.getId,
    },
  });
  loadingbar.finish();
  loading.value = false;
  const { data, success } = response.data;
  if (!success) {
    message.error(data);
    return;
  }
  projectData.value = data;
};

onMounted(() => {
  init();
});
</script>
