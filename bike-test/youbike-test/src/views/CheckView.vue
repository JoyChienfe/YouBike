<template>
  <div class="container">
    <button
      class="btn btn-success me-1"
      type="button"
      @click="outPutStation_1_Excel"
    >
      1.0場站
    </button>
    <button
      class="btn btn-success me-1"
      type="button"
      @click="outPutStation_2_Excel"
    >
      2.0+2.0e場站
    </button>
    <button
      class="btn btn-success me-1"
      type="button"
      @click="outPutBike_1_Excel"
    >
      1.0車子
    </button>
    <button
      class="btn btn-success me-1"
      type="button"
      @click="outPutBike_2_Excel"
    >
      2.0車子
    </button>
    <button
      class="btn btn-success me-1"
      type="button"
      @click="outPutBike_2e_Excel"
    >
      2.0e車子
    </button>
  </div>
</template>

<script setup lang="ts">
interface BikeTestResData {
  sys: string;
  user_id: string;
  station_name: string;
  catequery: string;
  carnum: string;
  carnum2: string;
  date: string;
  testman: string;
  test_date: string;
  testtable: Testfrom1 & Testfrom2 & Testfrom3;
}

import * as XLSX from "xlsx";
import axios from "axios";
import type { Testfrom1, Testfrom2, Testfrom3, StationtestData } from "env";

//取得時間字串023-12-11 16:47:24 把月份取出來
function getMonth(params: string | undefined): string {
  return params ? params.split(" ")[0].split("-")[1] : "";
}

//取得所有人當全月分模擬體驗資料
async function BikeTestData(): Promise<BikeTestResData[]> {
  const url = `${import.meta.env.VITE_URL}/biketest/Allbiketest`;
  try {
    const resData = (await axios.get(url)).data.data as BikeTestResData[];
    const now = new Date();
    // const NowMonth = (now.getMonth() + 1).toString();
    // const thisMonthData = resData.filter(
    //   (item) => getMonth(item.test_date) === NowMonth
    // );
    const thisMonthData = resData.filter((item) => getMonth(item.test_date));
    return thisMonthData;
  } catch (error) {
    console.log(error);
    return [];
  }
}

//取得所有當前月份場站檢驗資料
async function StationData(): Promise<StationtestData[]> {
  try {
    const url = `${import.meta.env.VITE_URL}/station/stationAll`;
    const resData = (await axios.get(url)).data.data as StationtestData[];
    console.log(resData);
    const now = new Date();
    // const NowMonth = (now.getMonth() + 1).toString();
    // const thisMonthData = resData.filter(
    //   (item) => getMonth(item.test_date) === NowMonth
    // );
    const thisMonthData = resData.filter((item) => getMonth(item.test_date));
    return thisMonthData;
  } catch (error) {
    console.log(error);
    return [];
  }
}

//把資料匯出成excel檔案
function OutputExcelFile(data: any, header: string[], name: string) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "sheet1");
  XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: "A1" });
  XLSX.writeFile(workbook, `${name}.xlsx`);
}

