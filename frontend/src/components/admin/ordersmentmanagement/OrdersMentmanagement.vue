<template>
    <div>
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="13">
                    <el-input placeholder="商品类型或名称或简介" v-model="index" clearable  @clear="getOrdersListMultidata">
                        <el-button slot="append" icon="el-icon-search" @click="getOrderslistMultidata"></el-button>
                    </el-input>
                </el-col>
            </el-row>
        </el-card>
        <!-- 表格区-->
        <el-table
                :data="tableData"
                style="width: 100%"
                border>
            <el-table-column type="index"></el-table-column>
            <el-table-column
                    prop="id"
                    label="id"
                    width="60">
            </el-table-column>
            <el-table-column
                    label="商品图片"
                    width="130">
                <template slot-scope="scope">
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.imgs"
                    ></el-image>
                </template>
            </el-table-column>
            <el-table-column
                    prop="goods"
                    label="商品名称"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="addressee"
                    label="收件人"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址"
                    width="240">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="联系电话"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="purchases"
                    label="购买数量"
                    width="60">
            </el-table-column>
            <el-table-column
                    prop="state"
                    label="状态"
                    width="120">
            </el-table-column>
            <el-table-column
                    label="评价"
                    width="120">
                <template slot-scope="scope">
                    <el-rate
                            v-model="scope.row.ratevalue"
                            show-text>
                    </el-rate>
                </template>
            </el-table-column>
            <el-table-column
                    prop="reason"
                    label="退货原因"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="下单时间"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="c"
                    label="操作"
                    width="280">
                <template slot-scope="scope" >
                    <el-button type="primary" size="mini" icon="el-icon-edit" :disabled.sync="disabled" @click="ShipmentsDialogVisible(scope.row.id)">发货</el-button>
                    <el-button type="warning" size="mini" icon="el-icon-edit" :disabled.sync="disabled" @click="ReturnDialogVisible(scope.row.id)">退货</el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" :disabled.sync="disabled"  @click="DeleteDialogVisible(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页栏-->
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-sizes="[10]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>

    import {getOrdersListMultidata,
            getShipmentsMultidata,
            getreturnMultidata,
            getdeleteMultidata,
            getOrderslistMultidata,
            getOrdersListidMultidata} from "../../../network/adminorders/adminorders";

    export default {
        name: "OrdersMentmanagement",
        data() {
            return {
                index:'',
                shops:'',
                announcement:'',
                id:'',
                tableData: [],
                page:1,
                pagesize:10,
                total:0,
                editDialogVisible:false,
                shopsaccount:'',
                disabled:false
            }
        },
        created() {
            this.shopsaccount = window.sessionStorage.getItem('account')
            getOrdersListMultidata(this.page,this.pagesize,this.shopsaccount).then(res=>{
                this.tableData=res.data.result.data
                this.total = res.data.total[0].total
            })
        },
        methods:{
            /**
             * 处理页数变化
             * */
            handleSizeChange(newSize){
            },
            /**
             * 更加页数进行搜索
             * */
            handleCurrentChange(newPage){
                this.page = newPage
                getOrdersListMultidata(this.page,this.pagesize,this.shopsaccount).then(res=>{
                    this.tableData=res.data.result.data
                    this.total = res.data.total[0].total
                })
            },

            /**
             *搜索
             **/
            getOrderslistMultidata(){
                getOrderslistMultidata(this.page,this.pagesize,this.index).then(res=>{
                    this.tableData=res.data.result.data
                    this.total = res.data.total[0].total
                })
            },
            //取消搜索时
            getOrdersListMultidata(){
                getOrdersListMultidata(this.page,this.pagesize,this.shopsaccount).then(res=>{
                    this.tableData=res.data.result.data
                    this.total = res.data.total[0].total
                })
            },
            /**
             * 发货
             **/
            ShipmentsDialogVisible(id){
                getOrdersListidMultidata(id).then(res =>{
                    if(res.data.data[0].state == '待发货'){
                        let state = '已发货'
                        getShipmentsMultidata(id,state).then(res=>{
                        if(res.data.status == 200){
                            getOrdersListMultidata(this.page,this.pagesize,this.shopsaccount).then(res=>{
                                this.tableData=res.data.result.data
                                this.total = res.data.total[0].total
                            })
                            this.$message({
                                message: res.data.msg,
                                type: 'success'
                            });
                        }
                        })
                    }else {
                        this.disabled = true
                        this.$message({
                            message: '当前不能发货!',
                            type: 'warning'
                        });
                        setTimeout(function (){
                            window.location.reload();
                        }, 2000);
                    }

                })

            },
            /**
             *退货
             **/
            ReturnDialogVisible(id){

                getOrdersListidMultidata(id).then(res =>{
                    if(res.data.data[0].state == '申请退货中'){
                        let state = '已退货'
                        getreturnMultidata(id,state).then(res=>{
                            if(res.data.status == 200){
                                getOrdersListMultidata(this.page,this.pagesize,this.shopsaccount).then(res=>{
                                    this.tableData=res.data.result.data
                                    this.total = res.data.total[0].total
                                })
                                this.$message({
                                    message: res.data.msg,
                                    type: 'success'
                                });
                            }
                        })
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

            DeleteDialogVisible(id){
                getOrdersListidMultidata(id).then(res =>{
                    if(res.data.data[0].state == '已收货' || res.data.data[0].state == '已退货'){
                        getdeleteMultidata(id).then(res=>{
                            this.$confirm('是否进行订单删除?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(()=>{
                                if(res.data.status == 200){
                                    this.$message({
                                        message: '删除成功！',
                                        type: 'success'
                                    });
                                    window.location.reload();
                                }else {
                                    this.$message({
                                        message: '删除失败！',
                                        type: 'warning'
                                    })
                                }
                            })
                        })
                    }else {
                        this.disabled = true
                        this.$message({
                            message: '当前不能删除订单!',
                            type: 'warning'
                        });
                        setTimeout(function (){
                            window.location.reload();
                        }, 2000);
                    }

                })
            },
        }
    }
</script>

<style scoped>
    .el-breadcrumb{
        margin-bottom: 15px;
        font-size: 14px;
    }
    .el-card{
        margin-bottom: 15px;

    }
    .el-table{
        margin-bottom: 15px;
    }
    .permissionbutton {
        margin: 30px 0;
    }
    .permission{
        margin: 20px 0;
    }
</style>
