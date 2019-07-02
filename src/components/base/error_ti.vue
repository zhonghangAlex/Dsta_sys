<template>
  <div class="main_con">
    <div class="pad_con">
      <!--列表-->
      <el-table :data="question" fit  highlight-current-row :border="border" v-loading="listLoading" @selection-change="selsChange" style="width: 100%;margin-bottom:15px;" class="tablelist">
        <el-table-column fixed="left" type="selection" width="55" align="center" >
        </el-table-column>
        <el-table-column  fixed="left" type="index" :index="tableindex" label="序号" width="60" align="center">
        </el-table-column>
        <el-table-column prop="id" label="题目编号" v-if="showIPsig"  max-width="0" align="center"  sortable>
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.id }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="题目内容" min-width="120" align="center" sortable>
        </el-table-column>
        <el-table-column prop="xuanxiang[0]" label="A选项" width="120" align="center" sortable>
        </el-table-column>
        <el-table-column prop="xuanxiang[1]" label="B选项" width="120" align="center" sortable>
        </el-table-column>
        <el-table-column prop="xuanxiang[2]" label="C选项" width="120" align="center" sortable>
        </el-table-column>
        <el-table-column prop="xuanxiang[3]" label="D选项" width="120" align="center" sortable>
        </el-table-column>
        <el-table-column prop="answer" label="正确答案" min-width="50" align="center" sortable>
        </el-table-column>
        <el-table-column prop="analysis" label="题目解析" min-width="120" align="center" sortable>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope"><!--<template scope="scope">-->
            <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除错题</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除错题</el-button>
        <el-pagination class="pagebtn" :current-page="page" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" :total="parseInt(total)"  style="float:right;">
        </el-pagination>
      </el-col>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { GetErrorInfo,  CancelError } from "../../api/api";
  export default {
    data() {
      return {
        //权限
        SuperPower: true,
        //文件上传
        fileList: [],
        limit:1,
        uploadform:{

        },
        fileimportVisible:false,
        //密码重置
        //getquestions相关
        filters: {
          search: ''
        },
        search: '',
        question: [],
        total: 0,
        page: 1,
        pagesize: 10,
        border:false,
        listLoading: false,
        sels: [],//列表选中列
        showIPsig:true,
        //编辑页面相关
        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          question: [
            { required: true, message: '请输入题目', trigger: 'blur' }
          ],
          choiceA: [
            { required: true, message: '请输入A选项', trigger: 'blur' }
          ],
          choiceB: [
            { required: true, message: '请输入B选项', trigger: 'blur' }
          ],
          choiceC: [
            { required: true, message: '请输入C选项', trigger: 'blur' }
          ],
          choiceD: [
            { required: true, message: '请输入D选项', trigger: 'blur' }
          ],
          answer: [
            { required: true, message: '请输入正确选项', trigger: 'blur' }
          ],
          analysis: [
            { required: true, message: '请输入题目解析', trigger: 'blur' }
          ]
        },
        //编辑界面数据
        editForm: {
          questionID:'',
          question: '',
          choiceA:'',
          choiceB:'',
          choiceC:'',
          choiceD:'',
          answer:'',
          analysis:''
        },
        //编辑页面tag
        inputVisible: false,
        inputValue: '',

        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          question: [
            { required: true, message: '请输入题目', trigger: 'blur' }
          ],
          choiceA: [
            { required: true, message: '请输入A选项', trigger: 'blur' }
          ],
          choiceB: [
            { required: true, message: '请输入B选项', trigger: 'blur' }
          ],
          choiceC: [
            { required: true, message: '请输入C选项', trigger: 'blur' }
          ],
          choiceD: [
            { required: true, message: '请输入D选项', trigger: 'blur' }
          ],
          answer: [
            { required: true, message: '请输入正确选项', trigger: 'blur' }
          ],
          analysis: [
            { required: true, message: '请输入题目解析', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          question: '',
          choiceA:'',
          choiceB:'',
          choiceC:'',
          choiceD:'',
          answer:'',
          analysis:''
        },
        //新增页面tag
        inputVisible2: false,
        inputValue2: '',

        change_id: (h, parms) => {
          return h('el-tag', {
            props: {
              type: 'success',
              size: 'small',
            },
          }, 'T' + parms.row.id)
        }
      }
    },
    methods: {
      if_super(){
        if(!this.SuperPower) {
          this.$message({
            message: '当前为学生使用状态，您无权进行此操作',
            type: 'error',
            duration:2000,
            showClose:true
          });
          return false
        } else {
          return true
        }
      },
      //批量导入操作
      //显示批量导入页面
      handleimport(){
        if (!this.if_super()){
          return false
        }
        this.fileimportVisible = true;
      },
      //excel下载
      exceldownload(){
        let _this = this;
        window.open("http://47.102.204.54:8080/question_template.xlsx");
      },
      submitUpload() {
        console.log(this.fileList)
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
      },
      handleSuccess(res, file, fileList){
        if(res.status==1){
          this.$message({
            message: res.message,
            type: 'error',
            duration:2000,
            showClose:true
          });
        }
        if(res.status==0){
          this.$message({
            message: res.message,
            type: 'success',
            duration:2000,
            showClose:true
          });
        }
        this.getquestions(1);
      },
      handleError(err, file, fileList){
      },
      handlePro(event, file, fileList){
      },

      //分页器
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = val;
        this.getquestions(0);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.getquestions(0);
        return
      },

      //得到正确的index索引
      tableindex(index){
        index = (this.page-1)*this.pagesize+index+1;
        return index;
      },
      //获取用户列表
      getquestions(x) {
        let _this = this;
        this.listLoading = true;
        if(x == 1){
          this.page = 1;
        }
        let params = {
          pageNum: _this.page,//查询参数
          pageSize:_this.pagesize,
          userid: _this.$cookies.get('userid')//查询参数
        }
        GetErrorInfo(params).then((response)=>{
          _this.total = response.data.result.total
          _this.question = response.data.result.list
          _this.listLoading = false;
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
      //删除
      handleDel: function (index, row) {
        if(!this.if_super()){
          return false
        }
        let _this = this;
        this.$confirm('确认删除该错题吗?', '提示', {
          type: 'warning'
        }).then(() => {
          let list = [row.id]
          let params = {
            questionID: list,
            userid: _this.$cookies.get('userid')
          }
          CancelError(params).then((response)=>{
            let res = response.data;
            if(res.status==0)
              _this.$message({
                message: res.message,
                type: 'success'
              });
            if(res.status==1)
              _this.$message({
                message: res.message,
                type: 'error'
              });
            _this.getquestions(0);
            _this.listLoading = false;
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

        });
      },

      //编辑页面的tag操作
      handleClose(tag) {
        this.editForm.signno.splice(this.editForm.signno.indexOf(tag), 1);
      },

      selsChange: function (sels) {
        this.sels = sels;
      },

      //批量删除
      batchRemove: function () {
        if(!this.if_super()){
          return false
        }
        let _this = this;
        let list = []
        this.sels.forEach(item => list.push(item.id))
        this.$confirm('确认删除选中错题吗？', '提示', {
          type: 'warning'
        }).then(() => {
          let params = {
            questionID: list,
            userid: _this.$cookies.get('userid')
          };
          CancelError(params).then((response)=>{
            let res = response.data;
            if(res.status==0)
              _this.$message({
                message: res.message,
                type: 'success'
              });
            if(res.status==1)
              _this.$message({
                message: res.message,
                type: 'error'
              });
            _this.getquestions(0);
            _this.listLoading = false;
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

        });
      },

      finishup: function () {
        this.fileimportVisible = false
        this.getquestions(1)
      }
    },
    mounted() {
      this.getquestions(0);
    },
    watch: {
      search(curVal, oldVal) {
        // 实现input连续输入，只发一次请求
        // this.getquestions(1);
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.getquestions(1);
        }, 300);
      }
    }
  }

</script>

<style scoped>
  @import "../../assets/css/main.css";
</style>

