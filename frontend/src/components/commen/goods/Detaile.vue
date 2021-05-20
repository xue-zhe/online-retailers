<template>  <!--商品详情-->
    <div id="app">
        <el-row :gutter="20">
            <el-col :span="10">
                <el-carousel  height="640px">
                    <el-carousel-item v-for="(url,index) in srcList" :key="index">
                        <el-image
                                style=" width :100%; margin: 35px 30px 40px 30px;"
                                :src="url"
                                :preview-src-list="srcList">
                        </el-image>
                    </el-carousel-item>
                </el-carousel>
            </el-col>
            <el-col :span="14">
                <form action="#" class="all">
                    <!--商品名-->
                    <div style="width: 95%;">
                        <h1 style="font-size: 30px">{{goods}}</h1>
                    </div>
                    <div style="margin: 20px 0">
                        <hr width="90%" style="height:1px;" color="#E9EBEE"/>
                    </div>
                    <!--商品简介-->
                    <div class="product_desc" style="width: 90%;">
                        <p style="color: #215196;font-size: 18px">{{description}}</p>
                    </div>
                    <!--商品价格-->
                    <div style="width: 90%;height: 95px;margin: 20px 0">
                        <img src="../../../assets/goodback.jpg" alt="" style="height: 100%;width: 100%">
                    </div>
                    <div style="width: 90%;">
                        现价：<div><span class="old-price">¥{{oldprice.toFixed(2)}}</span>
                        <span class="current-price">¥{{totalprice.toFixed(2)}}</span></div>
                    </div>
                    <!--商品数量-->
                    <div style="width: 90%;" >
                        <label>商品数量：</label>
                        <el-input-number class="sel-count" v-model="num" @change="handleChange" :min="1" :max="20" label="描述文字"></el-input-number>
                    </div>
                    <!--按钮-->
                        <el-row>
                            <div class="two-but">
                                <el-button type="danger" @click="payment">购买</el-button>
                            </div>
                        </el-row>
                </form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {getShopslistMultidata} from "../../../network/home/goods";

    export default {
        name:'Detaile',
        data() {
            return {
                goods:'',
                description:'',
                oldprice:'',
                price:'',
                totalprice:'',
                srcList:[],
                num: 1,
                addDialogVisible:true
            }
        },
        created() {
            let id = window.sessionStorage.getItem('id')
            getShopslistMultidata(id).then(res => {
                this.srcList = res.data.imglist
                this.goods = res.data.result.data[0].goods
                this.description = res.data.result.data[0].description
                this.oldprice = res.data.result.data[0].oldprice
                this.price = res.data.result.data[0].price
                this.totalprice = res.data.result.data[0].price
            })

        },
        methods: {
            handleChange(value) {
                this.num = value
                this.totalprice = this.price*value
            },
            /**
             *支付
             **/
            payment(){
                window.sessionStorage.setItem('totalprice',this.totalprice)
                window.sessionStorage.setItem('num',this.num)
                this.$router.push('/pay')
            }
        },
    }
</script>

<style scoped>
    .all{
        margin: 35px 0 40px 30px;
    }
    .select{
        float: left;
        position: relative;
        margin: 0 4px 4px 0;
        padding: 1px;
        line-height: 24px;
    }
    .select a{
        float: left;
        background-color: #fff;
        min-width: 10px;
        padding: 0 9px;
        text-align: center;
        border: 1px solid #b8b7bd;
        color: #000;
    }
    .select a:hover{
        background-color: #D3DCE6;
    }
    .old-price{
        text-decoration: line-through;
        width: 100%;
        font-size: 20px;
        margin: 45px;
    }
    .current-price{
        width: 100%;
        font-size: 45px;
        color: #F40;
    }
    .sel-count{
        width: 28%;
        margin: 10px 0 10px 10px;
    }
    .two-but button{
        width: 200px;
        height: 53px;
        font-size: 20px;
        margin: 18px 0px;
    }

</style>