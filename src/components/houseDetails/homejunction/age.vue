<template>
    <article class="echart-chart">
        <div class="inside">
            <header>年龄统计</header>
            <div class="chartBox clearfix">
                <!--<el-radio-group v-model="regionType" @change="regionTypeChange">-->
                    <!--<el-radio :label="key" v-for="(item, key, index) in ageData" :key="index" v-if="item"></el-radio>-->
                <!--</el-radio-group>-->
                <div class="regionType-button clearfix" v-show="!chartNoDataShow">
                    <el-button-group>
                        <el-button type="primary" v-for="(item, key, index) in ageData" :key="index" v-if="item" size="mini" @click="regionTypeChange(key)">{{key}}</el-button>
                    </el-button-group>
                </div>
                <div id="raceAverageAge-chart" v-show="!chartNoDataShow" style="height: 300px;"></div>
                <div id="populationProportion-chart" v-show="!chartNoDataShow" style="height: 300px;"></div>
                <h4 ref="age_chart_NoData" v-show="chartNoDataShow"></h4>
            </div>
            <p v-show="false">{{getAge}}</p>
        </div>
    </article>
</template>

<script>
    export default {
        data() {
            return {
                ageData: null,//年龄数据
                stateAgeData: null,//州——年龄数据
                cityAgeData: null,//城市——年龄数据
                zipAgeData: null,//邮编——年龄数据
                countyAgeData: null,//郡县——年龄数据
                neighbourhoodAgeData: null,//附近——年龄数据

                raceAverageAgeMyEcharts: '',//种族人口平均年龄——柱状图
                populationProportionMyEcharts: '',//人口年龄比例——饼图
                regionType: 'state',//地区级别

                chartNoDataShow: false, //判断是否有无数据
            }
        },
        computed: {
            getAge() {

                if(this.$store.getters.get_homejunctionData.age){
                    this.ageData = this.$store.getters.get_homejunctionData.age;
                    this.stateAgeData = this.$store.getters.get_homejunctionData.age.state;
                    this.cityAgeData = this.$store.getters.get_homejunctionData.age.city;
                    this.zipAgeData = this.$store.getters.get_homejunctionData.age.zip;
                    this.countyAgeData = this.$store.getters.get_homejunctionData.age.county;
                    this.neighbourhoodAgeData = this.$store.getters.get_homejunctionData.age.neighbourhood;
                    console.log( this.ageData)
                    this.get_raceAverageAge();
                }
                return this.$store.getters.get_homejunctionData.age
            }
        },
        created() {
        },
        mounted() {
            this.raceAverageAgeMyEcharts = this.$echarts.init(document.getElementById('raceAverageAge-chart'));
            this.raceAverageAgeMyEcharts.showLoading();

            this.populationProportionMyEcharts = this.$echarts.init(document.getElementById('populationProportion-chart'));
            this.populationProportionMyEcharts.showLoading();

            window.addEventListener('resize', () => {
                this.raceAverageAgeMyEcharts.resize();
                this.populationProportionMyEcharts.resize();
            });
        },
        methods: {
            //获取种族人口平均年龄数据
            get_raceAverageAge() {
                this.$nextTick(() => {
                    if(this.ageData){
                        this.chartNoDataShow = false;
                        this.raceAverageAge_charts(this.stateAgeData.asian, this.stateAgeData.black, this.stateAgeData.female, this.stateAgeData.hispanic, this.stateAgeData.male, this.stateAgeData.median, this.stateAgeData.white);
                        this.populationProportion_charts(this.stateAgeData.y0_5, this.stateAgeData.y6_11, this.stateAgeData.y12_17, this.stateAgeData.y18_24, this.stateAgeData.y25_34, this.stateAgeData.y35_44, this.stateAgeData.y45_54, this.stateAgeData.y55_64, this.stateAgeData.y65_74, this.stateAgeData.y75_84, this.stateAgeData.y85_UP);
                    }else{
                        this.chartNoDataShow = true;
                        this.$refs.age_chart_NoData.innerText = data.msg;
                    }
                })
            },
            //地区级别Change事件
            regionTypeChange(value){
                if (value == 'state') {
                    this.raceAverageAge_charts(this.stateAgeData.asian, this.stateAgeData.black, this.stateAgeData.female, this.stateAgeData.hispanic, this.stateAgeData.male, this.stateAgeData.median, this.stateAgeData.white);
                    this.populationProportion_charts(this.stateAgeData.y0_5, this.stateAgeData.y6_11, this.stateAgeData.y12_17, this.stateAgeData.y18_24, this.stateAgeData.y25_34, this.stateAgeData.y35_44, this.stateAgeData.y45_54, this.stateAgeData.y55_64, this.stateAgeData.y65_74, this.stateAgeData.y75_84, this.stateAgeData.y85_UP);
                }else if (value == 'city') {
                    this.raceAverageAge_charts(this.cityAgeData.asian, this.cityAgeData.black, this.cityAgeData.female, this.cityAgeData.hispanic, this.cityAgeData.male, this.cityAgeData.median, this.cityAgeData.white);
                    this.populationProportion_charts(this.cityAgeData.y0_5, this.cityAgeData.y6_11, this.cityAgeData.y12_17, this.cityAgeData.y18_24, this.cityAgeData.y25_34, this.cityAgeData.y35_44, this.cityAgeData.y45_54, this.cityAgeData.y55_64, this.cityAgeData.y65_74, this.cityAgeData.y75_84, this.cityAgeData.y85_UP);
                }else if (value == 'zip') {
                    this.raceAverageAge_charts(this.zipAgeData.asian, this.zipAgeData.black, this.zipAgeData.female, this.zipAgeData.hispanic, this.zipAgeData.male, this.zipAgeData.median, this.zipAgeData.white);
                    this.populationProportion_charts(this.zipAgeData.y0_5, this.zipAgeData.y6_11, this.zipAgeData.y12_17, this.zipAgeData.y18_24, this.zipAgeData.y25_34, this.zipAgeData.y35_44, this.zipAgeData.y45_54, this.zipAgeData.y55_64, this.zipAgeData.y65_74, this.zipAgeData.y75_84, this.zipAgeData.y85_UP);
                }else if (value == 'county') {
                    this.raceAverageAge_charts(this.countyAgeData.asian, this.countyAgeData.black, this.countyAgeData.female, this.countyAgeData.hispanic, this.countyAgeData.male, this.countyAgeData.median, this.countyAgeData.white);
                    this.populationProportion_charts(this.countyAgeData.y0_5, this.countyAgeData.y6_11, this.countyAgeData.y12_17, this.countyAgeData.y18_24, this.countyAgeData.y25_34, this.countyAgeData.y35_44, this.countyAgeData.y45_54, this.countyAgeData.y55_64, this.countyAgeData.y65_74, this.countyAgeData.y75_84, this.countyAgeData.y85_UP);
                }else if (value == 'neighbourhood') {
                    this.raceAverageAge_charts(this.neighbourhoodAgeData.asian, this.neighbourhoodAgeData.black, this.neighbourhoodAgeData.female, this.neighbourhoodAgeData.hispanic, this.neighbourhoodAgeData.male, this.neighbourhoodAgeData.median, this.neighbourhoodAgeData.white);
                    this.populationProportion_charts(this.neighbourhoodAgeData.y0_5, this.neighbourhoodAgeData.y6_11, this.neighbourhoodAgeData.y12_17, this.neighbourhoodAgeData.y18_24, this.neighbourhoodAgeData.y25_34, this.neighbourhoodAgeData.y35_44, this.neighbourhoodAgeData.y45_54, this.neighbourhoodAgeData.y55_64, this.neighbourhoodAgeData.y65_74, this.neighbourhoodAgeData.y75_84, this.neighbourhoodAgeData.y85_UP);
                }
            },
            //种族人口平均年龄——柱状图
            raceAverageAge_charts(asian, black, white, hispanic, female, male, median) {
                this.raceAverageAgeMyEcharts.hideLoading();
                this.raceAverageAgeMyEcharts.setOption({
                    title: {
                        text: '种族人口平均年龄',
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
                        data: ["亚裔", "黑人", "白人", "拉美裔", "女性", "男性", "中位数"]
                    },
                    yAxis: {
                        splitLine: {show: false},//是否显示分隔线
                        axisTick: {show: false},//是否显示坐标轴刻度
                        axisLabel: {show: false},//是否显示刻度标签
                    },
                    series: [{
                        name: '种族人口平均年龄',
                        type: 'bar',
                        barWidth: '40',
                        label: {
                            normal: {
                                show: true,//柱子上边显示文字标签
                                position: 'top',
                                formatter: param => {
                                    return param.value +'岁';
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
                                value: asian,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: black,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: white,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: hispanic,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: female,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: male,
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
            //人口年龄比例——饼图
            populationProportion_charts(y0_5, y6_11, y12_17, y18_24, y25_34, y35_44, y45_54, y55_64, y65_74, y75_84, y85_UP){
                this.populationProportionMyEcharts.hideLoading();
                this.populationProportionMyEcharts.setOption({
                    baseOption:{
                        title: {
                            text: '人口年龄比例',
                            left: 'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/> <span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#00b8ee'></span> {b}: {c}%"
                        },
                        legend: {
                            orient: 'vertical',
                            left: '20',
                            data: ['0~5岁', '6~11岁', '12~17岁', '18~24岁', '25~34岁', '35~44岁', '45~54岁', '55~64岁', '65~74岁', '75~84岁', '85岁以上']
                        },
                        series : [{
                            name: '人口年龄比例',
                            type: 'pie',
                            radius :  ['23%', '53%'],//圆的内外半径
                            center: ['47%', '60%'],//圆的X,Y轴平移
                            data:[
                                {
                                    value: y0_5,
                                    name: '0~5岁',
                                },
                                {
                                    value: y6_11,
                                    name: '6~11岁',
                                },
                                {
                                    value: y12_17,
                                    name: '12~17岁',
                                },
                                {
                                    value: y18_24,
                                    name: '18~24岁',
                                },
                                {
                                    value: y25_34,
                                    name: '25~34岁',
                                },
                                {
                                    value: y35_44,
                                    name: '35~44岁',
                                },
                                {
                                    value: y45_54,
                                    name: '45~54岁',
                                },
                                {
                                    value: y55_64,
                                    name: '55~64岁',
                                },
                                {
                                    value: y65_74,
                                    name: '65~74岁',
                                },
                                {
                                    value: y75_84,
                                    name: '75~84岁',
                                },
                                {
                                    value: y85_UP,
                                    name: '85岁以上',
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
