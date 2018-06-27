<template>
    <div class="echart-chart">
        <div class="inside">
            <header>通勤指数</header>
            <div class="chartBox clearfix">
                <div class="chart-div" id="commuter-index-chart" v-show="!chartNoDataShow"></div>
                <h4 ref="commuter_index_chart_NoData" v-show="chartNoDataShow"></h4>
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
                    this.get_commuteIndex();
                }
                return this.$store.getters.get_houseDetailsZipcode
            }
        },
        created() {
        },
        mounted() {
            this.myEcharts = this.$echarts.init(document.getElementById('commuter-index-chart'));
            this.myEcharts.showLoading();
            window.addEventListener('resize', () => {
                this.myEcharts.resize();
            });
        },
        methods: {
            //获取通勤指数数据
            get_commuteIndex() {
                this.$get('/report/commuteindex/' + this.$store.getters.get_houseDetailsZipcode).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.chartNoDataShow = false;
                        this.commuteIndex_charts(data.data.bike, data.data.car, data.data.foot, data.data.transit);
                    } else {
                        this.chartNoDataShow = true;
                        this.$refs.commuter_index_chart_NoData.innerText = data.msg;
                    }
                });
            },
            //通勤指数——饼图
            commuteIndex_charts(bike, car, foot, transit){
                this.myEcharts.hideLoading();
                this.myEcharts.setOption({
                    baseOption:{
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/> <span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#ffe325'></span> {b}: {c}%"
                        },
                        legend: {
                            orient: 'vertical',
                            left: '20',
                            top: '20',
                            data: ['骑车', '驾车', '步行', '公交']
                        },
                        series: [{
                            name: '通勤指数',
                            type: 'pie',
                            radius: ['18%', '47%'],//圆的内外半径
                            center: ['49%', '60%'],//圆的X,Y轴平移
                            data: [
                                {
                                    value: bike,
                                    name: '骑车',
                                    itemStyle: {//圆形颜色
                                        normal: {color: '#00b8ee'}
                                    }
                                },
                                {
                                    value: car,
                                    name: '驾车',
                                    itemStyle: {
                                        normal: {color: '#fe9e25'}
                                    }
                                },
                                {
                                    value: foot,
                                    name: '步行',
                                    itemStyle: {//圆形颜色
                                        normal: {color: '#8fc320'}
                                    }
                                },
                                {
                                    value: transit,
                                    name: '公交',
                                    itemStyle: {
                                        normal: {color: '#d2335b'}
                                    }
                                }
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            label: {
                                normal: {
                                    formatter: '{b}：{d}%'
                                }
                            }
                        }]
                    },
                    media:[
                        {
                            query:{
                                maxWidth: 315,
                            },
                            option:{
                                legend: {
                                    top: '0',
                                },
                                series: [{
                                    radius: ['16%', '40%'],//圆的内外半径
                                    center: ['49%', '55%'],//圆的X,Y轴平移
                                    labelLine:{
                                        normal:{
                                            length
                                        }
                                    }
                                }]
                            }
                        }
                    ]
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
