<template>
    <article class="echart-chart">
        <div class="inside">
            <header>人口统计</header>
            <div class="chartBox clearfix" style="height: 360px;">
                <div class="regionType-button clearfix" v-show="!chartNoDataShow">
                    <el-button-group>
                        <el-button type="primary" v-for="(item, key, index) in PopulationData" :key="index" v-if="item" size="mini" @click="regionTypeChange(key)">{{key}}</el-button>
                    </el-button-group>
                </div>
                <div class="chart-div" id="Population-chart" v-show="!chartNoDataShow" style="height: 280px;"></div>
                <p>人口密度（平均每平方英里的陆地面积居住的人数）：{{this.$accounting.formatMoney(density, "", 0)}}人</p>
                <h4 ref="Population_chart_NoData" v-show="chartNoDataShow"></h4>
            </div>
            <p v-show="false">{{getPopulation}}</p>
        </div>
    </article>
</template>

<script>
    export default {
        data() {
            return {
                PopulationData: null,//人口统计数据
                statePopulationData: null,//州——人口统计数据
                cityPopulationData: null,//城市——人口统计数据
                zipPopulationData: null,//邮编——人口统计数据
                countyPopulationData: null,//郡县——人口统计数据
                neighbourhoodPopulationData: null,//附近——人口统计数据

                PopulationMyEcharts: '',//人口统计数据——饼图
                regionType: 'state',//地区级别
                density: '',//人口密度

                chartNoDataShow: false, //判断是否有无数据
            }
        },
        computed: {
            getPopulation() {
                if(this.$store.getters.get_homejunctionData.population){
                    this.PopulationData = this.$store.getters.get_homejunctionData.population;
                    this.statePopulationData = this.$store.getters.get_homejunctionData.population.state;
                    this.cityPopulationData = this.$store.getters.get_homejunctionData.population.city;
                    this.zipPopulationData = this.$store.getters.get_homejunctionData.population.zip;
                    this.countyPopulationData = this.$store.getters.get_homejunctionData.population.county;
                    this.neighbourhoodPopulationData = this.$store.getters.get_homejunctionData.population.neighbourhood;

                    this.get_Population();
                }
                return this.$store.getters.get_homejunctionData.population
            }
        },
        created() {
        },
        mounted() {
            this.PopulationMyEcharts = this.$echarts.init(document.getElementById('Population-chart'));
            this.PopulationMyEcharts.showLoading();
            window.addEventListener('resize', () => {
                this.PopulationMyEcharts.resize();
            });
        },
        methods: {
            //获取人口统计数据
            get_Population() {
                this.$nextTick(() => {
                    if(this.PopulationData){
                        this.chartNoDataShow = false;
                        this.Population_charts(this.statePopulationData.current, this.statePopulationData.y1990, this.statePopulationData.y2000, this.statePopulationData.y2010);
                        this.density = this.statePopulationData.density;//人口密度
                    }else{
                        this.chartNoDataShow = true;
                        this.$refs.Population_chart_NoData.innerText = data.msg;
                    }
                })
            },
            //地区级别Change事件
            regionTypeChange(value){
                if (value == 'state') {
                    this.Population_charts(this.statePopulationData.current, this.statePopulationData.y1990, this.statePopulationData.y2000, this.statePopulationData.y2010);
                    this.density = this.statePopulationData.density;//人口密度
                }else if (value == 'city') {
                    this.Population_charts(this.cityPopulationData.current, this.cityPopulationData.y1990, this.cityPopulationData.y2000, this.cityPopulationData.y2010);
                    this.density = this.cityPopulationData.density;//人口密度
                }else if (value == 'zip') {
                    this.Population_charts(this.zipPopulationData.current, this.zipPopulationData.y1990, this.zipPopulationData.y2000, this.zipPopulationData.y2010);
                    this.density = this.zipPopulationData.density;//人口密度
                }else if (value == 'county') {
                    this.Population_charts(this.countyPopulationData.current, this.countyPopulationData.y1990, this.countyPopulationData.y2000, this.countyPopulationData.y2010);
                    this.density = this.countyPopulationData.density;//人口密度
                }else if (value == 'neighbourhood') {
                    this.Population_charts(this.neighbourhoodPopulationData.current, this.neighbourhoodPopulationData.y1990, this.neighbourhoodPopulationData.y2000, this.neighbourhoodPopulationData.y2010);
                    this.density = this.neighbourhoodPopulationData.density;//人口密度
                }
            },
            //人口统计——柱状图
            Population_charts(current, y1990, y2000, y2010) {
                this.PopulationMyEcharts.hideLoading();
                this.PopulationMyEcharts.setOption({
                    title: {
                        text: '人口统计',
                        subtext: '根据最新的人口普查数据',
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
                        data: ["该地区目前的人口", "1990年该地区的人口", "2000年该地区的人口", "2010年该地区的人口"]
                    },
                    yAxis: {
                        splitLine: {show: false},//是否显示分隔线
                        axisTick: {show: false},//是否显示坐标轴刻度
                        axisLabel: {show: false},//是否显示刻度标签
                    },
                    series: [{
                        name: '人口统计',
                        type: 'bar',
                        barWidth: '40',
                        label: {
                            normal: {
                                show: true,//柱子上边显示文字标签
                                position: 'top',
                                formatter: param => {
                                    return this.$accounting.formatMoney(param.value, "", 0) +'人';
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
                                value: current,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: y1990,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: y2000,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: y2010,
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
