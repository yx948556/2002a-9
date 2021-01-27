<template>
  <div class="box">
    <el-container>
      <el-header>
        <div class="box_title">
          <span>HAPPY MMALL</span>
        </div>
        <div class="box_right">
          <span>欢迎</span>
          <span @click="outLogin">退出</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :unique-opened="true"
          >
            <el-menu-item index="1">
              <i class="el-icon-setting"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">商品管理</el-menu-item>
                <el-menu-item index="1-2">品类管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">订单管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">用户列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    outLogin() {
      this.$router.push("/");
    }
  },
  computed: {},
  components: {}
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  padding: 0;
  .box_title {
    width: 200px;
    height: 100%;
    background: #545c64;
    float: left;
    color: #fff;
    line-height: 60px;
    text-align: center;
    font-size: 24px;
  }
  .box_right {
    width: 200px;
    height: 100%;
    float: right;
    text-align: center;
    line-height: 60px;
    span {
      margin-right: 10px;
    }
  }
}
.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100%;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
