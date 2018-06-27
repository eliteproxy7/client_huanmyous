<template>
    <article class="echart-chart">
        <div class="inside">
            <header>教育比例</header>
            <div class="chartBox clearfix">
                <div class="regionType-button clearfix" v-show="!chartNoDataShow">
                    <el-button-group>
                        <el-button type="primary" v-for="(item, key, index) in EducationData" :key="index" v-if="item" size="mini" @click="regionTypeChange(key)">{{key}}</el-button>
                    </el-button-group>
                </div>
                <div class="chart-div" id="Education-chart" v-show="!chartNoDataShow"></div>
                <h4 ref="Education_chart_NoData" v-show="chartNoDataShow"></h4>
            </div>
            <p v-show="false">{{getEducation}}</p>
        </div>
    </article>
</template>

<script>
    export default {
        data() {
            return {
                EducationData: null,//教育数据
                stateEducationData: null,//州——教育数据
                cityEducationData: null,//城市——教育数据
                zipEducationData: null,//邮编——教育数据
                countyEducationData: null,//郡县——教育数据
                neighbourhoodEducationData: null,//附近——教育数据

                EducationMyEcharts: '',//教育比例——饼图
                regionType: 'state',//地区级别

                chartNoDataShow: false, //判断是否有无数据
            }
        },
        computed: {
            getEducation() {
                if(this.$store.getters.get_homejunctionData.education){
                    this.EducationData = this.$store.getters.get_homejunctionData.education;
                    this.stateEducationData = this.$store.getters.get_homejunctionData.education.state;
                    this.cityEducationData = this.$store.getters.get_homejunctionData.education.city;
                    this.zipEducationData = this.$store.getters.get_homejunctionData.education.zip;
                    this.countyEducationData = this.$store.getters.get_homejunctionData.education.county;
                    this.neighbourhoodEducationData = this.$store.getters.get_homejunctionData.education.neighbourhood;

                    this.get_Education();
                }
                return this.$store.getters.get_homejunctionData.education
            }
        },
        created() {
        },
        mounted() {
            this.EducationMyEcharts = this.$echarts.init(document.getElementById('Education-chart'));
            this.EducationMyEcharts.showLoading();
            window.addEventListener('resize', () => {
                this.EducationMyEcharts.resize();
            });
        },
        methods: {
            //获取教育比例数据
            get_Education() {
                this.$nextTick(() => {
                    if(this.EducationData){
                        this.chartNoDataShow = false;
                        this.Education_charts(this.stateEducationData.highschool, this.stateEducationData.associate, this.stateEducationData.bachelor, this.stateEducationData.graduate);
                    }else{
                        this.chartNoDataShow = true;
                        this.$refs.Education_chart_NoData.innerText = data.msg;
                    }
                })
            },
            //地区级别Change事件
            regionTypeChange(value){
                if (value == 'state') {
                    this.Education_charts(this.stateEducationData.highschool, this.stateEducationData.associate, this.stateEducationData.bachelor, this.stateEducationData.graduate);
                }else if (value == 'city') {
                    this.Education_charts(this.cityEducationData.highschool, this.cityEducationData.associate, this.cityEducationData.bachelor, this.cityEducationData.graduate);
                }else if (value == 'zip') {
                    this.Education_charts(this.zipEducationData.highschool, this.zipEducationData.associate, this.zipEducationData.bachelor, this.zipEducationData.graduate);
                }else if (value == 'county') {
                    this.Education_charts(this.countyEducationData.highschool, this.countyEducationData.associate, this.countyEducationData.bachelor, this.countyEducationData.graduate);
                }else if (value == 'neighbourhood') {
                    this.Education_charts(this.neighbourhoodEducationData.highschool, this.neighbourhoodEducationData.associate, this.neighbourhoodEducationData.bachelor, this.neighbourhoodEducationData.graduate);
                }
            },
            //教育比例——饼图
            Education_charts(highschool, associate, bachelor, graduate){
                let other = 100 - highschool - associate - bachelor - graduate;
                this.EducationMyEcharts.hideLoading();
                this.EducationMyEcharts.setOption({
                    baseOption:{
                        title: {
                            text: '接受教育比例',
                            left: 'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/> <span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#00b8ee'></span> {b}: {c}%"
                        },
                        legend: {
                            orient: 'vertical',
                            left: '20',
                            data: ['高中', 'associate', '本科', '研究生', '其他']
                        },
                        series : [{
                            name: '教育比例',
                            type: 'pie',
                            radius :  ['23%', '53%'],//圆的内外半径
                            center: ['47%', '60%'],//圆的X,Y轴平移
                            data:[
                                {
                                    value: this.$accounting.formatMoney(highschool, "", 2),
                                    name: '高中',
                                },
                                {
                                    value: this.$accounting.formatMoney(associate, "", 2),
                                    name: 'associate',
                                },
                                {
                                    value: this.$accounting.formatMoney(bachelor, "", 2),
                                    name: '本科',
                                },
                                {
                                    value: this.$accounting.formatMoney(graduate, "", 2),
                                    name: '研究生',
                                },
                                {
                                    value: this.$accounting.formatMoney(other, "", 2),
                                    name: '其他',
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
