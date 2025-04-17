<template>
  <div class="container-fluid">
    <p class="fs-1 mb-2 text-center">車輛檢驗</p>

    <!-- <Progress :schedule="0" class="mb-3" /> -->
    <el-form
      label-width="120px"
      size="large"
      label-position="top"
      :model="ruleFormAll"
      ref="formRefAll"
      :rules="rulesAll"
    >
      <div class="row">
        <div class="col-12 mb-1">
          <el-form-item label="場站名稱" prop="name">
            <el-select
              placeholder="請選擇場站"
              class="col-12"
              v-model="ruleFormAll.name"
            >
              <el-option
                :label="i"
                :value="i"
                v-for="i in UseStationAll"
                :key="i"
              />
            </el-select>
          </el-form-item>
        </div>

        <div class="col-12 mb-1">
          <el-form-item label="車種別" prop="catequery">
            <el-select
              :disabled="ruleFormAll.name === ''"
              class="col-12"
              v-model="ruleFormAll.catequery"
              @change="clearFrom"
            >
              <template
                v-if="ruleFormAll.name !== '' && catequeryOption[0] === '1.0'"
              >
                <el-option label="1.0" value="1.0" />
              </template>
              <template v-else>
                <el-option label="2.0" value="2.0" />
                <el-option label="2.0E" value="2.0E" />
              </template>
            </el-select>
          </el-form-item>
        </div>
        <template v-if="ruleFormAll.catequery === '1.0'">
          <div class="col-12 mb-1">
            <el-form-item label="車號" prop="carnum">
              <el-input placeholder="請輸入車號" v-model="ruleFormAll.carnum" />
            </el-form-item>
          </div>
          <div class="col-12 mb-1">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="1-1 →011，22-1 →221"
              placement="top-start"
            >
              <el-icon size="20" color="#ADADAD"><QuestionFilled /></el-icon>
            </el-tooltip>
            <el-form-item label="車柱柱號" prop="carnum2">
              <el-input
                placeholder="請輸入車柱柱號"
                v-model="ruleFormAll.carnum2"
                type="number"
                inputmode="numeric"
              />
            </el-form-item>
          </div>
          <div class="col-12 mb-1">
            <el-form-item label="一級檢修日期">
              <el-date-picker
                v-model="ruleFormAll.date"
                style="width: 100%"
                type="date"
                placeholder="請選擇日期"
              />
            </el-form-item>
          </div>
          <div class="col-12 mb-1">
            <el-form-item label="一級檢修人員">
              <el-input
                placeholder="請輸入一級檢修人員"
                v-model="ruleFormAll.testman"
              />
            </el-form-item>
          </div>
          <div class="col-12 mb-1">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="勾選應拍照上傳"
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
        </template>
        <template v-else-if="ruleFormAll.catequery === '2.0'">
          <div class="col-12 mb-1">
            <el-form-item label="車號" prop="carnum">
              <el-input v-model="ruleFormAll.carnum" placeholder="請輸入車號" />
            </el-form-item>
          </div>
          <div class="col-12 mb-1">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="01 →01，21 →21"
              placement="top-start"
            >
              <el-icon size="20" color="#ADADAD"><QuestionFilled /></el-icon>
            </el-tooltip>
            <el-form-item label="車柱柱號" prop="carnum2">
              <el-input
                placeholder="請輸入車柱柱號"
                v-model="ruleFormAll.carnum2"
                type="number"
                inputmode="numeric"
              />
            </el-form-item>
          </div>
          <div class="col-12 mb-1">
            <el-form-item label="一級檢修日期">
              <el-date-picker
                v-model="ruleFormAll.date"
                style="width: 100%"
                type="date"
                placeholder="請選擇日期"
              />
            </el-form-item>
          </div>
          <div class="col-12 mb-1">
            <el-form-item label="一級檢修人員">
              <el-input
                placeholder="請輸入一級檢修人員"
                v-model="ruleFormAll.testman"
              />
            </el-form-item>
          </div>
          <div class="col-12 mb-1">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="勾選應拍照上傳"
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
        </template>
        <template v-else-if="ruleFormAll.catequery === '2.0E'">
          <div class="col-12 mb-1">
            <el-form-item label="車號" prop="carnum">
              <el-input v-model="ruleFormAll.carnum" placeholder="請輸入車號" />
            </el-form-item>
          </div>
          <div class="col-12 mb-1">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="01 →01，21 →21"
              placement="top-start"
            >
              <el-icon size="20" color="#ADADAD"><QuestionFilled /></el-icon>
            </el-tooltip>
            <el-form-item label="車柱柱號" prop="carnum2">
              <el-input
                placeholder="請輸入車柱柱號"
                v-model="ruleFormAll.carnum2"
                type="number"
                inputmode="numeric"
              />
            </el-form-item>
          </div>
          <div class="col-12 mb-1">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="無顯示電量、異常顯示填0"
              placement="top-start"
            >
              <el-icon size="20" color="#ADADAD"><QuestionFilled /></el-icon>
            </el-tooltip>
            <el-alert
              title="輸入電量低於15請拍照"
              type="warning "
              :closable="false"
              class="my-1"
            />

            <el-form-item label="可用電量" prop="canusec">
              <el-input
                :min="0"
                :max="100"
                placeholder="請輸入可用電量"
                v-model.number="ruleFormAll.canusec"
                type="number"
                inputmode="numeric"
              />
            </el-form-item>
          </div>
          <div class="col-12 mb-1">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="借出即持續顯示電量至臨停或歸還"
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
            <el-form-item label="一級檢修日期">
              <el-date-picker
                v-model="ruleFormAll.date"
                style="width: 100%"
                type="date"
                placeholder="請選擇日期"
              />
            </el-form-item>
          </div>
          <div class="col-12 mb-1">
            <el-form-item label="一級檢修人員">
              <el-input
                placeholder="請輸入一級檢修人員"
                v-model="ruleFormAll.testman"
              />
            </el-form-item>
          </div>
          <div class="col-12 mb-1">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="勾選應拍照上傳"
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
        </template>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
