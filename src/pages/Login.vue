<template>
  <div class="h-full w-full flex justify-center items-center">
    <n-result
      title="GDSC NCCU"
      description="社員登錄平台"
    >
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
import Logo from "../assets/Logo.png"
const router = useRouter();

const handleGoogleLogin = (param: object) => {
  router.push({ name: "Home" });
};
</script>
