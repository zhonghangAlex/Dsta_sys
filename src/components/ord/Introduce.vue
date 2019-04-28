<template>
    <div class="main_con">
      <div class="pad_con">
        <div @click="open_video" class="video_start_con">
          <p style="font-family: '宋体' !important"><</p>
        </div>

        <el-carousel :interval="4000" type="card" height="400px">
          <el-carousel-item v-for="(item, index) in kn_card" :key="index">
            <img class="swiper_img" :src="item.img_src" alt="数字签名"/>
            <span class="swiper_text">
              <span class="swiper_title">{{ item.card_title }}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.card_text }}
            </span>
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
                  <el-button class="diy_birth_btn" style="width: 70%;" type="primary" size="small" @click="open_diy">DIY验证</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>



        <birth-diy-dialog ref="diy_dialog"></birth-diy-dialog>
        <drawer-video ref="video_dialog"></drawer-video>

      </div>
    </div>
</template>

<script>
  import BirthDiyDialog from '@/components/base/Birth_DIY_Dialog'
  import DrawerVideo from '@/components/base/Drawer_Video_birth'
  export default {
    data() {
      return {
        // 上方知识卡片内容
        kn_card:[
          {card_title: "数字签名综述", card_text: "数字签名（又称公钥数字签名）是一种类似写在纸上的普通的物理签名，但是使用了公钥加密领域的技术实现，用于鉴别数字信息的方法。一套数字签名通常定义两种互补的运算，一个用于签名，另一个用于验证。", img_src: "/static/images/swiper1.jpg"},
          {card_title: "数字签名原理", card_text: "简单地说,所谓数字签名就是附加在数据单元上的一些数据,或是对数据单元所作的密码变换。这种数据或变换允许数据单元的接收者用以确认数据单元的来源和数据单元的完整性并保护数据,防止被人(例如接收者)进行伪造。它是对电子形式的消息进行签名的一种方法,一个签名消息能在一个通信网络中传输。", img_src: "/static/images/swiper2.jpg"},
          {card_title: "数字签名功能", card_text: "保证信息传输的完整性、发送者的身份认证、防止交易中的抵赖发生。", img_src: "/static/images/swiper3.jpg"},
          {card_title: "数字签名使用", card_text: "你可以对你发出的每一封电子邮件进行数字签名。这不是指落款，普遍把落款讹误成签名。在我国大陆，数字签名是具法律效力的，正在被普遍使用。2000年，中华人民共和国的新《合同法》首次确认了电子合同、电子签名的法律效力。2005年4月1日起，中华人民共和国首部《电子签名法》正式实施。", img_src: "/static/images/swiper4.jpg"}
        ],
        // 下方的生日问题卡片内容
        birth_card: [
          {card_text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一年中有<span style='color: #FBC638; font-weight: 800' '>365</span>天，每时每刻都有新生命的诞生。那你知道一个<span style='color: #FBC638; font-weight: 800' '>50</span>人的班集体里，有人生日相同的概率是多少吗？<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;你可能会觉得这个概率不会很大，因为<span style='color: #FBC638; font-weight: 800' '>50</span>相比<span style='color: #FBC638; font-weight: 800' '>365</span>非常小，然而事实是这样的吗？让我们做一个简单的计算！", img_src:""},
          {card_text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;要想算出至少有两个人生日相同的概率<span style='color: #f56c6c; font-weight: 800' '>P</span>，我们只需要用<span style='color: #f56c6c; font-weight: 800' '>1-“所有人生日都不相同的概率”</span>，就可以得出<span style='color: #f56c6c; font-weight: 800' '>P</span>。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们先假设一个班级只有<span style='color: #FBC638; font-weight: 800' '>2</span>个人，那么<span style='color: #f56c6c; font-weight: 800' '>P（2）= 1 - 99.72% = 0.27%</span>；那么假设一个班级有10个人，<span style='color: #f56c6c; font-weight: 800' '>P（10）= 1-88.3% = 11.7%</span>。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;现在看来结果可能和我们想象的有些偏差，当班级人数更多的时候，结果会是什么样子呢？", img_src:""},
          {card_text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color: #f56c6c; font-weight: 800' '>P（20）= 41.2%</span>，<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color: #f56c6c; font-weight: 800' '>P（50）= 97.1%</span>，<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;是时候揭晓答案了!", img_src:""},
          {card_text: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color: #f56c6c; font-weight: 800' '>P（50）= 1 - 2.9% = 97.1%</span>，也就是说如果一个班级里有<span style='color: #FBC638; font-weight: 800' '>50</span>个人，基本可以肯定会有两个人的生日是相同的，这个现象叫做<span style='color: #f56c6c; font-weight: 800' '>“生日碰撞”</span>。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;下一章<a href='#/hashlearn' style='color: #f56c6c; font-weight: 800' '>“哈希算法”</a>中，经哈希函数加密后的密文就会出现类似的<span style='color: #f56c6c; font-weight: 800' '>“哈希碰撞”</span>问题，那我们会如何解决呢？请开始下一章的学习！", img_src:""}
        ],
      };
    },
    components:{
      BirthDiyDialog,
      DrawerVideo
    },
    methods:{
      open_diy:function () {
        let _this = this;
        _this.$refs.diy_dialog._data.dialogVisible = true
      },
      open_video:function () {
        let _this = this;
        _this.$refs.video_dialog._data.dialogVisible = true
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/main.css";
</style>
