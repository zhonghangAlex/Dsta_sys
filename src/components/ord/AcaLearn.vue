<template>
    <div class="main_con">
      <div class="pad_con">

        <el-row class="hash_con">
          <el-col class="col_con" :span="12">
            <el-card class="box-card hash_card">
              <div slot="header" class="clearfix">
                <span class="hash_title">对称/非对称加密解读</span>
                <el-button style="float: right; margin-left: 10px;" type="primary" size="small">完成阅读</el-button>

                <el-popover placement="top" width="260" v-model="aca_extra1">
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;非对称加密体系不要求通信双方事先传递密钥或有任何约定就能完成保密通信，并且密钥管理方便，可实现防止假冒和抵赖，因此，更适合网络通信中的保密通信要求。</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在非对称加密算法的体系中主要包括RSA、Elgamal、背包算法、Rabin、D-H、ECC（椭圆曲线加密算法），使用最广泛的是RSA算法，Elgamal是另一种常用的非对称加密算法。Elgamal由Taher Elgamal于1985年发明，其基础是DiffieˉHellman密钥交换算法，后者使通信双方能通过公开通信来推导出只有他们知道的秘密密钥值[DiffieˉHellman]。与RSA相比，DiffieˉHellman的优势之一是每次交换密钥时都使用一组新值，而使用RSA算法时，如果攻击者获得了私钥，那么他不仅能解密之前截获的消息，还能解密之后的所有消息。然而，RSA可以通过认证（如使用X.509数字证书）来防止中间人攻击，但Diff ieˉHellman在应对中间人攻击时非常脆弱。</p>
                  <div style="text-align: right; margin: 0">
                    <el-button type="text" size="mini" @click="aca_extra1 = false">了解完毕</el-button>
                  </div>
                  <el-button slot="reference" style="float: right;" type="primary" size="small" plain>知识拓展</el-button>
                </el-popover>
              </div>
              <div class="hash_text">
                <el-col class="lr_con l_con" :span="12">
                  <p><el-button style="float: left;" type="primary" size="mini">对称加密算法</el-button>
                    <el-button style="float: left;" type="warning" @click.native="open_sa_diy" size="mini">常见对称加密算法验证</el-button></p><br>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对称加密(也叫私钥加密)指加密和解密使用<span
                    style='color: #f56c6c; font-weight: 800'>相同密钥</span>的加密算法。有时又叫传统密码算法，就是加密密钥能够从解密密钥中推算出来，同时解密密钥也可以从加密密钥中推算出来。
                  </p>
                  <p><img class="inline_img" src="../../assets/images/sa.png" alt="aca"/></p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;而在大多数的对称算法中，加密密钥和解密密钥是相同的，所以也称这种加密算法为秘密密钥算法或单密钥算法。它要求发送方和接收方在安全通信之前，商定一个密钥，通信完全依赖秘钥，密钥的保密性对通信性至关重要。</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;常用的非对称加密算法有：</p>
                  <p>
                    <el-tag class="text_tag">1.凯撒密码算法</el-tag>
                  </p>
                  <p>
                    <el-tag class="text_tag">2.字母倒排序算法</el-tag>
                  </p>
                  <p>
                    <el-tag class="text_tag">3.单标置换算法</el-tag>
                  </p>
                  <p>
                    <el-tag class="text_tag">4.维吉尼亚算法</el-tag>
                  </p>
                  <p>
                    <el-tag class="text_tag">5.转换加密算法</el-tag>
                  </p>
                </el-col>
                <el-col class="lr_con r_con" :span="11">
                  <p><el-button style="float: left;" type="primary" size="mini">非对称加密算法</el-button></p><br>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;非对称加密算法需要两个密钥:<span
                    style='color: #f56c6c; font-weight: 800'>公开密钥</span>和<span
                    style='color: #f56c6c; font-weight: 800'>私有密钥</span>。公开密钥与私有密钥是一对。</p>
                  <p><img class="inline_img" src="../../assets/images/aca.png" alt="aca"/></p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果用公开密钥对数据进行加密，只有用对应的私有密钥才能解密;如果用私有密钥对数据进行加密，那么只有用对应的公开密钥才能解密。因为<span
                    style='color: #f56c6c; font-weight: 800'>加密和解密使用的是两个不同的密钥</span>，所以这种算法叫作非对称加密算法。 </p>
                  <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在本章的学习中，我们将着重介绍<span
                    style='color: #f56c6c; font-weight: 800'>RSA</span>非对称加密方法，你将会清晰地了解到RSA加密的原理、实践体会到数字签名的奥秘</P>
                </el-col>
              </div>
            </el-card>
          </el-col>

          <el-col class="col_con" :span="12">
            <el-card class="box-card hash_card">
              <div slot="header" class="clearfix">
                <span class="hash_title">RSA非对称加密原理</span>
                <el-button style="float: right; margin-left: 10px;" type="primary" size="small">完成阅读</el-button>

                <el-popover placement="top" width="260" v-model="aca_extra2">
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RSA加密算法是一种非对称加密算法。在公开密钥加密和电子商业中RSA被广泛使用。RSA是1977年由罗纳德·李维斯特（Ron Rivest）、阿迪·萨莫尔（Adi Shamir）和伦纳德·阿德曼（Leonard Adleman）一起提出的。当时他们三人都在麻省理工学院工作。RSA就是他们三人姓氏开头字母拼在一起组成的。</p>
                  <div style="text-align: right; margin: 0">
                    <el-button type="text" size="mini" @click="aca_extra2 = false">了解完毕</el-button>
                  </div>
                  <el-button slot="reference" style="float: right;" type="primary" size="small" plain>知识拓展</el-button>
                </el-popover>
              </div>
              <div class="hash_text">
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RSA 是非对称算法，加解密使用不同的密钥。两个密钥都可以用于加密，解密时需要使用另一个密钥。但是，通常用公钥加密私钥解密，因为公钥是近乎完全公开的，对于私钥加密的数据，有太多的人可以解密了。理论上 A 和 B 之间要通过 RSA 实现保密通信，需要 A 和 B 各自生成一组密钥，同时保管好自己的私钥；用对方的公钥加密要发送的消息，用自己的私钥解密对方发送过来的消息。</p>
                <p>
                  <el-table
                    :stripe= true
                    size="mini"
                    :data="tableData"
                    :cell-style="ele_table_style"
                    border
                    style="width: 92%; left: 4%">
                    <el-table-column
                      align="center"
                      prop="step_num"
                      label="步骤序号"
                      width="70">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="step_note"
                      label="步骤说明"
                      min-width="130">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="step_calc"
                      label="运算描述"
                      min-width="120">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      prop="step_extra"
                      label="备注"
                      max-width="80">
                    </el-table-column>
                  </el-table>
                </p>
              </div>
            </el-card>
          </el-col>

          <el-col class="col_con" :span="24">
            <el-card class="box-card hash_card">
              <div slot="header" class="clearfix">
                <span class="hash_title">RSA加密解密体验</span>
                <el-button style="float: right; margin-left: 10px;" type="primary" size="small">完成阅读</el-button>

                <el-popover placement="top" width="260" v-model="aca_extra3">
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RSA 是非对称算法，加解密使用不同的密钥。两个密钥都可以用于加密，解密时需要使用另一个密钥。但是，通常用公钥加密私钥解密，因为公钥是近乎完全公开的，对于私钥加密的数据，有太多的人可以解密了。理论上 A 和 B 之间要通过 RSA 实现保密通信，需要 A 和 B 各自生成一组密钥，同时保管好自己的私钥；用对方的公钥加密要发送的消息，用自己的私钥解密对方发送过来的消息。</p>
                  <div style="text-align: right; margin: 0">
                    <el-button type="text" size="mini" @click="aca_extra3 = false">了解完毕</el-button>
                  </div>
                  <el-button slot="reference" style="float: right;" type="primary" size="small" plain>知识拓展</el-button>
                </el-popover>
              </div>
              <div class="hash_text">
                <el-col class="lr_con rsa_line_con" :span="14">
                  <ul class="rsa_line">
                    <li style="display: flex; flex-direction: column; justify-content: center;">
                      <span class="user_div">
                        用户A
                      </span>
                      <p><el-tag style="width: 100%;text-align: center;margin-top: 10px;">明文M = <span
                        style='color: #f56c6c; font-weight: 800'>{{ ming_info }}</span></el-tag></p>
                    </li>
                    <li class="rsa_gong_con" ref="slow_show_li1">
                      <el-card  class="rsa_gong" style="display: flex; flex-direction: column; justify-content: center;">
                        <p><span style="display:flex;justify-content: center;">公钥E的计算</span></p>
                        <p><el-tag style="width: 100%;text-align: center;">1 < E < φ(N)</el-tag></p>
                        <p><el-tag style="width: 100%;text-align: center;">E 和 φ(N) 互质</el-tag></p>
                        <p><el-tag style="width: 100%;text-align: center;">多个结果随机选择</el-tag></p>
                        <p><span style="display:flex;justify-content: center;">公钥E计算结果</span></p>
                        <p><el-tag style="width: 100%;text-align: center;">公钥E = <span
                          style='color: #f56c6c; font-weight: 800'>{{ public_key }}</span></el-tag></p>
                      </el-card>
                    </li>
                    <li class="rsa_gong_con" ref="slow_show_li2">
                      <el-card  class="rsa_gong" style="display: flex; flex-direction: column; justify-content: center;">
                        <p><span style="display:flex;justify-content: center;">公钥加密公式</span></p>
                        <p><el-tag style="width: 100%;text-align: center;">C ＝ S mod N</el-tag></p>
                        <p><el-tag style="width: 100%;text-align: center;">S等于M的E次方</el-tag></p>
                        <p><span style="display:flex;justify-content: center;">加密后密文</span></p>
                        <p><el-tag style="width: 100%;text-align: center;">密文C = <span
                          style='color: #f56c6c; font-weight: 800'>{{ mi_info }}</span></el-tag></p>
                      </el-card>
                    </li>
                    <li style="display: flex; flex-direction: column; justify-content: center;">
                      <span class="user_div">
                        用户B
                      </span>
                      <p><el-tag style="width: 100%;text-align: center;margin-top: 10px;">密文C = <span
                        style='color: #f56c6c; font-weight: 800'>{{ mi_info }}</span></el-tag></p>
                    </li>
                    <li class="rsa_gong_con" ref="slow_show_li3">
                      <el-card  class="rsa_gong" style="display: flex; flex-direction: column; justify-content: center;">
                        <p><span style="display:flex;justify-content: center;">私钥D的计算</span></p>
                        <p><el-tag style="width: 100%;text-align: center;">E * D % φ(N) = 1</el-tag></p>
                        <p><el-tag style="width: 100%;text-align: center;">满足公式倒推</el-tag></p>
                        <p><span style="display:flex;justify-content: center;">私钥D的计算结果</span></p>
                        <p><el-tag style="width: 100%;text-align: center;">私钥D = <span
                          style='color: #f56c6c; font-weight: 800'>{{ private_key }}</span></el-tag></p>
                      </el-card>
                    </li>
                    <li class="rsa_gong_con" ref="slow_show_li4">
                      <el-card  class="rsa_gong" style="display: flex; flex-direction: column; justify-content: center;">
                        <p><span style="display:flex;justify-content: center;">私钥解密公式</span></p>
                        <p><el-tag style="width: 100%;text-align: center;">M ＝ T mod N</el-tag></p>
                        <p><el-tag style="width: 100%;text-align: center;">T等于C的D次方</el-tag></p>
                        <p><span style="display:flex;justify-content: center;">解密后明文</span></p>
                        <p><el-tag style="width: 100%;text-align: center;">明文M = <span
                          style='color: #f56c6c; font-weight: 800'>{{ ming_info_jie }}</span></el-tag></p>
                      </el-card>
                    </li>
                  </ul>
                </el-col>
                <el-col class="lr_con rsa_result_con" :span="4">
                  <el-card class="rsa_result">
                    <p><span style="display:flex;justify-content: center;">根据您填写的数据</span></p>
                    <p>
                      <el-button  size="mini" type="primary" >质数P</el-button>
                      =
                      <el-button  size="mini" class="result_text" >{{ rsa_zhi1 }}</el-button>
                    </p>
                    <p>
                      <el-button  size="mini" type="primary" >质数Q</el-button>
                      =
                      <el-button  size="mini" class="result_text" >{{ rsa_zhi2 }}</el-button>
                    </p>
                    <p>
                      <el-button  size="mini" type="primary" >公共模数N</el-button>=
                    </p>
                    <p>P * Q =
                      <el-button  size="mini" class="result_text" >{{ rsa_zhi1 * rsa_zhi2 }}</el-button>
                    </p>
                    <p>
                      <el-button  size="mini" type="primary" >欧拉函数φ(N)</el-button>=
                    </p>
                    <p>(P-1)(Q-1) =
                      <el-button  size="mini" class="result_text" >{{ (rsa_zhi1 - 1) * (rsa_zhi2 - 1) }}</el-button>
                    </p>
                  </el-card>
                </el-col>
                <el-col class="lr_con rsa_info_con" :span="6">
                  <el-tabs class="rsa_info" @tab-click="change_rsa_method" type="border-card">
                    <el-tab-pane label="自定义生成">
                      <p>
                        <span>自定义明文信息：</span>
                      </p>
                      <p>
                        <el-input style="width: 50%" placeholder="请输入数字明文信息" v-model="ming_info" clearable></el-input>
                      </p>
                      <p>
                        <span>RSA质数因子：</span>
                      </p>
                      <p>
                        <el-input style="width: 48%" @blur="user_zhi_jus(rsa_zhi1, 1)" placeholder="请输入第一个质数" v-model="rsa_zhi1" clearable></el-input>
                        <el-input style="width: 48%" @blur="user_zhi_jus(rsa_zhi2, 2)" placeholder="请输入第二个质数" v-model="rsa_zhi2" clearable></el-input>
                      </p>
                      <p>
                        <el-button type="primary" @click.native="rsa_main_start" size="small" style="width: 50%; display:block; margin: 0 auto;">点击开始运算演示</el-button>
                      </p>
                    </el-tab-pane>
                    <el-tab-pane label="系统随机生成">
                      <p>
                        <span>随机生成明文信息：</span>
                      </p>
                      <p>
                        <el-input disabled style="width: 50%"  v-model="ming_info" clearable></el-input>
                      </p>
                      <p>
                        <span>RSA质因子：</span>
                        <el-radio-group class="range_radio" @change="range_change" size="small" v-model="rsa_zhi_range">
                          <el-radio-button label="20">≤20</el-radio-button>
                          <el-radio-button label="50">≤50</el-radio-button>
                          <el-radio-button label="100">≤100</el-radio-button>
                          <el-radio-button label="500">≤500</el-radio-button>
                        </el-radio-group>
                      </p>
                      <p>
                        <el-input style="width: 48%" disabled  v-model="rsa_zhi1" clearable></el-input>
                        <el-input style="width: 48%" disabled  v-model="rsa_zhi2" clearable></el-input>
                      </p>
                      <p style="display: flex; flex-direction: row; justify-content: space-around;">
                        <el-button type="primary" size="small" @click.native="rsa_main_start" style="width: 40%; ">点击开始运算演示</el-button>
                        <el-button type="primary" size="small" @click.native="random_reset" style="width: 40%;">随机重置</el-button>
                      </p>
                    </el-tab-pane>
                  </el-tabs>
                </el-col>
              </div>
            </el-card>
          </el-col>

        </el-row>
        <sa-diy-dialog ref="sa_diy_dialog"></sa-diy-dialog>
      </div>
    </div>
