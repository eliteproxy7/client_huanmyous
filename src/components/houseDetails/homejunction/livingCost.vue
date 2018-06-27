<template>
    <article class="echart-chart">
        <div class="inside">
            <header>生活成本指数</header>
            <div class="chartBox clearfix" style="height: 360px;">
                <div class="regionType-button clearfix" v-show="!chartNoDataShow">
                    <el-button-group>
                        <el-button type="primary" v-for="(item, key, index) in LivingCostData" :key="index" v-if="item" size="mini" @click="regionTypeChange(key)">{{key}}</el-button>
                    </el-button-group>
                </div>
                <div class="chart-div" id="livingCost-chart" v-show="!chartNoDataShow" style="height: 310px;"></div>
                <h4 ref="livingCost_chart_NoData" v-show="chartNoDataShow"></h4>
            </div>
            <p v-show="false">{{getLivingCost}}</p>
        </div>
    </article>
</template>

<script>
    export default {
        data() {
            return {
                LivingCostData: null,//生活成本数据
                stateLivingCostData: null,//州——生活成本数据
                cityLivingCostData: null,//城市——生活成本数据
                zipLivingCostData: null,//邮编——生活成本数据
                countyLivingCostData: null,//郡县——生活成本数据
                neighbourhoodLivingCostData: null,//附近——生活成本数据

                livingCostMyEcharts: '',//生活成本——饼图
                regionType: 'state',//地区级别

                chartNoDataShow: false, //判断是否有无数据
            }
        },
        computed: {
            getLivingCost() {
                if(this.$store.getters.get_homejunctionData.costs){
                    this.LivingCostData = this.$store.getters.get_homejunctionData.costs;
                    this.stateLivingCostData = this.$store.getters.get_homejunctionData.costs.state;
                    this.cityLivingCostData = this.$store.getters.get_homejunctionData.costs.city;
                    this.zipLivingCostData = this.$store.getters.get_homejunctionData.costs.zip;
                    this.countyLivingCostData = this.$store.getters.get_homejunctionData.costs.county;
                    this.neighbourhoodLivingCostData = this.$store.getters.get_homejunctionData.costs.neighbourhood;

                    this.get_livingCost();
                }
                return this.$store.getters.get_homejunctionData.costs
            }
        },
        created() {
        },
        mounted() {
            this.livingCostMyEcharts = this.$echarts.init(document.getElementById('livingCost-chart'));
            this.livingCostMyEcharts.showLoading();
            window.addEventListener('resize', () => {
                this.livingCostMyEcharts.resize();
            });
        },
        methods: {
            //获取生活成本数据
            get_livingCost() {
                this.$nextTick(() => {
                    if(this.LivingCostData){
                        this.chartNoDataShow = false;
                        this.livingCost_charts(this.stateLivingCostData.apparel, this.stateLivingCostData.education, this.stateLivingCostData.entertainment, this.stateLivingCostData.food, this.stateLivingCostData.healthcare, this.stateLivingCostData.housing, this.stateLivingCostData.transportation, this.stateLivingCostData.utilities, this.stateLivingCostData.overall);
                    }else{
                        this.chartNoDataShow = true;
                        this.$refs.livingCost_chart_NoData.innerText = data.msg;
                    }
                })
            },
            //地区级别Change事件
            regionTypeChange(value){
                if (value == 'state') {
                    this.livingCost_charts(this.stateLivingCostData.apparel, this.stateLivingCostData.education, this.stateLivingCostData.entertainment, this.stateLivingCostData.food, this.stateLivingCostData.healthcare, this.stateLivingCostData.housing, this.stateLivingCostData.transportation, this.stateLivingCostData.utilities, this.stateLivingCostData.overall);
                }else if (value == 'city') {
                    this.livingCost_charts(this.cityLivingCostData.apparel, this.cityLivingCostData.education, this.cityLivingCostData.entertainment, this.cityLivingCostData.food, this.cityLivingCostData.healthcare, this.cityLivingCostData.housing, this.cityLivingCostData.transportation, this.cityLivingCostData.utilities, this.cityLivingCostData.overall);
                }else if (value == 'zip') {
                    this.livingCost_charts(this.zipLivingCostData.apparel, this.zipLivingCostData.education, this.zipLivingCostData.entertainment, this.zipLivingCostData.food, this.zipLivingCostData.healthcare, this.zipLivingCostData.housing, this.zipLivingCostData.transportation, this.zipLivingCostData.utilities, this.zipLivingCostData.overall);
                }else if (value == 'county') {
                    this.livingCost_charts(this.countyLivingCostData.apparel, this.countyLivingCostData.education, this.countyLivingCostData.entertainment, this.countyLivingCostData.food, this.countyLivingCostData.healthcare, this.countyLivingCostData.housing, this.countyLivingCostData.transportation, this.countyLivingCostData.utilities, this.countyLivingCostData.overall);
                }else if (value == 'neighbourhood') {
                    this.livingCost_charts(this.neighbourhoodLivingCostData.apparel, this.neighbourhoodLivingCostData.education, this.neighbourhoodLivingCostData.entertainment, this.neighbourhoodLivingCostData.food, this.neighbourhoodLivingCostData.healthcare, this.neighbourhoodLivingCostData.housing, this.neighbourhoodLivingCostData.transportation, this.neighbourhoodLivingCostData.utilities, this.neighbourhoodLivingCostData.overall);
                }
            },
            //生活成本——柱状图
            livingCost_charts(apparel, education, entertainment, food, healthcare, housing, transportation, utilities, overall) {
                this.livingCostMyEcharts.hideLoading();
                this.livingCostMyEcharts.setOption({
                    title: {
                        text: '生活成本',
                        subtext: '全美平均值为100',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    xAxis: {
                        axisLabel: {
                            textStyle: {//坐标轴文字颜色
                                color: '#000'
                            }
                        },
                        splitLine: {show: false},//是否显示分隔线
                        axisTick: {show: false},//是否显示坐标轴刻度
                        data: ["服装", "教育", "娱乐", "饮食", "医疗保健", "住房", "交通运输", "公共事业", "整体"]
                    },
                    yAxis: {
                        splitLine: {show: false},//是否显示分隔线
                        axisTick: {show: false},//是否显示坐标轴刻度
                        axisLabel: {show: false},//是否显示刻度标签
                    },
                    series: [{
                        name: '生活成本',
                        type: 'bar',
                        barWidth: '40',
                        label: {
                            normal: {
                                show: true,//柱子上边显示文字标签
                                position: 'top',
                                formatter: param => {
                                    return param.value;
                                },
                                offset: [0, -5],
                                textStyle: {
                                    fontSize: 16,
                                    color: '#000',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        data: [
                            {
                                value: apparel,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: education,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: entertainment,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: food,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: healthcare,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: housing,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: transportation,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: utilities,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: overall,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                        ],
                        animationDelay: function (idx) {
                            return idx * 10;
                        }
                    }],
                    animationEasing: 'elasticOut'
                });
            },

        },
        components: {}
    }
</script>

<style scoped lang="less" type="text/less">
</style>
