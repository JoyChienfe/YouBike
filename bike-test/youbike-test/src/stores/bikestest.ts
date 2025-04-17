import { ref } from "vue";
import { defineStore } from "pinia";
import type { Step, Testfrom1, Testfrom2, Testfrom3 } from "env";

export const useBiketest = defineStore("biketest", () => {
  //系統
  const systum = ref("");
  //步驟
  const step = ref<Step>({
    step1: true,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
    step7: false,
    step8: false,
    step9: false,
    step10: false,
  });

  const testfrom1 = ref<Testfrom1>({});
  const testfrom2 = ref<Testfrom2>({});
  const testfrom3 = ref<Testfrom3>({});

  //清空表單內容
  const clearfrom = () => {
    testfrom1.value = {};
    testfrom2.value = {};
    testfrom3.value = {};
  };

  //重製頁面權限
  const clearstep = () => {
    step.value = {
      step1: true,
      step2: false,
      step3: false,
      step4: false,
      step5: false,
      step6: false,
      step7: false,
      step8: false,
      step9: false,
      step10: false,
    };
  };

  return {
    testfrom1,
    testfrom2,
    testfrom3,
    systum,
    step,
    clearfrom,
    clearstep,
  };
});
