<template>
    <div>
        <el-menu default-active="companyDetails" class="el-menu-vertical-demo" router active-text-color="#0087e5" unique-opened :default-active="$route.path">
            <el-submenu index="/company_details">
                <template slot="title">
                    <i class="iconfont icon-gongsiguanli"></i>
                    <span>公司信息管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/company_details">
                        <i class="iconfont icon-fangzi-copy"></i>
                        <span>公司信息</span>
                    </el-menu-item>
                    <el-menu-item index="/company_modify">
                        <i class="iconfont icon-xiugai"></i>
                        <span>修改公司信息</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/company_houseList">
                <i class="iconfont icon-fangyuanliebiao"></i>
                <span slot="title">推荐房源</span>
            </el-menu-item>
            <el-submenu index="/company_clientList">
                <template slot="title">
                    <i class="iconfont icon-client-list"></i>
                    <span>客户管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/company_clientList">
                        <i class="iconfont icon-client-list"></i>
                        <span>客户列表</span>
                    </el-menu-item>
                    <el-menu-item index="/company_clientDetails">
                        <i class="iconfont icon-kehuxiangqing"></i>
                        <span>客户详情</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="/company_consultantList">
                <template slot="title">
                    <i class="iconfont icon-guwenguanli"></i>
                    <span>顾问管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/company_consultantList">
                        <i class="iconfont icon-guwenguanli"></i>
                        <span>顾问列表</span>
                    </el-menu-item>
                    <el-menu-item index="/company_consultantDetails">
                        <i class="iconfont icon-zhuce"></i>
                        <span>顾问详情</span>
                    </el-menu-item>
                    <el-menu-item index="/company_consultantCreateModify">
                        <i class="iconfont icon-aecreatekpi"></i>
                        <span>创建修改顾问</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="/company_ownHouseList">
                <template slot="title">
                    <i class="iconfont icon-fangyuanliebiao"></i>
                    <span>公司自有房源管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/company_ownHouseList">
                        <i class="iconfont icon-fangyuanliebiao"></i>
                        <span>公司自有房源列表</span>
                    </el-menu-item>
                    <el-menu-item index="/company_uplodeOwnHouse">
                        <i class="iconfont icon-submit"></i>
                        <span>上传修改自有房源</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/company_landingPageModify">
                <i class="iconfont icon-xiugai"></i>
                <span slot="title">公司落地页配置</span>
            </el-menu-item>
            <el-submenu index="/company_homePageList">
                <template slot="title">
                    <i class="iconfont icon-gongsiguanli"></i>
                    <span>公司二级主页管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/company_homePageList">
                        <i class="iconfont icon-gongsiguanli"></i>
                        <span>公司二级主页列表</span>
                    </el-menu-item>
                    <el-menu-item index="/company_homePageCreateModify">
                        <i class="iconfont icon-gongsizhuye"></i>
                        <span>新建修改二级主页</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="/company_messageList">
                <template slot="title">
                    <i class="iconfont icon-zhanneixin"></i>
                    <span>站内信管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/company_messageList">
                        <i class="iconfont icon-zhanneixin"></i>
                        <span>站内信列表</span>
                    </el-menu-item>
                    <el-menu-item index="/company_messageSend">
                        <i class="iconfont icon-lingdang"></i>
                        <span>发送站内信</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/company_statisticalDataChart">
                <i class="iconfont icon-shujutongji"></i>
                <span slot="title">统计数据图表</span>
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

<style scoped>
    .el-menu {
        border: none;
    }
</style>
