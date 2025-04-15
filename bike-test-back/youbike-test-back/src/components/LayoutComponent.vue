<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fw-bold">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/from" class="nav-link">模擬體驗管理</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/stationfrom" class="nav-link">場站管理</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/pointtrol" class="nav-link"
              >分數角色管理</RouterLink
            >
          </li>
          <!-- StationFromView -->
          <li class="nav-item">
            <RouterLink to="/pointtotal" class="nav-link">分數計算</RouterLink>
          </li>

          <!-- <li class="nav-item">
            <a class="nav-link" @click="signout" href="#">登出</a>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>

  <router-view />
</template>

<script setup>
import { RouterView, RouterLink } from "vue-router";
// import jwt_decode from "jwt-decode";
// const router = useRouter();
// function signout() {
//   document.cookie =
//     "youbiketestBack=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//   router.push("/login");
// }

// function getId() {
//   const cookies = document.cookie.split(";");
//   let token = null;
//   let istokenlife = false;
//   cookies.forEach((item) => {
//     if (item.split("=")[0].trim() === "youbiketestBack") {
//       istokenlife = true;
//       token = item.split("=")[1];
//     }
//   });

//   if (!istokenlife) {
//     return false;
//   }

//   try {
//     const decodedToken = jwt_decode(token);
//     if (decodedToken && decodedToken.person) {
//       const { account } = decodedToken.person;
//       console.log("account", account);
//       return account;
//     }
//     return false;
//   } catch (error) {
//     console.error("Error decoding token:", error);
//     return false;
//   }
// }

// function fuck() {
//   const id = getId();
//   if (
//     id !== "GB2936" &&
//     id !== "GB1364" &&
//     id !== "G96186" &&
//     id !== "GB3192"
//   ) {
//     return false;
//   } else {
//     return true;
//   }
// }
</script>

<style lang="scss" scoped></style>
