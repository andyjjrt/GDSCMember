<template>
  <div v-if="userData">
    <n-result
      v-if="!checkedin"
      :status="
        identity === 'insider' && userData.checkinCount > 0
          ? 'error'
          : 'success'
      "
      :title="identity"
      :description="'場次: ' + userData.checkinCount"
    >
      <template #footer>
        <n-alert
          v-if="identity === 'insider' && userData.checkinCount > 0"
          title="請先去繳費" type="error"
        ></n-alert>
        <n-button
          v-else
          size="large"
          type="primary"
          :loading="checkinLoading"
          @click="handleCheckin"
          >簽到</n-button
        >
      </template>
    </n-result>
    <n-result
      v-else
      status="success"
      title="簽到成功"
      description="你可以放心關掉這一頁了"
    >
    </n-result>
  </div>
</template>

<script setup lang="ts">
import { useLoadingBar, useMessage } from "naive-ui";
import { useUserStore } from "../../store/user";
import { fetchApi } from "../../utils/api";
import { payCount } from "../../utils/paycount";

const route = useRoute();
const message = useMessage();
const loadingbar = useLoadingBar();
const user = useUserStore();

const userData = ref<any>(null);

const checkinLoading = ref(false);
const checkedin = ref(false);

const identity = computed(() => {
  if (!userData.value) return "";
  if (
    (userData.value.createdProjects.length > 0 ||
      userData.value.joinedProjects.length > 0) &&
    (userData.value.isCore ||
      userData.value.isFullYear ||
      (userData.value.isLastSemester
        ? userData.value.paidCount >= payCount["社員"] - 200
        : userData.value.paidCount >= payCount["社員"]))
  ) {
    return "社員";
  } else if (
    userData.value.createdProjects.length === 0 &&
    userData.value.joinedProjects.length === 0 &&
    (userData.value.isCore ||
      (userData.value.isLastSemester
        ? userData.value.paidCount >= payCount["會員"] - 200
        : userData.value.paidCount >= payCount["會員"]))
  ) {
    return "會員";
  } else {
    return "insider";
  }
});

onMounted(async () => {
  await init();
});

const init = async () => {
  loadingbar.start();
  const id = route.query.id;
  const response = await fetchApi("get", {
    params: {
      type: "checkPayment",
      uid: user.getId,
      id: id,
    },
  });
  loadingbar.finish();
  const { data, success } = response.data;
  if (!success) {
    message.error(data);
    return;
  }
  userData.value = data;
};

const handleCheckin = async (e: Event) => {
  e.preventDefault();
  checkinLoading.value = true;
  const response = await fetchApi("post", {
    data: {
      type: "checkin",
      uid: user.getId,
      id: route.query.id,
      checkinId:
        new Date().getFullYear().toString() +
        (new Date().getMonth() + 1 < 10 ? "0" : "") +
        (new Date().getMonth() + 1).toString() +
        (new Date().getDate() + 1 < 10 ? "0" : "") +
        (new Date().getDate() + 1).toString(),
    },
  });
  checkinLoading.value = false;
  const { data, success } = response.data;
  if (!success) {
    message.error(data);
    return;
  }
  message.success("簽到完成");
  checkedin.value = true;
};
</script>
