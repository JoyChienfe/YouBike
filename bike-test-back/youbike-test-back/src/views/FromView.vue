<template>
  <loading
    v-model:active="isLoading"
    :can-cancel="false"
    :is-full-page="true"
  />

  <div class="container py-3 fw-bolders">
    <n-space vertical>
      <filterCompentent
        ref="filterCom"
        :sysoptions="sysoptions"
        :data="dataAll"
        @filter="filter"
        @clearform="clearform"
      />
      <n-data-table
        :columns="columns"
        :data="fromdata"
        :bordered="false"
        striped
        size="small"
        :pagination="{
          pageSize: 15,
        }"
        :paginate-single-page="false"
      />
    </n-space>

    <drawerDark
      :formData="formData"
      :drawerisopen="drawerisopen"
      @drawerclose="drawerclose"
      :methodName="methodName"
      :modeldisabled="modeldisabled"
      @getData="getData"
    />
  </div>
</template>

<script setup>
import { NDataTable, NButton, NSpace } from "naive-ui";
import { h, ref, inject } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import drawerDark from "../components/DrawerComponent.vue";
import filterCompentent from "../components/FilterComponent.vue";
import axios from "axios";
const swal = inject("$swal");

const filterCom = ref(null);

const isLoading = ref(false);

const sysoptions = [
  {
    label: "1.0",
    value: "1.0",
  },
  {
    label: "2.0",
    value: "2.0",
  },
  {
    label: "2.0E",
    value: "2.0E",
  },
];
//data
const dataAll = ref([]);

const fromdata = ref();
const createColumns = ({ check, edit, dele }) => {
  return [
    {
      title: "編號",
      key: "f_id",
      align: "center",
    },
    {
      title: "姓名",
      key: "name",
      align: "center",
    },
    {
      title: "公號",
      key: "id",
      align: "center",
    },
    {
      title: "測驗日期",
      key: "test_date",
      align: "center",
    },

    {
      title: "車種",
      key: "car_type",
      align: "center",
    },
    {
      title: "城市",
      key: "city",
      align: "center",
    },
    {
      title: "方法",
      key: "check",
      align: "center",
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            color: "blue",
            class: "fw-bolder",
            onClick: () => check(row),
          },
          { default: () => "查看" }
        );
      },
    },
    {
      title: "方法",
      key: "edit",
      align: "center",
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            color: "green",
            class: "fw-bolder",
            onClick: () => edit(row),
          },
          { default: () => "編輯" }
        );
      },
    },
    {
      title: "方法",
      key: "dele",
      align: "center",
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            color: "red",
            class: "fw-bolder",
            onClick: () => dele(row),
          },
          { default: () => "刪除" }
        );
      },
    },
  ];
};

//抽屜開關
const drawerisopen = ref(false);
//抽屜標題
const methodName = ref("");
const modeldisabled = ref(true);
//抽屜打開
function draweropen(method) {
  drawerisopen.value = true;
  editmethodName(method);
}

//抽屜關閉
function drawerclose() {
  drawerisopen.value = false;
}

//編輯抽屜名
function editmethodName(method) {
  if (method === "check") {
    methodName.value = "查看";
    modeldisabled.value = true;
  } else if (method === "edit") {
    methodName.value = "編輯";
    modeldisabled.value = false;
  } else {
    methodName.value = "錯誤方法";
  }
}

