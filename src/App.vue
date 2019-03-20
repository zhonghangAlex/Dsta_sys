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
  body {
    margin: 0;
    padding: 0;
    /*background-color: #fbfbfb;*/
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family:"微软雅黑";
  }
</style>
