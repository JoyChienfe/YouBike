<template>
  <n-form
    ref="formRef"
    :model="modelRef"
    :disabled="props.modeldisabled"
    :size="size"
  >
    <n-form-item path="id" label="編號">
      <n-input-number v-model:value="modelRef.id" :disabled="true" />
    </n-form-item>
    <n-form-item path="user_name" label="姓名">
      <n-input v-model:value="modelRef.user_name" :disabled="true" />
    </n-form-item>
    <n-form-item path="user_id" label="公號">
      <n-input v-model:value="modelRef.user_id" :disabled="true" />
    </n-form-item>
    <n-form-item path="test_date" label="測驗日期">
      <n-input v-model:value="modelRef.test_date" :disabled="true" />
    </n-form-item>
    <n-form-item path="sys" label="車種">
      <n-input v-model:value="modelRef.sys" :disabled="true" />
    </n-form-item>
    <n-form-item path="city" label="城市">
      <n-input v-model:value="modelRef.city" :disabled="true" />
    </n-form-item>
    <n-form-item path="station" label="場站名稱">
      <n-input v-model:value="modelRef.station" />
    </n-form-item>
    <n-form-item path="carnum" label="車號">
      <n-input v-model:value="modelRef.carnum" />
    </n-form-item>
    <n-form-item path="carnum2" label="車柱柱號">
      <n-input v-model:value="modelRef.carnum2" />
    </n-form-item>
    <n-form-item path="testtable.date" label="一級檢修日期">
      <n-input v-model:value="modelRef.testtable.date" />
    </n-form-item>
    <n-form-item path="testtable.testman" label="一級檢修人員">
      <n-input v-model:value="modelRef.testtable.testman" />
    </n-form-item>
    <n-form-item label="一級檢修貼紙" path="modelRef.testtable['一級檢修貼紙']">
      <n-checkbox-group
        v-model:value="modelRef.testtable['一級檢修貼紙']['ischeck']"
      >
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['一級檢修貼紙'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item
      label="車柱 周遭環境"
      path="modelRef.testtable['車柱 周遭環境']"
    >
      <n-checkbox-group
        v-model:value="modelRef.testtable['車柱 周遭環境']['ischeck']"
      >
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['車柱 周遭環境'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item
      label="車柱 外觀檢查"
      path="modelRef.testtable['車柱 外觀檢查']"
    >
      <n-checkbox-group
        v-model:value="modelRef.testtable['車柱 外觀檢查']['ischeck']"
      >
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['車柱 外觀檢查'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item
      label="車柱 功能檢查"
      path="modelRef.testtable['車柱 功能檢查']"
    >
      <n-checkbox-group
        v-model:value="modelRef.testtable['車柱 功能檢查']['ischeck']"
      >
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['車柱 功能檢查'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item label="還車導引槽" path="modelRef.testtable['還車導引槽']">
      <n-checkbox-group
        v-model:value="modelRef.testtable['還車導引槽']['ischeck']"
      >
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['還車導引槽'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item label="車機機殼" path="modelRef.testtable['車機機殼']">
      <n-checkbox-group
        v-model:value="modelRef.testtable['車機機殼']['ischeck']"
      >
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['車機機殼'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item label="車機功能" path="modelRef.testtable['車機功能']">
      <n-checkbox-group
        v-model:value="modelRef.testtable['車機功能']['ischeck']"
      >
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['車機功能'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item
      label="防轉彈簧／停車架"
      path="modelRef.testtable['防轉彈簧／停車架']"
    >
      <n-checkbox-group
        v-model:value="modelRef.testtable['防轉彈簧／停車架']['ischeck']"
      >
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['防轉彈簧／停車架'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item label="置物籃貼紙" path="modelRef.testtable['置物籃貼紙']">
      <n-checkbox-group
        v-model:value="modelRef.testtable['置物籃貼紙']['ischeck']"
      >
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['置物籃貼紙'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item label="置物籃" path="modelRef.testtable['置物籃']">
      <n-checkbox-group v-model:value="modelRef.testtable['置物籃']['ischeck']">
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['置物籃'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item label="外管完整" path="modelRef.testtable['外管完整']">
      <n-checkbox-group
        v-model:value="modelRef.testtable['外管完整']['ischeck']"
      >
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['外管完整'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item label="把手貼紙" path="modelRef.testtable['把手貼紙']">
      <n-checkbox-group
        v-model:value="modelRef.testtable['把手貼紙']['ischeck']"
      >
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['把手貼紙'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item label="把手套" path="modelRef.testtable['把手套']">
      <n-checkbox-group v-model:value="modelRef.testtable['把手套']['ischeck']">
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['把手套'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item label="車鈴" path="modelRef.testtable['車鈴']">
      <n-checkbox-group v-model:value="modelRef.testtable['車鈴']['ischeck']">
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['車鈴'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item label="車體外觀" path="modelRef.testtable['車體外觀']">
      <n-checkbox-group
        v-model:value="modelRef.testtable['車體外觀']['ischeck']"
      >
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['車體外觀'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item label="後泥除貼紙" path="modelRef.testtable['後泥除貼紙']">
      <n-checkbox-group
        v-model:value="modelRef.testtable['後泥除貼紙']['ischeck']"
      >
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['後泥除貼紙'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item label="座管束子貼紙" path="modelRef.testtable['座管束子貼紙']">
      <n-checkbox-group
        v-model:value="modelRef.testtable['座管束子貼紙']['ischeck']"
      >
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['座管束子貼紙'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item label="座墊" path="modelRef.testtable['座墊']">
      <n-checkbox-group v-model:value="modelRef.testtable['座墊']['ischeck']">
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['座墊'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item label="座墊桿" path="modelRef.testtable['座墊桿']">
      <n-checkbox-group v-model:value="modelRef.testtable['座墊桿']['ischeck']">
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['座墊桿'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item label="輪胎" path="modelRef.testtable['輪胎']">
      <n-checkbox-group v-model:value="modelRef.testtable['輪胎']['ischeck']">
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['輪胎'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item label="前後輪軸螺絲" path="modelRef.testtable['前後輪軸螺絲']">
      <n-checkbox-group
        v-model:value="modelRef.testtable['前後輪軸螺絲']['ischeck']"
      >
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['前後輪軸螺絲'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item label="前／後燈" path="modelRef.testtable['前／後燈']">
      <n-checkbox-group
        v-model:value="modelRef.testtable['前／後燈']['ischeck']"
      >
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['前／後燈'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item label="煞車功能" path="modelRef.testtable['煞車功能']">
      <n-checkbox-group
        v-model:value="modelRef.testtable['煞車功能']['ischeck']"
      >
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['煞車功能'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item label="變速功能" path="modelRef.testtable['變速功能']">
      <n-checkbox-group
        v-model:value="modelRef.testtable['變速功能']['ischeck']"
      >
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['變速功能'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item label="隨車鎖" path="modelRef.testtable['隨車鎖']">
      <n-checkbox-group v-model:value="modelRef.testtable['隨車鎖']['ischeck']">
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['隨車鎖'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
    <n-form-item label="騎乘行進" path="modelRef.testtable['騎乘行進']">
      <n-checkbox-group
        v-model:value="modelRef.testtable['騎乘行進']['ischeck']"
      >
        <n-space>
          <n-checkbox
            :value="i"
            v-for="i in modelRef.testtable['騎乘行進'].value"
            :key="i"
          >
            {{ i }}
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>

    <n-form-item path="掃瑪借車" label="掃瑪借車">
      <n-input v-model:value="modelRef.testtable.iscodepass" />
    </n-form-item>
    <n-form-item path="前胎壓" label="前胎壓">
      <n-input v-model:value="modelRef.testtable.startrow" />
    </n-form-item>
    <n-form-item path="後胎壓" label="後胎壓">
      <n-input v-model:value="modelRef.testtable.endrow" />
    </n-form-item>
    <n-form-item :span="12" label="備註" path="備註">
      <n-input
        v-model:value="modelRef.testtable.text"
        placeholder="備註"
        type="textarea"
        :autosize="{
          minRows: 3,
          maxRows: 5,
        }"
      />
    </n-form-item>
  </n-form>
</template>

<script setup>
import { ref } from "vue";
import {
  NFormItem,
  NForm,
  NInput,
  NCheckbox,
  NSpace,
  NCheckboxGroup,
  NInputNumber,
} from "naive-ui";

const props = defineProps({
  formData: {
    type: Object,
  },
  modeldisabled: {
    type: Boolean,
  },
});

const size = ref("large");
const formRef = ref(null);
const modelRef = ref(null);

function creatFrom() {
  modelRef.value = { ...props.formData };
  const station_name = modelRef.value["station_name"];
  modelRef.value["city"] = station_name.split("-")[0];
  modelRef.value["station"] = station_name.split("-")[1];

  for (const key in modelRef.value.testtable) {
    const obj = { ...modelRef.value.testtable[key] };
    if (
      !Object.prototype.hasOwnProperty.call(obj, "ischeck") &&
      typeof modelRef.value.testtable[key] === "object" &&
      modelRef.value.testtable[key] !== null
    ) {
      modelRef.value.testtable[key]["ischeck"] = [];
    }
  }
  // console.log(modelRef.value);
}
defineExpose({
  modelRef,
});
(() => {
  creatFrom();
})();
</script>

<style lang="scss" scoped></style>
