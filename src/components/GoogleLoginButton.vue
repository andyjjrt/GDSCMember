<template>
  <GoogleLogin :callback="callback" />
</template>

<script lang="ts" setup>
import { useLoadingBar, useMessage } from "naive-ui";
import { decodeCredential, CallbackTypes } from "vue3-google-login";
import { useUserStore } from "../store/user";

const emits = defineEmits(["handleGoogleLogin"]);
const user = useUserStore();
const loadingBar = useLoadingBar();
const message = useMessage();
const router = useRouter();

const callback: CallbackTypes.CredentialCallback = async (response) => {
  try {
    user.appReady = false;
    loadingBar.start();
    await user.googleLogin(response.credential);
    loadingBar.finish();
    emits("handleGoogleLogin", decodeCredential(response.credential));
  } catch (e: any) {
    message.error(e);
    user.googleLogout();
  }
};
</script>
