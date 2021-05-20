<template>
    <div>
        <!--顶行栏-->
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="13">
                    <el-input placeholder="商品名称或类型或描述" v-model="index" clearable  @clear="getShopsListMultidata">
                        <el-button slot="append" icon="el-icon-search" @click="getShopslistMultidata"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="shopsadd">添加商品</el-button>
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
                    width="120">
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
            <el-table-column type="expand"  label="轮播图图片">
                <template slot-scope="scope">
                    <el-image
                            style="width: 160px; height: 160px; margin-right: 10px  "
                            :src="scope.row.imgs1"
                    ></el-image>
                    <el-image
                            style="width: 160px; height: 160px; margin-right: 10px"
                            :src="scope.row.imgs2"
                    ></el-image>
                    <el-image
                            style="width: 160px; height: 160px; margin-right: 10px"
                            :src="scope.row.imgs3"
                    ></el-image>
                    <el-image
                            style="width: 160px; height: 160px; margin-right: 10px"
                            :src="scope.row.imgs4"
                    ></el-image>
                </template>
            </el-table-column>
            <el-table-column
                    prop="goods"
                    label="商品名称"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="商品类型"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="oldprice"
                    label="商品原价格"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="商品优惠价格"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="商品简介"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="stock"
                    label="商品库存"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="c"
                    label="操作"
                    width="360">
                <template slot-scope="scope" >
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="EditDialogVisible(scope.row.id)">修改</el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="DeleteDialogVisible(scope.row.id)">删除</el-button>
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
        <!--商品信息修改-->
        <el-dialog
                style="padding-top:0;padding-bottom: 0"
                title="修改用户信息"
                :visible.sync="editDialogVisible"
                width="50%">
            <span>
               <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="商品名称">
                       <el-input v-model="form.goods"></el-input>
                   </el-form-item>
                   <el-form-item label="商品类型">
                       <el-select v-model="form.type" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                       </el-select>
                   </el-form-item>
                   <el-form-item label="商品简介">
                       <el-input v-model="form.description" ></el-input>
                   </el-form-item>
                    <el-form-item label="商品价格">
                       <el-input oninput="value=value.replace(/[^\d]/g,'')"  v-model="form.price"></el-input>
                   </el-form-item>
                   <el-form-item label="商品库存">
                       <el-input oninput="value=value.replace(/[^\d]/g,'')" v-model="form.stock"></el-input>
                   </el-form-item>

                   <span v-for="(url,index) in form.imgslist" :key="index">
                       <el-image
                               style="width: 160px; height: 160px; margin-right: 10px"
                               :src='url'>
                        </el-image>
                   </span>
                    <el-upload
                            :action="uploadurl"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success="handlesuccess1"
                            list-type="picture">
                       <el-button size="mini" type="primary" class="upload">上传详情图片一</el-button>
                   </el-upload>
                    <el-upload
                            :action="uploadurl"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success="handlesuccess2"
                            list-type="picture">
                       <el-button size="mini" type="primary" class="upload">上传详情图片二</el-button>
                   </el-upload>
                    <el-upload
                            :action="uploadurl"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success="handlesuccess3"
                            list-type="picture">
                       <el-button size="mini" type="primary" class="upload">上传详情图片三</el-button>
                   </el-upload>
                    <el-upload
                            :action="uploadurl"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success="handlesuccess4"
                            list-type="picture">
                       <el-button size="mini" type="primary" class="upload">上传详情图片四</el-button>
                   </el-upload>
                   <el-image
                             style="width: 160px; height: 160px"
                             :src='form.img'>
                   </el-image>
                   <el-upload
                           :action="uploadurl"
                           :on-preview="handlePreview"
                           :on-remove="handleRemove"
                           :on-success="handlesuccess"
                           list-type="picture">
                       <el-button size="mini" type="primary" class="upload">商品图片上传</el-button>
                   </el-upload>
               </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="getshopseditMultidata">确 定</el-button>
            </span>
        </el-dialog>
        <!--商品添加-->
        <el-dialog
                style="padding-top:0;padding-bottom: 0"
                title="添加商品"
                :visible.sync="addDialogVisible"
                width="50%">
            <span>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="商品名称">
                       <el-input v-model="form.goods"></el-input>
                   </el-form-item>
                   <el-form-item label="商品类型">
                       <el-select v-model="form.type" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                       </el-select>
                   </el-form-item>
                   <el-form-item label="商品简介">
                       <el-input v-model="form.description" ></el-input>
                   </el-form-item>
                    <el-form-item label="原价格">
                       <el-input oninput="value=value.replace( /(([1-9][0-9]*)\.([0-9]{3}))|[0]\.([0-9]{3})/,'')" v-model="form.oldprice"></el-input>
                   </el-form-item>
                    <el-form-item label="优惠价格">
                       <el-input oninput="value=value.replace(/(([1-9][0-9]*)\.([0-9]{3}))|[0]\.([0-9]{3})/,'')" v-model="form.price"></el-input>
                   </el-form-item>
                   <el-form-item label="商品库存">
                       <el-input oninput="value=value.replace(/[^\d]/g,'')" v-model="form.stock"></el-input>
                   </el-form-item>
                   <el-upload
                             :action="uploadurl"
                             :on-preview="handlePreview"
                             :on-remove="handleRemove"
                             :on-success="handlesuccess"
                             list-type="picture">
                       <el-button size="mini" type="primary" class="upload">商品图片上传</el-button>
                   </el-upload>
                    <el-upload
                            :action="uploadurl"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success="handlesuccess1"
                            list-type="picture">
                       <el-button size="mini" type="primary" class="upload">商品图片上传1</el-button>
                   </el-upload>
                    <el-upload
                            :action="uploadurl"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success="handlesuccess2"
                            list-type="picture">
                       <el-button size="mini" type="primary" class="upload">商品图片上传2</el-button>
                   </el-upload>
                    <el-upload
                            :action="uploadurl"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success="handlesuccess3"
                            list-type="picture">
                       <el-button size="mini" type="primary" class="upload">商品图片上传3</el-button>
                   </el-upload>
                    <el-upload
                            :action="uploadurl"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success="handlesuccess4"
                            list-type="picture">
                       <el-button size="mini" type="primary" class="upload">商品图片上传4</el-button>
                   </el-upload>
               </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="getshopsaddMultidata">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

    import {getShopsListMultidata,
        getshopslistMultidata,
        getShopslistMultidata,
        getshopseditMultidata,
        getshopsdeleteMultidata,
        getshopsaddMultidata} from "../../../network/adminshops/adminshopslist";
    import {getPersonReferMultidata} from "../../../network/person/person";

    export default {
        name: "ShopsInformation",
        data() {
            return {
                form:{
                    id:'',
                    goods: '',
                    type: '',
                    price:'',
                    oldprice:'',
                    description:'',
                    stock:'',
                    img:'',
                    shops:'',
                    account:'',
                    imgslist:[]
                },
                options: [{
                    value: '图书、音像、电子书刊',
                    label: '图书、音像、电子书刊'
                }, {
                    value: '手机',
                    label: '手机'
                }, {
                    value: '数码',
                    label: '数码'
                }, {
                    value: '家居家装',
                    label: '家居家装'
                }, {
                    value: '电脑、办公',
                    label: '电脑、办公'
                },{
                    value: '厨具',
                    label: '厨具'
                },{
                    value: '个护化妆',
                    label: '个护化妆'
                },{
                    value: '服饰内衣',
                    label: '服饰内衣'
                },{
                    value: '钟表',
                    label: '钟表'
                },{
                    value: '鞋靴',
                    label: '鞋靴'
                },{
                    value: '母婴',
                    label: '母婴'
                },{
                    value: '礼品箱包',
                    label: '礼品箱包'
                },{
                    value: '食品饮料、保健食品',
                    label: '食品饮料、保健食品'
                },{
                    value: '珠宝',
                    label: '珠宝'
                },{
                    value: '汽车用品',
                    label: '汽车用品'
                },{
                    value: '运动健康',
                    label: '运动健康'
                },{
                    value: '玩具乐器',
                    label: '玩具乐器'
                },{
                    value: '彩票、旅行、充值、票务',
                    label: '彩票、旅行、充值、票务'
                },{
                    value: '生鲜',
                    label: '生鲜'
                },{
                    value: '整车',
                    label: '整车'
                },
                ],
                value: '',
                index:'',
                tableData: [],
                page:1,
                pagesize:10,
                total:0,
                uploadurl:'http://localhost:5000/imgs/upload',
                previewpath:'',
                editDialogVisible:false,
                editDialogVisibles:false,
                addDialogVisible:false,
                permissionDialogVisible:false,
            }
        },
        created() {
            this.form.account = window.sessionStorage.getItem('account')
            getShopsListMultidata(this.page,this.pagesize,this.form.account).then(res=>{
                this.tableData=res.data.result.data
                this.total = res.data.total[0].total
            })
            getPersonReferMultidata(this.form.account).then(res=>{
                if (res.data.status == 200) {
                   this.form.shops = res.data.data[0].shop
                }
            })
        },
        methods:{
            //图片预览效果
            handlePreview(file){
                this.previewpath=file.response
            },
            //处理移除操作
            handleRemove(){
            },
            //上传成功的处理函数
            handlesuccess(response){
                this.form.img= response.url
            },
            //处理上传上传数组的图片
            handlesuccess1(response){
                this.form.imgslist[0] = response.url

            },
            handlesuccess2(response){
                this.form.imgslist[1] = response.url

            },
            handlesuccess3(response){
                this.form.imgslist[2] = response.url

            },
            handlesuccess4(response){
                this.form.imgslist[3] = response.url

            },

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
                getShopsListMultidata(this.page,this.pagesize,this.form.account).then(res=>{
                    this.tableData=res.data.result.data
                    this.total = res.data.total[0].total
                })
            },

            /**
             *添加商品
             * */
            shopsadd(){
                this.addDialogVisible = true
            },
            getshopsaddMultidata(){
                getshopsaddMultidata(
                    this.form.account,
                    this.form.goods,
                    this.form.type,
                    this.form.price,
                    this.form.oldprice,
                    this.form.description,
                    this.form.stock,
                    this.form.img,
                    this.form.shops,
                    this.form.imgslist).then(res=>{
                    console.log(res.data)
                    if(res.data.status == 200){
                        this.addDialogVisible = false
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                        location.reload();
                    }else {
                        this.$message({
                            message: '添加失败！',
                            type: 'success'
                        });
                    }
                })

            },
            /**
             * 商品搜索
             * */
            getShopslistMultidata(){
                getShopslistMultidata(this.page,this.pagesize,this.index,).then(res=>{
                    this.tableData=res.data.result.data
                    this.total = res.data.total[0].total

                })
            },
            //取消搜索时
            getShopsListMultidata(){
                getShopsListMultidata(this.page,this.pagesize,this.form.account).then(res=>{
                    this.tableData=res.data.result.data
                    this.total = res.data.total[0].total
                })
            },
            /**
             * 修改商品信息
             * */
            EditDialogVisible(id){
                this.editDialogVisible=true
                this.form.id= id
                getshopslistMultidata(this.page,this.pagesize,this.form.id,).then(res=>{
                    this.form.imgslist = res.data.imglist
                    this.form.goods = res.data.result.data[0].goods
                    this.form.type = res.data.result.data[0].type
                    this.form.price = res.data.result.data[0].price
                    this.form.description = res.data.result.data[0].description
                    this.form.stock = res.data.result.data[0].stock
                    this.form.img = res.data.result.data[0].imgs
                })
            },
            getshopseditMultidata(){
                getshopseditMultidata(this.form.goods,this.form.type,
                    this.form.price, this.form.description,
                    this.form.stock, this.form.img,this.form.id,this.form.imgslist).then(res=>{
                    if(res.data.status == 200){
                        this.editDialogVisible = false
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                        location.reload();
                    }else{
                            this.$message({
                                message: '修改失败！',
                                type: 'warning'
                            })
                        }
                })
            },


            /**
             * 进行商品删除
             * */
            DeleteDialogVisible(id){
                getshopsdeleteMultidata(id).then(res=>{
                    this.$confirm('是否进行商品删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        if(res.data.status == 200){
                            location.reload();
                            this.$message({
                                message: '删除成功！',
                                type: 'success'
                            });
                            location.reload();
                        }else {
                                this.$message({
                                    message: '删除失败！',
                                    type: 'warning'
                                })
                        }
                    })
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
    .permissionbutton{
        margin: 30px 0;
    }
    .permission{
        margin: 20px 0;
    }
    .upload{
        margin-bottom: 10px;
        margin-top: 10px;
    }
</style>