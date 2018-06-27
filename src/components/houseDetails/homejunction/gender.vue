<template>
    <article class="echart-chart">
        <div class="inside">
            <header>性别比例</header>
            <div class="chartBox clearfix">
                <div class="regionType-button clearfix" v-show="!chartNoDataShow">
                    <el-button-group>
                        <el-button type="primary" v-for="(item, key, index) in GenderData" :key="index" v-if="item" size="mini" @click="regionTypeChange(key)">{{key}}</el-button>
                    </el-button-group>
                </div>
                <div class="chart-div" id="Gender-chart" v-show="!chartNoDataShow"></div>
                <h4 ref="Gender_chart_NoData" v-show="chartNoDataShow"></h4>
            </div>
            <p v-show="false">{{getGender}}</p>
        </div>
    </article>
</template>

<script>
    export default {
        data() {
            return {
                GenderData: null,//性别数据
                stateGenderData: null,//州——性别数据
                cityGenderData: null,//城市——性别数据
                zipGenderData: null,//邮编——性别数据
                countyGenderData: null,//郡县——性别数据
                neighbourhoodGenderData: null,//附近——性别数据

                GenderMyEcharts: '',//性别比例——饼图
                regionType: 'state',//地区级别

                chartNoDataShow: false, //判断是否有无数据
            }
        },
        computed: {
            getGender() {
                if(this.$store.getters.get_homejunctionData.gender){
                    this.GenderData = this.$store.getters.get_homejunctionData.gender;
                    this.stateGenderData = this.$store.getters.get_homejunctionData.gender.state;
                    this.cityGenderData = this.$store.getters.get_homejunctionData.gender.city;
                    this.zipGenderData = this.$store.getters.get_homejunctionData.gender.zip;
                    this.countyGenderData = this.$store.getters.get_homejunctionData.gender.county;
                    this.neighbourhoodGenderData = this.$store.getters.get_homejunctionData.gender.neighbourhood;

                    this.get_Gender();
                }
                return this.$store.getters.get_homejunctionData.gender
            }
        },
        created() {
        },
        mounted() {
            this.GenderMyEcharts = this.$echarts.init(document.getElementById('Gender-chart'));
            this.GenderMyEcharts.showLoading();
            window.addEventListener('resize', () => {
                this.GenderMyEcharts.resize();
            });
        },
        methods: {
            //获取性别比例数据
            get_Gender() {
                this.$nextTick(() => {
                    if(this.GenderData){
                        this.chartNoDataShow = false;
                        this.Gender_charts(this.stateGenderData.male, this.stateGenderData.female);
                    }else{
                        this.chartNoDataShow = true;
                        this.$refs.Gender_chart_NoData.innerText = data.msg;
                    }
                })
            },
            //地区级别Change事件
            regionTypeChange(value){
                if (value == 'state') {
                    this.Gender_charts(this.stateGenderData.male, this.stateGenderData.female);
                }else if (value == 'city') {
                    this.Gender_charts(this.cityGenderData.male, this.cityGenderData.female);
                }else if (value == 'zip') {
                    this.Gender_charts(this.zipGenderData.male, this.zipGenderData.female);
                }else if (value == 'county') {
                    this.Gender_charts(this.countyGenderData.male, this.countyGenderData.female);
                }else if (value == 'neighbourhood') {
                    this.Gender_charts(this.neighbourhoodGenderData.male, this.neighbourhoodGenderData.female);
                }
            },
            //性别比例——饼图
            Gender_charts(male, female){
                this.GenderMyEcharts.hideLoading();
                this.GenderMyEcharts.setOption({
                    baseOption:{
                        title: {
                            text: '性别比例',
                            left: 'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/> <span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#00b8ee'></span> {b}: {c}%"
                        },
                        legend: {
                            orient: 'vertical',
                            left: '20',
                            data: ['男性', '女性']
                        },
                        series : [{
                            name: '性别比例',
                            type: 'pie',
                            radius :  ['23%', '53%'],//圆的内外半径
                            center: ['47%', '60%'],//圆的X,Y轴平移
                            data:[
                                {
                                    value: male,
                                    name: '男性',
                                },
                                {
                                    value: female,
                                    name: '女性',
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
