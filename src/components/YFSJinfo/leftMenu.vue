<template>
    <div>
        <el-menu default-active="companyIntroduce" class="el-menu-vertical-demo" router active-text-color="#0087e5" unique-opened :default-active="$route.path">
            <el-menu-item index="/companyIntroduce">
                <i class="iconfont icon-fangzi-copy"></i>
                <span slot="title">公司介绍</span>
            </el-menu-item>
            <el-menu-item index="/businessIntroduce">
                <i class="iconfont icon-business"></i>
                <span slot="title">业务介绍</span>
            </el-menu-item>
            <el-menu-item index="/useTerms">
                <i class="iconfont icon-chanpintiaokuan"></i>
                <span slot="title">使用条款</span>
            </el-menu-item>
            <el-menu-item index="/privacyAgreement">
                <i class="iconfont icon-xieyi"></i>
                <span slot="title">隐私协议</span>
            </el-menu-item>
            <el-menu-item index="/contactUS">
                <i class="iconfont icon-lianxiwomen"></i>
                <span slot="title">联系我们</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        computed: {},
        methods: {},
        components: {}
    }
</script>

<style scoped lang="less" type="text/less">
    body{
        .el-menu{
            border: none;
        }
    }
</style>
