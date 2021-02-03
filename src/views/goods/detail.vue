<template>
  <div class="wrap">
    <div>
      <p style="font-size: 18px; font-weight: bold; margin-right: 30px">
        商品名称
      </p>
      <p>{{ list.name }}</p>
    </div>
    <div>
      <p style="font-size: 18px; font-weight: bold; margin-right: 30px">
        商品描述
      </p>
      <p>{{ list.subtitle }}</p>
    </div>
    <div>
      <p style="font-size: 18px; font-weight: bold; margin-right: 30px">
        当前状态
      </p>
      <p v-if="list.status == 1">在售</p>
      <p v-else>已下架</p>
    </div>
    <div>
      <p style="font-size: 18px; font-weight: bold; margin-right: 30px">
        所属分类
      </p>
      <p style="display: flex">
        <el-select v-model="categoryVal" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            disabled
          >
          {{item.name}}
          </el-option>
        </el-select>
        <el-select v-model="classfiyVal" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            disabled
          >
          </el-option>
        </el-select>
        
      </p>
    </div>
    <div>
      <p style="font-size: 18px; font-weight: bold; margin-right: 30px">
        商品价格
      </p>
      <p>
        <el-input v-model="list.price" readonly="readonly">
          <template slot="append">元</template>
        </el-input>
      </p>
    </div>
    <div>
      <p style="font-size: 18px; font-weight: bold; margin-right: 30px">
        商品库存
      </p>
      <p>
        <el-input v-model="list.stock" readonly="readonly">
          <template slot="append">件</template>
        </el-input>
      </p>
    </div>
    <div>
      <p style="font-size: 18px; font-weight: bold; margin-right: 30px">
        商品图片
      </p>
      <p>
        <img
          :src="list.mainImage"
          alt=""
          style="border: solid 1px #000; width: 50px; height: 50px"
        />
      </p>
    </div>
    <div>
      <p style="font-size: 18px; font-weight: bold; margin-right: 30px">
        商品详情
      </p>
      <p v-html="list.detail"></p>
    </div>
        <!-- <p>{{categoryVal}}</p>
        <pre>{{options}}</pre> -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 0, // 详情id
      list: [], // 详情数据
      options: [], // 一级分类
      categoryVal: "", // 一级分类的双向绑定
      options2: [], // 二级分类
      classfiyVal: "", // 二级分类的双向绑定
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getUser();
    this.getCategory();
  },
  mounted() {},
  methods: {
    // 获取基本信息
 getUser() {
      this.$axios.goodDetail({productId:this.id}).then(res=>{
         console.log(res);
      })
     
      // this.list = res.data;
      // this.categoryVal = res.data.categoryId;
      // this.classfiy(res.data.categoryId);
    },

    // 获取一级分类
    async getCategory() {
      let data = {
        categoryId: 0,
      };
      let { data: res } = await this.$axios.category(data);
      console.log(res)
      this.options = res.data;
    },
    // 获取二级分类
    async classfiy(val) {
      //    console.log(this.categoryVal)
      let data = {
        categoryId: val,
      };
      console.log(data);
      let { data: res } = await this.$axios.classfiy(data);
      // console.log(res)
      this.options2 = res.data;
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  background: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 18px 40px 18px 200px;
  & > div {
    height: 50px;
    display: flex;
    align-items: center;
  }
}
</style>
