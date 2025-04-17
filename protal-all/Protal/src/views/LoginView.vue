<template>
  <div class="container">
    <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="true" />
    <div class="row justify-content-center mt-3">
      <div class="col-12 col-md-8 col-lg-6 border border-3 py-3 px-3 rounded-3">
        <div class="my-3">
          <img
            src="https://www.youbike.com.tw/region/assets/images/logo.svg"
            class="img-fluid"
            alt="logo圖片"
          />
        </div>
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
                    autocomplete: 'username'
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
                autocomplete: 'current-password'
              }"
            />
          </n-form-item>
          <n-button attr-type="button" type="primary" @click="subButton" class="col-12 col-md-2">
            送出
          </n-button>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { useRouter } from 'vue-router'
const router = useRouter()
import { NForm, NButton, NFormItem, NInput, NPopover } from 'naive-ui'
import axios from 'axios'
const swal = inject('$swal')
async function NotAlert(str) {
  swal({
    title: str || '錯誤'
  })
}
const isLoading = ref(false)

const formRef = ref(null)
const formValue = ref({
  account: '',
  password: ''
})

const rules = {
  account: [{ required: true, message: '請輸入帳號', trigger: 'blur' }],
  password: [{ required: true, message: '請輸入密碼', trigger: 'blur' }]
}

const showPopover = ref(false)

const handleInput = () => {
  showPopover.value = true
  formValue.value.account = formValue.value.account.toUpperCase()
}

const getToken = async (url, user) => {
  try {
    const res = await axios.post(url, user)
    return res.data.token
  } catch (error) {
    return '登入錯誤'
  }
}

const login = async () => {
  const currentDate = new Date()
  const expirationDate = new Date(currentDate.getTime() + 8 * 60 * 60 * 1000)
  const expires = expirationDate.toGMTString()

  const user = {
    account: formValue.value.account,
    password: formValue.value.password
  }

  let canUse = false

  //報表網站
  const REPORT_url = `${import.meta.env.VITE_REPORT_URL}/isauth/login`
  const ReportRes = await getToken(REPORT_url, user)
  if (ReportRes !== '登入錯誤') {
    canUse = true
    document.cookie = `youbike=${ReportRes}; Domain=${import.meta.env.VITE_DOMAIN}; expires=${expires};path=/;`
  }

  //模擬體驗後台
  const BackEnd_TEST_url = `${import.meta.env.VITE_BACKEND_TEST_URL}/member/login`
  const BackTestRes = await getToken(BackEnd_TEST_url, user)
  if (BackTestRes !== '登入錯誤') {
    canUse = true
    document.cookie = `youbiketestBack=${BackTestRes};Domain=${import.meta.env.VITE_DOMAIN};  expires=${expires};path=/;`
  }

  if (canUse) {
    router.push('/youbike_portal')
  } else {
    throw new Error('帳號或密碼錯誤')
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const subButton = async () => {
  const { account, password } = formValue.value
  if (!account || !password) {
    await NotAlert('請輸入帳號密碼')
    return
  }

  try {
    isLoading.value = true
    await delay(1000)
    await login()
  } catch (error) {
    await NotAlert(error.message)
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" scoped></style>
