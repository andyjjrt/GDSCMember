<template>
  <n-card>
    <template #header>
      <div class="flex items-center justify-between">
        <h2>收據</h2>
        <n-button text @click="showModal = true" icon-placement="right">
          <template #icon>
            <n-icon class="text-xl"><IconQrCode /></n-icon>
          </template>
          繳費
        </n-button>
      </div>
    </template>
    <div class="grid grid-cols-3">
      <n-statistic label="當前身分">{{ identity.type }}</n-statistic>
      <n-statistic label="應繳金額">{{ identity.count }}</n-statistic>
      <n-statistic label="已繳金額">{{ user.paid }}</n-statistic>
    </div>
    <template v-if="identity.count < user.paid">
      <n-divider />
      <n-alert title="您繳的社費大於應繳金額，請找幹部領取退款" type="info">
      </n-alert>
    </template>
    <template v-else-if="identity.count > user.paid">
      <n-divider />
      <n-alert title="您的社費尚未繳齊，請找幹部補繳" type="error"> </n-alert>
    </template>
  </n-card>
  <n-modal v-model:show="showModal" transform-origin="center">
    <n-card
      class="max-w-xs rounded-2xl"
      title="繳費"
      :bordered="false"
      role="dialog"
      aria-modal="true"
    >
      <n-space vertical>
        <n-space justify="center">
          <vue-qrcode :value="paymentUrl" />
        </n-space>
        <n-divider />
        <n-alert title="請出示此QRcode給幹部" type="info"></n-alert>
      </n-space>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { useUserStore } from "../store/user";
import { payCount } from "../utils/paycount"

const user = useUserStore();

const showModal = ref(false);

const identity = computed(() => {
  if (user.joinedProjects.length > 0 || user.createdProjects.length > 0) {
    return {
      type: "社員",
      count: payCount["社員"],
    };
  } else if (user.paid >= payCount["會員"]) {
    return {
      type: "會員",
      count: payCount["會員"],
    };
  } else {
    return {
      type: "Insider",
      count: 0,
    };
  }
});

const paymentUrl = computed(() => {
  return `${
    import.meta.env.DEV ? "http://localhost:3000" : "https://member.andyjjrt.cc"
  }/payment?id=${user.getId}`;
});
</script>
