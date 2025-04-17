<template>
  <div class="row mt-4">
    <p class="fw-bold">上傳原始資料</p>
    <div class="col-6">
      <n-date-picker
        v-model:value="range"
        type="daterange"
        clearable
        class="mb-2"
      />
      <n-button type="primary" @click="exportfun1" class="mb-1">上傳</n-button>
      <uploadCompoment />
    </div>
    <n-divider />
  </div>
</template>

<script setup>
import uploadCompoment from "../components/uploadCompoment.vue";
import { NDatePicker, NButton, NDivider } from "naive-ui";
import axios from "axios";
import { ref, inject } from "vue";
import * as XLSX from "xlsx";
const swal = inject("$swal");

//select觸發時的funs
async function ErrorAlert(text) {
  swal({
    icon: "error",
    title: `${text}`,
    showConfirmButton: false,
  });
}

const range = ref();

function Dateformate(date) {
  const SeleDate = new Date(date);
  const year = SeleDate.getFullYear();
  let month = (SeleDate.getMonth() + 1).toString();
  let day = SeleDate.getDate().toString();
  if (month.length === 1) {
    month = "0" + month;
  }
  if (day.length === 1) {
    day = "0" + day;
  }
  return `${year}-${month}-${day}`;
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

async function getStation1Data() {
  try {
    const url = `${import.meta.env.VITE_URL}/station/station1`;
    const res = await axios.get(url);
    const { data } = res;
    return data;
  } catch (error) {
    throw new Error("抓取資料錯誤");
  }
}

async function getStation2Data() {
  try {
    const url = `${import.meta.env.VITE_URL}/station/station2`;
    const res = await axios.get(url);
    const { data } = res;
    return data;
  } catch (error) {
    throw new Error("抓取資料錯誤");
  }
}

//確認日期是否在區間內
function isDateInRange(dateToCheck, startDate, endDate) {
  dateToCheck = new Date(dateToCheck);
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  return dateToCheck >= startDate && dateToCheck <= endDate;
}

async function outExcel(data) {
  const workbook = XLSX.utils.book_new();
  data.forEach((item) => {
    const worksheet = XLSX.utils.json_to_sheet(item.resdata);
    XLSX.utils.book_append_sheet(workbook, worksheet, item.title);
    XLSX.utils.sheet_add_aoa(worksheet, [item.col], { origin: "A1" });
  });

  // XLSX.writeFile(workbook, `原始資料.xlsx`);
  // 生成 workbook 的 Blob 对象
  const workbookBlob = XLSX.write(workbook, {
    type: "binary",
    bookType: "xlsx",
  });

  // 转换成 Blob
  const blob = new Blob([s2ab(workbookBlob)], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // 上传文件
  await uploadExcelToCloud(blob);
}

function formateDate(data, title, item) {
  return data.testtable[title]["ischeck"]
    ? data.testtable[title]["ischeck"].includes(item)
      ? "o"
      : ""
    : "";
}

function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
}

const uploadExcelToCloud = async (blob) => {
  const [date1, date2] = range.value;
  const startDate = Dateformate(date1);
  const endDate = Dateformate(date2);
  const formData = new FormData();
  formData.append("file", blob, `${startDate}~${endDate}.xlsx`); // 设置文件名
  const url = `${import.meta.env.VITE_URL}/biketest/upload`;
  try {
    await axios.post(url, formData);
    alert("上傳成功");
  } catch (error) {
    console.error(error);
    alert("上傳失敗");
  }
};

let totalData = [];
function makedata1(data, time) {
  // 1.0
  // 編號 姓名 公號 測驗日期 車種 城市 車號 車柱柱號 一級檢修日期 一級檢修人員  ...checkbox 前胎 後胎 備註
  const col = [
    "編號",
    "測驗日期",
    "車種",
    "城市",
    "車號",
    "車柱柱號",
    "一級檢修日期",
    "一級檢修人員",
    "一級檢修貼紙(無貼紙／無法辨識／資訊不完整)",
    "一級檢修貼紙(未撕除舊貼紙)",
    "車柱(借、還車不順)",
    "車柱(搖晃)",
    "車柱(控制器燈號　輕觸即變換)",
    "車柱(鎖體　生鏽)",
    "車柱(車柱靠卡　無提示音)",
    "停車柱貼紙／基板宣導貼紙(龜裂、褪色、脫落、翹起、歪斜)",
    "還車導引槽(漏裝)",
    "還車導引槽(鬆動)",
    "車體外觀(車架)",
    "車體外觀(後泥除)",
    "車體外觀(前叉)",
    "車體外觀(前泥除)",
    "車體外觀(車架市徽、車號)",
    "車體外觀(張貼小廣告)",
    "後泥除貼紙(廣告)",
    "後泥除貼紙(YouBike Logo)",
    "後泥除貼紙(車號)",
    "置物籃貼紙(前 車號、LOGO)",
    "置物籃貼紙(後 使用說明)",
    "置物籃(嚴重髒汙、沾黏、褪色)",
    "置物籃(垃圾)",
    "置物籃(破損 2根以上／缺固定螺絲／裝設歪斜)",
    "置物籃(鉸線頭固定座　破損)",
    "置物籃(鉸線破損)",
    "外管完整(煞車外管)",
    "外管完整(變速外管)",
    "把手套(黏潮、紋路磨損、破損)",
    "把手貼紙(左 座管束子與煞車提醒)",
    "把手貼紙(右 煞貼提醒)",
    "車鈴(調整後仍無聲響、悶響)",
    "車鈴(無車鈴)",
    "防轉彈簧／停車架(彈簧脫落)",
    "防轉彈簧／停車架(停車架架起後，後輪無法懸空／停車架變形)",
    "座墊(破損、龜裂、膠布修補、座墊與底座分離)",
    "座墊(髒汙)",
    "座管束子貼紙(破損、龜裂、褪色、翹起、脫落)",
    "座墊高低調整(高度調整不順)",
    "座墊高低調整(束子鎖死)",
    "座墊高低調整(束子歪斜)",
    "座墊高低調整(束子固定後座墊仍可移動(假性鎖死))",
    "座墊高低調整(束子脫落)",
    "座墊高低調整(調整導致手髒汙)",
    "座墊高低調整(束子磨耗產生銳角，有割傷之慮)",
    "輪胎(胎紋磨損 平滑、龜裂、反光帶脫落)",
    "輪胎(輪框變形、缺鋼絲)",
    "輪胎(前後輪偏擺)",
    "前後輪軸螺絲(前)",
    "前後輪軸螺絲(後)",
    "前／後燈(前燈)",
    "前／後燈(後燈)",
    "前／後燈(前燈線　未妥善固定或絕緣膠翹起)",
    "煞車功能(煞車過鬆)",
    "煞車功能(煞車過緊)",
    "煞車功能(黑色墊片歪斜、缺黑色墊片)",
    "煞車功能(煞車異常)",
    "煞車功能(異音)",
    "變速功能(指示蓋脫落、標示模糊)",
    "變速功能(換檔不順)",
    "變速功能(檔位無法定位／變速異常)",
    "變速功能(上蓋脫落)",
    "隨車鎖(無法插入、上鎖，上鎖後鑰匙無法拔出)",
    "騎乘行進(前後輪無法順暢轉動)",
    "騎乘行進(異音)",
    "前胎壓",
    "後胎壓",
    "是否有照片",
  ];
  const resdata = [];

  data.forEach((item) => {
    resdata.push([
      item.id,
      item["test_date"].split(" ")[0],
      item.sys,
      // item["station_name"].split("-")[1]
      //   ? item["station_name"].split("-")[0]
      //   : "",
      item["station_name"].split("-")[0] === "新北市" ||
      item["station_name"].split("-")[0] === "台北市"
        ? `雙北-${item["station_name"].split("-")[1]}`
        : item["station_name"],
      item.carnum,
      item.carnum2,
      item.testtable.date,
      item.testtable.testman,
      formateDate(item, "一級檢修貼紙", "無貼紙／無法辨識／資訊不完整"),
      formateDate(item, "一級檢修貼紙", "未撕除舊貼紙"),
      formateDate(item, "車柱", "借、還車不順"),
      formateDate(item, "車柱", "搖晃"),
      formateDate(item, "車柱", "控制器燈號　輕觸即變換"),
      formateDate(item, "車柱", "鎖體　生鏽"),
      formateDate(item, "車柱", "車柱靠卡　無提示音"),
      formateDate(
        item,
        "停車柱貼紙／基板宣導貼紙",
        "龜裂、褪色、脫落、翹起、歪斜"
      ),
      formateDate(item, "還車導引槽", "漏裝"),
      formateDate(item, "還車導引槽", "鬆動"),

      formateDate(item, "車體外觀", "車架"),
      formateDate(item, "車體外觀", "後泥除"),
      formateDate(item, "車體外觀", "前叉"),
      formateDate(item, "車體外觀", "前泥除"),
      formateDate(item, "車體外觀", "車架市徽、車號"),
      formateDate(item, "車體外觀", "張貼小廣告"),

      formateDate(item, "後泥除貼紙", "廣告"),
      formateDate(item, "後泥除貼紙", "YouBike Logo"),
      formateDate(item, "後泥除貼紙", "車號"),

      formateDate(item, "置物籃貼紙", "前 車號、LOGO"),
      formateDate(item, "置物籃貼紙", "後 使用說明"),

      formateDate(item, "置物籃", "嚴重髒汙、沾黏、褪色"),
      formateDate(item, "置物籃", "垃圾"),
      formateDate(item, "置物籃", "破損 2根以上／缺固定螺絲／裝設歪斜"),
      formateDate(item, "置物籃", "鉸線頭固定座　破損"),
      formateDate(item, "置物籃", "鉸線破損"),

      formateDate(item, "外管完整", "煞車外管"),
      formateDate(item, "外管完整", "變速外管"),

      formateDate(item, "把手套", "黏潮、紋路磨損、破損"),

      formateDate(item, "把手貼紙", "左 座管束子與煞車提醒"),
      formateDate(item, "把手貼紙", "右 煞貼提醒"),

      formateDate(item, "車鈴", "調整後仍無聲響、悶響"),
      formateDate(item, "車鈴", "無車鈴"),

      formateDate(item, "防轉彈簧／停車架", "彈簧脫落"),
      formateDate(
        item,
        "防轉彈簧／停車架",
        "停車架架起後，後輪無法懸空／停車架變形"
      ),

      formateDate(item, "座墊", "破損、龜裂、膠布修補、座墊與底座分離"),
      formateDate(item, "座墊", "髒汙"),

      formateDate(item, "座管束子貼紙", "破損、龜裂、褪色、翹起、脫落"),

      formateDate(item, "座墊高低調整", "高度調整不順"),
      formateDate(item, "座墊高低調整", "束子鎖死"),
      formateDate(item, "座墊高低調整", "束子歪斜"),
      formateDate(item, "座墊高低調整", "束子固定後座墊仍可移動(假性鎖死)"),
      formateDate(item, "座墊高低調整", "束子脫落"),
      formateDate(item, "座墊高低調整", "調整導致手髒汙"),
      formateDate(item, "座墊高低調整", "束子磨耗產生銳角，有割傷之慮"),

      formateDate(item, "輪胎", "胎紋磨損 平滑、龜裂、反光帶脫落"),
      formateDate(item, "輪胎", "輪框變形、缺鋼絲"),
      formateDate(item, "輪胎", "前後輪偏擺"),

      formateDate(item, "前後輪軸螺絲", "前"),
      formateDate(item, "前後輪軸螺絲", "後"),

      formateDate(item, "前／後燈", "前燈"),
      formateDate(item, "前／後燈", "後燈"),
      formateDate(item, "前／後燈", "前燈線　未妥善固定或絕緣膠翹起"),

      formateDate(item, "煞車功能", "煞車過鬆"),
      formateDate(item, "煞車功能", "煞車過緊"),
      formateDate(item, "煞車功能", "黑色墊片歪斜、缺黑色墊片"),
      formateDate(item, "煞車功能", "煞車異常"),
      formateDate(item, "煞車功能", "異音"),

      formateDate(item, "變速功能", "指示蓋脫落、標示模糊"),
      formateDate(item, "變速功能", "換檔不順"),
      formateDate(item, "變速功能", "檔位無法定位／變速異常"),
      formateDate(item, "變速功能", "上蓋脫落"),

      formateDate(item, "隨車鎖", "無法插入、上鎖，上鎖後鑰匙無法拔出"),

      formateDate(item, "騎乘行進", "前後輪無法順暢轉動"),
      formateDate(item, "騎乘行進", "異音"),

      item.testtable.startrow,
      item.testtable.endrow,
      time.includes(`(${formatDate2(item["test_date"])})-${item.carnum}`)
        ? "o"
        : "",
    ]);
  });

  totalData.push({
    col,
    resdata,
    title: "1.0",
  });
}

function makedata2(data, time) {
  // 1.0
  // 編號 姓名 公號 測驗日期 車種 城市 車號 車柱柱號 一級檢修日期 一級檢修人員  ...checkbox 前胎 後胎 備註
  const col = [
    "編號",

    "測驗日期",
    "車種",
    "城市",
    "車號",
    "車柱柱號",
    "一級檢修日期",
    "一級檢修人員",

    "一級檢修貼紙(無貼紙)",
    "一級檢修貼紙(無法辨識／資訊不完整)",
    "一級檢修貼紙(未撕除舊貼紙)",

    "車柱 周遭環境(車柱)",
    "車柱 周遭環境(基板)",
    "車柱 周遭環境(垃圾)",

    "車柱 外觀檢查(柱號貼紙)",
    "車柱 外觀檢查(站名貼紙文字)",
    "車柱 外觀檢查(太陽能面板  破裂 / 異常)",
    "車柱 外觀檢查(太陽能面板  水氣)",
    "車柱 外觀檢查(鎖體  面積10%生鏽)",

    "車柱 功能檢查(面板左下方燈光 未亮起)",
    "車柱 功能檢查(搖晃)",
    "車柱 功能檢查(借還車不順)",

    "還車導引槽(缺漏)",
    "還車導引槽(鬆動)",

    "車機機殼(髒污／塗鴉／小廣告／褪色)",
    "車機機殼(破損／嚴重刮痕)",
    "車機機殼(太陽能面板  產生氣泡)",

    "車機功能(借不出還不回／車機異常)",
    "車機功能(螢幕文字  無法正常顯示)",
    "車機功能(借、還車  無提示音、異常)",

    "防轉彈簧／停車架(彈簧脫落)",
    "防轉彈簧／停車架(停車架起後，車輛無法站立)",

    "置物籃貼紙(前 車號、LOGO)",
    "置物籃貼紙(後 使用說明)",

    "置物籃(嚴重髒汙、沾黏)",
    "置物籃(垃圾)",
    "置物籃(破損 2根以上／缺固定螺絲／裝設歪斜)",
    "置物籃(鉸線頭固定座　上下皆破損)",
    "置物籃(鉸線破損／生鏽)",

    "外管完整(蛇管  脫落／遺失)",
    "外管完整(煞車外管)",
    "外管完整(變速外管)",

    "把手貼紙(左 騎乘前檢查)",
    "把手貼紙(右 煞車提醒)",

    "把手套(黏潮、紋路磨損、破損)",
    "把手套(髒汙  致無法使用)",

    "車鈴(無法發出鈴聲)",
    "車鈴(貼紙文字無法傳達完整訊息)",

    "車體外觀(車架 髒汙／小廣告／塗鴉)",
    "車體外觀(車架  掉漆)",
    "車體外觀(前、後泥除  髒污／破損)",

    "後泥除貼紙(廣告)",
    "後泥除貼紙(YouBike Logo)",
    "後泥除貼紙(車號)",

    "座管束子貼紙(文字無法傳達完整訊息)",

    "座墊(拉高後搖晃)",
    "座墊(歪斜)",
    "座墊(與底部分離)",
    "座墊(表面破損、龜裂)",
    "座墊(髒汙導致無法騎乘)",

    "座墊桿(高度調整不順)",
    "座墊桿(伸縮座墊桿鎖死 ( 無法調整高度 ))",
    "座墊桿(黃色拉桿斷裂)",
    "座墊桿(座墊桿滑落 無法固定)",
    "座墊桿(反轉後無法固定位置)",
    "座墊桿(座墊未在最底部就可反轉)",
    "座墊桿(座墊桿與車體分離)",

    "輪胎(胎紋磨損 平滑、龜裂、反光帶脫落)",
    "輪胎(輪框變形、缺鋼絲)",
    "輪胎(前 或 後輪偏擺)",

    "前後輪軸螺絲(前)",
    "前後輪軸螺絲(後)",

    "前／後燈(前燈)",
    "前／後燈(後燈)",
    "前／後燈(前燈線　未妥善固定或絕緣膠翹起)",

    "前／後燈(前燈)",
    "前／後燈(後燈)",
    "前／後燈(前燈線　未妥善固定或絕緣膠翹起)",

    "煞車功能(無法煞車)",
    "煞車功能(煞車過鬆 ( 2/3仍無法煞停 ))",
    "煞車功能(煞車過緊 ( 未滿1/3已經煞停 ))",
    "煞車功能(煞車過緊 ( 未滿1/3已經煞停 ))",
    "煞車功能(異音)",

    "變速功能(指示蓋 (銀) 脫落)",
    "變速功能(上蓋 (黑) 脫落／檔位標示無法辨識)",
    "變速功能(換檔轉動不順 ( 2轉3過緊 ))",
    "變速功能(檔位無法定位)",
    "變速功能(實際騎乘無法變速)",

    "隨車鎖(貼紙文字無法傳達完整訊息)",
    "隨車鎖(鎖孔  生鏽／脫漆)",
    "隨車鎖(上鎖／解鎖 失敗、異常)",
    "隨車鎖(鎖體  面積10%生鏽)",

    "騎乘行進(行進不順暢)",
    "騎乘行進(異音)",

    "掃瑪借車",

    "前胎壓",
    "後胎壓",
  ];
  const resdata = [];
  // console.log("2.0", data);
  data.forEach((item) => {
    resdata.push([
      item.id,

      item["test_date"].split(" ")[0],
      item.sys,
      item["station_name"].split("-")[0] === "新北市" ||
      item["station_name"].split("-")[0] === "台北市"
        ? `雙北-${item["station_name"].split("-")[1]}`
        : item["station_name"],
      item.carnum,
      item.carnum2,
      item.testtable.date,
      item.testtable.testman,

      //   "一級檢修貼紙(無貼紙)",
      // "一級檢修貼紙(無法辨識／資訊不完整)",
      // "一級檢修貼紙(未撕除舊貼紙)",
      formateDate(item, "一級檢修貼紙", "無貼紙"),
      formateDate(item, "一級檢修貼紙", "無法辨識／資訊不完整"),
      formateDate(item, "一級檢修貼紙", "未撕除舊貼紙"),

      formateDate(item, "車柱 周遭環境", "車柱"),
      formateDate(item, "車柱 周遭環境", "基板"),
      formateDate(item, "車柱 周遭環境", "垃圾"),

      formateDate(item, "車柱 外觀檢查", "柱號貼紙"),
      formateDate(item, "車柱 外觀檢查", "站名貼紙文字"),
      formateDate(item, "車柱 外觀檢查", "太陽能面板  破裂 / 異常"),
      formateDate(item, "車柱 外觀檢查", "太陽能面板  水氣"),
      formateDate(item, "車柱 外觀檢查", "鎖體  面積10%生鏽"),

      formateDate(item, "車柱 功能檢查", "面板左下方燈光 未亮起"),
      formateDate(item, "車柱 功能檢查", "搖晃"),
      formateDate(item, "車柱 功能檢查", "借還車不順"),

      formateDate(item, "還車導引槽", "缺漏"),
      formateDate(item, "還車導引槽", "鬆動"),

      formateDate(item, "車機機殼", "髒污／塗鴉／小廣告／褪色"),
      formateDate(item, "車機機殼", "破損／嚴重刮痕"),
      formateDate(item, "車機機殼", "太陽能面板  產生氣泡"),

      formateDate(item, "車機功能", "借不出還不回／車機異常"),
      formateDate(item, "車機功能", "螢幕文字  無法正常顯示"),
      formateDate(item, "車機功能", "借、還車  無提示音、異常"),

      formateDate(item, "防轉彈簧／停車架", "彈簧脫落"),
      formateDate(item, "防轉彈簧／停車架", "停車架起後，車輛無法站立"),

      formateDate(item, "置物籃貼紙", "前 車號、LOGO"),
      formateDate(item, "置物籃貼紙", "後 使用說明"),

      formateDate(item, "置物籃", "嚴重髒汙、沾黏"),
      formateDate(item, "置物籃", "垃圾"),
      formateDate(item, "置物籃", "破損 2根以上／缺固定螺絲／裝設歪斜"),
      formateDate(item, "置物籃", "鉸線頭固定座　上下皆破損"),
      formateDate(item, "置物籃", "鉸線破損／生鏽"),

      formateDate(item, "外管完整", "蛇管  脫落／遺失"),
      formateDate(item, "外管完整", "煞車外管"),
      formateDate(item, "外管完整", "變速外管"),

      formateDate(item, "把手貼紙", "左 騎乘前檢查"),
      formateDate(item, "把手貼紙", "右 煞車提醒"),

      formateDate(item, "把手套", "黏潮、紋路磨損、破損"),
      formateDate(item, "把手套", "髒汙  致無法使用"),

      formateDate(item, "車鈴", "無法發出鈴聲"),
      formateDate(item, "車鈴", "貼紙文字無法傳達完整訊息"),

      formateDate(item, "車體外觀", "車架 髒汙／小廣告／塗鴉"),
      formateDate(item, "車體外觀", "車架  掉漆"),
      formateDate(item, "車體外觀", "前、後泥除  髒污／破損"),

      formateDate(item, "後泥除貼紙", "廣告"),
      formateDate(item, "後泥除貼紙", "YouBike Logo"),
      formateDate(item, "後泥除貼紙", "車號"),

      formateDate(item, "座管束子貼紙", "文字無法傳達完整訊息"),

      formateDate(item, "座墊", "拉高後搖晃"),
      formateDate(item, "座墊", "歪斜"),
      formateDate(item, "座墊", "與底部分離"),
      formateDate(item, "座墊", "表面破損、龜裂"),
      formateDate(item, "座墊", "髒汙導致無法騎乘"),

      formateDate(item, "座墊桿", "高度調整不順"),
      formateDate(item, "座墊桿", "伸縮座墊桿鎖死 ( 無法調整高度 )"),
      formateDate(item, "座墊桿", "黃色拉桿斷裂"),
      formateDate(item, "座墊桿", "座墊桿滑落 無法固定"),
      formateDate(item, "座墊桿", "反轉後無法固定位置"),
      formateDate(item, "座墊桿", "反轉後無法固定位置"),
      formateDate(item, "座墊桿", "座墊桿與車體分離"),

      formateDate(item, "輪胎", "胎紋磨損 平滑、龜裂、反光帶脫落"),
      formateDate(item, "輪胎", "輪框變形、缺鋼絲"),
      formateDate(item, "輪胎", "前 或 後輪偏擺"),

      formateDate(item, "前後輪軸螺絲", "前"),
      formateDate(item, "前後輪軸螺絲", "後"),

      formateDate(item, "前／後燈", "前燈"),
      formateDate(item, "前／後燈", "後燈"),
      formateDate(item, "前／後燈", "前燈線　未妥善固定或絕緣膠翹起"),

      formateDate(item, "前／後燈", "前燈"),
      formateDate(item, "前／後燈", "後燈"),
      formateDate(item, "前／後燈", "前燈線　未妥善固定或絕緣膠翹起"),

      formateDate(item, "煞車功能", "無法煞車"),
      formateDate(item, "煞車功能", "煞車過鬆 ( 2/3仍無法煞停 )"),
      formateDate(item, "煞車功能", "煞車過緊 ( 未滿1/3已經煞停 )"),
      formateDate(item, "煞車功能", "煞車過緊 ( 未滿1/3已經煞停 )"),
      formateDate(item, "煞車功能", "異音"),

      formateDate(item, "變速功能", "指示蓋 (銀) 脫落"),
      formateDate(item, "變速功能", "上蓋 (黑) 脫落／檔位標示無法辨識"),
      formateDate(item, "變速功能", "換檔轉動不順 ( 2轉3過緊 )"),
      formateDate(item, "變速功能", "檔位無法定位"),
      formateDate(item, "變速功能", "實際騎乘無法變速"),

      formateDate(item, "隨車鎖", "貼紙文字無法傳達完整訊息"),
      formateDate(item, "隨車鎖", "鎖孔  生鏽／脫漆"),
      formateDate(item, "隨車鎖", "上鎖／解鎖 失敗、異常"),
      formateDate(item, "隨車鎖", "鎖體  面積10%生鏽"),

      formateDate(item, "騎乘行進", "行進不順暢"),
      formateDate(item, "騎乘行進", "異音"),
      item.testtable.iscodepass === "是" ? "成功" : "失敗",
      item.testtable.startrow,
      item.testtable.endrow,
      time.includes(`(${formatDate2(item["test_date"])})-${item.carnum}`)
        ? "o"
        : "",
    ]);
  });
  totalData.push({
    col,
    resdata,
    title: "2.0",
  });
}

function editName(name) {
  const namelength = name.split("-");
  if (namelength.length === 2) {
    if (namelength[0] === "新北市" || namelength[0] === "台北市") {
      // console.log(1);
      return `雙北-${namelength[1]}`;
    } else {
      // console.log(2, name);
      return name;
    }

    // console.log(2);
  } else if (namelength.length === 3) {
    // console.log(3);
    if (namelength[0] === "新北市" || namelength[0] === "台北市") {
      // console.log(5);
      return `雙北-${namelength[1]}`;
    } else {
      // console.log(4);
      return `${namelength[0]}-${namelength[1]}`;
    }
  }
}

function makedata3(data, time) {
  // 1.0
  // 編號 姓名 公號 測驗日期 車種 城市 車號 車柱柱號 一級檢修日期 一級檢修人員  ...checkbox 前胎 後胎 備註
  const col = [
    "編號",

    "測驗日期",
    "車種",
    "城市",
    "車號",
    "車柱柱號",
    "可用電量",
    "電量(無顯示／未持續顯示)",
    "電量(電量低於20系統未鎖車)",
    "一級檢修日期",
    "一級檢修人員",

    "一級檢修貼紙(無貼紙)",
    "一級檢修貼紙(無法辨識／資訊不完整)",
    "一級檢修貼紙(未撕除舊貼紙)",

    "車柱 周遭環境(車柱)",
    "車柱 周遭環境(基板)",
    "車柱 周遭環境(垃圾)",

    "車柱 外觀檢查(柱號貼紙)",
    "車柱 外觀檢查(站名貼紙文字)",
    "車柱 外觀檢查(太陽能面板  破裂 / 異常)",
    "車柱 外觀檢查(太陽能面板  水氣)",
    "車柱 外觀檢查(鎖體  面積10%生鏽)",

    "車柱 功能檢查(面板左下方燈光 未亮起)",
    "車柱 功能檢查(搖晃)",
    "車柱 功能檢查(借還車不順)",

    "還車導引槽(缺漏)",
    "還車導引槽(鬆動)",

    "車機機殼(髒污／塗鴉／小廣告／褪色)",
    "車機機殼(破損／嚴重刮痕)",
    "車機機殼(太陽能面板  產生氣泡)",

    "車機功能(借不出還不回／車機異常)",
    "車機功能(螢幕文字  無法正常顯示)",
    "車機功能(借、還車  無提示音、異常)",

    "防轉彈簧／停車架(彈簧脫落)",
    "防轉彈簧／停車架(停車架起後，車輛無法站立)",

    "置物籃貼紙(前 車號、LOGO)",
    "置物籃貼紙(後 使用說明)",

    "置物籃(嚴重髒汙、沾黏)",
    "置物籃(垃圾)",
    "置物籃(破損 2根以上／缺固定螺絲／裝設歪斜)",
    "置物籃(鉸線頭固定座　上下皆破損)",
    "置物籃(鉸線破損／生鏽)",

    "外管完整(蛇管  脫落／遺失)",
    "外管完整(煞車外管)",
    "外管完整(變速外管)",

    "把手貼紙(左 騎乘前檢查)",
    "把手貼紙(右 煞車提醒)",

    "把手套(黏潮、紋路磨損、破損)",
    "把手套(髒汙  致無法使用)",

    "車鈴(無法發出鈴聲)",
    "車鈴(貼紙文字無法傳達完整訊息)",

    "車體外觀(車架 髒汙／小廣告／塗鴉)",
    "車體外觀(車架  掉漆)",
    "車體外觀(前、後泥除  髒污／破損)",

    "後泥除貼紙(廣告)",
    "後泥除貼紙(YouBike Logo)",
    "後泥除貼紙(車號)",

    "座管束子貼紙(文字無法傳達完整訊息)",

    "座墊(搖晃)",
    "座墊(歪斜)",
    "座墊(與底部分離)",
    "座墊(表面破損、龜裂)",
    "座墊(髒汙導致無法騎乘)",

    "座墊桿(高度調整不順)",
    "座墊桿(伸縮座墊桿鎖死 ( 無法調整高度 ))",
    "座墊桿(黃色拉桿斷裂)",
    "座墊桿(座墊桿滑落 無法固定)",
    "座墊桿(反轉後無法固定位置)",
    "座墊桿(座墊未在最底部就可反轉)",
    "座墊桿(座墊桿與車體分離)",

    "輪胎(胎紋磨損 平滑、龜裂、反光帶脫落)",
    "輪胎(輪框變形、缺鋼絲)",
    "輪胎(前 或 後輪偏擺)",

    "前後輪軸螺絲(前)",
    "前後輪軸螺絲(後)",

    "前／後燈(行進車輪轉動中)(前燈)",
    "前／後燈(行進車輪轉動中)(後燈)",
    "前／後燈(行進車輪轉動中)(前燈線　未妥善固定或絕緣膠翹起)",

    "前／後燈(暫停車輪靜止中)(借出刷卡、臨停解鎖即亮【未即亮勾選】)",
    "前／後燈(暫停車輪靜止中)(歸還靠柱、臨停上鎖即滅【未滅勾選】)",
    "前／後燈(暫停車輪靜止中)(借出後應恆亮【閃爍、時滅時亮勾選】)",

    "煞車功能(無法煞車)",
    "煞車功能(煞車過鬆 ( 2/3仍無法煞停 ))",
    "煞車功能(煞車過緊 ( 未滿1/3已經煞停 ))",
    "煞車功能(煞車過緊 ( 未滿1/3已經煞停 ))",
    "煞車功能(異音)",

    "變速功能(指示蓋 (銀) 脫落)",
    "變速功能(上蓋 (黑) 脫落／檔位標示無法辨識)",
    "變速功能(換檔轉動不順 ( 2轉3過緊 ))",
    "變速功能(檔位無法定位)",
    "變速功能(實際騎乘無法變速)",

    "隨車鎖(貼紙文字無法傳達完整訊息)",
    "隨車鎖(鎖孔  生鏽／脫漆)",
    "隨車鎖(上鎖／解鎖 失敗、異常)",
    "隨車鎖(鎖體  面積10%生鏽)",

    "費率貼紙(無貼紙)",
    "費率貼紙(舊版)",
    "費率貼紙(破損)",

    "作動(騎行踩動時 無動力推進)",
    "作動(停車靜止時 有動力推進)",

    "車速(無 車速測片 或 感應片)",
    "車速(車機面板 無車速顯示／顯示閃爍)",
    "車速(車機面板 靜止時顯示車輛車速非0)",

    "騎乘行進(行進不順暢)",
    "騎乘行進(異音)",

    "掃瑪借車",

    "前胎壓",
    "後胎壓",
  ];
  const resdata = [];

  data.forEach((item) => {
    resdata.push([
      item.id,

      item["test_date"].split(" ")[0],
      item.sys,
      editName(item["station_name"]),
      item.carnum,
      item.carnum2,
      item.testtable.canusec,
      formateDate(item, "電量", "無顯示/未持續顯示"),
      formateDate(item, "電量", "電量低於20系統未鎖車"),
      item.testtable.date,
      item.testtable.testman,

      formateDate(item, "一級檢修貼紙", "無貼紙"),
      formateDate(item, "一級檢修貼紙", "無法辨識／資訊不完整"),
      formateDate(item, "一級檢修貼紙", "未撕除舊貼紙"),

      formateDate(item, "車柱 周遭環境", "車柱"),
      formateDate(item, "車柱 周遭環境", "基板"),
      formateDate(item, "車柱 周遭環境", "垃圾"),

      formateDate(item, "車柱 外觀檢查", "柱號貼紙"),
      formateDate(item, "車柱 外觀檢查", "站名貼紙文字"),
      formateDate(item, "車柱 外觀檢查", "太陽能面板  破裂 / 異常"),
      formateDate(item, "車柱 外觀檢查", "太陽能面板  水氣"),
      formateDate(item, "車柱 外觀檢查", "鎖體  面積10%生鏽"),

      formateDate(item, "車柱 功能檢查", "面板左下方燈光 未亮起"),
      formateDate(item, "車柱 功能檢查", "搖晃"),
      formateDate(item, "車柱 功能檢查", "借還車不順"),

      formateDate(item, "還車導引槽", "缺漏"),
      formateDate(item, "還車導引槽", "鬆動"),

      formateDate(item, "車機機殼", "髒污／塗鴉／小廣告／褪色"),
      formateDate(item, "車機機殼", "破損／嚴重刮痕"),
      formateDate(item, "車機機殼", "太陽能面板  產生氣泡"),

      formateDate(item, "車機功能", "借不出還不回／車機異常"),
      formateDate(item, "車機功能", "螢幕文字  無法正常顯示"),
      formateDate(item, "車機功能", "借、還車  無提示音、異常"),

      formateDate(item, "防轉彈簧／停車架", "彈簧脫落"),
      formateDate(item, "防轉彈簧／停車架", "停車架起後，車輛無法站立"),

      formateDate(item, "置物籃貼紙", "前 車號、LOGO"),
      formateDate(item, "置物籃貼紙", "後 使用說明"),

      formateDate(item, "置物籃", "嚴重髒汙、沾黏"),
      formateDate(item, "置物籃", "垃圾"),
      formateDate(item, "置物籃", "破損 2根以上／缺固定螺絲／裝設歪斜"),
      formateDate(item, "置物籃", "鉸線頭固定座　上下皆破損"),
      formateDate(item, "置物籃", "鉸線破損／生鏽"),

      formateDate(item, "外管完整", "蛇管  脫落／遺失"),
      formateDate(item, "外管完整", "煞車外管"),
      formateDate(item, "外管完整", "變速外管"),

      formateDate(item, "把手貼紙", "左 騎乘前檢查"),
      formateDate(item, "把手貼紙", "右 煞車提醒"),

      formateDate(item, "把手套", "黏潮、紋路磨損、破損"),
      formateDate(item, "把手套", "髒汙  致無法使用"),

      formateDate(item, "車鈴", "無法發出鈴聲"),
      formateDate(item, "車鈴", "貼紙文字無法傳達完整訊息"),

      formateDate(item, "車體外觀", "車架 髒汙／小廣告／塗鴉"),
      formateDate(item, "車體外觀", "車架  掉漆"),
      formateDate(item, "車體外觀", "前、後泥除  髒污／破損"),

      formateDate(item, "後泥除貼紙", "廣告"),
      formateDate(item, "後泥除貼紙", "YouBike Logo"),
      formateDate(item, "後泥除貼紙", "車號"),

      formateDate(item, "座管束子貼紙", "文字無法傳達完整訊息"),

      formateDate(item, "座墊", "搖晃"),
      formateDate(item, "座墊", "歪斜"),
      formateDate(item, "座墊", "與底部分離"),
      formateDate(item, "座墊", "表面破損、龜裂"),
      formateDate(item, "座墊", "髒汙導致無法騎乘"),

      formateDate(item, "座墊桿", "高度調整不順"),
      formateDate(item, "座墊桿", "伸縮座墊桿鎖死 ( 無法調整高度 )"),
      formateDate(item, "座墊桿", "黃色拉桿斷裂"),
      formateDate(item, "座墊桿", "座墊桿滑落 無法固定"),
      formateDate(item, "座墊桿", "反轉後無法固定位置"),
      formateDate(item, "座墊桿", "座墊未在最底部就可反轉"),
      formateDate(item, "座墊桿", "座墊桿與車體分離"),

      formateDate(item, "輪胎", "胎紋磨損 平滑、龜裂、反光帶脫落"),
      formateDate(item, "輪胎", "輪框變形、缺鋼絲"),
      formateDate(item, "輪胎", "前 或 後輪偏擺"),

      formateDate(item, "前後輪軸螺絲", "前"),
      formateDate(item, "前後輪軸螺絲", "後"),

      formateDate(item, "前／後燈(行進車輪轉動中)", "前燈"),
      formateDate(item, "前／後燈(行進車輪轉動中)", "後燈"),
      formateDate(
        item,
        "前／後燈(行進車輪轉動中)",
        "前燈線　未妥善固定或絕緣膠翹起"
      ),

      formateDate(
        item,
        "前／後燈(暫停車輪靜止中)",
        "借出刷卡、臨停解鎖即亮【未即亮勾選】"
      ),
      formateDate(
        item,
        "前／後燈(暫停車輪靜止中)",
        "歸還靠柱、臨停上鎖即滅【未滅勾選】"
      ),
      formateDate(
        item,
        "前／後燈(暫停車輪靜止中)",
        "借出後應恆亮【閃爍、時滅時亮勾選】"
      ),

      formateDate(item, "煞車功能", "無法煞車"),
      formateDate(item, "煞車功能", "煞車過鬆 ( 2/3仍無法煞停 )"),
      formateDate(item, "煞車功能", "煞車過緊 ( 未滿1/3已經煞停 )"),
      formateDate(item, "煞車功能", "煞車過緊 ( 未滿1/3已經煞停 )"),
      formateDate(item, "煞車功能", "異音"),

      formateDate(item, "變速功能", "指示蓋 (銀) 脫落"),
      formateDate(item, "變速功能", "上蓋 (黑) 脫落／檔位標示無法辨識"),
      formateDate(item, "變速功能", "換檔轉動不順 ( 2轉3過緊 )"),
      formateDate(item, "變速功能", "檔位無法定位"),
      formateDate(item, "變速功能", "實際騎乘無法變速"),

      formateDate(item, "隨車鎖", "貼紙文字無法傳達完整訊息"),
      formateDate(item, "隨車鎖", "鎖孔  生鏽／脫漆"),
      formateDate(item, "隨車鎖", "上鎖／解鎖 失敗、異常"),
      formateDate(item, "隨車鎖", "鎖體  面積10%生鏽"),

      formateDate(item, "費率貼紙", "無貼紙"),
      formateDate(item, "費率貼紙", "舊版"),
      formateDate(item, "費率貼紙", "破損"),

      formateDate(item, "作動", "騎行踩動時 無動力推進"),
      formateDate(item, "作動", "停車靜止時 有動力推進"),

      formateDate(item, "車速", "無 車速測片 或 感應片"),
      formateDate(item, "車速", "車機面板 無車速顯示／顯示閃爍"),
      formateDate(item, "車速", "車機面板 靜止時顯示車輛車速非0"),

      formateDate(item, "騎乘行進", "行進不順暢"),
      formateDate(item, "騎乘行進", "異音"),

      item.testtable.iscodepass === "是" ? "成功" : "失敗",
      item.testtable.startrow,
      item.testtable.endrow,
      time.includes(`(${formatDate2(item["test_date"])})-${item.carnum}`)
        ? "o"
        : "",
    ]);
  });
  totalData.push({
    col,
    resdata,
    title: "2.0E",
  });
}

function formatitem(data, key, item) {
  return data[key].includes(item) ? "o" : "";
}

function makestation1(data) {
  const col = [
    "系統",
    "檢驗日期",
    "場站名稱",
    "場站車輛數",
    "無法租借車輛數",
    "場站周遭環境(停車柱)",
    "場站周遭環境(基板)",
    "場站周遭環境(垃圾多)",
    "KIOSK功能(黑屏、畫面無反應)",
    "KIOSK功能(內容站點資訊不清楚)",
    "KIOSK外觀(嚴重髒污)",
    "KIOSK外觀(廣告貼紙)",
    "KIOSK外觀(塗鴉)",
    "KIOSK外觀(正面Logo貼紙退色)",
    "KIOSK燈片(站牌名)",
    "KIOSK燈片(後燈片使用說明)",
    "場站導標桿(歪斜、損毀)",
    "場站導標桿(缺漏)",
  ];

  const resdata = [];
  data.forEach((item) => {
    resdata.push([
      item.id,
      item.test_date.split(" ")[0],
      item.station_name,
      item.carnum,
      item.no_carnum,
      formatitem(item, "場站周遭環境", "停車柱"),
      formatitem(item, "場站周遭環境", "基板"),
      formatitem(item, "場站周遭環境", "垃圾多"),
      formatitem(item, "KIOSK功能", "黑屏、畫面無反應"),
      formatitem(item, "KIOSK功能", "內容站點資訊不清楚"),
      formatitem(item, "KIOSK外觀", "嚴重髒汙"),
      formatitem(item, "KIOSK外觀", "廣告貼紙"),
      formatitem(item, "KIOSK外觀", "塗鴉"),
      formatitem(item, "KIOSK外觀", "正面Logo貼紙褪色"),
      formatitem(item, "KIOSK燈片", "站名牌"),
      formatitem(item, "KIOSK燈片", "後燈片使用說明"),
      formatitem(item, "場站導標桿", "歪斜、損毀"),
      formatitem(item, "場站導標桿", "漏缺"),
    ]);
  });
  totalData.push({
    col,
    resdata,
    title: "場站1.0",
  });
}

function makestation2(data) {
  const col = [
    "系統",
    "檢驗日期",
    "場站名稱",
    "場站車輛數",
    "無法租借車輛數",
    "場站導標桿(歪斜、損毀)",
    "場站導標桿(漏缺)",
  ];

  const resdata = [];
  data.forEach((item) => {
    resdata.push([
      item.id,
      item.test_date.split(" ")[0],
      item.station_name,
      item.carnum,
      item.no_carnum,
      formatitem(item, "場站導標桿", "歪斜、損毀"),
      formatitem(item, "場站導標桿", "漏缺"),
    ]);
  });
  totalData.push({
    col,
    resdata,
    title: "場站2.0+2.0E",
  });
}

async function exportfun1() {
  try {
    console.log(range.value);
    if (range.value === undefined || range.value === null) {
      ErrorAlert("請選擇日期");
      return;
    }
    //清空
    totalData = [];
    const [date1, date2] = range.value;
    const startDate = Dateformate(date1);
    const endDate = Dateformate(date2);
    const res = (await getBikeTestData()).filter((item) =>
      isDateInRange(item["test_date"].split(" ")[0], startDate, endDate)
    );

    const listfile = await getfileList();

    const data10 = res.filter((item) => item.sys === "1.0");
    const data20 = res.filter((item) => item.sys === "2.0");
    const data2e = res.filter(
      (item) => item.sys === "2.0e" || item.sys === "2.0E"
    );
    makedata1(data10, listfile);
    makedata2(data20, listfile);
    makedata3(data2e, listfile);

    //底下為導出場站
    const stationRes1 = (await getStation1Data()).filter((item) =>
      isDateInRange(item["test_date"].split(" ")[0], startDate, endDate)
    );
    const stationRes2 = (await getStation2Data()).filter((item) =>
      isDateInRange(item["test_date"].split(" ")[0], startDate, endDate)
    );
    makestation1(stationRes1);
    makestation2(stationRes2);
    // console.log(stationRes1, stationRes2);
    outExcel(totalData);
  } catch (error) {
    console.log(error);
  }
}

async function getfileList() {
  try {
    const url = `${import.meta.env.VITE_URL}/biketest/filelist`;
    const res = await axios.get(url);
    const fomatData = res.data.map((i) => formatDate(i));
    return fomatData;
  } catch (error) {
    console.log(error);
  }
}
function formatDate2(params) {
  // console.log(params);
  const text = params.split(" ")[0];
  const text2 = text.split("-");
  return `${text2[1]}-${text2[2]}`;
}

function formatDate(input) {
  // 匹配括號內的數字
  let matches = input.match(/\((\d+)-(\d+)\)/);
  if (matches) {
    let month = parseInt(matches[1]);
    let day = parseInt(matches[2]);

    // 如果是個位數，前面加上0
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    // 替換原本的數字為格式化後的數字
    return input.replace(/\(\d+-\d+\)/, `(${month}-${day})`);
  }
  return input;
}
</script>

<style lang="scss" scoped></style>
