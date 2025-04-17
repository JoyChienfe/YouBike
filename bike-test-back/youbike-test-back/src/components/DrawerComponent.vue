<!-- eslint-disable vue/no-mutating-props -->
<template>
  <n-drawer
    v-model:show="props.drawerisopen"
    :width="600"
    class="fw-bold"
    :close-on-esc="false"
    :mask-closable="false"
  >
    <n-drawer-content :native-scrollbar="false">
      <template #header
        ><span class="fw-bold">{{ props.methodName }}</span></template
      >
      <template #default>
        <template v-if="props.formData.sys === '1.0'">
          <biketestone-component
            :formData="props.formData"
            :modeldisabled="props.modeldisabled"
            ref="oneRef"
          />
        </template>
        <template v-else-if="props.formData.sys === '2.0'">
          <biketesttwo-component
            :formData="props.formData"
            :modeldisabled="props.modeldisabled"
            ref="twoRef"
          />
        </template>
        <template v-else-if="props.formData.sys === '2.0e'">
          <biketesttwoe-component
            :formData="props.formData"
            :modeldisabled="props.modeldisabled"
            ref="twoeRef"
          />
        </template>
        <template v-else-if="props.formData.sys === '2.0E'">
          <biketesttwoe-component
            :formData="props.formData"
            :modeldisabled="props.modeldisabled"
            ref="twoeRef"
          />
        </template>
      </template>
      <template #footer>
        <template v-if="props.methodName === '查看'">
          <n-button
            type="primary"
            @click="drawerclose"
            class="fw-bold col-12"
            style="height: 50px"
            >關閉</n-button
          >
        </template>
        <template v-else-if="props.methodName === '編輯'">
          <n-button @click="drawerclose" class="fw-bold">取消</n-button>
          <n-button class="ms-3 fw-bold" @click="subform">送出</n-button>
        </template>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { NDrawer, NDrawerContent, NButton } from "naive-ui";
import BiketestoneComponent from "./BiketestoneComponent.vue";
import BiketesttwoComponent from "./BiketesttwoComponent.vue";
import BiketesttwoeComponent from "./BiketesttwoeComponent.vue";
const emit = defineEmits(["drawerclose", "getData"]);
const props = defineProps({
  methodName: {
    type: String,
    required: true,
  },
  drawerisopen: {
    type: Boolean,
    required: true,
  },
  formData: {
    type: Object,
  },
  modeldisabled: {
    type: Boolean,
  },
});

const oneRef = ref(null);
const twoRef = ref(null);
const twoeRef = ref(null);

async function subform() {
  let data = null;
  if (oneRef.value) {
    data = oneRef.value.modelRef;
  } else if (twoRef.value) {
    data = twoRef.value.modelRef;
  } else if (twoeRef.value) {
    data = twoeRef.value.modelRef;
  }
  //更新資料
  await putData(data);
  //更新整體資料
  emit("getData");

  //關閉
  drawerclose();
}

//更新資料
async function putData(data) {
  const resData = { ...data };
  resData.station_name = `${resData.city}-${resData.station}`;
  const { id } = data;
  const url = `${import.meta.env.VITE_URL}/biketest/biketest/${id}`;
  await axios.put(url, resData);
}

function drawerclose() {
  emit("drawerclose");
}

// defineExpose({ selectValue: selectValue.value });
// () => {
//   console.log(props.formData);
// };
</script>

<style lang="scss" scoped></style>
