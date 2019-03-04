<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import "../static/css/reset.css";
  body {
    margin: 0;
    padding: 0;
    /*background-color: #fbfbfb;*/
    width: 100%;
    height: 100%;
  }
</style>
