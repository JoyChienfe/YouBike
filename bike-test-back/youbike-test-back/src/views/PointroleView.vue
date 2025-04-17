<template>
  <div class="container">
    <Loading
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    />
    <div class="row mx-0 mt-3">
      <h1 class="report-h1 fw-bold">分數角色管理</h1>
    </div>
    <div class="row mx-0">
      <div class="col-6 mb-3">
        <el-select-v2
          class="me-3"
          v-model="selectvalue"
          filterable
          remote
          :remote-method="remoteMethod"
          clearable
          :options="selectoptions"
          :loading="loading"
          placeholder="請輸入資料"
        ></el-select-v2>
        <n-button type="info" @click="editformOpen" class="mt-3">確定</n-button>
      </div>

      <div class="row mx-auto px-0" v-if="editformHandler">
        <n-divider />
        <div class="col-md-3">
          <label for="labelname" class="form-label fw-bolder">姓名</label>
          <n-input
            size="large"
            round
            :disabled="true"
            v-model:value="editformData.user_name"
          />
        </div>
        <div class="col-md-3 mt-2 mt-md-0">
          <label for="labelid" class="form-label fw-bolder">公號</label>
          <n-input
            size="large"
            round
            :disabled="true"
            v-model:value="editformData.user_id"
          />
        </div>
        <div class="col-md-3 mt-2 mt-md-0">
          <label for="labelid" class="form-label fw-bolder">目前角色</label>
          <n-input
            size="large"
            round
            :disabled="true"
            v-model:value="editformData.role"
          />
        </div>
        <div class="col-md-3 mt-2 mt-md-0">
          <label for="" class="form-label fw-bolder">修改成的角色</label>
          <n-select
            v-model:value="editformData.editrole"
            :options="editformoptions"
          />
        </div>
        <div
          class="col col-md-auto mt-3 d-flex flex-column justify-content-end"
        >
          <n-button type="info" @click="submitform">送出</n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { NButton, NDivider, NSelect, NInput } from "naive-ui";
import { ElSelectV2 } from "element-plus";
import { ref } from "vue";
import axios from "axios";

const loading = ref(false);
const selectoptions = ref([]);
const list = ref([]);
const selectvalue = ref(null);
const isLoading = ref(false);

//select觸發時的funs
function remoteMethod(query) {
  if (query !== "") {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      selectoptions.value = list.value.filter((item) => {
        return item.label.toLowerCase().includes(query.toLowerCase());
      });
    }, 200);
  } else {
    selectoptions.value = [];
  }
}

//取得資料
async function getData() {
  try {
    isLoading.value = true;
    const url = `${import.meta.env.VITE_URL}/user/users`;
    const res = await axios.get(url);
    isLoading.value = false;
    return res;
  } catch (error) {
    console.log(error);
  }
}

//把資料放到lsite總表
function inputlist(items) {
  list.value = items.data.map((item) => ({
    label: `${item.user_id}-${item.user_name}-${item.role_id}`,
    value: `${item.user_id}-${item.user_name}-${item.role_id}`,
  }));
}

const editformHandler = ref(false);
const editformData = ref({
  user_name: null,
  user_id: null,
  role: null,
  editrole: "營運處",
});

const editformoptions = ref([
  {
    label: "一般幕僚",
    value: "一般幕僚",
  },
  {
    label: "營運處",
    value: "營運處",
  },
]);

async function clearform() {
  //清除表單
  editformData.value = {
    user_name: null,
    user_id: null,
    role: null,
    editrole: "營運處",
  };
  //清除選擇
  selectvalue.value = null;
  list.value = [];
  selectoptions.value = [];

  //重新抓資料
  const res = await getData();
  inputlist(res);
}

function editformOpen() {
  if (!selectvalue.value) {
    return;
  }
  const data = selectvalue.value.split("-");
  const [user_id, user_name, role] = data;
  editformData.value.user_name = user_name;
  editformData.value.user_id = user_id;
  editformData.value.role = role;
  editformHandler.value = true;
}

function editformClose() {
  clearform();
  editformHandler.value = false;
}

async function submitform() {
  try {
    const { user_id, editrole } = editformData.value;
    isLoading.value = true;
    const url = `${import.meta.env.VITE_URL}/user/role`;
    const payload = {
      id: user_id,
      role: editrole,
    };
    await axios.patch(url, payload);
    isLoading.value = false;
    editformClose();
  } catch (error) {
    console.log(error);
  }
}

(async () => {
  await clearform();
})();
</script>

<style lang="scss" scoped></style>
