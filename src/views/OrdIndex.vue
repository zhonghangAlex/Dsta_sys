<template>
  <div class="total_container">
    <s-header></s-header>

    <div class="middle_container">
      <nav-btn></nav-btn>
      <transition name="fade" class="main_container">
        <keep-alive>
          <router-view class="move-view"></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
  import SHeader from '@/components/Header'
  import NavBtn from '@/components/NavBtn'

  export default {
    data(){
      return {

      }
    },
    components:{
      SHeader,
      NavBtn
    }
  }
</script>

<style scoped>
  /*栈栏式布局相关内容*/
  .total_container{
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .middle_container{
    width: 100%;
    height: calc(100% - 55px);
    position: absolute;
    background-color: #f5f5f5;
  }
  .main_container{
    height: 100%;
    position: absolute;
    overflow: hidden;
    z-index: 100;
  }

  /*试图切换动画*/
  .fade-enter-active {
    transition: all .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
    transform:  translateX( -200px );
  }
</style>
