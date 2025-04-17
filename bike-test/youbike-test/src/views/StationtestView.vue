<template>
  <div class="container-fluid">
    <Loading
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    />

    <p class="fs-1 text-center">場站檢驗</p>

    <el-form
      label-width="120px"
      size="large"
      label-position="top"
      :model="ruleFormAll"
      ref="formRefAll"
      :rules="rulesAll"
    >
      <div class="row">
        <div class="col-12 mb-3">
          <el-form-item label="系統別" prop="catequery">
            <el-select
              placeholder="請選擇系統別"
              class="col-12"
              @change="getStationData"
              v-model="ruleFormAll.catequery"
            >
              <el-option label="1.0" value="1.0" />
              <!-- <el-option label="2.0+2.0E" value="2.0+2.0E" /> -->
              <el-option label="2.0+2.0E" value="2.0+2.0E" />
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="row" v-if="ruleFormAll.catequery === '1.0'">
        <div class="col-12 mb-3">
          <el-tooltip class="box-item" effect="dark" placement="top-start">
            <template #content>
              若搜尋不到場站，請先重新整理頁面。<br />如仍無出現場站，請選擇同一城市任一場站，並於第一輛車中備註實際檢驗場站名稱。
            </template>
            <el-icon size="20" color="#ADADAD"><QuestionFilled /></el-icon>
          </el-tooltip>
          <!-- <el-tooltip
            class="box-item"
            effect="dark"
            content="若搜尋不到場站，請先重新整理頁面。如仍無出現場站，請選擇同一城市任一場站，並於第一輛車中備註實際檢驗場站名稱。"
            placement="top-start"
          >
            <el-icon size="20" color="#ADADAD"><QuestionFilled /></el-icon>
          </el-tooltip> -->
          <el-form-item label="場站名稱" prop="name">
            <el-select-v2
              v-model="ruleFormAll.name"
              style="width: 100%"
              filterable
              remote
              :remote-method="remoteMethod"
              clearable
              :options="options"
              :loading="loading"
              placeholder="請輸入場站名稱"
            />
          </el-form-item>
        </div>
        <div class="col-12 mb-1">
          <el-form-item label="場站車輛數" prop="carnum">
            <el-input
              placeholder="請輸入場站車輛數"
              v-model="ruleFormAll.carnum"
              type="number"
              inputmode="numeric"
            />
          </el-form-item>
        </div>
        <div class="col-12 mb-1">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="坐墊反轉／亮紅燈"
            placement="top-start"
          >
            <el-icon size="20" color="#ADADAD"><QuestionFilled /></el-icon>
          </el-tooltip>
          <el-form-item label="無法租借車輛數" prop="nosencarnum">
            <el-alert
              title="坐墊反轉、無法喚醒車機、車機顯示電量過低或暫停服務"
              type="warning "
              :closable="false"
              class="my-1"
            />
            <el-input
              placeholder="請輸入無法租借車輛數"
              v-model="ruleFormAll.nosencarnum"
              type="number"
              inputmode="numeric"
            />
          </el-form-item>
        </div>
        <div class="col-12 mb-3">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="髒汙、脫漆 、鏽蝕"
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
        <div class="col-12 mb-3">
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
        <div class="col-12 mb-3">
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
        <div class="col-12 mb-3">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="褪色、變色、髒汙"
            placement="top-start"
          >
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
        <div class="col-12 mb-3">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="歪斜、損毀、漏缺 ，該站所有抽測車輛都要扣分"
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
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm(formRefAll)"
            class="col-12"
            >送出表單</el-button
          >
        </el-form-item>
      </div>
      <div class="row" v-else-if="ruleFormAll.catequery === '2.0+2.0E'">
        <div class="col-12 mb-3">
          <el-form-item label="場站名稱" prop="name">
            <el-select-v2
              v-model="ruleFormAll.name"
              style="width: 100%"
              filterable
              remote
              :remote-method="remoteMethod"
              clearable
              :options="options"
              :loading="loading"
              placeholder="請輸入場站名稱"
            />
          </el-form-item>
        </div>
        <div class="col-12 mb-1">
          <el-form-item label="場站車輛數" prop="carnum">
            <el-input
              placeholder="請輸入場站車輛數"
              v-model="ruleFormAll.carnum"
              type="number"
              inputmode="numeric"
            />
          </el-form-item>
        </div>
        <div class="col-12 mb-1">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="坐墊反轉、無法喚醒車機、車機顯示電量過低或暫停服務"
            placement="top-start"
          >
            <el-icon size="20" color="#ADADAD"><QuestionFilled /></el-icon>
          </el-tooltip>
          <el-form-item label="無法租借車輛數" prop="nosencarnum">
            <el-alert
              title="坐墊反轉、無法喚醒車機、車機顯示電量過低或暫停服務"
              type="warning "
              :closable="false"
              class="my-1"
            />
            <el-input
              placeholder="請輸入無法租借車輛數"
              v-model="ruleFormAll.nosencarnum"
              type="number"
              inputmode="numeric"
            />
          </el-form-item>
        </div>
        <div class="col-12 mb-3">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="歪斜、損毀、漏缺 ，該站所有抽測車輛都要扣分"
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
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm(formRefAll)"
            class="col-12"
            >送出表單</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import type { Ref } from "vue";
