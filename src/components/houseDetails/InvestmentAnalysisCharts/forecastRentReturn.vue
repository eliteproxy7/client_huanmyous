<template>
    <div class="echart-chart">
        <div class="inside">
            <header>本区域预估租金回报</header>
            <div class="chartBox clearfix">
                <el-radio-group v-model="filterYear" @change="filterYearChange"v-show="!chartNoDataShow">
                    <el-radio label="1">过去1年</el-radio>
                    <el-radio label="5">过去5年</el-radio>
                    <el-radio label="max">全部数据</el-radio>
                </el-radio-group>
                <div class="chart-div" id="forecastRentReturn-chart" v-show="!chartNoDataShow"></div>
                <h4 ref="forecastRentReturn_chart_NoData" v-show="chartNoDataShow"></h4>
            </div>
            <p v-show="false">{{getzipcode}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                myEcharts: '',
                filterYear: '5', //按年份筛选
                chartNoDataShow: false, //判断是否有无数据
            }
        },
        computed: {
            getzipcode() {
                if(this.$store.getters.get_houseDetailsZipcode){
                    this.get_forecastRentReturn();
                }
                return this.$store.getters.get_houseDetailsZipcode
            }
        },
        created() {
        },
        mounted() {
            this.myEcharts = this.$echarts.init(document.getElementById('forecastRentReturn-chart'));
            this.myEcharts.showLoading();
            window.addEventListener('resize', () => {
                this.myEcharts.resize();
            });
        },
        methods: {
            //获取本区域预估租金回报数据
            get_forecastRentReturn() {
                this.$get('/report/rentalyield/' + this.$store.getters.get_houseDetailsZipcode +'?time='+ this.filterYear).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.chartNoDataShow = false;
                        this.forecastRentReturn_charts(data.data);
                    } else {
                        this.chartNoDataShow = true;
                        this.$refs.forecastRentReturn_chart_NoData.innerText = data.msg;
                    }
                });
            },
            //本区域预估租金回报——折线图
            forecastRentReturn_charts(data){
                this.myEcharts.hideLoading();
                let dateList = data.map(item => {
                    return item['time'];
                });
                let valueList = data.map(item => {
                    return item['value'];
                });
                this.myEcharts.setOption({
                    tooltip: {
                        trigger: 'axis',
                        formatter: param => {
                            return param[0].name +'<br /> <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#00b6ef"></span>'+ this.$accounting.formatMoney(param[0].value * 100, '', 2, '', '.', "%s%v") +'%';
                        }
                    },
                    toolbox: {
                        show: true,
                        right: 30,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    visualMap: {
                        show: false,
                        type: 'continuous',
                        seriesIndex: 0,
                        min: 0,
                        max: 400,
                        inRange: {
                            color: ['#5bc0de','#00b6ef']
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '7%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        data: dateList
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: value => {
                                return this.$accounting.formatMoney(value * 100, '', 2, '', '.', "%s%v") +'%';
                            }
                        }
                    },
                    series: [{
                        name: '预估租金回报',
                        type: 'line',
                        smooth: true,
                        data: valueList,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值',symbolSize:70},
                                {type: 'min', name: '最小值',symbolSize:70}
                            ],
                            itemStyle:{
                                normal:{
                                    color:'#5bc0de'
                                }
                            },
                            label:{
                                normal:{
                                    formatter: param => {
                                        return this.$accounting.formatMoney(param.value * 100, '', 2, '', '.', "%s%v") +'%';
                                    }
                                }
                            }
                        }
                    }]
                });
            },
            //按年份筛选
            filterYearChange() {
                // this.get_rent_median();//computed里的方法也会执行，所以这里不需再调用
            },

        },
        components: {
        }
    }
</script>

<style scoped lang="less" type="text/less">
    body {
    }
</style>
