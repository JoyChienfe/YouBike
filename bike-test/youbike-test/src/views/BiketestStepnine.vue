<template>
  <div class="container-fluid">
    <p class="fs-1 mb-2 text-center">模擬體驗</p>

    <el-form
      label-width="120px"
      size="large"
      label-position="top"
      :model="ruleFormAll"
      ref="formRefAll"
    >
      <div class="row">
        <template v-if="ruleFormAll.catequery === '1.0'"> </template>
        <template v-else-if="ruleFormAll.catequery === '2.0'"> </template>
        <template v-else-if="ruleFormAll.catequery === '2.0E'">
          <div class="col-12 mb-1">
            <el-tooltip class="box-item" effect="dark" placement="top-start">
              <template #content>
                破損 : 時間、費用、電量提醒任一內容不完整<br />
                舊版文字 : 第三小時起<br />
              </template>
              <el-icon size="20" color="#ADADAD"><QuestionFilled /></el-icon>
            </el-tooltip>
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
          <div class="col-12 mb-1">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="中置電機運轉"
              placement="top-start"
            >
              <el-icon size="20" color="#ADADAD"><QuestionFilled /></el-icon>
            </el-tooltip>
            <el-form-item :label="ruleFormAll.checkdata[1].title">
              <el-checkbox-group v-model="ruleFormAll.checkdata[1].ischeck">
                <el-checkbox
                  v-for="i in ruleFormAll.checkdata[1].value"
                  :key="i"
                  :label="i"
                  :name="i"
                />
              </el-checkbox-group>
            </el-form-item>
          </div>
          <div class="col-12 mb-1">
            <el-form-item :label="ruleFormAll.checkdata[2].title">
              <el-checkbox-group v-model="ruleFormAll.checkdata[2].ischeck">
                <el-checkbox
                  v-for="i in ruleFormAll.checkdata[2].value"
                  :key="i"
                  :label="i"
                  :name="i"
                />
              </el-checkbox-group>
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
                  >下一步</el-button
                >
              </el-form-item>
            </div>
          </div>
        </template>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
const router = useRouter();

const formRefAll = ref<FormInstance>();
const ruleFormAll = ref<BiketestStepnine>({
  catequery: "1.0",

  checkdata: [
    //2.0E
    {
      title: "費率貼紙",
      ischeck: [],
      value: ["無貼紙", "舊版", "破損"],
    },
    {
      title: "作動",
      ischeck: [],
      value: ["騎行踩動時 無動力推進", "停車靜止時 有動力推進"],
    },
    {
      title: "車速",
      ischeck: [],
      value: [
        "無 車速測片 或 感應片",
        "車機面板 無車速顯示／顯示閃爍",
        "車機面板 靜止時顯示車輛車速非0",
      ],
    },
  ],
});

//至頂
const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 使用平滑滚动
  });
};

import { useBiketest } from "../stores/bikestest";
import type { BiketestStepnine } from "env";
const teststore = useBiketest();

onMounted(() => {
  //至頂
  scrollToTop();
  //判斷有沒有該網站step 沒有就踢掉
  if (!teststore.step.step9) {
    router.push("/server/biketest/BiketestStepeight");
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
    // ruleFormAll.value.checkdata[4]["ischeck"] = teststore.testfrom1.騎乘行進
    //   ?.ischeck as [];
    console.log("不需要保存資料,因為1.0這是最後一頁");
  } else if (nowSys === "2.0") {
    console.log("現在系統是2.0,賦予資料中...");
    console.log("不需要保存資料,因為1.0這是最後一頁");
  } else if (nowSys === "2.0E") {
    console.log("現在系統是2.0E,賦予資料中...");
    ruleFormAll.value.checkdata[0]["ischeck"] = teststore.testfrom3.費率貼紙
      ?.ischeck as [];
    ruleFormAll.value.checkdata[1]["ischeck"] = teststore.testfrom3.作動
      ?.ischeck as [];
    ruleFormAll.value.checkdata[2]["ischeck"] = teststore.testfrom3.車速
      ?.ischeck as [];
  } else {
    console.log("現在沒有系統");
  }
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  try {
    await formEl.validate();

    if (ruleFormAll.value.catequery === "1.0") {
      return;
    } else if (ruleFormAll.value.catequery === "2.0") {
      return;
    } else if (ruleFormAll.value.catequery === "2.0E") {
      //表單
      teststore.testfrom3.費率貼紙 = ruleFormAll.value.checkdata[0];
      teststore.testfrom3.作動 = ruleFormAll.value.checkdata[1];
      teststore.testfrom3.車速 = ruleFormAll.value.checkdata[2];
      console.log("送出2.0E");
      //第九頁權限開啟
      teststore.step.step10 = true;
      router.push("/server/biketest/BiketestStepten");
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
  teststore.step.step9 = false;
  router.push("/server/biketest/BiketestStepeight");
};
</script>

<style scoped>
.el-form-item--large {
  --font-size: 23px;
}
</style>
