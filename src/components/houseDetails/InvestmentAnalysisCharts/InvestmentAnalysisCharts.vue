<template>
    <section class="houseDetails-public-header-content">
        <div class="header">
            <i></i>投资分析数据图表
        </div>
        <div class="content clearfix">
            <el-row :gutter="30">
                <el-col :span="12">
                    <forecastRentReturn></forecastRentReturn>
                </el-col>
                <el-col :span="12">
                    <thisHouseNextYearForecastPrice></thisHouseNextYearForecastPrice>
                </el-col>
                <el-col :span="24">
                    <nearDealSituation></nearDealSituation>
                </el-col>
            </el-row>
        </div>
    </section>
</template>

<script>
    import forecastRentReturn from './forecastRentReturn.vue'    //房源详情页——投资分析——本区域预估租金回报——折线图
    import thisHouseNextYearForecastPrice from './thisHouseNextYearForecastPrice.vue'    //房源详情页——投资分析——此房源明年房价预测——柱状图
    import nearDealSituation from './nearDealSituation.vue'    //房源详情页——投资分析——附近地区成交情况——表格

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
        components: {
            'forecastRentReturn': forecastRentReturn,    //房源详情页——投资分析——本区域预估租金回报——折线图
            'thisHouseNextYearForecastPrice': thisHouseNextYearForecastPrice,    //房源详情页——投资分析——此房源明年房价预测——柱状图
            'nearDealSituation': nearDealSituation,    //房源详情页——投资分析——附近地区成交情况——表格
        }
    }
</script>

<style lang="less" type="text/less">
    body {

    }
</style>
