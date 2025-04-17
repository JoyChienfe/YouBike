<template>
  <div class="container-fluid">
    <p class="fs-1 mb-2 text-center">模擬體驗</p>
    <!-- <Progress :schedule="25" class="mb-3" /> -->
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
        <template v-else-if="ruleFormAll.catequery === '2.0'">
          <div class="col-12 mb-1">
            <el-tooltip class="box-item" effect="dark" placement="top-start">
              <template #content>
                以柱為單位評估<br />
                髒汙 / 脫漆 / 鏽蝕 / 貼紙翹起<br />
              </template>
              <el-icon size="20" color="#ADADAD"><QuestionFilled /></el-icon>
            </el-tooltip>
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
            <el-tooltip class="box-item" effect="dark" placement="top-start">
              <template #content>
                面板破裂、異常／<br />
                貼紙歪斜致無法讀取／<br />
                無法傳達完整訊息<br />
              </template>
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
            <el-tooltip class="box-item" effect="dark" placement="top-start">
              <template #content>
                以柱為單位評估<br />
                髒汙 / 脫漆 / 鏽蝕 / 貼紙翹起<br />
              </template>
              <el-icon size="20" color="#ADADAD"><QuestionFilled /></el-icon>
            </el-tooltip>
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
            <el-tooltip class="box-item" effect="dark" placement="top-start">
              <template #content>
                面板破裂、異常／<br />
                貼紙歪斜致無法讀取／<br />
                無法傳達完整訊息<br />
              </template>
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
          <div class="row">
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
import type { BiketestStepTwo } from "env";
const teststore = useBiketest();

onMounted(() => {
  //至頂
  scrollToTop();
  //判斷有沒有該網站step 沒有就踢掉
  if (!teststore.step.step2) {
    router.push("/server/biketest/BiketestStepone");
  }

  //判斷是什麼系統,顯示該系統表單
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
const ruleFormAll = ref<BiketestStepTwo>({
  catequery: "1.0",
  checkdata: [
    {
      title: "車柱",
      ischeck: [],
      value: [
        "借、還車不順",
        "搖晃",
        "控制器燈號　輕觸即變換",
        "鎖體　生鏽",
        "車柱靠卡　無提示音",
      ],
    },
    {
      title: "停車柱貼紙／基板宣導貼紙",
      ischeck: [],
      value: ["龜裂、褪色、脫落、翹起、歪斜"],
    },
    {
      title: "還車導引槽",
      ischeck: [],
      value: ["漏裝", "鬆動"],
    },

    {
      title: "車柱 周遭環境",
      ischeck: [],
      value: ["車柱貼紙", "基板", "垃圾"],
    },
    {
      title: "車柱 外觀檢查",
      ischeck: [],
      value: [
        "柱號貼紙",
        "站名貼紙文字",
        "太陽能面板  破裂 / 異常",
        "太陽能面板  水氣",
        "鎖體  面積10%生鏽",
      ],
    },
    {
      title: "車柱 功能檢查",
      ischeck: [],
      value: ["面板左下方燈光 未亮起", "搖晃", "借還車不順"],
    },
    {
      title: "還車導引槽",
      ischeck: [],
      value: ["缺漏", "鬆動"],
    },
  ],
});

//抓pinia上面暫存的資料,用於保存頁面資料
const SetTempData = () => {
  const nowSys = teststore.systum;
  if (nowSys === "1.0") {
    console.log("現在系統是1.0,賦予資料中...");
    ruleFormAll.value.checkdata[0]["ischeck"] = teststore.testfrom1.車柱
      ?.ischeck as [];
    ruleFormAll.value.checkdata[1]["ischeck"] = teststore.testfrom1[
      "停車柱貼紙／基板宣導貼紙"
    ]?.ischeck as [];
    ruleFormAll.value.checkdata[2]["ischeck"] = teststore.testfrom1.還車導引槽
      ?.ischeck as [];
  } else if (nowSys === "2.0") {
    console.log("現在系統是2.0,賦予資料中...");
    ruleFormAll.value.checkdata[3]["ischeck"] = teststore.testfrom2[
      "車柱 周遭環境"
    ]?.ischeck as [];
    ruleFormAll.value.checkdata[4]["ischeck"] = teststore.testfrom2[
      "車柱 外觀檢查"
    ]?.ischeck as [];
    ruleFormAll.value.checkdata[5]["ischeck"] = teststore.testfrom2[
      "車柱 功能檢查"
    ]?.ischeck as [];
    ruleFormAll.value.checkdata[6]["ischeck"] = teststore.testfrom2.還車導引槽
      ?.ischeck as [];
  } else if (nowSys === "2.0E") {
    console.log("現在系統是2.0E,賦予資料中...");
    ruleFormAll.value.checkdata[3]["ischeck"] = teststore.testfrom3[
      "車柱 周遭環境"
    ]?.ischeck as [];
    ruleFormAll.value.checkdata[4]["ischeck"] = teststore.testfrom3[
      "車柱 外觀檢查"
    ]?.ischeck as [];
    ruleFormAll.value.checkdata[5]["ischeck"] = teststore.testfrom3[
      "車柱 功能檢查"
    ]?.ischeck as [];
    ruleFormAll.value.checkdata[6]["ischeck"] = teststore.testfrom3.還車導引槽
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
      teststore.testfrom1.車柱 = ruleFormAll.value.checkdata[0];
      teststore.testfrom1["停車柱貼紙／基板宣導貼紙"] =
        ruleFormAll.value.checkdata[1];
      teststore.testfrom1.還車導引槽 = ruleFormAll.value.checkdata[2];
      console.log("送出1.0");
    } else if (ruleFormAll.value.catequery === "2.0") {
      //表單
      teststore.testfrom2["車柱 周遭環境"] = ruleFormAll.value.checkdata[3];
      teststore.testfrom2["車柱 外觀檢查"] = ruleFormAll.value.checkdata[4];
      teststore.testfrom2["車柱 功能檢查"] = ruleFormAll.value.checkdata[5];
      teststore.testfrom2.還車導引槽 = ruleFormAll.value.checkdata[6];
      console.log("送出2.0");
    } else {
      //表單
      teststore.testfrom3["車柱 周遭環境"] = ruleFormAll.value.checkdata[3];
      teststore.testfrom3["車柱 外觀檢查"] = ruleFormAll.value.checkdata[4];
      teststore.testfrom3["車柱 功能檢查"] = ruleFormAll.value.checkdata[5];
      teststore.testfrom3.還車導引槽 = ruleFormAll.value.checkdata[6];
      //表單
      console.log("送出2.0E");
    }
    //第三頁權限開啟
    teststore.step.step3 = true;
    router.push("/server/biketest/BiketestStepthree");
    console.log("表單驗證成功");
  } catch (error) {
    console.log("驗證失敗");
  }
};

//上一步
const next = () => {
  //先清空第二頁權限
  teststore.step.step2 = false;
  //導到第一頁
  router.push("/server/biketest/BiketestStepone");
};
</script>

<style scoped>
.el-form-item--large {
  --font-size: 23px;
}
</style>
