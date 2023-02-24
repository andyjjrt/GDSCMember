<template>
  <n-list>
    <n-list-item>
      <n-thing title="Log" content-style="margin-top: 10px;"> </n-thing>
      <template #suffix>
        <RouterLink :to="{ name: 'Log' }">
          <n-button>前往</n-button>
        </RouterLink>
      </template>
    </n-list-item>
    <n-list-item>
      <n-thing title="Projects" content-style="margin-top: 10px;"> </n-thing>
      <template #suffix>
        <RouterLink :to="{ name: 'AdminProjects' }">
          <n-button>前往</n-button>
        </RouterLink>
      </template>
    </n-list-item>
  </n-list>
</template>
