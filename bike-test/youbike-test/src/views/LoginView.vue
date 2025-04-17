<template>
  <div class="container">
    <loading
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    />
    <el-form
      :model="ruleForm"
      size="large"
      label-width="120px"
      label-position="top"
      ref="formRef"
      :rules="rules"
    >
      <div class="row">
        <div class="col-12 mb-3">
          <img src="/login(5.12).jpg" alt="首頁圖片" class="img-fluid" />
        </div>
        <div class="col-12 mb-3">
          <el-form-item label="帳號:" prop="account">
            <el-input
              type="text"
              v-model="ruleForm.account"
              placeholder="請輸入帳號"
              @input="handleInput"
              @keyup.enter="submitForm(formRef)"
            />
          </el-form-item>
        </div>
        <div class="col-12 mb-3">
          <el-form-item label="密碼:" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              placeholder="請輸入密碼"
              @keyup.enter="submitForm(formRef)"
            />
          </el-form-item>
        </div>
        <div class="col mb-3" v-if="isclick">
          <el-alert
            title="錯誤"
            description="帳號或密碼錯誤"
            show-icon
            type="error"
          />
        </div>

        <div class="col-12">
          <el-button
            type="primary"
            size="large"
            class="col-12 fs-5"
            @click="submitForm(formRef)"
            >登入</el-button
          >
        </div>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import Loading from "vue-loading-overlay";
import { useRouter } from "vue-router";
import "vue-loading-overlay/dist/css/index.css";
import { type FormInstance, type FormRules } from "element-plus";
import type { RuleForm } from "env";
const router = useRouter();
const isLoading = ref(false);
const formRef = ref<FormInstance>();
const ruleForm = ref<RuleForm>({
  account: "",
  password: "",
});

const rules = ref<FormRules<RuleForm>>({
  account: [{ required: true, message: "請輸入帳號", trigger: "blur" }],
  password: [{ required: true, message: "請輸入密碼", trigger: "blur" }],
});

//自動轉大寫
const handleInput = () => {
  ruleForm.value.account = ruleForm.value.account.toUpperCase();
};

const isclick = ref(false);
const submitForm = async (formEl: FormInstance | undefined) => {
  if (isclick.value) {
    await new Promise<void>((resolve) =>
      setTimeout(() => {
        isclick.value = false;
        resolve(); // 手动触发 Promise 的 resolve
      }, 100)
    );
  }

  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (!valid) {
      return false;
    }
    const url = import.meta.env.VITE_URL;
    const payload: RuleForm = {
      account: ruleForm.value.account,
      password: ruleForm.value.password,
    };
    try {
      isLoading.value = true;
      const res = await axios.post(`${url}/member/login`, payload);
      isLoading.value = false;
      const { token } = res.data;
      const currentDate = new Date();
      const expirationDate = new Date(
        currentDate.getTime() + 8 * 60 * 60 * 1000
      );
      const expires = expirationDate.toString();
      document.cookie = `youbiketest=${token}; expires=${expires};path=/;`;
      router.push("/server/mainpage");
    } catch (error) {
      console.log(error);
      isclick.value = true;
      isLoading.value = false;
    }
  });
};



</script>

<style scoped></style>
