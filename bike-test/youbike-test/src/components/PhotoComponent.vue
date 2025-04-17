<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-dialog
    v-model="props.centerDialogVisible"
    title="上傳照片"
    width="90%"
    align-center
    :before-close="() => false"
  >
    <el-upload
      v-model:file-list="fileList"
      ref="uploadRef"
      class="upload-demo col-12"
      :action="actionUrl"
      :auto-upload="false"
      list-type="picture-card"
      name="image"
      :limit="5"
      :data="props.uploadData"
      :multiple="true"
    >
      <template #trigger>
        <el-button type="primary">檔案上傳</el-button>
      </template>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeModel">取消</el-button>
        <el-button type="primary" @click="submitModel"> 送出 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { UploadUserFile } from "element-plus";
const props = defineProps({
  //開關
  centerDialogVisible: { type: Boolean, required: true },
  //月份+車號 ex: 01-1234567
  uploadData: { type: Object, required: true },
});

const actionUrl = `${import.meta.env.VITE_URL}/biketest/upload`;
//對話框開關

// 基于选项
const emit = defineEmits(["closeModal", "submitFrom"]);

//拍照按鈕
import type { UploadInstance } from "element-plus";
const uploadRef = ref<UploadInstance>();

function closeModel(): void {
  emit("closeModal");
  emit("submitFrom");
}

function submitModel(): void {
  uploadRef.value?.submit();
  uploadRef.value?.clearFiles();
  closeModel();
  emit("submitFrom");
}

const fileList = ref<UploadUserFile[]>();
</script>

<style lang="scss" scoped></style>
