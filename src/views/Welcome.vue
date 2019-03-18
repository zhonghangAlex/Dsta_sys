<template>
  <div class="container">
    <div class="lowin" v-if="showView">
      <div class="lowin-brand">
        <img :src="Img_src" alt="logo">
      </div>
      <div class="lowin-wrapper">
        <div class="lowin-box lowin-login">
          <div class="lowin-box-inner">
            <div>
              <p>登录开始数字签名之旅</p>
              <div class="lowin-group">
                <label>账号 <a href="#" class="login-back-link" ref="change_login" @click="viewChangeStatus(1)">直接登录?</a></label>
                <input name="no" class="lowin-input email_ipt" ref="login_no" v-model="userID">
              </div>
              <div class="lowin-group password-group">
                <label>密码 <a href="#" class="forgot-link" ref="change_forget" @click="viewChangeStatus(3)">忘记密码了吗?</a></label>
                <input type="password" name="password" autocomplete="current-password" class="lowin-input password_ipt" ref="login_psw" v-model="userPassword">
              </div>
              <button class="lowin-btn login-btn" @click="userLoginAndFind">
                登&nbsp;&nbsp;&nbsp;录
              </button>

              <div class="text-foot">
                还没有一个账号吗? <a href="" class="register-link" ref="change_register" @click="viewChangeStatus(2)">注册</a>
              </div>
            </div>
          </div>
        </div>

        <div class="lowin-box lowin-register">
          <div class="lowin-box-inner">
            <div>
              <p>让我们来创建你的账号</p>
              <div class="lowin-group">
                <label>姓名</label>
                <input type="text" name="name" autocomplete="name" class="lowin-input" v-model="userRegName">
              </div>
              <div class="lowin-group">
                <label>账号</label>
                <input name="no" class="lowin-input" v-model="userRegID">
              </div>
              <div class="lowin-group">
                <label>密码</label>
                <input type="password" name="password" autocomplete="current-password" class="lowin-input" v-model="userRegPassword">
              </div>
              <button class="lowin-btn" @click="userRegister">
                点击注册
              </button>

              <div class="text-foot">
                已经拥有一个账号? <a href="" class="login-link" ref="change_login" @click="viewChangeStatus(1)">登录</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer class="lowin-footer">
        Design By @WHUT . Zhonghang Li <a href="http://www.zhonghangalex.com/" target="_blank" title="alex主站">我的主页</a>
      </footer>
    </div>
  </div>
</template>

