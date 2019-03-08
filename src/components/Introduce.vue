<template>
    <div class="main_con">
      <div class="pad_con">
        <el-carousel :interval="4000" type="card" height="400px">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'Introduce'
  }
</script>

<style scoped>
  @import "../assets/css/main.css";
</style>
