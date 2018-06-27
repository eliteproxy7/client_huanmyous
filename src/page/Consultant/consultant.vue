<template>
    <div>
        <app-header></app-header>
        <el-row class="main" :gutter="30">
            <el-col :span="4" class="NavMenu">
                <div class="grid-content bg-purple">
                    <app-menu></app-menu>
                </div>
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
    import Header from '../../components/header.vue'
    import Footer from '../../components/footer.vue'
    import Menu from './leftMenu.vue'

    export default {
        data() {
            return {}
        },
        mounted() {
            if(localStorage.messageHeader && localStorage.messageContent){
                this.$notify.success({
                    title: '站内信：'+ localStorage.messageHeader,
                    dangerouslyUseHTMLString: true,//使用HTML片段
                    message: '<p>'+ localStorage.messageContent +'</p>',
                })
            }
        },
        computed: {},
        methods: {},
        components: {
            'app-header': Header,
            'app-footer': Footer,
            'app-menu': Menu,
        }
    }
</script>

<style scoped lang="less" type="text/less">
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
</style>
