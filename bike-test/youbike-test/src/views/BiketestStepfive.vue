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
            <el-tooltip
              class="box-item"
              effect="dark"
              content="含座管束子"
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
          <div class="col-12 mb-1">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="100%面積嚴重生鏽"
              placement="top-start"
            >
              <el-icon size="20" color="#ADADAD"><QuestionFilled /></el-icon>
            </el-tooltip>
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
            <el-tooltip
              class="box-item"
              effect="dark"
              content="文字無法傳達完整訊息"
              placement="top-start"
            >
              <el-icon size="20" color="#ADADAD"><QuestionFilled /></el-icon>
            </el-tooltip>
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
          <div class="col-12 mb-1">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="包含無車鈴、缺任一零部件導致無法旋轉車鈴、轉動無聲響"
            >
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
          <div class="col-12 mb-1">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="嚴重髒汙、磨損、破損、不易辨識"
            >
              <el-icon size="20" color="#ADADAD"><QuestionFilled /></el-icon>
            </el-tooltip>
            <el-form-item :label="ruleFormAll.checkdata[12].title">
              <el-checkbox-group v-model="ruleFormAll.checkdata[12].ischeck">
                <el-checkbox
                  v-for="i in ruleFormAll.checkdata[12].value"
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
const ruleFormAll = ref<BiketestStepFive>({
  catequery: "1.0",
  checkdata: [
    //1.0
    {
      title: "座墊",
      ischeck: [],
      value: ["破損、龜裂、膠布修補、座墊與底座分離", "髒汙"],
    },
    {
      title: "座管束子貼紙",
      ischeck: [],
      value: ["破損、龜裂、褪色、翹起、脫落"],
    },
    {
      title: "座墊高低調整",
      ischeck: [],
      value: [
        "高度調整不順",
        "束子鎖死",
        "束子歪斜",
        "束子固定後座墊仍可移動(假性鎖死)",
        "束子脫落",
        "調整導致手髒汙",
        "束子磨耗產生銳角，有割傷之慮",
      ],
    },
    {
      title: "輪胎",
      ischeck: [],
      value: [
        "胎紋磨損 平滑、龜裂、反光帶脫落",
        "輪框變形、缺鋼絲",
        "前後輪偏擺",
      ],
    },
    {
      title: "前後輪軸螺絲",
      ischeck: [],
      value: ["前", "後"],
    },
    ///2.0
    {
      title: "座管束子貼紙",
      ischeck: [],
      value: ["文字無法傳達完整訊息"],
    },
    {
      title: "座墊",
      ischeck: [],
      value: [
        "拉高後搖晃",
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

    //2.0E
    {
      title: "把手貼紙",
      ischeck: [],
      value: ["左 騎乘前檢查", "右 煞車提醒"],
    },
    {
      title: "把手套",
      ischeck: [],
      value: ["黏潮、紋路磨損、破損", "髒汙  致無法使用"],
    },
    {
      title: "車鈴",
      ischeck: [],
      value: ["無法發出鈴聲", "貼紙文字無法傳達完整訊息"],
    },
    {
      title: "車體外觀",
      ischeck: [],
      value: [
        "車架 髒汙／小廣告／塗鴉",
        "車架  掉漆",
        "前、後泥除  髒污／破損",
      ],
    },
    {
      title: "後泥除貼紙",
      ischeck: [],
      value: ["廣告", "YouBike Logo", "車號", "電池"],
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
import type { BiketestStepFive } from "env";
const teststore = useBiketest();

onMounted(() => {
  //至頂
  scrollToTop();
  //判斷有沒有該網站step 沒有就踢掉
  if (!teststore.step.step5) {
    router.push("/server/biketest/BiketestStepfour");
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
    ruleFormAll.value.checkdata[0]["ischeck"] = teststore.testfrom1.座墊
      ?.ischeck as [];
    ruleFormAll.value.checkdata[1]["ischeck"] = teststore.testfrom1.座管束子貼紙
      ?.ischeck as [];
    ruleFormAll.value.checkdata[2]["ischeck"] = teststore.testfrom1.座墊高低調整
      ?.ischeck as [];
    ruleFormAll.value.checkdata[3]["ischeck"] = teststore.testfrom1.輪胎
      ?.ischeck as [];
    ruleFormAll.value.checkdata[4]["ischeck"] = teststore.testfrom1[
      "前後輪軸螺絲"
    ]?.ischeck as [];
  } else if (nowSys === "2.0") {
    console.log("現在系統是2.0,賦予資料中...");
    ruleFormAll.value.checkdata[5]["ischeck"] = teststore.testfrom2.座管束子貼紙
      ?.ischeck as [];
    ruleFormAll.value.checkdata[6]["ischeck"] = teststore.testfrom2.座墊
      ?.ischeck as [];
    ruleFormAll.value.checkdata[7]["ischeck"] = teststore.testfrom2.座墊桿
      ?.ischeck as [];
  } else if (nowSys === "2.0E") {
    console.log("現在系統是2.0E,賦予資料中...");
    ruleFormAll.value.checkdata[8]["ischeck"] = teststore.testfrom3.把手貼紙
      ?.ischeck as [];
    ruleFormAll.value.checkdata[9]["ischeck"] = teststore.testfrom3.把手套
      ?.ischeck as [];
    ruleFormAll.value.checkdata[10]["ischeck"] = teststore.testfrom3.車鈴
      ?.ischeck as [];
    ruleFormAll.value.checkdata[11]["ischeck"] = teststore.testfrom3.車體外觀
      ?.ischeck as [];
    ruleFormAll.value.checkdata[12]["ischeck"] = teststore.testfrom3.後泥除貼紙
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
      teststore.testfrom1.座墊 = ruleFormAll.value.checkdata[0];
      teststore.testfrom1.座管束子貼紙 = ruleFormAll.value.checkdata[1];
      teststore.testfrom1.座墊高低調整 = ruleFormAll.value.checkdata[2];
      teststore.testfrom1.輪胎 = ruleFormAll.value.checkdata[3];
      teststore.testfrom1["前後輪軸螺絲"] = ruleFormAll.value.checkdata[4];
      console.log("送出1.0");
    } else if (ruleFormAll.value.catequery === "2.0") {
      //表單
      teststore.testfrom2.座管束子貼紙 = ruleFormAll.value.checkdata[5];
      teststore.testfrom2.座墊 = ruleFormAll.value.checkdata[6];
      teststore.testfrom2.座墊桿 = ruleFormAll.value.checkdata[7];
      console.log("送出2.0");
    } else {
      //表單
      teststore.testfrom3.把手貼紙 = ruleFormAll.value.checkdata[8];
      teststore.testfrom3.把手套 = ruleFormAll.value.checkdata[9];
      teststore.testfrom3.車鈴 = ruleFormAll.value.checkdata[10];
      teststore.testfrom3.車體外觀 = ruleFormAll.value.checkdata[11];
      teststore.testfrom3.後泥除貼紙 = ruleFormAll.value.checkdata[12];
      console.log("送出2.0E");
    }

    //第六頁權限開啟
    teststore.step.step6 = true;
    router.push("/server/biketest/BiketestStepsix");
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
  teststore.step.step5 = false;
  router.push("/server/biketest/BiketestStepfour");
};
</script>

<style scoped>
.el-form-item--large {
  --font-size: 23px;
}
</style>
