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
          <StationoneCompnoent
            :formData="props.formData"
            :modeldisabled="props.modeldisabled"
            ref="oneRef"
          />
        </template>
        <template v-else-if="props.formData.sys === '2.0+2.0e'">
          <StationtwoCompnoent
            :formData="props.formData"
            :modeldisabled="props.modeldisabled"
            ref="twoRef"
          />
        </template>
        <template v-else-if="props.formData.sys === '2.0'">
          <StationtwoCompnoent
            :formData="props.formData"
            :modeldisabled="props.modeldisabled"
            ref="twoRef"
          />
        </template>
        <template v-else-if="props.formData.sys === '2.0+2.0E'">
          <StationtwoCompnoent
            :formData="props.formData"
            :modeldisabled="props.modeldisabled"
            ref="twoRef"
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
import StationoneCompnoent from "./StationoneComponent.vue";
import StationtwoCompnoent from "./StationtwoComponent.vue";
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
// const twoeRef = ref(null);

async function subform() {
  let data = null;
  if (oneRef.value) {
    data = oneRef.value.modelRef;
    await putData1(data);
  } else if (twoRef.value) {
    data = twoRef.value.modelRef;
    await putData2(data);
  }

  //更新整體資料
  emit("getData");
  //關閉
  drawerclose();
}

//更新資料
async function putData1(data) {
  const resData = {
    ...data,
    KIOSK功能: data["KIOSK功能"].ischeck,
    場站周遭環境: data["場站周遭環境"].ischeck,
    KIOSK外觀: data["KIOSK外觀"].ischeck,
    KIOSK燈片: data["KIOSK燈片"].ischeck,
    場站導標桿: data["場站導標桿"].ischeck,
  };

  const { id } = data;
  resData.station_name = `${resData.city}-${resData.station}`;
  // console.log(resData);
  const url = `${import.meta.env.VITE_URL}/station/station1/${id}`;
  await axios.put(url, resData);
}

async function putData2(data) {
  const resData = {
    ...data,
    場站導標桿: data["場站導標桿"].ischeck,
  };

  const { id } = data;
  resData.station_name = `${resData.city}-${resData.station}`;
  const url = `${import.meta.env.VITE_URL}/station/station2/${id}`;
  await axios.put(url, resData);
}

function drawerclose() {
  emit("drawerclose");
}
</script>

<style lang="scss" scoped></style>
