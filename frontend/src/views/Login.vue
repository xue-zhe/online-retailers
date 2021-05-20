<template>
    <div id="login">
        <el-row :gutter="20">
            <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="9">
                <img src="../assets/background.png" alt="" style="height: 100%;width: 100%">
            </el-col>
            <el-col :span="11">
                <div class="grid-content bg-purple">
                    <el-form  class="login-box" :model="loginForm" :rules="rules" ref="loginForm"  >
                        <h3 class="title">电商系统</h3>
                        <el-form-item prop="account" >
                            <el-input
                                    class="input-box"
                                    id="login-username"
                                    prefix-icon="el-icon-user"
                                    oninput="value=value.replace(/[^\d]/g,'')"
                                    v-model="loginForm.account"
                                    placeholder="请输入账号" clearable>
                            </el-input>
                        </el-form-item>
                        <el-form-item  prop="password">
                            <el-input
                                    id="login-password"
                                    show-password
                                    prefix-icon="el-icon-lock"
                                    v-model="loginForm.password"
                                    placeholder="请输入密码"
                                    clearable>
                            </el-input>
                        </el-form-item>
                        <el-form-item class="login-input-cold">
                            <el-input
                                    id="input-box"
                                    prefix-icon=""
                                    v-model="loginForm.code"
                                    placeholder="请输入验证码"
                                    clearable
                            >

                            </el-input>
                            <div style="margin-top: 10px" @click="code" class="login-code">
                                <span v-html="loginForm.img"></span>
                            </div>

                        </el-form-item>
                        <div class="login-hint">
                            <span @click="forget">忘记密码？</span>
                        </div>
                        <el-row>
                            <el-button id="login-button"  @click="Login" type="primary">
                                <span>登录</span>
                            </el-button>
                        </el-row>
                        <el-row>
                            <el-button class="register" @click="register" type="primary" style="border-radius: 20px">
                                <span>注册</span>
                            </el-button>
                        </el-row>
                        <!--验证码-->

                    </el-form>
                </div>
            </el-col>
            <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
        </el-row>

</div>

    
</template>
<script>
    import {getLoginMultidata} from  '../network/login/login'
    import {getVerificationMultidata} from "../network/verification/verification";

    export default {
        name: "Login",
        data(){
            return{
                loginForm:{
                    account:'',
                    password:'',
                    code:'',
                    img:'',
                    recode:''
                },
                rules: {
                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 11, max: 11, message: '请输入长度为11位的手机号码', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min:3,max:18,message:'请输入6-18位的密码',trigger: 'blur' }
                    ],
                },
            }
        },
        created() {
            getVerificationMultidata().then(res => {
                this.loginForm.img = res.data.img;
                this.loginForm.recode = res.data.text
            })
        },
        methods: {
            Login() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        if(this.loginForm.code == this.loginForm.recode){
                            getLoginMultidata(this.loginForm.account,this.loginForm.password).then(res => {
                                if(res.data.status == 205){
                                    window.sessionStorage.setItem('account',this.loginForm.account)
                                    this.$router.push('/adminhome')
                                    this.$message({
                                        message:  res.data.msg,
                                        type: 'success'
                                    });
                                }else{
                                    if (res.data.status == 200) {
                                        window.sessionStorage.setItem('account',this.loginForm.account)
                                        this.$router.push('/home')
                                        this.$message({
                                            message:  res.data.msg,
                                            type: 'success'
                                        });
                                    }else {
                                        if(res.data.status == 201){
                                            this.$message({
                                                message: res.data.msg,
                                                type: 'warning'
                                            });
                                            this.$router.push('/register')
                                        }else{
                                            this.$message.error('账号或密码错误！');
                                            getVerificationMultidata().then(res => {
                                                this.loginForm.img = res.data.img;
                                                this.loginForm.recode = res.data.text
                                            })
                                            window.sessionStorage.setItem('account',this.loginForm.account)
                                        }
                                    }
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
                    } else {
                        this.$message({
                            message: '请正确填写账号和密码！',
                            type: 'warning'
                        });
                    }
                })
            },
            register(){
                this.$router.push('/register')
            },
            forget(){
                this.$router.push('/loginpassword')
            },
            code() {
                getVerificationMultidata().then(res => {
                    this.loginForm.img = res.data.img;
                    this.loginForm.recode = res.data.text
                })
            }
        }
    }
</script>

<style >
     #login{
         position: absolute;
         display: flex;
         justify-content: center;
         align-items: center;
         width: 100%;
         height: 100%;
         background-size: cover;
     }
     .grid-content {
         border-radius: 4px;
         min-height: 36px;
     }
     .title {
         margin: 0 auto 30px auto;
         text-align: center;
         font-size: 18px;
         font-weight: 600;
         color: darkgrey;
     }
     .login-box{
         position:relative;
         border-radius: 20px;
         background-color: #E9EEF3;
         width: 450px;
         padding: 25px 25px 30px 25px;
     }
     .login-code{
         top: -58px;
         left: 255px;
         position: relative;
         width: 130px;
         height: 60px;
     }
     .login-input-cold{
          width: 50%;
      }

     .login-hint{
         position: relative;
         color: dodgerblue;
         top:-65px;
         cursor:pointer;
     }
     .login-hint{
         float: right;
     }
     #login-button{
         position: relative;
         top:-35px;
         width: 100%;
         border-radius: 20px;
     }
    .register{
        width: 100%;
        display: block;
        margin-top: -20px;
    }
    #input-box{
        border-radius: 20px;
    }
    #login-password{
        border-radius: 20px;
    }
    #login-username{
        border-radius: 20px;
    }
</style>