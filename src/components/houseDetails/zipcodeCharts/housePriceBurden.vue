<template>
    <div class="echart-chart">
        <div class="inside">
            <header>本区域房价负担指数和本州对比</header>
            <div class="chartBox clearfix">
                <div class="chart-div" id="housePriceBurden-chart" v-show="!chartNoDataShow"></div>
                <h4 ref="housePriceBurden_chart_NoData" v-show="chartNoDataShow"></h4>
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
                    this.get_housePriceBurden();
                }
                return this.$store.getters.get_houseDetailsZipcode
            }
        },
        created() {
        },
        mounted() {
            this.myEcharts = this.$echarts.init(document.getElementById('housePriceBurden-chart'));
            this.myEcharts.showLoading();
            window.addEventListener('resize', () => {
                this.myEcharts.resize();
            });
        },
        methods: {
            //获取本区域房价负担指数和本州对比数据
            get_housePriceBurden() {
                this.$get('/report/housingaffordabilityindex/' + this.$store.getters.get_houseDetailsZipcode).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.chartNoDataShow = false;
                        this.housePriceBurden_charts(data.data.local, data.data.state);
                    } else {
                        this.chartNoDataShow = true;
                        this.$refs.housePriceBurden_chart_NoData.innerText = data.msg;
                    }
                });
            },
            //本区域房价负担指数和本州对比——柱状图
            housePriceBurden_charts(local, state){
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
                        splitLine : {show: false},//是否显示分隔线
                        axisTick : {show: false},//是否显示坐标轴刻度
                    },
                    yAxis: {
                        type: 'category',
                        data: ["本地","本州"],
                        axisLabel:{
                            textStyle:{//坐标轴文字颜色
                                color: '#000'
                            }
                        },
                        splitLine : {show: false},//是否显示分隔线
                        axisTick : {show: false},//是否显示坐标轴刻度
                    },
                    series: [{
                        type: 'bar',
                        barWidth: '30',
                        label: {
                            normal: {
                                show: true,//柱子上边显示文字标签
                                position: 'top',
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
                                value: this.$accounting.formatMoney(local, "", 1, "", ".", "%s%v"),
                                itemStyle:{//柱子颜色
                                    normal:{color:'#00b8ee'}
                                }
                            },
                            {
                                value: this.$accounting.formatMoney(state, "", 1, "", ".", "%s%v"),
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
</style>
