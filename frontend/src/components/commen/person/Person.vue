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
                        <el-form ref="form" :model="form" >
                            <el-form-item>
                                <el-input :disabled="true" placeholder="用户账号" id="input-box" v-model="form.account"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="form.name" placeholder="用户名" id="input-box"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="form.address" placeholder="用户地址" id="input-box"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="form.phone" placeholder="用户电话" id="input-box"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-button class="button"  @click="amendinformation" type="primary" style="margin-top: 20px">
                            <span>信息修改</span>
                        </el-button>
                    </div>
                </div>
            </el-col>
            <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
        </el-row>

    </div>
</template>

<script>
    import {getPersonReferMultidata,getPersonAmendMultidata} from "../../../network/person/person";

    export default {
        name: "Person",
        data() {
            return {
                form:{
                    account: '',
                    name: '',
                    phone: '',
                    address:'',
                    shop:'',
                },
            }
        },
        created() {
            this.form.account = window.sessionStorage.getItem('account')
            getPersonReferMultidata(this.form.account).then(res=>{
                if (res.data.status == 200){
                    this.form.name = res.data.data[0].username
                    this.form.address = res.data.data[0].address
                    this.form.phone = res.data.data[0].phone
                    this.$message({
                        message: '加载成功！',
                        type: 'success'
                    });
                }
            })
        },
        methods: {
            amendinformation(){
                getPersonAmendMultidata(this.form.phone,this.form.name,
                    this.form.account, this.form.address).then(res=>{
                        if (res.data.status == 200) {
                            this.$message({
                                message: res.data.msg,
                                type: 'success'
                            });
                            window.location.reload();
                        }
                    })
            },
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
        width: 520px;
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
    #input-box{
       border-radius: 20px;
        width: 100%;
    }
</style>