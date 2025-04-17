<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-2">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="/標題(1.72).png" alt="標題" width="80" height="50" />
      </a>
      <button
        class="navbar-toggler"
        @click="state.toggle()"
        type="button"
        data-bs-toggle="collapse"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" ref="navbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 text-center">
          <li class="nav-item" @click="closeNavbar">
            <RouterLink to="/server/mainpage" class="nav-link active"
              >詳細資訊</RouterLink
            >
          </li>
          <li class="nav-item" @click="closeNavbar">
            <RouterLink to="/server/stationtest" class="nav-link active"
              >場站檢驗</RouterLink
            >
          </li>
          <li class="nav-item" @click="closeNavbar">
            <RouterLink
              to="/server/biketest/BiketestStepone"
              class="nav-link active"
              >車輛檢驗</RouterLink
            >
          </li>
          <li class="nav-item" @click="closeNavbar">
            <RouterLink to="/login" class="nav-link active" @click="logout"
              >登出</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script setup lang="ts">
import { useAuth } from "../stores/auth";
import { RouterView, RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import "bootstrap";
import collapse from "bootstrap/js/dist/collapse";

type Auth = {
  checkauth: () => void;
};

const auth: Auth = useAuth();

//讓給次發出請求都有驗證標頭
auth.checkauth();

const navbar = ref();
const state = ref();
const closeNavbar = () => {
  state.value.hide();
};
onMounted(() => {
  state.value = new collapse(navbar.value);
});

const logout = () => {
  document.cookie =
    "youbiketest=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
</script>

<style s></style>
