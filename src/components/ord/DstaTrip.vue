<template>
  <div class="main_con">
    <div class="pad_con">
      <!--界面导语及公钥私钥录入-->
      <transition name="trip_wel">
        <div v-if="show_welcome" class="wel_con">
          <div class="wel_title">
            <span class="wel_title_text">欢迎开启数字签名之旅</span>
          </div>
          <div class="wel_logo_con">
            <img src="../../assets/images/sign_trip.svg"  alt="数字签名之旅"/>
          </div>
          <div class="wel_op_con">
            <p class="send_note">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;小航和小昂由于工作原因，经常需要使用电子邮件传递重要信息。在这个信息传递过程当中，为了保障信息的安全性及完整性，他俩使用了数字签名技术，在他们手中每人有一把钥匙，一把私钥，一把公钥，两者都可以进行加密解密，快来体验一下他们的信息传递过程吧！</p><br>
            <p style="justify-content: space-around;display: flex;">
              <el-input style="width: 48%;" :onkeyup="str_jus(private_trip_key, 1)" placeholder="请输入小航使用的私钥" v-model="private_trip_key" clearable></el-input>
              <el-input style="width: 48%;" :onkeyup="str_jus(public_trip_key, 2)" placeholder="请输入小昂使用的公钥" v-model="public_trip_key" clearable></el-input>
            </p><br>
            <p style="margin-top: 10px;">
              <el-button type="warning" @click.native="step_in_trip" style="width: 50%; display:block; margin: 0 auto;">开始数字签名之旅</el-button>
            </p>
          </div>
        </div>
      </transition>

      <!--数字签名之旅界面-->
      <transition name="trip_detail">
        <div v-if="!show_welcome" class="trip_con">
          <!--返回公钥私钥录入界面-->
            <span @click="trip_back" class="trip_back"><span class="font_change"><<<</span>&nbsp;&nbsp;&nbsp;返回重填钥匙</span>

            <el-col class="col_con_long" :span="24">
              <el-card class="box-card hash_card">
                <div slot="header" class="clearfix">
                  <span class="hash_title">数字签名之旅</span>
                  <el-button style="float: right; margin-left: 10px;" type="primary" size="small">完成阅读</el-button>

                  <el-popover placement="top" width="260" v-model="aca_extra3">
                    <p>

                    </p>
                    <div style="text-align: right; margin: 0">
                      <el-button type="text" size="mini" @click="aca_extra3 = false">了解完毕</el-button>
                    </div>
                    <el-button slot="reference" style="float: right;" type="primary" size="small" plain>知识拓展</el-button>
                  </el-popover>
                </div>
                <div class="hash_text">
                  尚未做完，暂不展示，稳定版本V7.2


                </div>
              </el-card>
            </el-col>
          </div>

          <!--数字签名流程详情-->
      </transition>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 界面跳转控制
        show_welcome: true,
        // 录入小航的私钥
        private_trip_key: '',
        // 录入小昂的公钥
        public_trip_key: ''
      }
    },
    components: {

    },
    mounted() {

    },
    methods: {
      // 判定公钥私钥的输入格式
      str_jus: function (str, index) {
        if (str !== str.replace(/[^\w_]/g,'')) {
          this.$notify({
            title: '操作失败',
            message: '请填入大小写字母或者数字',
            type: 'error'
          });
          if (index === 1) {
            this.private_trip_key = ''
          } else {
            this.public_trip_key = ''
          }
        }
      },

      // 正式进入到数字签名之旅的界面
      step_in_trip:function () {
        let _this = this
        // 检查输入
        if (_this.private_trip_key === '' || _this.public_trip_key === '') {
          this.$notify({
            title: '操作失败',
            message: '请输入小航和小昂传递信息所用的公钥和私钥',
            type: 'error'
          });
          return
        }
        // 进行页面显示的切换
        _this.show_welcome = false
      },

      // 返回公钥私钥填写界面
      trip_back: function () {
        let _this = this
        _this.show_welcome = true
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/main.css";
</style>
