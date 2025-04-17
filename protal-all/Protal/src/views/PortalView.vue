<template>
  <div class="container">
    <div class="row">
      <div class="col d-flex justify-content-between">
        <h1 class="mt-3 fw-bold">入口網站</h1>
        <div class="my-auto">
          <button type="button" class="btn btn-primary fw-bold" @click="signOut">登出</button>
        </div>
      </div>
    </div>
    <div class="row">
      <table class="table caption-top table-striped table-hover table-bordered">
        <caption class="fw-bold fs-4">
          巨大系統
        </caption>
        <thead class="table-dark">
          <tr>
            <th scope="col"></th>
            <th scope="col">名稱</th>
            <th scope="col">連結</th>
            <th scope="col">備註</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td class="fw-bold">電子表單(WebFlow)</td>
            <td class="fw-bold">
              <a href="http://webflow.giant.com.tw/webflow/flow/logon.asp?to=logon" target="_blank"
                >連結</a
              >
            </td>
            <td class="text-danger">限IE</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td class="fw-bold">電子表單(BPM)</td>
            <td class="fw-bold">
              <a href="https://datacenter.giant.com.tw/Payroll/" target="_blank">連結</a>
            </td>
            <td class="text-danger"></td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td class="fw-bold">個人掛帳資產查詢</td>
            <td class="fw-bold">
              <a href="http://10.1.30.29/asset/dig.htm" target="_blank">連結</a>
            </td>
            <td class="text-danger"></td>
          </tr>
        </tbody>
      </table>

      <table class="table caption-top table-striped table-hover table-bordered">
        <caption class="fw-bold fs-4">
          內部系統
        </caption>
        <thead class="table-dark">
          <tr>
            <th scope="col"></th>
            <th scope="col">名稱</th>
            <th scope="col">連結</th>
            <th scope="col">備註</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td class="fw-bold">資訊服務表單</td>
            <td class="fw-bold">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfLKTeIKDKeHDAX7-fnRA9o3YLl1dvAdTmuu-c2mBpWwjuLjw/viewform"
                target="_blank"
                >連結</a
              >
            </td>
            <td class="text-danger"></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td class="fw-bold">報表網站</td>
            <td class="fw-bold">
              <a href="https://report.youbike.com.tw/" target="_blank">連結</a>
            </td>
            <td class="text-danger"></td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td class="fw-bold">模擬體驗後台</td>
            <td class="fw-bold">
              <a href="https://backend-simulation.youbike.com.tw/" target="_blank">連結</a>
            </td>
            <td class="text-danger"></td>
          </tr>
        </tbody>
      </table>

      <table class="table caption-top table-striped table-hover table-bordered">
        <caption class="fw-bold fs-4">
          客服系統
        </caption>
        <thead class="table-dark">
          <tr>
            <th scope="col"></th>
            <th scope="col">名稱</th>
            <th scope="col">連結</th>
            <th scope="col">備註</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td class="fw-bold">話務後台</td>
            <td class="fw-bold">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfLKTeIKDKeHDAX7-fnRA9o3YLl1dvAdTmuu-c2mBpWwjuLjw/viewform"
                target="_blank"
                >連結</a
              >
            </td>
            <td class="text-danger"></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td class="fw-bold">派工系統</td>
            <td class="fw-bold">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfLKTeIKDKeHDAX7-fnRA9o3YLl1dvAdTmuu-c2mBpWwjuLjw/viewform"
                target="_blank"
                >連結</a
              >
            </td>
            <td class="text-danger"></td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td class="fw-bold">三竹簡訊</td>
            <td class="fw-bold">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfLKTeIKDKeHDAX7-fnRA9o3YLl1dvAdTmuu-c2mBpWwjuLjw/viewform"
                target="_blank"
                >連結</a
              >
            </td>
            <td class="text-danger"></td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td class="fw-bold">話務系統狀態</td>
            <td class="fw-bold">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfLKTeIKDKeHDAX7-fnRA9o3YLl1dvAdTmuu-c2mBpWwjuLjw/viewform"
                target="_blank"
                >連結</a
              >
            </td>
            <td class="text-danger"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const signOut = () => {
  document.cookie = `youbike=;Domain=${import.meta.env.VITE_DOMAIN};expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  document.cookie = `youbiketestBack=;Domain=${import.meta.env.VITE_DOMAIN};expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%; /* 确保表格宽度一致 */
  table-layout: fixed; /* 固定表格布局 */
}
.table th,
.table td {
  text-align: center; /* 列内容居中显示 */
}
.table thead th {
  vertical-align: bottom; /* 表头内容垂直底部对齐 */
}
.table tbody th,
.table tbody td {
  vertical-align: middle; /* 表体内容垂直中间对齐 */
}
.table caption {
  caption-side: top; /* 标题位于表格上方 */
  text-align: center; /* 标题居中显示 */
  margin-bottom: 0.5em; /* 标题和表格之间的间隔 */
}
</style>