//刪除
async function deleteData(id) {
  try {
    const url = `${import.meta.env.VITE_URL}/biketest/biketest/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.log("資料庫刪除失敗");
  }
}

//是否刪除
async function ErrorAlert() {
  const res = await swal({
    title: "確定刪除?",
    text: "刪除將不可復原",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "確定",
  });

  if (res.isConfirmed) {
    return true;
  } else {
    return false;
  }
  // console.log(res);
}

//需要傳到子選單的porps資料
const formData = ref(null);
const columns = createColumns({
  check(row) {
    draweropen("check");
    dataAll.value.forEach((item) => {
      if (item.id === row["f_id"]) {
        formData.value = item;
      }
    });
    console.log("這是查看方法" + row["f_id"]);
  },
  edit(row) {
    draweropen("edit");
    dataAll.value.forEach((item) => {
      if (item.id === row["f_id"]) {
        formData.value = item;
      }
    });
    console.log("這是編輯方法" + row);
  },
  async dele(row) {
    try {
      const res = await ErrorAlert();
      if (res) {
        const { f_id } = row;
        await deleteData(f_id);
        await getData();
      }
    } catch (error) {
      console.log("刪除失敗");
    }
  },
});

//檢測字串有幾位,如果等於一位,前面加0
function countDigits(number) {
  // 将数字转换为字符串
  const numString = Math.abs(number).toString();

  // 获取字符串的长度，即数字的位数
  const numDigits = numString.length;

  if (numDigits === 1) {
    return `0${number}`;
  }
  return `${number}`;
}

function isTimestampWithinRange(startTimestamp, endTimestamp, checkTimestamp) {
  // 將開始和結束時間戳轉換為日期，然後設定為那天的開始和結束
  let startDate = new Date(startTimestamp);
  startDate.setHours(0, 0, 0, 0);
  let endDate = new Date(endTimestamp);
  endDate.setHours(23, 59, 59, 999);

  // 將時間戳轉換為日期用於比較
  let checkDate = new Date(checkTimestamp);
  return checkDate >= startDate && checkDate <= endDate;
}

//篩選資料
function filter(data) {
  fromdata.value = [];
  if (data.type === "name") {
    dataAll.value.forEach((item) => {
      const city = item.station_name.split("-");
      if (item.user_name === data.value) {
        fromdata.value.push({
          f_id: item.id,
          name: item.user_name,
          id: item.user_id,
          test_date: item.test_date,
          car_type: item.sys,
          city: city[1] ? city[0] : "",
        });
      }
    });
  } else if (data.type === "userid") {
    dataAll.value.forEach((item) => {
      const city = item.station_name.split("-");
      if (item.user_id === data.value) {
        fromdata.value.push({
          f_id: item.id,
          name: item.user_name,
          id: item.user_id,
          test_date: item.test_date,
          car_type: item.sys,
          city: city[1] ? city[0] : "",
        });
      }
    });
  } else if (data.type === "date") {
    const { year, day, month } = data.value;
    const seletcdate = `${year}-${countDigits(month)}-${countDigits(day)}`;
    dataAll.value.forEach((item) => {
      const city = item.station_name.split("-");
      if (item.test_date.split(" ")[0] === seletcdate) {
        fromdata.value.push({
          f_id: item.id,
          name: item.user_name,
          id: item.user_id,
          test_date: item.test_date,
          car_type: item.sys,
          city: city[1] ? city[0] : "",
        });
      }
    });
  } else if (data.type === "sys") {
    dataAll.value.forEach((item) => {
      const city = item.station_name.split("-");
      if (
        data.value === "2.0E" &&
        (item.sys === "2.0e" || item.sys === "2.0E")
      ) {
        fromdata.value.push({
          f_id: item.id,
          name: item.user_name,
          id: item.user_id,
          test_date: item.test_date,
          car_type: item.sys,
          city: city[1] ? city[0] : "",
        });
      } else {
        if (item.sys === data.value) {
          fromdata.value.push({
            f_id: item.id,
            name: item.user_name,
            id: item.user_id,
            test_date: item.test_date,
            car_type: item.sys,
            city: city[1] ? city[0] : "",
          });
        }
      }
    });
  } else if (data.type === "city") {
    dataAll.value.forEach((item) => {
      const city = item.station_name.split("-")[1]
        ? item.station_name.split("-")[0]
        : "";
      if (city === data.value) {
        fromdata.value.push({
          f_id: item.id,
          name: item.user_name,
          id: item.user_id,
          test_date: item.test_date,
          car_type: item.sys,
          city: city,
        });
      }
    });
  } else if (data.type === "dates") {
    dataAll.value.forEach((item) => {
      // console.log(convertDateToTimestamp(item.test_date));
      if (
        isTimestampWithinRange(
          data.value[0],
          data.value[1],
          Date.parse(item.test_date)
        )
      ) {
        const city = item.station_name.split("-");
        console.log(item.test_date);
        fromdata.value.push({
          f_id: item.id,
          name: item.user_name,
          id: item.user_id,
          test_date: item.test_date,
          car_type: item.sys,
          city: city[1] ? city[0] : "",
        });
      }
    });
  }
}

//清空篩選
function clearform() {
  // console.log(dataAll.value, fromdata.value);
  fromdata.value = dataAll.value.map((item) => {
    const city = item.station_name.split("-");
    return {
      f_id: item.id,
      name: item.user_name,
      id: item.user_id,
      test_date: item.test_date,
      car_type: item.sys,
      city: city[1] ? city[0] : "",
    };
  });
}

//取得資料
async function getData() {
  try {
    isLoading.value = true;
    //表單資料
    const url = `${import.meta.env.VITE_URL}/biketest/Allbiketest`;
    //場站資料
    console.log("URL:" + url);
    const res = await axios.get(url);
    isLoading.value = false;
    dataAll.value = res.data;

    fromdata.value = dataAll.value.map((item) => {
      const city = item.station_name.split("-");
      return {
        f_id: item.id,
        name: item.user_name,
        id: item.user_id,
        test_date: item.test_date,
        car_type: item.sys,
        city: city[1] ? city[0] : "",
      };
    });

    filterCom.value.clearfrom();
  } catch (error) {
    console.log("ERROR:" + error);
  }
}

(async () => {
  await getData();
})();
</script>

<style lang="scss" scoped></style>
