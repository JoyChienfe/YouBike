<script setup>
import { RouterView } from "vue-router";
import { NConfigProvider } from "naive-ui";
import { zhTW, dateZhTW } from "naive-ui";
</script>

<template>
  <n-config-provider :locale="zhTW" :date-locale="dateZhTW">
    <RouterView />
  </n-config-provider>
</template>

<style lang="scss">
@import "./assets/main.scss";
</style>
