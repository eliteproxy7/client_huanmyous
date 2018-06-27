<template>
    <div class="echart-chart">
        <div class="inside">
            <header>此房源明年房价预测</header>
            <div class="chartBox clearfix">
                <p ref="instructions" v-show="!chartNoDataShow"></p>
                <div class="chart-div" id="thisHouseNextYearForecastPrice-chart" v-show="!chartNoDataShow"></div>
                <h4 ref="thisHouseNextYearForecastPrice_chart_NoData" v-show="chartNoDataShow"></h4>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                houseId: this.$route.query.houseId,
                myEcharts: '',
                chartNoDataShow: false, //判断是否有无数据
            }
        },
        computed: {
        },
        created() {
        },
        mounted() {
            this.myEcharts = this.$echarts.init(document.getElementById('thisHouseNextYearForecastPrice-chart'));
            this.myEcharts.showLoading();
            window.addEventListener('resize', () => {
                this.myEcharts.resize();
            });

            this.get_thisHouseNextYearForecastPrice();
        },
        methods: {
            //获取此房源明年房价预测数据
            get_thisHouseNextYearForecastPrice() {
                this.$get('/report/currenthomevalueforecast/' + this.houseId).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.chartNoDataShow = false;
                        this.thisHouseNextYearForecastPrice_charts(data.data.current_price, data.data.forecast_price);
                        this.$refs.instructions.innerText = '优房数据预计明年此房源价格为'+ this.$accounting.formatMoney(data.data.forecast_price, "$", 0) +'，相对今年涨幅为'+ this.$accounting.formatMoney(data.data.rise, "", 2, "", ".", "%s%v") +'%。';
                    } else {
                        this.chartNoDataShow = true;
                        this.$refs.thisHouseNextYearForecastPrice_chart_NoData.innerText = data.msg;
                    }
                });
            },
            //此房源明年房价预测——柱状图
            thisHouseNextYearForecastPrice_charts(thisYeatPrice, nextYearPredictPrice){
                this.myEcharts.hideLoading();
                this.myEcharts.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    xAxis: {
                        axisLabel:{
                            textStyle:{//坐标轴文字颜色
                                color: '#000'
                            }
                        },
                        axisLine: {
                            lineStyle:{//坐标轴线颜色
                                color:'#dee2e5'
                            }
                        },
                        splitLine : {show: false},//是否显示分隔线
                        axisTick : {show: false},//是否显示坐标轴刻度
                        data: ["今年价格", "明年价格"],
                    },
                    yAxis: {
                        axisLine: {
                            lineStyle:{
                                color:'#dee2e5'//坐标轴线颜色
                            }
                        },
                        splitLine : {show: false},//是否显示分隔线
                        axisTick : {show: false},//是否显示坐标轴刻度
                        axisLabel: {show: false}//是否显示刻度标签
                    },
                    series: [{
                        type: 'bar',
                        barWidth: '40',
                        label: {
                            normal: {
                                show: true,//柱子上边显示文字标签
                                position: 'top',
                                formatter: param => {
                                    return this.$accounting.formatMoney(param.value, "$", 0);
                                },
                                offset: [0, -5],
                                textStyle:{
                                    fontSize: 16,
                                    color: '#000',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        data: [
                            {
                                value: Math.round(thisYeatPrice),
                                itemStyle:{//柱子颜色
                                    normal:{color:'#00b8ee'}
                                }
                            },
                            {
                                value: Math.round(nextYearPredictPrice),
                                itemStyle:{
                                    normal:{color:'#8fc320'}
                                }
                            }
                        ],
                        animationDelay: function (idx) {
                            return idx * 10;
                        }
                    }],
                    animationEasing: 'elasticOut',
                });
            },
        },
        components: {
        }
    }
</script>

<style scoped lang="less" type="text/less">
    body {
        .echart-chart {
            .chartBox {
                > p {
                    font-size: 14px;
                    color: #23bff0;
                    text-align: center;
                    margin: 5px 0;
                }
            }
        }
    }
</style>
