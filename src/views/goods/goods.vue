<template>
  <div>
    <!-- 商品搜索 -->
    <el-form :inline="true" :model="formInline" class="wwtSou">
      <el-form-item>
        <el-select v-model="formInline.region" size="small">
          <el-option label="按商品id查询" value="search"></el-option>
          <el-option label="按商品名称查询" value="search"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="formInline.user"
          size="small"
          placeholder="关键字"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 商品列表 -->
    <el-table border stripe :data="list">
      <el-table-column prop="id" label="id" width="100"></el-table-column>
      <el-table-column label="信息">
        <template slot-scope="scope">
          <div>{{ scope.row.name }}</div>
          <div>{{ scope.row.subtitle }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" width="200"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-text="scope.row.status === 1 ? '在售' : '已下架'"></span>
          <span
            @click="changeStatus(scope.row)"
            v-text="scope.row.status === 1 ? '下架' : '上架'"
            class="wwt-status"
          ></span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button type="text" @click="$router.push(`/product/detail/${scope.row.id}`)>查看</el-button> -->
          <el-button type="text">编辑</el-button>
           <el-button type="text" @click="watch(scope.row.id)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="pageNum"
      @current-change="changeNum"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      pageNum: 1,
      total: 0,
      list: [],
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getData();
  },
  methods: {
    // 商品数据的获取
    async getData() {
      const { data: res } = await this.$axios.wwtShop(this.pageNum);
      // console.log(res.data.list)
      this.list = res.data.list;
      this.total = res.data.total;
      this.pageNum = res.data.pageNum;
      console.log(res.data.pageNum);
    },
    // 点击改变当前页
    changeNum(val) {
      console.log(val);
      this.pageNum = val;
      this.getData();
    },
    //修改当前商品的状态
    async changeStatus(row) {
      const Logout = await this.$confirm("确定下架该商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => err);
      if (Logout !== "confirm") {
        return this.$message.info("已取消退出");
      }
      if (row.status === 1) {
        row.status = 2;
      } else {
        row.status = 1;
      }
      const { data: res } = await wwtStatus(row);
      this.getData();
      if (res.status === 0) {
        this.$message.success(res.data);
      }
    },
    // 查询
      search() {
      console.log(this.formInline.region, this.formInline.user);
      this.$axios
        .search(this.formInline.region, this.formInline.user)
        .then((res) => {
          console.log(res);
          this.list = res.data.data.list;
        });
    },
    // 点击查看
    watch(id){
      console.log(id)
      this.$router.push('/detail')
    }
  },
};
</script>

<style lang="scss" scoped>
.wwtSou {
  margin: 20px 0px;
}
.wwt-status {
  background: orange;
  padding: 5px;
  color: #fff;
  margin-left: 10px;
  border-radius: 8px;
}
.el-pagination {
  margin: 20px;
}
</style>