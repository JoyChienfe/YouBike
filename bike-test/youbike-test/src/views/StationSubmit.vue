<template>
  <div class="container-fluid text-center">
    <p class="fs-1 text-center">場站檢驗提交成功</p>
    <div class="text-center">
      <el-icon size="200" color="green"><CircleCheck /></el-icon>
    </div>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="date" label="時間" align="center" />
      <el-table-column prop="name" label="場站名稱" align="center" />
      <el-table-column prop="system" label="系統" align="center" />
    </el-table>
    <button
      type="button"
      class="btn btn-dark-sencond btn-lg mt-6"
      @click="router.push('/server/mainpage')"
    >
      詳細資訊
    </button>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import type { Ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
interface TableData {
  date: string;
  name: string;
  system: string;
}
const tableData: Ref<TableData[]> = ref([]);

const UseStationAll: Ref<StationtestData[] | null> = ref(null);
//抓取場站資料
import { useAuth } from "../stores/auth";
import type { StationtestData } from "env";

const store = useAuth();
const getStationName = async () => {
  const { account } = store.getUserid();
  const url1 = `${import.meta.env.VITE_URL}/station/station1?id=${account}`;
  const url2 = `${import.meta.env.VITE_URL}/station/station2?id=${account}`;
  try {
    const res = await Promise.all([axios.get(url1), axios.get(url2)]);
    const data1: StationtestData[] = res[0].data.data;
    const data2: StationtestData[] = res[1].data.data;
    const arr: StationtestData[] = [...data1, ...data2];
    UseStationAll.value = arr.sort((a, b) => {
      const dateA: any = new Date(a.test_date);
      const dateB: any = new Date(b.test_date);
      return dateB - dateA;
    });
    tableData.value = [
      {
        date: UseStationAll.value[0].test_date,
        system: UseStationAll.value[0].sys,
        name: UseStationAll.value[0].station_name,
      },
    ];
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await getStationName();
  const date = tableData.value[0]["date"];
  //超過十分鐘的話 踢到首頁
  if (!isWithinTenMinutes(date)) {
    router.push("/server/mainpage");
  }
})();

//檢查傳入值格式2023-10-05 13:03:08 有沒有超過10分中
function isWithinTenMinutes(timeString: string) {
  console.log(timeString);
  const inputDate = new Date(timeString) as any;
  const currentDate = new Date() as any;
  const timeDifference = currentDate - inputDate;
  const minutesDifference = timeDifference / (1000 * 60);
  return minutesDifference <= 10;
}
</script>

<style scoped></style>
