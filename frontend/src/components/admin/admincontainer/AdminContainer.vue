<template>
    <el-container>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 :collapse="isCollapse"
                 :router="true">
            <el-submenu index="1">
                <template  #title>
                    <i class="el-icon-s-goods"></i>
                    <span>商品管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/shopsinformation">商品信息</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu  index="2">
                <template #title>
                    <i class="el-icon-s-order"></i>
                    <span>订单管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/ordersmentmanagement">订单信息</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
        <el-container>
            <el-header class="top-nav">
                <el-switch v-model="isCollapse"></el-switch>
                <el-button type="info" @click="shopping" round class="shopping">购物</el-button>
                <el-dropdown class="el-dropdown-link">
                    <span>
                        {{form.shopsname}}
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item><span @click="amend">修改店铺名称</span></el-dropdown-item>
                        <el-dropdown-item><span @click="loginout">注销</span></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
        <!--商品店注册-->
        <el-dialog
                style="padding-top:0;padding-bottom: 0"
                title="修改商铺名称"
                :visible.sync="addDialogVisible"
                width="50%">
            <span>
                <el-form ref="form" :model="form" label-width="80px">
                   <el-form-item label="商品名称">
                       <el-input v-model="form.shopsname"></el-input>
                   </el-form-item>
               </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="refer">确 定</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>
    import {getPersonReferMultidata, getregistershopsMultidata} from "../../../network/person/person";

    export default {
        name: "AdminContainer",
        data() {
            return {
                isCollapse:false,
                addDialogVisible:false,
                form:{
                    shopsname:'',
                    account:'',
                },

            };
        },
        created() {
            this.form.account = window.sessionStorage.getItem('account')
            getPersonReferMultidata(this.form.account).then(res=>{
                if (res.data.status == 200){
                    this.form.shopsname = res.data.data[0].shop
                    this.$message({
                        message: '加载成功！',
                        type: 'success'
                    });
                }
            })
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            loginout(){
                window.sessionStorage.clear()
                this.$router.push('/login')
                this.$message({
                    message: '退出成功！',
                    type: 'success'
                });
            },
            amend(){
                this.addDialogVisible = true
            },
            refer(){
                getregistershopsMultidata(this.form.account,this.form.shopsname).then(res=>{
                    if (res.data.status == 200) {
                        this.addDialogVisible = false
                        getPersonReferMultidata(this.form.account).then(res=>{
                            if (res.data.status == 200){
                                this.form.shopsname = res.data.data[0].shop
                            }
                        })
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                    }
                })
            },
            shopping(){
                this.$router.push('/home')
            }
        }
    }
</script>

<style scoped>
    .garbage-system{
        padding: 25px;
    }
    .el-menu-vertical-demo {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        height: 661px;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .top-nav{
        padding-top: 20px;
    }
    .el-dropdown-link{
        position: relative;
        left: 1100px;
        cursor:pointer;
    }
    .shopping{
        position: relative;
        top: -5px;
        left: 50px;
    }
</style>