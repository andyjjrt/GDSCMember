<template>
  <n-spin :show="loading">
  <n-data-table
    :columns="columns"
    :data="logData"
    :pagination="paginationOptions"
  />
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
const loading = ref(false)
const user = useUserStore();

const logData = ref<Row[]>([]);

interface Row {
  index: number;
  name: string;
  coreName: string;
  time: Date;
  count: number;
  check: boolean;
}

const columns = [
  {
    title: "Id",
    key: "index",
  },
  {
    title: "時間",
    key: "time",
    render(row: Row) {
      return new Date(row.time).toLocaleString();
    },
    sorter: "default",
    ellipsis: true,
  },
  {
    title: "姓名",
    key: "name",
  },
  {
    title: "Core",
    key: "coreName",
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
    render(row: Row) {
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
  logData.value = data;
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
