<template>
  <el-result title="404" sub-title="抱歉, 找不到該頁面">
    <template #icon>
      <el-image
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      />
    </template>
    <template #extra>
      <el-button type="primary" @click="subimt">返回首頁</el-button>
    </template>
  </el-result>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const subimt = () => {
  router.push("/server/mainpage");
};
</script>

<style scoped></style>
