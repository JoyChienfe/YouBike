<template>
  <div class="container-fluid">
    <p class="fs-1 mb-2 text-center">模擬體驗</p>
    <!-- <Progress :schedule="50" class="mb-3" /> -->
    <el-form
      label-width="120px"
      size="large"
      label-position="top"
      :model="ruleFormAll"
      ref="formRefAll"
    >
      <div class="row">
        <template v-if="ruleFormAll.catequery === '1.0'">
          <div class="col-12 mb-1">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="嚴重髒汙、磨損、破損、不易辨識"
              placement="top-start"
            >
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
              content="嚴重髒汙、磨損、破損、不易辨識"
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
            <el-tooltip
              class="box-item"
              effect="dark"
              content="破損、龜裂、褪色、脫落"
              placement="top-start"
            >
              <el-icon size="20" color="#ADADAD"><QuestionFilled /></el-icon>
            </el-tooltip>
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
          <div class="col-12 mb-1">
            <el-form-item :label="ruleFormAll.checkdata[3].title">
              <el-checkbox-group v-model="ruleFormAll.checkdata[3].ischeck">
                <el-checkbox
                  v-for="i in ruleFormAll.checkdata[3].value"
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
        <template v-else-if="ruleFormAll.catequery === '2.0'">
          <div class="col-12 mb-1">
            <el-form-item :label="ruleFormAll.checkdata[4].title">
              <el-checkbox-group v-model="ruleFormAll.checkdata[4].ischeck">
                <el-checkbox
                  v-for="i in ruleFormAll.checkdata[4].value"
                  :key="i"
                  :label="i"
                  :name="i"
                />
              </el-checkbox-group>
            </el-form-item>
          </div>
          <div class="col-12 mb-1">
            <el-tooltip class="box-item" effect="dark" placement="top-start">
              <template #content>
                車機異常 : 當完成借、還車流程後， 車機文字顯示<br />
                借車成功車 → 拉不出車柱<br />
                還車成功車 → 未鎖在車柱
              </template>
              <el-icon size="20" color="#ADADAD"><QuestionFilled /></el-icon>
            </el-tooltip>
            <el-form-item :label="ruleFormAll.checkdata[5].title">
              <el-checkbox-group v-model="ruleFormAll.checkdata[5].ischeck">
                <el-checkbox
                  v-for="i in ruleFormAll.checkdata[5].value"
                  :key="i"
                  :label="i"
                  :name="i"
                />
              </el-checkbox-group>
            </el-form-item>
          </div>
          <div class="col-12 mb-1">
            <el-form-item :label="ruleFormAll.checkdata[6].title">
              <el-checkbox-group v-model="ruleFormAll.checkdata[6].ischeck">
                <el-checkbox
                  v-for="i in ruleFormAll.checkdata[6].value"
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
              content="破損、龜裂、褪色、脫落"
              placement="top-start"
            >
              <el-icon size="20" color="#ADADAD"><QuestionFilled /></el-icon>
            </el-tooltip>
            <el-form-item :label="ruleFormAll.checkdata[7].title">
              <el-checkbox-group v-model="ruleFormAll.checkdata[7].ischeck">
                <el-checkbox
                  v-for="i in ruleFormAll.checkdata[7].value"
                  :key="i"
                  :label="i"
                  :name="i"
                />
              </el-checkbox-group>
            </el-form-item>
          </div>

          <div class="col-12 mb-1">
            <el-form-item :label="ruleFormAll.checkdata[8].title">
              <el-checkbox-group v-model="ruleFormAll.checkdata[8].ischeck">
                <el-checkbox
                  v-for="i in ruleFormAll.checkdata[8].value"
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
        <template v-else-if="ruleFormAll.catequery === '2.0E'">
          <div class="col-12 mb-1">
            <el-form-item :label="ruleFormAll.checkdata[9].title">
              <el-checkbox-group v-model="ruleFormAll.checkdata[9].ischeck">
                <el-checkbox
                  v-for="i in ruleFormAll.checkdata[9].value"
                  :key="i"
                  :label="i"
                  :name="i"
                />
              </el-checkbox-group>
            </el-form-item>
          </div>
          <div class="col-12 mb-1">
            <el-tooltip class="box-item" effect="dark" placement="top-start">
              <template #content>
                車機異常 : 當完成借、還車流程後， 車機文字顯示<br />
                借車成功車 → 拉不出車柱<br />
                還車成功車 → 未鎖在車柱
              </template>
              <el-icon size="20" color="#ADADAD"><QuestionFilled /></el-icon>
            </el-tooltip>
            <el-form-item :label="ruleFormAll.checkdata[10].title">
              <el-checkbox-group v-model="ruleFormAll.checkdata[10].ischeck">
                <el-checkbox
                  v-for="i in ruleFormAll.checkdata[10].value"
                  :key="i"
                  :label="i"
                  :name="i"
                />
              </el-checkbox-group>
            </el-form-item>
          </div>

          <div class="col-12 mb-1">
            <el-form-item :label="ruleFormAll.checkdata[11].title">
              <el-checkbox-group v-model="ruleFormAll.checkdata[11].ischeck">
                <el-checkbox
                  v-for="i in ruleFormAll.checkdata[11].value"
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

