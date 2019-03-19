<template>
  <el-dialog
    title="生日问题自定义计算"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
      <span class="dia_text">你可以在下方输入学生数，系统会自动计算出P值：</span>
      <span class="dia_text">
        假定一个班有
        <el-input-number class="num_input" v-model="class_num" :min="0" :max="1000" placeholder="请输入人数" @change="handlerDIY"></el-input-number>
        名学生
      </span>
      <span class="dia_text">
        那么至少有两人同一天生日的概率是：
        <span>{{ diy_result }}</span>
        %
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleClose">完 成</el-button>
      </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        class_num: 0,
        diy_result: 0
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.dialogVisible = false
            this.class_num = 0
            this.diy_result = 0
            done();
          })
          .catch(_ => {});
      },
      handlerDIY() {
        let _this = this
        let anti_p = 1
        for (let i = 0; i < _this.class_num; i++ ) {
          anti_p = anti_p * ((365-i)/365)
        }
        let p = 1 - anti_p
        _this.diy_result = (p * 100).toFixed(2)
        _this.$notify({
          title: '完成计算',
          message: _this.class_num + '人的班级中，生日碰撞的概率为：' + _this.diy_result + '%',
          type: 'success'
        });
      }
    }
  }
</script>

<style scoped>
  .dia_text{
    display: block;
    margin-bottom: 30px;
  }
</style>
