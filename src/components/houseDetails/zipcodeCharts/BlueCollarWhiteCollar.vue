<template>
    <div class="echart-chart">
        <div class="inside">
            <header>蓝领/白领比例</header>
            <div class="chartBox clearfix">
                <div class="chart-div" id="BlueCollar-whiteCollar-chart" v-show="!chartNoDataShow"></div>
                <h4 ref="BlueCollar_whiteCollar_chart_NoData" v-show="chartNoDataShow"></h4>
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
                    this.get_BlueCollar_whiteCollar();
                }
                return this.$store.getters.get_houseDetailsZipcode
            }
        },
        created() {
        },
        mounted() {
            this.myEcharts = this.$echarts.init(document.getElementById('BlueCollar-whiteCollar-chart'));
            this.myEcharts.showLoading();
            window.addEventListener('resize', () => {
                this.myEcharts.resize();
            });
        },
        methods: {
            //获取蓝领/白领比例数据
            get_BlueCollar_whiteCollar() {
                this.$get('/report/bluewhitecollar/' + this.$store.getters.get_houseDetailsZipcode).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.chartNoDataShow = false;
                        this.BlueCollar_whiteCollar_charts(data.data.blue*100, data.data.white*100);
                    } else {
                        this.chartNoDataShow = true;
                        this.$refs.BlueCollar_whiteCollar_chart_NoData.innerText = data.msg;
                    }
                });
            },
            //蓝领/白领比例——饼图
            BlueCollar_whiteCollar_charts(BlueCollar, whiteCollar){
                this.myEcharts.hideLoading();
                this.myEcharts.setOption({
                    baseOption:{
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/> <span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#00b8ee'></span> {b}: {c}%"
                        },
                        legend: {
                            orient: 'horizontal',
                            left: 'center',
                            top: '20',
                            data: ['蓝领','白领']
                        },
                        series : [{
                            name: '蓝领/白领比例',
                            type: 'pie',
                            radius :  ['23%', '53%'],//圆的内外半径
                            center: ['47%', '60%'],//圆的X,Y轴平移
                            data:[
                                {
                                    value: BlueCollar,
                                    name: '蓝领',
                                    itemStyle:{//圆形颜色
                                        normal:{color:'#00b8ee'}
                                    }
                                },
                                {
                                    value: whiteCollar,
                                    name: '白领',
                                    itemStyle:{
                                        normal:{color:'#fe9e25'}
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
                            label:{
                                normal:{
                                    formatter:'{b}：{c}%'
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
                                    center: ['47%', '50%'],//圆的X,Y轴平移
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
