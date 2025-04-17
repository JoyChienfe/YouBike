<template>
  <div class="container">
    <div class="col"><p class="fw-bold mt-3">原始資料EXCEL</p></div>
    <div class="row align-items-center">
      <div class="col-md-3">
        <input
          type="file"
          class="form-control"
          @change="Excelhandler"
          ref="file"
        />
      </div>
      <div class="col-md-3 mt-3 mt-md-0">
        <button type="button" class="btn btn-success" @click="submit">
          送出
        </button>
      </div>
    </div>
    <n-divider />
    <div class="col"><p class="fw-bold mt-3">綜合統計EXCEL</p></div>
    <div class="row align-items-center">
      <div class="col-md-3">
        <input
          type="file"
          class="form-control"
          @change="Excelhandler"
          ref="file"
        />
      </div>
      <div class="col-md-3 mt-3 mt-md-0">
        <button type="button" class="btn btn-success" @click="submit">
          送出
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NDivider } from "naive-ui";
// n-divider

// function handleClick() {
//   console.log(upload.value);
// }

// function handleChange(options) {
//   console.log(options);
// }
</script>

<style lang="scss" scoped></style>
