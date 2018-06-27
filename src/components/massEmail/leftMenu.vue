<template>
    <div>
        <el-menu default-active="massEmail_sendEmail" class="el-menu-vertical-demo" router active-text-color="#0087e5" unique-opened :default-active="$route.path">
            <el-menu-item index="/massEmail_sendEmail">
                <i class="iconfont icon-faqiyoujianqunfa"></i>
                <span slot="title">群发邮件</span>
            </el-menu-item>
            <el-menu-item index="/massEmail_historyList">
                <i class="iconfont icon-duanxin-cehua-xinxixiangqing"></i>
                <span slot="title">邮件历史列表</span>
            </el-menu-item>
            <el-menu-item index="/massEmail_details">
                <i class="iconfont icon-youjian_hover"></i>
                <span slot="title">邮件详情</span>
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
