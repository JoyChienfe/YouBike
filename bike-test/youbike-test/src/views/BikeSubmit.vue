<template>
  <div class="container-fluid">
    <p class="fs-1 text-center">模擬體驗 提交成功</p>
    <div class="text-center">
      <el-icon size="200" color="green"><CircleCheck /></el-icon>
    </div>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="date" label="時間" align="center" />
      <el-table-column prop="name" label="場站名稱" align="center" />
      <el-table-column prop="number" label="車號" align="center" />
    </el-table>
    <div class="col text-center">
      <button
        type="button"
        class="btn btn-dark-sencond btn-lg mt-6 me-6"
        @click="gotoMain_page"
      >
        回首頁
      </button>
      <button
        type="button"
        class="btn btn-pink btn-lg mt-6"
        @click="gotoBike_test"
      >
        繼續填寫
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { Ref } from "vue";
const router = useRouter();
interface TableData {
  date: string;
  name: string;
  number: string;
}
const tableData: Ref<TableData[]> = ref([]);

import { useAuth } from "../stores/auth";
const store = useAuth();
const getData = async () => {
  const { account } = store.getUserid();
  // const id = "GB3192";
  const res = await axios.get(
    `${import.meta.env.VITE_URL}/biketest/biketest?id=${account}`
  );
  const resData = res.data.data;
  tableData.value = [
    {
      date: resData[0]["test_date"],
      name: resData[0]["station_name"],
      number: resData[0]["carnum"],
    },
  ];
};

//日期轉換格式
// function formatDateTime(dateTimeString:string) {
//   const originalDate = new Date(dateTimeString);
//   const year = originalDate.getFullYear();
//   const month = String(originalDate.getMonth() + 1).padStart(2, '0');
//   const day = String(originalDate.getDate()).padStart(2, '0');
//   const hours = String(originalDate.getHours()).padStart(2, '0');
//   const minutes = String(originalDate.getMinutes()).padStart(2, '0');
//   const seconds = String(originalDate.getSeconds()).padStart(2, '0');
//   const formattedDateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
//   return formattedDateString;
// }

//檢查傳入值格式2023-10-05 13:03:08 有沒有超過10分中
function isWithinTenMinutes(timeString: string) {
  const inputDate = new Date(timeString) as any;
  const currentDate = new Date() as any;
  const timeDifference = currentDate - inputDate;
  const minutesDifference = timeDifference / (1000 * 60);
  return minutesDifference <= 10;
}

(async () => {
  await getData();
  const date = tableData.value[0]["date"];
  // 超過十分鐘的話 踢到首頁
  if (!isWithinTenMinutes(date)) {
    router.push("/server/mainpage");
  }
})();

const gotoBike_test = () => router.push("/server/biketest/BiketestStepone");
const gotoMain_page = () => router.push("/server/mainpage");
</script>

<style scoped></style>
