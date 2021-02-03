<template>
    <div>
      <p class="p1">首页</p>
      <div class="con">
          <div class="div1">
              <p>188</p>
              <p>用户总数</p>
          </div>
          <div class="div2">
              <p>279</p>
              <p>商品总数</p>
          </div>
          <div class="div3">
              <p>241</p>
              <p>订单总数</p>
          </div>
      </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    methods: {

    },
    computed:{

    },
    components:{

    }
};
</script>

<style lang="scss" scoped>
    .p1{
        font-size: 24px;
        margin-bottom: 20px;
    }
    .con{
        width: 100%;
        display: flex;
        justify-content: space-between;
        // text-align: center;
        // justify-items: center;
        // justify-content: center;
        div{
            width: 200px;
            height: 200px;
            display: flex;
           justify-content: center;
           align-items: center;
        }
        .div1{
            background: darkorange;
        }
    }
</style>
