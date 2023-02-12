<template>
  <n-card class="max-w-[400px]">
    <template #header>
      <div class="flex justify-between items-center mt-[-10px]">
        <h1>{{ getId }}</h1>
        <n-button @click="handleResetDiscord" :loading="loading" v-if="!readOnly">
          取消綁定
        </n-button>
      </div>
    </template>
    <template #cover>
      <div class="relative pb-12">
        <img :src="getBanner" />
        <img
          :src="getAvatar"
          class="rounded-full absolute left-0 bottom-0 !w-28 border-8 ml-3"
          style="border-color: var(--n-color)"
        />
      </div>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import { useUserStore } from "../../store/user";

const props = defineProps({
  discordData: {
    type: Object,
    default: () => {}
  },
  readOnly: {
    type: Boolean,
    default: false
  }
})
const user = useUserStore();
const loading = ref(false);

const handleResetDiscord = async () => {
  loading.value = true;
  await user.discordReset((props.discordData as any)?.id);
  loading.value = false;
};

const getBanner = computed(() => {
  if (!props.discordData.banner) {
    if (!props.discordData.banner_color) {
      return "https://singlecolorimage.com/get/ffffff/512x175";
    }
    return `https://singlecolorimage.com/get/${props.discordData.banner_color.split("#")[1]}/512x175`;
  }
  return `https://cdn.discordapp.com/banners/${(props.discordData as any)?.id}/${
    (props.discordData as any)?.banner
  }?size=512`;
});

const getAvatar = computed(() => {
  if (!props.discordData.avatar) {
    return `https://cdn.discordapp.com/embed/avatars/${
      props.discordData.discriminator % 5
    }.png`;
  }
  return `https://cdn.discordapp.com/avatars/${(props.discordData as any)?.id}/${
    (props.discordData as any)?.avatar
  }?size=128`;
});

const getId = computed(() => {
  return `${(props.discordData as any)?.username}#${
    (props.discordData as any)?.discriminator
  }`;
});
</script>
