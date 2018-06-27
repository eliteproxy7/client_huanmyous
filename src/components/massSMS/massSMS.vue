<template>
    <div>
        <app-header></app-header>
        <el-row class="main" :gutter="30">
            <el-col :span="4" class="NavMenu">
                <app-menu></app-menu>
            </el-col>
            <el-col :span="20" class="right-content">
                <div class="grid-content bg-purple">
                    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 0 0 30px 0;">
                        <el-breadcrumb-item :to="goBackHome()">返回账户主页</el-breadcrumb-item>
                        <el-breadcrumb-item>群发短信</el-breadcrumb-item>
                    </el-breadcrumb>
                    <router-view></router-view>
                </div>
            </el-col>
        </el-row>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import Header from '../../components/header.vue'
    import Footer from '../../components/footer.vue'
    import Menu from '../../components/massSMS/leftMenu.vue'

    export default {
        data() {
            return {
            }
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
            'app-header': Header,
            'app-footer': Footer,
            'app-menu': Menu,
        }
    }
</script>

<style scoped lang="less" type="text/less">
    body {
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