import { ref, inject } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();
const swal = inject("$swal") as any;
async function Alert() {
  const res = await swal({
    icon: "warning",
    title: "是否提交表單",
    showCancelButton: true,
    confirmButtonText: "是",
    cancelButtonText: "否",
  });
  if (!res.isConfirmed) {
    return false;
  } else {
    return true;
  }
}

const formRefAll = ref<FormInstance>();
const ruleFormAll = ref<Stationtest>({
  name: "",
  catequery: "",
  carnum: null,
  nosencarnum: null,
  checkdata: [
    {
      title: "場站周遭環境",
      ischeck: [],
      value: ["停車柱", "基板", "垃圾多"],
    },
    {
      title: "KIOSK功能",
      ischeck: [],
      value: ["黑屏、畫面無反應", "內容站點資訊不清楚"],
    },
    {
      title: "KIOSK外觀",
      ischeck: [],
      value: ["嚴重髒汙", "廣告貼紙", "塗鴉", "正面Logo貼紙褪色"],
    },
    {
      title: "KIOSK燈片",
      ischeck: [],
      value: ["站名牌", "後燈片使用說明"],
    },
    {
      title: "場站導標桿",
      ischeck: [],
      value: ["歪斜、損毀", "漏缺"],
    },
  ],
});

const rulesAll = ref<FormRules<Stationtest>>({
  name: [{ required: true, message: "場站名稱不能為空", trigger: "blur" }],
  catequery: [{ required: true, message: "系統別不能為空", trigger: "blur" }],
  carnum: [{ required: true, message: "場站車輛數不能為空", trigger: "blur" }],
  nosencarnum: [
    { required: true, message: "無法租借車輛數不能為空", trigger: "blur" },
  ],
});

const getnowtime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份从 0 到 11，所以要加 1
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};

import { useAuth } from "../stores/auth";
import type { Stationtest } from "env";
const store = useAuth();
const isLoading = ref(false);
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  try {
    await formEl.validate();
    const res = await Alert();
    if (!res) return;
    const { catequery, name, carnum, nosencarnum, checkdata } =
      ruleFormAll.value;
    isLoading.value = true;
    const { account } = store.getUserid();
    if (ruleFormAll.value.catequery === "1.0") {
      const url = `${import.meta.env.VITE_URL}/station/station_1` as string;
      try {
        const payload = {
          date: getnowtime(),
          user_id: account,
          edit_id: "",
          station_name: name,
          sys: catequery,
          carnum: carnum,
          no_carnum: nosencarnum,
          場站周遭環境: checkdata[0].ischeck,
          KIOSK功能: checkdata[1].ischeck,
          KIOSK外觀: checkdata[2].ischeck,
          KIOSK燈片: checkdata[3].ischeck,
          場站導標桿: checkdata[4].ischeck,
        };
        await axios.post(url, payload);
      } catch (error) {
        console.log(error);
      }
      // console.log(catequery,name,carnum,nosencarnum)
    } else {
      try {
        const url = `${import.meta.env.VITE_URL}/station/station_2` as string;
        const payload = {
          date: getnowtime(),
          user_id: account,
          edit_id: "",
          station_name: name,
          sys: catequery,
          carnum: carnum,
          no_carnum: nosencarnum,
          場站導標桿: checkdata[4].ischeck,
        };
        await axios.post(url, payload);
      } catch (error) {
        console.log(error);
      }
    }

    isLoading.value = false;
    router.push("/server/stationsubmit");
  } catch (error) {
    console.log("驗證失敗");
  }
};

//場站資訊
interface gcpdata {
  City: string;
  Station_Name: string;
  Station_Number: number;
  Sys: string;
}

//先取得所有場站資料
const gcpdata = ref<gcpdata[]>([]);
const getdata = async () => {
  try {
    const url = `${import.meta.env.VITE_URL}/station/stations`;
    const res = await axios.get(url);
    gcpdata.value = res.data.data;
  } catch (error) {
    console.log(error);
  }
};

//場站檢驗資料
interface ListItem {
  value: string;
  label: string;
}

getdata();

const list = ref<ListItem[]>([]);
const loading = ref(false);
const options: Ref<ListItem[]> = ref([]);
//1.0與2.0+2.0e分開
const getStationData = async () => {
  ruleFormAll.value.name = null;
  options.value = [];
  const arr: ListItem[] = [];
  gcpdata.value.forEach((item) => {
    if (ruleFormAll.value.catequery === "1.0") {
      if (item.Sys === "1.0")
        arr.push({ value: item.Station_Name, label: item.Station_Name });
    } else {
      if (item.Sys !== "1.0")
        arr.push({ value: item.Station_Name, label: item.Station_Name });
    }
  });
  list.value = [...arr];
};

//關鍵字篩選
const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      options.value = list.value.filter((item) => {
        return item.label.toLowerCase().includes(query.toLowerCase());
      });
    }, 200);
  } else {
    options.value = [];
  }
};
</script>

<style scoped>
/* 小標題字體大小 */
.el-form-item--large {
  --font-size: 23px;
}

/* check字體 */
:deep() .el-checkbox.el-checkbox--large .el-checkbox__label {
  font-size: 16px;
}

.htest {
  color: aqua;
  padding: 20px;
}
</style>
