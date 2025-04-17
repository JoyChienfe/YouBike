<template>
  <n-space>
    <n-select
      v-if="props.data.length > 1"
      v-model:value="selectValue"
      :options="selectoptions"
      placeholder="請選擇篩選方式"
      @update:value="handleUpdateValue"
      style="width: 200px"
    />
    <template v-if="selectValue === '姓名'">
      <el-select-v2
        v-model="Namevalue"
        filterable
        :options="Nameoptions"
        placeholder="請選擇姓名"
        style="width: 240px"
      />
      <n-button type="info" @click="submit">搜尋</n-button></template
    >
    <template v-else-if="selectValue === '公號'">
      <el-select-v2
        v-model="Numvalue"
        filterable
        :options="Numoptions"
        placeholder="請選擇公號"
        style="width: 240px"
      />
      <n-button type="info" @click="submit">搜尋</n-button></template
    >
    <template v-else-if="selectValue === '測驗日期'">
      <n-date-picker
        v-model:value="timestamp"
        type="date"
        placeholder="請選擇日期"
      ></n-date-picker>
      <n-button type="info" @click="submit">搜尋</n-button></template
    >
    <template v-else-if="selectValue === '測驗日期(範圍)'">
      <n-date-picker
        v-model:value="timestamps"
        type="daterange"
        placeholder="請選擇日期"
      ></n-date-picker>
      <n-button type="info" @click="submit">搜尋</n-button></template
    >
    <template v-else-if="selectValue === '車種'">
      <n-select
        v-model:value="sysvalue"
        placeholder="請選擇車種"
        :options="props.sysoptions"
        style="width: 240px"
      />
      <n-button type="info" @click="submit">搜尋</n-button>
    </template>
    <template v-else-if="selectValue === '城市'">
      <n-select
        v-model:value="Cityvalue"
        placeholder="請選擇城市"
        :options="Cityoptions"
        style="width: 240px"
      />
      <n-button type="info" @click="submit">搜尋</n-button>
    </template>
    <n-button type="info" @click="clearfrom">清空篩選</n-button>
  </n-space>
</template>

<script setup>
import { NButton, NSpace, NSelect, NDatePicker } from "naive-ui";
import { ElSelectV2 } from "element-plus";
import { ref } from "vue";

const emit = defineEmits(["filter", "clearform"]);

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  sysoptions: {
    type: Array,
    required: true,
  },
});

//姓名篩選
const Namevalue = ref([]);
const Nameoptions = ref([]);
function NameoptionsHandler() {
  const nameobj = {};
  props.data.forEach((item) => {
    if (!nameobj[`${item.user_name}`]) {
      nameobj[`${item.user_name}`] = true;
    }
  });
  for (const name in nameobj) {
    Nameoptions.value.push({
      label: name,
      value: name,
    });
  }
  console.log();
}

//公號篩選
const Numvalue = ref([]);
const Numoptions = ref([]);
function NumoptionsHandler() {
  const idobj = {};
  props.data.forEach((item) => {
    if (!idobj[`${item.user_id}`]) {
      idobj[`${item.user_id}`] = true;
    }
  });
  for (const id in idobj) {
    Numoptions.value.push({
      label: id,
      value: id,
    });
  }
}

//日期篩選
const timestamp = ref();

//日期篩選s
const timestamps = ref();

//車種篩選
const sysvalue = ref(null);
// const sysoptions = ref([
//   {
//     label: "1.0",
//     value: "1.0",
//   },
//   {
//     label: "2.0",
//     value: "2.0",
//   },
//   {
//     label: "2.0e",
//     value: "2.0e",
//   },
// ]);

//城市篩選
//公號篩選
const Cityvalue = ref([]);
const Cityoptions = ref([
  {
    label: "台北市",
    value: "台北市",
  },
  {
    label: "新北市",
    value: "新北市",
  },
  {
    label: "桃園市",
    value: "桃園市",
  },
  {
    label: "新竹市",
    value: "新竹市",
  },
  {
    label: "新竹縣",
    value: "新竹縣",
  },
  {
    label: "竹科",
    value: "竹科",
  },
  {
    label: "台中市",
    value: "台中市",
  },
  {
    label: "嘉義縣",
    value: "嘉義縣",
  },
  {
    label: "台南市",
    value: "台南市",
  },
  {
    label: "高雄市",
    value: "高雄市",
  },
  {
    label: "屏東市",
    value: "屏東市",
  },
]);

//篩選方式
const selectoptions = [
  {
    label: "姓名",
    value: "姓名",
  },
  {
    label: "公號",
    value: "公號",
  },
  {
    label: "測驗日期",
    value: "測驗日期",
  },
  {
    label: "測驗日期(範圍)",
    value: "測驗日期(範圍)",
  },
  {
    label: "車種",
    value: "車種",
  },
  {
    label: "城市",
    value: "城市",
  },
];
const selectValue = ref();
//清除所有篩選資料
function clearFilter() {
  //姓名刪除
  Namevalue.value = [];
  Nameoptions.value = [];

  //公號刪除
  Numvalue.value = [];
  Numoptions.value = [];

  //日期刪除
  timestamp.value = null;

  //系統刪除
  sysvalue.value = null;

  //城市刪除
  Cityvalue.value = [];
}

//選擇方法
function handleUpdateValue(value) {
  //清除所有篩選資料
  clearFilter();
  if (value === "姓名") {
    NameoptionsHandler();
    return;
  } else if (value === "公號") {
    NumoptionsHandler();
    return;
  } else if (value === "測驗日期") {
    return;
  }
}
//按鈕送出
function submit() {
  // console.log(selectValue.value);
  if (selectValue.value === "姓名") {
    emit("filter", {
      type: "name",
      value: Namevalue.value,
    });
  }
  if (selectValue.value === "公號") {
    // console.log(Numvalue.value);
    emit("filter", {
      type: "userid",
      value: Numvalue.value,
    });
  }
  if (selectValue.value === "測驗日期") {
    const date = new Date(timestamp.value);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    emit("filter", {
      type: "date",
      value: {
        year,
        month,
        day,
      },
    });
  } else if (selectValue.value === "車種") {
    emit("filter", {
      type: "sys",
      value: sysvalue.value,
    });
  } else if (selectValue.value === "城市") {
    emit("filter", {
      type: "city",
      value: Cityvalue.value,
    });
  } else if (selectValue.value === "測驗日期(範圍)") {
    // console.log(timestamps.value);
    const [starttime, endtime] = timestamps.value;
    const startdate = new Date(starttime);
    const enddate = new Date(endtime);
    console.log(starttime, endtime);
    emit("filter", {
      type: "dates",
      value: [startdate, enddate],
    });
  }
}

function clearfrom() {
  selectValue.value = null;
  clearFilter();
  emit("clearform");
}

// 直接從 setup 返回
// eslint-disable-next-line vue/no-export-in-script-setup
defineExpose({ clearfrom });
</script>

<style lang="scss" scoped></style>
