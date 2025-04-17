<template>
  <el-form-item :label="props.title">
    <el-checkbox-group>
      <el-checkbox
        v-for="i in props.value"
        :key="i.value"
        :label="i.value"
        :name="i.value"
        v-model="i.ischeck"
      />
    </el-checkbox-group>
  </el-form-item>
</template>

<script setup lang="ts">
//表單checkbox勾選框
interface Checkinput {
  title: string;
  value: [{ value: string; ischeck: boolean }];
}
const props = defineProps<Checkinput>();
</script>

<style scoped>
:deep() .el-checkbox.el-checkbox--large .el-checkbox__label {
  font-size: 16px;
}
</style>
