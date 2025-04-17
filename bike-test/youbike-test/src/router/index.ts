import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: { name: "imfor" },
    },
    {
      path: "/login",
      name: "login",
      meta: {
        name: "登入",
        islogin: false,
      },
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/server",
      name: "server",
      redirect: { name: "imfor" },
      component: () => import("../views/NavbarView.vue"),
      children: [
        {
          path: "mainpage",
          name: "imfor",
          meta: {
            name: "詳細資訊",
            islogin: true,
          },
          component: () => import("../views/ImforView.vue"),
        },
        {
          path: "check",
          name: "check",
          meta: {
            name: "確認頁面",
            islogin: true,
          },
          component: () => import("../views/CheckView.vue"),
        },
        {
          path: "stationtest",
          name: "stationtest",
          meta: {
            name: "場站檢驗",
            islogin: true,
          },
          component: () => import("../views/StationtestView.vue"),
        },
        {
          path: "stationsubmit",
          name: "stationsubmit",
          meta: {
            name: "場站檢驗送出",
            islogin: true,
          },
          component: () => import("../views/StationSubmit.vue"),
        },
        {
          path: "biketest",
          name: "biketest",
          redirect: { name: "BiketestStepone" },
          meta: {
            name: "模擬檢驗",
            islogin: true,
          },
          children: [
            {
              path: "BiketestStepone",
              name: "BiketestStepone",
              meta: {
                name: "模擬體驗第一頁",
                islogin: true,
              },
              component: () => import("../views/BiketestStepone.vue"),
            },
            {
              path: "BiketestSteptwo",
              name: "BiketestSteptwo",
              meta: {
                name: "模擬體驗第二頁",
                islogin: true,
              },
              component: () => import("../views/BiketestSteptwo.vue"),
            },
            {
              path: "BiketestStepthree",
              name: "BiketestStepthree",
              meta: {
                name: "模擬體驗第三頁",
                islogin: true,
              },
              component: () => import("../views/BiketestStepthree.vue"),
            },
            {
              path: "BiketestStepfour",
              name: "BiketestStepfour",
              meta: {
                name: "模擬體驗第四頁",
                islogin: true,
              },
              component: () => import("../views/BiketestStepfour.vue"),
            },
            {
              path: "BiketestStepfive",
              name: "BiketestStepfive",
              meta: {
                name: "模擬體驗第五頁",
                islogin: true,
              },
              component: () => import("../views/BiketestStepfive.vue"),
            },
            {
              path: "BiketestStepsix",
              name: "BiketestStepsix",
              meta: {
                name: "模擬體驗第六頁",
                islogin: true,
              },
              component: () => import("../views/BiketestStepsix.vue"),
            },
            {
              path: "BiketestStepseven",
              name: "BiketestStepseven",
              meta: {
                name: "模擬體驗第七頁",
                islogin: true,
              },
              component: () => import("../views/BiketestStepseven.vue"),
            },
            {
              path: "BiketestStepeight",
              name: "BiketestStepeight",
              meta: {
                name: "模擬體驗第八頁",
                islogin: true,
              },
              component: () => import("../views/BiketestStepeight.vue"),
            },
            {
              path: "BiketestStepnine",
              name: "BiketestStepnine",
              meta: {
                name: "模擬體驗第九頁",
                islogin: true,
              },
              component: () => import("../views/BiketestStepnine.vue"),
            },
            {
              path: "BiketestStepten",
              name: "BiketestStepten",
              meta: {
                name: "模擬體驗第十頁",
                islogin: true,
              },
              component: () => import("../views/BiketestStepten.vue"),
            },
          ],
          // component: () => import('../views/BiketestView.vue'),
        },
        {
          path: "bikesubmit",
          name: "bikesubmit",
          meta: {
            name: "模擬檢驗送出",
            islogin: true,
          },
          component: () => import("../views/BikeSubmit.vue"),
        },
      ],
    },

    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      meta: {
        name: "404頁面",
        islogin: false,
      },
      component: () => import("../views/NotfountView.vue"),
    },
  ],
});

//驗證token
const JWTisok = async () => {
  let token = "";
  const cookies = document.cookie.split(";");
  cookies.forEach((item) => {
    if (item.split("=")[0].trim() === "youbiketest") {
      token = item.split("=")[1];
    }
  });
  //token不存在
  if (!token) {
    return false;
  }
  const url = `${import.meta.env.VITE_URL}/member/auth`;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const res = await axios(url);
    const { message }: { message: string } = res.data;
    if (message === "驗證成功") return true;
  } catch (error) {
    return false;
  }
};

router.beforeEach(async (to, form, next) => {
  //如果去的不是首頁,但沒有token,而且需要登入,就轉到login
  if (to.fullPath != "/login" && to.meta.islogin === true) {
    if (await JWTisok()) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

router.afterEach((to) => {
  if (to.meta.name) {
    document.title = (to.meta.name as string) || "模擬體驗網站";
  }
});

export default router;
