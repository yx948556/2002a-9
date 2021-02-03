// import Server from "@/utils/request";
import Server from "./request";
import qs from 'qs'

// 登录接口
function login(data) {
  return Server({
    url: "/user/login.do",
    method: "post",
    hideloading: true,
    data:qs.stringify(data)
  })
}

// 商品管理
 function wwtShop(page){
  return Server({
    url:`/product/list.do?pageNum=${page}`,
    method:'get',
    hideloading: true,
  })
}

//商品状态
 function wwtStatus(data){
  return Server({
    url:`/product/set_sale_status.do?productId=${data.id}&status=${data.status}`,
    method:'GET',
    hideloading: true,
  })
}

// 查询商品
function search(status,name){
  console.log(status,name)
  return Server({
    url:`/product/search.do?listType=${status}&pageNum=1&productName=${name}`,
    method:'get',
    hideloading: true,
  })
}

// 详情
function goodDetail(id){
  console.log(id)
  return Server({
      url:`/product/detail.do?productId=${id}`,
      method:"get",
      hideloading:false
  })
}
function category(){
  return Server({
      url:`/category/get_category.do`,
      method:"get",
      hideloading:false
  })
}
// 二级分类
function classfiy(data){
  return Server({
      url:'/category/get_category.do',
      method:"get",
      params:data,
      hideloading:false
  })
}
// 二级分类
function classiy(data){
  return Server({
      url:'/category/get_category.do',
      method:"get",
      params:data,
      hideloading:false
  })
}

export default {
  login,
  wwtShop,
  wwtStatus,
  search,
  goodDetail,
  category,
  classfiy,
  classiy,
}