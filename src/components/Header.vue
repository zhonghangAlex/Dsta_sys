<template>
  <header class="header_container">
    <div class="logo_container">
      <img src="../assets/images/logo.svg" class="header_logo" alt="LOGO"/>
      <span class="sys_name">数字签名教学辅助平台</span>
    </div>

    <div class="collapse_container">
      <img src="../assets/images/collage.svg" class="collapse" alt="collapse" />
    </div>

    <div class="userop_container">
      <i class="item_container">
        <img src="../assets/images/girl_logo.svg" class="user_logo"/>
      </i>
      <span class="username">
        {{ userName_sys }}
      </span>
    </div>

  </header>
</template>

<script>
  export default {
    data(){
      return {
        userName_sys: "zhonghangAlex"
      }
    }
  }
</script>

<style scoped>
  @import "../assets/css/header.css";
</style>
