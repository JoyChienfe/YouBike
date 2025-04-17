<template>
  <div class="container-fluid">
    <div class="px-2 py-1 rounded-2 progress_contaner">
      <div class="progress_text">{{ props.schedule!==90 ? props.schedule : 100 }}%</div>
      <img src="/進度(1.75).png" alt="車車圖片" class="progress_img" :class="classObject">
    </div>
  </div>
</template>



<script setup lang="ts">
import { ref,onMounted } from 'vue'
const props = defineProps<{
  schedule: number
}>()



const classObject = ref({
  margin_left0:props.schedule == 0 ? true : false ,
  margin_left25:props.schedule > 25 ? true : false,
  margin_left50:props.schedule > 55 ? true : false,
  margin_left75:props.schedule > 75 ? true : false,
  margin_left90:props.schedule > 90 ? true : false,
})



const changschedule = () => {
  if(props.schedule === 0){
    return
  }else if(props.schedule === 25){
    setTimeout(() => {
      classObject.value = {
        margin_left0:false,
        margin_left25:true,
        margin_left50:false,
        margin_left75:false,
        margin_left90:false,
      }
    },300)
  }else if(props.schedule === 50){
    setTimeout(() => {
      classObject.value = {
        margin_left0:false,
        margin_left25:false,
        margin_left50:true,
        margin_left75:false,
        margin_left90:false,
      }
    },300)
  }else if(props.schedule === 75){
    setTimeout(() => {
      classObject.value = {
        margin_left0:false,
        margin_left25:false,
        margin_left50:false,
        margin_left75:true,
        margin_left90:false,
      }
    },300)
  }else if(props.schedule === 90){
    setTimeout(() => {
      classObject.value = {
        margin_left0:false,
        margin_left25:true,
        margin_left50:false,
        margin_left75:false,
        margin_left90:true,
      }
    },300)
  }
}

onMounted(() => {
  changschedule()
})

</script>

<style  scoped>
.progress_contaner {
  position: relative;
  overflow: hidden;
  background: linear-gradient(45deg, #add8e6, #ffc0cb); /* 使用淡蓝色和淡粉色 */
  background-color: aliceblue;
  border: 3px solid #ffc0cb; /* 更改边框颜色以匹配渐变 */
}
.progress_text {
  width: 100%;
  text-align: center;
  position: absolute;
  opacity: 0.3;
}
.progress_img {
  width: 13%;
  transition: margin-left 1.5s ease-out; 
}
.margin_left0 {
  margin-left: 0%;
}
.margin_left25 {
  margin-left: 25%;
}
.margin_left50 {
  margin-left: 55%;
}
.margin_left75{
  margin-left: 75%;
}
.margin_left90 {
  margin-left: 90%;
}

</style>
