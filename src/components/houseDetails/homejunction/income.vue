<template>
    <article class="echart-chart">
        <div class="inside">
            <header>家庭收入统计</header>
            <div class="chartBox clearfix" style="height: 650px;">
                <div class="regionType-button clearfix" v-show="!chartNoDataShow">
                    <el-button-group>
                        <el-button type="primary" v-for="(item, key, index) in IncomeData" :key="index" v-if="item" size="mini" @click="regionTypeChange(key)">{{key}}</el-button>
                    </el-button-group>
                </div>
                <div id="AverageMedian-chart" v-show="!chartNoDataShow" style="height: 300px;"></div>
                <div id="IncomeFamilyProportion-chart" v-show="!chartNoDataShow" style="height: 300px;"></div>
                <h4 ref="Income_chart_NoData" v-show="chartNoDataShow"></h4>
            </div>
            <p v-show="false">{{getIncome}}</p>
        </div>
    </article>
</template>

<script>
    export default {
        data() {
            return {
                IncomeData: null,//家庭收入数据
                stateIncomeData: null,//州——家庭收入数据
                cityIncomeData: null,//城市——家庭收入数据
                zipIncomeData: null,//邮编——家庭收入数据
                countyIncomeData: null,//郡县——家庭收入数据
                neighbourhoodIncomeData: null,//附近——家庭收入数据

                AverageMedianMyEcharts: '',//种族人口平均家庭收入——柱状图
                IncomeFamilyProportionMyEcharts: '',//年收入家庭比例——饼图
                regionType: 'state',//地区级别

                chartNoDataShow: false, //判断是否有无数据
            }
        },
        computed: {
            getIncome() {
                if(this.$store.getters.get_homejunctionData.income){
                    this.IncomeData = this.$store.getters.get_homejunctionData.income;
                    this.stateIncomeData = this.$store.getters.get_homejunctionData.income.state;
                    this.cityIncomeData = this.$store.getters.get_homejunctionData.income.city;
                    this.zipIncomeData = this.$store.getters.get_homejunctionData.income.zip;
                    this.countyIncomeData = this.$store.getters.get_homejunctionData.income.county;
                    this.neighbourhoodIncomeData = this.$store.getters.get_homejunctionData.income.neighbourhood;

                    this.get_AverageMedian();
                }
                return this.$store.getters.get_homejunctionData.income
            }
        },
        created() {
        },
        mounted() {
            this.AverageMedianMyEcharts = this.$echarts.init(document.getElementById('AverageMedian-chart'));
            this.AverageMedianMyEcharts.showLoading();

            this.IncomeFamilyProportionMyEcharts = this.$echarts.init(document.getElementById('IncomeFamilyProportion-chart'));
            this.IncomeFamilyProportionMyEcharts.showLoading();

            window.addEventListener('resize', () => {
                this.AverageMedianMyEcharts.resize();
                this.IncomeFamilyProportionMyEcharts.resize();
            });
        },
        methods: {
            //获取家庭收入数据
            get_AverageMedian() {
                this.$nextTick(() => {
                    if(this.IncomeData){
                        this.chartNoDataShow = false;
                        this.AverageMedian_charts(this.stateIncomeData.average, this.stateIncomeData.median);
                        this.IncomeFamilyProportion_charts(this.stateIncomeData.percent0_15, this.stateIncomeData.percent15_25, this.stateIncomeData.percent25_35, this.stateIncomeData.percent35_50, this.stateIncomeData.percent50_75, this.stateIncomeData.percent75_100, this.stateIncomeData.percent100_125, this.stateIncomeData.percent125_150, this.stateIncomeData.percent150_200, this.stateIncomeData.percent200_up);
                    }else{
                        this.chartNoDataShow = true;
                        this.$refs.Income_chart_NoData.innerText = data.msg;
                    }
                })
            },
            //地区级别Change事件
            regionTypeChange(value){
                if (value == 'state') {
                    this.AverageMedian_charts(this.stateIncomeData.average, this.stateIncomeData.median);
                    this.IncomeFamilyProportion_charts(this.stateIncomeData.percent0_15, this.stateIncomeData.percent15_25, this.stateIncomeData.percent25_35, this.stateIncomeData.percent35_50, this.stateIncomeData.percent50_75, this.stateIncomeData.percent75_100, this.stateIncomeData.percent100_125, this.stateIncomeData.percent125_150, this.stateIncomeData.percent150_200, this.stateIncomeData.percent200_up);
                }else if (value == 'city') {
                    this.AverageMedian_charts(this.cityIncomeData.average, this.cityIncomeData.median);
                    this.IncomeFamilyProportion_charts(this.cityIncomeData.percent0_15, this.cityIncomeData.percent15_25, this.cityIncomeData.percent25_35, this.cityIncomeData.percent35_50, this.cityIncomeData.percent50_75, this.cityIncomeData.percent75_100, this.cityIncomeData.percent100_125, this.cityIncomeData.percent125_150, this.cityIncomeData.percent150_200, this.cityIncomeData.percent200_up);
                }else if (value == 'zip') {
                    this.AverageMedian_charts(this.zipIncomeData.average, this.zipIncomeData.median);
                    this.IncomeFamilyProportion_charts(this.zipIncomeData.percent0_15, this.zipIncomeData.percent15_25, this.zipIncomeData.percent25_35, this.zipIncomeData.percent35_50, this.zipIncomeData.percent50_75, this.zipIncomeData.percent75_100, this.zipIncomeData.percent100_125, this.zipIncomeData.percent125_150, this.zipIncomeData.percent150_200, this.zipIncomeData.percent200_up);
                }else if (value == 'county') {
                    this.AverageMedian_charts(this.countyIncomeData.average, this.countyIncomeData.median);
                    this.IncomeFamilyProportion_charts(this.countyIncomeData.percent0_15, this.countyIncomeData.percent15_25, this.countyIncomeData.percent25_35, this.countyIncomeData.percent35_50, this.countyIncomeData.percent50_75, this.countyIncomeData.percent75_100, this.countyIncomeData.percent100_125, this.countyIncomeData.percent125_150, this.countyIncomeData.percent150_200, this.countyIncomeData.percent200_up);
                }else if (value == 'neighbourhood') {
                    this.AverageMedian_charts(this.neighbourhoodIncomeData.average, this.neighbourhoodIncomeData.median);
                    this.IncomeFamilyProportion_charts(this.neighbourhoodIncomeData.percent0_15, this.neighbourhoodIncomeData.percent15_25, this.neighbourhoodIncomeData.percent25_35, this.neighbourhoodIncomeData.percent35_50, this.neighbourhoodIncomeData.percent50_75, this.neighbourhoodIncomeData.percent75_100, this.neighbourhoodIncomeData.percent100_125, this.neighbourhoodIncomeData.percent125_150, this.neighbourhoodIncomeData.percent150_200, this.neighbourhoodIncomeData.percent200_up);
                }
            },
            //家庭收入的平均值和中位数——柱状图
            AverageMedian_charts(average, median) {
                this.AverageMedianMyEcharts.hideLoading();
                this.AverageMedianMyEcharts.setOption({
                    title: {
                        text: '家庭收入的平均值和中位数',
                        left: 'center'
                    },
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
                        data: ["平均值", "中位数"]
                    },
                    yAxis: {
                        splitLine: {show: false},//是否显示分隔线
                        axisTick: {show: false},//是否显示坐标轴刻度
                        axisLabel: {show: false},//是否显示刻度标签
                    },
                    series: [{
                        name: '家庭收入的平均值和中位数',
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
                                value: average,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: median,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                        ],
                        animationDelay: function (idx) {
                            return idx * 10;
                        }
                    }],
                    animationEasing: 'elasticOut'
                });
            },
            //年收入家庭比例——饼图
            IncomeFamilyProportion_charts(y0_15, y15_25, y25_35, y35_50, y50_75, y75_100, y100_125, y125_150, y150_200, y200_UP){
                this.IncomeFamilyProportionMyEcharts.hideLoading();
                this.IncomeFamilyProportionMyEcharts.setOption({
                    baseOption:{
                        title: {
                            text: '年收入家庭比例',
                            left: 'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/> <span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#00b8ee'></span> {b}: {c}%"
                        },
                        legend: {
                            orient: 'vertical',
                            left: '20',
                            data: ['0 ~ $1.5万', '$1.5万 ~ $2.5万', '$2.5万 ~ $3.5万', '$3.5万 ~ $5万', '$5万 ~ $7.5万', '$7.5万 ~ $10万', '$10万 ~ $12.5万', '$12.5万 ~ $15万', '$15万 ~ $20万', '$20万以上']
                        },
                        series : [{
                            name: '年收入家庭比例',
                            type: 'pie',
                            radius :  ['23%', '53%'],//圆的内外半径
                            center: ['47%', '60%'],//圆的X,Y轴平移
                            data:[
                                {
                                    value: y0_15,
                                    name: '0 ~ $1.5万',
                                },
                                {
                                    value: y15_25,
                                    name: '$1.5万 ~ $2.5万',
                                },
                                {
                                    value: y25_35,
                                    name: '$2.5万 ~ $3.5万',
                                },
                                {
                                    value: y35_50,
                                    name: '$3.5万 ~ $5万',
                                },
                                {
                                    value: y50_75,
                                    name: '$5万 ~ $7.5万',
                                },
                                {
                                    value: y75_100,
                                    name: '$7.5万 ~ $10万',
                                },
                                {
                                    value: y100_125,
                                    name: '$10万 ~ $12.5万',
                                },
                                {
                                    value: y125_150,
                                    name: '$12.5万 ~ $15万',
                                },
                                {
                                    value: y150_200,
                                    name: '$15万 ~ $20万',
                                },
                                {
                                    value: y200_UP,
                                    name: '$20万以上',
                                },
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
        components: {}
    }
</script>

<style scoped lang="less" type="text/less">
</style>
