import axios from 'axios'

let base = 'http://dsta.zhonghangalex.com/'

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
