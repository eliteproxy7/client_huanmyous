<template>
    <div class="echart-chart">
        <div class="inside">
            <header>本区域房租中位数走势</header>
            <div class="chartBox clearfix">
                <el-radio-group v-model="filterYear" @change="filterYearChange" v-show="!chartNoDataShow">
                    <el-radio label="1">过去1年</el-radio>
                    <el-radio label="5">过去5年</el-radio>
                    <el-radio label="max">全部数据</el-radio>
                </el-radio-group>
                <div class="chart-div" id="rent-median-chart" v-show="!chartNoDataShow" style="height: 240px;"></div>
                <h4 ref="rent_median_chart_NoData" v-show="chartNoDataShow"></h4>
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
                    this.get_rent_median();
                }
                return this.$store.getters.get_houseDetailsZipcode
            }
        },
        created() {
        },
        mounted() {
            this.myEcharts = this.$echarts.init(document.getElementById('rent-median-chart'));
            this.myEcharts.showLoading();
            window.addEventListener('resize', () => {
                this.myEcharts.resize();
            });
        },
        methods: {
            //获取本区域房租中位数走势数据
            get_rent_median() {
                this.$get('/report/medianrent/' + this.$store.getters.get_houseDetailsZipcode +'?time='+ this.filterYear).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.chartNoDataShow = false;
                        this.rent_median_charts(data.data);
                    } else {
                        this.chartNoDataShow = true;
                        this.$refs.rent_median_chart_NoData.innerText = data.msg;
                    }
                });
            },
            //本区域房租中位数走势——折线图
            rent_median_charts(data){
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
                                let KM = '';
                                if(value.toString().length >= 7){
                                    KM = (value/1000000).toFixed(1) +'M'
                                }else{
                                    KM = Math.round(value/1000) +'k'
                                }
                                return '$'+ KM;
                            },
                            textStyle:{//坐标轴文字颜色
                                color: '#000'
                            }
                        }
                    },
                    series: [{
                        name: '本区域房租中位数走势',
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
                                        return this.$accounting.formatMoney(param.value, "$", 0, ',', '.', "%s%v");
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
