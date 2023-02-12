<template>正在綁定你的discord，請不要離開此頁</template>

<script lang="ts" setup>
import { useLoadingBar, useMessage } from "naive-ui";
import { useUserStore } from "../../store/user";

const route = useRoute();
const router = useRouter();
const user = useUserStore();
const loadingbar = useLoadingBar();
const message = useMessage();

const code = computed(() => {
  return route.query.code;
});

onMounted(async () => {
  try {
    loadingbar.start();
    await user.discordLogin(code.value as string);
    loadingbar.finish();
    message.success("綁定成功")
    router.push({ name: "Link Discord" });
  } catch (e: any) {
    loadingbar.finish();
    message.error(e.message);
    router.push({ name: "Link Discord" });
  }
});
</script>
