<template>
    <article class="echart-chart">
        <div class="inside">
            <header>犯罪指数</header>
            <div class="chartBox clearfix">
                <div class="regionType-button clearfix" v-show="!chartNoDataShow">
                    <el-button-group>
                        <el-button type="primary" v-for="(item, key, index) in CrimeData" :key="index" v-if="item" size="mini" @click="regionTypeChange(key)">{{key}}</el-button>
                    </el-button-group>
                </div>
                <div class="chart-div" id="Crime-chart" v-show="!chartNoDataShow"></div>
                <h4 ref="Crime_chart_NoData" v-show="chartNoDataShow"></h4>
            </div>
            <p v-show="false">{{getCrime}}</p>
        </div>
    </article>
</template>

<script>
    export default {
        data() {
            return {
                CrimeData: null,//犯罪指数数据
                stateCrimeData: null,//州——犯罪指数数据
                cityCrimeData: null,//城市——犯罪指数数据
                zipCrimeData: null,//邮编——犯罪指数数据
                countyCrimeData: null,//郡县——犯罪指数数据
                neighbourhoodCrimeData: null,//附近——犯罪指数数据

                CrimeMyEcharts: '',//犯罪指数——饼图
                regionType: 'state',//地区级别

                chartNoDataShow: false, //判断是否有无数据
            }
        },
        computed: {
            getCrime() {
                if(this.$store.getters.get_homejunctionData.crime){
                    this.CrimeData = this.$store.getters.get_homejunctionData.crime;
                    this.stateCrimeData = this.$store.getters.get_homejunctionData.crime.state;
                    this.cityCrimeData = this.$store.getters.get_homejunctionData.crime.city;
                    this.zipCrimeData = this.$store.getters.get_homejunctionData.crime.zip;
                    this.countyCrimeData = this.$store.getters.get_homejunctionData.crime.county;
                    this.neighbourhoodCrimeData = this.$store.getters.get_homejunctionData.crime.neighbourhood;

                    this.get_Crime();
                }
                return this.$store.getters.get_homejunctionData.crime
            }
        },
        created() {
        },
        mounted() {
            this.CrimeMyEcharts = this.$echarts.init(document.getElementById('Crime-chart'));
            this.CrimeMyEcharts.showLoading();
            window.addEventListener('resize', () => {
                this.CrimeMyEcharts.resize();
            });
        },
        methods: {
            //获取犯罪指数数据
            get_Crime() {
                this.$nextTick(() => {
                    if(this.CrimeData){
                        this.chartNoDataShow = false;
                        this.Crime_charts(this.stateCrimeData.assault, this.stateCrimeData.burglary, this.stateCrimeData.larceny, this.stateCrimeData.murder, this.stateCrimeData.rape, this.stateCrimeData.robbery, this.stateCrimeData.vehicle, this.stateCrimeData.overall);
                    }else{
                        this.chartNoDataShow = true;
                        this.$refs.Crime_chart_NoData.innerText = data.msg;
                    }
                })
            },
            //地区级别Change事件
            regionTypeChange(value){
                if (value == 'state') {
                    this.Crime_charts(this.stateCrimeData.assault, this.stateCrimeData.burglary, this.stateCrimeData.larceny, this.stateCrimeData.murder, this.stateCrimeData.rape, this.stateCrimeData.robbery, this.stateCrimeData.vehicle, this.stateCrimeData.overall);
                }else if (value == 'city') {
                    this.Crime_charts(this.cityCrimeData.assault, this.cityCrimeData.burglary, this.cityCrimeData.larceny, this.cityCrimeData.murder, this.cityCrimeData.rape, this.cityCrimeData.robbery, this.cityCrimeData.vehicle, this.cityCrimeData.overall);
                }else if (value == 'zip') {
                    this.Crime_charts(this.zipCrimeData.assault, this.zipCrimeData.burglary, this.zipCrimeData.larceny, this.zipCrimeData.murder, this.zipCrimeData.rape, this.zipCrimeData.robbery, this.zipCrimeData.vehicle, this.zipCrimeData.overall);
                }else if (value == 'county') {
                    this.Crime_charts(this.countyCrimeData.assault, this.countyCrimeData.burglary, this.countyCrimeData.larceny, this.countyCrimeData.murder, this.countyCrimeData.rape, this.countyCrimeData.robbery, this.countyCrimeData.vehicle, this.countyCrimeData.overall);
                }else if (value == 'neighbourhood') {
                    this.Crime_charts(this.neighbourhoodCrimeData.assault, this.neighbourhoodCrimeData.burglary, this.neighbourhoodCrimeData.larceny, this.neighbourhoodCrimeData.murder, this.neighbourhoodCrimeData.rape, this.neighbourhoodCrimeData.robbery, this.neighbourhoodCrimeData.vehicle, this.neighbourhoodCrimeData.overall);
                }
            },
            //犯罪指数——柱状图
            Crime_charts(assault, burglary, larceny, murder, rape, robbery, vehicle, overall) {
                this.CrimeMyEcharts.hideLoading();
                this.CrimeMyEcharts.setOption({
                    title: {
                        text: '犯罪指数',
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
                        data: ["袭击", "入室盗窃", "偷窃盗窃", "谋杀", "强奸", "抢劫", "vehicle", "整体"]
                    },
                    yAxis: {
                        splitLine: {show: false},//是否显示分隔线
                        axisTick: {show: false},//是否显示坐标轴刻度
                        axisLabel: {show: false},//是否显示刻度标签
                    },
                    series: [{
                        name: '犯罪指数',
                        type: 'bar',
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
                                value: assault,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: burglary,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: larceny,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: murder,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: rape,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: robbery,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: vehicle,
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
