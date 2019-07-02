<template>
  <div class="main_con">
    <div class="pad_con">
      <el-row class="base_con">
        <el-col  :span="6" v-for="(item, index) in base_card" :key="index" >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="base_title">{{ base_title[index] }}</span>
            </div>
            <div class="base_text" >
              <div class="base_op">
                <span v-if="index !== 2" class="base_main_text">{{ item }}</span>
                <el-progress status="success" v-if="index === 2" style="width: 70%; margin-top: 30px;" :text-inside="true" :stroke-width="26" :percentage="(item / base_card[0]).toFixed(2) * 100"></el-progress>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row class="data_con">
        <el-col  :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="data_title">{{ data_title[1] }}</span>
            </div>
            <num-ays style="height: 350px;"></num-ays>
          </el-card>
        </el-col>
        <el-col  :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="data_title">{{ data_title[2] }}</span>
            </div>
            <rate-ays style="height: 350px;"></rate-ays>
          </el-card>
        </el-col>
        <el-col  :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="data_title">{{ data_title[3] }}</span>
            </div>
            <time-ays style="height: 350px;"></time-ays>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { LearningSituation, Ranking } from "../../api/api";
  import numAys from '../base/num_ays.vue'
  import rateAys from '../base/rate_ays.vue'
  import timeAys from '../base/time_ays.vue'
  export default {
    name: "StuLearn",
    components: {
      numAys,
      rateAys,
      timeAys
    },
    data() {
      return {
        base_title: [
          "管理学生总人数",
          "管理题目总数",
          "已完成学习的学生占比",
          "平均学习时长"
        ],
        data_title: [
          "学习进度占比统计",
          "答题数排行",
          "正确率排行",
          "学习时长排行"
        ],
        // 基础信息卡片数据
        base_card: [
          20,
          434,
          14,
          "10分钟"
        ],
        // 学习进度比例人数
        progress: [
        ],
        // 答题数排行
        num_rank:[
        ],
        // 正确率排行
        rate_rank: [
        ],
        // 学习时长排行
        time_rank: [
        ]
      }
    },
    mounted(){
      this.$nextTick(() => {
        this.getBaseData()
        this.getRankData(1)
        this.getRankData(2)
        this.getRankData(3)
      })
    },
    methods: {
      getBaseData: function () {
        let _this = this
        let params = {
          teacherid: _this.$cookies.get('userid')
        }
        LearningSituation(params).then((response)=>{
          let res = response.data.result
          _this.base_card[0] = res.studentNum
          _this.base_card[1] = res.questionNum
          _this.base_card[2] = res.finishedNum
          let hours_temp = parseInt(res.learnAvg / 3600)
          let minutes_temp = parseInt((res.learnAvg - hours_temp * 3600) / 60)
          let seconds_temp = res.learnAvg - hours_temp * 3600 - minutes_temp * 60
          _this.base_card[3] = (hours_temp === 0 ? '' : (hours_temp + '时')) + minutes_temp + '分'
          console.log(_this.base_card);
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
      getRankData: function (type) {
        let _this = this
        let params = {
          teacherid: _this.$cookies.get('userid'),
          type: type
        }
        Ranking(params).then((response)=>{
          let res = response.result

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
  @import "../../assets/css/main.css";
</style>
