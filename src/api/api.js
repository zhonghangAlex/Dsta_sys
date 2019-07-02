import axios from 'axios'

let base = 'http://47.102.204.54:8080/'
// let base = 'http://10.138.134.0:8080/'

//登录接口(post)
export const Login = params => {
  return axios.post(`${base}login`, params)
}

//注册接口(post)
export const Register = params => {
  return axios.post(`${base}register`, params)
}

//找回密码接口(post)
export const FindPassword = params => {
  return axios.post(`${base}findpassword`, params)
}

//退出登录接口(get)
export const Logout = params => {
  return axios.get(`${base}logout`, {params : params})
}

//获取学习时间接口(post)
export const StudyTimeGet = params => {
  return axios.post(`${base}studytimeget`, params)
}

//发送学习时间接口(post)
export const StudyTimeSend = params => {
  return axios.post(`${base}studytimesend`, params)
}

//自定义获取题目(get)
export const GetQuestioninit = params => {
  return axios.get(`${base}getQuestionInfo`, {params : params})
}

//随机获取题目结构(get)
export const RandQuestion = params => {
  return axios.get(`${base}randQuestion1`, {params : params})
}

//编辑当前题目(post)
export const EditQuestion = params => {
  return axios.post(`${base}updateQuestion`, params)
}

//新增题目(post)
export const AddQuestion = params => {
  return axios.post(`${base}addQuestion`, params)
}

//删除题目(post)
export const DeleteQuestion = params => {
  return axios.post(`${base}deleteQuestion`, params)
}

//新增题目解析(post)
export const UpdateAnalysis = params => {
  return axios.post(`${base}updateAnalysis`, params)
}

//题目收藏状态变更(post)
export const updateCollect = params => {
  return axios.post(`${base}updateCollect`, params)
}

//学生信息
//自定义获取学生信息(get)
export const GetUserInfo = params => {
  return axios.get(`${base}getUserInfo`, {params : params})
}

//编辑当前题目(post)
export const EditUser = params => {
  return axios.post(`${base}studentUpdate`, params)
}

//新增题目(post)
export const AddUser = params => {
  return axios.post(`${base}addUser`, params)
}

//删除题目(post)
export const DeleteUser = params => {
  return axios.post(`${base}deleteUser`, params)
}

//重置密码（psot）
export const Teacherchange = params => {
  return axios.post(`${base}teacherchange`, params)
}

//答题情况上传（psot）
export const AnswerDetails = params => {
  return axios.post(`${base}answerDetails`, params)
}

//学情管理
//获取base信息
export const LearningSituation = params => {
  return axios.get(`${base}learningSituation`, {params : params})
}

//获取排名信息
export const Ranking = params => {
  return axios.get(`${base}ranking`, {params : params})
}

//我的题库
//错题相关
export const CancelError = params => {
  return axios.post(`${base}cancelError`, params)
}

export const GetErrorInfo = params => {
  return axios.get(`${base}getErrorInfo`, {params : params})
}

//收藏相关
export const CancelCollect = params => {
  return axios.post(`${base}cancelCollect`, params)
}

export const GetCollectInfo = params => {
  return axios.get(`${base}getCollectInfo`, {params : params})
}