import { ref, watch, onMounted } from "vue";
import axios from "axios";
// const swal = inject("$swal") as any;

// async function TimeSubmitAlert() {
//   let timerInterval: number | undefined;
//   await swal({
//     icon: "success",
//     title: "表單送出成功",
//     html: "將導到拍照頁面...",
//     timer: 2500,
//     timerProgressBar: true,
//     didOpen: () => {
//       swal.showLoading();
//       swal.getPopup().querySelector("b");
//     },
//     willClose: () => {
//       clearInterval(timerInterval);
//     },
//   });
// }

//至頂
const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 使用平滑滚动
  });
};

const NowNum = ref();

//判斷是否為今天日期
const isNowDay = (date: string) => {
  // 取得當前日期時間
  const currentDate = new Date();

  // 解析要比較的日期時間（假設日期時間字符串的格式為 'YYYY-MM-DD HH:mm:ss'）
  const targetDateTimeString = date;
  const targetDate = new Date(targetDateTimeString);
  // 判斷兩個日期是否屬於同一天
  const isToday =
    currentDate.getFullYear() === targetDate.getFullYear() &&
    currentDate.getMonth() === targetDate.getMonth() &&
    currentDate.getDate() === targetDate.getDate();
  if (isToday) {
    return true;
  } else {
    return false;
  }
};

// let StationData: { station_name: string; test_date: string }[] = [];
interface StationNameData {
  station_name: string;
  test_date: string;
  sys: string;
}

const UseStationAll = ref([""]);
//抓取場站資料
import { useAuth } from "../stores/auth";
const store = useAuth();
const getStationName = async () => {
  const { account } = store.getUserid();
  const url1 = `${import.meta.env.VITE_URL}/station/station1?id=${account}`;
  const url2 = `${import.meta.env.VITE_URL}/station/station2?id=${account}`;
  try {
    const res = await Promise.all([axios.get(url1), axios.get(url2)]);
    const data1: StationNameData[] = res[0].data.data;
    const data2: StationNameData[] = res[1].data.data;
    // StationData = [...data1, ...data2];

    const Station1: string[] = data1
      .filter((items) => isNowDay(items.test_date))
      .map((item) => `${item.station_name}-${item.sys}`);
    const Station2: string[] = data2
      .filter((items) => isNowDay(items.test_date))
      .map((item) => `${item.station_name}-${item.sys}`);
    const totalStation = [...Station1, ...Station2];
    // console.log(totalStation);
    //抓到只有今天做的場站名稱,並且過去相同名稱
    UseStationAll.value = [...new Set(totalStation)];
    // console.log(UseStationAll.value);
    // console.log(Station1, Station2);
  } catch (error) {
    console.log(error);
  }
};

