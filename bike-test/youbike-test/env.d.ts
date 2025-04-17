/* eslint-disable @typescript-eslint/no-unused-vars */
import { useBiketest } from "./src/stores/bikestest";
/// <reference types="vite/client" />

//登陸頁
interface RuleForm {
  account: string;
  password: string;
}

//場站檢驗
interface Stationtest {
  catequery: string;
  name: string | null;
  carnum: number | null;
  nosencarnum: number | null;
  checkdata: {
    title: string;
    ischeck: string[];
    value: string[];
  }[];
}

//場站檢驗資料
interface ListItem {
  value: string;
  label: string;
}
//場站檢驗資料
interface StationtestData {
  id: number;
  no_carnum: number;
  carnum: number;
  edit_id: string;
  test_date: string;
  station_name: string;
  sys: string;
  user_id: string;
  KIOSK功能?: string[];
  KIOSK外觀?: string[];
  KIOSK燈片?: string[];
  場站周遭環境?: string[];
  場站導標桿?: string[];
}

interface Checkdata {
  title: string;
  ischeck: [];
  value: string[];
}

//模擬體驗第一頁
interface BiketestStepAll {
  name: string;
  catequery: string;
  carnum: string;
  carnum2: string;
  date: string;
  testman: string;
  canusec: number | null;
  checkdata: Checkdata[];
}

//模擬體驗第二頁
interface BiketestStepTwo {
  catequery: string;
  checkdata: Checkdata[];
}
//模擬體驗第三頁
interface BiketestStepThree {
  catequery: string;
  checkdata: Checkdata[];
}
//模擬體驗第四頁
interface BiketestStepFour {
  catequery: string;
  checkdata: Checkdata[];
}
//模擬體驗第五頁
interface BiketestStepFive {
  catequery: string;
  checkdata: Checkdata[];
}
//模擬體驗第六頁
interface BiketestStepSix {
  catequery: string;
  checkdata: Checkdata[];
}

//模擬體驗第七頁
interface BiketestStepSeven {
  catequery: string;
  checkdata: Checkdata[];
  startrow: number | null;
  endrow: number | null;
  text: string;
}
//模擬體驗第八頁
interface BiketestStepeight {
  catequery: string;
  checkdata: Checkdata[];
  startrow: number | null;
  endrow: number | null;
  iscodepass: string | null;
  text: string;
}

//模擬體驗第九頁
interface BiketestStepnine {
  catequery: string;
  checkdata: Checkdata[];
}

//模擬體驗第十頁
interface BiketestStepten {
  catequery: string;
  checkdata: Checkdata[];
  startrow: number | null;
  endrow: number | null;
  iscodepass: string | null;
  text: string;
}

// 模擬體驗總表單開始
interface Step {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
  step5: boolean;
  step6: boolean;
  step7: boolean;
  step8: boolean;
  step9: boolean;
  step10: boolean;
}

interface Testfrom1 {
  sys?: string;
  user_id?: string;
  //第一頁
  station_name?: string;
  catequery?: string;
  carnum?: string;
  carnum2?: string;
  date?: string;
  testman?: string;
  一級檢修貼紙?: Checkdata;

  //第五頁的時候手動加入
  test_date?: string;

  //第二頁
  車柱?: Checkdata;
  "停車柱貼紙／基板宣導貼紙"?: Checkdata;
  還車導引槽?: Checkdata;

  //第三頁
  車體外觀?: Checkdata;
  後泥除貼紙?: Checkdata;
  置物籃貼紙?: Checkdata;
  置物籃?: Checkdata;

  //第四頁
  外管完整?: Checkdata;
  把手套?: Checkdata;
  把手貼紙?: Checkdata;
  車鈴?: Checkdata;
  "防轉彈簧／停車架"?: Checkdata;

  //第五頁
  座墊?: Checkdata;
  座管束子貼紙?: Checkdata;
  座墊高低調整?: Checkdata;
  輪胎?: Checkdata;
  前後輪軸螺絲?: Checkdata;

