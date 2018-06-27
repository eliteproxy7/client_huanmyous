<template>
    <div class="echart-chart">
        <div class="inside">
            <header>本区域房价环比增长率</header>
            <div class="chartBox clearfix">
                <el-radio-group v-model="filterYear" @change="filterYearChange" v-show="!chartNoDataShow">
                    <el-radio label="1">过去1年</el-radio>
                    <el-radio label="5">过去5年</el-radio>
                    <el-radio label="max">全部数据</el-radio>
                </el-radio-group>
                <div class="chart-div" id="housePriceMOM-chart" v-show="!chartNoDataShow"></div>
                <h4 ref="housePriceMOM_chart_NoData" v-show="chartNoDataShow"></h4>
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
                    this.get_housePriceMOM();
                }
                return this.$store.getters.get_houseDetailsZipcode
            }
        },
        created() {
        },
        mounted() {
            this.myEcharts = this.$echarts.init(document.getElementById('housePriceMOM-chart'));
            this.myEcharts.showLoading();
            window.addEventListener('resize', () => {
                this.myEcharts.resize();
            });
        },
        methods: {
            //获取本区域房价环比增长率数据
            get_housePriceMOM() {
                this.$get('/report/mom/' + this.$store.getters.get_houseDetailsZipcode +'?time='+ this.filterYear).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.chartNoDataShow = false;
                        this.housePriceMOM_charts(data.data);
                    } else {
                        this.chartNoDataShow = true;
                        this.$refs.housePriceMOM_chart_NoData.innerText = data.msg;
                    }
                });
            },
            //本区域房价环比增长率——折线图
            housePriceMOM_charts(data){
                this.myEcharts.hideLoading();
                let dateList = data.map(item => {
                    return item['time'];
                });
                let valueList = data.map(item => {
                    return this.$accounting.formatMoney(item['value'], "", 2, "", ".", "%s%v");
                });
                this.myEcharts.setOption({
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#00b6ef"></span>{c}%'
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
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: dateList
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, '100%'],
                        axisLabel: {
                            formatter: '{value}%'
                        }
                    },
                    dataZoom: [{
                        type: 'inside',
                        start: 0,
                        end: 100
                    }, {
                        start: 0,
                        end: 100,
                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '80%',
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    }],
                    series: [
                        {
                            type:'line',
                            smooth:true,
                            sampling: 'average',
                            itemStyle: {
                                normal: {
                                    color: 'rgb(0, 195, 255)'
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgb(117, 221, 253)'
                                    }, {
                                        offset: 1,
                                        color: 'rgb(9, 129, 232)'
                                    }])
                                }
                            },
                            data: valueList
                        }
                    ]
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
