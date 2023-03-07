<template>
  <n-space vertical v-if="userData">
    <n-alert
      v-if="userData?.user.name === '' || userData.user.phone === ''"
      type="info"
      title="個人資料尚未完成"
    ></n-alert>
    <div class="grid grid-cols-2 sm:grid-cols-3" v-else>
      <n-statistic label="姓名">{{ userData.user.name }}</n-statistic>
      <n-statistic label="電話">{{ userData.user.phone }}</n-statistic>
      <n-statistic label="學號" v-if="userData.user.inSchool">
        {{ userData.user.studentId }}
      </n-statistic>
      <n-statistic label="系級" v-if="userData.user.inSchool">
        {{ userData.user.dept }}
      </n-statistic>
      <n-statistic label="身分">
        {{ userData.user.inSchool ? "政大學生" : "政大校友/校外人士" }}
      </n-statistic>
    </div>
    <n-divider />
    <n-alert
      v-if="userData?.discord === null"
      type="info"
      title="Discord 尚未綁定"
    ></n-alert>
    <DiscordProfile readOnly :discordData="userData?.discord" v-else />
    <n-divider />
    <div class="grid grid-cols-2 gap-2">
      <n-space vertical>
        <h2 class="text-xl">加入的專案</h2>
        <n-card v-if="userData.joinedProjects.length === 0">
          <n-empty description="尚無專案" />
        </n-card>
        <n-card
          v-for="project in userData.joinedProjects"
          :title="project.name"
        />
      </n-space>
      <n-space vertical>
        <h2 class="text-xl">建立的專案</h2>
        <n-card v-if="userData.createdProjects.length === 0">
          <n-empty description="尚無專案" />
        </n-card>

        <n-card
          v-for="project in userData.createdProjects"
          :title="project.name"
        />
      </n-space>
    </div>
    <n-divider />
    <div class="grid grid-cols-3">
      <n-statistic label="當前身分">{{ identity.type }}</n-statistic>
      <n-statistic label="應繳金額">{{ identity.count }}</n-statistic>
      <n-statistic label="已繳金額">{{ userData.paidCount }}</n-statistic>
    </div>
    <n-divider />
    <n-space vertical v-if="userData.oldMember">
      <h3 class="text-xl">上學期資料</h3>
      <div class="flex gap-2">
        <span
          class="flex items-center text-green-600 text-xl"
          v-if="userData.oldMember.name === userData.user.name"
        >
          <IconFinished />
        </span>
        <span class="flex items-center text-red-500 text-xl" v-else>
          <IconNotFinished />
        </span>
        <span>姓名: {{ userData.oldMember.name }}</span>
      </div>
      <div class="flex gap-2">
        <span
          class="flex items-center text-green-600 text-xl"
          v-if="userData.oldMember.email === userData.user.email"
        >
          <IconFinished />
        </span>
        <span class="flex items-center text-red-500 text-xl" v-else>
          <IconNotFinished />
        </span>
        <span>email: {{ userData.oldMember.email || "無資料" }}</span>
      </div>
      <div class="flex gap-2">
        <span
          class="flex items-center text-green-600 text-xl"
          v-if="userData.oldMember.studentId === userData.user.studentId"
        >
          <IconFinished />
        </span>
        <span class="flex items-center text-red-500 text-xl" v-else>
          <IconNotFinished />
        </span>
        <span>學號: {{ userData.oldMember.studentId || "無資料" }}</span>
      </div>
    </n-space>
    <n-alert v-else type="info" title="無上學期社員資訊"></n-alert>
    <n-divider />
    <n-card>
      <form @submit="handlePayment">
        <n-space vertical>
          <n-radio-group
            v-model:value="paymentType"
            name="radiobuttongroup1"
            class="w-full"
            :disabled="paymentLoading"
          >
            <n-radio-button
              :value="1"
              label="收款"
              class="w-[calc(50%_-_0.5px)] text-center"
            />
            <n-radio-button
              :value="-1"
              label="退款"
              class="w-[calc(50%_-_0.5px)] text-center"
            />
          </n-radio-group>
          <div class="flex flex-col gap-1">
            <span>金額</span>
            <n-input
              placeholder="金額"
              v-model:value="payment"
              :disabled="paymentLoading"
            />
          </div>
          <n-space justify="end">
            <n-button attr-type="submit" :loading="paymentLoading"
              >紀錄</n-button
            >
          </n-space>
        </n-space>
      </form>
    </n-card>
    <n-alert type="info" title="上學期社費抵免請分開紀錄"></n-alert>
  </n-space>
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

const paymentType = ref(1);
const payment = ref("");
const paymentLoading = ref(false);

const identity = computed(() => {
  if (user.joinedProjects.length > 0 || user.createdProjects.length > 0) {
    return {
      type: "社員",
      count: payCount["社員"] + (user.isLastSemester ? -200 : 0),
    };
  } else if (user.paid >= payCount["會員"]) {
    return {
      type: "會員",
      count: payCount["會員"] + (user.isLastSemester ? -200 : 0),
    };
  } else {
    return {
      type: "Insider",
      count: 0,
    };
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

const handlePayment = async (e: Event) => {
  e.preventDefault();
  if (payment.value === "") {
    message.error("請填入金額");
    return;
  }
  paymentLoading.value = true;
  const response = await fetchApi("post", {
    data: {
      type: "payment",
      uid: user.getId,
      id: route.query.id,
      payment: (paymentType.value * parseInt(payment.value)).toString(),
    },
  });
  paymentLoading.value = false;
  const { data, success } = response.data;
  if (!success) {
    message.error(data);
    return;
  }
  message.success("紀錄完成");
  userData.value = null;
  paymentType.value = 1;
  await init();
};
</script>
