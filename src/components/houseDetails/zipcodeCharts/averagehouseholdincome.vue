<template>
    <div class="echart-chart">
        <div class="inside">
            <header>平均家庭收入</header>
            <div class="chartBox clearfix">
                <div class="chart-div" id="Average-household-income-chart" v-show="!chartNoDataShow"></div>
                <p ref="than_state_family_average"></p>
                <p ref="than_US_family_average"></p>
                <h4 ref="Average_household_income_chart_NoData" v-show="chartNoDataShow"></h4>
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
                chartNoDataShow: false, //判断是否有无数据
            }
        },
        computed: {
            getzipcode() {
                if(this.$store.getters.get_houseDetailsZipcode){
                    this.get_Average_household_income();
                }
                return this.$store.getters.get_houseDetailsZipcode
            }
        },
        created() {
        },
        mounted() {
            this.myEcharts = this.$echarts.init(document.getElementById('Average-household-income-chart'));
            this.myEcharts.showLoading();
            window.addEventListener('resize', () => {
                this.myEcharts.resize();
            });
        },
        methods: {
            //获取平均家庭收入数据
            get_Average_household_income() {
                this.$get('/report/averagehouseholdincome/' + this.$store.getters.get_houseDetailsZipcode).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.chartNoDataShow = false;
                        this.Average_household_income_charts(data.data.local, data.data.state, data.data.all);
                        this.$refs.than_state_family_average.innerText = this.than_state(data.data.local, data.data.state);
                        this.$refs.than_US_family_average.innerText = this.than_state(data.data.local, data.data.all);
                    } else {
                        this.chartNoDataShow = true;
                        this.$refs.Average_household_income_chart_NoData.innerText = data.msg;
                    }
                });
            },
            //平均家庭收入——柱状图
            Average_household_income_charts(local, state, US) {
                this.myEcharts.hideLoading();
                this.myEcharts.setOption({
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
                        data: ["本地", "本州", "全美"]
                    },
                    yAxis: {
                        splitLine: {show: false},//是否显示分隔线
                        axisTick: {show: false},//是否显示坐标轴刻度
                        axisLabel: {show: false},//是否显示刻度标签
                    },
                    series: [{
                        name: '平均家庭收入',
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
                                textStyle: {
                                    fontSize: 16,
                                    color: '#000',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        data: [
                            {
                                value: local,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: state,
                                itemStyle: {
                                    normal: {color: '#8fc320'}
                                }
                            },
                            {
                                value: US,
                                itemStyle: {
                                    normal: {color: '#fe9e25'}
                                }
                            }
                        ],
                        animationDelay: function (idx) {
                            return idx * 10;
                        }
                    }],
                    animationEasing: 'elasticOut'
                });
            },
            //判断比本州家庭平均收入
            than_state(local, state) {
                let val = '';
                if (local == 0 || state == 0) {
                    val = '';
                } else {
                    if (local > state) {
                        val = '比本州家庭平均收入高' + this.$accounting.formatMoney((local / state - 1) * 100, "", 2, "", ".", "%s%v") + '%';
                    } else {
                        val = '比本州家庭平均收入低' + this.$accounting.formatMoney((1 - local / state) * 100, "", 2, "", ".", "%s%v") + '%';
                    }
                }
                return val;
            },
            //判断比全美家庭平均收入
            than_US(local, US) {
                let val = '';
                if (local == 0 || US == 0) {
                    val = '';
                } else {
                    if (local > US) {
                        val = '比全美家庭平均收入高' + this.$accounting.formatMoney((local / US - 1) * 100, "", 2, "", ".", "%s%v") + '%';
                    } else {
                        val = '比全美家庭平均收入低' + this.$accounting.formatMoney((1 - local / US) * 100, "", 2, "", ".", "%s%v") + '%';
                        ;
                    }
                }
                return val;
            },


        },
        components: {}
    }
</script>

<style scoped lang="less" type="text/less">
</style>
