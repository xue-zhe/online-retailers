<template><!--首页商品展示-->
  <!--搜索框-->
  <div id="product">
    <el-col :span="24">
      <div class="input-css">
        <el-autocomplete
                style="width:600px"
                v-model="value"
                :fetch-suggestions="querySearch"
                placeholder="请输入商品名"
                clearable
                @select="handleSelect"
                @clear  ="clearable"
               >
          <el-button slot="append" icon="el-icon-search" @click="getshopslistMultidata"></el-button>
        </el-autocomplete>

      </div>
    </el-col>
    <!--商品内容栏-->
    <div id="app">
      <el-row :gutter="24">
        <el-col :span="5" v-for="(text,index) in tableData" :key="index">
          <div class="grid-content ResidualWaste" @click="Details(text.id,text.imgs,text.shops,text.goods,text.account,text.stock)">
            <div class="product" >
              <div class="product_thumb">
                <img  :src="text.imgs" alt="">
              </div>
              <div class="product_content">
                <h4 class="product_name"><span>{{text.goods}}</span></h4>
                <div class="price_box">
                  <span class="price">¥{{text.price.toFixed(2)}}</span>
                  <h4 class="product_name"><span class="shop">商铺:{{text.shops}}</span></h4>
                  <h6  class="stock">剩余量：{{text.stock}}</h6>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!--分页栏-->
    <el-col :span="24">
      <div class="block">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[16]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
      </div>
    </el-col>
  </div>
</template>

<script>
  import {getShopsListMultidata,getshopslistMultidata} from "../../../network/home/home";
    export default {
      name: "Goods",
      data() {
        return {
          tableData:[],
          page:1,
          pagesize:16,
          total:0,
          text:'虾米',
          goods: [],
          value: '',
        };
      },
      created() {
        getShopsListMultidata(this.page, this.pagesize).then(res => {
          this.tableData = res.data.result.data
          this.total = res.data.total[0].total
        })
      },
      methods: {
        /**
         * 跳转详情页面
         **/
        Details(id,imgs,shops,goods,shopsaccount,stock){
          window.sessionStorage.setItem('id',id)
          window.sessionStorage.setItem('imgs',imgs)
          window.sessionStorage.setItem('shops',shops)
          window.sessionStorage.setItem('goods',goods)
          window.sessionStorage.setItem('shopsaccount',shopsaccount)
          window.sessionStorage.setItem('stock',stock)
          this.$router.push('/detaile')
        },
        /**
         * 处理页数变化
         * */
        handleSizeChange(newSize) {
        },
        /**
         * 更加页数进行搜索
         * */
        handleCurrentChange(newPage) {
          this.page = newPage
          getShopsListMultidata(this.page, this.pagesize).then(res => {
            this.tableData = res.data.result.data
            this.total = res.data.total[0].total
          })
        },
        /**
         * 搜索
         **/
        querySearch(queryString, cb) {
          var goods = this.goods;
          var results = queryString ? goods.filter(this.createFilter(queryString)) : goods;
          // 调用 callback 返回建议列表的数据
          cb(results);
        },
        createFilter(queryString) {
          return (goods) => {
            return (goods.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          };
        },
        loadAll() {
          return [
            { "value": "图书、音像、电子书刊" },
            { "value": "手机" },
            { "value": "数码" },
            { "value": "家居家装" },
            { "value": "电脑、办公" },
            { "value": "厨具" },
            { "value": "服饰内衣" },
            { "value": "个护化妆" },
            { "value": "钟表" },
            { "value": "鞋靴" },
            { "value": "母婴" },
            { "value": "礼品箱包" },
            { "value": "食品饮料、保健食品" },
            { "value": "珠宝" },
            { "value": "汽车用品" },
            { "value": "运动健康" },
            { "value": "玩具乐器" },
            { "value": "彩票、旅行、充值、票务" },
            { "value": "生鲜" },
            { "value": "整车" },
          ];
        },
        handleSelect(item) {
          getshopslistMultidata(this.page, this.pagesize,this.value).then(res=>{
            this.tableData = res.data.result.data
            this.total = res.data.total[0].total
          })
        },
        getshopslistMultidata(){
          getshopslistMultidata(this.page, this.pagesize,this.value).then(res=>{
            this.tableData = res.data.result.data
            this.total = res.data.total[0].total
          })
        },
        clearable(){
          window.location.reload();
        }

      },
      mounted() {
        this.goods = this.loadAll();
      }

    }
</script>

<style scoped>
    #product{
      height: 500px;
      width: 100%;
      position: relative;
      top: 30px;
      cursor:pointer;
    }
    /*商品内容*/
    .grid-content{
      border-radius: 5px;
      min-height: 36px;
      height: 366px;
        width: 234px;

      padding-left: 10px;
    }
    .el-row {
      margin-bottom: 20px;

    }
    .el-col {
      border-radius: 4px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
      margin: 0 auto;
    }
    #app{
      /*padding-left: 10px;*/
    margin-left: 240px;
    margin-right: 90px;
    }

    .product{
      box-shadow: inset 0 0 10px #ccc;
      border-radius: 4px;
      background: #ffffff ;
    }
    .product_thumb img {
      height: 198px;
      width: 198px;
      margin-right: 18px;
      margin-left: 18px;
      margin-top: 10px;
    }
    .product_content {
      padding: 15px 0 0 0;
      position: relative;
      margin-right: 18px;
      margin-left: 18px;
    }
    .product_name span{
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 20px;
      font-weight: 400;
      margin-bottom: 15px;
      margin-top: 5px;
    }
    .product_name .shop{
      margin-top: 10px;
      font-size: 14px;
      color: #6C7177;
    }
    .product_name{
      height: 20px;
      font-size: 14px;
    }
    .price_box {
      margin-top: 20px;
    }
    .price_box span {
      font-size: 16px;
      font-weight: 600;
      line-height: 16px;
      color: #fd3f31;
    }
    .stock{
      padding-bottom: 15px;
    }
    /*分页*/
    .block{
      margin-bottom: 100px;
      margin-left: 300px;
    }
    /*搜索*/
    .input-css{
     margin: -25px 30px 50px 455px;
    }

</style>