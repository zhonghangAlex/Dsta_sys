<template>
  <header class="header_container">
    <div class="logo_container">
      <img src="../../assets/images/logo.svg" class="header_logo" alt="LOGO"/>
      <span class="sys_name">{{ sys_name }}</span>
    </div>

    <div class="collapse_container">
      <img src="../../assets/images/collage.svg" class="collapse" alt="collapse" ref="collapse" />
    </div>

    <el-progress v-if="get_progress()" :text-inside="true" :stroke-width="18" :percentage="learn_per" status="success" color="#FBC638" class="stu_progress"></el-progress>
    <!--rgba(142, 113, 199, 0.7)-->
    <div class="userop_container">
      <i class="item_container">
        <img src="../../assets/images/girl_logo.svg" class="user_logo"/>
      </i>
      <span class="username">
        {{ userName_sys }}
      </span>
      <ul class="icon_container">
        <li>
          <img src="../../assets/images/download.svg" />
        </li>
        <li>
          <el-badge :value="msg_count" class="item">
            <img class="message_logo" src="../../assets/images/notice.svg" />
          </el-badge>
        </li>
        <li>
          <el-dropdown>
            <img class="el-dropdown-link" src="../../assets/images/user.svg"/>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>系统帮助</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>

    <div class="userop_container_small">
      <ul class="icon_container">
        <li>
          <el-dropdown>
            <img class="el-dropdown-link" src="../../assets/images/setting.svg"/>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>{{ userName_sys }}</el-dropdown-item>
              <el-dropdown-item>题库下载</el-dropdown-item>
              <el-dropdown-item>
                <el-badge :value="msg_count" class="item">
                  系统消息
                </el-badge>
              </el-dropdown-item>
              <el-dropdown-item>系统帮助</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>

  </header>
</template>

<script>
  export default {
    data(){
      return {
        userName_sys: "zhonghangAlex",
        sys_name: "数字签名教学辅助平台",
        //页面配置相关
        page_status: '',
        //系统消息条数
        msg_count: "12",
        //学习进度相关
        learn_per: 0
      }
    },
    created(){
      this.get_progress()
    },
    watch:{
      $route: {
        handler: function (newpath, oldpath) {
          this.get_progress()
        },
        deep: true
      }
    },
    methods:{
      get_progress:function () {
        let _this = this
        if(this.$route.path == '/introduce'){
          _this.learn_per = 0
          return true
        }else if(this.$route.path == '/hashlearn'){
          _this.learn_per = 20
          return true
        }else if(this.$route.path == '/acalearn'){
          _this.learn_per = 40
          return true
        }else if(this.$route.path == '/dstalearn'){
          _this.learn_per = 60
          return true
        }else if(this.$route.path == '/queslearn'){
          _this.learn_per = 80
          return true
        }else {
          return false
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/header.css";
  .stu_progress{
    width: 30%;
    position: absolute;
    right: 420px;
    top: 15px;
  }
</style>
