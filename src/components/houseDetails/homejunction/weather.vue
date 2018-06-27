<template>
    <article class="echart-chart">
        <div class="inside">
            <header>天气指数</header>
            <div class="chartBox clearfix">
                <div class="regionType-button clearfix" v-show="!chartNoDataShow">
                    <el-button-group>
                        <el-button type="primary" v-for="(item, key, index) in WeatherData" :key="index" v-if="item" size="mini" @click="regionTypeChange(key)">{{key}}</el-button>
                    </el-button-group>
                </div>
                <div class="chart-div" id="averageHighLow-chart" v-show="!chartNoDataShow" style="height: 300px;"></div>
                <div class="chart-div" id="disasterIndices-chart" v-show="!chartNoDataShow" style="height: 300px;"></div>
                <p>近一年雨雪天数统计：降水量(英寸)：{{rainAmount}}，天数：{{rainDaysPerYear}}。降雪量(英寸)：{{snowAmount}}，天数：{{snowDaysPerYear}}。</p>
                <h4 ref="Weather_chart_NoData" v-show="chartNoDataShow"></h4>
            </div>
            <p v-show="false">{{getWeather}}</p>
        </div>
    </article>
</template>

<script>
    export default {
        data() {
            return {
                WeatherData: null,//天气指数数据
                stateWeatherData: null,//州——天气指数数据
                cityWeatherData: null,//城市——天气指数数据
                zipWeatherData: null,//邮编——天气指数数据
                countyWeatherData: null,//郡县——天气指数数据
                neighbourhoodWeatherData: null,//附近——天气指数数据

                averageHighLowMyEcharts: '',//平均高低温统计——折线图
                disasterIndicesMyEcharts: '',//灾害指数——柱状图
                regionType: 'state',//地区级别
                rainAmount: '',//近一年雨雪天数统计——降水——降水量(英寸)
                rainDaysPerYear: '',//近一年雨雪天数统计——降水——天数
                snowAmount: '',//近一年雨雪天数统计——降雪——降雪量(英寸)
                snowDaysPerYear: '',//近一年雨雪天数统计——降雪——天数

                chartNoDataShow: false, //判断是否有无数据
            }
        },
        computed: {
            getWeather() {
                if(this.$store.getters.get_homejunctionData.weather){
                    this.WeatherData = this.$store.getters.get_homejunctionData.weather;
                    this.stateWeatherData = this.$store.getters.get_homejunctionData.weather.state;
                    this.cityWeatherData = this.$store.getters.get_homejunctionData.weather.city;
                    this.zipWeatherData = this.$store.getters.get_homejunctionData.weather.zip;
                    this.countyWeatherData = this.$store.getters.get_homejunctionData.weather.county;
                    this.neighbourhoodWeatherData = this.$store.getters.get_homejunctionData.weather.neighbourhood;

                    this.get_Weather();
                }
                return this.$store.getters.get_homejunctionData.weather
            }
        },
        created() {
        },
        mounted() {
            this.averageHighLowMyEcharts = this.$echarts.init(document.getElementById('averageHighLow-chart'));
            this.averageHighLowMyEcharts.showLoading();

            this.disasterIndicesMyEcharts = this.$echarts.init(document.getElementById('disasterIndices-chart'));
            this.disasterIndicesMyEcharts.showLoading();

            window.addEventListener('resize', () => {
                this.averageHighLowMyEcharts.resize();
                this.disasterIndicesMyEcharts.resize();
            });
        },
        methods: {
            //获取天气指数数据
            get_Weather() {
                this.$nextTick(() => {
                    if(this.WeatherData){
                        this.chartNoDataShow = false;
                        this.averageHighLow_charts(this.stateWeatherData.jan, this.stateWeatherData.apr, this.stateWeatherData.jul, this.stateWeatherData.oct, this.stateWeatherData.annual);
                        this.disasterIndices_charts(this.stateWeatherData.indices.earthquake, this.stateWeatherData.indices.hail, this.stateWeatherData.indices.hurricane, this.stateWeatherData.indices.ozone, this.stateWeatherData.indices.pollution, this.stateWeatherData.indices.tornado, this.stateWeatherData.indices.wind, this.stateWeatherData.indices.overall);
                        this.rainAmount = this.stateWeatherData.precipitation.rain.amount;//近一年雨雪天数统计——降水——降水量(英寸)
                        this.rainDaysPerYear = this.stateWeatherData.precipitation.rain.daysPerYear;//近一年雨雪天数统计——降水——天数
                        this.snowAmount = this.stateWeatherData.precipitation.snow.amount;//近一年雨雪天数统计——降雪——降雪量(英寸)
                        this.snowDaysPerYear = this.stateWeatherData.precipitation.snow.daysPerYear;//近一年雨雪天数统计——降雪——天数
                    }else{
                        this.chartNoDataShow = true;
                        this.$refs.Weather_chart_NoData.innerText = data.msg;
                    }
                })
            },
            //地区级别Change事件
            regionTypeChange(value){
                if (value == 'state') {
                    this.averageHighLow_charts(this.stateWeatherData.jan, this.stateWeatherData.apr, this.stateWeatherData.jul, this.stateWeatherData.oct, this.stateWeatherData.annual);
                    this.disasterIndices_charts(this.stateWeatherData.indices.earthquake, this.stateWeatherData.indices.hail, this.stateWeatherData.indices.hurricane, this.stateWeatherData.indices.ozone, this.stateWeatherData.indices.pollution, this.stateWeatherData.indices.tornado, this.stateWeatherData.indices.wind, this.stateWeatherData.indices.overall);
                    this.rainAmount = this.stateWeatherData.precipitation.rain.amount;//近一年雨雪天数统计——降水——降水量(英寸)
                    this.rainDaysPerYear = this.stateWeatherData.precipitation.rain.daysPerYear;//近一年雨雪天数统计——降水——天数
                    this.snowAmount = this.stateWeatherData.precipitation.snow.amount;//近一年雨雪天数统计——降雪——降雪量(英寸)
                    this.snowDaysPerYear = this.stateWeatherData.precipitation.snow.daysPerYear;//近一年雨雪天数统计——降雪——天数
                }else if (value == 'city') {
                    this.averageHighLow_charts(this.cityWeatherData.jan, this.cityWeatherData.apr, this.cityWeatherData.jul, this.cityWeatherData.oct, this.stateWeatherData.annual);
                    this.disasterIndices_charts(this.cityWeatherData.indices.earthquake, this.cityWeatherData.indices.hail, this.cityWeatherData.indices.hurricane, this.cityWeatherData.indices.ozone, this.cityWeatherData.indices.pollution, this.cityWeatherData.indices.tornado, this.cityWeatherData.indices.wind, this.cityWeatherData.indices.overall);
                    this.rainAmount = this.cityWeatherData.precipitation.rain.amount;//近一年雨雪天数统计——降水——降水量(英寸)
                    this.rainDaysPerYear = this.cityWeatherData.precipitation.rain.daysPerYear;//近一年雨雪天数统计——降水——天数
                    this.snowAmount = this.cityWeatherData.precipitation.snow.amount;//近一年雨雪天数统计——降雪——降雪量(英寸)
                    this.snowDaysPerYear = this.cityWeatherData.precipitation.snow.daysPerYear;//近一年雨雪天数统计——降雪——天数
                }else if (value == 'zip') {
                    this.averageHighLow_charts(this.zipWeatherData.jan, this.zipWeatherData.apr, this.zipWeatherData.jul, this.zipWeatherData.oct, this.zipWeatherData.annual);
                    this.disasterIndices_charts(this.zipWeatherData.indices.earthquake, this.zipWeatherData.indices.hail, this.zipWeatherData.indices.hurricane, this.zipWeatherData.indices.ozone, this.zipWeatherData.indices.pollution, this.zipWeatherData.indices.tornado, this.zipWeatherData.indices.wind, this.zipWeatherData.indices.overall);
                    this.rainAmount = this.zipWeatherData.precipitation.rain.amount;//近一年雨雪天数统计——降水——降水量(英寸)
                    this.rainDaysPerYear = this.zipWeatherData.precipitation.rain.daysPerYear;//近一年雨雪天数统计——降水——天数
                    this.snowAmount = this.zipWeatherData.precipitation.snow.amount;//近一年雨雪天数统计——降雪——降雪量(英寸)
                    this.snowDaysPerYear = this.zipWeatherData.precipitation.snow.daysPerYear;//近一年雨雪天数统计——降雪——天数
                }else if (value == 'county') {
                    this.averageHighLow_charts(this.countyWeatherData.jan, this.countyWeatherData.apr, this.countyWeatherData.jul, this.countyWeatherData.oct, this.stateWeatherData.annual);
                    this.disasterIndices_charts(this.countyWeatherData.indices.earthquake, this.countyWeatherData.indices.hail, this.countyWeatherData.indices.hurricane, this.countyWeatherData.indices.ozone, this.countyWeatherData.indices.pollution, this.countyWeatherData.indices.tornado, this.countyWeatherData.indices.wind, this.countyWeatherData.indices.overall);
                    this.rainAmount = this.countyWeatherData.precipitation.rain.amount;//近一年雨雪天数统计——降水——降水量(英寸)
                    this.rainDaysPerYear = this.countyWeatherData.precipitation.rain.daysPerYear;//近一年雨雪天数统计——降水——天数
                    this.snowAmount = this.countyWeatherData.precipitation.snow.amount;//近一年雨雪天数统计——降雪——降雪量(英寸)
                    this.snowDaysPerYear = this.countyWeatherData.precipitation.snow.daysPerYear;//近一年雨雪天数统计——降雪——天数
                }else if (value == 'neighbourhood') {
                    this.averageHighLow_charts(this.neighbourhoodWeatherData.jan, this.neighbourhoodWeatherData.apr, this.neighbourhoodWeatherData.jul, this.neighbourhoodWeatherData.oct, this.stateWeatherData.annual);
                    this.disasterIndices_charts(this.neighbourhoodWeatherData.indices.earthquake, this.neighbourhoodWeatherData.indices.hail, this.neighbourhoodWeatherData.indices.hurricane, this.neighbourhoodWeatherData.indices.ozone, this.neighbourhoodWeatherData.indices.pollution, this.neighbourhoodWeatherData.indices.tornado, this.neighbourhoodWeatherData.indices.wind, this.neighbourhoodWeatherData.indices.overall);
                    this.rainAmount = this.neighbourhoodWeatherData.precipitation.rain.amount;//近一年雨雪天数统计——降水——降水量(英寸)
                    this.rainDaysPerYear = this.neighbourhoodWeatherData.precipitation.rain.daysPerYear;//近一年雨雪天数统计——降水——天数
                    this.snowAmount = this.neighbourhoodWeatherData.precipitation.snow.amount;//近一年雨雪天数统计——降雪——降雪量(英寸)
                    this.snowDaysPerYear = this.neighbourhoodWeatherData.precipitation.snow.daysPerYear;//近一年雨雪天数统计——降雪——天数
                }
            },
            //平均最高温和最低温——折线图
            averageHighLow_charts(jan, apr, jul, oct, annual){
                let highList = [];//平均最高温数据
                let lowList = [];//平均最低温数据

                // 处理一月、四月、七月、十月、全年的json数据，得出平均最高温和最低温数组
                highList.push(jan['high'], apr['high'], jul['high'], oct['high'], annual['high']);
                lowList.push(jan['low'], apr['low'], jul['low'], oct['low'], annual['low']);
                // console.log(highList, lowList);

                let markPoint = {
                    data: [
                        {type: 'max', name: '最大值', symbolSize:65},
                        {type: 'min', name: '最小值', symbolSize:65}
                    ],
                    label:{
                        normal:{
                            formatter: (param) => {
                                return param.value +'°F';
                            }
                        }
                    }
                };

                this.averageHighLowMyEcharts.hideLoading();
                this.averageHighLowMyEcharts.setOption({
                    title: {
                        text: '平均最高温和最低温',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        orient: 'horizontal',
                        left: '20',
                        data:['平均最高温', '平均最低温']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: ['一月', '四月', '七月', '十月', '全年']
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} °F'
                        }
                    },
                    series: [
                        {
                            name: '平均最高温',
                            type: 'line',
                            data: highList,
                            markPoint: markPoint,
                        },
                        {
                            name: '平均最低温',
                            type: 'line',
                            data: lowList,
                            markPoint: markPoint,
                        },
                    ]
                });
            },
            //灾害指数——柱状图
            disasterIndices_charts(earthquake, hail, hurricane, ozone, pollution, tornado, wind, overall){
                this.disasterIndicesMyEcharts.hideLoading();
                this.disasterIndicesMyEcharts.setOption({
                    title: {
                        text: '灾害指数',
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
                        data: ["地震", "冰雹", "飓风", "臭氧", "污染", "龙卷风", "空气", "整体"]
                    },
                    yAxis: {
                        splitLine: {show: false},//是否显示分隔线
                        axisTick: {show: false},//是否显示坐标轴刻度
                        axisLabel: {show: false},//是否显示刻度标签
                    },
                    series: [{
                        name: '灾害指数',
                        type: 'bar',
                        barWidth: '40',
                        // label: {
                        //     normal: {
                        //         show: true,//柱子上边显示文字标签
                        //         position: 'top',
                        //         formatter: param => {
                        //             return this.$accounting.formatMoney(param.value, "", 0) +'人';
                        //         },
                        //         offset: [0, -5],
                        //         textStyle: {
                        //             fontSize: 16,
                        //             color: '#000',
                        //             fontWeight: 'bold'
                        //         }
                        //     }
                        // },
                        data: [
                            {
                                value: earthquake,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: hail,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: hurricane,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: ozone,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: pollution,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: tornado,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: wind,
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
