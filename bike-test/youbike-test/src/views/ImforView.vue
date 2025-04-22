<template>
  <div class="container text-center">
    <div class="row my-3">
      <div class="fs-4">
        本月台數 <el-text class="mx-1 fs-4" type="danger">{{ qty }}</el-text> 台
      </div>
    </div>
    <div class="row mb-3">
      <div class="fs-4 col-6">
        2.0 : <el-text class="mx-1 fs-4" type="danger">{{ qty2 }}</el-text> 台
      </div>
      <div class="fs-4 col-6">
        2.0E : <el-text class="mx-1 fs-4" type="danger">{{ qty2e }}</el-text> 台
      </div>
    </div>
    <el-select
      v-model="selectedCity"
      placeholder="請選擇城市"
      style="width: 300px"
    >
      <el-option
        v-for="city in cities"
        :key="city.value"
        :label="city.label"
        :value="city.value"
      ></el-option>
    </el-select>
    <div>
      <p class="fs-1">模擬體驗詳細資訊</p>
      <el-table
        :data="tableData"
        stripe
        height="450"
        border
        style="width: 100%"
      >
        <el-table-column prop="date" label="時間" align="center" />
        <el-table-column prop="name" label="場站名稱" align="center" />
        <el-table-column prop="number" label="車號" align="center" />
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import axios from "axios";
import { useAuth } from "../stores/auth";
import type { Testfrom1, Testfrom2, Testfrom3 } from "env";

interface TableData {
  date?: string;
  name?: string;
  number?: string;
}

const tableData = ref<TableData[]>([]);
const qty = ref(0);
const qty2 = ref(0);
const qty2e = ref(0);

const store = useAuth();
const { account } = store.getUserid();
const selectedCity = ref("全部");

const cities = [
  { value: "全部", label: "全部" },
  { value: "台北市", label: "台北市" },
  { value: "新北市", label: "新北市" },
  { value: "桃園市", label: "桃園市" },
  { value: "竹科", label: "竹科" },
  { value: "新竹市", label: "新竹市" },
  { value: "新竹縣", label: "新竹縣" },
  { value: "苗栗縣", label: "苗栗縣" },
  { value: "台中市", label: "台中市" },
  { value: "彰化縣", label: "彰化縣" },
  { value: "嘉義市", label: "嘉義市" },
  { value: "嘉義縣", label: "嘉義縣" },
  { value: "台南市", label: "台南市" },
  { value: "高雄市", label: "高雄市" },
  { value: "屏東縣", label: "屏東縣" },
  { value: "台東縣", label: "台東縣" },
];

// 抓取場站資料
const getData = async (city = "全部"): Promise<void> => {
  const url = `${import.meta.env.VITE_URL}/biketest/biketest?id=${account}`;
  try {
    const res = await axios.get(url);
    const resData = res.data.data as Testfrom1[] & Testfrom2[] & Testfrom3[];

    // 过滤后的数据
    const filteredData = resData.filter((item) => formatMonth(item.test_date));

    // 如果选择的城市不是全部，进一步过滤数据
    const finalData =
      city === "全部"
        ? filteredData
        : filteredData.filter((item) => getCity(item.station_name) === city);

    // 更新 tableData
    tableData.value = finalData.map((item) => ({
      date: item.test_date,
      name: item.station_name,
      number: item.carnum,
    }));

    // 计算不同条件的数量
    qty.value = finalData.length;
    qty2.value = finalData.filter((item) => item.sys === "2.0").length;
    qty2e.value = finalData.filter(
      (item) => item.sys === "2.0E" || item.sys === "2.0e"
    ).length;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getCity = (params: string | undefined): string => {
  if (!params) {
    return "";
  }
  return params.split("-")[0];
};

// 判斷是否日期是這個月
const formatMonth = (dateTimeString: string | undefined): boolean => {
  if (!dateTimeString) {
    return false;
  }
  const originalDate = new Date(dateTimeString);
  const year = originalDate.getFullYear();
  const month = originalDate.getMonth() + 1;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  return year === currentYear && month === currentMonth;
};

watch(selectedCity, async (value) => {
  try {
    await getData(value);
  } catch (error) {
    console.error("Error in watch:", error);
  }
});

(async () => {
  try {
    await getData();
  } catch (error) {
    console.error("Error on initialization:", error);
  }
})();
</script>

<style scoped></style>
