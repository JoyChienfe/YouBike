<template>
  <n-upload :action="url" :custom-request="customRequest" ref="uploadref">
    <n-button type="primary">上傳文件</n-button>
  </n-upload>
</template>

<script setup>
import { NUpload, NButton } from "naive-ui";
import axios from "axios";
import { ref } from "vue";
const uploadref = ref();
const url = `${import.meta.env.VITE_URL}/biketest/upload`;

const customRequest = async (option) => {
  const file = option.file.file; // 获取文件对象

  const formData = new FormData();
  formData.append("file", file); // 使用与后端接收的字段名相同的名称

  try {
    await axios.post(url, formData);
    alert("上傳成功");
  } catch (error) {
    console.log(error);
  } finally {
    uploadref.value.clear();
  }
};
</script>

<style lang="scss" scoped></style>
