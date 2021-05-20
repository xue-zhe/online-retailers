<template>
    <div>
        <div v-for="(text,index) in tableData" :key="index">
            <div class="form-block">
                <div class="form-goods-info">
                    <!--图片-->
                    <div style="width: 12.5%">
                        <img  :src="text.imgs" class="form-goods-img">
                    </div>
                    <!--买卖方信息-->
                    <div class="form-mess">
                        <p class="goods-name" >{{text.goods}}</p>
                    </div>
                    <div class="form-mess">
                        <p class="goods-sku">商铺：{{text.shops}}</p>
                        <p class="goods-sku">购买账号:{{text.account}}</p>
                    </div>
                    <!--收件信息-->
                    <div class="form-mess" style="width: 40%;">
                        <p class="goods-sku">收件人:{{text.addressee}}</p>
                        <p class="goods-sku">收件地址:{{text.address}}</p>
                        <p class="goods-sku">收件人电话:{{text.phone}}</p>
                    </div>
                    <!--购买信息-->
                    <div class="form-mess">
                        <p class="goods-sku" style="color: #fd3f31">¥<span>{{text.price.toFixed(2)}}</span></p>
                        <p class="goods-sku">购买数量:{{text.purchases}}</p>
                        <div class="block">
                            <el-rate  :colors="colors" disabled v-model="text.ratevalue" ></el-rate>
                        </div>
                    </div>
                    <!--订单状态信息-->
                    <div class="form-mess">
                        <p class="goods-sku">创建时间:{{text.date}}</p>
                        <p class="goods-sku" style="color: #fd3f31">订单状态:{{text.state}}</p>
                        <p class="goods-sku" style="color: #fd3f31">{{text.reason}}</p>
                    </div>
                </div>
            </div>
            <!--按钮组-->
            <div class="form-btn">
                <el-row>
                    <el-button type="primary" :disabled.sync="disabled" @click="rate(text.id)">评价</el-button>
                    <el-button type="primary" :disabled.sync="disabled" @click="confirm(text.id)">确认签收</el-button>
                    <el-button type="warning" :disabled.sync="disabled" @click="returnorders(text.id)">退货</el-button>
                    <el-button type="danger" :disabled.sync="disabled" @click="deleteorders(text.id)">删除</el-button>
                </el-row>
            </div>
        </div>
        <!--退货原因-->
        <el-dialog
                style="padding-top:0;padding-bottom: 0"
                title="退货原因"
                :visible.sync="addDialogVisible"
                width="50%">
            <el-select  style="width: 500px" v-model="value" placeholder="请选择">
                <el-option

                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="returns">确 定</el-button>
            </span>
        </el-dialog>
        <!--商品评价-->
        <el-dialog
                style="padding-top:0;padding-bottom: 0"
                title="评价"
                :visible.sync="rateDialogVisible"
                width="50%">
            <el-rate
                    v-model="ratevalue"
                    show-text>
            </el-rate>
            <span slot="footer" class="dialog-footer">
                <el-button @click="rateDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="ensure">确 定</el-button>
            </span>
        </el-dialog>
    </div>


</template>

