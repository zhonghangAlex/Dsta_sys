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
