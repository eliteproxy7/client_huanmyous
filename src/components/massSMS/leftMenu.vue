<template>
    <div>
        <el-menu default-active="massSMS_sendSMS" class="el-menu-vertical-demo" router active-text-color="#0087e5" unique-opened :default-active="$route.path">
            <el-menu-item index="/massSMS_sendSMS">
                <i class="iconfont icon-icon_sms"></i>
                <span slot="title">群发短信</span>
            </el-menu-item>
            <el-menu-item index="/massSMS_historyList">
                <i class="iconfont icon-duanxinzhongxin"></i>
                <span slot="title">短信历史列表</span>
            </el-menu-item>
            <el-menu-item index="/massSMS_details">
                <i class="iconfont icon-duanxin"></i>
                <span slot="title">短信详情</span>
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
