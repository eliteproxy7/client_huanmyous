<template>
    <article class="echart-chart">
        <div class="inside">
            <header>households指数</header>
            <div class="chartBox clearfix" style="height: 360px;" v-show="!chartNoDataShow">
                <div class="regionType-button clearfix">
                    <el-button-group>
                        <el-button type="primary" v-for="(item, key, index) in HouseholdsData" :key="index" v-if="item" size="mini" @click="regionTypeChange(key)">{{key}}</el-button>
                    </el-button-group>
                </div>
                <div class="chart-div" id="Households-chart" v-show="!chartNoDataShow" style="height: 280px;"></div>
                <p>该地区的总户数：{{this.$accounting.formatMoney(total, "", 0)}}户，住户居住的平均价值：{{this.$accounting.formatMoney(value, "$", 0)}}，住户的平均住宅建造年份：{{yearBuilt}}年，一个家庭住在住宅里的平均时间为：{{duration}}年。</p>
                <h4 ref="Households_chart_NoData" v-show="chartNoDataShow"></h4>
            </div>
            <p v-show="false">{{getHouseholds}}</p>
        </div>
    </article>
</template>

<script>
    export default {
        data() {
            return {
                HouseholdsData: null,//households数据
                stateHouseholdsData: null,//州——households数据
                cityHouseholdsData: null,//城市——households数据
                zipHouseholdsData: null,//邮编——households数据
                countyHouseholdsData: null,//郡县——households数据
                neighbourhoodHouseholdsData: null,//附近——households数据
                HouseholdsMyEcharts: '',//households——饼图
                regionType: 'state',//地区级别
                total: '',//该地区的总户数
                value: '',//住户居住的平均价值
                yearBuilt: '',//住户的平均住宅建造年份
                duration: '',//一个家庭住在住宅里的平均时间为


                chartNoDataShow: false, //判断是否有无数据
            }
        },
        computed: {
            getHouseholds() {
                if(this.$store.getters.get_homejunctionData.households){
                    this.HouseholdsData = this.$store.getters.get_homejunctionData.households;
                    this.stateHouseholdsData = this.$store.getters.get_homejunctionData.households.state;
                    this.cityHouseholdsData = this.$store.getters.get_homejunctionData.households.city;
                    this.zipHouseholdsData = this.$store.getters.get_homejunctionData.households.zip;
                    this.countyHouseholdsData = this.$store.getters.get_homejunctionData.households.county;
                    this.neighbourhoodHouseholdsData = this.$store.getters.get_homejunctionData.households.neighbourhood;

                    this.get_Households();
                }
                return this.$store.getters.get_homejunctionData.households
            }
        },
        created() {
        },
        mounted() {
            this.HouseholdsMyEcharts = this.$echarts.init(document.getElementById('Households-chart'));
            this.HouseholdsMyEcharts.showLoading();
            window.addEventListener('resize', () => {
                this.HouseholdsMyEcharts.resize();
            });
        },
        methods: {
            //获取households数据
            get_Households() {
                this.$nextTick(() => {
                    if(this.HouseholdsData){
                        this.chartNoDataShow = false;
                        this.Households_charts(this.stateHouseholdsData.occupancy.children, this.stateHouseholdsData.occupancy.families, this.stateHouseholdsData.occupancy.married, this.stateHouseholdsData.occupancy.owned, this.stateHouseholdsData.occupancy.rented, this.stateHouseholdsData.occupancy.vacant);
                        this.total = this.stateHouseholdsData.total;//该地区的总户数
                        this.value = this.stateHouseholdsData.value;//住户居住的平均价值
                        this.yearBuilt = this.stateHouseholdsData.yearBuilt;//住户的平均住宅建造年份
                        this.duration = this.stateHouseholdsData.duration;//一个家庭住在住宅里的平均时间为
                    }else{
                        this.chartNoDataShow = true;
                        this.$refs.Households_chart_NoData.innerText = data.msg;
                    }
                })
            },
            //地区级别Change事件
            regionTypeChange(value){
                if (value == 'state') {
                    this.Households_charts(this.stateHouseholdsData.occupancy.children, this.stateHouseholdsData.occupancy.families, this.stateHouseholdsData.occupancy.married, this.stateHouseholdsData.occupancy.owned, this.stateHouseholdsData.occupancy.rented, this.stateHouseholdsData.occupancy.vacant);
                    this.total = this.stateHouseholdsData.total;//该地区的总户数
                    this.value = this.stateHouseholdsData.value;//住户居住的平均价值
                    this.yearBuilt = this.stateHouseholdsData.yearBuilt;//住户的平均住宅建造年份
                    this.duration = this.stateHouseholdsData.duration;//一个家庭住在住宅里的平均时间为
                }else if (value == 'city') {
                    this.Households_charts(this.cityHouseholdsData.occupancy.children, this.cityHouseholdsData.occupancy.families, this.cityHouseholdsData.occupancy.married, this.cityHouseholdsData.occupancy.owned, this.cityHouseholdsData.occupancy.rented, this.cityHouseholdsData.occupancy.vacant);
                    this.total = this.cityHouseholdsData.total;//该地区的总户数
                    this.value = this.cityHouseholdsData.value;//住户居住的平均价值
                    this.yearBuilt = this.cityHouseholdsData.yearBuilt;//住户的平均住宅建造年份
                    this.duration = this.cityHouseholdsData.duration;//一个家庭住在住宅里的平均时间为
                }else if (value == 'zip') {
                    this.Households_charts(this.zipHouseholdsData.occupancy.children, this.zipHouseholdsData.occupancy.families, this.zipHouseholdsData.occupancy.married, this.zipHouseholdsData.occupancy.owned, this.zipHouseholdsData.occupancy.rented, this.zipHouseholdsData.occupancy.vacant);
                    this.total = this.zipHouseholdsData.total;//该地区的总户数
                    this.value = this.zipHouseholdsData.value;//住户居住的平均价值
                    this.yearBuilt = this.zipHouseholdsData.yearBuilt;//住户的平均住宅建造年份
                    this.duration = this.zipHouseholdsData.duration;//一个家庭住在住宅里的平均时间为
                }else if (value == 'county') {
                    this.Households_charts(this.countyHouseholdsData.occupancy.children, this.countyHouseholdsData.occupancy.families, this.countyHouseholdsData.occupancy.married, this.countyHouseholdsData.occupancy.owned, this.countyHouseholdsData.occupancy.rented, this.countyHouseholdsData.occupancy.vacant);
                    this.total = this.countyHouseholdsData.total;//该地区的总户数
                    this.value = this.countyHouseholdsData.value;//住户居住的平均价值
                    this.yearBuilt = this.countyHouseholdsData.yearBuilt;//住户的平均住宅建造年份
                    this.duration = this.countyHouseholdsData.duration;//一个家庭住在住宅里的平均时间为
                }else if (value == 'neighbourhood') {
                    this.Households_charts(this.neighbourhoodHouseholdsData.occupancy.children, this.neighbourhoodHouseholdsData.occupancy.families, this.neighbourhoodHouseholdsData.occupancy.married, this.neighbourhoodHouseholdsData.occupancy.owned, this.neighbourhoodHouseholdsData.occupancy.rented, this.neighbourhoodHouseholdsData.occupancy.vacant);
                    this.total = this.neighbourhoodHouseholdsData.total;//该地区的总户数
                    this.value = this.neighbourhoodHouseholdsData.value;//住户居住的平均价值
                    this.yearBuilt = this.neighbourhoodHouseholdsData.yearBuilt;//住户的平均住宅建造年份
                    this.duration = this.neighbourhoodHouseholdsData.duration;//一个家庭住在住宅里的平均时间为
                }
            },
            //households——柱状图
            Households_charts(children, families, married, owned, rented, vacant) {
                this.HouseholdsMyEcharts.hideLoading();
                this.HouseholdsMyEcharts.setOption({
                    title: {
                        text: 'households指数',
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
                        data: ["有18岁以下儿童的家庭比例", "由家庭组成的家庭比例", "由已婚夫妇组成的家庭的百分比", "拥有住房的家庭比例", "租房家庭的比例", "该地区房屋空置率"]
                    },
                    yAxis: {
                        splitLine: {show: false},//是否显示分隔线
                        axisTick: {show: false},//是否显示坐标轴刻度
                        axisLabel: {show: false},//是否显示刻度标签
                    },
                    series: [{
                        name: 'households',
                        type: 'bar',
                        barWidth: '40',
                        label: {
                            normal: {
                                show: true,//柱子上边显示文字标签
                                position: 'top',
                                formatter: param => {
                                    return param.value +'%';
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
                                value: children,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: families,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: married,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: owned,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: rented,
                                itemStyle: {//柱子颜色
                                    normal: {color: '#00b8ee'}
                                }
                            },
                            {
                                value: vacant,
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

        },
        components: {}
    }
</script>

<style scoped lang="less" type="text/less">
</style>
