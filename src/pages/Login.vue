<template>
  <div class="h-full w-full flex justify-center items-center">
    <n-result title="GDSC NCCU" description="社員登錄平台">
      <template #icon>
        <img :src="Logo" width="150" />
      </template>
      <template #footer>
        <GoogleLoginButton @handleGoogleLogin="handleGoogleLogin" />
      </template>
    </n-result>
  </div>
</template>

<script lang="ts" setup>
import { RouteLocationRaw } from "vue-router";
import Logo from "../assets/Logo.png";
const router = useRouter();
const route = useRoute();

const redirectedFrom = computed(() => route.redirectedFrom);

const handleGoogleLogin = (param: object) => {
  router.push(
    (redirectedFrom.value
      ? { name: redirectedFrom.value.name, query: redirectedFrom.value.query }
      : { name: "Home" }) as RouteLocationRaw
  );
};
</script>
