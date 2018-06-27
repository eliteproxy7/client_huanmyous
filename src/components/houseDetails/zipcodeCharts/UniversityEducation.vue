<template>
    <div class="echart-chart">
        <div class="inside">
            <header>大学以上教育比例</header>
            <div class="chartBox clearfix">
                <div class="chart-div" id="University-education-ratio-chart" v-show="!chartNoDataShow"></div>
                <h4 ref="University_education_ratio_chart_NoData" v-show="chartNoDataShow"></h4>
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
                    this.get_University_education_ratio();
                }
                return this.$store.getters.get_houseDetailsZipcode
            }
        },
        created() {
        },
        mounted() {
            this.myEcharts = this.$echarts.init(document.getElementById('University-education-ratio-chart'));
            this.myEcharts.showLoading();
            window.addEventListener('resize', () => {
                this.myEcharts.resize();
            });
        },
        methods: {
            //获取大学以上教育比例数据
            get_University_education_ratio() {
                this.$get('/report/education/' + this.$store.getters.get_houseDetailsZipcode).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.chartNoDataShow = false;
                        this.University_education_ratio_charts(data.data.local, data.data.state, data.data.all);
                    } else {
                        this.chartNoDataShow = true;
                        this.$refs.University_education_ratio_chart_NoData.innerText = data.msg;
                    }
                });
            },
            //大学以上教育比例——柱状图
            University_education_ratio_charts(local, state, US){
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
                        data: ["本地","本州","全美"]
                    },
                    yAxis: {
                        splitLine : {show: false},//是否显示分隔线
                        axisTick : {show: false},//是否显示坐标轴刻度
                        axisLabel: {show: false}//是否显示刻度标签
                    },
                    series: [{
                        name: '失业率',
                        type: 'bar',
                        barWidth: '40',
                        label: {
                            normal: {
                                show: true,//柱子上边显示文字标签
                                position: 'top',
                                formatter: '{c}%',
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
                                value: local,
                                itemStyle:{//柱子颜色
                                    normal:{color:'#00b8ee'}
                                }
                            },
                            {
                                value: state,
                                itemStyle:{
                                    normal:{color:'#8fc320'}
                                }
                            },
                            {
                                value: US,
                                itemStyle:{
                                    normal:{color:'#fe9e25'}
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
        },
        components: {
        }
    }
</script>

<style scoped lang="less" type="text/less">
    body {

    }
</style>