//1.0場站檢驗column
const Station_1_column = [
  "系統",
  "檢驗日期",
  "公號",
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
//1.0場站檢驗資料
async function outPutStation_1_Excel() {
  try {
    try {
      const Station = await StationData();
      console.log(Station);
      //1.0場站檢驗資訊
      const Station_1 = Station.filter((item) => item.sys === "1.0");
      console.log(Station_1);
      //1.0場站檢驗column
      const Station_1_Arr = [] as any;
      Station_1.forEach((item) => {
        Station_1_Arr.push([
          item.sys,
          item.test_date,
          item.user_id,
          item.station_name,
          item.carnum,
          item.no_carnum,
          item.場站周遭環境?.includes("停車柱") ? "O" : "",
          item.場站周遭環境?.includes("基板") ? "O" : "",
          item.場站周遭環境?.includes("垃圾多") ? "O" : "",
          item.KIOSK功能?.includes("黑屏、畫面無反應") ? "O" : "",
          item.KIOSK功能?.includes("內容站點資訊不清楚") ? "O" : "",
          item.KIOSK外觀?.includes("嚴重髒汙") ? "O" : "",
          item.KIOSK外觀?.includes("廣告貼紙") ? "O" : "",
          item.KIOSK外觀?.includes("塗鴉") ? "O" : "",
          item.KIOSK外觀?.includes("正面Logo貼紙褪色") ? "O" : "",
          item.KIOSK燈片?.includes("站名牌") ? "O" : "",
          item.KIOSK燈片?.includes("後燈片使用說明") ? "O" : "",
          item.場站導標桿?.includes("歪斜、損毀") ? "O" : "",
          item.場站導標桿?.includes("漏缺") ? "O" : "",
        ]);
      });
      OutputExcelFile(Station_1_Arr, Station_1_column, "1.0場站檢驗");
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

//1.0場站檢驗column
const Station_2_column = [
  "系統",
  "檢驗日期",
  "公號",
  "場站名稱",
  "場站車輛數",
  "無法租借車輛數",
  "場站導標桿(歪斜、損毀)",
  "場站導標桿(漏缺)",
];
//2.0場站檢驗資料
async function outPutStation_2_Excel() {
  try {
    try {
      const Station = await StationData();
      console.log(Station);
      //1.0場站檢驗資訊
      const Station_2 = Station.filter((item) => item.sys !== "1.0");
      //1.0場站檢驗column
      const Station_2_Arr = [] as any;
      Station_2.forEach((item) => {
        Station_2_Arr.push([
          item.sys,
          item.test_date,
          item.user_id,
          item.station_name,
          item.carnum,
          item.no_carnum,
          item.場站導標桿?.includes("歪斜、損毀") ? "O" : "",
          item.場站導標桿?.includes("漏缺") ? "O" : "",
        ]);
      });
      OutputExcelFile(Station_2_Arr, Station_2_column, "2.0+2.0e場站檢驗");
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

interface CheckData {
  ischeck?: string[];
  title: string;
  value: string[];
}

//把checkdata整理成可用資料
function editData(data: CheckData | undefined): string[] {
  const arr = [] as string[];
  if (data !== undefined) {
    data.value.forEach((item) => {
      if (!data.ischeck) {
        arr.push("");
        return;
      }

      if (data.ischeck?.includes(item)) {
        arr.push("o");
      } else {
        arr.push("");
      }
    });
  }
  return arr;
}

//把checkdata整理成可用column
function editColumnData(data: CheckData | undefined): string[] {
  const arr = [] as string[];
  if (data !== undefined) {
    data.value.forEach((item) => {
      arr.push(`${data.title}(${item})`);
    });
  }
  return arr;
}

//1.0場站檢驗資料
async function outPutBike_1_Excel() {
  try {
    try {
      const BikeTest = await BikeTestData();
      const Bike_1 = BikeTest.filter((item) => item.sys === "1.0");
      const Bike_1_Arr = [] as any;
      Bike_1.forEach((item) => {
        Bike_1_Arr.push([
          item.test_date,
          item.user_id,
          item.station_name,
          item.carnum,
          item.carnum2,
          item.testtable.date,
          item.testtable.testman,
          ...editData(item.testtable.一級檢修貼紙),
          ...editData(item.testtable.車柱),
          ...editData(item.testtable["停車柱貼紙／基板宣導貼紙"]),
          ...editData(item.testtable["還車導引槽"]),
          ...editData(item.testtable["車體外觀"]),
          ...editData(item.testtable["後泥除貼紙"]),
          ...editData(item.testtable["置物籃貼紙"]),
          ...editData(item.testtable["置物籃"]),
          ...editData(item.testtable["外管完整"]),
          ...editData(item.testtable["把手套"]),
          ...editData(item.testtable["把手貼紙"]),
          ...editData(item.testtable["車鈴"]),
          ...editData(item.testtable["防轉彈簧／停車架"]),
          ...editData(item.testtable["座墊"]),
          ...editData(item.testtable["座管束子貼紙"]),
          ...editData(item.testtable["座墊高低調整"]),
          ...editData(item.testtable["輪胎"]),
          ...editData(item.testtable["前後輪軸螺絲"]),
          ...editData(item.testtable["前／後燈"]),
          ...editData(item.testtable["煞車功能"]),
          ...editData(item.testtable["變速功能"]),
          ...editData(item.testtable["隨車鎖"]),
          ...editData(item.testtable["騎乘行進"]),
          item.testtable.startrow,
          item.testtable.endrow,
          item.testtable.text,
        ]);
      });

      const column = [
        "日期",
        "公號",
        "場站名稱",
        "車號",
        "車柱柱號",
        "一級檢修日期",
        "一級檢修人員",
        ...editColumnData(Bike_1[0].testtable.一級檢修貼紙),
        ...editColumnData(Bike_1[0].testtable.車柱),
        ...editColumnData(Bike_1[0].testtable["停車柱貼紙／基板宣導貼紙"]),
        ...editColumnData(Bike_1[0].testtable["還車導引槽"]),
        ...editColumnData(Bike_1[0].testtable["車體外觀"]),
        ...editColumnData(Bike_1[0].testtable["後泥除貼紙"]),
        ...editColumnData(Bike_1[0].testtable["置物籃貼紙"]),
        ...editColumnData(Bike_1[0].testtable["置物籃"]),
        ...editColumnData(Bike_1[0].testtable["外管完整"]),
        ...editColumnData(Bike_1[0].testtable["把手套"]),
        ...editColumnData(Bike_1[0].testtable["把手貼紙"]),
        ...editColumnData(Bike_1[0].testtable["車鈴"]),
        ...editColumnData(Bike_1[0].testtable["防轉彈簧／停車架"]),
        ...editColumnData(Bike_1[0].testtable["座墊"]),
        ...editColumnData(Bike_1[0].testtable["座管束子貼紙"]),
        ...editColumnData(Bike_1[0].testtable["座墊高低調整"]),
        ...editColumnData(Bike_1[0].testtable["輪胎"]),
        ...editColumnData(Bike_1[0].testtable["前後輪軸螺絲"]),
        ...editColumnData(Bike_1[0].testtable["前／後燈"]),
        ...editColumnData(Bike_1[0].testtable["煞車功能"]),
        ...editColumnData(Bike_1[0].testtable["變速功能"]),
        ...editColumnData(Bike_1[0].testtable["隨車鎖"]),
        ...editColumnData(Bike_1[0].testtable["騎乘行進"]),
        "前胎壓",
        "後胎壓",
        "備註",
      ] as string[];

      OutputExcelFile(Bike_1_Arr, column, "1.0車輛檢驗");
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

//2.0車輛檢驗資料
async function outPutBike_2_Excel() {
  try {
    try {
      const BikeTest = await BikeTestData();
      const Bike_2 = BikeTest.filter((item) => item.sys === "2.0");
      const Bike_2_Arr = [] as any;
      Bike_2.forEach((item) => {
        Bike_2_Arr.push([
          item.test_date,
          item.user_id,
          item.station_name,
          item.carnum,
          item.carnum2,
          item.testtable.date,
          item.testtable.testman,
          ...editData(item.testtable.一級檢修貼紙),
          ...editData(item.testtable["車柱 周遭環境"]),
          ...editData(item.testtable["車柱 外觀檢查"]),
          ...editData(item.testtable["車柱 功能檢查"]),
          ...editData(item.testtable["還車導引槽"]),
          ...editData(item.testtable["車機機殼"]),
          ...editData(item.testtable["車機功能"]),
          ...editData(item.testtable["防轉彈簧／停車架"]),
          ...editData(item.testtable["置物籃貼紙"]),
          ...editData(item.testtable["置物籃"]),
          ...editData(item.testtable["外管完整"]),
          ...editData(item.testtable["把手貼紙"]),
          ...editData(item.testtable["把手套"]),
          ...editData(item.testtable["車鈴"]),
          ...editData(item.testtable["車體外觀"]),
          ...editData(item.testtable["後泥除貼紙"]),
          ...editData(item.testtable["座管束子貼紙"]),
          ...editData(item.testtable["座墊"]),
          ...editData(item.testtable["座墊桿"]),
          ...editData(item.testtable["輪胎"]),
          ...editData(item.testtable["前後輪軸螺絲"]),
          ...editData(item.testtable["前／後燈"]),
          ...editData(item.testtable["煞車功能"]),
          ...editData(item.testtable["變速功能"]),
          ...editData(item.testtable["隨車鎖"]),
          ...editData(item.testtable["騎乘行進"]),
          item.testtable.iscodepass,
          item.testtable.startrow,
          item.testtable.endrow,
          item.testtable.text,
        ]);
      });
      const column = [
        "日期",
        "公號",
        "場站名稱",
        "車號",
        "車柱柱號",
        "一級檢修日期",
        "一級檢修人員",
        ...editColumnData(Bike_2[0].testtable.一級檢修貼紙),
        ...editColumnData(Bike_2[0].testtable["車柱 周遭環境"]),
        ...editColumnData(Bike_2[0].testtable["車柱 外觀檢查"]),
        ...editColumnData(Bike_2[0].testtable["車柱 功能檢查"]),
        ...editColumnData(Bike_2[0].testtable["還車導引槽"]),
        ...editColumnData(Bike_2[0].testtable["車機機殼"]),
        ...editColumnData(Bike_2[0].testtable["車機功能"]),
        ...editColumnData(Bike_2[0].testtable["防轉彈簧／停車架"]),
        ...editColumnData(Bike_2[0].testtable["置物籃貼紙"]),
        ...editColumnData(Bike_2[0].testtable["置物籃"]),
        ...editColumnData(Bike_2[0].testtable["外管完整"]),
        ...editColumnData(Bike_2[0].testtable["把手貼紙"]),
        ...editColumnData(Bike_2[0].testtable["把手套"]),
        ...editColumnData(Bike_2[0].testtable["車鈴"]),
        ...editColumnData(Bike_2[0].testtable["車體外觀"]),
        ...editColumnData(Bike_2[0].testtable["後泥除貼紙"]),
        ...editColumnData(Bike_2[0].testtable["座管束子貼紙"]),
        ...editColumnData(Bike_2[0].testtable["座墊"]),
        ...editColumnData(Bike_2[0].testtable["座墊桿"]),
        ...editColumnData(Bike_2[0].testtable["輪胎"]),
        ...editColumnData(Bike_2[0].testtable["前後輪軸螺絲"]),
        ...editColumnData(Bike_2[0].testtable["前／後燈"]),
        ...editColumnData(Bike_2[0].testtable["煞車功能"]),
        ...editColumnData(Bike_2[0].testtable["變速功能"]),
        ...editColumnData(Bike_2[0].testtable["隨車鎖"]),
        ...editColumnData(Bike_2[0].testtable["騎乘行進"]),
        "掃碼借車",
        "前胎壓",
        "後胎壓",
        "備註",
      ] as string[];

      OutputExcelFile(Bike_2_Arr, column, "2.0車輛檢驗");
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

//2.0e車輛檢驗資料
async function outPutBike_2e_Excel() {
  try {
    try {
      const BikeTest = await BikeTestData();
      const Bike_2e = BikeTest.filter((item) => item.sys === "2.0e");
      const Bike_2e_Arr = [] as any;

      Bike_2e.forEach((item) => {
        Bike_2e_Arr.push([
          item.test_date,
          item.user_id,
          item.station_name,
          item.carnum,
          item.carnum2,
          item.testtable.canusec,
          ...editData(item.testtable["電量"]),
          item.testtable.date,
          item.testtable.testman,
          ...editData(item.testtable.一級檢修貼紙),
          ...editData(item.testtable["車柱 周遭環境"]),
          ...editData(item.testtable["車柱 外觀檢查"]),
          ...editData(item.testtable["車柱 功能檢查"]),
          ...editData(item.testtable["還車導引槽"]),
          ...editData(item.testtable["車機機殼"]),
          ...editData(item.testtable["車機功能"]),
          ...editData(item.testtable["防轉彈簧／停車架"]),
          ...editData(item.testtable["置物籃貼紙"]),
          ...editData(item.testtable["置物籃"]),
          ...editData(item.testtable["外管完整"]),
          ...editData(item.testtable["把手貼紙"]),
          ...editData(item.testtable["把手套"]),
          ...editData(item.testtable["車鈴"]),
          ...editData(item.testtable["車體外觀"]),
          ...editData(item.testtable["後泥除貼紙"]),
          ...editData(item.testtable["座管束子貼紙"]),
          ...editData(item.testtable["座墊"]),
          ...editData(item.testtable["座墊桿"]),
          ...editData(item.testtable["輪胎"]),
          ...editData(item.testtable["前後輪軸螺絲"]),
          ...editData(item.testtable["前／後燈(行進車輪轉動中)"]),
          ...editData(item.testtable["前／後燈(暫停車輪靜止中)"]),
          ...editData(item.testtable["煞車功能"]),
          ...editData(item.testtable["變速功能"]),
          ...editData(item.testtable["隨車鎖"]),
          ...editData(item.testtable["費率貼紙"]),
          ...editData(item.testtable["作動"]),
          ...editData(item.testtable["車速"]),
          ...editData(item.testtable["騎乘行進"]),
          item.testtable.iscodepass,
          item.testtable.startrow,
          item.testtable.endrow,
          item.testtable.text,
        ]);
      });
      const column = [
        "日期",
        "公號",
        "場站名稱",
        "車號",
        "車柱柱號",
        "可用電量",
        ...editColumnData(Bike_2e[0].testtable["電量"]),
        "一級檢修日期",
        "一級檢修人員",
        ...editColumnData(Bike_2e[0].testtable.一級檢修貼紙),
        ...editColumnData(Bike_2e[0].testtable["車柱 周遭環境"]),
        ...editColumnData(Bike_2e[0].testtable["車柱 外觀檢查"]),
        ...editColumnData(Bike_2e[0].testtable["車柱 功能檢查"]),
        ...editColumnData(Bike_2e[0].testtable["還車導引槽"]),
        ...editColumnData(Bike_2e[0].testtable["車機機殼"]),
        ...editColumnData(Bike_2e[0].testtable["車機功能"]),
        ...editColumnData(Bike_2e[0].testtable["防轉彈簧／停車架"]),
        ...editColumnData(Bike_2e[0].testtable["置物籃貼紙"]),
        ...editColumnData(Bike_2e[0].testtable["置物籃"]),
        ...editColumnData(Bike_2e[0].testtable["外管完整"]),
        ...editColumnData(Bike_2e[0].testtable["把手貼紙"]),
        ...editColumnData(Bike_2e[0].testtable["把手套"]),
        ...editColumnData(Bike_2e[0].testtable["車鈴"]),
        ...editColumnData(Bike_2e[0].testtable["車體外觀"]),
        ...editColumnData(Bike_2e[0].testtable["後泥除貼紙"]),
        ...editColumnData(Bike_2e[0].testtable["座管束子貼紙"]),
        ...editColumnData(Bike_2e[0].testtable["座墊"]),
        ...editColumnData(Bike_2e[0].testtable["座墊桿"]),
        ...editColumnData(Bike_2e[0].testtable["輪胎"]),
        ...editColumnData(Bike_2e[0].testtable["前後輪軸螺絲"]),
        ...editColumnData(Bike_2e[0].testtable["前／後燈(行進車輪轉動中)"]),
        ...editColumnData(Bike_2e[0].testtable["前／後燈(暫停車輪靜止中)"]),
        ...editColumnData(Bike_2e[0].testtable["煞車功能"]),
        ...editColumnData(Bike_2e[0].testtable["變速功能"]),
        ...editColumnData(Bike_2e[0].testtable["隨車鎖"]),
        ...editColumnData(Bike_2e[0].testtable["費率貼紙"]),
        ...editColumnData(Bike_2e[0].testtable["作動"]),
        ...editColumnData(Bike_2e[0].testtable["車速"]),
        ...editColumnData(Bike_2e[0].testtable["騎乘行進"]),
        "掃碼借車",
        "前胎壓",
        "後胎壓",
        "備註",
      ] as string[];

      OutputExcelFile(Bike_2e_Arr, column, "2.0e車輛檢驗");
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<style lang="scss" scoped></style>
