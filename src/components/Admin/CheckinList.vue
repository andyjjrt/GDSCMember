<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :pagination="paginationOptions"
    :summary="createSummary"
  />
</template>

<script setup lang="ts">
import type { DataTableColumns, DataTableCreateSummary } from "naive-ui";
const props = defineProps({
  userData: {
    type: Array,
    default: () => [],
  },
  filterClass: {
    type: String,
    default: "",
  },
});

const columns = [
  {
    title: "姓名",
    key: "name",
  },
  {
    title: "系所",
    key: "dept",
  },
  {
    title: "Email",
    key: "email",
  },
];

const paginationOptions = { pageSize: 10 };

const data = computed(() =>
  props.userData.filter(
    (user: any) => user.checkin.indexOf(props.filterClass) >= 0 && !user.isCore
  )
);

const createSummary: DataTableCreateSummary = (pageData) => {
  return {
    name: {
      value: h("span", `共 ${data.value.length} 人`),
      colSpan: 3,
    },
  };
};
</script>
