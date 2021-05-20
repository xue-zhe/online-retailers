<template>
    <div>
        <el-container class="container">
            <el-container>
                <el-header>
                    <Navtop></Navtop>
                </el-header>
                <router-view></router-view>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Navtop from "../navtop/Navtop";
    export default {
        name: 'Container',
        components: {Navtop},

    }
</script>
<style scoped>
    .el-menu{
        border-right: none;
    }
    .el-header {
        background-color: #373d41;
    }
    .el-main{
        background-color: #EAEDF1;
    }
</style>