//至頂
const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 使用平滑滚动
  });
};

import { useBiketest } from "../stores/bikestest";
import type { BiketestStepThree } from "env";
const teststore = useBiketest();

onMounted(() => {
  //至頂
  scrollToTop();
  //判斷有沒有該網站step 沒有就踢掉
  if (!teststore.step.step3) {
    router.push("/server/biketest/BiketestSteptwo");
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

const formRefAll = ref<FormInstance>();
const ruleFormAll = ref<BiketestStepThree>({
  catequery: "1.0",
  checkdata: [
    //1.0
    {
      title: "車體外觀",
      ischeck: [],
      value: [
        "車架",
        "後泥除",
        "前叉",
        "前泥除",
        "車架市徽、車號",
        "張貼小廣告",
      ],
    },
    {
      title: "後泥除貼紙",
      ischeck: [],
      value: ["廣告", "YouBike Logo", "車號"],
    },
    {
      title: "置物籃貼紙",
      ischeck: [],
      value: ["前 車號、LOGO", "後 使用說明"],
    },
    {
      title: "置物籃",
      ischeck: [],
      value: [
        "嚴重髒汙、沾黏、褪色",
        "垃圾",
        "破損 2根以上／缺固定螺絲／裝設歪斜",
        "鉸線頭固定座　破損",
        "鉸線破損",
      ],
    },

    //2.0
    {
      title: "車機機殼",
      ischeck: [],
      value: [
        "髒污／塗鴉／小廣告／褪色",
        "破損／嚴重刮痕",
        "太陽能面板  產生氣泡",
      ],
    },
    {
      title: "車機功能",
      ischeck: [],
      value: [
        "借不出還不回／車機異常",
        "螢幕文字  無法正常顯示",
        "借、還車  無提示音、異常",
      ],
    },
    {
      title: "防轉彈簧／停車架",
      ischeck: [],
      value: ["彈簧脫落", "停車架起後，車輛無法站立"],
    },

    {
      title: "置物籃貼紙",
      ischeck: [],
      value: ["前 車號、LOGO", "後 使用說明"],
    },
    {
      title: "置物籃",
      ischeck: [],
      value: [
        "嚴重髒汙、沾黏",
        "垃圾",
        "破損 2根以上／缺固定螺絲／裝設歪斜",
        "鉸線頭固定座　上下皆破損",
        "鉸線破損／生鏽",
      ],
    },

    //2.0E
    {
      title: "車機機殼",
      ischeck: [],
      value: [
        "髒污／塗鴉／小廣告／褪色",
        "破損／嚴重刮痕",
        "太陽能面板  產生氣泡",
      ],
    },
    {
      title: "車機功能",
      ischeck: [],
      value: [
        "借不出還不回／車機異常",
        "螢幕文字  無法正常顯示",
        "借、還車  無提示音、異常",
      ],
    },
    {
      title: "防轉彈簧／停車架",
      ischeck: [],
      value: ["彈簧脫落", "停車架起後，車輛無法站立"],
    },
  ],
});

//抓pinia上面暫存的資料,用於保存頁面資料
const SetTempData = () => {
  const nowSys = teststore.systum;
  if (nowSys === "1.0") {
    console.log("現在系統是1.0,賦予資料中...");
    ruleFormAll.value.checkdata[0]["ischeck"] = teststore.testfrom1.車體外觀
      ?.ischeck as [];
    ruleFormAll.value.checkdata[1]["ischeck"] = teststore.testfrom1.後泥除貼紙
      ?.ischeck as [];
    ruleFormAll.value.checkdata[2]["ischeck"] = teststore.testfrom1.置物籃貼紙
      ?.ischeck as [];
    ruleFormAll.value.checkdata[3]["ischeck"] = teststore.testfrom1.置物籃
      ?.ischeck as [];

    // ]?.ischeck as [];
  } else if (nowSys === "2.0") {
    console.log("現在系統是2.0,賦予資料中...");
    ruleFormAll.value.checkdata[4]["ischeck"] = teststore.testfrom2.車機機殼
      ?.ischeck as [];
    ruleFormAll.value.checkdata[5]["ischeck"] = teststore.testfrom2.車機功能
      ?.ischeck as [];
    ruleFormAll.value.checkdata[6]["ischeck"] = teststore.testfrom2[
      "防轉彈簧／停車架"
    ]?.ischeck as [];
    ruleFormAll.value.checkdata[7]["ischeck"] = teststore.testfrom2.置物籃貼紙
      ?.ischeck as [];
    ruleFormAll.value.checkdata[8]["ischeck"] = teststore.testfrom2.置物籃
      ?.ischeck as [];
  } else if (nowSys === "2.0E") {
    console.log("現在系統是2.0E,賦予資料中...");
    ruleFormAll.value.checkdata[9]["ischeck"] = teststore.testfrom3.車機機殼
      ?.ischeck as [];
    ruleFormAll.value.checkdata[10]["ischeck"] = teststore.testfrom3.車機功能
      ?.ischeck as [];
    ruleFormAll.value.checkdata[11]["ischeck"] = teststore.testfrom3[
      "防轉彈簧／停車架"
    ]?.ischeck as [];
  } else {
    console.log("現在沒有系統");
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

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  try {
    await formEl.validate();

    if (ruleFormAll.value.catequery === "1.0") {
      teststore.testfrom1.車體外觀 = ruleFormAll.value.checkdata[0];
      teststore.testfrom1.後泥除貼紙 = ruleFormAll.value.checkdata[1];
      teststore.testfrom1.置物籃貼紙 = ruleFormAll.value.checkdata[2];
      teststore.testfrom1.置物籃 = ruleFormAll.value.checkdata[3];
    } else if (ruleFormAll.value.catequery === "2.0") {
      //表單
      teststore.testfrom2.車機機殼 = ruleFormAll.value.checkdata[4];
      teststore.testfrom2.車機功能 = ruleFormAll.value.checkdata[5];
      teststore.testfrom2["防轉彈簧／停車架"] = ruleFormAll.value.checkdata[6];
      teststore.testfrom2.置物籃貼紙 = ruleFormAll.value.checkdata[7];
      teststore.testfrom2.置物籃 = ruleFormAll.value.checkdata[8];
      console.log("送出2.0");
    } else {
      //表單
      teststore.testfrom3.車機機殼 = ruleFormAll.value.checkdata[9];
      teststore.testfrom3.車機功能 = ruleFormAll.value.checkdata[10];
      teststore.testfrom3["防轉彈簧／停車架"] = ruleFormAll.value.checkdata[11];
      console.log("送出2.0E");
    }

    //第四頁權限開啟
    teststore.step.step4 = true;
    router.push("/server/biketest/BiketestStepfour");
    console.log("表單驗證成功");
  } catch (error) {
    console.log("驗證失敗");
  }
};

//上一部
const next = () => {
  //第三頁權關閉
  teststore.step.step3 = false;
  router.push("/server/biketest/BiketestSteptwo");
};
</script>

<style scoped>
.el-form-item--large {
  --font-size: 23px;
}
</style>
