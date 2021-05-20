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
                        <div class="title">密码找回</div>
                        <el-form ref="form" :model="form">
                            <el-form-item>
                                <el-input id="input-box" v-model="form.account"placeholder="请输入账号/手机号码"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input id="input-box" v-model="form.newpassword" placeholder="请输入新密码" show-password></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input id="input-box" v-model="form.password" placeholder="请再次确认新密码" show-password></el-input>
                            </el-form-item>
                            <el-form-item class="login-input-cold" placeholder="请输入验证码">
                                <el-input
                                        id="input-box"
                                        prefix-icon=""
                                        v-model="form.code"
                                        placeholder="请输入验证码"
                                        clearable
                                >
                                </el-input>
                                <div style="margin-top: 10px" @click="code" class="login-code">
                                    <span v-html="form.img"></span>
                                </div>
                            </el-form-item>
                        </el-form>
                        <el-button class="button" @click="amendpassword" type="primary">
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

    import {getVerificationMultidata} from "../../../network/verification/verification";
    import {getForgetPasswordMultidata} from "../../../network/login/login";
    export default {
        name: "Loginpassword",
        data() {
            return {
                form:{
                    account: '',
                    newpassword:'',
                    password:'',
                    code:'',
                    img:'',
                    recode:''
                },
            }
        },
        created() {
            this.form.account = window.sessionStorage.getItem('account')
            getVerificationMultidata().then(res => {
                this.form.img = res.data.img;
                this.form.recode = res.data.text
            })
        },
        methods: {
            //上传垃圾数据
            amendpassword() {
                if(this.form.code == this.form.recode){
                    getForgetPasswordMultidata(this.form.account,this.form.newpassword,this.form.password).then(res=>{
                        if(res.data.status == 200){
                            this.$router.push('/login')
                            this.$message({
                                message: res.data.msg,
                                type: 'success'
                            });
                        }else {
                            getVerificationMultidata().then(res => {
                                this.form.img = res.data.img;
                                this.form.recode = res.data.text
                            })
                            this.$message({
                                message: res.data,
                                type: 'warning'
                            });
                        }
                    })
                }else{
                    getVerificationMultidata().then(res => {
                        this.loginForm.img = res.data.img;
                        this.loginForm.recode = res.data.text
                        this.$message({
                            message: '验证码错误，请重新输入！',
                            type: 'warning'
                        });
                    })
                }
            },
            code(){
                getVerificationMultidata().then(res => {
                    this.form.img = res.data.img;
                    this.form.recode = res.data.text
                })
            }
        }
    }
</script>
<style scoped>
    #person{
        position: absolute;
        height: 100%;
        width: 100%;
        background-size: cover;
    }

    .person-box{
        position: relative;
        border-radius: 20px;
        background-color: #E9EEF3;
        width: 530px;
        top: 40px;
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
    .login-code{
        top: -58px;
        left: 290px;
        position: relative;
        width: 130px;
        height: 60px;
    }
    .login-input-cold{
        width: 55%;
    }
    .button{
        margin-top: -10px;
        width: 100%;
        border-radius: 20px;
    }
    #input-box{
        border-radius: 20px;
        width: 100%;
    }
</style>