//判斷是否為今天
function isToday(dateString: string | undefined): boolean {
  if (!dateString) {
    return false;
  }
  // 將日期字串轉換成 Date 物件
  const date = new Date(dateString);

  // 取得今天的日期
  const today = new Date();

  // 比較年、月、日是否相同
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

const { account } = store.getUserid();
//抓當日已經做過的場站資料
async function getNowBikeTestNum() {
  const url = `${import.meta.env.VITE_URL}/biketest/biketest?id=${account}`;
  const res = await axios(url);
  const resData: Testfrom1[] | Testfrom2[] | Testfrom3[] = res.data.data;
  //取的今天日期 xxxx-xx-xx的資料
  const NowDataData = resData.filter((item: Testfrom1) =>
    isToday(item?.test_date?.split(" ")[0])
  );
  const NowBikeTestNum = NowDataData.map((item: Testfrom1) => item.carnum);
  //今天所做過的車號
  return NowBikeTestNum;
}

//抓場站資料
import { useBiketest } from "../stores/bikestest";
import type { BiketestStepAll, Testfrom1, Testfrom2, Testfrom3 } from "env";
const teststore = useBiketest();
//抓pinia上面暫存的資料,用於保存頁面資料
const SetTempData = () => {
  const nowSys = teststore.systum;

  if (nowSys === "1.0") {
    console.log("現在系統是1.0,賦予資料中...");
    ruleFormAll.value.catequery = teststore.testfrom1.catequery as string;
    ruleFormAll.value.name = teststore.testfrom1.station_name as string;
    ruleFormAll.value.carnum = teststore.testfrom1.carnum as string;
    ruleFormAll.value.carnum2 = teststore.testfrom1.carnum2 as string;
    ruleFormAll.value.date = teststore.testfrom1.date as string;
    ruleFormAll.value.testman = teststore.testfrom1.testman as string;
    ruleFormAll.value.checkdata[1]["ischeck"] = teststore.testfrom1.一級檢修貼紙
      ?.ischeck as [];
  } else if (nowSys === "2.0") {
    console.log("現在系統是2.0,賦予資料中...");
    ruleFormAll.value.catequery = teststore.testfrom2.catequery as string;
    ruleFormAll.value.name = teststore.testfrom2.station_name as string;
    ruleFormAll.value.carnum = teststore.testfrom2.carnum as string;
    ruleFormAll.value.carnum2 = teststore.testfrom2.carnum2 as string;
    ruleFormAll.value.date = teststore.testfrom2.date as string;
    ruleFormAll.value.testman = teststore.testfrom2.testman as string;
    ruleFormAll.value.checkdata[1]["ischeck"] = teststore.testfrom2.一級檢修貼紙
      ?.ischeck as [];
  } else if (nowSys === "2.0E") {
    console.log("teststore.testfrom3.catequery", teststore.testfrom3.catequery);
    console.log("現在系統是2.0E,賦予資料中...");
    ruleFormAll.value.catequery = teststore.testfrom3.catequery as string;
    ruleFormAll.value.name = teststore.testfrom3.station_name as string;
    ruleFormAll.value.carnum = teststore.testfrom3.carnum as string;
    ruleFormAll.value.carnum2 = teststore.testfrom3.carnum2 as string;
    ruleFormAll.value.canusec = teststore.testfrom3.canusec as number;
    ruleFormAll.value.checkdata[0]["ischeck"] = teststore.testfrom3.電量
      ?.ischeck as [];
    ruleFormAll.value.date = teststore.testfrom3.date as string;
    ruleFormAll.value.testman = teststore.testfrom3.testman as string;
    ruleFormAll.value.checkdata[1]["ischeck"] = teststore.testfrom3.一級檢修貼紙
      ?.ischeck as [];

    console.log("ruleFormAll.value.catequery", ruleFormAll.value.catequery);
  } else {
    console.log("現在沒有系統");
  }
};

(async () => {
  // await TimeSubmitAlert();
  //抓已做的場站檢驗資料
  await getStationName();

  //當日所有的模擬體驗車號,為了不能重複
  NowNum.value = [...(await getNowBikeTestNum())];

  scrollToTop();

  SetTempData();
})();

const formRefAll = ref<FormInstance>();
const ruleFormAll = ref<BiketestStepAll>({
  name: "",
  catequery: "",
  carnum: "",
  carnum2: "",
  date: "",
  testman: "",
  canusec: null,
  checkdata: [
    {
      title: "電量",
      ischeck: [],
      value: ["無顯示/未持續顯示"],
    },
    {
      title: "一級檢修貼紙",
      ischeck: [],
      value: ["無貼紙／無法辨識／資訊不完整", "未撕除舊貼紙"],
    },
    {
      title: "一級檢修貼紙",
      ischeck: [],
      value: ["無貼紙", "無法辨識／資訊不完整", "未撕除舊貼紙"],
    },
  ],
});

const catequeryOption = ref<string[]>([]);
watch(
  () => ruleFormAll.value.name,
  () => {
    ruleFormAll.value.catequery = "";
    const length = ruleFormAll.value.name.split("-").length;

    if (ruleFormAll.value.name) {
      if (
        ruleFormAll.value.name.split("-")[length - 1] === "2.0+2.0E" ||
        ruleFormAll.value.name.split("-")[length - 1] === "2.0+2.0e"
      ) {
        catequeryOption.value = ["2.0", "2.0E"];
      } else {
        catequeryOption.value = ["1.0"];
      }
    }
  }
);

const validatePasscarnum = (rule: any, value: string, callback: any) => {
  if (ruleFormAll.value.catequery === "1.0") {
    const str = /^[HFK]\d{5}$/;
    if (!str.test(value)) {
      callback(new Error("請輸入區碼＋５碼車號"));
    } else {
      callback();
    }
  } else {
    const str = /^\d{7}$/;
    if (!str.test(value)) {
      callback(new Error("請輸入7碼車號"));
    } else if (
      ruleFormAll.value.catequery === "2.0" &&
      (value.charAt(2) === "6" || value.charAt(2) === "9")
    ) {
      callback(new Error("2.0第三碼不能為6或9"));
    } else if (
      ruleFormAll.value.catequery === "2.0E" &&
      value.charAt(2) !== "6" &&
      value.charAt(2) !== "9"
    ) {
      callback(new Error("2.0E第三碼必須為6或9"));
    } else {
      callback();
    }
  }
};

const route = useRoute();
// console.log(route.path);
//如果車種別有改動就清空表單, 還有pinia全域資料
const clearFrom = () => {
  // if (route.path === "/server/biketest/BiketestStepone") {
  //   ruleFormAll.value["carnum"] = "";
  //   ruleFormAll.value["carnum2"] = "";
  //   ruleFormAll.value["date"] = "";
  //   ruleFormAll.value["carnum"] = "";
  //   ruleFormAll.value["canusec"] = null;
  //   ruleFormAll.value["testman"] = "";
  //   ruleFormAll.value["checkdata"] = [
  //     {
  //       title: "電量",
  //       ischeck: [],
  //       value: ["無顯示/未持續顯示"],
  //     },
  //     {
  //       title: "一級檢修貼紙",
  //       ischeck: [],
  //       value: ["無貼紙／無法辨識／資訊不完整", "未撕除舊貼紙"],
  //     },
  //     {
  //       title: "一級檢修貼紙",
  //       ischeck: [],
  //       value: ["無貼紙", "無法辨識／資訊不完整", "未撕除舊貼紙"],
  //     },
  //   ];
  //   //清空表單
  //   teststore.clearfrom();
  //   //清空權限
  //   teststore.clearstep();
  // }
};

const validatePasscarnum2 = (rule: any, value: string, callback: any) => {
  if (ruleFormAll.value.catequery === "1.0") {
    const regex = /^\d{2}[1-2]$/;
    const isValid = regex.test(value);
    if (!isValid) {
      callback(new Error("請輸入３碼柱號，末位為１或２"));
    } else {
      return callback();
    }
  } else {
    const regex = /^\d{2}$/;
    const isValid = regex.test(value);
    if (!isValid) {
      callback(new Error("請輸入末２碼柱號"));
    } else {
      callback();
    }
  }
};

const validatePasscarnum3 = (rule: any, value: string, callback: any) => {
  if (NowNum.value.includes(value)) {
    callback(new Error("此車號為今日已檢驗車號"));
  } else {
    callback();
  }
};

const validatePasscarnum4 = (rule: any, value: number, callback: any) => {
  if (value < 0 || value > 100) {
    callback(new Error("電量必須為0~100"));
  } else {
    callback();
  }
};

//表單驗證
const rulesAll = ref<FormRules<BiketestStepAll>>({
  name: [{ required: true, message: "場站名稱不能為空", trigger: "blur" }],
  catequery: [{ required: true, message: "車種別不能為空", trigger: "blur" }],
  carnum: [
    { required: true, message: "車號不能為空", trigger: "blur" },
    { validator: validatePasscarnum, trigger: "blur" },
    { validator: validatePasscarnum3, trigger: "blur" },
  ],
  carnum2: [
    { required: true, message: "車柱柱號不能為空", trigger: "blur" },
    { validator: validatePasscarnum2, trigger: "blur" },
  ],
  canusec: [
    { required: true, message: "可用電量不能為空", trigger: "blur" },
    { validator: validatePasscarnum4, trigger: "blur" },
    // { min: 0, max: 100, message: "必須為0~100", trigger: "blur" },
  ],
});

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

// import { useBiketest } from '../stores/bikestest';
// const teststore = useBiketest();
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  try {
    await formEl.validate();

    if (ruleFormAll.value.catequery === "1.0") {
      //中央系統
      teststore.systum = ruleFormAll.value.catequery;
      // console.log(ruleFormAll.value.name.split("-").pop());
      //表單

      teststore.testfrom1.station_name = ruleFormAll.value.name;
      teststore.testfrom1.catequery = ruleFormAll.value.catequery;
      teststore.testfrom1.carnum = ruleFormAll.value.carnum;
      teststore.testfrom1.carnum2 = ruleFormAll.value.carnum2;
      teststore.testfrom1.date = ruleFormAll.value.date;
      teststore.testfrom1.testman = ruleFormAll.value.testman;
      teststore.testfrom1.一級檢修貼紙 = ruleFormAll.value.checkdata[1];
      console.log("送出1.0");
    } else if (ruleFormAll.value.catequery === "2.0") {
      //中央系統
      teststore.systum = ruleFormAll.value.catequery;

      //表單
      teststore.testfrom2.station_name = ruleFormAll.value.name;
      teststore.testfrom2.catequery = ruleFormAll.value.catequery;
      teststore.testfrom2.carnum = ruleFormAll.value.carnum;
      teststore.testfrom2.carnum2 = ruleFormAll.value.carnum2;
      teststore.testfrom2.date = ruleFormAll.value.date;
      teststore.testfrom2.testman = ruleFormAll.value.testman;
      teststore.testfrom2.一級檢修貼紙 = ruleFormAll.value.checkdata[2];
      console.log("送出2.0");
    } else {
      //中央系統
      teststore.systum = ruleFormAll.value.catequery;

      //表單
      teststore.testfrom3.station_name = ruleFormAll.value.name;
      teststore.testfrom3.catequery = ruleFormAll.value.catequery;
      teststore.testfrom3.carnum = ruleFormAll.value.carnum;
      teststore.testfrom3.carnum2 = ruleFormAll.value.carnum2;
      teststore.testfrom3.canusec = ruleFormAll.value.canusec;
      teststore.testfrom3.電量 = ruleFormAll.value.checkdata[0];
      teststore.testfrom3.date = ruleFormAll.value.date;
      teststore.testfrom3.testman = ruleFormAll.value.testman;
      teststore.testfrom3["一級檢修貼紙"] = ruleFormAll.value.checkdata[2];
      console.log(teststore.testfrom3);
      console.log("送出2.0E");
    }
    //中央驗證步驟
    teststore.step.step2 = true;
    router.push("/server/biketest/BiketestSteptwo");
    console.log("表單驗證成功");
  } catch (error) {
    console.log("驗證失敗", error);
  }
};

onMounted(() => {
  // console.log(ruleFormAll.value)
  //至頂
  scrollToTop();

  // console.log(teststore.systum);

  SetTempData();
});
</script>

<style scoped>
.el-form-item--large {
  --font-size: 23px;
}
</style>
