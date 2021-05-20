<template>
    <div>
        <div>
            <el-menu
                    :default-active=" activeIndex2"
                    class="el-menu-demo"
                    mode="horizontal"
                    background-color="#373d41"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    @select="handleSelect"
                    :router="true">
                <el-menu-item index="/home">首页</el-menu-item>
                <el-menu-item index="/orders">订单</el-menu-item>
                <span class="username">{{form.username}}</span>
                <el-submenu index="/person" class="person" unique-opened>
                    <template slot="title">个人中心</template>
                    <el-menu-item index="/person">信息修改</el-menu-item>
                    <el-menu-item index="/personpassword">密码修改</el-menu-item>
                    <el-menu-item  @click="intomanagement">进入商品管理(成为商家)</el-menu-item>
                    <el-menu-item @click="loginout">注销</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>

        <!--商品店注册-->
        <el-dialog
                style="padding-top:0;padding-bottom: 0"
                title="注册商铺"
                :visible.sync="addDialogVisible"
                width="50%">
            <span>
                <el-form ref="form" :model="form" label-width="80px">
                   <el-form-item label="商铺名称">
                       <el-input v-model="form.shopsname"></el-input>
                   </el-form-item>
               </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="refer">确 定</el-button>
            </span>
        </el-dialog>
    </div>


</template>

<script>
    import {getPersonReferMultidata, getregistershopsMultidata} from "../../../network/person/person";

    export default {
        name: "Navtop",
        data() {
            return {
                form:{
                    account: '',
                    shopsname:'',
                    username:''
                },
                activeIndex2:'/',

                addDialogVisible:false
            }
        },
        created() {
            this.form.account = window.sessionStorage.getItem('account')
            getPersonReferMultidata(this.form.account).then(res=>{
                if (res.data.status == 200){
                    this.form.username = res.data.data[0].username
                }
            })
        },
        methods: {
            handleSelect(key, keyPath) {
            },
            /*注销*/
            loginout(){
                window.sessionStorage.clear()
                this.$router.push('/login')
                this.$message({
                    message: '退出成功！',
                    type: 'success'
                });
            },
            /**
             * 进入商品管理
             **/
            intomanagement(){
                getPersonReferMultidata(this.form.account).then(res=>{
                    if (res.data.status == 200) {
                        if(res.data.data[0].shop != null){
                            this.$router.push('/adminhome')
                        }else {
                            this.$confirm('你还没注册商铺, 是否注册?', '注册情况', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                this.addDialogVisible = true
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消注册！'
                                });
                                window.location.reload();
                            });
                        }
                    }
                })
            },
            refer(){
                getregistershopsMultidata(this.form.account,this.form.shopsname).then(res=>{
                    if(res.data.status == 200){
                        this.addDialogVisible = false
                        this.$router.push('/adminhome')
                        this.$message({
                            type: 'success',
                            message: '成功注册！'
                        });
                    }
                })
            },

        }
    }
</script>

<style scoped>
    .username{
        position: absolute;
        top: 18px;
        left: 1265px;
        color: #E9EEF3;
    }
    .person{
        position: absolute;
        top: 0px;
        right: 50px;
    }
    .el-menu{
        cursor:pointer;
    }
</style>