<script>
  import {Login, Register, FindPassword} from '../api/api'

  export default {
    data() {
      return {
        showView: false,
        Img_src: require("../assets/images/logo.svg"),
        // 登录视图为1，注册视图为2，密码找回视图为3
        viewStatus: 1,
        // 登录及找回密码
        userID: '',
        userPassword: '',
        // 注册
        userRegID: '',
        userRegName: '',
        userRegPassword: '',
        //返回获取
        userPower: '',
        userName:''
      }
    },
    mounted() {
      this.showViewChange()
    },
    methods: {
      showViewChange: function () {
        this.showView = true
        this.$nextTick(()=>{
          var Auth = {
            vars: {
              lowin: document.querySelector('.lowin'),
              lowin_password_ipt: document.querySelector('.password_ipt'),
              lowin_brand: document.querySelector('.lowin-brand'),
              lowin_wrapper: document.querySelector('.lowin-wrapper'),
              lowin_login: document.querySelector('.lowin-login'),
              lowin_wrapper_height: 0,
              login_back_link: document.querySelector('.login-back-link'),
              forgot_link: document.querySelector('.forgot-link'),
              login_link: document.querySelector('.login-link'),
              login_btn: document.querySelector('.login-btn'),
              register_link: document.querySelector('.register-link'),
              password_group: document.querySelector('.password-group'),
              password_group_height: 0,
              lowin_register: document.querySelector('.lowin-register'),
              lowin_footer: document.querySelector('.lowin-footer'),
              box: document.getElementsByClassName('lowin-box'),
              option: {}
            },
            register(e) {
              Auth.vars.lowin_login.className += ' lowin-animated';
              setTimeout(() => {
                Auth.vars.lowin_login.style.display = 'none';
              }, 500);
              Auth.vars.lowin_register.style.display = 'block';
              Auth.vars.lowin_register.className += ' lowin-animated-flip';

              Auth.setHeight(Auth.vars.lowin_register.offsetHeight + Auth.vars.lowin_footer.offsetHeight);

              e.preventDefault();
            },
            login(e) {
              Auth.vars.lowin_register.classList.remove('lowin-animated-flip');
              Auth.vars.lowin_register.className += ' lowin-animated-flipback';
              Auth.vars.lowin_login.style.display = 'block';
              Auth.vars.lowin_login.classList.remove('lowin-animated');
              Auth.vars.lowin_login.className += ' lowin-animatedback';
              setTimeout(() => {
                Auth.vars.lowin_register.style.display = 'none';
              }, 500);

              setTimeout(() => {
                Auth.vars.lowin_register.classList.remove('lowin-animated-flipback');
                Auth.vars.lowin_login.classList.remove('lowin-animatedback');
              },1000);

              Auth.setHeight(Auth.vars.lowin_login.offsetHeight + Auth.vars.lowin_footer.offsetHeight);

              e.preventDefault();
            },
            forgot(e) {
              Auth.vars.password_group.classList += ' lowin-animated';
              Auth.vars.login_back_link.style.display = 'block';
              Auth.vars.lowin_password_ipt.style.display = 'none';

              setTimeout(() => {
                Auth.vars.login_back_link.style.opacity = 1;
                Auth.vars.password_group.style.height = 0;
                Auth.vars.password_group.style.margin = 0;
              }, 100);

              Auth.vars.login_btn.innerText = '修改密码';

              Auth.setHeight(Auth.vars.lowin_wrapper_height - Auth.vars.password_group_height);
              // Auth.vars.lowin_login.querySelector('form').setAttribute('action', Auth.vars.option.forgot_url);

              e.preventDefault();
            },
            loginback(e) {
              Auth.vars.password_group.classList.remove('lowin-animated');
              Auth.vars.password_group.classList += ' lowin-animated-back';
              Auth.vars.password_group.style.display = 'block';
              Auth.vars.lowin_password_ipt.style.display = 'block';

              setTimeout(() => {
                Auth.vars.login_back_link.style.opacity = 0;
                Auth.vars.password_group.style.height = Auth.vars.password_group_height + 'px';
                Auth.vars.password_group.style.marginBottom = 30 + 'px';
              }, 100);

              setTimeout(() => {
                Auth.vars.login_back_link.style.display = 'none';
                Auth.vars.password_group.classList.remove('lowin-animated-back');
              }, 1000);

              Auth.vars.login_btn.innerHTML = '登&nbsp;&nbsp;&nbsp;录';
              // Auth.vars.lowin_login.querySelector('form').setAttribute('action', Auth.vars.option.login_url);

              Auth.setHeight(Auth.vars.lowin_wrapper_height);

              e.preventDefault();
            },
            setHeight(height) {
              Auth.vars.lowin_wrapper.style.minHeight = height + 'px';
            },
            brand() {
              Auth.vars.lowin_brand.classList += ' lowin-animated';
              setTimeout(() => {
                Auth.vars.lowin_brand.classList.remove('lowin-animated');
              }, 1000);
            },
            init(option) {
              Auth.setHeight(Auth.vars.box[0].offsetHeight + Auth.vars.lowin_footer.offsetHeight);

              Auth.vars.password_group.style.height = Auth.vars.password_group.offsetHeight + 'px';
              Auth.vars.password_group_height = Auth.vars.password_group.offsetHeight;
              Auth.vars.lowin_wrapper_height = Auth.vars.lowin_wrapper.offsetHeight;

              Auth.vars.option = option;
              // Auth.vars.lowin_login.querySelector('form').setAttribute('action', option.login_url);

              var len = Auth.vars.box.length - 1;

              for(var i = 0; i <= len; i++) {
                if(i !== 0) {
                  Auth.vars.box[i].className += ' lowin-flip';
                }
              }

              Auth.vars.forgot_link.addEventListener("click", (e) => {
                Auth.forgot(e);
              });

              Auth.vars.register_link.addEventListener("click", (e) => {
                Auth.brand();
                Auth.register(e);
              });

              Auth.vars.login_link.addEventListener("click", (e) => {
                Auth.brand();
                Auth.login(e);
              });

              Auth.vars.login_back_link.addEventListener("click", (e) => {
                Auth.loginback(e);
              });
            }
          }
          Auth.init({
            login_url: '#login',
            forgot_url: '#forgot'
          });
        })
      },
      viewChangeStatus: function(status_code) {
        let _this = this
        if (status_code == '1') {
          _this.viewStatus = 1
        }else if(status_code == '2'){
          _this.viewStatus = 2
        }else if (status_code == '3') {
          _this.viewStatus = 3
        }
      },
      userLoginAndFind: function () {
        let _this = this
        if (_this.viewStatus == '1'){
          _this.userLogin()
        }else {
          _this.userFind()
        }
      },
      userLogin: function () {
        let _this = this
        let params = {
          userid: _this.userID,
          userpassword: _this.userPassword
        }
        Login(params).then((response)=>{
          let res = response.data
          if (res.status == '0' && res.result.power == '2'){
            _this.$message({
              message: res.message,
              type: 'success',
              duration:2000,
              showClose:true
            });
            _this.userName = res.result.name
            _this.$cookies.set("username", _this.userName)
            _this.$store.dispatch("setUserName", res.result.name)
            _this.$router.push("/ordindex")
          }else if(res.status == '0' && res.result.power == '1') {
            _this.$message({
              message: res.message,
              type: 'success',
              duration:2000,
              showClose:true
            });
            _this.$router.push("/superindex")
          }else {
            _this.$message({
              message: res.message,
              type: 'error',
              duration: 2000,
              showClose: true
            });
          }
        }).catch((err)=>{
          console.log(err)
          _this.$message({
            message: '数据请求失败，请检查网络',
            type: 'error',
            duration:2000,
            showClose:true
          });
        })
      },
      userFind: function () {
        return
      },
      userRegister: function () {
        let _this = this
        let params = {
          userid: _this.userRegID,
          name: _this.userRegName,
          userpassword: _this.userRegPassword
        }
        Register(params).then((response)=>{
          let res = response.data
          if (res.status == '0'){
            _this.$message({
              message: res.message,
              type: 'success',
              duration:2000,
              showClose:true
            });
            _this.$router.push("/ordindex")
          }else {
            _this.$message({
              message: res.message,
              type: 'error',
              duration: 2000,
              showClose: true
            });
          }
        }).catch((err)=>{
          console.log(err)
          _this.$message({
            message: '数据请求失败，请检查网络',
            type: 'error',
            duration:2000,
            showClose:true
          });
        })
      }
    }
  }
</script>

<style scoped>
  @import '../assets/css/auth.css';
  .container{
    width: 100%;
    height: 100%;
    position: absolute;
    margin: 0;
    background: url("../assets/images/bg_green.png");
    background-size: cover;
    text-align: center;
  }
</style>
