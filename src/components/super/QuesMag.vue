<template>
  <div class="main_con">
    <div class="pad_con">
      <el-card style="margin: 0 20px; padding-bottom: 20px; margin-bottom: 30px;">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="margin-bottom: 0px;">
          <el-form :inline="true" :model="filters" style="width:100%;" >
            <el-form-item>
              <el-input v-model="search" placeholder="输入关键字查询"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-on:click="getquestions(1)">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleAdd">新增</el-button>
            </el-form-item>
            <el-form-item style="float:right; margin-right:0px;">
              <el-button  type="primary" @click="handleimport" >Excel批量导入</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <!--批量导入界面-->
        <el-dialog title="Excel批量导入" :visible.sync ="fileimportVisible" :append-to-body='true' :close-on-click-modal="false" >

          <el-upload name="file"  class="upload-demo" :limit=1  ref="upload" method="post" action="http://47.102.204.54:8080/uploadQuestion"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" :on-preview="handlePreview"  :on-remove="handleRemove" :on-success="handleSuccess" :on-error="handleError" :on-progress="handlePro"  :file-list="fileList" :data="uploadform"  :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <form method="get" action="http://47.102.204.54:8080/question_template.xlsx" style="position:absolute; margin-top:-32px;right:20px;" >
              <el-button style="float:right" size="small"  type="success" native-type="submit" target="_blank">Excel模板下载</el-button>
            </form>
            <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件</div>
          </el-upload>

          <div slot="footer" class="dialog-footer">
            <el-button @click.native="fileimportVisible = false">取消</el-button>
            <el-button type="primary" @click.native="finishup">完成</el-button>
          </div>
        </el-dialog>

        <!--列表-->
        <el-table :data="question" fit  highlight-current-row :border="border" v-loading="listLoading" @selection-change="selsChange" style="width: 100%;margin-bottom:15px;" class="tablelist">
          <el-table-column fixed="left" type="selection" width="55" align="center" >
          </el-table-column>
          <el-table-column  fixed="left" type="index" :index="tableindex" label="ID" width="60" align="center">
          </el-table-column>
          <el-table-column prop="id" label="唯一IP标识" v-if="showIPsig" max-width="0" align="center"  sortable>
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
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
          <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
          <el-pagination class="pagebtn" :current-page="page" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" :total="parseInt(total)"  style="float:right;">
          </el-pagination>
        </el-col>


      </el-card>
    </div>
    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync ="editFormVisible" :append-to-body='true' :close-on-click-modal="false" >
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="题目编号" >
          <el-input v-model="editForm.questionID" :disabled="true"  style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="题目内容" >
          <el-input v-model="editForm.question"  style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="A选项">
          <el-input v-model="editForm.choiceA"  style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="B选项">
          <el-input v-model="editForm.choiceB" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="C选项">
          <el-input v-model="editForm.choiceC" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="D选项">
          <el-input v-model="editForm.choiceD" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="正确答案">
          <el-input v-model="editForm.answer" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="题目解析">
          <el-input v-model="editForm.analysis" style="width:400px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :append-to-body='true' :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="题目内容"  style="width:400px;">
          <el-input v-model="addForm.question" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="A选项" prop="name" style="width:400px;">
          <el-input  v-model="addForm.choiceA"></el-input>
        </el-form-item>
        <el-form-item label="B选项" style="width:400px;">
          <el-input  v-model="addForm.choiceB"></el-input>
        </el-form-item>
        <el-form-item label="C选项" style="width:400px;">
          <el-input  v-model="addForm.choiceC"></el-input>
        </el-form-item>
        <el-form-item label="D选项" style="width:400px;">
          <el-input  v-model="addForm.choiceD"></el-input>
        </el-form-item>
        <el-form-item label="正确答案" style="width:400px;">
          <el-input  v-model="addForm.answer"></el-input>
        </el-form-item>
        <el-form-item label="题目解析" style="width:400px;">
          <el-input  v-model="addForm.analysis"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import { GetQuestioninit, EditQuestion, AddQuestion, DeleteQuestion } from "../../api/api";
  export default {
    data() {
      return {
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
        pagesize:5,
        border:false,
        listLoading: false,
        sels: [],//列表选中列
        showIPsig:false,
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

      }
    },
    methods: {
      //批量导入操作
      //显示批量导入页面
      handleimport(){
        this.fileimportVisible = true;
      },
      //excel下载
      exceldownload(){
        let _this = this;
        window.open("http://47.102.204.54:8080/question_template.xlsx");
      },
      submitUpload() {
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
          searchKey: _this.search//查询参数
        }
        GetQuestioninit(params).then((response)=>{
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
        let _this = this;
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          let list = [row.id]
          let params = {
            questionID: list,
          }
          DeleteQuestion(params).then((response)=>{
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

      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm.questionID = Object.assign({}, row).id
        this.editForm.question = Object.assign({}, row).code
        this.editForm.choiceA = Object.assign({}, row).xuanxiang[0]
        this.editForm.choiceB = Object.assign({}, row).xuanxiang[1]
        this.editForm.choiceC = Object.assign({}, row).xuanxiang[2]
        this.editForm.choiceD = Object.assign({}, row).xuanxiang[3]
        this.editForm.answer = Object.assign({}, row).answer
        this.editForm.analysis = Object.assign({}, row).analysis
      },
      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = {
          question: '',
          choiceA:'',
          choiceB:'',
          choiceC:'',
          choiceD:'',
          answer:'',
          analysis:''
        };
      },
      //编辑
      editSubmit: function () {
        let _this = this;
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              let params = Object.assign({}, this.editForm);
              // params.way = 2;
              EditQuestion(params).then((response)=>{
                _this.editLoading = false;
                let res=response.data
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
                _this.$refs['editForm'].resetFields();
                _this.editFormVisible = false;
                _this.getquestions(0);
              }).catch((err)=>{
                console.log(err)
                _this.$message({
                  message: '数据请求失败，请检查网络',
                  type: 'error',
                  duration:2000,
                  showClose:true
                });
              })
            });
          }
        });
      },
      //编辑页面的tag操作
      handleClose(tag) {
        this.editForm.signno.splice(this.editForm.signno.indexOf(tag), 1);
      },

      //新增
      addSubmit: function () {
        let _this = this;
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              let params = Object.assign({}, this.addForm)
              AddQuestion(params).then((response)=>{
                let res = response.data;
                _this.addLoading = false;
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
                _this.$refs['addForm'].resetFields();
                _this.addFormVisible = false;
                _this.getquestions(0);
              }).catch((err)=>{
                console.log(err)
                _this.$message({
                  message: '数据请求失败，请检查网络',
                  type: 'error',
                  duration:2000,
                  showClose:true
                });
              })
            });
          }
        });
      },
      selsChange: function (sels) {
        this.sels = sels;
      },

      //批量删除
      batchRemove: function () {
        let _this = this;
        let list = []
        this.sels.forEach(item => list.push(item.id))
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          let params = {
            questionID: list
          };
          DeleteQuestion(params).then((response)=>{
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

