<template>
  <div class="row mt-4">
    <p class="fw-bold">綜合統計 & 成績彙整 EXCEL</p>
    <div class="col-6">
      <div class="mb-1">
        <n-checkbox v-model:checked="upuserisok">是否含營運處</n-checkbox>
      </div>
      <n-select v-model:value="selectvalue" :options="options" class="mb-3" />
      <n-date-picker
        v-model:value="range1"
        type="daterange"
        clearable
        class="mb-2"
      />
      <div class="mb-2">
        <n-checkbox v-model:checked="manisok">人員篩選</n-checkbox>
        <el-select-v2
          :disabled="!manisok"
          class="me-3"
          multiple
          v-model="selectv"
          filterable
          remote
          :remote-method="remoteMethod"
          clearable
          :options="selectoptions"
          :loading="loading"
          style="width: 240px"
          placeholder="請輸入公號或姓名"
        ></el-select-v2>
      </div>

      <n-button type="primary" @click="submit" class="me-1"
        >綜合統計匯出</n-button
      >
      <n-button type="primary" @click="submit2">成績彙整匯出</n-button>
    </div>
    <n-divider />
  </div>
</template>

<script setup>
import { NDatePicker, NButton, NSelect, NCheckbox, NDivider } from "naive-ui";
import { ElSelectV2 } from "element-plus";

import * as XLSX from "xlsx";
import { ref, inject } from "vue";
const range1 = ref();
import axios from "axios";
const isLoading = ref(false);
const swal = inject("$swal");

//是否為營運處
const upuserisok = ref(true);

const manisok = ref(false);

const loading = ref(false);
const selectoptions = ref([]);
const list = ref([]);
const selectv = ref(null);

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
const editformData = ref({
  user_name: null,
  user_id: null,
  role: null,
  editrole: "營運處",
});

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

//把資料放到lsite總表
function inputlist(items) {
  list.value = items.data.map((item) => ({
    label: `${item.user_id}-${item.user_name}-${item.role_id}`,
    value: `${item.user_id}-${item.user_name}-${item.role_id}`,
  }));
}

//select觸發時的funs
async function ErrorAlert(text) {
  swal({
    icon: "error",
    title: `${text}`,
    showConfirmButton: false,
  });
}
const options = [
  {
    label: "全選",
    value: "全選",
  },
  //{
  //label: "雙北1.0",
  //value: "雙北1.0",
  //},
  {
    label: "雙北2.0",
    value: "雙北2.0",
  },
  // {
  //   label: "雙北2.0/2.0E",
  //   value: "雙北2.0/2.0E",
  // },
  //{
  //label: "桃園1.0",
  //value: "桃園1.0",
  //},
  // {
  //   label: "桃園2.0",
  //   value: "桃園2.0",
  // },
  {
    label: "桃園2.0/2.0E",
    value: "桃園2.0/2.0E",
  },
  {
    label: "雙竹2.0/2.0E",
    value: "雙竹2.0/2.0E",
  },
  {
    label: "苗栗1.0",
    value: "苗栗1.0",
  },
  {
    label: "苗栗2.0/2.0E",
    value: "苗栗2.0/2.0E",
  },
  {
    label: "台中2.0/2.0E",
    value: "台中2.0/2.0E",
  },
  {
    label: "嘉義2.0/2.0E",
    value: "嘉義2.0/2.0E",
  },
  {
    label: "台南2.0/2.0E",
    value: "台南2.0/2.0E",
  },
  {
    label: "高雄2.0/2.0E",
    value: "高雄2.0/2.0E",
  },
  {
    label: "屏東2.0/2.0E",
    value: "屏東2.0/2.0E",
  },
];

const selectvalue = ref(null);

async function getUserData() {
  try {
    const url = `${import.meta.env.VITE_URL}/user/users`;
    const res = await axios.get(url);
    const { data } = res;
    console.log(data);
    const newdata = data
      .filter((item) => item["role_id"] !== "一般幕僚")
      .map((item) => item["user_id"]);
    console.log(newdata);
    return newdata;
  } catch (error) {
    throw new Error("抓取資料錯誤");
  }
}

async function getBikeTestData() {
  try {
    const url = `${import.meta.env.VITE_URL}/biketest/Allbiketest`;
    const res = await axios.get(url);
    const { data } = res;
    return data;
  } catch (error) {
    throw new Error("抓取資料錯誤");
  }
}

async function getStationTestData() {
  try {
    const url1 = `${import.meta.env.VITE_URL}/station/station1`;
    const url2 = `${import.meta.env.VITE_URL}/station/station2`;

    const res = await Promise.all([axios.get(url1), axios.get(url2)]);
    return [res[0]["data"], res[1]["data"]];
  } catch (error) {
    throw new Error("抓取資料錯誤");
  }
}

// 是否30天以內
function isWithin30Days(a, b) {
  function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // 将字符串日期转换为 Date 对象
    const dateA = new Date(a);
    const dateB = new Date(b);

    // 将日期设置为当天的开始（午夜）
    dateA.setHours(0, 0, 0, 0);
    dateB.setHours(0, 0, 0, 0);

    // 计算日期之间的天数差异
    const utc1 = Date.UTC(
      dateA.getFullYear(),
      dateA.getMonth(),
      dateA.getDate()
    );
    const utc2 = Date.UTC(
      dateB.getFullYear(),
      dateB.getMonth(),
      dateB.getDate()
    );

    return Math.abs(Math.floor((utc2 - utc1) / _MS_PER_DAY));
  }

  const daysDiff = dateDiffInDays(a, b);

  return daysDiff > 30;
}

//用於checkbox
function ischeckfun(par, str1, str2) {
  const data = par["testtable"][str1];
  if (data === undefined) {
    return 0;
  }

  if (data["ischeck"] === undefined) {
    return 0;
  }

  if (data["ischeck"].includes(str2)) {
    return 1;
  } else {
    return 0;
  }
  // console.log(data);
}

//輪胎值
function rowcheck(startrow, endrow, type) {
  let type75 = 0;
  let type76 = 0;

  if (startrow < 50) {
    type75++;
  }

  if (75 < startrow && startrow <= 90) {
    type76++;
  }

  if (startrow > 90) {
    type75++;
  }

  if (endrow < 50) {
    type75++;
  }

  if (75 < endrow && endrow <= 90) {
    type76++;
  }

  if (endrow > 90) {
    type75++;
  }

  if (type === 75) {
    if (type75 === 0 && type76 === 0) {
      return 0;
    } else if (type75 >= 1) {
      return 1;
    } else {
      return 0;
    }
  } else if (type === 76) {
    if (type75 === 0 && type76 === 0) {
      return 0;
    } else if (type75 >= 1) {
      return 0;
    } else if (type76 >= 1) {
      return 1;
    }
  } else if (type === 77) {
    return 0;
  }
}

//場站名跟模擬體驗比對, 適用2.0跟2.0E
function stationAndBikeCheck(stationData, bikeData) {
  const { user_id, station_name, test_date } = stationData;

  function editStation(name) {
    return name.split("-")[1];
  }

  const arr = [];

  bikeData.forEach((item) => {
    if (
      user_id === item["user_id"] &&
      item["sys"] !== "1.0" &&
      test_date.split(" ")[0] === item["test_date"].split(" ")[0] &&
      editStation(station_name) === editStation(item["station_name"])
    ) {
      arr.push(...item["場站導標桿"]);
    }
  });

  // console.log(arr, stationData, bikeData);
  return arr;
}

//場站名跟模擬體驗比對,適用1.0
function stationAndBikeCheck1(stationData, bikeData, type) {
  // console.log(stationData, bikeData);
  const { user_id, station_name, test_date } = stationData;
  function editsatation(name) {
    return name.split("-")[1];
  }
  let arr = [];
  bikeData.forEach((element) => {
    if (
      user_id === element["user_id"] &&
      test_date.split(" ")[0] === element["test_date"].split(" ")[0] &&
      editsatation(station_name) === editsatation(element["station_name"])
    ) {
      arr = element[type];
    } else {
      // console.log(
      //   editsatation(station_name),
      //   editsatation(element["station_name"])
      // );
    }
  });
  // console.log(arr);
  return arr;
}

//獲取1.0個數 testdata是模擬體驗資料,stationdata場站檢驗資料 cities程式資料 傳入城市Array
async function getTable1(testdata, stationdata, cities, start, end) {
  // console.log(selectv.value);

  //如果有打勾就加入篩選
  let selectuser = [];
  if (manisok.value === true) {
    if (selectv.value !== null) {
      selectuser = selectv.value.map((item) => item.split("-")[0]);
    }
  }

  //抓到營運處資料
  let userdata = [];
  if (!upuserisok.value) {
    userdata = await getUserData();
  }
  // console.log(userdata)
  // console.log(i);
  const testArr = testdata.filter((item) => {
    const city = item.station_name.split("-")[0];
    return (
      (manisok.value === false ? true : selectuser.includes(item["user_id"])) &&
      !userdata.includes(item["user_id"]) &&
      item.sys === "1.0" &&
      cities.includes(city) &&
      dateCheck(start, end, item.test_date)
    );
  });
  // console.log(testArr);

  // console.log(testArr);
  const stationArr = stationdata[0].filter((item) => {
    const city = item.station_name.split("-")[0];
    return (
      (manisok.value === false ? true : selectuser.includes(item["user_id"])) &&
      cities.includes(city) &&
      dateCheck(start, end, item.test_date) &&
      !userdata.includes(item["user_id"])
    );
  });

  // console.log(testArr, stationArr);

  let error1 = 0;
  const obj = [];
  for (let i = 0; i < testArr.length; i++) {
    // console.log(testArr);
    obj.push({});

    // 2-A
    const one_A_one = stationAndBikeCheck1(
      testArr[i],
      stationArr,
      "場站周遭環境"
    ).includes("停車柱");
    const one_A_two = stationAndBikeCheck1(
      testArr[i],
      stationArr,
      "場站周遭環境"
    ).includes("基板");

    const one_A_three = stationAndBikeCheck1(
      testArr[i],
      stationArr,
      "場站周遭環境"
    ).includes("垃圾多");

    const one_A = one_A_one + one_A_two + one_A_three;

    obj[i]["1-A"] = one_A >= 1 ? 1 : 0;

    // // 2-B
    const one_B_one = stationAndBikeCheck1(
      testArr[i],
      stationArr,
      "KIOSK功能"
    ).includes("黑屏、畫面無反應");
    const one_B_two = stationAndBikeCheck1(
      testArr[i],
      stationArr,
      "KIOSK功能"
    ).includes("內容站點資訊不清楚");

    const one_B = one_B_one + one_B_two;
    obj[i]["1-B"] = one_B >= 1 ? 1 : 0;

    // // 2-C
    const one_C_one = stationAndBikeCheck1(
      testArr[i],
      stationArr,
      "KIOSK外觀"
    ).includes("嚴重髒汙");
    const one_C_two = stationAndBikeCheck1(
      testArr[i],
      stationArr,
      "KIOSK外觀"
    ).includes("廣告貼紙");
    const one_C_three = stationAndBikeCheck1(
      testArr[i],
      stationArr,
      "KIOSK外觀"
    ).includes("塗鴉");
    const one_C_four = stationAndBikeCheck1(
      testArr[i],
      stationArr,
      "KIOSK外觀"
    ).includes("正面Logo貼紙褪色");

    const one_C = one_C_one + one_C_two + one_C_three + one_C_four;
    obj[i]["1-C"] = one_C >= 1 ? 1 : 0;

    // 2-D
    const one_D_one = stationAndBikeCheck1(
      testArr[i],
      stationArr,
      "KIOSK燈片"
    ).includes("站名牌");
    const one_D_two = stationAndBikeCheck1(
      testArr[i],
      stationArr,
      "KIOSK燈片"
    ).includes("站名牌");

    const one_D = one_D_one + one_D_two;
    obj[i]["1-D"] = one_D >= 1 ? 1 : 0;

    // 2-E
    const one_E_one = stationAndBikeCheck1(
      testArr[i],
      stationArr,
      "場站導標桿"
    ).includes("歪斜、損毀");
    const one_E_two = stationAndBikeCheck1(
      testArr[i],
      stationArr,
      "場站導標桿"
    ).includes("漏缺");

    const one_E = one_E_one + one_E_two;
    obj[i]["1-E"] = one_E >= 1 ? 1 : 0;

    // 1-1
    const one_one_one = isWithin30Days(
      testArr[i]["testtable"]["date"],
      testArr[i]["test_date"]
    );
    // const one_one_one = 0;
    const two_one_two = 0;
    const one_one = one_one_one + two_one_two;
    obj[i]["1-1"] = one_one >= 1 ? 1 : 0;

    const one_two_one = ischeckfun(
      testArr[i],
      "一級檢修貼紙",
      "無貼紙／無法辨識／資訊不完整"
    );
    const one_two_two = ischeckfun(testArr[i], "一級檢修貼紙", "未撕除舊貼紙");

    const one_two = one_two_one + one_two_two;
    obj[i]["1-2"] = one_two >= 1 ? 1 : 0;

    // 1-3
    const one_three_one = ischeckfun(testArr[i], "車柱", "借、還車不順");
    const one_three_two = ischeckfun(testArr[i], "車柱", "搖晃");
    const one_three_three = ischeckfun(
      testArr[i],
      "車柱",
      "控制器燈號　輕觸即變換"
    );

    const one_three_four = ischeckfun(testArr[i], "車柱", "鎖體　生鏽");
    const one_three_five = ischeckfun(testArr[i], "車柱", "車柱靠卡　無提示音");
    const one_three =
      one_three_one ||
      one_three_two ||
      one_three_three ||
      one_three_four ||
      one_three_five;
    obj[i]["1-3"] = one_three >= 1 ? 1 : 0;

    // 1-4
    const one_four_one = ischeckfun(
      testArr[i],
      "停車柱貼紙／基板宣導貼紙",
      "龜裂、褪色、脫落、翹起、歪斜"
    );
    const two_four = one_four_one;
    obj[i]["1-4"] = two_four >= 1 ? 1 : 0;

    // 1-5
    const one_five_one = ischeckfun(testArr[i], "還車導引槽", "漏裝");
    const one_five_two = ischeckfun(testArr[i], "還車導引槽", "鬆動");
    obj[i]["1-5"] = one_five_one + one_five_two >= 1 ? 1 : 0;

    // 1-6
    const one_six_one = ischeckfun(testArr[i], "車體外觀", "車架");
    const one_six_two = ischeckfun(testArr[i], "車體外觀", "後泥除");
    const one_six_three = ischeckfun(testArr[i], "車體外觀", "前叉");
    const one_six_four = ischeckfun(testArr[i], "車體外觀", "前泥除");
    const one_six_five = ischeckfun(testArr[i], "車體外觀", "車架市徽、車號");
    const one_six_six = ischeckfun(testArr[i], "車體外觀", "張貼小廣告");
    const one_six =
      one_six_one ||
      one_six_two ||
      one_six_three ||
      one_six_four ||
      one_six_five ||
      one_six_six;
    obj[i]["1-6"] = one_six >= 1 ? 1 : 0;

    // 1-7
    const one_seven_one = ischeckfun(testArr[i], "後泥除貼紙", "廣告");
    const one_seven_two = ischeckfun(testArr[i], "後泥除貼紙", "YouBike Logo");
    const one_seven_three = ischeckfun(testArr[i], "後泥除貼紙", "車號");
    const one_seven = one_seven_one || one_seven_two || one_seven_three;
    obj[i]["1-7"] = one_seven >= 1 ? 1 : 0;

    // 1-8
    const one_eight_one = ischeckfun(testArr[i], "置物籃貼紙", "前 車號、LOGO");
    const one_eight_two = ischeckfun(testArr[i], "置物籃貼紙", "後 使用說明");
    const one_eight = one_eight_one || one_eight_two;
    obj[i]["1-8"] = one_eight >= 1 ? 1 : 0;

    // 1-9
    const one_nine_one = ischeckfun(
      testArr[i],
      "置物籃",
      "嚴重髒汙、沾黏、褪色"
    );
    const one_nine_two = ischeckfun(testArr[i], "置物籃", "垃圾");
    const one_nine_three = ischeckfun(
      testArr[i],
      "置物籃",
      "破損 2根以上／缺固定螺絲／裝設歪斜"
    );
    const one_nine_four = ischeckfun(
      testArr[i],
      "置物籃",
      "鉸線頭固定座　破損"
    );
    const one_nine_five = ischeckfun(testArr[i], "置物籃", "鉸線破損");

    const one_nine =
      one_nine_one ||
      one_nine_two ||
      one_nine_three ||
      one_nine_four ||
      one_nine_five;
    obj[i]["1-9"] = one_nine >= 1 ? 1 : 0;

    // 1-10
    const one_ten_one = ischeckfun(testArr[i], "外管完整", "煞車外管");
    const one_ten_two = ischeckfun(testArr[i], "外管完整", "變速外管");
    const one_ten = one_ten_one + one_ten_two;
    obj[i]["1-10"] = one_ten >= 1 ? 1 : 0;

    // 1-11
    const one_elenven_one = ischeckfun(
      testArr[i],
      "把手套",
      "黏潮、紋路磨損、破損"
    );
    obj[i]["1-11"] = one_elenven_one;

    // 1-12
    const one_twelve_one = ischeckfun(
      testArr[i],
      "把手貼紙",
      "左 座管束子與煞車提醒"
    );
    const one_twelve_two = ischeckfun(testArr[i], "把手貼紙", "右 煞貼提醒");
    const one_twelve = one_twelve_one + one_twelve_two;
    obj[i]["1-12"] = one_twelve >= 1 ? 1 : 0;

    // 1-13
    const one_thirteen_one = ischeckfun(
      testArr[i],
      "車鈴",
      "調整後仍無聲響、悶響"
    );
    const one_thirteen_two = ischeckfun(testArr[i], "車鈴", "無車鈴");
    const one_thirteen = one_thirteen_one + one_thirteen_two;
    obj[i]["1-13"] = one_thirteen >= 1 ? 1 : 0;

    // 1-14
    const one_fourteen_one = ischeckfun(
      testArr[i],
      "防轉彈簧／停車架",
      "彈簧脫落"
    );
    const one_fourteen_two = ischeckfun(
      testArr[i],
      "防轉彈簧／停車架",
      "停車架架起後，後輪無法懸空／停車架變形"
    );
    const one_fourteen = one_fourteen_two + one_fourteen_one;
    obj[i]["1-14"] = one_fourteen >= 1 ? 1 : 0;

    // 1-15
    const one_fifteen_one = ischeckfun(
      testArr[i],
      "座墊",
      "破損、龜裂、膠布修補、座墊與底座分離"
    );
    const one_fifteen_two = ischeckfun(testArr[i], "座墊", "髒汙");
    const one_fifteen = one_fifteen_two + one_fifteen_one;
    obj[i]["1-15"] = one_fifteen >= 1 ? 1 : 0;

    // 1-16
    obj[i]["1-16"] =
      ischeckfun(testArr[i], "座管束子貼紙", "破損、龜裂、褪色、翹起、脫落") >=
      1
        ? 1
        : 0;

    // 1-17
    const one_seventeen_one = ischeckfun(
      testArr[i],
      "座墊高低調整",
      "高度調整不順"
    );
    const one_seventeen_two = ischeckfun(
      testArr[i],
      "座墊高低調整",
      "束子鎖死"
    );
    const one_seventeen_three = ischeckfun(
      testArr[i],
      "座墊高低調整",
      "束子歪斜"
    );
    const one_seventeen_four = ischeckfun(
      testArr[i],
      "座墊高低調整",
      "束子固定後座墊仍可移動(假性鎖死)"
    );
    const one_seventeen_five = ischeckfun(
      testArr[i],
      "座墊高低調整",
      "束子脫落"
    );
    const one_seventeen_six = ischeckfun(
      testArr[i],
      "座墊高低調整",
      "調整導致手髒汙"
    );
    const one_seventeen_seven = ischeckfun(
      testArr[i],
      "座墊高低調整",
      "束子磨耗產生銳角，有割傷之慮"
    );

    const one_seventeen =
      one_seventeen_one +
      one_seventeen_two +
      one_seventeen_three +
      one_seventeen_four +
      one_seventeen_five +
      one_seventeen_six +
      one_seventeen_seven;

    obj[i]["1-17"] = one_seventeen >= 1 ? 1 : 0;

    // 1-18
    const one_eighteen_one = ischeckfun(
      testArr[i],
      "輪胎",
      "胎紋磨損 平滑、龜裂、反光帶脫落"
    );
    const one_eighteen_two = ischeckfun(testArr[i], "輪胎", "輪框變形、缺鋼絲");
    const one_eighteen_three = ischeckfun(testArr[i], "輪胎", "前後輪偏擺");
    const one_eighteen =
      one_eighteen_one + one_eighteen_two + one_eighteen_three;
    obj[i]["1-18"] = one_eighteen >= 1 ? 1 : 0;

    // 1-19
    const one_nineteen_one = ischeckfun(testArr[i], "前後輪軸螺絲", "前");
    const one_nineteen_two = ischeckfun(testArr[i], "前後輪軸螺絲", "後");
    const one_nineteen = one_nineteen_one + one_nineteen_two;
    obj[i]["1-19"] = one_nineteen >= 1 ? 1 : 0;

    // 1-20
    const one_twenty_one = ischeckfun(testArr[i], "前／後燈", "前燈");
    const one_twenty_two = ischeckfun(testArr[i], "前／後燈", "後燈");
    const one_twenty_three = ischeckfun(
      testArr[i],
      "前／後燈",
      "前燈線　未妥善固定或絕緣膠翹起"
    );
    const one_twenty = one_twenty_one + one_twenty_two + one_twenty_three;
    obj[i]["1-20"] = one_twenty >= 1 ? 1 : 0;

    // 1-21
    const one_twentyone_one = ischeckfun(testArr[i], "煞車功能", "煞車過鬆");
    const one_twentyone_two = ischeckfun(testArr[i], "煞車功能", "煞車過緊");
    const one_twentyone_three = ischeckfun(
      testArr[i],
      "煞車功能",
      "黑色墊片歪斜、缺黑色墊片"
    );
    const one_twentyone_four = ischeckfun(testArr[i], "煞車功能", "煞車異常");
    const one_twentyone_five = ischeckfun(testArr[i], "煞車功能", "異音");
    const one_twentyone =
      one_twentyone_one +
      one_twentyone_two +
      one_twentyone_three +
      one_twentyone_four +
      one_twentyone_five;
    obj[i]["1-21"] = one_twentyone >= 1 ? 1 : 0;

    // 1-22
    const one_twentytwo_one = ischeckfun(
      testArr[i],
      "變速功能",
      "指示蓋脫落、標示模糊"
    );
    const one_twentytwo_two = ischeckfun(testArr[i], "變速功能", "換檔不順");
    const one_twentytwo_three = ischeckfun(
      testArr[i],
      "變速功能",
      "檔位無法定位／變速異常"
    );
    const one_twentytwo_four = ischeckfun(testArr[i], "變速功能", "上蓋脫落");
    const one_twentytwo =
      one_twentytwo_one +
      one_twentytwo_two +
      one_twentytwo_three +
      one_twentytwo_four;
    obj[i]["1-22"] = one_twentytwo >= 1 ? 1 : 0;

    //1-23
    obj[i]["1-23"] = ischeckfun(
      testArr[i],
      "隨車鎖",
      "無法插入、上鎖，上鎖後鑰匙無法拔出"
    );

    // 1-24
    const one_twentyfour_one = ischeckfun(
      testArr[i],
      "騎乘行進",
      "前後輪無法順暢轉動"
    );
    const one_twentyfour_two = ischeckfun(testArr[i], "騎乘行進", "異音");
    const one_twentyfour = one_twentyfour_one + one_twentyfour_two;
    obj[i]["1-24"] = one_twentyfour >= 1 ? 1 : 0;

    // 1-25
    const startrow = testArr[i]["testtable"]["startrow"];
    const endrow = testArr[i]["testtable"]["endrow"];
    const startrowpoint = startrow >= 50 && startrow <= 75 ? 0 : 1;
    const endrowpoint = endrow >= 50 && endrow <= 75 ? 0 : 1;
    obj[i]["1-25"] = startrowpoint + endrowpoint > 0 ? 1 : 0;

    //
    obj[i]["1-18+1-25"] = obj[i]["1-18"] + obj[i]["1-25"] >= 1 ? 1 : 0;
    // console.log(obj[i]["1-18+1-25"]);
    for (const key in obj[i]) {
      if (obj[i][key]) {
        error1++;
        break;
      }
    }
  }

  // console.log("異常台數", error1);
  //把它全部加總
  let total = {};
  for (let i = 0; i < obj.length; i++) {
    for (const key in obj[i]) {
      if (Object.prototype.hasOwnProperty.call(total, key)) {
        total[key] += obj[i][key];
      } else {
        total[key] = obj[i][key];
      }
    }
  }

  // console.log(total);

  //A的加總個數
  const A = (obj) => {
    const newobj = {};
    newobj["1-A"] = obj["1-A"];
    newobj["1-B"] = obj["1-B"];
    newobj["1-C"] = obj["1-C"];
    newobj["1-D"] = obj["1-D"];
    newobj["1-5"] = obj["1-5"];
    newobj["1-4"] = obj["1-4"];
    newobj["1-3"] = obj["1-3"];
    newobj["1-E"] = obj["1-E"];
    return newobj;
  };
  //A的加總個數
  const B = (obj) => {
    const newobj = {};
    newobj["1-1+1-2"] = obj["1-1"] + obj["1-2"];
    newobj["1-7"] = obj["1-7"];
    newobj["1-12"] = obj["1-12"];
    newobj["1-16"] = obj["1-16"];
    newobj["1-8"] = obj["1-8"];
    newobj["1-6"] = obj["1-6"];
    newobj["1-9"] = obj["1-9"];
    newobj["1-11"] = obj["1-11"];
    newobj["1-15"] = obj["1-15"];
    newobj["1-19"] = obj["1-19"];
    return newobj;
  };
  //C的加總個數
  const C = (obj) => {
    const newobj = {};
    newobj["1-21"] = obj["1-21"];
    newobj["1-18+1-25"] = obj["1-18+1-25"];
    newobj["1-10"] = obj["1-10"];
    newobj["1-17"] = obj["1-17"];
    newobj["1-13"] = obj["1-13"];
    newobj["1-14"] = obj["1-14"];
    newobj["1-20"] = obj["1-20"];
    newobj["1-23"] = obj["1-23"];
    newobj["1-22"] = obj["1-22"];
    newobj["1-24"] = obj["1-24"];
    return newobj;
  };
  function totalfun(params) {
    let totaldata = 0;
    for (let i in params) {
      totaldata += params[i];
    }
    return totaldata;
  }
  const D = (total) => {
    // console.log(totalfun(A(total)) + totalfun(B(total)) + totalfun(C(total)));
    return totalfun(A(total)) + totalfun(B(total)) + totalfun(C(total));
  };

  // 場站總數 (新北台北桃園苗栗...)
  const testdataLength = testArr.length;

  //A的乘積加總
  function SUMPRODUCTA(A) {
    let sumprouct = 0;
    sumprouct += A["1-A"] * -6;
    sumprouct += A["1-B"] * -6;
    sumprouct += A["1-C"] * -4;
    sumprouct += A["1-D"] * -4;
    sumprouct += A["1-5"] * -4;
    sumprouct += A["1-4"] * -4;
    sumprouct += A["1-3"] * -3;
    sumprouct += A["1-E"] * -3;
    return sumprouct;
  }

  //類別分數
  const u4 = (A, D, testdataLength) => {
    const totalA = totalfun(A);
    const num1 = (totalA / D) * 100 * testdataLength;

    if (num1 + SUMPRODUCTA(A) === 0) {
      return 100;
    }
    const totalnum =
      ((num1 + SUMPRODUCTA(A)) / testdataLength / ((totalA / D) * 100)) * 100;

    return parseInt(totalnum);
  };

  //B的乘積加總
  function SUMPRODUCTB(B) {
    let sumprouct = 0;
    sumprouct += B["1-1+1-2"] * -6;
    sumprouct += B["1-7"] * -6;
    sumprouct += B["1-12"] * -6;
    sumprouct += B["1-16"] * -6;
    sumprouct += B["1-8"] * -4;
    sumprouct += B["1-6"] * -6;
    sumprouct += B["1-9"] * -6;
    sumprouct += B["1-11"] * -10;
    sumprouct += B["1-15"] * -6;
    sumprouct += B["1-19"] * -4;
    return sumprouct;
  }

  const u17 = (B, D, testdataLength) => {
    const totalB = totalfun(B);
    const num1 = (totalB / D) * 100 * testdataLength;

    if (num1 + SUMPRODUCTB(B) === 0) {
      return 100;
    }

    const totalnum =
      ((num1 + SUMPRODUCTB(B)) / testdataLength / ((totalB / D) * 100)) * 100;
    return parseInt(totalnum);
  };

  //C的乘積加總
  function SUMPRODUCTC(C) {
    let sumprouct = 0;
    sumprouct += C["1-21"] * -10;
    sumprouct += C["1-18+1-25"] * -10;
    sumprouct += C["1-10"] * -6;
    sumprouct += C["1-17"] * -10;
    sumprouct += C["1-13"] * -10;
    sumprouct += C["1-14"] * -6;
    sumprouct += C["1-20"] * -10;
    sumprouct += C["1-23"] * -6;
    sumprouct += C["1-22"] * -6;
    sumprouct += C["1-24"] * -6;
    return sumprouct;
  }
  const u46 = (C, D, testdataLength) => {
    const totalC = totalfun(C);
    const num1 = (totalC / D) * 100 * testdataLength;

    if (num1 + SUMPRODUCTC(C) === 0) {
      return 100;
    }

    const totalnum =
      ((num1 + SUMPRODUCTC(C)) / testdataLength / ((totalC / D) * 100)) * 100;
    return parseInt(totalnum);
  };
  const u4total = u4(A(total), D(total), testdataLength, total);
  const u17total = u17(B(total), D(total), testdataLength, total);
  const u46total = u46(C(total), D(total), testdataLength, total);

  ////////可動率計算////////////

  //抽驗場站數
  const statioNum1 = stationArr.length;
  //抽驗總在戰車輛數
  const stationNum2 = stationArr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue["carnum"];
  }, 0);
  //無法租借車輛數
  const stationNum3 = stationArr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue["no_carnum"];
  }, 0);
  //在站車輛可動率
  const stationNum4 = parseFloat(
    ((stationNum2 - stationNum3) / stationNum2) * 100
  ).toFixed(2);

  //扣分
  const cutpoint = (num) => {
    if (num < 91) {
      return 5;
    } else if (num >= 91 && num < 93) {
      return 4;
    } else if (num >= 93 && num < 95) {
      return 3;
    } else if (num >= 95 && num < 97) {
      return 2;
    } else if (num >= 97 && num < 99) {
      return 1;
    } else if (num >= 99 && num <= 100) {
      return 0;
    }
  };

  //////底下加總

  //可動率扣分
  const canMovePoint = cutpoint(stationNum4);

  //總分
  const totalPoint = (
    (100 * testArr.length +
      (SUMPRODUCTA(A(total)) + SUMPRODUCTB(B(total)) + SUMPRODUCTC(C(total)))) /
    testArr.length
  ).toFixed(2);

  //模擬體驗總分
  const finalTotal = totalPoint - canMovePoint;

  //前後前後胎壓未達標準
  const rowNum = total["1-25"];

  const finalObj = {
    抽驗總在站車輛數: stationNum2,
    施測站數: statioNum1,
    施測車輛數: testArr.length,
    "2.0E施測車輛數": null,
    前後胎壓未達標準1: rowNum,
    前後胎壓未達標準2: `${parseInt((rowNum / testArr.length) * 100)}%`,
    場站妥善度: u4total,
    自行車外觀與重要標示: u17total,
    自行車重要機能: u46total,
    總分: finalTotal,
    可動率: stationNum4,
    無法租借車輛數: stationNum3,
    可動扣分: canMovePoint,
    異常台數: error1,
  };
  // console.log(finalObj, total);
  return { finalObj, total };
}

