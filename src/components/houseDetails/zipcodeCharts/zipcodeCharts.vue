<template>
    <section class="houseDetails-public-header-content">
        <div class="header">
            <i></i>本区域数据图表
        </div>
        <div class="content clearfix">
            <el-row :gutter="30">
                <!--<el-col :span="8">
                    <averagehouseholdincome></averagehouseholdincome>
                </el-col>
                <el-col :span="8">
                    <UniversityEducation></UniversityEducation>
                </el-col>-->
                <el-col :span="12">
                    <unemployment></unemployment>
                </el-col>
                <el-col :span="12">
                    <commuteIndex></commuteIndex>
                </el-col>
                <!--<el-col :span="8">
                    <BlueCollarWhiteCollar></BlueCollarWhiteCollar>
                </el-col>
                <el-col :span="8">
                    <ethnic></ethnic>
                </el-col>
                <el-col :span="12">
                    <housePriceMedian></housePriceMedian>
                </el-col>
                <el-col :span="12">
                    <housePriceBurden></housePriceBurden>
                </el-col>-->
                <el-col :span="24">
                    <rentMedian></rentMedian>
                </el-col>
                <el-col :span="24">
                    <hosuePriceMOM></hosuePriceMOM>
                </el-col>
                <el-col :span="24">
                    <hosuePriceYOY></hosuePriceYOY>
                </el-col>
            </el-row>
        </div>
    </section>
</template>

<script>
    import averagehouseholdincome from './averagehouseholdincome.vue'    //房源详情页——本区域数据图表——平均家庭收入——柱状图
    import UniversityEducation from './UniversityEducation.vue'    //房源详情页——本区域数据图表——大学以上教育比例——柱状图
    import unemployment from './unemployment.vue'    //房源详情页——本区域数据图表——失业率——柱状图
    import commuteIndex from './commuteIndex.vue'    //房源详情页——本区域数据图表——通勤指数——饼图
    import BlueCollarWhiteCollar from './BlueCollarWhiteCollar.vue'    //房源详情页——本区域数据图表——蓝领/白领比例——饼图
    import ethnic from './ethnic.vue'    //房源详情页——本区域数据图表——族裔比例——饼图
    import housePriceMedian from './housePriceMedian.vue'    //房源详情页——本区域数据图表——本区域房屋售价中位数和本州对比——柱状图
    import housePriceBurden from './housePriceBurden.vue'    //房源详情页——本区域数据图表——本区域房价负担指数和本州对比——柱状图
    import rentMedian from './rentMedian.vue'    //房源详情页——本区域数据图表——本区域房租中位数走势——折线图
    import hosuePriceMOM from './hosuePriceMOM.vue'    //房源详情页——本区域数据图表——房价环比增长率——折线图
    import hosuePriceYOY from './hosuePriceYOY.vue'    //房源详情页——本区域数据图表——房价同比增长率——折线图

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
            'averagehouseholdincome': averagehouseholdincome,    //房源详情页——本区域数据图表——平均家庭收入——柱状图
            'UniversityEducation': UniversityEducation,    //房源详情页——本区域数据图表——大学以上教育比例——柱状图
            'unemployment': unemployment,    //房源详情页——本区域数据图表——失业率——柱状图
            'commuteIndex': commuteIndex,    //房源详情页——本区域数据图表——通勤指数——饼图
            'BlueCollarWhiteCollar': BlueCollarWhiteCollar,    //房源详情页——本区域数据图表——蓝领/白领比例——饼图
            'ethnic': ethnic,    //房源详情页——本区域数据图表——族裔比例——饼图
            'housePriceMedian': housePriceMedian,    //房源详情页——本区域数据图表——本区域房屋售价中位数和本州对比——柱状图
            'housePriceBurden': housePriceBurden,    //房源详情页——本区域数据图表——本区域房价负担指数和本州对比——柱状图
            'rentMedian': rentMedian,    //房源详情页——本区域数据图表——本区域房租中位数走势——折线图
            'hosuePriceMOM': hosuePriceMOM,    //房源详情页——本区域数据图表——房价环比增长率——折线图
            'hosuePriceYOY': hosuePriceYOY,    //房源详情页——本区域数据图表——房价同比增长率——折线图

        }
    }
</script>

<style scoped lang="less" type="text/less">
</style>
