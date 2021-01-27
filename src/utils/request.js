// 先导入axios对象
import axios from "axios"

// 加载loading动画
import {
  Loading,
  Message
} from 'element-ui'

let loading;


import config from '../config'
import {
  Toast
} from "vant"
let {
  baseUrl
} = config
// 确认环境变量
// console.log(process.env.NODE_ENV)
// 创建axios对象
const Server = axios.create({
  baseURL: baseUrl, //基础url地址
  // withCredentials:true,
  timeout: 5000, //超时时间
})
console.log(baseUrl)

// 配置请求拦截器
Server.interceptors.request.use((config) => {

  loading = Loading.service({
    lock: true, //lock的修改符默认是false
    text: '加载中.....', //显示在加载图片下方的加载文案
    spinner: 'el-icon-loading', //自定义加载图表类名
    background: 'rgba(0, 0, 0, 0.7)', //遮罩层的颜色
    // target:document.querySelector('#login'),//loading覆盖的都没元素节点
  })



  //1.获取本地存储的token值
  let token = sessionStorage.getItem('YX_token')
  // 添加到head头中去
  // config.headers['Authorization']=token;
  if (token) {
    config.headers.authorization = " Bearer " + token;
  }
  //let bdtoken = sessionStorage.getItem("bd_token")

  return config;

}, (error) => {

  return Promise.reject(error)

})
// 配置响应拦截器
Server.interceptors.response.use((response) => {
    Toast.clear()
    const res = response.data
    if (res.status && res.status !== 200) {
      // 登录超时,重新登录
      if (res.status === 401) {
        // store.dispatch('FedLogOut').then(() => {
        //   location.reload()
        // })
      }
      return Promise.reject(res || 'error')
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    Toast.clear()
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

// 抛出对象接口（拦截器）
export default Server