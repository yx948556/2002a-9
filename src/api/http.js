// import Server from "@/utils/request";
import Server from "./request";
import qs from 'qs'

// 登录接口
function login(data) {
  console.log(data)
  return Server({
    url: "/user/login.do",
    method: "post",
    hideloading: true,
    data:qs.stringify(data)
  })
}



export default {
  login,
}