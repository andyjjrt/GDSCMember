<template>
  <n-data-table
    :columns="columns"
    :data="userData"
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

const createSummary: DataTableCreateSummary = (pageData) => {
  return {
    name: {
      value: h("span", `共 ${props.userData.length} 人`),
      colSpan: 3,
    },
  };
};
</script>
