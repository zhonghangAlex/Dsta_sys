<template>
  <div class="total_container">
    <s-header ref="header_com"></s-header>

    <div class="middle_container">
      <nav-btn ref="nav_com"></nav-btn>
      <transition name="fade" class="main_container">
        <keep-alive>
          <router-view class="move-view"></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
  import SHeader from '@/components/base/Header'
  import NavBtn from '@/components/base/NavBtn'

  export default {
    data(){
      return {
        nav_status: true
      }
    },
    components:{
      SHeader,
      NavBtn
    },
    mounted(){
      this.collapse_ctl()
    },
    methods: {
      collapse_ctl:function () {
        let _this = this
        _this.$refs.header_com.$refs.collapse.addEventListener("click", ()=>{
          if(_this.nav_status){
            _this.$refs.nav_com.$refs.nav.style.display = 'none'
            _this.nav_status = false
          }else {
            _this.$refs.nav_com.$refs.nav.style.display = 'flex'
            _this.nav_status = true
          }
        })
      }
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

  /*.move-view{*/
    /*margin-top: 10px;*/
    /*margin-left: 10px;*/
    /*border-radius: 15px;*/
    /*height: calc(100% - 20px);*/
    /*width: calc(100% - 20px);*/
    /*position: relative;*/
    /*z-index: 100;*/
    /*background-color: #44a0b3;*/
    /*!*box-shadow: 2px 2px 0 0 #44444430;*!*/
  /*}*/

  .move-view{
    height: 100%;
    width: 100%;
    /*position: relative;*/
    z-index: 100;
    background-color: #44a0b3;
    /*box-shadow: 2px 2px 0 0 #44444430;*/
  }

  /*试图切换动画*/
  .fade-enter-active {
    transition: all .8s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
    transform:  translateX( -200px );
    /*transform: rotate(-15deg);*/
  }
</style>
