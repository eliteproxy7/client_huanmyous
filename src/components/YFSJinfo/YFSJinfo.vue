<template>
    <div>
        <header>
            <img v-lazy="'../../../static/img/logo.png'">
        </header>
        <el-row class="main" :gutter="30">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 30px 0; padding: 0 15px;">
                <el-breadcrumb-item :to="goBackHome()">返回账户主页</el-breadcrumb-item>
                <el-breadcrumb-item>优房数据公司介绍</el-breadcrumb-item>
            </el-breadcrumb>
            <el-col :span="4" class="NavMenu">
                <app-menu></app-menu>
            </el-col>
            <el-col :span="20" class="right-content">
                <div class="grid-content bg-purple">
                    <router-view></router-view>
                </div>
            </el-col>
        </el-row>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import Footer from '../../components/footer.vue';
    import Menu from '../../components/YFSJinfo/leftMenu.vue'

    export default {
        data() {
            return {}
        },
        mounted() {
        },
        methods: {
            //根据登录账户的角色id判断返回对应主页
            goBackHome(){
                let path;
                if (localStorage.roleId == 1) {
                    path = {path: '/company'};
                } else if (localStorage.roleId == 2) {
                    path = {path: '/consultant'};
                }
                return path;
            },
        },
        computed: {},
        components: {
            'app-footer': Footer,
            'app-menu': Menu,
        }
    }
</script>

<style scoped lang="less" type="text/less">
    body {
        background: #efeff1;
        header{
            width: 100%;
            padding: 15px 0;
            background: #fff;
            text-align: center;
            >img{
                max-width: 150px;
            }
        }
        .main {
            padding: 30px;
            .NavMenu {
                > div {
                    background: #fff;
                }
            }
            .right-content {
                > div {
                    background: #fff;
                    padding: 40px 30px;
                    min-height: 740px;
                }
            }
        }
    }
</style>
