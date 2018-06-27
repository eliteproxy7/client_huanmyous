<template>
    <section class="houseDetails-public-header-content">
        <div class="header">
            <i></i>homejunction数据
        </div>
        <div class="content clearfix">
            <el-row :gutter="30">
                <el-col :span="24">
                    <school></school>
                </el-col>
                <el-col :span="24">
                    <age></age>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12">
                    <homejunction-area></homejunction-area>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12">
                    <education></education>
                </el-col>
                <el-col :span="24">
                    <livingCost></livingCost>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12">
                    <crime></crime>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12">
                    <gender></gender>
                </el-col>
                <el-col :span="24">
                    <employment></employment>
                </el-col>
                <el-col :span="24">
                    <households></households>
                </el-col>
                <el-col :span="24">
                    <income></income>
                </el-col>
                <el-col :span="24">
                    <population></population>
                </el-col>
                <el-col :span="24">
                    <race></race>
                </el-col>
                <el-col :span="24">
                    <weather></weather>
                </el-col>
            </el-row>

        </div>
    </section>

</template>

<script>
    import school from './school.vue'    //房源详情页——homejunction数据——学校——table和图表
    import age from './age.vue'    //房源详情页——homejunction数据——年龄统计——柱状图和饼图
    import area from './area.vue'    //房源详情页——homejunction数据——面积统计——饼图
    import livingCost from './livingCost.vue'    //房源详情页——homejunction数据——生活成本——柱状图
    import crime from './crime.vue'    //房源详情页——homejunction数据——犯罪指数——柱状图
    import education from './education.vue'    //房源详情页——homejunction数据——教育比例——饼图
    import employment from './employment.vue'    //房源详情页——homejunction数据——就业比例——饼图
    import gender from './gender.vue'    //房源详情页——homejunction数据——性别比例——饼图
    import households from './households.vue'    //房源详情页——homejunction数据——households指数——柱状图+文字
    import income from './income.vue'    //房源详情页——homejunction数据——家庭收入统计——柱状图和饼图
    import population from './population.vue'    //房源详情页——homejunction数据——人口统计——柱状图+文字
    import race from './race.vue'    //房源详情页——homejunction数据——种族比例——2个饼图
    import weather from './weather.vue'    //房源详情页——homejunction数据——天气指数——折线图、柱状图和文字

    export default {
        data() {
            return {
                houseId: this.$route.query.houseId,
                homejunctionDataShow: false,    //homejunction子组件是否加载

            }
        },
        computed: {
        },
        created() {
        },
        mounted() {
            this.getHomejunctionData();
        },
        methods: {
            //获取homejunction数据
            getHomejunctionData() {
                this.$get('/report/periphery/' + this.houseId).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        console.log(data.data)
                        this.homejunctionDataShow = true;
                        this.$store.commit('set_homejunctionData', data.data);

                    } else {
                    }
                });
            },


        },
        components: {
            'school': school, //房源详情页——homejunction数据——学校——table和图表
            'age': age, //房源详情页——homejunction数据——年龄统计——柱状图和饼图
            'homejunction-area': area, //房源详情页——homejunction数据——面积统计——饼图
            'livingCost': livingCost, //房源详情页——homejunction数据——生活成本——柱状图
            'crime': crime, //房源详情页——homejunction数据——犯罪指数——柱状图
            'education': education, //房源详情页——homejunction数据——教育比例——饼图
            'employment': employment, //房源详情页——homejunction数据——就业比例——饼图
            'gender': gender, //房源详情页——homejunction数据——性别比例——饼图
            'households': households, //房源详情页——homejunction数据——households指数——柱状图+文字
            'income': income, //房源详情页——homejunction数据——家庭收入统计——柱状图和饼图
            'population': population, //房源详情页——homejunction数据——人口统计——柱状图+文字
            'race': race, //房源详情页——homejunction数据——种族比例——2个饼图
            'weather': weather, //房源详情页——homejunction数据——天气指数——折线图、柱状图和文字


        }
    }
</script>

<style scoped lang="less" type="text/less">
</style>
