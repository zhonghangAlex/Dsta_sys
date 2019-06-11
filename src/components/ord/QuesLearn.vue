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
              <div :class="{'entrance-bottom-frame-line-button': true, 'button-choose': user_answer[index] === 0}">
                <div class="entrance-bottom-frame-line-button-id">A</div>
                <div class="entrance-bottom-frame-line-button-frame">{{ item.xuanxiang[0] }}</div>
              </div>
              <div :class="{'entrance-bottom-frame-line-button': true, 'button-choose': user_answer[index] === 1}">
                <div class="entrance-bottom-frame-line-button-id">B</div>
                <div class="entrance-bottom-frame-line-button-frame">{{ item.xuanxiang[1] }}</div>
              </div>
              <div :class="{'entrance-bottom-frame-line-button': true, 'button-choose': user_answer[index] === 2}">
                <div class="entrance-bottom-frame-line-button-id">C</div>
                <div class="entrance-bottom-frame-line-button-frame">{{ item.xuanxiang[2] }}</div>
              </div>
              <div :class="{'entrance-bottom-frame-line-button': true, 'button-choose': user_answer[index] === 3}">
                <div class="entrance-bottom-frame-line-button-id">D</div>
                <div class="entrance-bottom-frame-line-button-frame">{{ item.xuanxiang[3] }}</div>
              </div>
            </div>
          </div>
        </div>


        <div class="choose_index_con">
          <ul>
            <li @click="change_index(index)" v-for="(item,index) in quesdata">
            <!--<li v-for="(item,index) in quesdata">-->
              <span :class="{'ti_btn': true, 'ti_btn_active': timu_id == index}">
                {{ index + 1 }}
              </span>
            </li>
            <li @click="confirm_submit">
              <img src="../../assets/images/submit_ti.png" class="ti_btn" />
            </li>
            <li @click="update_submit">
              <img src="../../assets/images/update.png" class="ti_btn" />
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
          <el-tab-pane v-for="(item,index) in quesdata" :label="getLabel(index)" :key="`${item.id}`" :name="getLabel(index)">
            <p>
              <el-button  size="mini" type="primary" >正确答案</el-button>
              <el-button  size="mini" type="" >{{ item.answer }}</el-button>
              <el-button  size="mini" type="primary" >你的答案</el-button>
              <el-button  size="mini" type="" >{{ getUserAns(user_answer[index]) }}</el-button>
            </p>
            <p>
              <el-button  size="mini" type="primary" >答案解析</el-button>
              <p>{{ item.analysis }}</p>
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
  import { GetQuestioninit } from "../../api/api";

  export default {
    data() {
      return {
        activeName: '第1题',
        timu_id: 0,
        quesdata: [
          {
            "id" : "",
            "title": "",
            "code": "",
            "xuanxiang":[
            ]
          },{
            "id" : "",
            "title": "",
            "code": "",
            "xuanxiang":[
            ]
          },{
            "id" : "",
            "title": "",
            "code": "",
            "xuanxiang":[
            ]
          },{
            "id" : "",
            "title": "",
            "code": "",
            "xuanxiang":[
            ]
          },{
            "id" : "",
            "title": "",
            "code": "",
            "xuanxiang":[
            ]
          }
        ],
        user_answer: [],
        jiexi_open: false,
        pageNum: 1,
        pageSize: 5
      }
    },
    beforeMount() {
      this.initQuestion()
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
            _this.user_answer[_this.timu_id] = i % 4
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
      initQuestion: function() {
        let _this = this
        let params = {
          pageNum: _this.pageNum,
          pageSize: _this.pageSize,
          searchKey: ''
        }
        GetQuestioninit(params).then((response)=>{
          let res = response.data
          _this.quesdata = res.result.list
          for (let i = 0; i < _this.quesdata.length; i++) {
            _this.user_answer.push(-1)
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
        let gap = index - _this.timu_id
        _this.timu_id = index
        let frame_left = _this.getStylee(document.querySelector('.entrance-bottom-frame'), 'marginLeft')
        document.querySelector(".entrance-bottom-frame").style.marginLeft = parseInt(frame_left) - gap * 1050 + "px"
        _this.addClass(document.querySelectorAll(".entrance-bottom-frame-beijing")[_this.timu_id - gap], "none")

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
      },
      getUserAns: function (num) {
        let list = ["A", "B", "C", "D"]
        if (num !== -1) {
          return list[num]
        } else {
          return "未选择"
        }
      },
      getLabel: function (num) {
        num = parseInt(num) + 1
        return "第"+ num + "题"
      },
      getInitFrame: function () {
        let list = []
        let obj = {
          "id" : "",
          "title": "",
          "code": "",
          "xuanxiang":[
          ]
        }
        for (let i = 1; i < this.pageSize; i++) {
          list.push(obj)
        }
        return list
      },
      update_submit: function () {
        this.change_index(0)
        this.pageNum += 1
        this.timu_id = 0
        this.activeName = "第1题"
        this.user_answer = []
        this.initQuestion()

      }

    }
  }
</script>

<style scoped>
  @import "../../assets/css/main.css";
</style>
