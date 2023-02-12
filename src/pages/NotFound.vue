<template>
  <n-space class="h-full" align="center" justify="center">
    <n-result
      status="404"
      title="404 Not Found"
      description="You know life is always ridiculous."
    >
      <template #footer>
        <RouterLink to="/">
          <n-button>Back Home</n-button>
        </RouterLink>
      </template>
    </n-result>
  </n-space>
</template>
