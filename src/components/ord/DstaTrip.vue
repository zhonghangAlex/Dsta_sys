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
              <el-tag type="warning" style="width: 48%; text-align: center;line-height: 40px;height: 40px;font-size: 14px; cursor: pointer;" @click.native="hang_open = true" clearable>小航的私钥</el-tag>
              <el-tag type="warning" style="width: 48%; text-align: center;line-height: 40px;height: 40px;font-size: 14px; cursor: pointer;" @click.native="ang_open = true" clearable>小昂的公钥</el-tag>
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
            <span @click="trip_back" class="trip_back"><span class="font_change"><<<</span>&nbsp;&nbsp;&nbsp;返回查看密钥</span>

            <el-col class="col_con_long" :span="24">
              <el-card class="box-card hash_card">
                <div slot="header" class="clearfix">
                  <span class="hash_title">数字签名之旅</span>
                  <el-button style="float: right; margin-left: 10px;" type="primary" size="small">完成阅读</el-button>

                  <el-popover placement="top" width="360" v-model="trip_extra">
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MD5消息摘要算法（英语：MD5 Message-Digest Algorithm），一种被广泛使用的密码散列函数，可以产生出一个128位（16字节）的散列值（hash value），用于确保信息传输完整一致。MD5由美国密码学家罗纳德·李维斯特（Ronald Linn Rivest）设计，于1992年公开，用以取代MD4算法。</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;具体来说文件的MD5值就像是这个文件的“数字指纹”。每个文件的MD5值是不同的，如果任何人对文件做了任何改动，其MD5值也就是对应的“数字指纹”就会发生变化。比如下载服务器针对一个文件预先提供一个MD5值，用户下载完该文件后，用我这个算法重新计算下载文件的MD5值，通过比较这两个值是否相同，就能判断下载的文件是否出错，或者说下载的文件是否被篡改了。</p>
                    <div style="text-align: right; margin: 0">
                      <el-button type="text" size="mini" @click="trip_extra = false">了解完毕</el-button>
                    </div>
                    <el-button slot="reference" style="float: right;" type="primary" size="small" plain>知识拓展</el-button>
                  </el-popover>
                </div>
                <div class="trip_text">
                  <ul class="trip_line">
                    <li>
                      <div class="trip_hang">
                        <div class="trip_hat">
                          <span class="boy_text">小</span>
                          <img class="trip_boy_logo" src="../../assets/images/boy1.svg" alt="小航头像" />
                          <span class="boy_text">航</span>
                        </div>
                        <div class="trip_main_con">
                          <P><el-button type="primary" >小航的信件内容</el-button><el-input style="width: 60%; margin-left: 15px;" placeholder="请输入小航的信件信息" v-model="hang_msg_content" clearable></el-input></P>
                          <P><el-button type="primary" >明文md5摘要后</el-button><el-input disabled="" style="width: 60%; margin-left: 15px;" placeholder="此处为信息摘要后的记录" v-model="hang_md5_content" clearable></el-input></P>
                          <P><el-button type="primary" >md5的RSA加密</el-button><el-input disabled="" style="width: 60%; margin-left: 15px;" placeholder="此处为MD5的RSA加密" v-model="hang_rsa_content" clearable></el-input></P>
                          <P>
                            <el-button type="primary" >是否加入黑客模块</el-button>
                            <!--<el-switch-->
                              <!--style="margin-left: 15px;"-->
                              <!--v-model="if_hack"-->
                              <!--active-color="#44a0b3"-->
                              <!--inactive-color="#f56c6c"-->
                              <!--active-text="开启黑客模块"-->
                              <!--inactive-text="关闭黑客模块">-->
                            <!--</el-switch>-->
                            <el-radio @change="change_hack" style="margin:0 10px;" v-model="if_hack" label="true" border>开启黑客</el-radio>
                            <el-radio @change="change_hack" v-model="if_hack" label="false" border>关闭黑客</el-radio>
                          </P>
                          <P><el-button type="warning" @click.native="start_trip" style="width: 60%; display:block; margin: 0 auto;">发送小航的信件</el-button></P>
                        </div>
                      </div>
                    </li>
                    <li>
                      <transition name="trip_hack">
                        <div v-if="if_hack_show" class="trip_hack">
                          <div class="hack_hat">
                            <span class="hack_text">黑</span>
                            <img class="trip_hack_logo" src="../../assets/images/hack_logo.svg" alt="小航头像" />
                            <span class="hack_text">客</span>
                          </div>
                          <div class="hack_main_con">
                            <!--<p><el-tag size="small" style="width: 70%;text-align: center;">拦截到的信息内容</el-tag></p>-->
                            <div style="border: 2px dashed #44a0b3; -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;">
                              <p style="margin: 15px 0;"><el-button type="primary" size="small" >信件内容</el-button><el-input size="small" style="width: 65%; margin-left: 10px;" placeholder="信件内容" v-model="hack_msg_content" clearable></el-input></p>
                              <p style="margin: 15px 0;"><el-button type="primary" size="small" >加密密文</el-button><el-input size="small" style="width: 65%; margin-left: 10px;" placeholder="加密密文" v-model="hack_rsa_content" clearable></el-input></p>
                            </div>
                            <p><el-button size="small" type="danger" @click.native="hack_change_msg" style="width: 60%; display:block; margin: 0 auto;">完成信息篡改</el-button></p>
                          </div>
                        </div>
                      </transition>

                      <div class="trip_env">
                        <img class="send_env_logo" src="../../assets/images/env_logo.svg" alt="信件传递"/>
                        <ul class="send_list">
                          <li v-for="item in 12"><img class="right_point" src="../../assets/images/right_point.png" alt="指向箭头"/></li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div class="trip_ang">
                        <div class="trip_hat">
                          <span class="boy_text">小</span>
                          <img class="trip_boy_logo" src="../../assets/images/boy2.svg" alt="小航头像" />
                          <span class="boy_text">昂  </span>
                        </div>
                        <div class="trip_main_con">
                          <div style="border: 2px dashed #44a0b3; -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;">
                            <P style="margin: 15px 0;"><el-button type="primary" >小昂收到的信件</el-button><el-input disabled style="width: 60%; margin-left: 15px;" placeholder="此处为小昂收到的信件内容" v-model="ang_msg_content" clearable></el-input></P>
                            <P style="margin: 15px 0;"><el-button type="primary" >小昂收到的密文</el-button><el-input disabled style="width: 60%; margin-left: 15px;" placeholder="此处为小昂收到的密文" v-model="ang_rsa_content" clearable></el-input></P>
                          </div>
                          <P><el-button type="primary" >信件md5摘要后</el-button><el-input disabled style="width: 60%; margin-left: 15px;" placeholder="此处为信件内容的md5摘要" v-model="ang_md5_content" clearable></el-input></P>
                          <P><el-button type="primary" >密文解密后内容</el-button><el-input disabled style="width: 60%; margin-left: 15px;" placeholder="此处为密文解密后的md5信息" v-model="ang_real_md5" clearable></el-input></P>
                          <P><el-button type="warning" @click.native="jus_env" style="width: 60%; display:block; margin: 0 auto;">点击校验信件</el-button></P>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </el-card>
            </el-col>
          </div>

          <!--数字签名流程详情-->
      </transition>

    </div>

    <el-dialog
      title="系统生成小航的私钥"
      :visible.sync="hang_open"
      width="30%"
      :append-to-body='true'>
      <p><el-tag class="dia_text">-----BEGIN PUBLIC KEY-----</el-tag></p><br>
      <p><el-tag class="dia_text">MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDiHGBZyQuDqk8SJq0+t+jMQ9t8</el-tag></p><br>
      <p><el-tag class="dia_text">caBu3RZgm7SyIjYX8AZh60OVQkOsInmb/N2SGApSaiZHnqR5KbFD0IyJzI8cS3Kx</el-tag></p><br>
      <p><el-tag class="dia_text">PsJKFzCe3BOmWMkd1lF/g5WVQU0gsuNbH1V7Rtb57t1Mka/ceZS08jEnWExxiyvQ</el-tag></p><br>
      <p><el-tag class="dia_text">qVC9w6+YT9svhTgByQIDAQAB</el-tag></p><br>
      <p><el-tag class="dia_text">-----END PUBLIC KEY-----</el-tag></p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="hang_open = false">完 成</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="系统生成小昂的公钥"
      :visible.sync="ang_open"
      width="30%"
      :append-to-body='true'>
      <p><el-tag class="dia_text">-----BEGIN RSA PRIVATE KEY-----</el-tag></p><br>
      <p><el-tag class="dia_text">MIICXwIBAAKBgQDiHGBZyQuDqk8SJq0</el-tag></p><br>
      <p><el-tag class="dia_text">+t+jMQ9t8caBu3RZgm7SyIjYX8AZh60OV</el-tag></p><br>
      <p><el-tag class="dia_text">QkOsInmb/N2SGApSaiZHnqR5KbFD0IyJzI8cS3KxPsJKFzCe3BOmWMkd1lF/g5WV</el-tag></p><br>
      <p><el-tag class="dia_text">QU0gsuNbH1V7Rtb57t1Mka/ceZS08jEnWExxiyvQqVC9w6</el-tag></p><br>
      <p><el-tag class="dia_text">+YT9svhTgByQIDAQAB</el-tag></p><br>
      <p><el-tag class="dia_text">AoGBAJmChm+urOCRKem61Hf2SFkV4NfWFQPvmhew3rbpvyv1S4ADR/j36hXdug6L</el-tag></p><br>
      <p><el-tag class="dia_text">WKqtI6TcaGzLagLQqYbO+fs8JBPc74Ppj8iskSZ43Kj5wCdTnXpG4r0zMAj3rO3j</el-tag></p><br>
      <p><el-tag class="dia_text">k4dtibayNvVbvhndV82dZGZmJWF5rm3Itb9+2dv4fat0</el-tag></p><br>
      <p><el-tag class="dia_text">+WoBAkEA9QTSWikHDe+4</el-tag></p><br>
      <p><el-tag class="dia_text">5Gb8HUKo1zmNBoTW8eKluVw5irw5qZn2TDigFgUtyj57DAD/i9tRomlvOeVy65CB</el-tag></p><br>
      <p><el-tag class="dia_text">hsf46yfr4QJBAOw+ngs64PJvkL7Mrcku+StMqYT87XScjBN3Mj1sdvGdJMyle1IG</el-tag></p><br>
      <p><el-tag class="dia_text">gBWFu9e/HDggk56D/ec2IMg18vM6VoTckukCQQCWOcyXRwxyOQbN027EqfhHbZvP</el-tag></p><br>
      <p><el-tag class="dia_text">4WbAi8w8aBVHwLxCBooClb1hgu9eTwy2gW4tW90jjS2K++mIEOO5taYi2ClBAkEA</el-tag></p><br>
      <p><el-tag class="dia_text">ylERzjI9RMHwpsXoqpt0vfUoVAC7ZptOhrkUqG/EKUTXp/6r7uIsPMJLzQcYpqSX</el-tag></p><br>
      <p><el-tag class="dia_text">ZzBIeALt7iftiQlT4PJ5SQJBALEbblY2AEb9+NdisE5zBw4BsSOBuKmYeviHkn1Y</el-tag></p><br>
      <p><el-tag class="dia_text">ZxcBbLfSCcEo2aD9xcHFgfub7J0aQIoDd7MC8zy2oxo0GkE=</el-tag></p><br>
      <p><el-tag class="dia_text">-----END RSA PRIVATE KEY-----</el-tag></p>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ang_open = false">完 成</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import hex_md5 from 'js-md5'
  import JsEncrypt from 'jsencrypt'
  export default {
    data() {
      return {
        // 知识拓展内容
        trip_extra: false,
        // 打开私钥和公钥界面
        hang_open: false,
        ang_open: false,

        // 界面跳转控制
        show_welcome: true,
        // 录入小航的私钥
        private_trip_key: '',
        // 录入小昂的公钥
        public_trip_key: '',

        // 输入小航要传递的信息
        hang_msg_content: '',
        // 信息进行MD5杂化
        hang_md5_content: '',
        //  MD5杂化后进行RSA加密
        hang_rsa_content: '',

        // 是否开启黑客模块
        if_hack: 'true',
        if_hack_show: true,
        // 黑客截取到并修改的信件内容
        hack_msg_content: '',
        // 黑客截取到并修改的信件内容
        hack_rsa_content: '',

        // 小昂收到的信件内容
        ang_msg_content:'',
        // 小昂收到的密文
        ang_rsa_content:'',
        // 新收到信件重新md5摘要内容
        ang_md5_content:'',
        // 使用公钥对收到密文进行解密后
        ang_real_md5:'',

        // 操作步骤记录
        op_index: 1
      }
    },
    components: {

    },
    mounted() {

    },
    methods: {
      // 改变黑客状态
      change_hack:function() {
        let _this = this
        if (_this.if_hack === 'true') {
          _this.if_hack_show = true
        } else {
          _this.if_hack_show = false
        }
        _this.hang_msg_content = ''
        _this.hang_md5_content = ''
        _this.hang_rsa_content = ''
        _this.ang_msg_content = ''
        _this.ang_md5_content = ''
        _this.ang_rsa_content = ''
        _this.ang_real_md5 = ''
        _this.hack_rsa_content = ''
        _this.hack_msg_content = ''
      },

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
        // if (_this.private_trip_key === '' || _this.public_trip_key === '') {
        //   this.$notify({
        //     title: '操作失败',
        //     message: '请输入小航和小昂传递信息所用的公钥和私钥',
        //     type: 'error'
        //   });
        //   return
        // }
        // 进行页面显示的切换
        _this.show_welcome = false
      },

      // 返回公钥私钥填写界面
      trip_back: function () {
        let _this = this
        _this.show_welcome = true
      },

      // 开始发送小航的信件（开始数字签名流程）
      start_trip: function () {
        let _this = this
        if (_this.hang_msg_content === '') {
          this.$notify({
            title: '错误提示',
            message: '请填写小航要发送的信息内容！',
            type: 'error'
          });
          return
        }
        // md5杂化
        _this.hang_md5_content = hex_md5(_this.hang_msg_content)

        // RSA加密相关
        let encryptor = new JsEncrypt()
        let temp_private =
          '-----BEGIN PUBLIC KEY-----\n' +
          'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCqVgmqwHmVOgPmyF7Ingy9PcKm\n' +
          'r3K8Hr7RgDBkpVawWAWOIPGnCpfptQ17S2Axdh2B0GEOJCGO5CuveUjQ2nql0c2y\n' +
          '8OgFypAk3E8pdLwNmZNcI5+SQIUru5HAK8hfhTHqUGf34tQXOJKbzEBAhbRYh/Kl\n' +
          'sNS4Rkytik4qdJzSGQIDAQAB\n' +
          '-----END PUBLIC KEY-----'

        encryptor.setPublicKey(temp_private)
        _this.hang_rsa_content = encryptor.encrypt(_this.hang_md5_content);
        console.log(_this.hang_rsa_content);

        if (_this.if_hack === 'true') {
          // 黑客拦截相关
          _this.hack_msg_content = _this.hang_msg_content
          _this.hack_rsa_content = _this.hang_rsa_content
        } else {
          // 小昂赋值相关
          _this.ang_msg_content = _this.hang_msg_content
          _this.ang_rsa_content = _this.hang_rsa_content

          // md5转化
          _this.ang_md5_content = hex_md5(_this.ang_msg_content)

          // RSA解密相关
          _this.rsa_jie_fn()
        }


        if (_this.if_hack === 'true') {
          _this.op_index = 2
        } else {
          _this.op_index = 3
        }

      },

      // RSA解密
      rsa_jie_fn:function() {
        let _this = this
        let decryptor = new JSEncrypt()
        let temp_pubilc =
          '-----BEGIN RSA PRIVATE KEY-----\n' +
          'MIICXQIBAAKBgQCqVgmqwHmVOgPmyF7Ingy9PcKmr3K8Hr7RgDBkpVawWAWOIPGn\n' +
          'CpfptQ17S2Axdh2B0GEOJCGO5CuveUjQ2nql0c2y8OgFypAk3E8pdLwNmZNcI5+S\n' +
          'QIUru5HAK8hfhTHqUGf34tQXOJKbzEBAhbRYh/KlsNS4Rkytik4qdJzSGQIDAQAB\n' +
          'AoGBAJTMKBGzpgJH9dSKwNH7zyEZbIrzxQS0zvhwRNYG4R2XJvMrsC29wUr1UFue\n' +
          'Ut+iUNBv2fjiczZB+C+HgaaA1JXNESgx4hsnlrDPexIl5cg/sDY9/TASRACiE9O7\n' +
          'bSLF+ymAS0xgMIdAgZqXLHHwfNSkJ8NXzJeyXr0H5aYATqTJAkEA1+L7ldEWPPim\n' +
          'X8ImrEH8oFBEzl6mc2ACYokpaZNKjGdStARW0Q/bTv6aGeeFCh5tnZfIRh7GMN2/\n' +
          'qmqGURciawJBAMn8XVHU/h97wBotAcbypbFrRf0snFok0VG3RyPvYuzMfZIVP2le\n' +
          '0f47sj3UXhfmolrHS335iCortKKSRq6j5osCQDiW9DHKVBT5bMsvHmoLBgiT4eVi\n' +
          'pCkcIqPnpmZZSLJTJzeu5373tBoZ3RUrPhFv9nXX4pSW3obSqbonIDxDXy8CQCB/\n' +
          '88AEBnOoZMuRbFTHnDOE8DkBYZL7k5aTZ+X3UbKKYLYNpytcL2u5zT83mYA9Auia\n' +
          'YqI9cVRfveven3LgOmsCQQCLiJiePuSRW+4lQ3L8CHB4kjtIMV+T6NB3/i/mCi1s\n' +
          'te8AWVcsrWtZl21U9C6k9XE/KuH3WqmbNCCgeZIu/Ay0\n' +
          '-----END RSA PRIVATE KEY-----'


        decryptor.setPrivateKey(temp_pubilc)
        if (decryptor.decrypt(_this.ang_rsa_content) == null) {
          _this.ang_real_md5 = '密文已被篡改，无法解密'
        } else {
          _this.ang_real_md5 = decryptor.decrypt(_this.ang_rsa_content)
          console.log(_this.ang_real_md5);
        }
      },

      // 黑客对信件的相关信息进行篡改
      hack_change_msg: function() {
        let _this = this
        if (_this.hang_md5_content === '') {
          this.$notify({
            title: '操作提示',
            message: '请先进行信件发送！',
            type: 'warning'
          });
          return
        }
        _this.ang_msg_content = _this.hack_msg_content
        _this.ang_rsa_content = _this.hack_rsa_content

        // md5转化
        _this.ang_md5_content = hex_md5(_this.ang_msg_content)

        // RSA解密相关
        _this.rsa_jie_fn()

        _this.op_index = 3

      },

      // 完成信件的传送过程，对信件内容进行校验
      jus_env: function () {
        let _this = this
        if (_this.op_index !== 3 && _this.if_hack === 'true') {
          this.$notify({
            title: '错误提示',
            message: '请先发送信件并且完成对信件内容的篡改！',
            type: 'error'
          });
          return
        } else if (_this.op_index !== 3 && _this.if_hack === 'false'){
          this.$notify({
            title: '错误提示',
            message: '请先发送信件！',
            type: 'error'
          });
          return
        }
        if (_this.ang_md5_content !== _this.ang_real_md5) {
          this.$notify({
            title: '危险提醒',
            message: '信件内容或密文以及被篡改，请勿相信！',
            type: 'error'
          });
        } else {
          this.$notify({
            title: '安全提示',
            message: '您收到的信件内容完整无误！',
            type: 'success'
          });
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/main.css";
</style>
