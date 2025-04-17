<template>
  <div class="container-fluid">
    <p class="fs-1 mb-2 text-center">模擬體驗</p>
    <!-- <Progress :schedule="75" class="mb-3" /> -->
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
              content="脫落、破損、不亮"
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
            <el-tooltip
              class="box-item"
              effect="dark"
              content="100%面積嚴重生鏽"
              placement="top-start"
            >
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
            <el-tooltip
              class="box-item"
              effect="dark"
              content="100%脫落、破損、不亮"
              placement="top-start"
            >
              <el-icon size="20" color="#ADADAD"><QuestionFilled /></el-icon>
            </el-tooltip>
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
const ruleFormAll = ref<BiketestStepSix>({
  catequery: "1.0",
  checkdata: [
    //1.0
    {
      title: "前／後燈",
      ischeck: [],
      value: ["前燈", "後燈", "前燈線　未妥善固定或絕緣膠翹起"],
    },
    {
      title: "煞車功能",
      ischeck: [],
      value: [
        "煞車過鬆",
        "煞車過緊",
        "黑色墊片歪斜、缺黑色墊片",
        "煞車異常",
        "異音",
      ],
    },
    {
      title: "變速功能",
      ischeck: [],
      value: [
        "指示蓋脫落、標示模糊",
        "換檔不順",
        "檔位無法定位／變速異常",
        "上蓋脫落",
      ],
    },
    {
      title: "隨車鎖",
      ischeck: [],
      value: ["無法插入、上鎖，上鎖後鑰匙無法拔出"],
    },

    ///2.0
    {
      title: "輪胎",
      ischeck: [],
      value: [
        "胎紋磨損 平滑、龜裂、反光帶脫落",
        "輪框變形、缺鋼絲",
        "前 或 後輪偏擺",
      ],
    },
    {
      title: "前後輪軸螺絲",
      ischeck: [],
      value: ["前", "後"],
    },
    {
      title: "前／後燈",
      ischeck: [],
      value: ["前燈", "後燈", "前燈線　未妥善固定或絕緣膠翹起"],
    },

    //2.0E
    {
      title: "座管束子貼紙",
      ischeck: [],
      value: ["文字無法傳達完整訊息"],
    },
    {
      title: "座墊",
      ischeck: [],
      value: [
        "搖晃",
        "歪斜",
        "與底部分離",
        "表面破損、龜裂",
        "髒汙導致無法騎乘",
      ],
    },
    {
      title: "座墊桿",
      ischeck: [],
      value: [
        "高度調整不順",
        "伸縮座墊桿鎖死 ( 無法調整高度 )",
        "黃色拉桿斷裂",
        "座墊桿滑落 無法固定",
        "反轉後無法固定位置",
        "座墊未在最底部就可反轉",
        "座墊桿與車體分離",
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
import type { BiketestStepSix } from "env";
const teststore = useBiketest();

onMounted(() => {
  //至頂
  scrollToTop();
  //判斷有沒有該網站step 沒有就踢掉
  if (!teststore.step.step6) {
    router.push("/server/biketest/BiketestStepfive");
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
    ruleFormAll.value.checkdata[0]["ischeck"] = teststore.testfrom1["前／後燈"]
      ?.ischeck as [];
    ruleFormAll.value.checkdata[1]["ischeck"] = teststore.testfrom1.煞車功能
      ?.ischeck as [];
    ruleFormAll.value.checkdata[2]["ischeck"] = teststore.testfrom1.變速功能
      ?.ischeck as [];
    ruleFormAll.value.checkdata[3]["ischeck"] = teststore.testfrom1.隨車鎖
      ?.ischeck as [];
  } else if (nowSys === "2.0") {
    console.log("現在系統是2.0,賦予資料中...");
    ruleFormAll.value.checkdata[4]["ischeck"] = teststore.testfrom2.輪胎
      ?.ischeck as [];
    ruleFormAll.value.checkdata[5]["ischeck"] = teststore.testfrom2.前後輪軸螺絲
      ?.ischeck as [];
    ruleFormAll.value.checkdata[6]["ischeck"] = teststore.testfrom2["前／後燈"]
      ?.ischeck as [];
  } else if (nowSys === "2.0E") {
    console.log("現在系統是2.0E,賦予資料中...");
    ruleFormAll.value.checkdata[7]["ischeck"] = teststore.testfrom3.座管束子貼紙
      ?.ischeck as [];
    ruleFormAll.value.checkdata[8]["ischeck"] = teststore.testfrom3.座墊
      ?.ischeck as [];
    ruleFormAll.value.checkdata[9]["ischeck"] = teststore.testfrom3.座墊桿
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
      teststore.testfrom1["前／後燈"] = ruleFormAll.value.checkdata[0];
      teststore.testfrom1.煞車功能 = ruleFormAll.value.checkdata[1];
      teststore.testfrom1.變速功能 = ruleFormAll.value.checkdata[2];
      teststore.testfrom1.隨車鎖 = ruleFormAll.value.checkdata[3];
    } else if (ruleFormAll.value.catequery === "2.0") {
      //表單
      teststore.testfrom2.輪胎 = ruleFormAll.value.checkdata[4];
      teststore.testfrom2.前後輪軸螺絲 = ruleFormAll.value.checkdata[5];
      teststore.testfrom2["前／後燈"] = ruleFormAll.value.checkdata[6];
      console.log("送出2.0");
    } else {
      //表單
      teststore.testfrom3.座管束子貼紙 = ruleFormAll.value.checkdata[7];
      teststore.testfrom3.座墊 = ruleFormAll.value.checkdata[8];
      teststore.testfrom3.座墊桿 = ruleFormAll.value.checkdata[9];

      console.log("送出2.0E");
    }

    //第七頁權限開啟
    teststore.step.step7 = true;
    router.push("/server/biketest/BiketestStepseven");
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
  teststore.step.step6 = false;
  router.push("/server/biketest/BiketestStepfive");
};
</script>

<style scoped>
.el-form-item--large {
  --font-size: 23px;
}
</style>
