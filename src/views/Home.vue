<template>
  <div class="box">
    <div class="con">
      <div class="con_inp">
        <p>欢迎登陆 - NMALL管理系统</p>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model.number="ruleForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.$axios.login(this.ruleForm).then(res=>{
            console.log(res.data)
            if(res.data.status == 0){
              this.$message.success(res.data.msg)
              this.$router.push('users')
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;
}
.con {
  width: 600px;
  background: #fff;
  flex-direction: column;

  .con_img {
    width: 200px;
    height: 150px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .con_inp {
    width: 100%;
    text-align: center;
    margin-top: 30px;
    p {
      font-size: 24px;
      color: #2d8cf0;
      margin-bottom: 30px;
    }
    .el-form {
      width: 500px;
      margin-left: 10px;
      .el-button {
        width: 400px;
      }
    }
  }
}
</style>
