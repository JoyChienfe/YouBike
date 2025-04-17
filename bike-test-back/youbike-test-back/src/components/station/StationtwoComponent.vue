<template>
  <n-form
    ref="formRef"
    :model="modelRef"
    :disabled="props.modeldisabled"
    :size="size"
  >
    <n-form-item path="id" label="編號">
      <n-input-number v-model:value="modelRef.id" :disabled="true" />
    </n-form-item>
    <n-form-item path="user_name" label="姓名">
      <n-input v-model:value="modelRef.user_name" :disabled="true" />
    </n-form-item>
    <n-form-item path="user_id" label="公號">
      <n-input v-model:value="modelRef.user_id" :disabled="true" />
    </n-form-item>
    <n-form-item path="test_date" label="測驗日期">
      <n-input v-model:value="modelRef.test_date" :disabled="true" />
    </n-form-item>
    <n-form-item path="sys" label="車種">
      <n-input v-model:value="modelRef.sys" :disabled="true" />
    </n-form-item>
    <n-form-item path="sys" label="場站名稱">
      <n-input v-model:value="modelRef.station" />
    </n-form-item>
    <n-form-item path="city" label="城市">
      <n-input v-model:value="modelRef.city" :disabled="true" />
    </n-form-item>
    <n-form-item path="id" label="場站車輛數">
      <n-input-number v-model:value="modelRef.carnum" />
    </n-form-item>
    <n-form-item path="id" label="無法租借車輛數">
      <n-input-number v-model:value="modelRef.no_carnum" />
    </n-form-item>
    <n-form-item label="場站導標桿" path="modelRef['場站導標桿']">
      <n-checkbox-group v-model:value="modelRef['場站導標桿']['ischeck']">
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef['場站導標桿'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
  </n-form>
</template>

<script setup>
import { ref } from "vue";
import {
  NFormItem,
  NForm,
  NInput,
  NCheckbox,
  NSpace,
  NCheckboxGroup,
  NInputNumber,
} from "naive-ui";

const props = defineProps({
  formData: {
    type: Object,
  },
  modeldisabled: {
    type: Boolean,
  },
});

const size = ref("large");
const formRef = ref(null);
const modelRef = ref(null);
//修正表單結構
function editcheckData() {
  modelRef.value["場站導標桿"]["ischeck"] = [...modelRef.value["場站導標桿"]];
  modelRef.value["場站導標桿"].value = modelRef.value["場站導標桿"].value = [
    "歪斜、損毀",
    "漏缺",
  ];
}

function creatFrom() {
  modelRef.value = { ...props.formData };
  const station_name = modelRef.value["station_name"];
  modelRef.value["city"] = station_name.split("-")[0];

  modelRef.value["station"] = modelRef.value["station_name"].split("-")[1];
  for (const key in modelRef.value.testtable) {
    const obj = { ...modelRef.value.testtable[key] };
    if (
      !Object.prototype.hasOwnProperty.call(obj, "ischeck") &&
      typeof modelRef.value.testtable[key] === "object"
    ) {
      modelRef.value.testtable[key]["ischeck"] = [];
    }
  }

  editcheckData();
}

defineExpose({
  modelRef,
});

(() => {
  creatFrom();
})();
</script>

<style lang="scss" scoped></style>
