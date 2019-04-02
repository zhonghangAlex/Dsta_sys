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
                  <p>



                  </p>
                  <div style="text-align: right; margin: 0">
                    <el-button type="text" size="mini" @click="aca_extra1 = false">了解完毕</el-button>
                  </div>
                  <el-button slot="reference" style="float: right;" type="primary" size="small" plain>知识拓展</el-button>
                </el-popover>
              </div>
              <div class="hash_text">




              </div>
            </el-card>
          </el-col>
          <el-col class="col_con" :span="12">
            <el-card class="box-card hash_card">
              <div slot="header" class="clearfix">
                <span class="hash_title">RSA非对称加密解读</span>
                <el-button style="float: right; margin-left: 10px;" type="primary" size="small">完成阅读</el-button>

                <el-popover placement="top" width="260" v-model="aca_extra2">
                  <p>



                  </p>
                  <div style="text-align: right; margin: 0">
                    <el-button type="text" size="mini" @click="aca_extra2 = false">了解完毕</el-button>
                  </div>
                  <el-button slot="reference" style="float: right;" type="primary" size="small" plain>知识拓展</el-button>
                </el-popover>
              </div>
              <div class="hash_text">






              </div>
            </el-card>
          </el-col>
          <el-col class="col_con" :span="24">
            <el-card class="box-card hash_card">
              <div slot="header" class="clearfix">
                <span class="hash_title">RSA加密解密体验</span>
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





              </div>
            </el-card>
          </el-col>

        </el-row>

      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        aca_extra1: false,
        aca_extra2: false,
        aca_extra3: false
      }
    },

    mounted() {

    },

    methods: {

    }
  }
</script>

<style scoped>
  @import "../../assets/css/main.css";
</style>
