<template>
  <n-card>
    <template #header>
      <div class="flex justify-between">
        <h2>{{ project.name }}</h2>
        <div class="flex items-center gap-1">
          <n-tag :bordered="false" type="info">
            <n-number-animation :from="0" :to="project.authCode" active />
          </n-tag>
        </div>
      </div>
    </template>
    {{ project.description }}
    <n-space justify="space-between" align="center">
      <n-avatar-group :options="members" :size="20" :max="3" class="mt-2">
        <template #avatar="{ option: { label, key } }">
          <n-tooltip>
            <template #trigger>
              <n-avatar size="small">{{ key[0] }}</n-avatar>
            </template>
            {{ label }}
          </n-tooltip>
        </template>
        <template #rest="{ options: restOptions, rest }">
          <n-dropdown :options="restOptions" placement="top">
            <n-avatar size="small">+{{ rest }}</n-avatar>
          </n-dropdown>
        </template>
      </n-avatar-group>
      <n-space>
        <n-button text @click="showModal = true"><IconShare /></n-button>
        <RouterLink :to="{ name: 'Edit Project', query: { id: project.id } }">
          <n-button text><IconEdit /></n-button>
        </RouterLink>
      </n-space>
    </n-space>
  </n-card>
  <n-modal v-model:show="showModal" transform-origin="center">
    <n-card
      class="max-w-xs rounded-2xl"
      title="分享"
      :bordered="false"
      role="dialog"
      aria-modal="true"
    >
      <n-space vertical>
        <n-space justify="center">
          <vue-qrcode :value="shareUrl" />
        </n-space>
        <n-input-group>
          <n-input readonly :default-value="shareUrl" />
          <n-button type="primary" ghost @click="copyToClipboard">
            複製
          </n-button>
        </n-input-group>
      </n-space>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { useMessage } from "naive-ui";

const props = defineProps({
  project: {
    type: Object,
    default: () => {},
  },
});

const message = useMessage();

const shareUrl = computed(
  () => "https://member.gdscnccu.com/projects/enter?id=" + props.project.id
);

const copyToClipboard = () => {
  navigator.clipboard.writeText(shareUrl.value);
  message.success("已複製到剪貼簿");
};

const members = computed(() =>
  props.project.members.map((member: string) => ({
    key: member,
    label: member,
  }))
);


const showModal = ref(false);
</script>
