<template>
    <div>
        <app-header></app-header>
        <el-row type="flex" class="row-bg main" justify="center">
            <el-col :xs="23" :sm="23" :md="22" :lg="22" :xl="16" class="content">
                <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 30px 0;">
                    <el-breadcrumb-item :to="goBackHome()">返回账户主页</el-breadcrumb-item>
                    <el-breadcrumb-item>房源详情</el-breadcrumb-item>
                </el-breadcrumb>
                <photo></photo>
                <basicInfo></basicInfo>
                <characteristicsInfo></characteristicsInfo>
                <houseIntroduction></houseIntroduction>
                <school></school>

                <homejunction></homejunction>

                <zipcodeCharts></zipcodeCharts>
                <InvestmentAnalysisCharts></InvestmentAnalysisCharts>
                <houseTransactionHistory></houseTransactionHistory>
                <loanCalculator></loanCalculator>
                <surroundingSimilarHouse></surroundingSimilarHouse>
            </el-col>
        </el-row>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import Header from '../../components/header.vue';
    import Footer from '../../components/footer.vue';
    import houseDetails_photo from './photo.vue'    //房源详情页——轮播图
    import houseDetails_basicInfo from './basicInfo.vue'    //房源详情页——基本信息
    import houseDetails_characteristicsInfo from './characteristicsInfo.vue'    //房源详情页——房源特征
    import houseDetails_houseIntroduction from './houseIntroduction.vue'    //房源详情页——房源介绍
    import houseDetails_school from './school.vue'    //房源详情页——学校
    import houseDetails_zipcodeCharts from './zipcodeCharts/zipcodeCharts.vue'    //房源详情页——本区域数据图表
    import houseDetails_InvestmentAnalysisCharts from './InvestmentAnalysisCharts/InvestmentAnalysisCharts.vue'    //房源详情页——投资分析数据图表
    import houseDetails_houseTransactionHistory from './houseTransactionHistory.vue'    //房源详情页——本房源成交历史记录
    import houseDetails_loanCalculator from './loanCalculator.vue'    //房源详情页——贷款计算器
    import houseDetails_surroundingSimilarHouse from './surroundingSimilarHouse.vue'    //房源详情页——周边相似房源

    import homejunction from './homejunction/homejunction.vue'    //homejunction数据


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
            'app-header': Header,
            'app-footer': Footer,
            'photo': houseDetails_photo,    //房源详情页——轮播图
            'basicInfo': houseDetails_basicInfo,    //房源详情页——基本信息
            'characteristicsInfo': houseDetails_characteristicsInfo,    //房源详情页——房源特征
            'houseIntroduction': houseDetails_houseIntroduction,    //房源详情页——房源介绍
            'school': houseDetails_school,  //房源详情页——学校
            'zipcodeCharts': houseDetails_zipcodeCharts,    //房源详情页——本区域数据图表
            'InvestmentAnalysisCharts': houseDetails_InvestmentAnalysisCharts,  //房源详情页——投资分析数据图表
            'houseTransactionHistory': houseDetails_houseTransactionHistory,    //房源详情页——本房源成交历史记录
            'loanCalculator': houseDetails_loanCalculator,  //房源详情页——贷款计算器
            'surroundingSimilarHouse': houseDetails_surroundingSimilarHouse,    //房源详情页——周边相似房源

            'homejunction': homejunction,    //homejunction数据

        }
    }
</script>

<style lang="less" type="text/less">
    body {
        .main {
            padding: 30px;
            .content {
                .houseDetails-public-header-content {
                    margin: 50px 0;
                    border-radius: 5px;
                    overflow: hidden;
                    background: #fff;
                    >.header {
                        font-size: 20px;
                        color: #000;
                        text-indent: 20px;
                        padding: 15px 0;
                        border-bottom: 1px solid #e5e5e7;
                        > i {
                            width: 5px;
                            height: 26px;
                            float: left;
                            background: #00b6ef;
                        }
                    }
                    >.content {
                        padding: 30px;
                        width: 100%;
                        overflow: hidden;
                        .echart-chart {
                            margin: 30px 0;
                            padding: 0;
                            > .inside {
                                border: 1px solid #dee2e5;
                                padding: 0;
                                > header {
                                    padding: 13px 20px;
                                    background: #dbf1ff;
                                    font-size: 17px;
                                    color: #3e403f;
                                    border-bottom: 1px solid #dee2e5;
                                }
                                > .chartBox {
                                    width: 100%;
                                    min-height: 300px;
                                    text-align: center;
                                    position: relative;
                                    >.el-radio-group{
                                        padding: 15px 0;
                                        >.el-radio+.el-radio{
                                            margin-left: 15px;
                                        }
                                    }
                                    >.regionType-button{
                                        >div {
                                            padding: 10px;
                                            float: right;
                                        }
                                    }
                                    >.chart-div {
                                        width: 100%;
                                        height: 250px;
                                    }
                                    > p {
                                        font-size: 14px;
                                        color: #23bff0;
                                        text-align: center;
                                        margin: 5px 0;
                                    }
                                    >h4 {
                                        min-height: 300px;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        font-size: 20px;
                                        color: #000;
                                        text-align: center;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