//獲取2.0個數 testdata是模擬體驗資料,stationdata場站檢驗資料 cities程式資料 傳入城市Array
async function getTable2(testdata, stationdata, cities, start, end) {
  let userdata = [];
  if (!upuserisok.value) {
    userdata = await getUserData();
  }

  //如果有打勾就加入篩選
  let selectuser = [];
  if (manisok.value === true) {
    if (selectv.value !== null) {
      selectuser = selectv.value.map((item) => item.split("-")[0]);
    }
  }

  const testArr = testdata.filter((item) => {
    const city = item.station_name.split("-")[0];
    return (
      (manisok.value === false ? true : selectuser.includes(item["user_id"])) &&
      !userdata.includes(item["user_id"]) &&
      item.sys === "2.0" &&
      cities.includes(city) &&
      dateCheck(start, end, item.test_date)
    );
  });
  const stationArr = stationdata[1].filter((item) => {
    const city = item.station_name.split("-")[0];
    return (
      (manisok.value === false ? true : selectuser.includes(item["user_id"])) &&
      cities.includes(city) &&
      dateCheck(start, end, item.test_date) &&
      !userdata.includes(item["user_id"])
    );
  });

  function editSatation(name) {
    return name.split("-")[1];
  }
  // console.log(stationArr);
  let error2 = 0;
  const obj = [];
  for (let i = 0; i < testArr.length; i++) {
    obj.push({});

    const stationData = stationAndBikeCheck(testArr[i], stationArr);

    // 2-A
    obj[i]["2-A"] = stationData.includes("歪斜、損毀") ? 1 : 0;

    // 2-B
    obj[i]["2-B"] = stationData.includes("漏缺") ? 1 : 0;

    // 2-1
    const two_one_one = isWithin30Days(
      testArr[i]["testtable"]["date"],
      testArr[i]["test_date"]
    );
    const two_one_two = 0;
    const two_one_three = ischeckfun(testArr[i], "一級檢修貼紙", "無貼紙");
    const two_one_four = ischeckfun(
      testArr[i],
      "一級檢修貼紙",
      "無法辨識／資訊不完整"
    );

    const two_one_five = ischeckfun(testArr[i], "一級檢修貼紙", "未撕除舊貼紙");
    const two_one =
      two_one_one + two_one_two + two_one_three + two_one_four + two_one_five;
    obj[i]["2-1"] = two_one >= 1 ? 1 : 0;

    // 2-2
    const two_two_one = ischeckfun(testArr[i], "車柱 周遭環境", "車柱");
    const two_two_two = ischeckfun(testArr[i], "車柱 周遭環境", "基板");
    const two_two = two_two_one + two_two_two;
    obj[i]["2-2"] = two_two >= 1 ? 1 : 0;

    // 2-3
    const two_three_one = ischeckfun(testArr[i], "車柱 周遭環境", "垃圾");
    const two_three = two_three_one;
    obj[i]["2-3"] = two_three >= 1 ? 1 : 0;

    // 2-4
    const two_four_one = ischeckfun(testArr[i], "車柱 外觀檢查", "柱號貼紙");
    const two_four = two_four_one;
    obj[i]["2-4"] = two_four >= 1 ? 1 : 0;

    // 2-5
    obj[i]["2-5"] = ischeckfun(testArr[i], "車柱 外觀檢查", "站名貼紙文字");

    // 2-6
    obj[i]["2-6"] = ischeckfun(
      testArr[i],
      "車柱 外觀檢查",
      "太陽能面板  破裂 / 異常"
    );

    // 2-7
    obj[i]["2-7"] = ischeckfun(testArr[i], "車柱 外觀檢查", "太陽能面板  水氣");

    // 2-8
    obj[i]["2-8"] = ischeckfun(
      testArr[i],
      "車柱 外觀檢查",
      "鎖體  面積10%生鏽"
    );

    // 2-9
    obj[i]["2-9"] = ischeckfun(
      testArr[i],
      "車柱 功能檢查",
      "面板左下方燈光 未亮起"
    );

    // 2-10
    obj[i]["2-10"] = ischeckfun(testArr[i], "車柱 功能檢查", "搖晃");

    // 2-11
    obj[i]["2-11"] = ischeckfun(testArr[i], "車柱 功能檢查", "借還車不順");

    // 2-12
    const two_twelve_one = ischeckfun(testArr[i], "還車導引槽", "缺漏");
    const two_twelve_two = ischeckfun(testArr[i], "還車導引槽", "鬆動");
    const two_twelve = two_twelve_one + two_twelve_two;
    obj[i]["2-12"] = two_twelve >= 1 ? 1 : 0;

    // 2-13
    obj[i]["2-13"] = ischeckfun(
      testArr[i],
      "車機機殼",
      "髒污／塗鴉／小廣告／褪色"
    );

    // 2-14
    obj[i]["2-14"] = ischeckfun(testArr[i], "車機機殼", "破損／嚴重刮痕");

    // 2-15
    obj[i]["2-15"] = ischeckfun(testArr[i], "車機機殼", "太陽能面板  產生氣泡");

    // 2-16
    obj[i]["2-16"] = ischeckfun(
      testArr[i],
      "車機功能",
      "借不出還不回／車機異常"
    );

    // 2-17
    obj[i]["2-17"] = ischeckfun(
      testArr[i],
      "車機功能",
      "螢幕文字  無法正常顯示"
    );

    // 2-18
    obj[i]["2-18"] = ischeckfun(
      testArr[i],
      "車機功能",
      "借、還車  無提示音、異常"
    );

    // 2-19
    obj[i]["2-19"] = ischeckfun(testArr[i], "防轉彈簧／停車架", "彈簧脫落");

    // 2-20
    obj[i]["2-20"] = ischeckfun(
      testArr[i],
      "防轉彈簧／停車架",
      "停車架起後，車輛無法站立"
    );

    // 2-21
    const two_twentyone_one = ischeckfun(
      testArr[i],
      "置物籃貼紙",
      "前 車號、LOGO"
    );
    const two_twentyone_two = ischeckfun(
      testArr[i],
      "置物籃貼紙",
      "後 使用說明"
    );
    const two_twentyone = two_twentyone_one + two_twentyone_two;
    obj[i]["2-21"] = two_twentyone >= 1 ? 1 : 0;

    // 2-22
    const two_twentytwo_one = ischeckfun(
      testArr[i],
      "置物籃",
      "嚴重髒汙、沾黏"
    );
    const two_twentytwo_two = ischeckfun(testArr[i], "置物籃", "垃圾");
    const two_twentytwo = two_twentytwo_one + two_twentytwo_two;
    obj[i]["2-22"] = two_twentytwo >= 1 ? 1 : 0;

    //2-23
    obj[i]["2-23"] = ischeckfun(
      testArr[i],
      "置物籃",
      "破損 2根以上／缺固定螺絲／裝設歪斜"
    );

    // 2-24
    obj[i]["2-24"] = ischeckfun(
      testArr[i],
      "置物籃",
      "鉸線頭固定座　上下皆破損"
    );

    // 2-25
    obj[i]["2-25"] = ischeckfun(testArr[i], "置物籃", "鉸線破損／生鏽");

    // 2-26
    obj[i]["2-26"] = ischeckfun(testArr[i], "外管完整", "蛇管  脫落／遺失");

    // 2-27
    obj[i]["2-27"] = ischeckfun(testArr[i], "外管完整", "煞車外管");

    // 2-28
    obj[i]["2-28"] = ischeckfun(testArr[i], "外管完整", "變速外管");

    // 2-29
    const two_twentynine_one = ischeckfun(
      testArr[i],
      "把手貼紙",
      "左 騎乘前檢查"
    );
    const two_twentynine_two = ischeckfun(
      testArr[i],
      "把手貼紙",
      "右 煞車提醒"
    );
    const two_twentynine = two_twentynine_one + two_twentynine_two;
    obj[i]["2-29"] = two_twentynine >= 1 ? 1 : 0;

    // 2-30
    obj[i]["2-30"] = ischeckfun(testArr[i], "把手套", "黏潮、紋路磨損、破損");

    // 2-31
    obj[i]["2-31"] = ischeckfun(testArr[i], "把手套", "髒汙  致無法使用");

    // 2-32
    obj[i]["2-32"] = ischeckfun(testArr[i], "車鈴", "無法發出鈴聲");

    // 2-33
    obj[i]["2-33"] = ischeckfun(testArr[i], "車鈴", "貼紙文字無法傳達完整訊息");

    // 2-34
    obj[i]["2-34"] = ischeckfun(
      testArr[i],
      "車體外觀",
      "車架 髒汙／小廣告／塗鴉"
    );

    // 2-35
    obj[i]["2-35"] = ischeckfun(testArr[i], "車體外觀", "車架  掉漆");

    // 2-36
    obj[i]["2-36"] = ischeckfun(
      testArr[i],
      "車體外觀",
      "前、後泥除  髒污／破損"
    );

    // 2-37
    const two_thirtyseven_one = ischeckfun(testArr[i], "後泥除貼紙", "廣告");
    const two_thirtyseven_two = ischeckfun(
      testArr[i],
      "後泥除貼紙",
      "YouBike Logo"
    );
    const two_thirtyseven = two_thirtyseven_one + two_thirtyseven_two;
    obj[i]["2-37"] = two_thirtyseven >= 1 ? 1 : 0;

    // 2-38
    obj[i]["2-38"] = ischeckfun(testArr[i], "後泥除貼紙", "車號");

    //2-39
    obj[i]["2-39"] = ischeckfun(
      testArr[i],
      "座管束子貼紙",
      "文字無法傳達完整訊息"
    );

    // 2-40
    obj[i]["2-40"] = ischeckfun(testArr[i], "座墊", "拉高後搖晃");

    // 2-41
    obj[i]["2-41"] = ischeckfun(testArr[i], "座墊", "歪斜");

    // 2-42
    obj[i]["2-42"] = ischeckfun(testArr[i], "座墊", "與底部分離");

    // 2-43
    obj[i]["2-43"] = ischeckfun(testArr[i], "座墊", "表面破損、龜裂");

    // 2-44
    obj[i]["2-44"] = ischeckfun(testArr[i], "座墊", "髒汙導致無法騎乘");

    // 2-45
    obj[i]["2-45"] = ischeckfun(testArr[i], "座墊桿", "高度調整不順");

    // 2-46
    obj[i]["2-46"] = ischeckfun(
      testArr[i],
      "座墊桿",
      "伸縮座墊桿鎖死 ( 無法調整高度 )"
    );

    // 2-47
    obj[i]["2-47"] = ischeckfun(testArr[i], "座墊桿", "黃色拉桿斷裂");

    // 2-48
    obj[i]["2-48"] = ischeckfun(testArr[i], "座墊桿", "座墊桿滑落 無法固定");

    // 2-49
    obj[i]["2-49"] = ischeckfun(testArr[i], "座墊桿", "反轉後無法固定位置");

    // 2-50
    obj[i]["2-50"] = ischeckfun(testArr[i], "座墊桿", "座墊未在最底部就可反轉");

    // 2-51
    obj[i]["2-51"] = ischeckfun(testArr[i], "座墊桿", "座墊桿與車體分離");

    // 2-52
    obj[i]["2-52"] = ischeckfun(testArr[i], "座墊桿", "座墊桿與車體分離");

    // 2-53
    obj[i]["2-53"] = ischeckfun(testArr[i], "輪胎", "輪框變形、缺鋼絲");

    // 2-54
    obj[i]["2-54"] = ischeckfun(testArr[i], "輪胎", "前 或 後輪偏擺");

    // 2-55
    obj[i]["2-55"] = ischeckfun(testArr[i], "前後輪軸螺絲", "前");

    // 2-56
    obj[i]["2-56"] = ischeckfun(testArr[i], "前後輪軸螺絲", "後");

    // 2-57
    obj[i]["2-57"] = ischeckfun(testArr[i], "前／後燈", "前燈");

    // 2-58
    obj[i]["2-58"] = ischeckfun(testArr[i], "前／後燈", "後燈");

    // 2-59
    obj[i]["2-59"] = ischeckfun(
      testArr[i],
      "前／後燈",
      "前燈線　未妥善固定或絕緣膠翹起"
    );

    // 2-60
    obj[i]["2-60"] = ischeckfun(testArr[i], "煞車功能", "無法煞車");

    //2-61
    const two_sixtyone_one = ischeckfun(
      testArr[i],
      "煞車功能",
      "煞車過鬆 ( 2/3仍無法煞停 )"
    );
    const two_sixtyone_two = ischeckfun(
      testArr[i],
      "煞車功能",
      "煞車過緊 ( 未滿1/3已經煞停 )"
    );
    const two_sixtyone = two_sixtyone_one + two_sixtyone_two;
    obj[i]["2-61"] = two_sixtyone >= 1 ? 1 : 0;

    // 2-62
    obj[i]["2-62"] = ischeckfun(testArr[i], "煞車功能", "異音");

    // 2-63
    obj[i]["2-63"] = ischeckfun(testArr[i], "變速功能", "指示蓋 (銀) 脫落");

    // 2-64
    obj[i]["2-64"] = ischeckfun(
      testArr[i],
      "變速功能",
      "上蓋 (黑) 脫落／檔位標示無法辨識"
    );

    // 2-65
    obj[i]["2-65"] = ischeckfun(
      testArr[i],
      "變速功能",
      "換檔轉動不順 ( 2轉3過緊 )"
    );

    // 2-66
    obj[i]["2-66"] = ischeckfun(testArr[i], "變速功能", "檔位無法定位");

    // 2-67
    obj[i]["2-67"] = ischeckfun(testArr[i], "變速功能", "實際騎乘無法變速");

    // 2-68
    obj[i]["2-68"] = ischeckfun(
      testArr[i],
      "隨車鎖",
      "貼紙文字無法傳達完整訊息"
    );

    // 2-69
    obj[i]["2-69"] = ischeckfun(testArr[i], "隨車鎖", "鎖孔  生鏽／脫漆");

    // 2-70
    obj[i]["2-70"] = ischeckfun(testArr[i], "隨車鎖", "上鎖／解鎖 失敗、異常");

    // 2-71
    obj[i]["2-71"] = ischeckfun(testArr[i], "隨車鎖", "鎖體  面積10%生鏽");

    // 2-72
    obj[i]["2-72"] = ischeckfun(testArr[i], "騎乘行進", "行進不順暢");

    // 2-73
    obj[i]["2-73"] = ischeckfun(testArr[i], "騎乘行進", "異音");

    // 2-75
    const startrow = testArr[i]["testtable"]["startrow"];
    const endrow = testArr[i]["testtable"]["endrow"];
    obj[i]["2-75"] = rowcheck(startrow, endrow, 75);
    // 2-77
    obj[i]["2-77"] = rowcheck(startrow, endrow, 77);
    // 2-76
    obj[i]["2-76"] = rowcheck(startrow, endrow, 76);

    for (const key in obj[i]) {
      if (obj[i][key]) {
        error2++;
        break;
      }
    }
  }

  // console.log(error2, "異常台數");

  //把它全部加總
  let total = {};
  for (let i = 0; i < obj.length; i++) {
    for (const key in obj[i]) {
      if (Object.prototype.hasOwnProperty.call(total, key)) {
        total[key] += obj[i][key];
      } else {
        total[key] = obj[i][key];
      }
    }
  }

  //A的加總個數
  const A = (obj) => {
    const newobj = {};
    newobj["2-A"] = obj["2-A"];
    newobj["2-B"] = obj["2-B"];
    newobj["2-3"] = obj["2-3"];
    newobj["2-2"] = obj["2-2"];
    newobj["2-4"] = obj["2-4"];
    newobj["2-5"] = obj["2-5"];
    newobj["2-6"] = obj["2-6"];
    newobj["2-7"] = obj["2-7"];
    newobj["2-9"] = obj["2-9"];
    newobj["2-10"] = obj["2-10"];
    newobj["2-8"] = obj["2-8"];
    newobj["2-11"] = obj["2-11"];
    newobj["2-12"] = obj["2-12"];
    return newobj;
  };
  //A的加總個數
  const B = (obj) => {
    const newobj = {};
    newobj["2-1"] = obj["2-1"];
    newobj["2-13"] = obj["2-13"];
    newobj["2-14"] = obj["2-14"];
    newobj["2-18"] = obj["2-18"];
    newobj["2-21"] = obj["2-21"];
    newobj["2-22"] = obj["2-22"];
    newobj["2-23"] = obj["2-23"];
    newobj["2-24"] = obj["2-24"];
    newobj["2-25"] = obj["2-25"];
    newobj["2-26"] = obj["2-26"];
    newobj["2-29"] = obj["2-29"];
    newobj["2-33"] = obj["2-33"];
    newobj["2-30"] = obj["2-30"];
    newobj["2-31"] = obj["2-31"];
    newobj["2-34"] = obj["2-34"];
    newobj["2-36"] = obj["2-36"];
    newobj["2-35"] = obj["2-35"];
    newobj["2-37"] = obj["2-37"];
    newobj["2-38"] = obj["2-38"];
    newobj["2-39"] = obj["2-39"];
    newobj["2-42"] = obj["2-42"];
    newobj["2-43"] = obj["2-43"];
    newobj["2-44"] = obj["2-44"];
    newobj["2-56"] = obj["2-56"];
    newobj["2-55"] = obj["2-55"];
    newobj["2-59"] = obj["2-59"];
    newobj["2-68"] = obj["2-68"];
    newobj["2-69"] = obj["2-69"];
    newobj["2-71"] = obj["2-71"];

    return newobj;
  };
  //C的加總個數
  const C = (obj) => {
    const newobj = {};

    newobj["2-15"] = obj["2-15"];
    newobj["2-16"] = obj["2-16"];
    newobj["2-17"] = obj["2-17"];
    newobj["2-19"] = obj["2-19"];
    newobj["2-20"] = obj["2-20"];
    newobj["2-27"] = obj["2-27"];
    newobj["2-28"] = obj["2-28"];
    newobj["2-32"] = obj["2-32"];
    newobj["2-40"] = obj["2-40"];
    newobj["2-41"] = obj["2-41"];
    newobj["2-45"] = obj["2-45"];
    newobj["2-46"] = obj["2-46"];
    newobj["2-47"] = obj["2-47"];
    newobj["2-48"] = obj["2-48"];
    newobj["2-49"] = obj["2-49"];
    newobj["2-51"] = obj["2-51"];
    newobj["2-50"] = obj["2-50"];
    newobj["2-52"] = obj["2-52"];
    newobj["2-53"] = obj["2-53"];
    newobj["2-54"] = obj["2-54"];
    newobj["2-57"] = obj["2-57"];
    newobj["2-58"] = obj["2-58"];
    newobj["2-60"] = obj["2-60"];
    newobj["2-61"] = obj["2-61"];
    newobj["2-62"] = obj["2-62"];
    newobj["2-63"] = obj["2-63"];
    newobj["2-64"] = obj["2-64"];
    newobj["2-65"] = obj["2-65"];
    newobj["2-66"] = obj["2-66"];
    newobj["2-67"] = obj["2-67"];
    newobj["2-70"] = obj["2-70"];
    newobj["2-72"] = obj["2-72"];
    newobj["2-73"] = obj["2-73"];
    newobj["2-75"] = obj["2-75"];
    newobj["2-77"] = obj["2-77"];
    newobj["2-76"] = obj["2-76"];
    return newobj;
  };
  function totalfun(params) {
    let totaldata = 0;
    for (let i in params) {
      totaldata += params[i];
    }
    return totaldata;
  }
  // console.log(total);
  const D = (total) => {
    return totalfun(A(total)) + totalfun(B(total)) + totalfun(C(total));
  };

  // 場站總數 (新北台北桃園苗栗...)
  const testdataLength = testArr.length;

  //A的乘積加總
  function SUMPRODUCTA(A) {
    let sumprouct = 0;
    sumprouct += A["2-A"] * -4;
    sumprouct += A["2-B"] * -10;
    sumprouct += A["2-3"] * -6;
    sumprouct += A["2-2"] * -6;
    sumprouct += A["2-4"] * -4;
    sumprouct += A["2-5"] * -4;
    sumprouct += A["2-6"] * -10;
    sumprouct += A["2-7"] * 0;
    sumprouct += A["2-9"] * -4;
    sumprouct += A["2-10"] * -10;
    sumprouct += A["2-8"] * -4;
    sumprouct += A["2-11"] * -10;
    sumprouct += A["2-12"] * -4;
    return sumprouct;
  }

  //類別分數
  const u4 = (A, D, testdataLength) => {
    const totalA = totalfun(A);
    const num1 = (totalA / D) * 100 * testdataLength;

    if (num1 + SUMPRODUCTA(A) === 0) {
      return 100;
    }

    const totalnum =
      ((num1 + SUMPRODUCTA(A)) / testdataLength / ((totalA / D) * 100)) * 100;

    return parseInt(totalnum);
  };

  //B的乘積加總
  function SUMPRODUCTB(B) {
    let sumprouct = 0;
    sumprouct += B["2-1"] * -4;
    sumprouct += B["2-13"] * -6;
    sumprouct += B["2-14"] * -6;
    sumprouct += B["2-18"] * -4;
    sumprouct += B["2-21"] * -4;
    sumprouct += B["2-22"] * -6;
    sumprouct += B["2-23"] * -6;
    sumprouct += B["2-24"] * -4;
    sumprouct += B["2-25"] * -4;
    sumprouct += B["2-26"] * -6;
    sumprouct += B["2-29"] * -6;
    sumprouct += B["2-33"] * -4;
    sumprouct += B["2-30"] * -6;
    sumprouct += B["2-31"] * -20;
    sumprouct += B["2-34"] * -6;
    sumprouct += B["2-36"] * -6;
    sumprouct += B["2-35"] * 0;
    sumprouct += B["2-37"] * -6;
    sumprouct += B["2-38"] * -4;
    sumprouct += B["2-39"] * -6;
    sumprouct += B["2-42"] * -6;
    sumprouct += B["2-43"] * -10;
    sumprouct += B["2-44"] * -10;
    sumprouct += B["2-56"] * -4;
    sumprouct += B["2-55"] * -4;
    sumprouct += B["2-59"] * -6;
    sumprouct += B["2-68"] * -10;
    sumprouct += B["2-69"] * 0;
    sumprouct += B["2-71"] * -6;
    return sumprouct;
  }

  const u17 = (B, D, testdataLength) => {
    const totalB = totalfun(B);
    const num1 = (totalB / D) * 100 * testdataLength;

    if (num1 + SUMPRODUCTB(B) === 0) {
      return 100;
    }

    const totalnum =
      ((num1 + SUMPRODUCTB(B)) / testdataLength / ((totalB / D) * 100)) * 100;
    return parseInt(totalnum);
  };

  //C的乘積加總
  function SUMPRODUCTC(C) {
    let sumprouct = 0;
    sumprouct += C["2-16"] * 0;
    sumprouct += C["2-17"] * -20;
    sumprouct += C["2-19"] * -10;
    sumprouct += C["2-20"] * -10;
    sumprouct += C["2-27"] * -6;
    sumprouct += C["2-28"] * -6;
    sumprouct += C["2-32"] * -6;
    sumprouct += C["2-40"] * -10;
    sumprouct += C["2-41"] * -10;
    sumprouct += C["2-45"] * -10;
    sumprouct += C["2-46"] * -10;
    sumprouct += C["2-47"] * -10;
    sumprouct += C["2-48"] * -10;
    sumprouct += C["2-49"] * -20;
    sumprouct += C["2-50"] * -4;
    sumprouct += C["2-52"] * -20;
    sumprouct += C["2-53"] * -20;
    sumprouct += C["2-54"] * -6;
    sumprouct += C["2-57"] * -10;
    sumprouct += C["2-58"] * -10;
    sumprouct += C["2-60"] * -10;
    sumprouct += C["2-61"] * -10;
    sumprouct += C["2-62"] * -6;
    sumprouct += C["2-63"] * -6;
    sumprouct += C["2-64"] * -10;
    sumprouct += C["2-62"] * -6;
    sumprouct += C["2-66"] * -10;
    sumprouct += C["2-67"] * -10;
    sumprouct += C["2-70"] * -10;
    sumprouct += C["2-72"] * -6;
    sumprouct += C["2-73"] * -6;
    sumprouct += C["2-75"] * -10;
    //75+77
    sumprouct += C["2-76"] * -6;
    return sumprouct;
  }
  const u46 = (C, D, testdataLength) => {
    const totalC = totalfun(C);
    const num1 = (totalC / D) * 100 * testdataLength;

    if (num1 + SUMPRODUCTC(C) === 0) {
      return 100;
    }

    const totalnum =
      ((num1 + SUMPRODUCTC(C)) / testdataLength / ((totalC / D) * 100)) * 100;
    return totalnum.toFixed(2);
  };
  const u4total = u4(A(total), D(total), testdataLength, total);
  const u17total = u17(B(total), D(total), testdataLength, total);
  const u46total = u46(C(total), D(total), testdataLength, total);

  ////////可動率計算////////////

  //抽驗場站數
  const statioNum1 = stationArr.length;
  //抽驗總在戰車輛數
  const stationNum2 = stationArr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue["carnum"];
  }, 0);
  //無法租借車輛數
  const stationNum3 = stationArr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue["no_carnum"];
  }, 0);
  //在站車輛可動率
  const stationNum4 = parseFloat(
    ((stationNum2 - stationNum3) / stationNum2) * 100
  ).toFixed(2);

  //扣分
  const cutpoint = (num) => {
    if (num < 91) {
      return 5;
    } else if (num >= 91 && num < 93) {
      return 4;
    } else if (num >= 93 && num < 95) {
      return 3;
    } else if (num >= 95 && num < 97) {
      return 2;
    } else if (num >= 97 && num < 99) {
      return 1;
    } else if (num >= 99 && num <= 100) {
      return 0;
    }
  };

  //////底下加總

  //可動率扣分
  const canMovePoint = cutpoint(stationNum4);

  //總分
  const totalPoint = (
    (100 * testArr.length +
      (SUMPRODUCTA(A(total)) + SUMPRODUCTB(B(total)) + SUMPRODUCTC(C(total)))) /
    testArr.length
  ).toFixed(2);
  //模擬體驗總分
  const finalTotal = totalPoint - canMovePoint;

  //前後前後胎壓未達標準
  const rowNum = total["2-75"] + total["2-76"] + total["2-77"];

  // console.log(total["2-75"], total["2-76"], total["2-77"]);
  const finalObj = {
    施測站數: statioNum1,
    施測車輛數: testArr.length,
    "2.0E施測車輛數": null,
    前後胎壓未達標準1: rowNum,
    總在站車輛數: stationNum2,
    前後胎壓未達標準2: `${parseInt((rowNum / testArr.length) * 100)}%`,
    場站妥善度: u4total,
    自行車外觀與重要標示: u17total,
    自行車重要機能: parseInt(u46total),
    總分: finalTotal,
    可動率: stationNum4,
    無法租借車輛數: stationNum3,
    異常台數: error2,
    可動扣分: canMovePoint,
  };
  // console.log(finalObj);
  return { finalObj, total };
}

