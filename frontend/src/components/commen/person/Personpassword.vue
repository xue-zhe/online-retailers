<template>
    <div id="person">
        <el-row :gutter="20">
            <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="9">
                <img src="../../../assets/background.png" alt="" style="height: 100%;width: 100%">
            </el-col>
            <el-col :span="11">
                <div class="person-box grid-content bg-purple">
                    <div class="person-message">
                        <div class="title">个人中心</div>
                        <el-form ref="form" :model="form">
                            <el-form-item>
                                <el-input :disabled="true" v-model="form.account" placeholder="请输入用户账号" id="input-box"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="form.oldpassword" placeholder="请输入旧密码" id="input-box" show-password></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="form.newpassword" placeholder="请输入新密码" id="input-box" show-password></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="form.password" placeholder="再次确认新密码" id="input-box" show-password></el-input>
                            </el-form-item>
                        </el-form>
                        <el-button class="button"  @click="amendpassword" type="primary">
                            <span>修改密码</span>
                        </el-button>
                    </div>
                </div>
            </el-col>
            <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
        </el-row>

    </div>
</template>

<script>
    import {getPersonPasswordMultidata} from "../../../network/person/person";

    export default {
        name: "Personpassword",
        data() {
            return {
                form:{
                    account: '',
                    oldpassword:'',
                    newpassword:'',
                    password:''
                },
            }
        },
        created() {
            this.form.account = window.sessionStorage.getItem('account')
        },
        methods: {
            amendpassword() {
                getPersonPasswordMultidata(this.form.account,this.form.oldpassword,this.form.newpassword,this.form.password).then(res=>{
                    if (res.data.status == 200){
                        this.$message({
                            message:res.data.msg,
                            type: 'success'
                        });
                        this.$router.push('/person')
                    }else {
                        this.$message({
                            message:res.data,
                            type: 'warning'
                        });
                    }
                })
            }


        }
    }
</script>

<style scoped>
    #person{
        height: 660px;
        width: 99%;
        background-size: cover;
    }

    .person-box{
        position: relative;
        border-radius: 20px;
        background-color: #E9EEF3;
        width: 450px;
        top: 40px;
        left: 30px;
    }
    .title{
        margin: 0 auto 30px auto;
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        color: darkgrey;
    }
    .person-message{
        padding: 20px;
    }
    .button{
        margin-bottom: 10px;
        width: 100%;
        border-radius: 20px;
    }
    .el-button+.el-button{
        margin-left: 0;
    }
</style>