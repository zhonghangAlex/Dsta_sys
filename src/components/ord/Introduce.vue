<template>
    <div class="main_con">
      <div class="pad_con">
        <el-carousel :interval="4000" type="card" height="400px">
          <el-carousel-item v-for="(item, index) in kn_card" :key="index">
            <h3></h3>
          </el-carousel-item>
        </el-carousel>

        <el-row class="birth_con">
          <el-col  :span="6" v-for="(item, index) in birth_card" :key="index" >
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="birth_title">生日问题({{ index + 1 }})</span>
                <el-button style="float: right;" type="primary" size="small">完成阅读</el-button>
              </div>
              <div class="birth_text" >
                <p v-html="item.card_text"></p>
                <div v-if="index === 3" class="birth_op">
                  <el-button class="diy_birth_btn" style="" type="primary" size="small"  @click="open_diy">DIY验证</el-button>
                  <el-button class="diy_birth_btn" style="" type="primary" size="small">教学视频</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <birth-diy-dialog ref="diy_dialog"></birth-diy-dialog>

      </div>
    </div>
</template>

<script>
  import BirthDiyDialog from '@/components/base/Birth_DIY_Dialog'
  export default {
    data() {
      return {
        // 上方知识卡片内容
        kn_card:[
          {},
          {},
          {},
          {}
        ],
        // 下方的生日问题卡片内容
        birth_card: [
          {card_text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一年中有<span style='color: #FBC638; font-weight: 800' '>365</span>天，每时每刻都有新生命的诞生。那你知道一个<span style='color: #FBC638; font-weight: 800' '>50</span>人的班集体里，有人生日相同的概率是多少吗？<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;你可能会觉得这个概率不会很大，因为<span style='color: #FBC638; font-weight: 800' '>50</span>相比<span style='color: #FBC638; font-weight: 800' '>365</span>非常小，然而事实是这样的吗？让我们做一个简单的计算！", img_src:""},
          {card_text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;要想算出至少有两个人生日相同的概率<span style='color: #f56c6c; font-weight: 800' '>P</span>，我们只需要用<span style='color: #f56c6c; font-weight: 800' '>1-“所有人生日都不相同的概率”</span>，就可以得出<span style='color: #f56c6c; font-weight: 800' '>P</span>。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们先假设一个班级只有<span style='color: #FBC638; font-weight: 800' '>2</span>个人，那么<span style='color: #f56c6c; font-weight: 800' '>P（2）= 1 - 99.72% = 0.27%</span>；那么假设一个班级有10个人，<span style='color: #f56c6c; font-weight: 800' '>P（10）= 1-88.3% = 11.7%</span>。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;现在看来结果可能和我们想象的有些偏差，当班级人数更多的时候，结果会是什么样子呢？", img_src:""},
          {card_text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color: #f56c6c; font-weight: 800' '>P（20）= 41.2%</span>，<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color: #f56c6c; font-weight: 800' '>P（50）= 97.1%</span>，<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;是时候揭晓答案了!", img_src:""},
          {card_text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color: #f56c6c; font-weight: 800' '>P（50）= 1 - 2.9% = 97.1%</span>，也就是说如果一个班级里有<span style='color: #FBC638; font-weight: 800' '>50</span>个人，基本可以肯定会有两个人的生日是相同的，这个现象叫做<span style='color: #f56c6c; font-weight: 800' '>“生日碰撞”</span>。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;下一章<a href='#/hashlearn' style='color: #f56c6c; font-weight: 800' '>“哈希算法”</a>中，经哈希函数加密后的密文就会出现类似的碰撞问题，那我们会如何解决呢？请开始下一章的学习进行了解", img_src:""}
        ]

      };
    },
    components:{
      BirthDiyDialog
    },
    methods:{
      open_diy:function () {
        let _this = this;
        _this.$refs.diy_dialog._data.dialogVisible = true
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/main.css";
</style>