//獲取2.0+2.0E個數 testdata是模擬體驗資料,stationdata場站檢驗資料 cities程式資料 傳入城市Array
async function getTable2e(testdata, stationdata, cities, start, end) {
  // console.log(testdata);
  let userdata = [];
  if (!upuserisok.value) {
    userdata = await getUserData();
    console.log(userdata);
  }
  console.log(userdata);
  // const userdata = await getUserData();

  //如果有打勾就加入篩選
  let selectuser = [];
  if (manisok.value === true) {
    if (selectv.value !== null) {
      selectuser = selectv.value.map((item) => item.split("-")[0]);
    }
  }
  console.log(selectuser, selectuser);
  const testArr22E = testdata.filter((item) => {
    const city = item.station_name.split("-")[0];

    return (
      (manisok.value === false ? true : selectuser.includes(item["user_id"])) &&
      (item.sys === "2.0e" || item.sys === "2.0E" || item.sys === "2.0") &&
      cities.includes(city) &&
      dateCheck(start, end, item.test_date) &&
      !userdata.includes(item["user_id"])
    );
  });
  console.log(testArr22E);

  const testArr2 = testdata.filter((item) => {
    const city = item.station_name.split("-")[0];
    return (
      (manisok.value === false ? true : selectuser.includes(item["user_id"])) &&
      item.sys === "2.0" &&
      cities.includes(city) &&
      dateCheck(start, end, item.test_date) &&
      !userdata.includes(item["user_id"])
    );
  });

  // console.log(testArr2);
  const testArr2E = testdata.filter((item) => {
    const city = item.station_name.split("-")[0];
    return (
      (manisok.value === false ? true : selectuser.includes(item["user_id"])) &&
      (item.sys === "2.0e" || item.sys === "2.0E") &&
      cities.includes(city) &&
      dateCheck(start, end, item.test_date) &&
      !userdata.includes(item["user_id"])
    );
  });

  const stationArr2 = stationdata[1].filter((item) => {
    const city = item.station_name.split("-")[0];
    return (
      (manisok.value === false ? true : selectuser.includes(item["user_id"])) &&
      (item.sys === "2.0+2.0e" || item.sys === "2.0+2.0E") &&
      cities.includes(city) &&
      dateCheck(start, end, item.test_date) &&
      !userdata.includes(item["user_id"])
    );
  });
  // console.log(testArr2, stationArr2);
  let error2 = 0;
  //這是2.0的
  const obj = [];
  for (let i = 0; i < testArr2.length; i++) {
    obj.push({});
    // 2-A
    obj[i]["2-A"] = stationAndBikeCheck(testArr2[i], stationArr2).includes(
      "歪斜、損毀"
    )
      ? 1
      : 0;

    // obj[i]["2-A"] = 1;

    // console.log(stationArr2, testArr2[i]);

    // 2-B
    obj[i]["2-B"] = stationAndBikeCheck(testArr2[i], stationArr2).includes(
      "漏缺"
    )
      ? 1
      : 0;

    // 2-1
    const two_one_one = isWithin30Days(
      testArr2[i]["testtable"]["date"],
      testArr2[i]["test_date"]
    );
    const two_one_two = 0;
    const two_one_three = ischeckfun(testArr2[i], "一級檢修貼紙", "無貼紙");
    const two_one_four = ischeckfun(
      testArr2[i],
      "一級檢修貼紙",
      "無法辨識／資訊不完整"
    );

    const two_one_five = ischeckfun(
      testArr2[i],
      "一級檢修貼紙",
      "未撕除舊貼紙"
    );
    const two_one =
      two_one_one + two_one_two + two_one_three + two_one_four + two_one_five;
    obj[i]["2-1"] = two_one >= 1 ? 1 : 0;

    // 2-2
    const two_two_one = ischeckfun(testArr2[i], "車柱 周遭環境", "車柱");
    const two_two_two = ischeckfun(testArr2[i], "車柱 周遭環境", "基板");
    const two_two = two_two_one + two_two_two;
    obj[i]["2-2"] = two_two >= 1 ? 1 : 0;

    // 2-3
    const two_three_one = ischeckfun(testArr2[i], "車柱 周遭環境", "垃圾");
    const two_three = two_three_one;
    obj[i]["2-3"] = two_three >= 1 ? 1 : 0;

    // 2-4
    const two_four_one = ischeckfun(testArr2[i], "車柱 外觀檢查", "柱號貼紙");
    const two_four = two_four_one;
    obj[i]["2-4"] = two_four >= 1 ? 1 : 0;

    // 2-5
    obj[i]["2-5"] = ischeckfun(testArr2[i], "車柱 外觀檢查", "站名貼紙文字");

    // 2-6
    obj[i]["2-6"] = ischeckfun(
      testArr2[i],
      "車柱 外觀檢查",
      "太陽能面板  破裂 / 異常"
    );

    // 2-7
    obj[i]["2-7"] = ischeckfun(
      testArr2[i],
      "車柱 外觀檢查",
      "太陽能面板  水氣"
    );

    // 2-8
    obj[i]["2-8"] = ischeckfun(
      testArr2[i],
      "車柱 外觀檢查",
      "鎖體  面積10%生鏽"
    );

    // 2-9
    obj[i]["2-9"] = ischeckfun(
      testArr2[i],
      "車柱 功能檢查",
      "面板左下方燈光 未亮起"
    );

    // 2-10
    obj[i]["2-10"] = ischeckfun(testArr2[i], "車柱 功能檢查", "搖晃");

    // 2-11
    obj[i]["2-11"] = ischeckfun(testArr2[i], "車柱 功能檢查", "借還車不順");

    // 2-12
    const two_twelve_one = ischeckfun(testArr2[i], "還車導引槽", "缺漏");
    const two_twelve_two = ischeckfun(testArr2[i], "還車導引槽", "鬆動");
    const two_twelve = two_twelve_one + two_twelve_two;
    obj[i]["2-12"] = two_twelve >= 1 ? 1 : 0;

    // 2-13
    obj[i]["2-13"] = ischeckfun(
      testArr2[i],
      "車機機殼",
      "髒污／塗鴉／小廣告／褪色"
    );

    // 2-14
    obj[i]["2-14"] = ischeckfun(testArr2[i], "車機機殼", "破損／嚴重刮痕");

    // 2-15
    obj[i]["2-15"] = ischeckfun(
      testArr2[i],
      "車機機殼",
      "太陽能面板  產生氣泡"
    );

    // 2-16
    obj[i]["2-16"] = ischeckfun(
      testArr2[i],
      "車機功能",
      "借不出還不回／車機異常"
    );

    // 2-17
    obj[i]["2-17"] = ischeckfun(
      testArr2[i],
      "車機功能",
      "螢幕文字  無法正常顯示"
    );

    // 2-18
    obj[i]["2-18"] = ischeckfun(
      testArr2[i],
      "車機功能",
      "借、還車  無提示音、異常"
    );

    // 2-19
    obj[i]["2-19"] = ischeckfun(testArr2[i], "防轉彈簧／停車架", "彈簧脫落");

    // 2-20
    obj[i]["2-20"] = ischeckfun(
      testArr2[i],
      "防轉彈簧／停車架",
      "停車架起後，車輛無法站立"
    );

    // 2-21
    const two_twentyone_one = ischeckfun(
      testArr2[i],
      "置物籃貼紙",
      "前 車號、LOGO"
    );
    const two_twentyone_two = ischeckfun(
      testArr2[i],
      "置物籃貼紙",
      "後 使用說明"
    );
    const two_twentyone = two_twentyone_one + two_twentyone_two;
    obj[i]["2-21"] = two_twentyone >= 1 ? 1 : 0;

    // 2-22
    const two_twentytwo_one = ischeckfun(
      testArr2[i],
      "置物籃",
      "嚴重髒汙、沾黏"
    );
    const two_twentytwo_two = ischeckfun(testArr2[i], "置物籃", "垃圾");
    const two_twentytwo = two_twentytwo_one + two_twentytwo_two;
    obj[i]["2-22"] = two_twentytwo >= 1 ? 1 : 0;

    //2-23
    obj[i]["2-23"] = ischeckfun(
      testArr2[i],
      "置物籃",
      "破損 2根以上／缺固定螺絲／裝設歪斜"
    );

    // 2-24
    obj[i]["2-24"] = ischeckfun(
      testArr2[i],
      "置物籃",
      "鉸線頭固定座　上下皆破損"
    );

    // 2-25
    obj[i]["2-25"] = ischeckfun(testArr2[i], "置物籃", "鉸線破損／生鏽");

    // 2-26
    obj[i]["2-26"] = ischeckfun(testArr2[i], "外管完整", "蛇管  脫落／遺失");

    // 2-27
    obj[i]["2-27"] = ischeckfun(testArr2[i], "外管完整", "煞車外管");

    // 2-28
    obj[i]["2-28"] = ischeckfun(testArr2[i], "外管完整", "變速外管");

    // 2-29
    const two_twentynine_one = ischeckfun(
      testArr2[i],
      "把手貼紙",
      "左 騎乘前檢查"
    );
    const two_twentynine_two = ischeckfun(
      testArr2[i],
      "把手貼紙",
      "右 煞車提醒"
    );
    const two_twentynine = two_twentynine_one + two_twentynine_two;
    obj[i]["2-29"] = two_twentynine >= 1 ? 1 : 0;

    // 2-30
    obj[i]["2-30"] = ischeckfun(testArr2[i], "把手套", "黏潮、紋路磨損、破損");

    // 2-31
    obj[i]["2-31"] = ischeckfun(testArr2[i], "把手套", "髒汙  致無法使用");

    // 2-32
    obj[i]["2-32"] = ischeckfun(testArr2[i], "車鈴", "無法發出鈴聲");

    // 2-33
    obj[i]["2-33"] = ischeckfun(
      testArr2[i],
      "車鈴",
      "貼紙文字無法傳達完整訊息"
    );

    // 2-34
    obj[i]["2-34"] = ischeckfun(
      testArr2[i],
      "車體外觀",
      "車架 髒汙／小廣告／塗鴉"
    );

    // 2-35
    obj[i]["2-35"] = ischeckfun(testArr2[i], "車體外觀", "車架  掉漆");

    // 2-36
    obj[i]["2-36"] = ischeckfun(
      testArr2[i],
      "車體外觀",
      "前、後泥除  髒污／破損"
    );

    // 2-37
    const two_thirtyseven_one = ischeckfun(testArr2[i], "後泥除貼紙", "廣告");
    const two_thirtyseven_two = ischeckfun(
      testArr2[i],
      "後泥除貼紙",
      "YouBike Logo"
    );
    const two_thirtyseven = two_thirtyseven_one + two_thirtyseven_two;
    obj[i]["2-37"] = two_thirtyseven >= 1 ? 1 : 0;

    // 2-38
    obj[i]["2-38"] = ischeckfun(testArr2[i], "後泥除貼紙", "車號");

    //2-39
    obj[i]["2-39"] = ischeckfun(
      testArr2[i],
      "座管束子貼紙",
      "文字無法傳達完整訊息"
    );

    // 2-40
    obj[i]["2-40"] = ischeckfun(testArr2[i], "座墊", "拉高後搖晃");

    // 2-41
    obj[i]["2-41"] = ischeckfun(testArr2[i], "座墊", "歪斜");

    // 2-42
    obj[i]["2-42"] = ischeckfun(testArr2[i], "座墊", "與底部分離");

    // 2-43
    obj[i]["2-43"] = ischeckfun(testArr2[i], "座墊", "表面破損、龜裂");

    // 2-44
    obj[i]["2-44"] = ischeckfun(testArr2[i], "座墊", "髒汙導致無法騎乘");

    // 2-45
    obj[i]["2-45"] = ischeckfun(testArr2[i], "座墊桿", "高度調整不順");

    // 2-46
    obj[i]["2-46"] = ischeckfun(
      testArr2[i],
      "座墊桿",
      "伸縮座墊桿鎖死 ( 無法調整高度 )"
    );

    // 2-47
    obj[i]["2-47"] = ischeckfun(testArr2[i], "座墊桿", "黃色拉桿斷裂");

    // 2-48
    obj[i]["2-48"] = ischeckfun(testArr2[i], "座墊桿", "座墊桿滑落 無法固定");

    // 2-49
    obj[i]["2-49"] = ischeckfun(testArr2[i], "座墊桿", "反轉後無法固定位置");

    // 2-50
    obj[i]["2-50"] = ischeckfun(
      testArr2[i],
      "座墊桿",
      "座墊未在最底部就可反轉"
    );

    // 2-51
    obj[i]["2-51"] = ischeckfun(testArr2[i], "座墊桿", "座墊桿與車體分離");

    // 2-52
    obj[i]["2-52"] = ischeckfun(testArr2[i], "座墊桿", "座墊桿與車體分離");

    // 2-53
    obj[i]["2-53"] = ischeckfun(testArr2[i], "輪胎", "輪框變形、缺鋼絲");

    // 2-54
    obj[i]["2-54"] = ischeckfun(testArr2[i], "輪胎", "前 或 後輪偏擺");

    // 2-55
    obj[i]["2-55"] = ischeckfun(testArr2[i], "前後輪軸螺絲", "前");

    // 2-56
    obj[i]["2-56"] = ischeckfun(testArr2[i], "前後輪軸螺絲", "後");

    // 2-57
    obj[i]["2-57"] = ischeckfun(testArr2[i], "前／後燈", "前燈");
    // console.log(111, testArr2[i]);
    // 2-58
    obj[i]["2-58"] = ischeckfun(testArr2[i], "前／後燈", "後燈");

    // 2-59
    obj[i]["2-59"] = ischeckfun(
      testArr2[i],
      "前／後燈",
      "前燈線　未妥善固定或絕緣膠翹起"
    );

    // 2-60
    obj[i]["2-60"] = ischeckfun(testArr2[i], "煞車功能", "無法煞車");

    //2-61
    const two_sixtyone_one = ischeckfun(
      testArr2[i],
      "煞車功能",
      "煞車過鬆 ( 2/3仍無法煞停 )"
    );
    const two_sixtyone_two = ischeckfun(
      testArr2[i],
      "煞車功能",
      "煞車過緊 ( 未滿1/3已經煞停 )"
    );
    const two_sixtyone = two_sixtyone_one + two_sixtyone_two;
    obj[i]["2-61"] = two_sixtyone >= 1 ? 1 : 0;

    // 2-62
    obj[i]["2-62"] = ischeckfun(testArr2[i], "煞車功能", "異音");

    // 2-63
    obj[i]["2-63"] = ischeckfun(testArr2[i], "變速功能", "指示蓋 (銀) 脫落");

    // 2-64
    obj[i]["2-64"] = ischeckfun(
      testArr2[i],
      "變速功能",
      "上蓋 (黑) 脫落／檔位標示無法辨識"
    );

    // 2-65
    obj[i]["2-65"] = ischeckfun(
      testArr2[i],
      "變速功能",
      "換檔轉動不順 ( 2轉3過緊 )"
    );

    // 2-66
    obj[i]["2-66"] = ischeckfun(testArr2[i], "變速功能", "檔位無法定位");

    // 2-67
    obj[i]["2-67"] = ischeckfun(testArr2[i], "變速功能", "實際騎乘無法變速");

    // 2-68
    obj[i]["2-68"] = ischeckfun(
      testArr2[i],
      "隨車鎖",
      "貼紙文字無法傳達完整訊息"
    );

    // 2-69
    obj[i]["2-69"] = ischeckfun(testArr2[i], "隨車鎖", "鎖孔  生鏽／脫漆");

    // 2-70
    obj[i]["2-70"] = ischeckfun(testArr2[i], "隨車鎖", "上鎖／解鎖 失敗、異常");

    // 2-71
    obj[i]["2-71"] = ischeckfun(testArr2[i], "隨車鎖", "鎖體  面積10%生鏽");

    // 2-72
    obj[i]["2-72"] = ischeckfun(testArr2[i], "騎乘行進", "行進不順暢");

    // 2-73
    obj[i]["2-73"] = ischeckfun(testArr2[i], "騎乘行進", "異音");

    // 2-75
    const startrow = testArr2[i]["testtable"]["startrow"];
    const endrow = testArr2[i]["testtable"]["endrow"];
    obj[i]["2-75"] = rowcheck(startrow, endrow, 75);
    // 2-77
    obj[i]["2-77"] = rowcheck(startrow, endrow, 77);
    // 2-76
    obj[i]["2-76"] = rowcheck(startrow, endrow, 76);

    // 算異常台數
    for (const key in obj[i]) {
      if (obj[i][key]) {
        error2++;
        break;
      }
    }
  }
  //2.0異常台數
  // console.log("異常台數2.0", error2);
  // console.log(obj);

  //把它全部加總
  let total = {};
  for (let i = 0; i < obj.length; i++) {
    for (const key in obj[i]) {
      if (Object.prototype.hasOwnProperty.call(total, key)) {
        total[key] += obj[i][key];
      } else {
        total[key] = obj[i][key];
      }
    }
  }
  // console.log(obj);
  // console.log(total);
  //2.0E異常台數
  let error2E = 0;
  //這是2.0E2的
  const obj2 = [];
  // console.log(testArr2E);
  for (let i = 0; i < testArr2E.length; i++) {
    obj2.push({});

    // E-1

    const sec = parseInt(testArr2E[i]["testtable"]["canusec"]);
    const E_one_one = sec < 20 && sec >= 16 ? 1 : 0;
    const E_one_two = ischeckfun(testArr2E[i], "電量", "無顯示／未持續顯示");
    const E_one = E_one_one || E_one_two ? 1 : 0;
    obj2[i]["E-1"] = E_one;

    // console.log(testArr2E[i]);
    //E-2
    obj2[i]["E-2"] = ischeckfun(testArr2E[i], "電量", "電量低於30系統未鎖車")
      ? 1
      : 0;

    //E-4
    const E_four_one = ischeckfun(
      testArr2E[i],
      "前／後燈(暫停車輪靜止中)",
      "借出刷卡、臨停解鎖即亮【未即亮勾選】"
    );

    // console.log(testArr2E[i]);
    const E_four_two = ischeckfun(
      testArr2E[i],
      "前／後燈(暫停車輪靜止中)",
      "歸還靠柱、臨停上鎖即滅【未滅勾選】"
    );
    const E_four = E_four_one || E_four_two ? 1 : 0;
    obj2[i]["E-4"] = E_four;

    // E-5
    const E_five_one = ischeckfun(
      testArr2E[i],
      "前／後燈(暫停車輪靜止中)",
      "借出後應恆亮【閃爍、時滅時亮勾選】"
    );
    obj2[i]["E-5"] = E_five_one ? 1 : 0;

    // E-6
    const E_six_one = ischeckfun(testArr2E[i], "費率貼紙", "無貼紙");
    obj2[i]["E-6"] = E_six_one ? 1 : 0;

    //E-7
    const E_seven_one = ischeckfun(testArr2E[i], "費率貼紙", "舊版");
    const E_seven_two = ischeckfun(testArr2E[i], "費率貼紙", "破損");
    const E_seven = E_seven_one + E_seven_two;
    obj2[i]["E-7"] = E_seven ? 1 : 0;

    // E-8
    const E_eight = ischeckfun(testArr2E[i], "作動", "騎行踩動時 無動力推進");
    obj2[i]["E-8"] = E_eight ? 1 : 0;

    // E-9
    const E_nine = ischeckfun(testArr2E[i], "作動", "停車靜止時 有動力推進");
    obj2[i]["E-9"] = E_nine ? 1 : 0;

    // E-10
    const E_ten = ischeckfun(testArr2E[i], "車速", "無 車速測片 或 感應片");
    obj2[i]["E-10"] = E_ten ? 1 : 0;

    //E-11
    const E_eleven_one = ischeckfun(
      testArr2E[i],
      "車速",
      "車機面板 無車速顯示／顯示閃爍"
    );
    const E_eleven_two = ischeckfun(
      testArr2E[i],
      "車速",
      "車機面板 靜止時顯示車輛車速非0"
    );
    const E_eleven = E_eleven_one + E_eleven_two;
    obj2[i]["E-11"] = E_eleven ? 1 : 0;

    // 2-A
    obj2[i]["2-A"] = stationAndBikeCheck(testArr2E[i], stationArr2).includes(
      "歪斜、損毀"
    )
      ? 1
      : 0;

    // 2-B
    obj2[i]["2-B"] = stationAndBikeCheck(testArr2E[i], stationArr2).includes(
      "漏缺"
    )
      ? 1
      : 0;

    // 2-1
    const two_one_one = isWithin30Days(
      testArr2E[i]["testtable"]["date"],
      testArr2E[i]["test_date"]
    );
    const two_one_two = 0;
    const two_one_three = ischeckfun(testArr2E[i], "一級檢修貼紙", "無貼紙");
    const two_one_four = ischeckfun(
      testArr2E[i],
      "一級檢修貼紙",
      "無法辨識／資訊不完整"
    );

    const two_one_five = ischeckfun(
      testArr2E[i],
      "一級檢修貼紙",
      "未撕除舊貼紙"
    );
    const two_one =
      two_one_one + two_one_two + two_one_three + two_one_four + two_one_five;
    obj2[i]["2-1"] = two_one >= 1 ? 1 : 0;

    // 2-2
    const two_two_one = ischeckfun(testArr2E[i], "車柱 周遭環境", "車柱");
    const two_two_two = ischeckfun(testArr2E[i], "車柱 周遭環境", "基板");
    const two_two = two_two_one + two_two_two;
    obj2[i]["2-2"] = two_two >= 1 ? 1 : 0;

    // 2-3
    const two_three_one = ischeckfun(testArr2E[i], "車柱 周遭環境", "垃圾");
    const two_three = two_three_one;
    obj2[i]["2-3"] = two_three >= 1 ? 1 : 0;

    // 2-4
    const two_four_one = ischeckfun(testArr2E[i], "車柱 外觀檢查", "柱號貼紙");
    const two_four = two_four_one;
    obj2[i]["2-4"] = two_four >= 1 ? 1 : 0;

    // 2-5
    obj2[i]["2-5"] = ischeckfun(testArr2E[i], "車柱 外觀檢查", "站名貼紙文字");

    // 2-6
    obj2[i]["2-6"] = ischeckfun(
      testArr2E[i],
      "車柱 外觀檢查",
      "太陽能面板  破裂 / 異常"
    );

    // 2-7
    obj2[i]["2-7"] = ischeckfun(
      testArr2E[i],
      "車柱 外觀檢查",
      "太陽能面板  水氣"
    );

    // 2-8
    obj2[i]["2-8"] = ischeckfun(
      testArr2E[i],
      "車柱 外觀檢查",
      "鎖體  面積10%生鏽"
    );

    // 2-9
    obj2[i]["2-9"] = ischeckfun(
      testArr2E[i],
      "車柱 功能檢查",
      "面板左下方燈光 未亮起"
    );

    // 2-10
    obj2[i]["2-10"] = ischeckfun(testArr2E[i], "車柱 功能檢查", "搖晃");

    // 2-11
    obj2[i]["2-11"] = ischeckfun(testArr2E[i], "車柱 功能檢查", "借還車不順");

    // 2-12
    const two_twelve_one = ischeckfun(testArr2E[i], "還車導引槽", "缺漏");
    const two_twelve_two = ischeckfun(testArr2E[i], "還車導引槽", "鬆動");
    const two_twelve = two_twelve_one + two_twelve_two;
    obj2[i]["2-12"] = two_twelve >= 1 ? 1 : 0;

    // 2-13
    obj2[i]["2-13"] = ischeckfun(
      testArr2E[i],
      "車機機殼",
      "髒污／塗鴉／小廣告／褪色"
    );

    // 2-14
    obj2[i]["2-14"] = ischeckfun(testArr2E[i], "車機機殼", "破損／嚴重刮痕");

    // 2-15
    obj2[i]["2-15"] = ischeckfun(
      testArr2E[i],
      "車機機殼",
      "太陽能面板  產生氣泡"
    );

    // 2-16
    obj2[i]["2-16"] = ischeckfun(
      testArr2E[i],
      "車機功能",
      "借不出還不回／車機異常"
    );

    // 2-17
    obj2[i]["2-17"] = ischeckfun(
      testArr2E[i],
      "車機功能",
      "螢幕文字  無法正常顯示"
    );

    // 2-18
    obj2[i]["2-18"] = ischeckfun(
      testArr2E[i],
      "車機功能",
      "借、還車  無提示音、異常"
    );

    // 2-19
    obj2[i]["2-19"] = ischeckfun(testArr2E[i], "防轉彈簧／停車架", "彈簧脫落");

    // 2-20
    obj2[i]["2-20"] = ischeckfun(
      testArr2E[i],
      "防轉彈簧／停車架",
      "停車架起後，車輛無法站立"
    );

    // 2-21
    const two_twentyone_one = ischeckfun(
      testArr2E[i],
      "置物籃貼紙",
      "前 車號、LOGO"
    );
    const two_twentyone_two = ischeckfun(
      testArr2E[i],
      "置物籃貼紙",
      "後 使用說明"
    );
    const two_twentyone = two_twentyone_one + two_twentyone_two;
    obj2[i]["2-21"] = two_twentyone >= 1 ? 1 : 0;

    // 2-22
    const two_twentytwo_one = ischeckfun(
      testArr2E[i],
      "置物籃",
      "嚴重髒汙、沾黏"
    );
    const two_twentytwo_two = ischeckfun(testArr2E[i], "置物籃", "垃圾");
    const two_twentytwo = two_twentytwo_one + two_twentytwo_two;
    obj2[i]["2-22"] = two_twentytwo >= 1 ? 1 : 0;

    //2-23
    obj2[i]["2-23"] = ischeckfun(
      testArr2E[i],
      "置物籃",
      "破損 2根以上／缺固定螺絲／裝設歪斜"
    );

    // 2-24
    obj2[i]["2-24"] = ischeckfun(
      testArr2E[i],
      "置物籃",
      "鉸線頭固定座　上下皆破損"
    );

    // 2-25
    obj2[i]["2-25"] = ischeckfun(testArr2E[i], "置物籃", "鉸線破損／生鏽");

    // 2-26
    obj2[i]["2-26"] = ischeckfun(testArr2E[i], "外管完整", "蛇管  脫落／遺失");

    // 2-27
    obj2[i]["2-27"] = ischeckfun(testArr2E[i], "外管完整", "煞車外管");

    // 2-28
    obj2[i]["2-28"] = ischeckfun(testArr2E[i], "外管完整", "變速外管");

    // 2-29
    const two_twentynine_one = ischeckfun(
      testArr2E[i],
      "把手貼紙",
      "左 騎乘前檢查"
    );
    const two_twentynine_two = ischeckfun(
      testArr2E[i],
      "把手貼紙",
      "右 煞車提醒"
    );
    const two_twentynine = two_twentynine_one + two_twentynine_two;
    obj2[i]["2-29"] = two_twentynine >= 1 ? 1 : 0;

    // 2-30
    obj2[i]["2-30"] = ischeckfun(
      testArr2E[i],
      "把手套",
      "黏潮、紋路磨損、破損"
    );

    // 2-31
    obj2[i]["2-31"] = ischeckfun(testArr2E[i], "把手套", "髒汙  致無法使用");

    // 2-32
    obj2[i]["2-32"] = ischeckfun(testArr2E[i], "車鈴", "無法發出鈴聲");

    // 2-33
    obj2[i]["2-33"] = ischeckfun(
      testArr2E[i],
      "車鈴",
      "貼紙文字無法傳達完整訊息"
    );

    // 2-34
    obj2[i]["2-34"] = ischeckfun(
      testArr2E[i],
      "車體外觀",
      "車架 髒汙／小廣告／塗鴉"
    );

    // 2-35
    obj2[i]["2-35"] = ischeckfun(testArr2E[i], "車體外觀", "車架  掉漆");

    // 2-36
    obj2[i]["2-36"] = ischeckfun(
      testArr2E[i],
      "車體外觀",
      "前、後泥除  髒污／破損"
    );

    // 2-37
    const two_thirtyseven_one = ischeckfun(testArr2E[i], "後泥除貼紙", "廣告");
    const two_thirtyseven_two = ischeckfun(
      testArr2E[i],
      "後泥除貼紙",
      "YouBike Logo"
    );
    const two_thirtyseven = two_thirtyseven_one + two_thirtyseven_two;
    obj2[i]["2-37"] = two_thirtyseven >= 1 ? 1 : 0;

    // 2-38
    obj2[i]["2-38"] = ischeckfun(testArr2E[i], "後泥除貼紙", "車號");

    // 2-38
    obj2[i]["E-12"] = ischeckfun(testArr2E[i], "後泥除貼紙", "內有電池");

    //2-39
    obj2[i]["2-39"] = ischeckfun(
      testArr2E[i],
      "座管束子貼紙",
      "文字無法傳達完整訊息"
    );

    // console.log(testArr2E[i]);。
    // 2-40
    obj2[i]["2-40"] = ischeckfun(testArr2E[i], "座墊", "搖晃");

    // 2-41
    obj2[i]["2-41"] = ischeckfun(testArr2E[i], "座墊", "歪斜");

    // 2-42
    obj2[i]["2-42"] = ischeckfun(testArr2E[i], "座墊", "與底部分離");

    // 2-43
    obj2[i]["2-43"] = ischeckfun(testArr2E[i], "座墊", "表面破損、龜裂");

    // 2-44
    obj2[i]["2-44"] = ischeckfun(testArr2E[i], "座墊", "髒汙導致無法騎乘");

    // 2-45
    obj2[i]["2-45"] = ischeckfun(testArr2E[i], "座墊桿", "高度調整不順");

    // 2-46
    obj2[i]["2-46"] = ischeckfun(
      testArr2E[i],
      "座墊桿",
      "伸縮座墊桿鎖死 ( 無法調整高度 )"
    );

    // 2-47
    obj2[i]["2-47"] = ischeckfun(testArr2E[i], "座墊桿", "黃色拉桿斷裂");

    // 2-48
    obj2[i]["2-48"] = ischeckfun(testArr2E[i], "座墊桿", "座墊桿滑落 無法固定");

    // 2-49
    obj2[i]["2-49"] = ischeckfun(testArr2E[i], "座墊桿", "反轉後無法固定位置");

    // 2-50
    obj2[i]["2-50"] = ischeckfun(
      testArr2E[i],
      "座墊桿",
      "座墊未在最底部就可反轉"
    );

    // 2-51
    obj2[i]["2-51"] = ischeckfun(testArr2E[i], "座墊桿", "座墊桿與車體分離");

    // 2-52
    obj2[i]["2-52"] = ischeckfun(testArr2E[i], "座墊桿", "座墊桿與車體分離");

    // 2-53
    obj2[i]["2-53"] = ischeckfun(testArr2E[i], "輪胎", "輪框變形、缺鋼絲");

    // 2-54
    obj2[i]["2-54"] = ischeckfun(testArr2E[i], "輪胎", "前 或 後輪偏擺");

    // 2-55
    obj2[i]["2-55"] = ischeckfun(testArr2E[i], "前後輪軸螺絲", "前");

    // 2-56
    obj2[i]["2-56"] = ischeckfun(testArr2E[i], "前後輪軸螺絲", "後");

    // 2-57
    obj2[i]["2-57"] = ischeckfun(
      testArr2E[i],
      "前／後燈(行進車輪轉動中)",
      "前燈"
    );

    // 2-58
    obj2[i]["2-58"] = ischeckfun(
      testArr2E[i],
      "前／後燈(行進車輪轉動中)",
      "後燈"
    );

    // 2-59
    obj2[i]["2-59"] = ischeckfun(
      testArr2E[i],
      "前／後燈(行進車輪轉動中)",
      "前燈線　未妥善固定或絕緣膠翹起"
    );

    // 2-60
    obj2[i]["2-60"] = ischeckfun(testArr2E[i], "煞車功能", "無法煞車");

    //2-61
    const two_sixtyone_one = ischeckfun(
      testArr2E[i],
      "煞車功能",
      "煞車過鬆 ( 2/3仍無法煞停 )"
    );
    const two_sixtyone_two = ischeckfun(
      testArr2E[i],
      "煞車功能",
      "煞車過緊 ( 未滿1/3已經煞停 )"
    );
    const two_sixtyone = two_sixtyone_one + two_sixtyone_two;
    obj2[i]["2-61"] = two_sixtyone >= 1 ? 1 : 0;

    // 2-62
    obj2[i]["2-62"] = ischeckfun(testArr2E[i], "煞車功能", "異音");

    // 2-63
    obj2[i]["2-63"] = ischeckfun(testArr2E[i], "變速功能", "指示蓋 (銀) 脫落");

    // 2-64
    obj2[i]["2-64"] = ischeckfun(
      testArr2E[i],
      "變速功能",
      "上蓋 (黑) 脫落／檔位標示無法辨識"
    );

    // 2-65
    obj2[i]["2-65"] = ischeckfun(
      testArr2E[i],
      "變速功能",
      "換檔轉動不順 ( 2轉3過緊 )"
    );

    // 2-66
    obj2[i]["2-66"] = ischeckfun(testArr2E[i], "變速功能", "檔位無法定位");

    // 2-67
    obj2[i]["2-67"] = ischeckfun(testArr2E[i], "變速功能", "實際騎乘無法變速");

    // 2-68
    obj2[i]["2-68"] = ischeckfun(
      testArr2E[i],
      "隨車鎖",
      "貼紙文字無法傳達完整訊息"
    );

    // 2-69
    obj2[i]["2-69"] = ischeckfun(testArr2E[i], "隨車鎖", "鎖孔  生鏽／脫漆");

    // 2-70
    obj2[i]["2-70"] = ischeckfun(
      testArr2E[i],
      "隨車鎖",
      "上鎖／解鎖 失敗、異常"
    );

    // 2-71
    obj2[i]["2-71"] = ischeckfun(testArr2E[i], "隨車鎖", "鎖體  面積10%生鏽");

    // 2-72
    obj2[i]["2-72"] = ischeckfun(testArr2E[i], "騎乘行進", "行進不順暢");

    // 2-73
    obj2[i]["2-73"] = ischeckfun(testArr2E[i], "騎乘行進", "異音");

    // 2-75
    const startrow = testArr2E[i]["testtable"]["startrow"];
    const endrow = testArr2E[i]["testtable"]["endrow"];
    obj2[i]["2-75"] = rowcheck(startrow, endrow, 75);
    // 2-77
    obj2[i]["2-77"] = rowcheck(startrow, endrow, 77);
    // 2-76
    obj2[i]["2-76"] = rowcheck(startrow, endrow, 76);
    //算異常台數
    for (const key in obj2[i]) {
      if (obj2[i][key]) {
        // console.log(testArr2E[i]);
        // console.log(obj2[i]);
        error2E++;
        break;
      }
    }
  }

  // console.log("2.0E異常台數", error2E);

  // console.log("總異常台數", error2 + error2E);
  // console.log(obj2)

  let total2 = {};
  for (let i = 0; i < obj2.length; i++) {
    for (const key in obj2[i]) {
      if (Object.prototype.hasOwnProperty.call(total2, key)) {
        total2[key] += obj2[i][key];
      } else {
        total2[key] = obj2[i][key];
      }
    }
  }

  // console.log(obj2);
  const total3 = { ...total };
  // 把頭拔掉
  total3["2-A"] = total["2-A"] + total2["2-A"];
  total3["2-B"] = total["2-B"] + total2["2-B"];
  total3["2-3"] = total["2-3"] + total2["2-3"];
  total3["2-2"] = total["2-2"] + total2["2-2"];
  total3["2-4"] = total["2-4"] + total2["2-4"];
  total3["2-5"] = total["2-5"] + total2["2-5"];
  total3["2-6"] = total["2-6"] + total2["2-6"];
  total3["2-7"] = total["2-7"] + total2["2-7"];
  total3["2-9"] = total["2-9"] + total2["2-9"];
  total3["2-10"] = total["2-10"] + total2["2-10"];
  total3["2-8"] = total["2-8"] + total2["2-8"];
  total3["2-11"] = total["2-11"] + total2["2-11"];
  total3["2-12"] = total["2-12"] + total2["2-12"];

  // console.log(total3);

  const total4 = { ...total2 };
  // 2.0E的頭變0
  total4["2-A"] = 0;
  total4["2-B"] = 0;
  total4["2-3"] = 0;
  total4["2-2"] = 0;
  total4["2-4"] = 0;
  total4["2-5"] = 0;
  total4["2-6"] = 0;
  total4["2-7"] = 0;
  total4["2-9"] = 0;
  total4["2-10"] = 0;
  total4["2-8"] = 0;
  total4["2-11"] = 0;
  total4["2-12"] = 0;

  // console.log(total4);
  // //A的加總個數
  const A = (obj) => {
    const newobj = {};
    newobj["2-A"] = obj["2-A"];
    newobj["2-B"] = obj["2-B"];
    newobj["2-3"] = obj["2-3"];
    newobj["2-2"] = obj["2-2"];
    newobj["2-4"] = obj["2-4"];
    newobj["2-5"] = obj["2-5"];
    newobj["2-6"] = obj["2-6"];
    newobj["2-7"] = obj["2-7"];
    newobj["2-9"] = obj["2-9"];
    newobj["2-10"] = obj["2-10"];
    newobj["2-8"] = obj["2-8"];
    newobj["2-11"] = obj["2-11"];
    newobj["2-12"] = obj["2-12"];
    return newobj;
  };
  // // //B的加總個數
  const B = (obj) => {
    const newobj = {};
    newobj["2-1"] = obj["2-1"];
    newobj["2-13"] = obj["2-13"];
    newobj["2-14"] = obj["2-14"];
    newobj["2-18"] = obj["2-18"];
    newobj["2-21"] = obj["2-21"];
    newobj["2-22"] = obj["2-22"];
    newobj["2-23"] = obj["2-23"];
    newobj["2-24"] = obj["2-24"];
    newobj["2-25"] = obj["2-25"];
    newobj["2-26"] = obj["2-26"];
    newobj["2-29"] = obj["2-29"];
    newobj["2-33"] = obj["2-33"];
    newobj["2-30"] = obj["2-30"];
    newobj["2-31"] = obj["2-31"];
    newobj["2-34"] = obj["2-34"];
    newobj["2-36"] = obj["2-36"];
    newobj["2-35"] = obj["2-35"];
    newobj["2-37"] = obj["2-37"];
    newobj["2-38"] = obj["2-38"];
    newobj["2-39"] = obj["2-39"];
    newobj["2-42"] = obj["2-42"];
    newobj["2-43"] = obj["2-43"];
    newobj["2-44"] = obj["2-44"];
    newobj["2-56"] = obj["2-56"];
    newobj["2-55"] = obj["2-55"];
    newobj["2-59"] = obj["2-59"];
    newobj["2-68"] = obj["2-68"];
    newobj["2-69"] = obj["2-69"];
    newobj["2-71"] = obj["2-71"];

    return newobj;
  };
  // //C的加總個數
  const C = (obj) => {
    const newobj = {};

    newobj["2-15"] = obj["2-15"];
    newobj["2-16"] = obj["2-16"];
    newobj["2-17"] = obj["2-17"];
    newobj["2-19"] = obj["2-19"];
    newobj["2-20"] = obj["2-20"];
    newobj["2-27"] = obj["2-27"];
    newobj["2-28"] = obj["2-28"];
    newobj["2-32"] = obj["2-32"];
    newobj["2-40"] = obj["2-40"];
    newobj["2-41"] = obj["2-41"];
    newobj["2-45"] = obj["2-45"];
    newobj["2-46"] = obj["2-46"];
    newobj["2-47"] = obj["2-47"];
    newobj["2-48"] = obj["2-48"];
    newobj["2-49"] = obj["2-49"];
    newobj["2-51"] = obj["2-51"];
    newobj["2-50"] = obj["2-50"];
    newobj["2-52"] = obj["2-52"];
    newobj["2-53"] = obj["2-53"];
    newobj["2-54"] = obj["2-54"];
    newobj["2-57"] = obj["2-57"];
    newobj["2-58"] = obj["2-58"];
    newobj["2-60"] = obj["2-60"];
    newobj["2-61"] = obj["2-61"];
    newobj["2-62"] = obj["2-62"];
    newobj["2-63"] = obj["2-63"];
    newobj["2-64"] = obj["2-64"];
    newobj["2-65"] = obj["2-65"];
    newobj["2-66"] = obj["2-66"];
    newobj["2-67"] = obj["2-67"];
    newobj["2-70"] = obj["2-70"];
    newobj["2-72"] = obj["2-72"];
    newobj["2-73"] = obj["2-73"];
    newobj["2-75"] = obj["2-75"];
    newobj["2-77"] = obj["2-77"];
    newobj["2-76"] = obj["2-76"];
    return newobj;
  };

  // 2.0場站總數 (新北台北桃園苗栗...)
  // const testdataLength = testArr2.length;

  // // //A的乘積加總
  function SUMPRODUCTA(A) {
    let sumprouct = 0;
    sumprouct += A["2-A"] * -4;
    sumprouct += A["2-B"] * -10;
    sumprouct += A["2-3"] * -6;
    sumprouct += A["2-2"] * -6;
    sumprouct += A["2-4"] * -4;
    sumprouct += A["2-5"] * -4;
    sumprouct += A["2-6"] * -10;
    sumprouct += A["2-7"] * 0;
    sumprouct += A["2-9"] * -4;
    sumprouct += A["2-10"] * -10;
    sumprouct += A["2-8"] * -4;
    sumprouct += A["2-11"] * -10;
    sumprouct += A["2-12"] * -4;
    return sumprouct;
  }
  // // //B的乘積加總
  function SUMPRODUCTB(B) {
    let sumprouct = 0;
    sumprouct += B["2-1"] * -4;
    sumprouct += B["2-13"] * -6;
    sumprouct += B["2-14"] * -6;
    sumprouct += B["2-18"] * -4;
    sumprouct += B["2-21"] * -4;
    sumprouct += B["2-22"] * -6;
    sumprouct += B["2-23"] * -6;
    sumprouct += B["2-24"] * -4;
    sumprouct += B["2-25"] * -4;
    sumprouct += B["2-26"] * -6;
    sumprouct += B["2-29"] * -6;
    sumprouct += B["2-33"] * -4;
    sumprouct += B["2-30"] * -6;
    sumprouct += B["2-31"] * -20;
    sumprouct += B["2-34"] * -6;
    sumprouct += B["2-36"] * -6;
    sumprouct += B["2-35"] * 0;
    sumprouct += B["2-37"] * -6;
    sumprouct += B["2-38"] * -4;
    sumprouct += B["2-39"] * -6;
    sumprouct += B["2-42"] * -6;
    sumprouct += B["2-43"] * -10;
    sumprouct += B["2-44"] * -10;
    sumprouct += B["2-56"] * -4;
    sumprouct += B["2-55"] * -4;
    sumprouct += B["2-59"] * -6;
    sumprouct += B["2-68"] * -10;
    sumprouct += B["2-69"] * 0;
    sumprouct += B["2-71"] * -6;
    return sumprouct;
  }
  // //C的乘積加總
  function SUMPRODUCTC(C) {
    let sumprouct = 0;
    sumprouct += C["2-15"] * 0;
    sumprouct += C["2-16"] * -20;
    sumprouct += C["2-17"] * -10;
    sumprouct += C["2-19"] * -10;
    sumprouct += C["2-20"] * -6;
    sumprouct += C["2-27"] * -6;
    sumprouct += C["2-28"] * -6;
    sumprouct += C["2-32"] * -10;
    sumprouct += C["2-40"] * -10;
    sumprouct += C["2-41"] * -10;
    sumprouct += C["2-45"] * -10;
    sumprouct += C["2-46"] * -10;
    sumprouct += C["2-47"] * -10;
    sumprouct += C["2-48"] * -20;
    sumprouct += C["2-49"] * -4;
    sumprouct += C["2-51"] * -20;
    sumprouct += C["2-50"] * -20;
    sumprouct += C["2-52"] * -6;
    sumprouct += C["2-53"] * -10;
    sumprouct += C["2-54"] * -6;
    sumprouct += C["2-57"] * -10;
    sumprouct += C["2-58"] * -10;
    sumprouct += C["2-60"] * -10;
    sumprouct += C["2-61"] * -10;
    sumprouct += C["2-62"] * -6;
    sumprouct += C["2-63"] * -6;
    sumprouct += C["2-64"] * -10;
    sumprouct += C["2-66"] * -10;
    sumprouct += C["2-67"] * -10;
    sumprouct += C["2-70"] * -10;
    sumprouct += C["2-72"] * -6;
    sumprouct += C["2-73"] * -6;
    sumprouct += C["2-75"] * -10;
    //75+77
    sumprouct += C["2-76"] * -6;
    sumprouct += C["2-77"] * -10;

    return sumprouct;
  }

  // //總分
  const totalPoint = parseInt(
    (100 * testArr2.length +
      (SUMPRODUCTA(A(total3)) +
        SUMPRODUCTB(B(total3)) +
        SUMPRODUCTC(C(total3)))) /
      testArr2.length
  );

  // console.log("2.0總分", totalPoint);

  // 2.0E分數計算

  // //A的加總個數

  // // //B的加總個數
  const BE = (obj) => {
    const newobj = {};
    newobj["2-1"] = obj["2-1"];
    newobj["2-13"] = obj["2-13"];
    newobj["2-14"] = obj["2-14"];
    newobj["2-18"] = obj["2-18"];
    newobj["2-21"] = obj["2-21"];
    newobj["2-22"] = obj["2-22"];
    newobj["2-23"] = obj["2-23"];
    newobj["2-24"] = obj["2-24"];
    newobj["2-25"] = obj["2-25"];
    newobj["2-26"] = obj["2-26"];
    newobj["2-29"] = obj["2-29"];
    newobj["2-33"] = obj["2-33"];
    newobj["2-30"] = obj["2-30"];
    newobj["2-31"] = obj["2-31"];
    newobj["2-34"] = obj["2-34"];
    newobj["2-36"] = obj["2-36"];
    newobj["2-35"] = obj["2-35"];
    newobj["2-37"] = obj["2-37"];
    newobj["2-38"] = obj["2-38"];
    newobj["2-39"] = obj["2-39"];
    newobj["2-42"] = obj["2-42"];
    newobj["2-43"] = obj["2-43"];
    newobj["2-44"] = obj["2-44"];
    newobj["2-56"] = obj["2-56"];
    newobj["2-55"] = obj["2-55"];
    newobj["2-59"] = obj["2-59"];
    newobj["2-68"] = obj["2-68"];
    newobj["2-69"] = obj["2-69"];
    newobj["2-71"] = obj["2-71"];
    newobj["E-1"] = obj["E-1"];
    newobj["E-6"] = obj["E-6"];
    newobj["E-7"] = obj["E-7"];

    return newobj;
  };
  // //C的加總個數
  const CE = (obj) => {
    const newobj = {};

    newobj["2-15"] = obj["2-15"];
    newobj["2-16"] = obj["2-16"];
    newobj["2-17"] = obj["2-17"];
    newobj["2-19"] = obj["2-19"];
    newobj["2-20"] = obj["2-20"];
    newobj["2-27"] = obj["2-27"];
    newobj["2-28"] = obj["2-28"];
    newobj["2-32"] = obj["2-32"];
    newobj["2-40"] = obj["2-40"];
    newobj["2-41"] = obj["2-41"];
    newobj["2-45"] = obj["2-45"];
    newobj["2-46"] = obj["2-46"];
    newobj["2-47"] = obj["2-47"];
    newobj["2-48"] = obj["2-48"];
    newobj["2-49"] = obj["2-49"];
    newobj["2-51"] = obj["2-51"];
    newobj["2-50"] = obj["2-50"];
    newobj["2-52"] = obj["2-52"];
    newobj["2-53"] = obj["2-53"];
    newobj["2-54"] = obj["2-54"];
    newobj["2-57"] = obj["2-57"];
    newobj["2-58"] = obj["2-58"];
    newobj["2-60"] = obj["2-60"];
    newobj["2-61"] = obj["2-61"];
    newobj["2-62"] = obj["2-62"];
    newobj["2-63"] = obj["2-63"];
    newobj["2-64"] = obj["2-64"];
    newobj["2-65"] = obj["2-65"];
    newobj["2-66"] = obj["2-66"];
    newobj["2-67"] = obj["2-67"];
    newobj["2-70"] = obj["2-70"];
    newobj["2-72"] = obj["2-72"];
    newobj["2-73"] = obj["2-73"];
    newobj["2-75"] = obj["2-75"];
    newobj["2-77"] = obj["2-77"];
    newobj["2-76"] = obj["2-76"];

    newobj["E-2"] = obj["E-2"];
    newobj["E-4"] = obj["E-4"];
    newobj["E-5"] = obj["E-5"];
    newobj["E-8"] = obj["E-8"];
    newobj["E-9"] = obj["E-9"];
    newobj["E-10"] = obj["E-10"];
    newobj["E-11"] = obj["E-11"];
    return newobj;
  };

  // console.log(BE(total4), CE(total4));

  const D = (total) => {
    return totalfun(A(total)) + totalfun(B(total)) + totalfun(C(total));
  };

  const DE = (total) => {
    return totalfun(A(total)) + totalfun(BE(total)) + totalfun(CE(total));
  };

  const DEE = (total) => {
    return totalfun(BE(total)) + totalfun(CE(total));
  };

  // console.log(DEE(total4));

  // 2.0場站總數 (新北台北桃園苗栗...)
  // const testdataLength = testArr2.length;

  // // //B的乘積加總
  function SUMPRODUCTBE(B) {
    let sumprouct = 0;
    sumprouct += B["2-1"] * -4;
    sumprouct += B["2-13"] * -6;
    sumprouct += B["2-14"] * -6;
    sumprouct += B["2-18"] * -4;
    sumprouct += B["2-21"] * -4;
    sumprouct += B["2-22"] * -6;
    sumprouct += B["2-23"] * -6;
    sumprouct += B["2-24"] * -4;
    sumprouct += B["2-25"] * -4;
    sumprouct += B["2-26"] * -6;
    sumprouct += B["2-29"] * -6;
    sumprouct += B["2-33"] * -4;
    sumprouct += B["2-30"] * -6;
    sumprouct += B["2-31"] * -20;
    sumprouct += B["2-34"] * -6;
    sumprouct += B["2-36"] * -6;
    sumprouct += B["2-35"] * 0;
    sumprouct += B["2-37"] * -6;
    sumprouct += B["2-38"] * -4;
    sumprouct += B["2-39"] * -6;
    sumprouct += B["2-42"] * -6;
    sumprouct += B["2-43"] * -10;
    sumprouct += B["2-44"] * -10;
    sumprouct += B["2-56"] * -4;
    sumprouct += B["2-55"] * -4;
    sumprouct += B["2-59"] * -6;
    sumprouct += B["2-68"] * -10;
    sumprouct += B["2-69"] * 0;
    sumprouct += B["2-71"] * -6;

    sumprouct += B["E-1"] * -4;
    sumprouct += B["E-6"] * -6;
    sumprouct += B["E-7"] * -4;

    return sumprouct;
  }
  // //C的乘積加總
  function SUMPRODUCTCE(C) {
    let sumprouct = 0;
    sumprouct += C["2-15"] * 0;
    sumprouct += C["2-16"] * -20;
    sumprouct += C["2-17"] * -10;
    sumprouct += C["2-19"] * -10;
    sumprouct += C["2-20"] * -6;
    sumprouct += C["2-27"] * -6;
    sumprouct += C["2-28"] * -6;
    sumprouct += C["2-32"] * -10;
    sumprouct += C["2-40"] * -10;
    sumprouct += C["2-41"] * -10;
    sumprouct += C["2-45"] * -10;
    sumprouct += C["2-46"] * -10;
    sumprouct += C["2-47"] * -10;
    sumprouct += C["2-48"] * -20;
    sumprouct += C["2-49"] * -4;
    sumprouct += C["2-51"] * -20;
    sumprouct += C["2-50"] * -20;
    sumprouct += C["2-52"] * -6;
    sumprouct += C["2-53"] * -10;
    sumprouct += C["2-54"] * -6;
    sumprouct += C["2-57"] * -10;
    sumprouct += C["2-58"] * -10;
    sumprouct += C["2-60"] * -10;
    sumprouct += C["2-61"] * -10;
    sumprouct += C["2-62"] * -6;
    sumprouct += C["2-63"] * -6;
    sumprouct += C["2-64"] * -10;
    sumprouct += C["2-66"] * -10;
    sumprouct += C["2-67"] * -10;
    sumprouct += C["2-70"] * -10;
    sumprouct += C["2-72"] * -6;
    sumprouct += C["2-73"] * -6;
    sumprouct += C["2-75"] * -10;
    //75+77
    sumprouct += C["2-76"] * -6;
    sumprouct += C["2-77"] * -10;

    sumprouct += C["E-2"] * -10;
    sumprouct += C["E-4"] * -4;
    sumprouct += C["E-5"] * -6;
    sumprouct += C["E-8"] * -10;
    sumprouct += C["E-9"] * -20;
    sumprouct += C["E-10"] * -10;
    sumprouct += C["E-11"] * -6;
    return sumprouct;
  }

  // console.log(SUMPRODUCTBE(BE(total4)), SUMPRODUCTCE(CE(total4)))

  // //總分
  const totalPointE = parseInt(
    (100 * testArr2E.length +
      (SUMPRODUCTBE(BE(total4)) + SUMPRODUCTCE(CE(total4)))) /
      testArr2E.length
  );

  // console.log("2.0E總分", totalPointE);

  //以下是算2.0+2.0E

  const total5 = {};

  for (let key in total) {
    if (Object.hasOwnProperty.call(total, key)) {
      total5[key] = total[key];
    }
  }

  // 將 total2 的鍵值對加到 total5 中，如果鍵已存在，則相加，否則直接新增
  for (let key in total2) {
    if (Object.hasOwnProperty.call(total2, key)) {
      if (Object.hasOwnProperty.call(total5, key)) {
        total5[key] = (total5[key] || 0) + total2[key];
      } else {
        total5[key] = total2[key];
      }
    }
  }

  const stationNum1 = stationArr2.length;
  //抽驗總在戰車輛數
  const stationNum2 = stationArr2.reduce((accumulator, currentValue) => {
    return accumulator + currentValue["carnum"];
  }, 0);
  //無法租借車輛數
  const stationNum3 = stationArr2.reduce((accumulator, currentValue) => {
    return accumulator + currentValue["no_carnum"];
  }, 0);
  //在站車輛可動率
  const stationNum4 = parseFloat(
    ((stationNum2 - stationNum3) / stationNum2) * 100
  ).toFixed(2);

  // //2.0扣分
  const cutpoint = (num) => {
    if (num < 91) {
      return 5;
    } else if (num >= 91 && num < 93) {
      return 4;
    } else if (num >= 93 && num < 95) {
      return 3;
    } else if (num >= 95 && num < 97) {
      return 2;
    } else if (num >= 97 && num < 99) {
      return 1;
    } else if (num >= 99 && num <= 100) {
      return 0;
    }
  };
  // console.log(stationNum1, stationNum2, stationNum3, stationNum4);
  // console.log(`可動率為: ${stationNum4}%`);
  // //2.0可動率扣分
  const canMovePoint = cutpoint(stationNum4);

  function totalfun(params) {
    let totaldata = 0;
    for (let i in params) {
      totaldata += params[i];
    }
    return totaldata;
  }

  const u4 = (A, D, testdataLength) => {
    const totalA = totalfun(A);
    console.log(totalA, D);
    const num1 = (totalA / D) * 100 * testdataLength;

    if (num1 + SUMPRODUCTA(A) === 0) {
      return 100;
    }
    const totalnum =
      ((num1 + SUMPRODUCTA(A)) / testdataLength / ((totalA / D) * 100)) * 100;
    // console.log(num1, SUMPRODUCTA(A), testdataLength, totalA / D);
    return parseInt(totalnum);
  };

  const u17 = (B, D, testdataLength) => {
    const totalB = totalfun(B);
    // console.log(totalB);
    const num1 = (totalB / D) * 100 * testdataLength;

    if (num1 + SUMPRODUCTB(B) === 0) {
      return 100;
    }

    const totalnum =
      ((num1 + SUMPRODUCTB(B)) / testdataLength / ((totalB / D) * 100)) * 100;
    return parseInt(totalnum);
  };

  const u46 = (C, D, testdataLength) => {
    const totalC = totalfun(C);
    // console.log(totalC);
    const num1 = (totalC / D) * 100 * testdataLength;
    // console.log(totalC, num1, testdataLength);
    if (num1 + SUMPRODUCTC(C) === 0) {
      return 100;
    }

    const totalnum =
      ((num1 + SUMPRODUCTC(C)) / testdataLength / ((totalC / D) * 100)) * 100;
    return parseInt(totalnum);
  };

  const u17E = (B, D, testdataLength) => {
    const totalB = totalfun(B);
    // console.log(totalB);
    const num1 = (totalB / D) * 100 * testdataLength;
    // console.log(num1);
    if (num1 + SUMPRODUCTBE(B) === 0) {
      return 100;
    }

    const totalnum =
      ((num1 + SUMPRODUCTB(B)) / testdataLength / ((totalB / D) * 100)) * 100;
    return parseInt(totalnum);
  };

  const u17EE = (data, length) => {
    const Adata = totalfun(A(data));
    const Bdata = totalfun(BE(data));
    const Cdata = totalfun(CE(data));
    const Ddata = Adata + Bdata + Cdata;
    // const BE = SUMPRODUCTBE(data);

    const total =
      (((Bdata / Ddata) * 100 * length + SUMPRODUCTBE(BE(data))) /
        length /
        ((Bdata / Ddata) * 100)) *
      100;
    // console.log(total);
    return total;
  };

  const u46E = (C, D, testdataLength) => {
    const totalC = totalfun(C);
    const num1 = (totalC / D) * 100 * testdataLength;
    // console.log(totalC, num1);
    if (num1 + SUMPRODUCTCE(C) === 0) {
      return 100;
    }

    const totalnum =
      ((num1 + SUMPRODUCTCE(C)) / testdataLength / ((totalC / D) * 100)) * 100;
    return parseInt(totalnum);
  };

  const u46EE = (data, length) => {
    const Adata = totalfun(A(data));
    const Bdata = totalfun(BE(data));
    const Cdata = totalfun(CE(data));
    const Ddata = Adata + Bdata + Cdata;
    // const BE = SUMPRODUCTBE(data);

    const total =
      (((Cdata / Ddata) * 100 * length + SUMPRODUCTCE(CE(data))) /
        length /
        ((Cdata / Ddata) * 100)) *
      100;
    // console.log(total);
    return total;
  };

  const testdata2Length = testArr2E.length;
  const testdata2ELength = testArr22E.length;

  //這是給2.0用的
  const u4total = u4(A(total3), D(total3), testdata2ELength);
  const u17total = u17(B(total3), D(total3), testdata2ELength);
  const u46total = u46(C(total3), D(total3), testdata2ELength);

  //這是給2.0E用的
  const u17Etotal = u17E(BE(total4), DEE(total4), testdata2Length);
  const u46Etotal = u46E(CE(total4), DEE(total4), testdata2Length);
  // console.log();

  //這是給2.0+2.0E用的
  const u17EEtotal = u17EE(total5, testArr22E.length);
  const u46EEtotal = u46EE(total5, testArr22E.length);
  // console.log(u4total, u17total, u46Etotal, u17Etotal, u46Etotal);

  //總分
  const totalPoint2EE =
    (100 * testArr22E.length +
      (SUMPRODUCTA(A(total5)) +
        SUMPRODUCTBE(BE(total5)) +
        SUMPRODUCTCE(CE(total5)))) /
    testArr22E.length;

  // console.log("2.0+E總分", totalPoint2EE);
  // console.log("模擬體驗總分:", totalPoint2EE - canMovePoint);

  const rowNum =
    total["2-75"] +
    total["2-76"] +
    total["2-77"] +
    total2["2-75"] +
    total2["2-76"] +
    total2["2-77"];
  // console.log(rowNum, testArr22E);
  // const u4 = data.finalObj["場站妥善度"];
  // const u17 = data.finalObj["自行車外觀與重要標示"];
  // const u46 = data.finalObj["自行車重要機能"];

  // console.log(testArr2E);
  const finalObj = {
    u17Etotal,
    u46Etotal,
    總在站車輛數: stationNum2,
    施測站數: stationNum1,
    施測車輛數: testArr22E.length,
    "2.0E施測車輛數": testArr2E.length,
    前後胎壓未達標準1: rowNum,
    前後胎壓未達標準2: `${parseInt((rowNum / testArr22E.length) * 100)}%`,
    場站妥善度: u4total,
    自行車外觀與重要標示: u17total,
    自行車重要機能: u46total,
    模擬體驗總分: totalPoint2EE - canMovePoint,
    可動率: stationNum4,
    "2.0E總分": totalPointE,
    "2.0+E總分": totalPoint2EE,
    無法租借車輛數: stationNum3,
    可動率扣分: canMovePoint,
    "2.0總分": totalPoint,
    "2.0E異常台數": error2E,
    總異常台數: error2 + error2E,
    "異常台數2.0": error2,
    "2.0+2.0E第二格": u17EEtotal,
    "2.0+2.0E第三格": u46EEtotal,
  };

  // console.log("異常台數2.0", error2);
  // console.log("2.0E異常台數", error2E);

  // console.log("總異常台數", error2 + error2E);
  // console.log(total, total2);
  return { finalObj, total: total3, total2, total5 };
  // console.log(canMovePoint);
}

