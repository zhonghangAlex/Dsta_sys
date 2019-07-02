<template>
  <div class="main_con">
    <div class="pad_con">
      <el-card style="margin: 0 20px; padding-bottom: 20px; margin-bottom: 30px;">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="margin-bottom: 0px;">
          <el-form :inline="true" :model="filters" style="width:100%;" >
            <el-form-item>
              <el-input v-model="search" placeholder="可搜索学生信息"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-on:click="getstudents(1)">查询</el-button>
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

          <el-upload name="file"  class="upload-demo" enctype="multipart/form-data" :limit=1  ref="upload" action="http://47.102.204.54:8080/uploadStudent"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" :on-preview="handlePreview"  :on-remove="handleRemove" :on-success="handleSuccess" :on-error="handleError" :on-progress="handlePro"  :file-list="fileList" :data="updata"  :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <form method="get" action="http://47.102.204.54:8080/user.xlsx" style="position:absolute; margin-top:-32px;right:20px;" >
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
        <el-table :data="student" fit  highlight-current-row :border="border" v-loading="listLoading" @selection-change="selsChange" style="width: 100%;margin-bottom:15px;" class="tablelist">
          <el-table-column fixed="left" type="selection" width="55" align="center" >
          </el-table-column>
          <el-table-column  fixed="left" type="index" :index="tableindex" label="序号" width="60" align="center">
          </el-table-column>
          <el-table-column prop="userid" label="学生学号"  min-width="150" align="center"  sortable>
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.userid }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="学生名称" min-width="120" align="center" sortable>
          </el-table-column>
          <el-table-column prop="classroom" label="学生班级" width="220" align="center" sortable>
          </el-table-column>
          <el-table-column prop="email" label="E-mail" min-width="200" align="center" sortable>
          </el-table-column>
          <el-table-column prop="answer_time" label="累计答题次数" min-width="100" align="center" sortable>
          </el-table-column>
          <el-table-column prop="correct_time" label="答题正确次数" min-width="100" align="center" sortable>
          </el-table-column>
          <el-table-column prop="answer_time" label="答题正确率" min-width="200" align="center" sortable>
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-progress :text-inside="true" :stroke-width="20" :percentage="scope.row.answer_time === 0 ? 0 : (scope.row.correct_time / scope.row.answer_time).toFixed(2) * 100"></el-progress>
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="250" align="center">
            <template slot-scope="scope"><!--<template scope="scope">-->
              <el-button size="small" type="primary" @click="resetPsw(scope.$index, scope.row)">重置密码</el-button>
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
        <el-form-item label="学生学号" >
          <el-input v-model="editForm.userid" :disabled="true"  style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名">
          <el-input v-model="editForm.username"  style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="学生班级">
          <el-input v-model="editForm.classroom" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="E-mail">
          <el-input v-model="editForm.email" style="width:400px;"></el-input>
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
        <el-form-item label="学生学号"  style="width:400px;">
          <el-input v-model="addForm.userid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" prop="name" style="width:400px;">
          <el-input  v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="学生班级" style="width:400px;">
          <el-input  v-model="addForm.classroom"></el-input>
        </el-form-item>
        <el-form-item label="E-mail" style="width:400px;">
          <el-input  v-model="addForm.email"></el-input>
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
  import { GetUserInfo, EditUser, AddUser, DeleteUser, Teacherchange } from "../../api/api";
  export default {
    data() {
      return {
        //权限
        SuperPower: true,
        //文件上传
        fileList: [],
        limit:1,
        updata:{
          teacherID: this.$cookies.get('userid')
        },
        fileimportVisible:false,
        //密码重置
        //getstudents相关
        filters: {
          search: ''
        },
        search: '',
        student: [],
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
          username: [
            { required: true, message: '请输入学生姓名', trigger: 'blur' }
          ],
          classroom: [
            { required: true, message: '请输入学生班级', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入E-mail地址', trigger: 'blur' }
          ]
        },
        //编辑界面数据
        editForm: {
          userid:'',
          username:'',
          classroom: '',
          email:''
        },
        //编辑页面tag
        inputVisible: false,
        inputValue: '',

        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          username: [
            { required: true, message: '请输入学生姓名', trigger: 'blur' }
          ],
          classroom: [
            { required: true, message: '请输入学生班级', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入E-mail地址', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          userid: '',
          username:'',
          classroom:'',
          email:'',
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
        this.getstudents(1);
      },
      handleError(err, file, fileList){
      },
      handlePro(event, file, fileList){
      },

      //分页器
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = val;
        this.getstudents(0);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.getstudents(0);
        return
      },

      //得到正确的index索引
      tableindex(index){
        index = (this.page-1)*this.pagesize+index+1;
        return index;
      },
      //获取用户列表
      getstudents(x) {
        let _this = this;
        this.listLoading = true;
        if(x == 1){
          this.page = 1;
        }
        let params = {
          pageNum: _this.page,//查询参数
          pageSize:_this.pagesize,
          searchKey: _this.search,//查询参数
          userid: _this.$cookies.get('userid')//用户参数
        }
        GetUserInfo(params).then((response)=>{
          _this.total = response.data.result.total
          _this.student = response.data.result.list
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
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          let list = [row.userid]
          let params = {
            userid: list,
          }
          DeleteUser(params).then((response)=>{
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
            _this.getstudents(0);
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
        if(!this.if_super()){
          return false
        }
        this.editFormVisible = true;
        this.editForm.userid = Object.assign({}, row).userid
        this.editForm.username = Object.assign({}, row).username
        this.editForm.classroom = Object.assign({}, row).classroom
        this.editForm.email = Object.assign({}, row).email
      },
      //显示新增界面
      handleAdd: function () {
        if(!this.if_super()){
          return false
        }
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
              EditUser(params).then((response)=>{
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
                _this.getstudents(0);
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
              AddUser(params).then((response)=>{
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
                _this.getstudents(0);
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
        if(!this.if_super()){
          return false
        }
        let _this = this;
        let list = []
        this.sels.forEach(item => list.push(item.userid))
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          let params = {
            userid: list
          };
          DeleteUser(params).then((response)=>{
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
            _this.getstudents(0);
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
        this.getstudents(1)
      },
      // 重置密码
      resetPsw:function (index, row) {
        let _this = this;
        let params = {
          userid: row.userid,
        }
        //和删除一样的ID 接口位置sturesetpsd
        this.$confirm('确认要重置密码吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          Teacherchange(params).then((response)=>{
              let d = response.data;
              if(d.status==0)
                _this.$message({
                  message: d.message,
                  type: 'success'
                });
              if(d.status==1)
                _this.$message({
                  message: d.message,
                  type: 'error'
                });
              _this.getstudents(0);
              _this.listLoading = false;
            })
            .catch(function (error) {
              console.log(error);
              _this.listLoading = false;
            });
        }).catch(() => {
          console.log(err)
          _this.$message({
            message: '数据请求失败，请检查网络',
            type: 'error',
            duration:2000,
            showClose:true
          });
        });
      }
    },
    mounted() {
      this.getstudents(0);
    },
    watch: {
      search(curVal, oldVal) {
        // 实现input连续输入，只发一次请求
        // this.getstudents(1);
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.getstudents(1);
        }, 300);
      }
    }
  }

</script>

<style scoped>
  @import "../../assets/css/main.css";
</style>