<script>
    import {getorderslistMultidata,getconfirmorderslistMultidata,getreturnorderslistMultidata,getdeleteorderslistMultidata,getrateMultidata} from "../../../network/orders/orders";
    import {getOrdersListidMultidata} from "../../../network/adminorders/adminorders";

    export default {
        name: "Orders",
        data(){
            return{
                id:'',
                tableData:[],
                account:'',
                disabled:false,
                addDialogVisible:false,
                rateDialogVisible:false,
                reason:'',
                options: [{
                    value: '商品成分描述不符',
                    label: '商品成分描述不符'
                }, {
                    value: '生产日期/保质期与商品描述不符',
                    label: '生产日期/保质期与商品描述不符'
                }, {
                    value: '图片/产地/批号/规格等描述不符',
                    label: '图片/产地/批号/规格等描述不符'
                }, {
                    value: '质量问题',
                    label: '质量问题'
                }, {
                    value: '少件（含缺少配件）',
                    label: '少件（含缺少配件）'
                },{
                    value: '收到商品时有破损/污渍/变形',
                    label: '收到商品时有破损/污渍/变形'
                },{
                    value: '未按约定时间发货',
                    label: '未按约定时间发货'
                },{
                    value: '发票问题',
                    label: '发票问题'
                },{
                    value: '卖家发错货',
                    label: '卖家发错货'
                },{
                    value: '预约不到/卖家不给兑换',
                    label: '预约不到/卖家不给兑换'
                },],
                value: '',
                ratevalue:0,
                colors: ['#99A9BF', '#F7BA2A', '#FF9900']
            }
        },
        created() {
            this.account = window.sessionStorage.getItem('account')
            getorderslistMultidata(this.account).then(res=>{
                this.tableData = res.data.result.data
            })
        },
        methods: {
            /**
             *确定收货
             **/
            confirm(id){
                getOrdersListidMultidata(id).then(res =>{
                    if(res.data.data[0].state == '已发货'){
                        getconfirmorderslistMultidata(id).then(res=>{
                            if (res.data.status == 200){
                                this.$message({
                                    message:  '已成功签收！',
                                    type: 'success'
                                });
                                window.location.reload();
                            }
                        })

                    }else {
                        this.disabled = true
                        this.$message({
                            message: '当前不能签收!',
                            type: 'warning'
                        });
                        setTimeout(function (){
                            window.location.reload();
                        }, 2000);
                    }
                })
            },
            /**
             *申请退货
             **/
            returnorders(id){
                this.id = id
                getOrdersListidMultidata(this.id).then(res =>{
                    if(res.data.data[0].state == '已发货'){
                       this.addDialogVisible=true
                    }else {
                        this.disabled = true
                        this.$message({
                            message: '当前不能退货!',
                            type: 'warning'
                        });
                        setTimeout(function (){
                            window.location.reload();
                        }, 2000);
                    }
                })
            },
            /**退货原因**/
            returns(){
                getreturnorderslistMultidata(this.id,this.value).then(res=>{
                    if (res.data.status == 200) {
                        this.addDialogVisible=false
                        this.$message({
                            message: '待退货中',
                            type: 'success'
                        });
                        window.location.reload();
                    }
                })
            },
            /**
             *删除商品
             **/
            deleteorders(id){
                this.id = id
                getOrdersListidMultidata(this.id).then(res =>{
                    if(res.data.data[0].state == '已收货' || res.data.data[0].state == '已退货'){
                        getdeleteorderslistMultidata(this.id).then(res=>{
                            if (res.data.status == 200){
                                this.$message({
                                    message:  res.data.msg,
                                    type: 'success'
                                });
                                window.location.reload();
                            }
                        })
                    }else {
                        this.disabled = true
                        this.$message({
                            message: '当前不能删除!',
                            type: 'warning'
                        });
                        setTimeout(function (){
                            window.location.reload();
                        }, 2000);
                    }
                })
            },

            /**
             *评论商品
             **/
            rate(id){
                this.id= id
                getOrdersListidMultidata(this.id).then(res =>{
                    if(res.data.data[0].state == '已收货' && res.data.data[0].ratevalue == null){
                        this.rateDialogVisible = true
                    }else {
                        this.disabled = true
                        this.$message({
                            message: '当前不能评价!',
                            type: 'warning'
                        });
                        setTimeout(function (){
                            window.location.reload();
                        }, 2000);
                    }
                })
            },
            ensure(){
                getrateMultidata(this.id, this.ratevalue).then(res => {
                    if (res.data.status == 200) {
                        this.rateDialogVisible = false
                        this.$message({
                            message: '已成功评价！',
                            type: 'success'
                        });
                        window.location.reload();
                    }

                })
            }
        }
    }


</script>

<style scoped>
    .form-block{
        display: flex;
        padding: 1rem 0.8rem 0;
        background-color: aliceblue;
        margin: 15px 0;
        width: 100%;
        height: 150px;
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
        width: 12%;
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
        margin: 15px 0 0 0;
    }
    .form-btn{
        float: right;
        margin-bottom: 10px;
        margin-right: 50px;
    }
</style>