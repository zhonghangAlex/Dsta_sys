import axios from 'axios'

let base = 'http://47.102.204.54:8080/'

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
