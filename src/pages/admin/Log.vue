<template>
  <n-spin :show="loading">
    <n-tabs type="line" animated>
      <n-tab-pane name="總覽" tab="總覽">
        <n-row>
          <n-col :span="8">
            <n-statistic label="總數" :value="briefData.total" />
          </n-col>
          <n-col :span="8">
            <n-statistic label="社員" :value="briefData.projectMember.length" />
          </n-col>
          <n-col :span="8">
            <n-statistic label="會員" :value="briefData.member.length" />
          </n-col>
        </n-row>
      </n-tab-pane>
      <n-tab-pane name="社費紀錄" tab="社費紀錄">
        <n-data-table
          :columns="logColumns"
          :data="logData"
          :pagination="paginationOptions"
        />
        <n-divider />
        <n-list class="p-2 rounded-md">
          <n-list-item v-for="key in Object.keys(coreCount)">
            {{ key }}
            <template #suffix>
              <span>{{ coreCount[key].owe }} / {{ coreCount[key].total }}</span>
            </template>
          </n-list-item>
        </n-list>
      </n-tab-pane>
      <n-tab-pane name="jay chou" tab="Jay Chou"> Qilixiang </n-tab-pane>
    </n-tabs>
  </n-spin>
</template>

<script lang="ts" setup>
import { h } from "vue";
import { NButton, useMessage, useLoadingBar } from "naive-ui";
import { useUserStore } from "../../store/user";
import { fetchApi } from "../../utils/api";
import { payCount } from "../../utils/paycount";

const route = useRoute();
const message = useMessage();
const loadingbar = useLoadingBar();
const loading = ref(false);
const user = useUserStore();

const logData = ref([]);
const userData = ref<LogUser[]>([]);

const logColumns = [
  {
    title: "Id",
    key: "index",
  },
  {
    title: "時間",
    key: "time",
    render(row: any) {
      return new Date(row.time).toLocaleString();
    },
    sorter: "default",
    ellipsis: true,
  },
  {
    title: "姓名",
    key: "userId",
    render(row: any) {
      return userData.value.find((user: any) => user.id == row.userId)?.name;
    },
  },
  {
    title: "Core",
    key: "coreId",
    render(row: any) {
      return userData.value.find((user: any) => user.id == row.coreId)?.name;
    },
    sorter: "default",
    ellipsis: true,
  },
  {
    title: "Count",
    key: "count",
  },
  {
    title: "Action",
    key: "actions",
    render(row: any) {
      return row.check
        ? "已付款"
        : h(
            NButton,
            {
              type: "primary",
              size: "small",
              onClick: () => handleLogCheck(row.index),
            },
            { default: () => "確認收款" }
          );
    },
  },
];

const paginationOptions = { pageSize: 10 };

const briefData = computed(() => {
  return {
    total: userData.value.length,
    projectMember: userData.value
      .filter(
        (row) =>
          (row.createdProjects.length > 0 || row.joinedProjects.length > 0) &&
          (row.isCore ||
            row.isFullYear ||
            (row.isLastSemester
              ? row.paidCount >= payCount["社員"] - 200
              : row.paidCount >= payCount["社員"]))
      )
      .filter((row) => !row.isCore),
    member: userData.value
      .filter(
        (row) =>
          row.createdProjects.length === 0 &&
          row.joinedProjects.length === 0 &&
          (row.isCore ||
            (row.isLastSemester
              ? row.paidCount >= payCount["會員"] - 200
              : row.paidCount >= payCount["會員"]))
      )
      .filter((row) => !row.isCore),
  };
});

const coreCount = computed(() => {
  const coreMap: any = new Object();

  logData.value.forEach((log: any) => {
    const coreName =
      userData.value.find((user) => user.id === log.coreId)?.name || "未知";
    if (!coreMap.hasOwnProperty(coreName)) {
      coreMap[coreName] = { total: 0, owe: 0 };
    }
    coreMap[coreName].total += log.count;
    if (!log.check) coreMap[coreName].owe += log.count;
  });

  return coreMap;
});

const init = async () => {
  loadingbar.start();
  loading.value = true;
  const response = await fetchApi("get", {
    params: {
      type: "log",
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
  logData.value = data.log;
  userData.value = data.user;
};

const handleLogCheck = async (index: number) => {
  loadingbar.start();
  loading.value = true;
  const response = await fetchApi("post", {
    data: {
      type: "checkLog",
      uid: user.getId,
      index: index,
    },
  });
  loadingbar.finish();
  const { data, success } = response.data;
  if (!success) {
    message.error(data);
    loading.value = false;
    return;
  }
  init();
};

onMounted(() => {
  init();
});
</script>

<style>
.n-list-item__suffix {
  @apply !flex-initial
}
</style>