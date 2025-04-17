<template>
  <div class="container-fluid">
    <p class="fs-1 mb-2 text-center">模擬體驗</p>
    <el-form
      label-width="120px"
      size="large"
      label-position="top"
      :model="ruleFormAll"
      ref="formRefAll"
      :rules="rulesAll"
    >
      <div class="row">
        <template v-if="ruleFormAll.catequery === '1.0'"> </template>
        <template v-else-if="ruleFormAll.catequery === '2.0'"> </template>
        <template v-else-if="ruleFormAll.catequery === '2.0E'">
          <div class="col-12 mb-1">
            <el-form-item :label="ruleFormAll.checkdata[0].title">
              <el-checkbox-group v-model="ruleFormAll.checkdata[0].ischeck">
                <el-checkbox
                  v-for="i in ruleFormAll.checkdata[0].value"
                  :key="i"
                  :label="i"
                  :name="i"
                />
              </el-checkbox-group>
            </el-form-item>
          </div>
          <!-- <el-tooltip
            class="box-item"
            effect="dark"
            content="中置電機運轉"
            placement="top-start"
          >
            <el-icon size="20" color="#ADADAD"><QuestionFilled /></el-icon>
          </el-tooltip> -->
          <!-- <div class="col-12 mb-1">
            <el-tooltip class="box-item" effect="dark" placement="top-start">
              <template #content>
                此為檢驗QR識別效果，無須測試輸入驗證碼<br />
                同站借還5分鐘不扣款<br />
                無法於啟動掃碼（一次）螢幕熄滅內識別QR即為失敗<br />
              </template>
              <el-icon size="20" color="#ADADAD"><QuestionFilled /></el-icon>
            </el-tooltip>
            <el-form-item label="掃碼借車" prop="iscodepass">
              <el-radio-group v-model="ruleFormAll.iscodepass">
                <el-radio label="是" />
                <el-radio label="否" />
              </el-radio-group>
            </el-form-item>
          </div> -->

          <div class="col-12 mb-1">
            <el-form-item label="前胎壓" prop="startrow">
              <el-input
                placeholder="請輸入前胎壓"
                v-model="ruleFormAll.startrow"
                type="number"
                inputmode="numeric"
              />
            </el-form-item>
          </div>
          <div class="col-12 mb-1">
            <el-form-item label="後胎壓" prop="endrow">
              <el-input
                placeholder="請輸入後胎壓"
                v-model="ruleFormAll.endrow"
                type="number"
                inputmode="numeric"
              />
            </el-form-item>
          </div>
          <div class="col-12 mb-1">
            <el-form-item label="備註">
              <el-input type="textarea" v-model="ruleFormAll.text" />
            </el-form-item>
          </div>
          <div class="row mx-auto">
            <div class="col-6">
              <el-form-item>
                <el-button type="primary" plain class="col-12" @click="next"
                  >上一步</el-button
                >
              </el-form-item>
            </div>
            <div class="col-6">
              <el-form-item>
                <el-button
                  type="primary"
                  plain
                  class="col-12"
                  @click="submitForm(formRefAll)"
                  >送出</el-button
                >
              </el-form-item>
            </div>
          </div>
        </template>
      </div>
    </el-form>
  </div>
  <PhotoComponent
    :centerDialogVisible="centerDialogVisible"
    @closeModal="closeModal"
    @submitFrom="submitFrom"
    :upload-data="uploadData"
  />
</template>

<script setup lang="ts">
import PhotoComponent from "../components/PhotoComponent.vue";
import type { FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { ref, onMounted, inject } from "vue";
const router = useRouter();
const swal = inject("$swal") as any;
async function Alert() {
  const res = await swal({
    icon: "warning",
    title: "是否提交表單",
    showCancelButton: true,
    confirmButtonText: "是",
    cancelButtonText: "否",
  });
  if (!res.isConfirmed) {
    return false;
  } else {
    return true;
  }
}

// async function submitAlert() {
//   const res = await swal({
//     icon: "success",
//     title: "表單送出成功",
//     confirmButtonText: "確定",
//   });
//   if (res.isConfirmed) {
//     return true;
//   } else {
//     return false;
//   }
// }

async function TimeSubmitAlert() {
  let timerInterval: number | undefined;
  await swal({
    icon: "success",
    title: "表單送出成功",
    html: "將導到拍照頁面...",
    timer: 2500,
    timerProgressBar: true,
    didOpen: () => {
      swal.showLoading();
      swal.getPopup().querySelector("b");
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  });
}

async function photoAlert() {
  const res = await swal({
    icon: "warning",
    title: "是否需要拍照",
    showCancelButton: true,
    cancelButtonText: "否",
    confirmButtonText: "是",
  });
  if (res.isConfirmed) {
    return true;
  } else {
    return false;
  }
}

const formRefAll = ref<FormInstance>();
const ruleFormAll = ref<BiketestStepten>({
  catequery: "1.0",
  startrow: null,
  endrow: null,
  text: "",
  iscodepass: null,
  checkdata: [
    //2.0E
    {
      title: "騎乘行進",
      ischeck: [],
      value: ["行進不順暢", "異音"],
    },
  ],
});

const rulesAll = ref<FormRules<BiketestStepeight>>({
  iscodepass: [
    { required: true, message: "掃瑪借車不能為空", trigger: "blur" },
  ],
  startrow: [{ required: true, message: "前胎壓不能為空", trigger: "blur" }],
  endrow: [{ required: true, message: "後胎壓不能為空", trigger: "blur" }],
});

//至頂
const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 使用平滑滚动
  });
};

