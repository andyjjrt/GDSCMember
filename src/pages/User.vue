<template>
  <n-space vertical>
    <n-radio-group
      v-model:value="form.inSchool"
      name="radiobuttongroup1"
      :disabled="loading"
    >
      <n-radio-button :value="true" label="政大學生" />
      <n-radio-button :value="false" label="政大校友/校外人士" />
    </n-radio-group>
    <div class="flex flex-col gap-1">
      <span>姓名</span>
      <n-input
        placeholder="姓名"
        v-model:value="form.name"
        :disabled="loading"
      />
    </div>
    <div class="flex flex-col gap-1">
      <span>手機</span>
      <n-input
        placeholder="手機"
        v-model:value="form.phone"
        :disabled="loading"
      />
    </div>
    <n-collapse-transition :show="form.inSchool">
      <n-space vertical>
        <div class="flex flex-col gap-1">
          <span>學號</span>
          <n-input
            placeholder="學號"
            v-model:value="form.studentId"
            :disabled="loading"
          />
        </div>
        <div class="flex flex-col gap-1">
          <span>系級</span>
          <n-input
            placeholder="系級"
            v-model:value="form.dept"
            :disabled="loading"
          />
        </div>
      </n-space>
    </n-collapse-transition>
    <n-space align="center" class="mt-2">
      <n-button
        @click="handleSubmit"
        :loading="loading"
        :disabled="user.isUserCompleted"
      >
        儲存
      </n-button>
      <n-tag :bordered="false" v-if="user.isUserCompleted">已經填寫完成，若要更改請洽幹部</n-tag>
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
import { useLoadingBar, useMessage } from "naive-ui";
import { useUserStore } from "../store/user";

const message = useMessage();
const loadingbar = useLoadingBar();
const user = useUserStore();

const form = reactive({ ...user.userData });

const loading = ref(false);

const validate = (regexString: string, testString: string) => {
  const regex = new RegExp(regexString);
  return regex.test(testString);
};

const handleSubmit = async () => {
  if (
    form.phone === "" ||
    form.name === "" ||
    (form.inSchool && (form.dept === "" || form.studentId === ""))
  ) {
    message.error("欄位不得為空");
    return;
  }
  if (!validate("^09[0-9]{8}$", form.phone)) {
    message.error("手機號碼錯誤");
    return;
  }
  if (
    form.inSchool &&
    !validate("^1(0[6-9]|1[0-2])(([1-7])(0|5|6)|ZU)[0-9]{4}$", form.studentId)
  ) {
    message.error("學號格式錯誤");
    return;
  }
  loading.value = true;
  loadingbar.start();
  try {
    await user.userUpdate(form);
    form.value = { ...user.userData };
    message.success("儲存成功");
  } catch (e: any) {
    message.error(e.message);
  }
  loadingbar.finish();
  loading.value = false;
};
</script>
