<template>
    <div>
        <el-menu default-active="consultant_details" class="el-menu-vertical-demo" router active-text-color="#0087e5" unique-opened :default-active="$route.path">
            <el-menu-item index="/consultant_details">
                <i class="iconfont icon-gerenjibenxinxi"></i>
                <span slot="title">本人信息</span>
            </el-menu-item>
            <el-submenu index="/consultant_clientList">
                <template slot="title">
                    <i class="iconfont icon-client-list"></i>
                    <span>客户管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/consultant_clientList">
                        <i class="iconfont icon-client-list"></i>
                        <span>客户列表</span>
                    </el-menu-item>
                    <el-menu-item index="/consultant_clientCreateModify">
                        <i class="iconfont icon-caigoudingdankehudinghuochuangjian"></i>
                        <span>创建和编辑客户</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/consultant_houseList">
                <i class="iconfont icon-fangyuanliebiao"></i>
                <span slot="title">分享房源</span>
            </el-menu-item>
            <el-submenu index="/consultant_shareGroupList">
                <template slot="title">
                    <i class="iconfont icon-lishi"></i>
                    <span>分享组管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/consultant_shareGroupList">
                        <i class="iconfont icon-lishi"></i>
                        <span>分享组列表</span>
                    </el-menu-item>
                    <el-menu-item index="/consultant_shareGroupDetails">
                        <i class="iconfont icon-tongyongleifenzugongxiang"></i>
                        <span>分享组详情</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/consultant_messageList">
                <i class="iconfont icon-lingdang"></i>
                <span slot="title">站内信列表</span>
            </el-menu-item>
            <el-menu-item index="/massSMS">
                <i class="iconfont icon-icon_sms"></i>
                <span slot="title">群发短信</span>
            </el-menu-item>
            <el-menu-item index="/massEmail">
                <i class="iconfont icon-faqiyoujianqunfa"></i>
                <span slot="title">群发邮件</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>

<style scoped lang="less" type="text/less">
    body{
        .el-menu{
            border: none;
        }
    }
</style>
