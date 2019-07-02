<template>
  <div class="main_con">
    <div class="pad_con">
      <div class="index">
        <el-carousel @change="change_card" ref="carousel" :autoplay="false"  arrow="always" :loop="false" indicator-position="none" height="700px">
          <el-carousel-item name="index"  v-for="(item, index) in quesdata" :key="`item-${index}`">
            <div class="entrance-bottom">
              <div class="entrance-bottom-frame clearfix">
                <div :class="{'entrance-bottom-frame-line': true, 'active': true}"  >
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
          </el-carousel-item>
        </el-carousel>

        <div class="choose_index_con">
          <ul>
            <li @click="change_index(index)" v-for="(item,index) in quesdata">
              <!--<li v-for="(item,index) in quesdata">-->
              <span :class="{'ti_btn': true, 'ti_btn_active': timu_id == index}">
                {{ index + 1 }}
              </span>
            </li>

            <li @click="confirm_submit">
              <el-tooltip class="item" effect="dark" content="点击可以提交答案" placement="top-start">
                <img src="../../assets/images/submit_ti.png" class="ti_btn" />
              </el-tooltip>
            </li>

            <li @click="update_submit">
              <el-tooltip class="item" effect="dark" content="点击重抽题目" placement="top-start">
                <img src="../../assets/images/update.png" class="ti_btn" />
              </el-tooltip>
            </li>
            <li @click="open_myques">
              <el-tooltip class="item" effect="dark" content="点击进入到我的题库" placement="top-start">
                <img src="../../assets/images/star.png" class="ti_btn" />
              </el-tooltip>

            </li>
          </ul>
        </div>
      </div>

      <el-dialog
        :close-on-click-modal="false"
        title="题目解析"
        :visible.sync="jiexi_open"
        style="margin-top: -40px;"
        width="40%"
        :append-to-body='true'>
        <el-tabs class="jiexi_tag" v-model="activeName" @tab-click="handlejiexiClick">
          <el-tab-pane v-for="(item,index) in quesdata" :label="getLabel(index)" :key="`${item.id}`" :name="getLabel(index)">
            <p>
              <el-button  size="mini" type="primary" >正确答案</el-button>
              <el-button  size="mini" type="" >{{ item.answer }}</el-button>
              <el-button  size="mini" type="primary" >你的答案</el-button>
              <el-button  size="mini" type="" >{{ getUserAns(user_answer[index]) }}</el-button>
              <el-button v-if="item.collect === true"  size="mini" type="success" @click="star_event(1, index)"  style="float: right;margin-right: 15px;" icon="el-icon-star-on">已收藏</el-button>
              <el-button v-if="item.collect !== true" size="mini" type="danger"  @click="star_event(0, index)" style="float: right;margin-right: 15px;" icon="el-icon-star-on">点击收藏</el-button>

            </p><br>
            <p>
            <p><el-button  size="mini" type="primary"  style="margin-right: 10px;">题干</el-button>{{ item.code }}</p>
            <p><el-button  size="mini" type="primary"  style="margin-right: 10px;">A</el-button>{{ item.xuanxiang[0] }}</p>
            <p><el-button  size="mini" type="primary" style="margin-right: 10px;">B</el-button>{{ item.xuanxiang[1] }}</p>
            <p><el-button  size="mini" type="primary" style="margin-right: 10px;">C</el-button>{{ item.xuanxiang[2] }}</p>
            <p><el-button  size="mini" type="primary" style="margin-right: 10px;">D</el-button>{{ item.xuanxiang[3] }}</p>
            </p><br>
            <p>
              <el-button  size="mini" type="primary" >答案解析</el-button>
            <p v-if="item.analysis === '暂无解析'">
              {{ item.analysis }}，如果您很清楚题目的解析过程，可以为本题添加解析，方便别的同学学习，每一道题目只能添加一次！
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 15}"
                placeholder="请输入解析内容"
                v-model="analysis_add_text">
              </el-input>
              <el-button style="margin-top: 15px;" size="mini" type="success" @click="submit_Analysis(index)">提交解析</el-button>
            </p>
            <p v-if="item.analysis !== '暂无解析'">{{ item.analysis }}</p>
            </p>
          </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="jiexi_open = false; analysis_add_text= ''">完 成</el-button>
        </span>
      </el-dialog>

      <el-dialog
        :close-on-click-modal="false"
        title="我的题库"
        :visible.sync="myques_vis"
        style="margin-top: -100px;"
        width="85%"
        :append-to-body='true'>
        <el-tabs class="jiexi_tag" v-model="activeModel" @tab-click="handletikuClick">
          <el-tab-pane label="我做错的题目" :key="2" name="我做错的题目">
            <error-ti></error-ti>
          </el-tab-pane>
          <el-tab-pane label="我收藏的题目" :key="1" name="我收藏的题目">
            <star-ti></star-ti>
          </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="myques_vis = false;">完 成</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { RandQuestion, UpdateAnalysis, updateCollect, AnswerDetails } from "../../api/api";
  import errorTi from "../base/error_ti"
  import starTi from "../base/star_ti"
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
        pageSize: 5,
        analysis_add_text: '',
        star_if: false,
        // 我的题库相关
        activeModel: '我做错的题目',
        myques_vis: false
      }
    },
    components: {
      errorTi,
      starTi
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
        // _this.addClass(dact, active)
        for (let i = 0; i < document.querySelectorAll(".entrance-bottom-frame-line-button").length; i++) {
          document.querySelectorAll(".entrance-bottom-frame-line-button")[i].onclick = function () {
            _this.user_answer[_this.timu_id] = i % 4
            if (_this.timu_id < document.querySelectorAll(".entrance-bottom-frame-line").length - 1) {
              _this.$refs.carousel.next()
              // let frame_left = _this.getStylee(document.querySelector('.entrance-bottom-frame'), 'marginLeft')
              // document.querySelector(".entrance-bottom-frame").style.marginLeft = parseInt(frame_left) - 1050 + "px"
              _this.timu_id++;
              // _this.addClass(document.querySelectorAll(".entrance-bottom-frame-beijing")[_this.timu_id - 1], none)
            } else {
              // alert("最后一题啦")
              _this.confirm_submit()
            }
          }
        }
      })
    },
    methods: {
      initQuestion: function() {
        let _this = this
        let params = {
          num: _this.pageSize,
          userid: _this.$cookies.get('userid')
        }
        RandQuestion(params).then((response)=>{
          let res = response.data
          _this.quesdata = res.result
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
        // let gap = index - _this.timu_id
        _this.timu_id = index
        _this.setActiveItem(index)
        // let frame_left = _this.getStylee(document.querySelector('.entrance-bottom-frame'), 'marginLeft')
        // document.querySelector(".entrance-bottom-frame").style.marginLeft = parseInt(frame_left) - gap * 1050 + "px"
        // _this.addClass(document.querySelectorAll(".entrance-bottom-frame-beijing")[_this.timu_id - gap], "none")

      },
      confirm_submit: function () {
        let _this = this
        _this.$confirm('你正在提交试题答案，请确认！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.jiexi_open = true
          _this.send_answer_D()
        }).catch(() => {

        });
      },
      send_answer_D: function () {
        let _this = this
        let answerD = []
        for (let i = 0; i < _this.quesdata.length; i++) {
          answerD.push({
            questionID: _this.quesdata[i].id,
            if_right: _this.quesdata[i].answer === _this.getUserAns(_this.user_answer[i])
          })
        }
        let params ={
          userid: _this.$cookies.get('userid'),
          answerD: answerD
        }
        AnswerDetails(params).then((response)=>{
          // let res = response.data
          // _this.$message({
          //   message: res.message,
          //   type: 'success',
          //   duration:2000,
          //   showClose:true
          // });
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
      handlejiexiClick: function (tab, event) {
        this.analysis_add_text = ''
      },
      handletikuClick: function (tab, event) {

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

      },
      // 提交新增解析
      submit_Analysis: function (index) {
        let _this = this
        if(!_this.analysis_add_text){
          _this.$message({
            message: '提交解析不允许为空',
            type: 'error',
            duration:2000,
            showClose:true
          });
          return
        }
        _this.$confirm('每道题目只能提交一次，确定提交吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            questionID: _this.quesdata[index].id,
            analysis: _this.analysis_add_text
          }
          UpdateAnalysis(params).then((response)=>{
            let res = response.data
            _this.$message({
              message: res.message,
              type: 'success',
              duration:2000,
              showClose:true
            });
            _this.quesdata[index].analysis = _this.analysis_add_text
          }).catch((err)=>{
            console.log(err)
            _this.$message({
              message: '数据请求失败，请检查网络',
              type: 'error',
              duration:2000,
              showClose:true
            });
          })
        }).catch(() => {
          _this.$message({
            message: '数据请求失败，请检查网络',
            type: 'error',
            duration:2000,
            showClose:true
          });
        });
      },
      // 轮播相关的方法
      setActiveItem: function (index) {
        this.$refs.carousel.setActiveItem(index)
      },
      change_card: function (nowindex, lastindex) {
        this.timu_id = nowindex
      },
      // 收藏事件相关
      star_event:function (status, index) {
        let _this = this
        let params = {
          collect: _this.quesdata[index].id,
          userid: _this.$cookies.get('userid')
        }
        updateCollect(params).then((response)=>{
          let res = response.data
          _this.$message({
            message: res.message,
            type: 'success',
            duration:2000,
            showClose:true
          });
          _this.quesdata[index].collect = !_this.quesdata[index].collect
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

      // 我的题库相关
      open_myques: function () {
        let _this = this
        _this.myques_vis = true
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/main.css";
</style>
