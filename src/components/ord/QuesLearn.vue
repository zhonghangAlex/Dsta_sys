<template>
  <div class="main_con">
    <div class="pad_con">
      <div class="index">
        <div class="entrance-bottom">
          <div class="entrance-bottom-frame clearfix">
            <div :class="{'entrance-bottom-frame-line': true, 'active': timu_id === index}"  v-for="(item, index) in quesdata">
              <div :class="{'entrance-bottom-frame-beijing': true }"></div>
              <div class="entrance-bottom-frame-line-id">{{ item.id }}</div>
              <div class="entrance-bottom-frame-line-title">{{ item.title }}</div>
              <pre class="pre_message">
                <code v-html="item.code">
                </code>
              </pre>
              <div class="entrance-bottom-frame-line-button">
                <div class="entrance-bottom-frame-line-button-id">A</div>
                <div class="entrance-bottom-frame-line-button-frame">{{ item.xuanxiang[0] }}</div>
              </div>
              <div class="entrance-bottom-frame-line-button">
                <div class="entrance-bottom-frame-line-button-id">B</div>
                <div class="entrance-bottom-frame-line-button-frame">{{ item.xuanxiang[1] }}</div>
              </div>
              <div class="entrance-bottom-frame-line-button">
                <div class="entrance-bottom-frame-line-button-id">C</div>
                <div class="entrance-bottom-frame-line-button-frame">{{ item.xuanxiang[2] }}</div>
              </div>
              <div class="entrance-bottom-frame-line-button">
                <div class="entrance-bottom-frame-line-button-id">D</div>
                <div class="entrance-bottom-frame-line-button-frame">{{ item.xuanxiang[3] }}</div>
              </div>
            </div>
          </div>
        </div>


        <div class="choose_index_con">
          <ul>
            <li @click="change_index(index)" v-for="(item,index) in quesdata">
              <span :class="{'ti_btn': true, 'ti_btn_active': timu_id == index}">
                {{ index + 1 }}
              </span>
            </li>
            <li @click="confirm_submit">
              <img src="../../assets/images/submit_ti.png" class="ti_btn" />
            </li>
          </ul>
        </div>
      </div>



      <el-dialog
        title="题目解析"
        :visible.sync="jiexi_open"
        width="30%"
        :append-to-body='true'>
        <el-tabs class="jiexi_tag" v-model="activeName" @tab-click="handlejiexiClick">
          <el-tab-pane label="第一题" name="first">
            <p>
              <el-button  size="mini" type="primary" >正确答案</el-button>
              <el-button  size="mini" type="" >A</el-button>
              <el-button  size="mini" type="primary" >你的答案</el-button>
              <el-button  size="mini" type="" >C</el-button>
            </p>
            <p>
              <el-button  size="mini" type="primary" >答案解析</el-button>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数字签名是一种网络安全技术，可以有多种实现方法。数字签名系统向通信双方提供服务，使得A向B发送数字签名的消息P，以便：①B可以验证消息P确实来源于A；②A不能否认发送过消息P：③B不能篡改消息P。 Kerberos是分布式环境下的身份认证系统，是美国麻省理工学院为Athena工程设计的安全机制。身份认证有多种方式，包括静态认证、加强型认证和连续型认证。为了防止重放攻击，采用了时间戳和票证。 PGP是一种公钥加密系统，可以提供数字证书或数字标识，用来证明通信双方的真实身份。在使用数字证书的过程中，通过运用对称和非对称密码技术建立起一套严密的身份验证系统，能够保证：①信息不会被除发送方和接收方外的其他人窃取：②信息在传输过程中不被篡改；⑧发送方能够通过数字证书来确认接收方的身份；④发送方对于自己发送的信息不能抵赖。
              </p>
            </p>
          </el-tab-pane>
          <el-tab-pane label="第二题" name="second">
            <p>
              <el-button  size="mini" type="primary" >正确答案</el-button>
              <el-button  size="mini" type="" >D</el-button>
              <el-button  size="mini" type="primary" >你的答案</el-button>
              <el-button  size="mini" type="" >D</el-button>
            </p>
            <p>
              <el-button  size="mini" type="primary" >答案解析</el-button>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;其实就是用关键字去套哈希函数为H（key） = key MOD 9</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7 % 9 = 7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;34 % 9 = 7</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;55 % 9 = 1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;25 % 9 = 7</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;64 % 9 = 1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;46 % 9 = 1</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10 % 9 = 1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;就是55、64、46、10这四个数字了</p>
            </p>
          </el-tab-pane>
          <el-tab-pane label="第三题" name="third">
            <p>
              <el-button  size="mini" type="primary" >正确答案</el-button>
              <el-button  size="mini" type="" >C</el-button>
              <el-button  size="mini" type="primary" >你的答案</el-button>
              <el-button  size="mini" type="" >C</el-button>
            </p>
            <p>
              <el-button  size="mini" type="primary" >答案解析</el-button>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;线性探测：本位置x被占据，就寻找下一位x+1，直至找到空位置，所以：</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D=4mode11=4 B=2mod11=2 T=20mod11=9</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;M=13mod11=2->3 C=3mod11=3->4->5 I=9mod11=9->10</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;M=13mod11=2->3 C=3mod11=3->4->5 I=9mod11=9->10</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;K=11mod11=0 X=24mod11=2->3->4->5->6 T=20mod11=9->10->0->1</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;等号右边共有20个数，即要搜索20次，所以20/9。</p>
            </p>
          </el-tab-pane>
          <el-tab-pane label="第四题" name="fourth">
            <p>
              <el-button  size="mini" type="primary" >正确答案</el-button>
              <el-button  size="mini" type="" >C</el-button>
              <el-button  size="mini" type="primary" >你的答案</el-button>
              <el-button  size="mini" type="" >A</el-button>
            </p>
            <p>
              <el-button  size="mini" type="primary" >答案解析</el-button>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一个数字签名算法至少应满足3个条件：</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;①签名者事后不能否认自己的签名；</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;②接收者能验证签名，而任何其他人不能仿造签名；</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;③当双方关于签名的真伪发生争执时，有第三方能解决双方的争执。</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数字签名是以电子形式存储消息的一种方法，一个签名消息能在一个通信网络中传输。</p>
            </p>
          </el-tab-pane>
          <el-tab-pane label="第五题" name="fifth">
            <p>
              <el-button  size="mini" type="primary" >正确答案</el-button>
              <el-button  size="mini" type="" >B</el-button>
              <el-button  size="mini" type="primary" >你的答案</el-button>
              <el-button  size="mini" type="" >B</el-button>
            </p>
            <p>
              <el-button  size="mini" type="primary" >答案解析</el-button>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本题考查数字摘要算法的基本概念。 数字签名技术是将摘要用发送者的私钥加密，与原文一起传送给接收者。接收者只有用发送者的公钥才能解密被加密的摘要，然后用Hash函数对收到的原文产生一个摘要，与解密的摘要对比，如果相同，则说明收到的信息是完整的，在传输过程中没有被修改，否则，就是被修改过，不是原信息。同时，也证明发送者发送了信息，防止了发送者的抵赖, B正确。实现数字签名的主要技术是非对称密钥加密技术,C错。但是，数字签名并不能保证信息在传输过程中不被截获,D错</p>
            </p>
          </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="jiexi_open = false">完 成</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'first',
        timu_id: 0,
        quesdata: [
          {
            "id" : "1",
            "title": "单项选择题",
            "code": "数字签名是一种网络安全技术，利用这种技术，接收者可以确定发送者的身份是否真实。Kerberos是一种分布式环境下的系统。为了防止重放(replay)攻击，它使用了一次性的时间戳。在公钥加密的情况下，用户必须警惕用于加密的公钥是否属于真正的接收者，为此必须使用数字证书；常用的数字证书格式有（  ）证书和X.509证书。",
            "xuanxiang":[
              "PGP",
              "SSL",
              "SHTTP",
              "SOCKS",
            ]
          },{
            "id" : "2",
            "title": "单项选择题",
            "code": "对于线性表（7,34,55,25,64,46,20,10）进行散列存储时，若使用H（K）= K % 9作为散列函数，则散列地址为1的元素有（  ）个。",
            "xuanxiang":[
              "1",
              "2",
              "3",
              "4",
            ]
          },{
            "id" : "3",
            "title": "单项选择题",
            "code": "设哈希表长度为11,哈希函数H(K)=(K的第一个字母在字母表中的序号)MOD11,若输入顺序为(D,BA,TN,M,CI,I,K,X,TA),采用内散列表,处理冲突方法为线性探测法,要求构造哈希表,在等概率情况下查找成功平均查找长度为（  ）。",
            "xuanxiang":[
              "4",
              "3",
              "20/9",
              "23/9",
            ]
          },{
            "id" : "4",
            "title": "单项选择题",
            "code": "一个数字签名算法至少应该满足3个条件，下列（  ）不属于数字签名算法应满足的条件。",
            "xuanxiang":[
              "签名者事后不能否认自己的签名",
              "接收者能够验证签名，而任何其他人都不能伪造签名",
              "数字签名必须是所签文件的物理部分",
              "当发生签名真伪争执时，有第三方能够解决争执",
            ]
          },{
            "id" : "5",
            "title": "单项选择题",
            "code": "下面关于数字签名，说法正确的是（  ）。",
            "xuanxiang":[
              "数字签名是在所传输的数据后附加上一段和传输毫无关系的数字信息",
              "数字签名能够解决篡改，伪造等安全性问题",
              "数字签名一般采用对称加密机制",
              "数字签名能够解决数据的加密传输，即安全传输问题",
            ]
          }
        ],
        jiexi_open: false

      }
    },
    mounted() {
      let _this = this
      this.$nextTick(function() {
        // mintime = 1;
        //  timer = setInterval("CountDown()", 1000);
        let dact = document.querySelector(".entrance-bottom-frame-line")
        let active = "active"
        let none = "none"
        _this.addClass(dact, active)
        for (let i = 0; i < document.querySelectorAll(".entrance-bottom-frame-line-button").length; i++) {
          document.querySelectorAll(".entrance-bottom-frame-line-button")[i].onclick = function () {
            if (_this.timu_id < document.querySelectorAll(".entrance-bottom-frame-line").length - 1) {
              let frame_left = _this.getStylee(document.querySelector('.entrance-bottom-frame'), 'marginLeft')
              document.querySelector(".entrance-bottom-frame").style.marginLeft = parseInt(frame_left) - 1050 + "px"
              _this.timu_id++;
              _this.addClass(document.querySelectorAll(".entrance-bottom-frame-beijing")[_this.timu_id - 1], none)
            } else {
              // alert("最后一题啦")
              _this.$confirm('您已经完成答题，是否提交？', '提示', {
                confirmButtonText: '提交',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                _this.jiexi_open = true
              }).catch(() => {

              });
            }
          }
        }
      })
    },
    methods: {
      addClass: function(obj, cls){
        let obj_class = obj.className//获取 class 内容.
        let blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
        let added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
        obj.className = added;//替换原来的 class.
      },

      removeClass: function(obj, cls){
        let obj_class = ' '+obj.className+' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
        obj_class = obj_class.replace(/(\s+)/gi, ' ');//将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
        let removed = obj_class.replace(' '+cls+' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
        removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
        obj.className = removed;//替换原来的 class.
      },

      getStylee: function(obj,attr){
        if(obj.currentStyle){
          return obj.currentStyle[attr];
        }
        else{
          return document.defaultView.getComputedStyle(obj,null)[attr];
        }
      },

      change_index: function (index) {
        let _this = this
        _this.timu_id = index
      },
      confirm_submit: function () {
        let _this = this
        _this.$confirm('你正在提交试题答案，请确认！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.jiexi_open = true
        }).catch(() => {

        });
      },

      handlejiexiClick: function (tab, event) {
        console.log(tab, event);
      }

    }
  }
</script>

<style scoped>
  @import "../../assets/css/main.css";
</style>
