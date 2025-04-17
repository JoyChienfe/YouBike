import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
// import { jwtDecode } from "jwt-decode";
import jwt_decode from "jwt-decode";
const allowedIDs = ['GB2936', 'G96186',  'GB2254', 'GB2366', 'GB2684', 'GB4952'];

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "/",
      component: () => import("../components/LayoutComponent.vue"),
      redirect: { name: "from" },
      children: [
        {
          path: "from",
          name: "from",
          meta: {
            name: "模擬體驗管理",
            islogin: true,
          },
          component: () => import("../views/FromView.vue"),
        },
        {
          path: "stationfrom",
          name: "stationfrom",
          meta: {
            name: "場站管理",
            islogin: true,
          },
          component: () => import("../views/StationFromView.vue"),
        },
        {
          path: "pointtrol",
          meta: {
            name: "分數角色管理",
            islogin: true,
          },
          name: "pointtrol",
          component: () => import("../views/PointroleView.vue"),
        },
        {
          path: "pointtotal",
          name: "pointtotal",
          meta: {
            name: "分數計算",
            islogin: true,
          },
          component: () => import("../views/PointtotalView.vue"),
        },
      ],
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
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/NotfoundView.vue"),
    },
  ],
});

//驗證token
const JWTisok = async () => {
  let token = "";
  const cookies = document.cookie.split(";");
  cookies.forEach((item) => {
    if (item.split("=")[0].trim() === "youbiketestBack") {
      token = item.split("=")[1];
    }
  });
  //token不存在
  if (!token) {
    return false;
  }
  const url = `${import.meta.env.VITE_URL}/member/auth`;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // console.log(token);
  try {
    const res = await axios(url);
    const { message } = res.data;
    // console.log("驗證成功");
    if (message === "驗證成功") return true;
  } catch (error) {
    screenLeft;
    return false;
  }
};

router.beforeEach(async (to, form, next) => {
  //如果去的不是首頁,但沒有token,而且需要登入,就轉到login
  if (to.fullPath != "/login" && to.meta.islogin === true) {
    if ((await JWTisok()) && isAuth()) {
      next();
    } else {
      next("/login");
    }
  } else if (to.fullPath === "/login") {
    if ((await JWTisok()) && isAuth()) {
      next("/from");
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach((to) => {
  if (to.meta.name) {
    document.title = to.meta.name || "模擬體驗網站";
  }
});

//判斷是否有token
// const JWTisok = () => {
//   let istokenlife = false;
//   const cookies = document.cookie.split(";");
//   cookies.forEach((item) => {
//     if (item.split("=")[0].trim() === "youbiketestBack") {
//       istokenlife = true;
//     }
//   });
//   return istokenlife;
// };

function getId() {
  const cookies = document.cookie.split(";");
  let token = null;
  let istokenlife = false;
  cookies.forEach((item) => {
    if (item.split("=")[0].trim() === "youbiketestBack") {
      istokenlife = true;
      token = item.split("=")[1];
    }
  });

  if (!istokenlife) {
    return false;
  }

  try {
    const decodedToken = jwt_decode(token);
    if (decodedToken && decodedToken.person) {
      console.log(JSON.stringify(decodedToken));
      const { account } = decodedToken.person;
      return account;
    }
    return false;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
}

function isAuth() {
  const id = getId();
  return allowedIDs.indexOf(id) > -1;
/*
  if (
    id !== "GB2936" &&
    id !== "GB1364" &&
    id !== "G96186" &&
    id !== "GB3192" &&
    id !== "GB4952"
  ) {
    return false;
  } else {
    return true;
  }
*/
}

// function fuckfun(to, from, next) {
//   const isauth = fuck();
//   if (!isauth) {
//     next("/pointtotalView2");
//   } else {
//     next();
//   }
// }

export default router;
