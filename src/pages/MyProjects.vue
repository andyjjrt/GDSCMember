<template>
  <n-space vertical>
    <n-card>
      <template #header>
        <div class="flex justify-between">
          <h2>我加入的專案</h2>
          <RouterLink :to="{ name: 'Enter Project' }">
            <n-button> 加入專案 </n-button>
          </RouterLink>
        </div>
      </template>
      <n-space vertical>
        <n-card :title="project.name" v-for="project in user.joinedProjects">
          {{ project.description }}
        </n-card>
        <n-empty
          description="尚無專案"
          v-if="!user.joinedProjects || user.joinedProjects.length === 0"
        />
      </n-space>
    </n-card>
    <n-card>
      <template #header>
        <div class="flex justify-between">
          <h2>我開啟的專案</h2>
          <n-spin :show="!isUserCompleted || !isDiscordConnected">
            <template #icon></template>
            <RouterLink :to="{ name: 'Create Project' }">
              <n-button>新增專案</n-button>
            </RouterLink>
          </n-spin>
        </div>
      </template>
      <n-space vertical>
        <HostProjectCard
          v-for="project in user.createdProjects"
          :project="project"
        />
        <n-empty
          description="尚無專案"
          v-if="!user.createdProjects || user.createdProjects.length === 0"
        />
      </n-space>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import { useUserStore } from "../store/user";

const user = useUserStore();

const isUserCompleted = computed(() => {
  return user.userData.name !== "" && user.userData.phone !== "";
});

const isDiscordConnected = computed(() => {
  return user.discordData !== null;
});
</script>
