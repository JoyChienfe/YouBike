<template>
  <div class="mt-3 mx-auto px-5" style="max-width: 900px">
    <h2 class="mb-3">後台登入</h2>
    <n-form ref="formRef" :rules="rules" :size="'large'" :model="formValue">
      <n-form-item label="帳號" path="account">
        <n-popover trigger="click" v-model:show="showPopover">
          <template #trigger>
            <n-input
              v-model:value="formValue.account"
              placeholder="請輸入帳號"
              @input="handleInput"
              @keyup.enter="subButton"
              :input-props="{
                autocomplete: 'username',
              }"
            />
          </template>
          <div>英文只允許大寫</div>
        </n-popover>
      </n-form-item>
      <n-form-item label="密碼" path="password">
        <n-input
          v-model:value="formValue.password"
          placeholder="請輸入密碼"
          type="password"
          show-password-on="mousedown"
          @keyup.enter="subButton"
          :input-props="{
            autocomplete: 'current-password',
          }"
        />
      </n-form-item>

      <n-alert title="Error" type="error" class="mb-5" v-if="alert">
        帳號密碼錯誤
      </n-alert>

      <n-button
        attr-type="button"
        type="primary"
        @click="subButton"
        class="col-12 col-md-2"
      >
        送出
      </n-button>
    </n-form>
  </div>
  <div></div>
</template>

<script setup>
import { NForm, NButton, NFormItem, NInput, NAlert, NPopover } from "naive-ui";
import axios from "axios";
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const alert = ref(false);
const formRef = ref(null);
const formValue = ref({
  account: "",
  password: "",
});

//帳號轉大寫
const showPopover = ref(false);
function handleInput() {
  showPopover.value = true;
  formValue.value.account = formValue.value.account.toUpperCase();
}

const rules = {
  account: [{ required: true, message: "請輸入帳號", trigger: "blur" }],
  password: [{ required: true, message: "請輸入密碼", trigger: "blur" }],
};

//登入帳號密碼拿到jwt token
async function getToken(account, password) {
  try {
    const url = `${import.meta.env.VITE_URL}/member/login`;
    const data = { account, password };
    const res = await axios.post(url, data);

    if (!res.data || !res.data.token) {
      throw new Error("未能獲取有效的JWT token");
    }
    const { token } = res.data;
    return token;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

//取得8小時後的時間
function getEightHrTime() {
  const currentDate = new Date();
  console.log(currentDate);
  const expirationDate = new Date(currentDate.getTime() + 8 * 60 * 60 * 1000);
  const expires = expirationDate.toString();
  return expires;
}

const subButton = async () => {
  try {
    alert.value = false;
    await formRef.value.validate();
    const { account, password } = formValue.value;
    const token = await getToken(account, password);
    const eightHour = getEightHrTime();
    //把token 放到cookie 8hr
    document.cookie = `youbiketestBack=${token}; expires=${eightHour};path=/;`;
    router.push("/from");
  } catch (error) {
    if (error.message === "帳號非管理員") {
      await new Promise((resolve) =>
        setTimeout(function () {
          resolve();
        }, 500)
      );
      alert.value = true;
      console.error("帳號非管理員");
    } else if (error.message === "帳號密碼錯誤") {
      //延遲
      await new Promise((resolve) =>
        setTimeout(function () {
          resolve();
        }, 500)
      );
      alert.value = true;
      console.error("帳號密碼錯誤");
    } else {
      // 提示其他錯誤
      console.error("無法完成登入，請稍後再試", error);
    }
  }
};

(() => {
  if (!import.meta.env.DEV) {
    window.location.href = "https://portal.youbike.com.tw/login";
  }
})();
</script>

<style scoped></style>