</template>

<script>
  import SaDiyDialog from '@/components/base/Sa_DIY_Dialog'
  let bigInt = require("big-integer")
  export default {
    data() {
      return {
        aca_extra1: false,
        aca_extra2: false,
        aca_extra3: false,
        sa_diy_vis: false,
        // RSA算法原理 table表数据相关
        tableData: [
          {
            step_num: '1',
            step_note: '随机找出两个质数',
            step_calc: '定义为P 、Q',
            step_extra: '两个质数越大，信息加密越安全'
          },{
            step_num: '2',
            step_note: '计算出质数的公共模数',
            step_calc: 'N = P * Q',
            step_extra: '两个质数相乘即为最小公因数'
          },{
            step_num: '3',
            step_note: '计算出欧拉函数',
            step_calc: 'φ(N) = (P-1)(Q-1)',
            step_extra: '-'
          },{
            step_num: '4',
            step_note: '计算出公钥E',
            step_calc: '1 < E < φ(N)',
            step_extra: 'E的取值必须是整数；E 和 φ(N) 必须是互质数'
          },{
            step_num: '5',
            step_note: '计算出私钥D',
            step_calc: 'D满足E * D % φ(N) = 1',
            step_extra: '通过公式反推D'
          },{
            step_num: '6',
            step_note: '加密操作',
            step_calc: 'C ＝ S mod N',
            step_extra: 'C：密文 M：明文；S等于M的E次方'
          },{
            step_num: '7',
            step_note: '解密操作',
            step_calc: 'M ＝ T mod N',
            step_extra: 'C：密文 M：明文；T等于C的D次方'
          },
        ],

        // RSA加密解密DIY相关内容
        // 随机或者自定义切换识别
        rsa_info: 0,

        // 明文信息
        ming_info: '',
        ming_info_jie:'',
        // 明文最大取值
        ming_max: 500,

        // 自定义RSA情况下，质数因子的输入
        rsa_zhi1: '',
        rsa_zhi2: '',

        // 随机生成RSA情况下 质数因子的取值范围
        rsa_zhi_range: '20',

        // 公钥计算后
        public_key: '',

        // 私钥计算后
        private_key: '',
        rsa_mode: '',
        rsa_ola: '',

        // 密文信息
        mi_info: ''
      }
    },
    components:{
      SaDiyDialog
    },
    mounted() {

    },

    methods: {
      // 对话框开关控制
      open_sa_diy:function () {
        let _this = this;
        _this.$refs.sa_diy_dialog._data.dialogVisible = true
      },

      // 表格样式
      ele_table_style:function ({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 2 || columnIndex === 3)
          return 'color: #f56c6c; font-weight: 800'
      },

      // 切换数据生成方式的时候时间处理
      change_rsa_method: function (tab, event) {
        let _this = this
        if (tab) {
          _this.rsa_info = tab.index
        }
        _this.ming_info = ''
        _this.mi_info = ''
        _this.rsa_zhi1 = ''
        _this.rsa_zhi2 = ''
        _this.rsa_ola = ''
        _this.rsa_mode = ''
        _this.public_key = ''
        _this.private_key = ''
        _this.ming_info_jie = ''
        if (_this.rsa_info === '1') {
          // 随机生成明文方法
          _this.pro_ming()
          // 随机生成2个质数方法
          _this.pro_zhi()
        }

      },

      // 随机重置
      random_reset:function() {
        this.change_rsa_method()
      },

      // 随机生成明文方法
      pro_ming:function () {
        let ming_temp = Math.floor(Math.random() * this.ming_max)
        this.ming_info = ming_temp
      },

      // 随机生成质数方法
      pro_zhi:function () {
        let _this = this
        let range = _this.rsa_zhi_range
        let zhi1_temp = 0
        let zhi2_temp = 0
        while (1) {
          zhi1_temp = parseInt(Math.random() * parseInt(range))
          if (_this.if_zhi(zhi1_temp)) {
            while (1) {
              zhi2_temp = parseInt(Math.random() * parseInt(range))
              if (_this.if_zhi(zhi2_temp) && zhi1_temp !== zhi2_temp) {
                break
              }
            }
            break
          }
        }
        _this.rsa_zhi1 = zhi1_temp
        _this.rsa_zhi2 = zhi2_temp
      },

      // 判定是否为质数方法
      if_zhi:function (jus_num) {
        jus_num = parseInt(jus_num)
        if (jus_num === 2){
          return false
        }else if(jus_num % 2 === 0 || jus_num === 1){
          return false
        }
        let sqrt_num = Math.sqrt(jus_num)
        for (let i = 3; i <= sqrt_num; i++) {
          if (jus_num % i === 0) {
            return false
          }
        }
        return true
      },

      // 切换质数取值范围
      range_change: function () {
        let _this = this
        _this.mi_info = ''
        _this.rsa_ola = ''
        _this.rsa_mode = ''
        _this.public_key = ''
        _this.private_key = ''
        _this.ming_info_jie = ''
        _this.pro_zhi()
      },

      // 自定义质数的检测
      user_zhi_jus:function (zhi_num, zhi_index) {
        let _this = this
        if (zhi_num === '') {
          this.$notify({
            title: '操作失败',
            message: '您所填值为空',
            type: 'error'
          });
          return
        }
        if (_this.if_zhi(zhi_num)) {
          if (_this.rsa_zhi1 !== _this.rsa_zhi2) {
            this.$notify({
              title: '操作成功',
              message: '您填写的质数正确',
              type: 'success'
            });
          } else {
            this.$notify({
              title: '操作失败',
              message: '请填写两个不一样的质数',
              type: 'error'
            });
            if (zhi_index === 1){
              _this.rsa_zhi1 = ''
            } else {
              _this.rsa_zhi2 = ''
            }
          }
        } else {
          this.$notify({
            title: '操作失败',
            message: '请填入非2的质数',
            type: 'error'
          });
          if (zhi_index === 1){
            _this.rsa_zhi1 = ''
          } else {
            _this.rsa_zhi2 = ''
          }
        }
      },

      // RSA主执行程序方法
      rsa_main_start:function () {
        let _this = this
        if (_this.ming_info !== '' && _this.rsa_zhi1 !== '' && _this.rsa_zhi2) {
          // 初始化数据
          _this.rsa_mode = _this.rsa_zhi1 * _this.rsa_zhi2
          _this.rsa_ola = (_this.rsa_zhi1 - 1) * (_this.rsa_zhi2 - 1)

          // 动画效果
          _this.$refs.slow_show_li1.style.display = 'block'
          _this.$refs.slow_show_li2.style.display = 'block'
          _this.$refs.slow_show_li3.style.display = 'block'
          _this.$refs.slow_show_li4.style.display = 'block'

          let interval1 = setInterval(()=>{
            _this.$refs.slow_show_li1.style.opacity = 1
            _this.$refs.slow_show_li1.style.width = 170 + 'px'
            clearInterval(interval1);
          }, 100)
          let interval2 = setInterval(()=>{
            _this.$refs.slow_show_li2.style.opacity = 1
            _this.$refs.slow_show_li2.style.width = 170 + 'px'
            clearInterval(interval2);
          }, 1100)
          let interval3 = setInterval(()=>{
            _this.$refs.slow_show_li3.style.opacity = 1
            _this.$refs.slow_show_li3.style.width = 170 + 'px'
            clearInterval(interval3);
          }, 2100)
          let interval4 = setInterval(()=>{
            _this.$refs.slow_show_li4.style.opacity = 1
            _this.$refs.slow_show_li4.style.width = 170 + 'px'
            clearInterval(interval4);
          }, 3100)

          // 计算出公钥
          _this.calc_public_key()
          // 计算出密文
          _this.calc_mi_info()
          // 计算出私钥
          _this.calc_private_key()
          // 反解除明文
          _this.calc_ming_info()

          if (_this.ming_info == _this.ming_info_jie) {
            _this.$notify({
              title: '计算完成',
              message: '已经完成RSA整个计算流程，可以看到最初输入的明文信息和最后破解出来的明文信息完全相同！',
              type: 'success'
            });
          } else {
            _this.$notify({
              title: '计算完成',
              message: '系统已经完成了计算，但是前后明文并不相同，这是由于计算过程中出现了特别庞大的数据，导致数据溢出，请重新选址计算',
              type: 'warning'
            });
          }


        } else {
          _this.$notify({
            title: '操作失败',
            message: '请完整填写必要的信息',
            type: 'error'
          });
        }
      },

      // 计算出公钥
      calc_public_key:function () {
        let _this = this
        let pubilc_key_temp = []
        let notice = 0
        for (let i = 2; i < _this.rsa_ola; i++) {
          notice = 0
          for (let j = 2; j <= i; j++) {
            if (i % j === 0 && _this.rsa_ola % j === 0) {
              notice = 1
              break
            }
          }
          if (notice === 0) {
            pubilc_key_temp.push(i)
          }
        }
        let random_index = parseInt(Math.random() * pubilc_key_temp.length)
        _this.public_key = pubilc_key_temp[random_index]
      },

      // 计算出密文
      calc_mi_info:function () {
        let _this = this
        let S = bigInt(parseInt(_this.ming_info)).pow(parseInt(_this.public_key))
        // let S = Math.pow(parseInt(_this.ming_info), parseInt(_this.public_key))
        _this.mi_info = bigInt(S).mod(_this.rsa_mode)
        // _this.mi_info = S % _this.rsa_mode
      },

      // 计算出私钥
      calc_private_key:function () {
        let _this = this
        let private_key_temp = ''
        for (let i = 1; i <= 10000; i++){
          if (parseInt(_this.public_key) * i % parseInt(_this.rsa_ola) === 1) {
            private_key_temp = i
            break
          }
        }
        _this.private_key = private_key_temp
      },

      // 有密文计算出明文
      calc_ming_info:function () {
        let _this = this
        let T = bigInt(parseInt(_this.mi_info)).pow(parseInt(_this.private_key))
        // let T = Math.pow(parseInt(_this.mi_info), parseInt(_this.private_key))
        _this.ming_info_jie = bigInt(T).mod(_this.rsa_mode)
        // _this.ming_info_jie = T % _this.rsa_mode
      }
    }


  }
</script>

<style scoped>
  @import "../../assets/css/main.css";
</style>