function dateCheck(start, end, date) {
  // 使用传入的参数
  const newdate = date.split(" ")[0] + " 00:00:00";

  // 转换传入的日期字符串
  const dateToCheck = new Date(newdate).getTime();
  // console.log(dateToCheck >= start, dateToCheck <= end);
  // 检查日期是否在范围内
  if (dateToCheck >= start && dateToCheck <= end) {
    return true;
  } else {
    return false;
  }
}

function outExcel(data, title) {
  // console.log(data);
  const workbook = XLSX.utils.book_new();
  data.forEach((element, index) => {
    const worksheet = XLSX.utils.json_to_sheet(element.obj);
    XLSX.utils.book_append_sheet(workbook, worksheet, `${title}表${index + 1}`);
    const header = Object.keys(element.obj[0]); // Assuming the first object in the array contains the headers
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: "A1" });
  });
  XLSX.writeFile(workbook, `${title}.xlsx`);
}

function editstation1Excel(data, title) {
  // console.log(data);
  const carnum = data.finalObj["施測車輛數"];

  const u4 = data.finalObj["場站妥善度"];
  const u17 = data.finalObj["自行車外觀與重要標示"];
  const u46 = data.finalObj["自行車重要機能"];

  const item1 = data.finalObj["施測站數"];
  const item2 = data.finalObj["抽驗總在站車輛數"];
  const item3 = data.finalObj["無法租借車輛數"];
  const item4 = data.finalObj["可動率"];

  const item5 = data.finalObj["可動扣分"];
  const item6 = data.finalObj["異常台數"];
  const item7 = data.finalObj["總分"];
  const item8 = `${Math.floor((item6 / carnum) * 100)} %`;

  const dataitme = data.total;
  // console.log(data);

  const col = ["類別", "項目", "異常件數", "異常率", "類別分數"];
  const obj = [
    {
      類別: "場站",
      項目: "場站周遭環境清潔",
      異常件數: dataitme["1-A"],
      異常率: dataitme["1-A"] / carnum,
      類別分數: u4,
    },
    {
      類別: "場站",
      項目: "KIOSK功能是否正常",
      異常件數: dataitme["1-B"],
      異常率: dataitme["1-B"] / carnum,
    },
    {
      類別: "場站",
      項目: "KIOSK外觀",
      異常件數: dataitme["1-C"],
      異常率: dataitme["1-C"] / carnum,
    },
    {
      類別: "場站",
      項目: "KIOSK燈片褪色",
      異常件數: dataitme["1-D"],
      異常率: dataitme["1-D"] / carnum,
    },
    {
      類別: "場站",
      項目: "還車導引槽是否妥善",
      異常件數: dataitme["1-5"],
      異常率: dataitme["1-5"] / carnum,
    },
    {
      類別: "場站",
      項目: "停車柱貼紙 / 基板宣導貼紙完整",
      異常件數: dataitme["1-4"],
      異常率: dataitme["1-4"] / carnum,
    },
    {
      類別: "場站",
      項目: "停車柱/手臂異常",
      異常件數: dataitme["1-3"],
      異常率: dataitme["1-3"] / carnum,
    },
    {
      類別: "場站",
      項目: "場站導標桿是否損壞、搖晃",
      異常件數: dataitme["1-E"],
      異常率: dataitme["1-E"] / carnum,
    },

    ///此為第二類
    {
      類別: "自行車外觀與重要提示",
      項目: "一級檢修資訊",
      異常件數: dataitme["1-1"] + dataitme["1-2"],
      異常率: (dataitme["1-1"] + dataitme["1-2"]) / carnum,
      類別分數: u17,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "後泥除廣告或貼紙完整",
      異常件數: dataitme["1-7"],
      異常率: dataitme["1-7"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "左右側車把手貼紙",
      異常件數: dataitme["1-12"],
      異常率: dataitme["1-12"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "座管束子貼紙",
      異常件數: dataitme["1-16"],
      異常率: dataitme["1-16"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "置物籃貼紙(前後)",
      異常件數: dataitme["1-8"],
      異常率: dataitme["1-8"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "車體外觀清潔",
      異常件數: dataitme["1-6"],
      異常率: dataitme["1-6"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "置物籃清潔或褪色",
      異常件數: dataitme["1-9"],
      異常率: dataitme["1-9"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "把手不黏潮、破損",
      異常件數: dataitme["1-11"],
      異常率: dataitme["1-11"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "座墊妥善",
      異常件數: dataitme["1-15"],
      異常率: dataitme["1-15"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "前後輪軸螺絲",
      異常件數: dataitme["1-19"],
      異常率: dataitme["1-19"] / carnum,
    },

    //此為第三類
    {
      類別: "自行車重要機能",
      項目: "煞車正常與否/有無異音",
      異常件數: dataitme["1-21"],
      異常率: dataitme["1-21"] / carnum,
      類別分數: u46,
    },
    {
      類別: "自行車重要機能",
      項目: "輪胎(胎壓、反光帶、胎紋)",
      異常件數: dataitme["1-18+1-25"],
      異常率: dataitme["1-18+1-25"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "剎車及變速線外管完整",
      異常件數: dataitme["1-10"],
      異常率: dataitme["1-10"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊高低調整順暢(含座管束子)",
      異常件數: dataitme["1-17"],
      異常率: dataitme["1-17"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "車鈴功能正常",
      異常件數: dataitme["1-13"],
      異常率: dataitme["1-13"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "防轉彈簧及停車架是否正常",
      異常件數: dataitme["1-14"],
      異常率: dataitme["1-14"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "前燈/後燈正常發光",
      異常件數: dataitme["1-20"],
      異常率: dataitme["1-20"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "隨車鎖功能正常",
      異常件數: dataitme["1-23"],
      異常率: dataitme["1-23"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "變速正確換檔",
      異常件數: dataitme["1-22"],
      異常率: dataitme["1-22"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "行進順暢及有無異音",
      異常件數: dataitme["1-24"],
      異常率: dataitme["1-24"] / carnum,
    },
  ];
  obj.forEach((item, index) => {
    obj[index]["異常率"] = `${Math.floor(obj[index]["異常率"] * 100)} %`;
  });
  //這裡是下面那場站資料

  const obj2 = [
    {
      項目: "抽驗場站數",
      [title]: item1,
    },
    {
      項目: "抽驗總在站車輛數",
      [title]: item2,
    },
    {
      項目: "無法租借車輛數",
      [title]: item3,
    },
    {
      項目: "在站車輛可動率",
      [title]: item4,
    },
  ];
  const col2 = ["項目", title];

  //下面那一條
  const col3 = ["可動率", "可動扣分", "異常台數", "異常率", "模擬體驗總分"];
  const obj3 = [
    {
      可動率: item4,
      可動扣分: item5,
      異常台數: item6,
      異常率: item8,
      模擬體驗總分: item7,
    },
  ];
  const total = [
    {
      col,
      obj,
    },
    {
      col: col2,
      obj: obj2,
    },
    {
      col: col3,
      obj: obj3,
    },
  ];

  return total;
}

function editstation2Excel(data, title) {
  // console.log(data);
  const carnum = data.finalObj["施測車輛數"];
  // console.log(carnum);
  const u4 = data.finalObj["場站妥善度"];
  const u17 = data.finalObj["自行車外觀與重要標示"];
  const u46 = data.finalObj["自行車重要機能"];

  const item1 = data.finalObj["施測站數"];
  const item2 = data.finalObj["總在站車輛數"];
  const item3 = data.finalObj["無法租借車輛數"];
  const item4 = data.finalObj["可動率"];

  const item5 = data.finalObj["可動扣分"];
  const item6 = data.finalObj["異常台數"];
  const item7 = data.finalObj["總分"];
  const item8 = `${Math.floor((item6 / carnum) * 100)} %`;
  const dataitme = data.total;

  const col = ["類別", "項目", "異常件數", "類別分數", "異常率"];

  const obj = [
    {
      類別: "場站",
      項目: "場站導標桿[歪斜/損毀]",
      異常件數: dataitme["2-A"],
      異常率: dataitme["2-A"] / carnum,
      類別分數: u4,
    },
    {
      類別: "場站",
      項目: "場站導標桿[漏缺]",
      異常件數: dataitme["2-B"],
      異常率: dataitme["2-B"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱環境[垃圾]",
      異常件數: dataitme["2-3"],
      異常率: dataitme["2-3"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱或基板[髒汙/脫漆/貼紙翹起/鏽蝕]",
      異常件數: dataitme["2-2"],
      異常率: dataitme["2-2"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[柱號貼紙面板破裂]",
      異常件數: dataitme["2-4"],
      異常率: dataitme["2-4"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[站名貼紙文字無法傳達完整訊息]",
      異常件數: dataitme["2-5"],
      異常率: dataitme["2-5"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[太陽能面板破裂]",
      異常件數: dataitme["2-6"],
      異常率: dataitme["2-6"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[太陽能面板水氣]",
      異常件數: dataitme["2-7"],
      異常率: dataitme["2-7"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[遮蓋太陽能面板後左下方燈光未亮起]",
      異常件數: dataitme["2-9"],
      異常率: dataitme["2-9"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[車柱搖晃]",
      異常件數: dataitme["2-10"],
      異常率: dataitme["2-10"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[鎖體生鏽]",
      異常件數: dataitme["2-8"],
      異常率: dataitme["2-8"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[還車異常]",
      異常件數: dataitme["2-11"],
      異常率: dataitme["2-11"] / carnum,
    },
    {
      類別: "場站",
      項目: "還車導引槽[缺漏/鬆動]",
      異常件數: dataitme["2-12"],
      異常率: dataitme["2-12"] / carnum,
    },

    ///此為第二類
    {
      類別: "自行車外觀與重要提示",
      項目: "一級檢修貼紙",
      異常件數: dataitme["2-1"],
      異常率: dataitme["2-1"] / carnum,
      類別分數: u17,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "車機機殼[車機髒污/塗鴉/廣告貼紙/褪色]",
      異常件數: dataitme["2-13"],
      異常率: dataitme["2-13"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "車機機殼[車機破損/嚴重刮痕]",
      異常件數: dataitme["2-14"],
      異常率: dataitme["2-14"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "車機功能[借、還車無提示音]",
      異常件數: dataitme["2-18"],
      異常率: dataitme["2-18"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "置物籃前後貼紙[置物籃前後貼紙無法傳達完整訊息]",
      異常件數: dataitme["2-21"],
      異常率: dataitme["2-21"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "置物籃[嚴重髒汙/沾黏/垃圾]",
      異常件數: dataitme["2-22"],
      異常率: dataitme["2-22"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "置物籃[破損]",
      異常件數: dataitme["2-23"],
      異常率: dataitme["2-23"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "置物籃[鉸線頭固定座上下皆破損]",
      異常件數: dataitme["2-24"],
      異常率: dataitme["2-24"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "置物籃[鉸線破損 或 生鏽]",
      異常件數: dataitme["2-25"],
      異常率: dataitme["2-25"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "煞車及變速外管[蛇管脫落、遺失 ]",
      異常件數: dataitme["2-26"],
      異常率: dataitme["2-26"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "車把手貼紙[左、右側把手貼紙文字無法傳達完整訊息]",
      異常件數: dataitme["2-29"],
      異常率: dataitme["2-29"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "車鈴[貼紙文字無法傳達完整訊息]",
      異常件數: dataitme["2-33"],
      異常率: dataitme["2-33"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "把手套[黏潮/紋路磨損/破損]",
      異常件數: dataitme["2-30"],
      異常率: dataitme["2-30"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "把手套[髒汙 致無法使用]",
      異常件數: dataitme["2-31"],
      異常率: dataitme["2-31"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "車體外觀[車架髒汙/小廣告/塗鴉]",
      異常件數: dataitme["2-34"],
      異常率: dataitme["2-34"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "車體外觀[前後泥除髒污]",
      異常件數: dataitme["2-36"],
      異常率: dataitme["2-36"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "車體外觀[掉漆]",
      異常件數: dataitme["2-35"],
      異常率: dataitme["2-35"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "後泥除貼紙[刮傷]",
      異常件數: dataitme["2-37"],
      異常率: dataitme["2-37"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "後泥除貼紙[車號]",
      異常件數: dataitme["2-38"],
      異常率: dataitme["2-38"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "座管束子貼紙[座管束子貼紙文字已無法傳達完整訊息]",
      異常件數: dataitme["2-39"],
      異常率: dataitme["2-39"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "座墊[座墊與底部分離]",
      異常件數: dataitme["2-42"],
      異常率: dataitme["2-42"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "座墊[座墊表面破損、龜裂]",
      異常件數: dataitme["2-43"],
      異常率: dataitme["2-43"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "座墊[髒汙導致無法騎乘]",
      異常件數: dataitme["2-44"],
      異常率: dataitme["2-44"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "前後輪軸螺絲 [後100%面積嚴重生鏽]",
      異常件數: dataitme["2-56"],
      異常率: dataitme["2-56"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "前後輪軸螺絲 [前100%面積嚴重生鏽]",
      異常件數: dataitme["2-55"],
      異常率: dataitme["2-55"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "前/後燈[前燈線未妥善固定及絕緣膠布翹起]",
      異常件數: dataitme["2-59"],
      異常率: dataitme["2-59"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "隨車鎖[貼紙文字已無法傳達完整訊息]",
      異常件數: dataitme["2-68"],
      異常率: dataitme["2-68"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "隨車鎖[鎖孔生鏽]",
      異常件數: dataitme["2-69"],
      異常率: dataitme["2-69"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "隨車鎖[鎖體生鏽]",
      異常件數: dataitme["2-71"],
      異常率: dataitme["2-71"] / carnum,
    },

    //此為第三類

    {
      類別: "自行車重要機能",
      項目: "車機機殼[太陽能面板產生氣泡]",
      異常件數: dataitme["2-15"],
      異常率: dataitme["2-15"] / carnum,
      類別分數: u46,
    },
    {
      類別: "自行車重要機能",
      項目: "車機功能[完成借車流程後，無法正常拉出]",
      異常件數: dataitme["2-16"],
      異常率: dataitme["2-16"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "車機功能[螢幕文字無法正常顯示]",
      異常件數: dataitme["2-17"],
      異常率: dataitme["2-17"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "防轉彈簧及停車架[防轉彈簧脫落]",
      異常件數: dataitme["2-19"],
      異常率: dataitme["2-19"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "防轉彈簧及停車架[停車架架起後 , 車輛不會倒]",
      異常件數: dataitme["2-20"],
      異常率: dataitme["2-20"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "煞車及變速外管[煞車外管 破損、龜裂、絕緣膠翹起]",
      異常件數: dataitme["2-27"],
      異常率: dataitme["2-27"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "煞車及變速外管[變速外管 破損、龜裂、絕緣膠翹起]",
      異常件數: dataitme["2-28"],
      異常率: dataitme["2-28"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "車鈴[轉動無法發出鈴聲]",
      異常件數: dataitme["2-32"],
      異常率: dataitme["2-32"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊[座墊搖晃]",
      異常件數: dataitme["2-40"],
      異常率: dataitme["2-40"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊[歪斜]",
      異常件數: dataitme["2-41"],
      異常率: dataitme["2-41"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[高度調整不順]",
      異常件數: dataitme["2-45"],
      異常率: dataitme["2-45"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[束子鎖死 (無法調整高度)]",
      異常件數: dataitme["2-46"],
      異常率: dataitme["2-46"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[黃色拉桿斷裂]",
      異常件數: dataitme["2-47"],
      異常率: dataitme["2-47"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[座墊桿滑落無法固定]",
      異常件數: dataitme["2-48"],
      異常率: dataitme["2-48"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[反轉後無法固定位置]",
      異常件數: dataitme["2-49"],
      異常率: dataitme["2-49"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[座墊桿與車體分離]",
      異常件數: dataitme["2-51"],
      異常率: dataitme["2-51"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[座墊未在最底部就可反轉]",
      異常件數: dataitme["2-50"],
      異常率: dataitme["2-50"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "輪胎[胎紋磨損至平滑、龜裂、反光帶脫落]",
      異常件數: dataitme["2-52"],
      異常率: dataitme["2-52"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "輪胎[輪框變形、缺鋼絲]",
      異常件數: dataitme["2-53"],
      異常率: dataitme["2-53"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "輪胎[前或後輪偏擺]",
      異常件數: dataitme["2-54"],
      異常率: dataitme["2-54"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "前/後燈[前燈脫落、破損、不亮]",
      異常件數: dataitme["2-57"],
      異常率: dataitme["2-57"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "前/後燈[後燈脫落、破損、不亮]",
      異常件數: dataitme["2-58"],
      異常率: dataitme["2-58"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "煞車[無法煞車]",
      異常件數: dataitme["2-60"],
      異常率: dataitme["2-60"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "煞車[過鬆或過緊]",
      異常件數: dataitme["2-61"],
      異常率: dataitme["2-61"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "煞車[異音]",
      異常件數: dataitme["2-62"],
      異常率: dataitme["2-62"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "變速[指示蓋(銀)脫落]",
      異常件數: dataitme["2-63"],
      異常率: dataitme["2-63"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "變速[上蓋(黑)脫落、檔位標示無法辨識]",
      異常件數: dataitme["2-64"],
      異常率: dataitme["2-64"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "變速[換檔轉動不順、過緊]",
      異常件數: dataitme["2-65"],
      異常率: dataitme["2-65"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "變速[檔位無法定位]",
      異常件數: dataitme["2-66"],
      異常率: dataitme["2-66"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "變速[實際騎乘無法變速]",
      異常件數: dataitme["2-67"],
      異常率: dataitme["2-67"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "隨車鎖[解鎖失敗]",
      異常件數: dataitme["2-70"],
      異常率: dataitme["2-70"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "騎乘行進[行進不順暢]",
      異常件數: dataitme["2-72"],
      異常率: dataitme["2-72"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "騎乘行進[發出異音]",
      異常件數: dataitme["2-73"],
      異常率: dataitme["2-73"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "胎壓<50 (含爆胎),胎壓>90",
      異常件數: dataitme["2-75"] + dataitme["2-77"],
      異常率: (dataitme["2-75"] + dataitme["2-77"]) / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "90>胎壓>75",
      異常件數: dataitme["2-76"],
      異常率: dataitme["2-76"] / carnum,
    },
  ];
  obj.forEach((element, index) => {
    obj[index]["異常率"] = `${Math.floor(obj[index]["異常率"] * 100)}%`;
  });

  //下面那一條
  const col3 = ["可動率", "可動扣分", "異常台數", "異常率", "模擬體驗總分"];
  const obj3 = [
    {
      可動率: item4,
      可動扣分: item5,
      異常台數: item6,
      異常率: item8,
      模擬體驗總分: item7,
    },
  ];
  //這裡是下面那場站資料

  const obj2 = [
    {
      項目: "抽驗場站數",
      [title]: item1,
    },
    {
      項目: "抽驗總在站車輛數",
      [title]: item2,
    },
    {
      項目: "無法租借車輛數",
      [title]: item3,
    },
    {
      項目: "在站車輛可動率",
      [title]: item4,
    },
  ];
  const col2 = ["項目", title];
  const total = [
    {
      col,
      obj,
    },
    {
      col: col2,
      obj: obj2,
    },
    {
      col: col3,
      obj: obj3,
    },
  ];
  return total;
}

function editstation2EExcel(data, title) {
  const carnum = data.finalObj["施測車輛數"];

  const u4 = data.finalObj["場站妥善度"];
  const u17 = data.finalObj["自行車外觀與重要標示"];
  const u46 = data.finalObj["自行車重要機能"];

  const item1 = data.finalObj["施測站數"];
  const item2 = data.finalObj["總在站車輛數"];
  const item3 = data.finalObj["無法租借車輛數"];
  const item4 = data.finalObj["可動率"];

  const item5 = data.finalObj["可動率扣分"];
  const item6 = data.finalObj["總異常台數"];
  const item7 = data.finalObj["模擬體驗總分"];
  const item8 = `${Math.floor((item6 / carnum) * 100)} %`;
  const item9 = data.finalObj["異常台數2.0"];
  const item10 = data.finalObj["2.0總分"];
  const item11 = data.finalObj["2.0E異常台數"];
  const item12 = data.finalObj["2.0E總分"];
  const item13 = data.finalObj["2.0+E總分"];

  const u17E = data.finalObj["u17Etotal"];
  const u46E = data.finalObj["u46Etotal"];

  const u17EE = data.finalObj["2.0+2.0E第二格"];
  const u46EE = data.finalObj["2.0+2.0E第三格"];

  const dataitme = data.total;

  const col = ["類別", "項目", "異常件數", "類別分數", "異常率"];

  const obj = [
    {
      類別: "場站",
      項目: "場站導標桿[歪斜/損毀]",
      異常件數: dataitme["2-A"],
      異常率: dataitme["2-A"] / carnum,
      類別分數: u4,
    },
    {
      類別: "場站",
      項目: "場站導標桿[漏缺]",
      異常件數: dataitme["2-B"],
      異常率: dataitme["2-B"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱環境[垃圾]",
      異常件數: dataitme["2-3"],
      異常率: dataitme["2-3"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱或基板[髒汙/脫漆/貼紙翹起/鏽蝕]",
      異常件數: dataitme["2-2"],
      異常率: dataitme["2-2"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[柱號貼紙面板破裂]",
      異常件數: dataitme["2-4"],
      異常率: dataitme["2-4"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[站名貼紙文字無法傳達完整訊息]",
      異常件數: dataitme["2-5"],
      異常率: dataitme["2-5"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[太陽能面板破裂]",
      異常件數: dataitme["2-6"],
      異常率: dataitme["2-6"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[太陽能面板水氣]",
      異常件數: dataitme["2-7"],
      異常率: dataitme["2-7"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[遮蓋太陽能面板後左下方燈光未亮起]",
      異常件數: dataitme["2-9"],
      異常率: dataitme["2-9"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[車柱搖晃]",
      異常件數: dataitme["2-10"],
      異常率: dataitme["2-10"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[鎖體生鏽]",
      異常件數: dataitme["2-8"],
      異常率: dataitme["2-8"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[還車異常]",
      異常件數: dataitme["2-11"],
      異常率: dataitme["2-11"] / carnum,
    },
    {
      類別: "場站",
      項目: "還車導引槽[缺漏/鬆動]",
      異常件數: dataitme["2-12"],
      異常率: dataitme["2-12"] / carnum,
    },

    ///此為第二類
    {
      類別: "自行車外觀與重要提示",
      項目: "一級檢修貼紙",
      異常件數: dataitme["2-1"],
      異常率: dataitme["2-1"] / carnum,
      類別分數: u17,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "車機機殼[車機髒污/塗鴉/廣告貼紙/褪色]",
      異常件數: dataitme["2-13"],
      異常率: dataitme["2-13"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "車機機殼[車機破損/嚴重刮痕]",
      異常件數: dataitme["2-14"],
      異常率: dataitme["2-14"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "車機功能[借、還車無提示音]",
      異常件數: dataitme["2-18"],
      異常率: dataitme["2-18"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "置物籃前後貼紙[置物籃前後貼紙無法傳達完整訊息]",
      異常件數: dataitme["2-21"],
      異常率: dataitme["2-21"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "置物籃[嚴重髒汙/沾黏/垃圾]",
      異常件數: dataitme["2-22"],
      異常率: dataitme["2-22"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "置物籃[破損]",
      異常件數: dataitme["2-23"],
      異常率: dataitme["2-23"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "置物籃[鉸線頭固定座上下皆破損]",
      異常件數: dataitme["2-24"],
      異常率: dataitme["2-24"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "置物籃[鉸線破損 或 生鏽]",
      異常件數: dataitme["2-25"],
      異常率: dataitme["2-25"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "煞車及變速外管[蛇管脫落、遺失]",
      異常件數: dataitme["2-26"],
      異常率: dataitme["2-26"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "車把手貼紙[左、右側把手貼紙文字無法傳達完整訊息]",
      異常件數: dataitme["2-29"],
      異常率: dataitme["2-29"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "車鈴[貼紙文字無法傳達完整訊息]",
      異常件數: dataitme["2-33"],
      異常率: dataitme["2-33"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "把手套[黏潮/紋路磨損/破損]",
      異常件數: dataitme["2-30"],
      異常率: dataitme["2-30"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "把手套[髒汙 致無法使用]",
      異常件數: dataitme["2-31"],
      異常率: dataitme["2-31"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "車體外觀[車架髒汙/小廣告/塗鴉]",
      異常件數: dataitme["2-34"],
      異常率: dataitme["2-34"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "車體外觀[前後泥除髒污]",
      異常件數: dataitme["2-36"],
      異常率: dataitme["2-36"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "車體外觀[掉漆]",
      異常件數: dataitme["2-35"],
      異常率: dataitme["2-35"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "後泥除貼紙[刮傷]",
      異常件數: dataitme["2-37"],
      異常率: dataitme["2-37"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "後泥除貼紙[車號]",
      異常件數: dataitme["2-38"],
      異常率: dataitme["2-38"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "座管束子貼紙[座管束子貼紙文字已無法傳達完整訊息]",
      異常件數: dataitme["2-39"],
      異常率: dataitme["2-39"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "座墊[座墊與底部分離]",
      異常件數: dataitme["2-42"],
      異常率: dataitme["2-42"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "座墊[座墊表面破損、龜裂]",
      異常件數: dataitme["2-43"],
      異常率: dataitme["2-43"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "座墊[髒汙導致無法騎乘]",
      異常件數: dataitme["2-44"],
      異常率: dataitme["2-44"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "前後輪軸螺絲 [後100%面積嚴重生鏽]",
      異常件數: dataitme["2-56"],
      異常率: dataitme["2-56"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "前後輪軸螺絲 [前100%面積嚴重生鏽]",
      異常件數: dataitme["2-55"],
      異常率: dataitme["2-55"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "前/後燈[前燈線未妥善固定及絕緣膠布翹起]",
      異常件數: dataitme["2-59"],
      異常率: dataitme["2-59"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "隨車鎖[貼紙文字已無法傳達完整訊息]",
      異常件數: dataitme["2-68"],
      異常率: dataitme["2-68"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "隨車鎖[鎖孔生鏽]",
      異常件數: dataitme["2-69"],
      異常率: dataitme["2-69"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "隨車鎖[鎖體生鏽]",
      異常件數: dataitme["2-71"],
      異常率: dataitme["2-71"] / carnum,
    },

    //此為第三類

    {
      類別: "自行車重要機能",
      項目: "車機機殼[太陽能面板產生氣泡]",
      異常件數: dataitme["2-15"],
      異常率: dataitme["2-15"] / carnum,
      類別分數: u46,
    },
    {
      類別: "自行車重要機能",
      項目: "車機功能[完成借車流程後，無法正常拉出]",
      異常件數: dataitme["2-16"],
      異常率: dataitme["2-16"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "車機功能[螢幕文字無法正常顯示]",
      異常件數: dataitme["2-17"],
      異常率: dataitme["2-17"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "防轉彈簧及停車架[防轉彈簧脫落]",
      異常件數: dataitme["2-19"],
      異常率: dataitme["2-19"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "防轉彈簧及停車架[停車架架起後 , 車輛不會倒]",
      異常件數: dataitme["2-20"],
      異常率: dataitme["2-20"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "煞車及變速外管[煞車外管 破損、龜裂、絕緣膠翹起]",
      異常件數: dataitme["2-27"],
      異常率: dataitme["2-27"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "煞車及變速外管[變速外管 破損、龜裂、絕緣膠翹起]",
      異常件數: dataitme["2-28"],
      異常率: dataitme["2-28"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "車鈴[轉動無法發出鈴聲]",
      異常件數: dataitme["2-32"],
      異常率: dataitme["2-32"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊[座墊搖晃]",
      異常件數: dataitme["2-40"],
      異常率: dataitme["2-40"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊[歪斜]",
      異常件數: dataitme["2-41"],
      異常率: dataitme["2-41"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[高度調整不順]",
      異常件數: dataitme["2-45"],
      異常率: dataitme["2-45"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[束子鎖死 (無法調整高度)]",
      異常件數: dataitme["2-46"],
      異常率: dataitme["2-46"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[黃色拉桿斷裂]",
      異常件數: dataitme["2-47"],
      異常率: dataitme["2-47"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[座墊桿滑落無法固定]",
      異常件數: dataitme["2-48"],
      異常率: dataitme["2-48"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[反轉後無法固定位置]",
      異常件數: dataitme["2-49"],
      異常率: dataitme["2-49"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[座墊桿與車體分離]",
      異常件數: dataitme["2-51"],
      異常率: dataitme["2-51"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[座墊未在最底部就可反轉]",
      異常件數: dataitme["2-50"],
      異常率: dataitme["2-50"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "輪胎[胎紋磨損至平滑、龜裂、反光帶脫落]",
      異常件數: dataitme["2-52"],
      異常率: dataitme["2-52"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "輪胎[輪框變形、缺鋼絲]",
      異常件數: dataitme["2-53"],
      異常率: dataitme["2-53"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "輪胎[前或後輪偏擺]",
      異常件數: dataitme["2-54"],
      異常率: dataitme["2-54"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "前/後燈[前燈脫落、破損、不亮]",
      異常件數: dataitme["2-57"],
      異常率: dataitme["2-57"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "前/後燈[後燈脫落、破損、不亮]",
      異常件數: dataitme["2-58"],
      異常率: dataitme["2-58"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "煞車[無法煞車]",
      異常件數: dataitme["2-60"],
      異常率: dataitme["2-60"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "煞車[過鬆或過緊]",
      異常件數: dataitme["2-61"],
      異常率: dataitme["2-61"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "煞車[異音]",
      異常件數: dataitme["2-62"],
      異常率: dataitme["2-62"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "變速[指示蓋(銀)脫落]",
      異常件數: dataitme["2-63"],
      異常率: dataitme["2-63"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "變速[上蓋(黑)脫落、檔位標示無法辨識]",
      異常件數: dataitme["2-64"],
      異常率: dataitme["2-64"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "變速[換檔轉動不順、過緊]",
      異常件數: dataitme["2-65"],
      異常率: dataitme["2-65"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "變速[檔位無法定位]",
      異常件數: dataitme["2-66"],
      異常率: dataitme["2-66"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "變速[實際騎乘無法變速]",
      異常件數: dataitme["2-67"],
      異常率: dataitme["2-67"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "隨車鎖[解鎖失敗]",
      異常件數: dataitme["2-70"],
      異常率: dataitme["2-70"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "騎乘行進[行進不順暢]",
      異常件數: dataitme["2-72"],
      異常率: dataitme["2-72"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "騎乘行進[發出異音]",
      異常件數: dataitme["2-73"],
      異常率: dataitme["2-73"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "胎壓<50 (含爆胎),胎壓>90",
      異常件數: dataitme["2-75"] + dataitme["2-77"],
      異常率: (dataitme["2-75"] + dataitme["2-77"]) / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "90>胎壓>75",
      異常件數: dataitme["2-76"],
      異常率: dataitme["2-76"] / carnum,
    },
  ];
  obj.forEach((element, index) => {
    obj[index]["異常率"] = `${Math.floor(obj[index]["異常率"] * 100)}%`;
  });

  //這是2.0E
  const dataitme2 = data.total2;

  const obj4 = [
    ///此為第二類
    {
      類別: "自行車外觀與重要提示",
      項目: "一級檢修貼紙",
      異常件數: dataitme2["2-1"],
      異常率: dataitme2["2-1"] / carnum,
      類別分數: u17E,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "車機機殼[車機髒污/塗鴉/廣告貼紙/褪色]",
      異常件數: dataitme2["2-13"],
      異常率: dataitme2["2-13"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "車機機殼[車機破損/嚴重刮痕]",
      異常件數: dataitme2["2-14"],
      異常率: dataitme2["2-14"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "車機功能[借、還車無提示音]",
      異常件數: dataitme2["2-18"],
      異常率: dataitme2["2-18"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "置物籃前後貼紙[置物籃前後貼紙無法傳達完整訊息]",
      異常件數: dataitme2["2-21"],
      異常率: dataitme2["2-21"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "置物籃[嚴重髒汙/沾黏/垃圾]",
      異常件數: dataitme2["2-22"],
      異常率: dataitme2["2-22"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "置物籃[破損]",
      異常件數: dataitme2["2-23"],
      異常率: dataitme2["2-23"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "置物籃[鉸線頭固定座上下皆破損]",
      異常件數: dataitme2["2-24"],
      異常率: dataitme2["2-24"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "置物籃[鉸線破損 或 生鏽]",
      異常件數: dataitme2["2-25"],
      異常率: dataitme2["2-25"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "煞車及變速外管[蛇管脫落、遺失 ]",
      異常件數: dataitme2["2-26"],
      異常率: dataitme2["2-26"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "車把手貼紙[左、右側把手貼紙文字無法傳達完整訊息]",
      異常件數: dataitme2["2-29"],
      異常率: dataitme2["2-29"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "車鈴[貼紙文字無法傳達完整訊息]",
      異常件數: dataitme2["2-33"],
      異常率: dataitme2["2-33"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "把手套[黏潮/紋路磨損/破損]",
      異常件數: dataitme2["2-30"],
      異常率: dataitme2["2-30"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "把手套[髒汙 致無法使用]",
      異常件數: dataitme2["2-31"],
      異常率: dataitme2["2-31"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "車體外觀[車架髒汙/小廣告/塗鴉]",
      異常件數: dataitme2["2-34"],
      異常率: dataitme2["2-34"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "車體外觀[前後泥除髒污]",
      異常件數: dataitme2["2-36"],
      異常率: dataitme2["2-36"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "車體外觀[掉漆]",
      異常件數: dataitme2["2-35"],
      異常率: dataitme2["2-35"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "後泥除貼紙[刮傷]",
      異常件數: dataitme2["2-37"],
      異常率: dataitme2["2-37"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "後泥除貼紙[車號]",
      異常件數: dataitme2["2-38"],
      異常率: dataitme2["2-38"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "座管束子貼紙[座管束子貼紙文字已無法傳達完整訊息]",
      異常件數: dataitme2["2-39"],
      異常率: dataitme2["2-39"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "座墊[座墊與底部分離]",
      異常件數: dataitme2["2-42"],
      異常率: dataitme2["2-42"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "座墊[座墊表面破損、龜裂]",
      異常件數: dataitme2["2-43"],
      異常率: dataitme2["2-43"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "座墊[髒汙導致無法騎乘]",
      異常件數: dataitme2["2-44"],
      異常率: dataitme2["2-44"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "前後輪軸螺絲 [後100%面積嚴重生鏽]",
      異常件數: dataitme2["2-56"],
      異常率: dataitme2["2-56"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "前後輪軸螺絲 [前100%面積嚴重生鏽]",
      異常件數: dataitme2["2-55"],
      異常率: dataitme2["2-55"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "前/後燈[前燈線未妥善固定及絕緣膠布翹起]",
      異常件數: dataitme2["2-59"],
      異常率: dataitme2["2-59"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "隨車鎖[貼紙文字已無法傳達完整訊息]",
      異常件數: dataitme2["2-68"],
      異常率: dataitme2["2-68"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "隨車鎖[鎖孔生鏽]",
      異常件數: dataitme2["2-69"],
      異常率: dataitme2["2-69"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "隨車鎖[鎖體生鏽]",
      異常件數: dataitme2["2-71"],
      異常率: dataitme2["2-71"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "電量顯示 [借出時電量<20/異常顯示]",
      異常件數: dataitme2["E-1"],
      異常率: dataitme2["E-1"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "費率貼紙 [無貼紙]",
      異常件數: dataitme2["E-6"],
      異常率: dataitme2["E-6"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "費率貼紙 [舊版/破損]",
      異常件數: dataitme2["E-7"],
      異常率: dataitme2["E-7"] / carnum,
    },

    //此為第三類
    {
      類別: "自行車重要機能",
      項目: "車機機殼[太陽能面板產生氣泡]",
      異常件數: dataitme2["2-15"],
      異常率: dataitme2["2-15"] / carnum,
      類別分數: u46E,
    },
    {
      類別: "自行車重要機能",
      項目: "車機功能[完成借車流程後，無法正常拉出]",
      異常件數: dataitme2["2-16"],
      異常率: dataitme2["2-16"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "車機功能[螢幕文字無法正常顯示]",
      異常件數: dataitme2["2-17"],
      異常率: dataitme2["2-17"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "防轉彈簧及停車架[防轉彈簧脫落]",
      異常件數: dataitme2["2-19"],
      異常率: dataitme2["2-19"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "防轉彈簧及停車架[停車架架起後 , 車輛不會倒]",
      異常件數: dataitme2["2-20"],
      異常率: dataitme2["2-20"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "煞車及變速外管[煞車外管 破損、龜裂、絕緣膠翹起]",
      異常件數: dataitme2["2-27"],
      異常率: dataitme2["2-27"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "煞車及變速外管[變速外管 破損、龜裂、絕緣膠翹起]",
      異常件數: dataitme2["2-28"],
      異常率: dataitme2["2-28"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "車鈴[轉動無法發出鈴聲]",
      異常件數: dataitme2["2-32"],
      異常率: dataitme2["2-32"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊[座墊搖晃]",
      異常件數: dataitme2["2-40"],
      異常率: dataitme2["2-40"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊[歪斜]",
      異常件數: dataitme2["2-41"],
      異常率: dataitme2["2-41"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[高度調整不順]",
      異常件數: dataitme2["2-45"],
      異常率: dataitme2["2-45"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[束子鎖死 (無法調整高度)]",
      異常件數: dataitme2["2-46"],
      異常率: dataitme2["2-46"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[黃色拉桿斷裂]",
      異常件數: dataitme2["2-47"],
      異常率: dataitme2["2-47"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[座墊桿滑落無法固定]",
      異常件數: dataitme2["2-48"],
      異常率: dataitme2["2-48"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[反轉後無法固定位置]",
      異常件數: dataitme2["2-49"],
      異常率: dataitme2["2-49"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[座墊桿與車體分離]",
      異常件數: dataitme2["2-51"],
      異常率: dataitme2["2-51"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[座墊未在最底部就可反轉]",
      異常件數: dataitme2["2-50"],
      異常率: dataitme2["2-50"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "輪胎[胎紋磨損至平滑、龜裂、反光帶脫落]",
      異常件數: dataitme2["2-52"],
      異常率: dataitme2["2-52"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "輪胎[輪框變形、缺鋼絲]",
      異常件數: dataitme2["2-53"],
      異常率: dataitme2["2-53"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "輪胎[前或後輪偏擺]",
      異常件數: dataitme2["2-54"],
      異常率: dataitme2["2-54"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "前/後燈[前燈脫落、破損、不亮]",
      異常件數: dataitme2["2-57"],
      異常率: dataitme2["2-57"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "前/後燈[後燈脫落、破損、不亮]",
      異常件數: dataitme2["2-58"],
      異常率: dataitme2["2-58"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "煞車[無法煞車]",
      異常件數: dataitme2["2-60"],
      異常率: dataitme2["2-60"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "煞車[過鬆或過緊]",
      異常件數: dataitme2["2-61"],
      異常率: dataitme2["2-61"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "煞車[異音]",
      異常件數: dataitme2["2-62"],
      異常率: dataitme2["2-62"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "變速[指示蓋(銀)脫落]",
      異常件數: dataitme2["2-63"],
      異常率: dataitme2["2-63"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "變速[上蓋(黑)脫落、檔位標示無法辨識]",
      異常件數: dataitme2["2-64"],
      異常率: dataitme2["2-64"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "變速[換檔轉動不順、過緊]",
      異常件數: dataitme2["2-65"],
      異常率: dataitme2["2-65"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "變速[檔位無法定位]",
      異常件數: dataitme2["2-66"],
      異常率: dataitme2["2-66"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "變速[實際騎乘無法變速]",
      異常件數: dataitme2["2-67"],
      異常率: dataitme2["2-67"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "隨車鎖[解鎖失敗]",
      異常件數: dataitme2["2-70"],
      異常率: dataitme2["2-70"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "騎乘行進[行進不順暢]",
      異常件數: dataitme2["2-72"],
      異常率: dataitme2["2-72"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "騎乘行進[發出異音]",
      異常件數: dataitme2["2-73"],
      異常率: dataitme2["2-73"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "胎壓<50 (含爆胎),胎壓>90",
      異常件數: dataitme2["2-75"] + dataitme2["2-77"],
      異常率: (dataitme2["2-75"] + dataitme2["2-77"]) / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "90>胎壓>75",
      異常件數: dataitme2["2-76"],
      異常率: dataitme2["2-76"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "電量顯示 [電量低於15系統未鎖車]",
      異常件數: dataitme2["E-2"],
      異常率: dataitme2["E-2"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "前 / 後燈 [靜止狀態借出未亮/歸還未滅]",
      異常件數: dataitme2["E-4"],
      異常率: dataitme2["E-4"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "前 / 後燈 [借出後未恆亮/閃爍/忽滅忽亮]",
      異常件數: dataitme2["E-5"],
      異常率: dataitme2["E-5"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "作動 [騎行踩動時 無動力推進]",
      異常件數: dataitme2["E-8"],
      異常率: dataitme2["E-8"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "作動 [停車靜止時 有動力推進]",
      異常件數: dataitme2["E-9"],
      異常率: dataitme2["E-9"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "車速 [無 車速測片 或 感應片]",
      異常件數: dataitme2["E-10"],
      異常率: dataitme2["E-10"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "車速 [車機面板 車速顯示異常]",
      異常件數: dataitme2["E-11"],
      異常率: dataitme2["E-11"] / carnum,
    },
  ];
  obj4.forEach((element, index) => {
    obj4[index]["異常率"] = `${Math.floor(obj4[index]["異常率"] * 100)}%`;
  });

  const datatime3 = data.total5;
  //這是第三個
  const obj5 = [
    {
      類別: "場站",
      項目: "場站導標桿[歪斜/損毀]",
      異常件數: datatime3["2-A"],
      異常率: datatime3["2-A"] / carnum,
      類別分數: u4,
    },
    {
      類別: "場站",
      項目: "場站導標桿[漏缺]",
      異常件數: datatime3["2-B"],
      異常率: datatime3["2-B"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱環境[垃圾]",
      異常件數: datatime3["2-3"],
      異常率: datatime3["2-3"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱或基板[髒汙/脫漆/貼紙翹起/鏽蝕]",
      異常件數: datatime3["2-2"],
      異常率: datatime3["2-2"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[柱號貼紙面板破裂]",
      異常件數: datatime3["2-4"],
      異常率: datatime3["2-4"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[站名貼紙文字無法傳達完整訊息]",
      異常件數: datatime3["2-5"],
      異常率: datatime3["2-5"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[太陽能面板破裂]",
      異常件數: datatime3["2-6"],
      異常率: datatime3["2-6"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[太陽能面板水氣]",
      異常件數: datatime3["2-7"],
      異常率: datatime3["2-7"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[遮蓋太陽能面板後左下方燈光未亮起]",
      異常件數: datatime3["2-9"],
      異常率: datatime3["2-9"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[車柱搖晃]",
      異常件數: datatime3["2-10"],
      異常率: datatime3["2-10"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[鎖體生鏽]",
      異常件數: datatime3["2-8"],
      異常率: datatime3["2-8"] / carnum,
    },
    {
      類別: "場站",
      項目: "車柱[還車異常]",
      異常件數: datatime3["2-11"],
      異常率: datatime3["2-11"] / carnum,
    },
    {
      類別: "場站",
      項目: "還車導引槽[缺漏/鬆動]",
      異常件數: datatime3["2-12"],
      異常率: datatime3["2-12"] / carnum,
    },

    ///此為第二類
    {
      類別: "自行車外觀與重要提示",
      項目: "一級檢修貼紙",
      異常件數: datatime3["2-1"],
      異常率: datatime3["2-1"] / carnum,
      類別分數: u17EE,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "車機機殼[車機髒污/塗鴉/廣告貼紙/褪色]",
      異常件數: datatime3["2-13"],
      異常率: datatime3["2-13"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "車機機殼[車機破損/嚴重刮痕]",
      異常件數: datatime3["2-14"],
      異常率: datatime3["2-14"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "車機功能[借、還車無提示音]",
      異常件數: datatime3["2-18"],
      異常率: datatime3["2-18"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "置物籃前後貼紙[置物籃前後貼紙無法傳達完整訊息]",
      異常件數: datatime3["2-21"],
      異常率: datatime3["2-21"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "置物籃[嚴重髒汙/沾黏/垃圾]",
      異常件數: datatime3["2-22"],
      異常率: datatime3["2-22"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "置物籃[破損]",
      異常件數: datatime3["2-23"],
      異常率: datatime3["2-23"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "置物籃[鉸線頭固定座上下皆破損]",
      異常件數: datatime3["2-24"],
      異常率: datatime3["2-24"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "置物籃[鉸線破損 或 生鏽]",
      異常件數: datatime3["2-25"],
      異常率: datatime3["2-25"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "煞車及變速外管[蛇管脫落、遺失]",
      異常件數: datatime3["2-26"],
      異常率: datatime3["2-26"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "車把手貼紙[左、右側把手貼紙文字無法傳達完整訊息]",
      異常件數: datatime3["2-29"],
      異常率: datatime3["2-29"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "車鈴[貼紙文字無法傳達完整訊息]",
      異常件數: datatime3["2-33"],
      異常率: datatime3["2-33"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "把手套[黏潮/紋路磨損/破損]",
      異常件數: datatime3["2-30"],
      異常率: datatime3["2-30"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "把手套[髒汙 致無法使用]",
      異常件數: datatime3["2-31"],
      異常率: datatime3["2-31"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "車體外觀[車架髒汙/小廣告/塗鴉]",
      異常件數: datatime3["2-34"],
      異常率: datatime3["2-34"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "車體外觀[前後泥除髒污]",
      異常件數: datatime3["2-36"],
      異常率: datatime3["2-36"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "車體外觀[掉漆]",
      異常件數: datatime3["2-35"],
      異常率: datatime3["2-35"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "後泥除貼紙[刮傷]",
      異常件數: datatime3["2-37"],
      異常率: datatime3["2-37"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "後泥除貼紙[車號]",
      異常件數: datatime3["2-38"],
      異常率: datatime3["2-38"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "座管束子貼紙[座管束子貼紙文字已無法傳達完整訊息]",
      異常件數: datatime3["2-39"],
      異常率: datatime3["2-39"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "座墊[座墊與底部分離]",
      異常件數: datatime3["2-42"],
      異常率: datatime3["2-42"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "座墊[座墊表面破損、龜裂]",
      異常件數: datatime3["2-43"],
      異常率: datatime3["2-43"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "座墊[髒汙導致無法騎乘]",
      異常件數: datatime3["2-44"],
      異常率: datatime3["2-44"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "前後輪軸螺絲 [後100%面積嚴重生鏽]",
      異常件數: datatime3["2-56"],
      異常率: datatime3["2-56"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "前後輪軸螺絲 [前100%面積嚴重生鏽]",
      異常件數: datatime3["2-55"],
      異常率: datatime3["2-55"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "前/後燈[前燈線未妥善固定及絕緣膠布翹起]",
      異常件數: datatime3["2-59"],
      異常率: datatime3["2-59"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "隨車鎖[貼紙文字已無法傳達完整訊息]",
      異常件數: datatime3["2-68"],
      異常率: datatime3["2-68"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "隨車鎖[鎖孔生鏽]",
      異常件數: datatime3["2-69"],
      異常率: datatime3["2-69"] / carnum,
    },

    {
      類別: "自行車外觀與重要提示",
      項目: "隨車鎖[鎖體生鏽]",
      異常件數: datatime3["2-71"],
      異常率: datatime3["2-71"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "電量顯示 [借出時電量<20/異常顯示]",
      異常件數: datatime3["E-1"],
      異常率: datatime3["E-1"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "費率貼紙 [無貼紙]",
      異常件數: datatime3["E-6"],
      異常率: datatime3["E-6"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "費率貼紙 [舊版/破損]",
      異常件數: datatime3["E-7"],
      異常率: datatime3["E-7"] / carnum,
    },
    {
      類別: "自行車外觀與重要提示",
      項目: "後泥除貼紙 [電池]",
      異常件數: datatime3["E-12"],
      異常率: datatime3["E-12"] / carnum,
    },

    //此為第三類
    {
      類別: "自行車重要機能",
      項目: "車機機殼[太陽能面板產生氣泡]",
      異常件數: datatime3["2-15"],
      異常率: datatime3["2-15"] / carnum,
      類別分數: u46EE,
    },
    {
      類別: "自行車重要機能",
      項目: "車機功能[完成借車流程後，無法正常拉出]",
      異常件數: datatime3["2-16"],
      異常率: datatime3["2-16"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "車機功能[螢幕文字無法正常顯示]",
      異常件數: datatime3["2-17"],
      異常率: datatime3["2-17"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "防轉彈簧及停車架[防轉彈簧脫落]",
      異常件數: datatime3["2-19"],
      異常率: datatime3["2-19"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "防轉彈簧及停車架[停車架架起後 , 車輛不會倒]",
      異常件數: datatime3["2-20"],
      異常率: datatime3["2-20"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "煞車及變速外管[煞車外管 破損、龜裂、絕緣膠翹起]",
      異常件數: datatime3["2-27"],
      異常率: datatime3["2-27"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "煞車及變速外管[變速外管 破損、龜裂、絕緣膠翹起]",
      異常件數: datatime3["2-28"],
      異常率: datatime3["2-28"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "車鈴[轉動無法發出鈴聲]",
      異常件數: datatime3["2-32"],
      異常率: datatime3["2-32"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊[座墊搖晃]",
      異常件數: datatime3["2-40"],
      異常率: datatime3["2-40"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊[歪斜]",
      異常件數: datatime3["2-41"],
      異常率: datatime3["2-41"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[高度調整不順]",
      異常件數: datatime3["2-45"],
      異常率: datatime3["2-45"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[束子鎖死 (無法調整高度)]",
      異常件數: datatime3["2-46"],
      異常率: datatime3["2-46"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[黃色拉桿斷裂]",
      異常件數: datatime3["2-47"],
      異常率: datatime3["2-47"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[座墊桿滑落無法固定]",
      異常件數: datatime3["2-48"],
      異常率: datatime3["2-48"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[反轉後無法固定位置]",
      異常件數: datatime3["2-49"],
      異常率: datatime3["2-49"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[座墊桿與車體分離]",
      異常件數: datatime3["2-51"],
      異常率: datatime3["2-51"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "座墊桿[座墊未在最底部就可反轉]",
      異常件數: datatime3["2-50"],
      異常率: datatime3["2-50"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "輪胎[胎紋磨損至平滑、龜裂、反光帶脫落]",
      異常件數: datatime3["2-52"],
      異常率: datatime3["2-52"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "輪胎[輪框變形、缺鋼絲]",
      異常件數: datatime3["2-53"],
      異常率: datatime3["2-53"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "輪胎[前或後輪偏擺]",
      異常件數: datatime3["2-54"],
      異常率: datatime3["2-54"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "前/後燈[前燈脫落、破損、不亮]",
      異常件數: datatime3["2-57"],
      異常率: datatime3["2-57"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "前/後燈[後燈脫落、破損、不亮]",
      異常件數: datatime3["2-58"],
      異常率: datatime3["2-58"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "煞車[無法煞車]",
      異常件數: datatime3["2-60"],
      異常率: datatime3["2-60"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "煞車[過鬆或過緊]",
      異常件數: datatime3["2-61"],
      異常率: datatime3["2-61"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "煞車[異音]",
      異常件數: datatime3["2-62"],
      異常率: datatime3["2-62"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "變速[指示蓋(銀)脫落]",
      異常件數: datatime3["2-63"],
      異常率: datatime3["2-63"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "變速[上蓋(黑)脫落、檔位標示無法辨識]",
      異常件數: datatime3["2-64"],
      異常率: datatime3["2-64"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "變速[換檔轉動不順、過緊]",
      異常件數: datatime3["2-65"],
      異常率: datatime3["2-65"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "變速[檔位無法定位]",
      異常件數: datatime3["2-66"],
      異常率: datatime3["2-66"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "變速[實際騎乘無法變速]",
      異常件數: datatime3["2-67"],
      異常率: datatime3["2-67"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "隨車鎖[解鎖失敗]",
      異常件數: datatime3["2-70"],
      異常率: datatime3["2-70"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "騎乘行進[行進不順暢]",
      異常件數: datatime3["2-72"],
      異常率: datatime3["2-72"] / carnum,
    },

    {
      類別: "自行車重要機能",
      項目: "騎乘行進[發出異音]",
      異常件數: datatime3["2-73"],
      異常率: datatime3["2-73"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "胎壓<50 (含爆胎),胎壓>90",
      異常件數: datatime3["2-75"] + datatime3["2-77"],
      異常率: (datatime3["2-75"] + datatime3["2-77"]) / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "90>胎壓>75",
      異常件數: datatime3["2-76"],
      異常率: datatime3["2-76"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "電量顯示 [電量低於15系統未鎖車]",
      異常件數: datatime3["E-2"],
      異常率: datatime3["E-2"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "前 / 後燈 [靜止狀態借出未亮/歸還未滅]",
      異常件數: datatime3["E-4"],
      異常率: datatime3["E-4"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "前 / 後燈 [借出後未恆亮/閃爍/忽滅忽亮]",
      異常件數: datatime3["E-5"],
      異常率: datatime3["E-5"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "作動 [騎行踩動時 無動力推進]",
      異常件數: datatime3["E-8"],
      異常率: datatime3["E-8"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "作動 [停車靜止時 有動力推進]",
      異常件數: datatime3["E-9"],
      異常率: datatime3["E-9"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "車速 [無 車速測片 或 感應片]",
      異常件數: datatime3["E-10"],
      異常率: datatime3["E-10"] / carnum,
    },
    {
      類別: "自行車重要機能",
      項目: "車速 [車機面板 車速顯示異常]",
      異常件數: datatime3["E-11"],
      異常率: datatime3["E-11"] / carnum,
    },
  ];
  obj5.forEach((element, index) => {
    obj5[index]["異常率"] = `${Math.floor(obj5[index]["異常率"] * 100)}%`;
  });

  //下面那一條
  const col3 = [
    "可動率",
    "可動扣分",
    "總異常台數",
    "異常率",
    "模擬體驗總分",
    "2.0異常台數",
    "2.0總分",
    "2.0E異常台數",
    "2.0E總分",
    "2.0+E總分",
  ];
  const obj3 = [
    {
      可動率: item4,
      可動率扣分: item5,
      總異常台數: item6,
      異常率: item8,
      模擬體驗總分: item7,
      "2.0異常台數": item9,
      "2.0總分": item10,
      "2.0E異常台數": item11,
      "2.0E總分": item12,
      "2.0+E總分": item13,
    },
  ];
  //這裡是下面那場站資料

  const obj2 = [
    {
      項目: "抽驗場站數",
      [title]: item1,
    },
    {
      項目: "抽驗總在站車輛數",
      [title]: item2,
    },
    {
      項目: "無法租借車輛數",
      [title]: item3,
    },
    {
      項目: "在站車輛可動率",
      [title]: item4,
    },
  ];
  const col2 = ["項目", title];
  const total = [
    {
      col,
      obj,
    },
    {
      col: col,
      obj: obj4,
    },
    {
      col: col,
      obj: obj5,
    },
    {
      col: col2,
      obj: obj2,
    },
    {
      col: col3,
      obj: obj3,
    },
  ];

  return total;
}

// outExcel();
async function submit() {
  try {
    if (selectvalue.value === null) {
      ErrorAlert("請選擇城市+系統");
      return;
    } else if (range1.value === undefined) {
      ErrorAlert("請選擇日期");
      return;
    }

    //全部模擬體驗
    const biketestData = await getBikeTestData();
    //全部場站檢驗
    const stationtestData = await getStationTestData();
    const starttime = range1.value[0];
    const endtime = range1.value[1];

    if (selectvalue.value === "全選") {
      const total = [];

      const res2 = await getTable2(
        biketestData,
        stationtestData,
        ["新北市", "台北市"],
        starttime,
        endtime
      );
      const editdata2 = editstation2Excel(res2, "雙北2.0");
      total.push(editdata2[1]);

      const res3 = await getTable2e(
        biketestData,
        stationtestData,
        ["新竹縣", "新竹市", "竹科"],
        starttime,
        endtime
      );
      const editdata3 = editstation2EExcel(res3, "雙竹2.0跟2.0E");
      total.push(editdata3[3]);

      const res12 = await getTable2e(
        biketestData,
        stationtestData,
        ["桃園市"],
        starttime,
        endtime
      );
      const editdata12 = editstation2EExcel(res12, "桃園2.0跟2.0E");
      total.push(editdata12[3]);

      const res5 = await getTable1(
        biketestData,
        stationtestData,
        ["苗栗縣"],
        starttime,
        endtime
      );
      const editdata5 = editstation1Excel(res5, "苗栗1.0");
      total.push(editdata5[1]);

      const res13 = await getTable2e(
        biketestData,
        stationtestData,
        ["苗栗縣"],
        starttime,
        endtime
      );
      const editdata13 = editstation2EExcel(res13, "苗栗2.0跟2.0E");
      total.push(editdata13[3]);

      const res6 = await getTable2e(
        biketestData,
        stationtestData,
        ["台中市"],
        starttime,
        endtime
      );
      const editdata6 = editstation2EExcel(res6, "台中2.0跟2.0E");
      total.push(editdata6[3]);

      const res7 = await getTable2e(
        biketestData,
        stationtestData,
        ["嘉義市", "嘉義縣"],
        starttime,
        endtime
      );
      const editdata7 = editstation2EExcel(res7, "嘉義2.0跟2.0E");
      total.push(editdata7[3]);

      const res8 = await getTable2e(
        biketestData,
        stationtestData,
        ["台南市"],
        starttime,
        endtime
      );
      const editdata8 = editstation2EExcel(res8, "台南2.0跟2.0E");
      total.push(editdata8[3]);

      const res9 = await getTable2e(
        biketestData,
        stationtestData,
        ["高雄市"],
        starttime,
        endtime
      );
      const editdata9 = editstation2EExcel(res9, "高雄2.0跟2.0E");
      total.push(editdata9[3]);

      const res10 = await getTable2e(
        biketestData,
        stationtestData,
        ["屏東縣"],
        starttime,
        endtime
      );
      const editdata10 = editstation2EExcel(res10, "屏東2.0跟2.0E");
      total.push(editdata10[3]);

      const obj = [{}];

      total.forEach((item, index) => {
        if (index === 0) {
          obj[0]["col"] = [...total[index]["col"]];
          obj[0]["obj"] = [...total[index]["obj"]];
        } else {
          const cityname = total[index]["col"][1];
          obj[0]["col"].push(cityname);
          obj[0]["obj"][0][cityname] = total[index]["obj"][0][cityname];
          obj[0]["obj"][1][cityname] = total[index]["obj"][1][cityname];
          obj[0]["obj"][2][cityname] = total[index]["obj"][2][cityname];
          obj[0]["obj"][3][cityname] = total[index]["obj"][3][cityname];
        }
      });

      outExcel(obj, "全縣市");
    } else if (selectvalue.value === "雙北2.0") {
      const title = "雙北2.0";
      const res = await getTable2(
        biketestData,
        stationtestData,
        ["新北市", "台北市"],
        starttime,
        endtime
      );
      const editdata = editstation2Excel(res, title);

      outExcel(editdata, title);
    } else if (selectvalue.value === "桃園2.0/2.0E") {
      const title = "桃園2.0跟2.0E";
      const res = await getTable2e(
        biketestData,
        stationtestData,
        ["桃園市"],
        starttime,
        endtime
      );
      const editdata = editstation2EExcel(res, title);
      outExcel(editdata, title);
    } else if (selectvalue.value === "雙竹2.0/2.0E") {
      const title = "雙竹2.0跟2.0E";
      const res = await getTable2e(
        biketestData,
        stationtestData,
        ["新竹縣", "新竹市", "竹科"],
        starttime,
        endtime
      );
      const editdata = editstation2EExcel(res, title);
      outExcel(editdata, title);
    } else if (selectvalue.value === "苗栗1.0") {
      const title = "苗栗1.0";
      const res = await getTable1(
        biketestData,
        stationtestData,
        ["苗栗縣"],
        starttime,
        endtime
      );
      const editdata = editstation1Excel(res, title);
      outExcel(editdata, title);
    } else if (selectvalue.value === "苗栗2.0/2.0E") {
      const title = "苗栗2.0跟2.0E";
      const res = await getTable2e(
        biketestData,
        stationtestData,
        ["苗栗縣"],
        starttime,
        endtime
      );
      const editdata = editstation2EExcel(res, title);
      outExcel(editdata, title);
    } else if (selectvalue.value === "台中2.0/2.0E") {
      const title = "台中2.0跟2.0E";
      const res = await getTable2e(
        biketestData,
        stationtestData,
        ["台中市"],
        starttime,
        endtime
      );
      const editdata = editstation2EExcel(res, title);
      outExcel(editdata, title);
    } else if (selectvalue.value === "嘉義2.0/2.0E") {
      const title = "嘉義2.0跟2.0E";
      const res = await getTable2e(
        biketestData,
        stationtestData,
        ["嘉義市", "嘉義縣"],
        starttime,
        endtime
      );
      const editdata = editstation2EExcel(res, title);
      outExcel(editdata, title);
    } else if (selectvalue.value === "台南2.0/2.0E") {
      const title = "台南2.0跟2.0E";
      const res = await getTable2e(
        biketestData,
        stationtestData,
        ["台南市"],
        starttime,
        endtime
      );
      const editdata = editstation2EExcel(res, title);
      outExcel(editdata, title);
    } else if (selectvalue.value === "高雄2.0/2.0E") {
      const title = "高雄2.0跟2.0E";
      const res = await getTable2e(
        biketestData,
        stationtestData,
        ["高雄市"],
        starttime,
        endtime
      );
      const editdata = editstation2EExcel(res, title);
      outExcel(editdata, title);
    } else if (selectvalue.value === "屏東2.0/2.0E") {
      const title = "屏東2.0跟2.0E";
      const res = await getTable2e(
        biketestData,
        stationtestData,
        ["屏東縣"],
        starttime,
        endtime
      );
      const editdata = editstation2EExcel(res, title);
      outExcel(editdata, title);
    }
  } catch (error) {
    console.log(error);
  }
}

async function submit2() {
  try {
    if (selectvalue.value !== "全選") {
      ErrorAlert("成績彙整必須為全選");
      return;
    } else if (range1.value === undefined) {
      ErrorAlert("請選擇日期");
      return;
    }

    //全部模擬體驗
    const biketestData = await getBikeTestData();
    //全部場站檢驗
    const stationtestData = await getStationTestData();
    const starttime = range1.value[0];
    const endtime = range1.value[1];

    const total = [];

    const res2 = await getTable2(
      biketestData,
      stationtestData,
      ["新北市", "台北市"],
      starttime,
      endtime
    );
    total.push({
      城市: "雙北2.0",
      ...res2.finalObj,
    });

    const res12 = await getTable2e(
      biketestData,
      stationtestData,
      ["桃園市"],
      starttime,
      endtime
    );

    total.push({ 城市: "桃園2.0跟2.0E", ...res12.finalObj });

    const res3 = await getTable2e(
      biketestData,
      stationtestData,
      ["新竹縣", "新竹市", "竹科"],
      starttime,
      endtime
    );
    // const editdata3 = editstation2EExcel(res3, "雙竹2.0跟2.0E");
    total.push({ 城市: "雙竹2.0跟2.0E", ...res3.finalObj });

    const res5 = await getTable1(
      biketestData,
      stationtestData,
      ["苗栗縣"],
      starttime,
      endtime
    );
    // const editdata5 = editstation1Excel(res5, "苗栗1.0");
    total.push({ 城市: "苗栗1.0", ...res5.finalObj });

    const res13 = await getTable2e(
      biketestData,
      stationtestData,
      ["苗栗縣"],
      starttime,
      endtime
    );
    // const editdata6 = editstation2EExcel(res6, "台中2.0跟2.0E");
    total.push({ 城市: "苗栗2.0跟2.0E", ...res13.finalObj });

    const res6 = await getTable2e(
      biketestData,
      stationtestData,
      ["台中市"],
      starttime,
      endtime
    );
    // const editdata6 = editstation2EExcel(res6, "台中2.0跟2.0E");
    total.push({ 城市: "台中2.0跟2.0E", ...res6.finalObj });

    const res7 = await getTable2e(
      biketestData,
      stationtestData,
      ["嘉義市", "嘉義縣"],
      starttime,
      endtime
    );
    // const editdata7 = editstation2EExcel(res7, "嘉義2.0跟2.0E");
    total.push({ 城市: "嘉義2.0跟2.0E", ...res7.finalObj });

    const res8 = await getTable2e(
      biketestData,
      stationtestData,
      ["台南市"],
      starttime,
      endtime
    );
    // const editdata8 = editstation2EExcel(res8, "台南2.0跟2.0E");
    total.push({ 城市: "台南2.0跟2.0E", ...res8.finalObj });

    const res9 = await getTable2e(
      biketestData,
      stationtestData,
      ["高雄市"],
      starttime,
      endtime
    );
    // const editdata9 = editstation2EExcel(res9, "高雄2.0跟2.0E");
    total.push({ 城市: "高雄2.0跟2.0E", ...res9.finalObj });

    const res10 = await getTable2e(
      biketestData,
      stationtestData,
      ["屏東縣"],
      starttime,
      endtime
    );
    // const editdata10 = editstation2EExcel(res10, "屏東2.0跟2.0E");
    total.push({ 城市: "屏東2.0跟2.0E", ...res10.finalObj });

    const col = ["項目"];
    const obj = [
      { 項目: "施測站數" },
      { 項目: "施測車輛數" },
      { 項目: "2.0E施測車輛數" },
      { 項目: "前後胎壓未達標準1" },
      { 項目: "前後胎壓未達標準2" },
      { 項目: "場站妥善度" },
      { 項目: "自行車外觀與重要標示" },
      { 項目: "自行車重要機能" },
      { 項目: "總分/2.0+E總分" },
      { 項目: "區域總分" },
    ];

    total.forEach((item, index) => {
      col.push(item["城市"]);
      obj[0][item["城市"]] = item["施測站數"];
      obj[1][item["城市"]] = item["施測車輛數"];
      obj[2][item["城市"]] = item["2.0E施測車輛數"];
      obj[3][item["城市"]] = item["前後胎壓未達標準1"];
      obj[4][item["城市"]] = item["前後胎壓未達標準2"];
      obj[5][item["城市"]] = item["場站妥善度"];
      obj[6][item["城市"]] = item["2.0E總分"]
        ? item["2.0+2.0E第二格"]
        : item["自行車外觀與重要標示"];
      obj[7][item["城市"]] = item["2.0E總分"]
        ? item["2.0+2.0E第三格"]
        : item["自行車重要機能"];
      obj[8][item["城市"]] =
        item["總分"] === undefined
          ? item["模擬體驗總分"].toFixed(2)
          : item["總分"];
      obj[9][item["城市"]] = null;

      if (index === obj.length - 1) {
        col.push("總數/平均值");
      }
    });

    //算旁邊的總數/平均值
    obj.forEach((elements, index) => {
      const item = obj[index];
      if (index === 0 || index === 1 || index === 2 || index === 3) {
        // B3~K3加總 B4~K4加總 B5~K5加總 B6~K6加總

        let num = 0;
        for (const key in item) {
          if (typeof item[key] === "number") {
            num += item[key];
          }
        }
        obj[index]["總數/平均值"] = num;
      } else if (index === 4) {
        obj[index]["總數/平均值"] =
          obj[3]["總數/平均值"] / obj[1]["總數/平均值"];
      } else if (index === 5) {
        let num = 0;
        for (const key in obj[0]) {
          if (key !== "總數/平均值" && key != "項目") {
            num += obj[0][key] * obj[5][key];
          }
        }
        obj[index]["總數/平均值"] = num / obj[0]["總數/平均值"];
      } else if (index === 6) {
        let num = 0;
        for (const key in obj[0]) {
          if (key !== "總數/平均值" && key != "項目") {
            num += obj[1][key] * obj[6][key];
          }
        }
        obj[index]["總數/平均值"] = num / obj[1]["總數/平均值"];
      } else if (index === 7) {
        let num = 0;
        for (const key in obj[0]) {
          if (key !== "總數/平均值" && key != "項目") {
            num += obj[3][key] * obj[7][key];
          }
        }
        obj[index]["總數/平均值"] = num / obj[3]["總數/平均值"];
      } else if (index === 8) {
        let num = 0;
        for (const key in obj[0]) {
          if (key !== "總數/平均值" && key != "項目") {
            num += (obj[1][key] + obj[2][key]) * obj[8][key];
          }
        }
        obj[index]["總數/平均值"] =
          num / (obj[1]["總數/平均值"] + obj[2]["總數/平均值"]);
      }
    });

    //算區域總分
    for (const key in obj[9]) {
      if (key === "雙北2.0") {
        obj[9][key] = (
          (obj[8]["雙北2.0"] * (obj[1]["雙北2.0"] + obj[2]["雙北2.0"])) /
          (obj[1]["雙北2.0"] + obj[2]["雙北2.0"])
        ).toFixed(2);
      } else if (
        key === "苗栗1.0" ||
        key === "苗栗2.0跟2.0E" ||
        key === "雙竹2.0跟2.0E" ||
        key === "桃園2.0跟2.0E"
      ) {
        obj[9][key] = (
          (obj[8]["桃園2.0跟2.0E"] *
            (obj[1]["桃園2.0跟2.0E"] + obj[2]["桃園2.0跟2.0E"]) +
            obj[8]["苗栗1.0"] * (obj[1]["苗栗1.0"] + obj[2]["苗栗1.0"]) +
            obj[8]["苗栗2.0跟2.0E"] *
              (obj[1]["苗栗2.0跟2.0E"] + obj[2]["苗栗2.0跟2.0E"]) +
            obj[8]["雙竹2.0跟2.0E"] *
              (obj[1]["雙竹2.0跟2.0E"] + obj[2]["雙竹2.0跟2.0E"])) /
          (obj[1]["苗栗1.0"] +
            obj[1]["雙竹2.0跟2.0E"] +
            obj[2]["雙竹2.0跟2.0E"] +
            obj[1]["苗栗2.0跟2.0E"] +
            obj[2]["苗栗2.0跟2.0E"] +
            obj[1]["桃園2.0跟2.0E"] +
            obj[2]["桃園2.0跟2.0E"])
        ).toFixed(2);
      } else if (key === "台中2.0跟2.0E" || key === "嘉義2.0跟2.0E") {
        obj[9][key] = (
          (obj[8]["台中2.0跟2.0E"] *
            (obj[1]["台中2.0跟2.0E"] + obj[2]["台中2.0跟2.0E"]) +
            obj[8]["嘉義2.0跟2.0E"] *
              (obj[1]["嘉義2.0跟2.0E"] + obj[2]["嘉義2.0跟2.0E"])) /
          (obj[1]["台中2.0跟2.0E"] +
            obj[1]["嘉義2.0跟2.0E"] +
            obj[2]["台中2.0跟2.0E"] +
            obj[2]["嘉義2.0跟2.0E"])
        ).toFixed(2);
      } else if (
        key === "台南2.0跟2.0E" ||
        key === "屏東2.0跟2.0E" ||
        key === "高雄2.0跟2.0E"
      ) {
        obj[9][key] = (
          (obj[8]["台南2.0跟2.0E"] *
            (obj[1]["台南2.0跟2.0E"] + obj[2]["台南2.0跟2.0E"]) +
            obj[8]["屏東2.0跟2.0E"] *
              (obj[1]["屏東2.0跟2.0E"] + obj[2]["屏東2.0跟2.0E"]) +
            obj[8]["高雄2.0跟2.0E"] *
              (obj[1]["高雄2.0跟2.0E"] + obj[2]["高雄2.0跟2.0E"])) /
          (obj[1]["台南2.0跟2.0E"] +
            obj[1]["屏東2.0跟2.0E"] +
            obj[1]["高雄2.0跟2.0E"] +
            obj[2]["台南2.0跟2.0E"] +
            obj[2]["屏東2.0跟2.0E"] +
            obj[2]["高雄2.0跟2.0E"])
        ).toFixed(2);
      }
    }

    outExcel(
      [
        {
          obj,
          col,
        },
      ],
      "成績彙整"
    );
  } catch (error) {
    console.log(error);
  }
}

(async () => {
  await clearform();
})();
</script>

<style lang="scss" scoped></style>
