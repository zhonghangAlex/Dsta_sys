<template>
  <header class="header_container">
    <div class="logo_container">
      <img src="../../assets/images/logo.svg" class="header_logo" alt="LOGO"/>
      <span class="sys_name">{{ sys_name }}</span>
    </div>

    <div class="collapse_container">
      <img src="../../assets/images/collage.svg" class="collapse" alt="collapse" ref="collapse" />
    </div>

    <div class="time_container" v-if="get_progress()">
      <span class="time_text"><span class="time_text_d">{{time_hours}}</span>时<span class="time_text_d">{{time_minutes}}</span>分<span class="time_text_d">{{time_seconds}}</span>秒</span>
      <img src="../../assets/images/time_total_l.svg" class="time_logo" />
    </div>

    <el-progress v-if="get_progress()" :text-inside="true" :stroke-width="18" :percentage="learn_per" status="success" color="#FBC638" class="stu_progress"></el-progress>
    <!--rgba(142, 113, 199, 0.7)-->
    <div class="userop_container">
      <i class="item_container" >
        <img src="../../assets/images/girl_logo.svg" class="user_logo"/>
      </i>
      <span class="username">
        {{ cookieUserName }}
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
              <el-dropdown-item @click.native="logOut" divided>退出登录</el-dropdown-item>
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
              <el-dropdown-item>{{ cookieUserName }}</el-dropdown-item>
              <el-dropdown-item>题库下载</el-dropdown-item>
              <el-dropdown-item>
                <el-badge :value="msg_count" class="item">
                  系统消息
                </el-badge>
              </el-dropdown-item>
              <el-dropdown-item>系统帮助</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logOut" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>

  </header>
</template>

<script>
  import { Logout, StudyTimeGet, StudyTimeSend } from "../../api/api";

  export default {
    data(){
      return {
        // userName_sys: "zhonghangAlex",
        sys_name: "数字签名教学辅助平台",
        //页面配置相关
        page_status: '',
        //系统消息条数
        msg_count: "12",
        // 学习时间相关
        timer: null,
        time_hours: 0,
        time_minutes: 0,
        time_seconds: 0,
        //学习进度相关
        learn_per: 0,
        //cookie
        cookieUserName:''
      }
    },
    created(){
      this.get_progress()
      this.count_time()
    },
    updated(){

    },
    mounted(){
      let _this = this
      clearInterval(this.timer)
      if (this.get_progress()){
        this.StudyTimeGet_fn()
      }
      this.count_time()
      this.getUserName()
      window.onbeforeunload= function(event) {
        clearInterval(_this.timer)
        _this.StudyTimeSend_fn()
      }
    },
    watch:{
      $route: {
        handler: function (newpath, oldpath) {
          console.log(newpath);
          this.get_progress()
          this.getUserName()
          if (newpath.path === '/welcome') {
            this.StudyTimeSend_fn()
            clearInterval(this.timer)
            this.$cookies.remove('username')
            this.$cookies.remove('userid')
          } else {
            clearInterval(this.timer)
            this.StudyTimeGet_fn()
            this.count_time()
          }
        },
        deep: true
      }
    },
    computed:{

    },
    methods:{
      getUserName: function () {
        this.cookieUserName = this.$cookies.get('username')
      },
      count_time:function() {
        let _this = this
        _this.timer = setInterval(() =>{
          _this.time_seconds += 1
          if (_this.time_seconds >= 60) {
            _this.time_minutes += 1
            _this.time_seconds = _this.time_seconds % 60
          }
          if (_this.time_minutes >= 60) {
            _this.time_hours += 1
            _this.time_minutes = _this.time_minutes % 60
          }
        }, 1000)
      },
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
      },
      StudyTimeGet_fn:function () {
        let _this = this
        let userid = _this.$cookies.get('userid')
        let params = {
          userid: userid
        }
        StudyTimeGet(params).then((response)=>{
          let res = response.data
          let seconds_total = res.result.studytime
          let hours_temp = parseInt(seconds_total / 3600)
          let minutes_temp = parseInt((seconds_total - hours_temp * 3600) / 60)
          let seconds_temp = seconds_total - hours_temp * 3600 - minutes_temp * 60
          _this.time_hours = hours_temp
          _this.time_minutes = minutes_temp
          _this.time_seconds = seconds_temp
        })
      },
      StudyTimeSend_fn:function () {
        let _this = this
        let userid = _this.$cookies.get('userid')
        let studytime = _this.time_hours * 3600 + _this.time_minutes * 60 + _this.time_seconds
        let params = {
          userid: userid,
          studytime: studytime
        }
        StudyTimeSend(params).then(()=>{

        })
      },
      logOut:function () {
        this.$confirm('确定退出登录？').then(()=>{
          let params = {}
          Logout(params).then(()=>{
          })
          // this.$cookies.remove('username')
          // this.$cookies.remove('userid')
          this.$router.push("/welcome")
        })
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/header.css";
</style>
