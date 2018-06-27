<template>
    <div class="echart-chart">
        <div class="inside">
            <header>族裔比例</header>
            <div class="chartBox clearfix">
                <div class="chart-div" id="ethnic-chart" v-show="!chartNoDataShow"></div>
                <h4 ref="ethnic_chart_NoData" v-show="chartNoDataShow"></h4>
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
                    this.get_ethnic();
                }
                return this.$store.getters.get_houseDetailsZipcode
            }
        },
        created() {
        },
        mounted() {
            this.myEcharts = this.$echarts.init(document.getElementById('ethnic-chart'));
            this.myEcharts.showLoading();
            window.addEventListener('resize', () => {
                this.myEcharts.resize();
            });
        },
        methods: {
            //获取族裔比例数据
            get_ethnic() {
                this.$get('/report/populationratio/' + this.$store.getters.get_houseDetailsZipcode).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.chartNoDataShow = false;
                        this.ethnic_charts(data.data.white, data.data.indian, data.data.black, data.data.hispanic, data.data.islander);
                    } else {
                        this.chartNoDataShow = true;
                        this.$refs.ethnic_chart_NoData.innerText = data.msg;
                    }
                });
            },
            //族裔比例——饼图
            ethnic_charts(White_Person, indian_Person, Black_Person, hispanic_Person, islander_Person){
                this.myEcharts.hideLoading();
                this.myEcharts.setOption({
                    baseOption:{
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/> <span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#ffe325'></span> {b}: {d}%"
                        },
                        legend: {
                            orient: 'horizontal',
                            left: 'center',
                            top: '20',
                            data: ['白人','印第安裔','黑人','拉丁裔','太平洋及岛屿']
                        },
                        series : [{
                            name: '族裔比例',
                            type: 'pie',
                            radius :  ['18%', '45%'],//圆的内外半径
                            center: ['55%', '60%'],//圆的X,Y轴平移
                            data:[
                                {
                                    value: White_Person,
                                    name: '白人',
                                    itemStyle:{//圆形颜色
                                        normal:{color:'#00b8ee'}
                                    }
                                },
                                {
                                    value: indian_Person,
                                    name: '印第安裔',
                                    itemStyle:{
                                        normal:{color:'#8fc320'}
                                    }
                                },
                                {
                                    value: Black_Person,
                                    name: '黑人',
                                    itemStyle:{
                                        normal:{color:'#000'}
                                    }
                                },
                                {
                                    value: hispanic_Person,
                                    name: '拉丁裔',
                                    itemStyle:{
                                        normal:{color:'#fe9e25'}
                                    }
                                },
                                {
                                    value: islander_Person,
                                    name: '太平洋及岛屿',
                                    itemStyle:{
                                        normal:{color:'#d2335b'}
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
                                    formatter:'{b}：{d}%'
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
                                    radius: ['12%', '31%'],//圆的内外半径
                                    center: ['55%', '55%'],//圆的X,Y轴平移
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