  //第六頁
  "前／後燈"?: Checkdata;
  煞車功能?: Checkdata;
  變速功能?: Checkdata;
  隨車鎖?: Checkdata;

  //第七頁
  騎乘行進?: Checkdata;
  startrow?: number | null;
  endrow?: number | null;
  text?: string;
}

interface Testfrom2 {
  sys?: string;
  user_id?: string;
  //第一頁
  station_name?: string;
  catequery?: string;
  carnum?: string;
  carnum2?: string;
  date?: string;
  testman?: string;
  一級檢修貼紙?: Checkdata;

  //第五頁的時候手動加入
  test_date?: string;

  //第二頁
  "車柱 周遭環境"?: Checkdata;
  "車柱 外觀檢查"?: Checkdata;
  "車柱 功能檢查"?: Checkdata;
  還車導引槽?: Checkdata;

  //第三頁
  車機機殼?: Checkdata;
  車機功能?: Checkdata;
  "防轉彈簧／停車架"?: Checkdata;
  置物籃貼紙?: Checkdata;
  置物籃?: Checkdata;

  //第四頁
  外管完整?: Checkdata;
  把手貼紙?: Checkdata;
  把手套?: Checkdata;
  車鈴?: Checkdata;
  車體外觀?: Checkdata;
  後泥除貼紙?: Checkdata;

  //第五頁
  座管束子貼紙?: Checkdata;
  座墊?: Checkdata;
  座墊桿?: Checkdata;

  //第六頁
  輪胎?: Checkdata;
  前後輪軸螺絲?: Checkdata;
  "前／後燈"?: Checkdata;

  //第七頁
  煞車功能?: Checkdata;
  變速功能?: Checkdata;
  隨車鎖?: Checkdata;

  //第八頁
  騎乘行進?: Checkdata;
  iscodepass?: string | null;
  startrow?: number | null;
  endrow?: number | null;
  text?: string;
}

interface Testfrom3 {
  sys?: string;
  user_id?: string;
  //第一頁
  station_name?: string;
  catequery?: string;
  carnum?: string;
  carnum2?: string;
  canusec?: number | null;
  電量?: Checkdata;
  date?: string;
  testman?: string;
  一級檢修貼紙?: Checkdata;

  //第五頁的時候手動加入
  test_date?: string;

  //第二頁
  "車柱 周遭環境"?: Checkdata;
  "車柱 外觀檢查"?: Checkdata;
  "車柱 功能檢查"?: Checkdata;
  還車導引槽?: Checkdata;

  //第三頁
  車機機殼?: Checkdata;
  車機功能?: Checkdata;
  "防轉彈簧／停車架"?: Checkdata;

  //第四頁
  置物籃貼紙?: Checkdata;
  置物籃?: Checkdata;
  外管完整?: Checkdata;

  //第五頁
  把手貼紙?: Checkdata;
  把手套?: Checkdata;
  車鈴?: Checkdata;
  車體外觀?: Checkdata;
  後泥除貼紙?: Checkdata;

  //第六頁
  座管束子貼紙?: Checkdata;
  座墊?: Checkdata;
  座墊桿?: Checkdata;

  //第七頁
  輪胎?: Checkdata;
  前後輪軸螺絲?: Checkdata;
  "前／後燈(行進車輪轉動中)"?: Checkdata;
  "前／後燈(暫停車輪靜止中)"?: Checkdata;

  //第八頁
  煞車功能?: Checkdata;
  變速功能?: Checkdata;
  隨車鎖?: Checkdata;

  //第九頁
  費率貼紙?: Checkdata;
  作動?: Checkdata;
  車速?: Checkdata;

  //第十頁
  騎乘行進?: Checkdata;
  startrow?: number | null;
  endrow?: number | null;
  text?: string;
  iscodepass?: string | null;
}
// 模擬體驗總表單結束