import { useBiketest } from "../stores/bikestest";
import type { BiketestStepeight, BiketestStepten } from "env";
const teststore = useBiketest();

onMounted(() => {
  //至頂
  scrollToTop();
  //判斷有沒有該網站step 沒有就踢掉
  if (!teststore.step.step10) {
    router.push("/server/biketest/BiketestStepnine");
  }

  //判斷是什麼系統
  if (teststore.systum === "1.0") {
    ruleFormAll.value.catequery = "1.0";
  } else if (teststore.systum === "2.0") {
    ruleFormAll.value.catequery = "2.0";
  } else {
    ruleFormAll.value.catequery = "2.0E";
  }

  SetTempData();
});

//抓pinia上面暫存的資料,用於保存頁面資料
const SetTempData = () => {
  const nowSys = teststore.systum;
  if (nowSys === "1.0") {
    console.log("現在系統是1.0,賦予資料中...");
    console.log("不需要保存資料,因為1.0這是最後一頁");
  } else if (nowSys === "2.0") {
    console.log("現在系統是2.0,賦予資料中...");
    console.log("不需要保存資料,因為2.0這是最後一頁");
  } else if (nowSys === "2.0E") {
    console.log("現在系統是2.0E,賦予資料中...");
    console.log("不需要保存資料,因為2.0E這是最後一頁");
  } else {
    console.log("現在沒有系統");
  }
};

//取得當前日期
function getnowtime(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份从 0 到 11，所以要加 1
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const formattedDate1 = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate1;
}

const centerDialogVisible = ref(false);
const uploadData = ref({});
//打開面板
function openModel(): void {
  centerDialogVisible.value = true;
}

//關閉面板
function closeModal(): void {
  centerDialogVisible.value = false;
}

//送出表單
function submitFrom(): void {
  //清空頁面權限, 跟pinia上的資料
  teststore.clearfrom();
  teststore.clearstep();
  router.push("/server/bikesubmit");
}

import { useAuth } from "../stores/auth";
import axios from "axios";
const store = useAuth();
//帳號
const { account } = store.getUserid();
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  try {
    await formEl.validate();

    if (ruleFormAll.value.catequery === "1.0") {
      return;
    } else if (ruleFormAll.value.catequery === "2.0") {
      return;
    } else if (ruleFormAll.value.catequery === "2.0E") {
      const res = await Alert();
      if (!res) return;
      //表單
      teststore.testfrom3.騎乘行進 = ruleFormAll.value.checkdata[0];
      teststore.testfrom3.iscodepass = ruleFormAll.value.iscodepass;
      teststore.testfrom3.startrow = ruleFormAll.value.startrow;
      teststore.testfrom3.endrow = ruleFormAll.value.endrow;
      teststore.testfrom3.text = ruleFormAll.value.text;

      //送出結果到後端
      const url = `${import.meta.env.VITE_URL}/biketest/biketest`;
      const newNameAtrr = teststore.testfrom3.station_name!.split("-");
      const payload = {
        sys: teststore.systum,
        user_id: account,
        edit_id: "",
        test_date: getnowtime(),
        station_name: `${newNameAtrr[0]}-${newNameAtrr[1]}`,
        carnum: teststore.testfrom3.carnum,
        carnum2: teststore.testfrom3.carnum2,
        tablejson: teststore.testfrom3,
      };
      // console.log(payload);
      await axios.post(url, payload);
      await TimeSubmitAlert();
      //是否要拍照頁
      const isTakePhoto = await photoAlert();
      if (!isTakePhoto) {
        submitFrom();
      } else {
        const date = new Date();
        const nowMonth = date.getMonth() + 1;
        const nowDay = date.getDate();
        uploadData.value = {
          payload: `(${nowMonth}-${nowDay})-${teststore.testfrom3.carnum}`,
        };
        openModel();
      }

      console.log("送出2.0E");
    }
  } catch (error) {
    console.log("驗證失敗");
  }
};

window.addEventListener("beforeunload", function (event) {
  // 顯示自定義確認對話框
  const confirmationMessage = "您確定要離開此頁面嗎？您的未保存更改將丟失。";
  event.returnValue = confirmationMessage; // 設置提示消息

  // 檢查用戶的選擇
  if (!confirm(confirmationMessage)) {
    // 如果用戶按下取消，取消重新整理
    event.preventDefault();
  }
});

//上一步
const next = () => {
  teststore.step.step10 = false;
  router.push("/server/biketest/BiketestStepnine");
};
</script>

<style scoped>
.el-form-item--large {
  --font-size: 23px;
}
</style>
