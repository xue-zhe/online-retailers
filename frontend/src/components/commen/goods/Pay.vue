<template>

    <div id="pay">
        <el-steps :space="200" :active="action" finish-status="success" align-center>
            <el-step title="填写快递单"></el-step>
            <el-step title="支付"></el-step>
            <el-step title="完成支付"></el-step>
        </el-steps>
        <div class="form-block" id="form" style=" display: none;">
            <div class="form-goods-info">
                <!--图片-->
                <div style="width: 12.5%">
                    <img  @click="Details" :src="this.imgs" class="form-goods-img">
                </div>
                <!--买卖方信息-->
                <div class="form-mess">
                    <p class="goods-name" @click="Details">商品信息</p>
                    <p class="goods-sku">
                        商铺:{{shops}}
                    </p>
                </div>
                <!--收件信息-->
                <div class="form-mess" style="width: 50%;">
                    <p class="goods-sku">收件人：{{form.addressee}}</p>
                    <p class="goods-sku">收件地址：{{form.address}}</p>
                    <p class="goods-sku">收件人电话：{{form.phone}}</p>
                </div>
                <!--购买信息-->
                <div class="form-mess">
                    <p class="goods-sku" style="color: #fd3f31">¥<span>{{parseInt(totalprice).toFixed(2)}}</span></p>
                    <p class="goods-sku">购买数量: {{purchases}}</p>
                </div>
                <!--订单状态信息-->
                <div class="form-mess">
                    <p class="goods-sku" style="color: #fd3f31">订单状态: {{state}}</p>
                </div>
            </div>
        </div>
        <div class="form-btn" id="form-button" style="display: none">
            <el-row>
                <el-button type="primary" size="medium" @click="back">上一步</el-button>
                <el-button type="primary" size="medium" @click="pay">支付</el-button>
            </el-row>
        </div>
        <div class="message"  id="pay-message" style="display: flex">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="收货人">
                    <el-input v-model="form.addressee"></el-input>
                </el-form-item>
                <el-form-item label="收货地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="收货电话">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-button class="button"  @click="next" type="primary">
                    <span>下一步</span>
                </el-button>
            </el-form>
        </div>
    </div>


</template>

<script>
    import {getaddordersMultidata} from "../../../network/orders/orders";
    import {getPersonReferMultidata} from "../../../network/person/person";
    import {getstockMultidata} from "../../../network/home/goods";

    export default {
        name: "Pay",
        data() {
            return{
                form:{
                    addressee:'',
                    address:'',
                    phone:''
                },
                goods:'',
                shops:'',
                totalprice:'',
                imgs:'',
                purchases:'',
                account:'',
                action:0,
                shopsaccount:'',
                state:'待支付',
                stock:'',
                id:''
            }
        },
        created() {
             this.goods = window.sessionStorage.getItem('goods')
             this.shops = window.sessionStorage.getItem('shops')
             this.totalprice = window.sessionStorage.getItem('totalprice')
             this.imgs = window.sessionStorage.getItem('imgs')
             this.purchases = window.sessionStorage.getItem('num')
             this.account = window.sessionStorage.getItem('account')
             this.shopsaccount = window.sessionStorage.getItem('shopsaccount')
             this.stock = window.sessionStorage.getItem('stock')
            this.id = window.sessionStorage.getItem('id')
            getPersonReferMultidata(this.account).then(res=>{
                if (res.data.status == 200){
                    this.form.addressee = res.data.data[0].username
                    this.form.address = res.data.data[0].address
                    this.form.phone = res.data.data[0].phone
                    this.$message({
                        message: '加载成功！',
                        type: 'success'
                    });
                }
            })
        },
        methods:{
            /**
             *下一步
             **/
            next(){
                document.getElementById('pay-message').style.display= "none";
                document.getElementById('form-button').style.display = "";
                document.getElementById('form').style.display =""
                this.action = 1

            },
            /**
             *上一步
             **/
            back(){
                document.getElementById('pay-message').style.display= "";
                document.getElementById('form-button').style.display = "none";
                document.getElementById('form').style.display ="none"
                this.action = 0
            },
            /**
             * 支付
            **/
            pay(){
                document.getElementById('pay-message').style.display= "none";
                document.getElementById('form-button').style.display = "none";
                document.getElementById('form').style.display ="none"
                this.state = '待发货'
                let date = new Date();
                let seperator1 = "-";
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                let currentdate = year + seperator1 + month + seperator1 + strDate;

                this.stock = this.stock - this.purchases
                if (this.stock >= 0){
                    getstockMultidata(this.id,this.stock).then(res=>{
                        console.log(res.data)
                        if(res.data.status == 200){
                            getaddordersMultidata(this.account,this.shops, this.goods, this.totalprice, this.imgs,
                                this.purchases, this.form.addressee,this.form.address,this.form.phone, this.state,currentdate,this.shopsaccount).then(res => {
                                if(res.data.status == 200){
                                    this.action = 2
                                    this.$message({
                                        message:  res.data.msg,
                                        type: 'success'
                                    });
                                    this.action = 3
                                    this.$router.push('/orders')
                                }
                            })
                        }else {
                            this.$message.error('支付失败！');
                        }
                    })
                }else {
                    this.$message.error('库存不足！');
                }
            },

            Details(){
                this.$router.push('/detaile')
            },
        }
    }
</script>

<style scoped>
    #pay{
        background: url("../../../assets/personbackground.jpg") no-repeat center center;
        height: 660px;
        width:100%;
        background-size: cover;
    }
    .el-steps{
        margin-top: 50px;
        margin-left: 500px;
        margin-bottom:50px ;
    }
    .form-block{
        padding: 1rem 0.8rem 0;
        background-color: aliceblue;
        margin: 15px 1px;
        width: 98%;
        height:150px;
    }
    .message{
        position: relative;
        border-radius: 6px;
        background: rgba(0, 0, 0, .15);
        left: 550px;
        width: 400px;
        padding: 20px;
    }
    .form-goods-info{
        display: flex;
        border-bottom: 1px solid #F1F1F1;
        width: 100%;
        padding-bottom: 0.17rem;
    }
    .form-goods-img{
        width: 100px;
        height: 90%;
        margin: 0 75px 0 50px;
        border-radius: 0.05rem;
    }
    .form-mess{
        width: 20%;
        height: 90%;
        margin: 0px 10px;
    }
    .goods-name{
        color: #1D1D1D;
        font-size: 22px;
    }
    .goods-name:hover{
        color: #fd3f31;
    }
    .goods-sku{
        color: #6C7177;
        font-size: 15px;
        margin: 20px 0 0 0;
    }
    .goods-sku span{
    }
    .form-btn{
        float: right;
        margin-top: 10px;
        margin-right: 50px;
    }
    .button{
        margin-bottom: 10px;
        width: 100%;
    }
</style>