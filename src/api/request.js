import axios from "axios"
// 加载loading动画
import {
  Loading,
  Message
} from 'element-ui'

let loading;

import config from '../config'
// import { Toast} from "vant"
let {
  baseUrl
} = config
// 确认环境变量
console.log(process.env.NODE_ENV)

// 创建axios对象
const Server = axios.create({
  baseURL: '/api', //基础url地址
  withCredentials:true,
  timeout: 5000, //超时时间
})
console.log(baseUrl)

// 请求拦截器
Server.interceptors.request.use((config) => {
  loading = Loading.service({
    lock: true, //lock的修改符默认是false
    text: '加载中.....', //显示在加载图片下方的加载文案
    spinner: 'el-icon-loading', //自定义加载图表类名
    background: 'rgba(0, 0, 0, 0.7)', //遮罩层的颜色
    // target:document.querySelector('#login'),//loading覆盖的都没元素节点
  })
  console.log(loading)

  let token = sessionStorage.getItem('TOKEN')
  // // 添加到head头中去
  // // config.headers['Authorization']=token;
  if (token) {
    config.headers.Authorization = " Bearer " + token;
  }

  return config
}, error => {
  loading.close()
  // 发送请求失败 弹框提示
  Message.error({
    message: "链接不到服务器，请稍后再试",
    offset: 150
  })
  return Promise.reject(error)

})


// 响应拦截器
Server.interceptors.response.use(res => {
    // 成功回调函数停止加载
    loading.close()
    // 如果返回的状态码为200，说明接口请求成功可以正常拿到数据
    // 否则的话就抛出错误
    // Toast.clear()
    // let res = response.data
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
  //服务器状态码不是2开头的情况
  // 这里可以跟你们后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登陆过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  error => {
    // Toast.clear()
    return Promise.reject(error)
    // if(error.response.status){
    //   // switch(error.response.status) {
    //   //   // 401 未登录
    //   //   // 未登录则跳转登录页面，并携带当前页面的路径
    //   //   // 在登录成功后返回当前页面，这一步需要在登录页面操作
    //   //   case 401:
    //   //     router.replace({
    //   //       path:'/login',
    //   //       query:{
    //   //         redirect: router.currentRoute.fullPath
    //   //       }
    //   //     });
    //   //     break;
    //   // }
    // }

    return Promise.reject(error.response)
  })

// 抛出对象接口（拦截器）
export default Server