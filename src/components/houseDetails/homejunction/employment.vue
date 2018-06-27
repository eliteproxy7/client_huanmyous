<template>
    <article class="echart-chart">
        <div class="inside">
            <header>就业比例</header>
            <div class="chartBox clearfix" style="height: 400px;" v-show="!chartNoDataShow">
                <div class="regionType-button clearfix">
                    <el-button-group>
                        <el-button type="primary" v-for="(item, key, index) in EmploymentData" :key="index" v-if="item" size="mini" @click="regionTypeChange(key)">{{key}}</el-button>
                    </el-button-group>
                </div>
                <div class="chart-div" id="Employment-chart" v-show="!chartNoDataShow" style="height: 350px;"></div>
                <h4 ref="Employment_chart_NoData" v-show="chartNoDataShow"></h4>
            </div>
            <p v-show="false">{{2}}</p>
        </div>
    </article>
</template>

<script>
    export default {
        data() {
            return {
                EmploymentData: null,//就业数据
                stateEmploymentData: null,//州——就业数据
                cityEmploymentData: null,//城市——就业数据
                zipEmploymentData: null,//邮编——就业数据
                countyEmploymentData: null,//郡县——就业数据
                neighbourhoodEmploymentData: null,//附近——就业数据

                EmploymentMyEcharts: '',//就业比例——饼图
                regionType: 'state',//地区级别

                chartNoDataShow: false, //判断是否有无数据
            }
        },
        computed: {
            getEmployment() {
                if(this.$store.getters.get_homejunctionData.employment){
                    this.EmploymentData = this.$store.getters.get_homejunctionData.employment;
                    this.stateEmploymentData = this.$store.getters.get_homejunctionData.employment.state;
                    this.cityEmploymentData = this.$store.getters.get_homejunctionData.employment.city;
                    this.zipEmploymentData = this.$store.getters.get_homejunctionData.employment.zip;
                    this.countyEmploymentData = this.$store.getters.get_homejunctionData.employment.county;
                    this.neighbourhoodEmploymentData = this.$store.getters.get_homejunctionData.employment.neighbourhood;

                    this.get_Employment();
                }
                return this.$store.getters.get_homejunctionData.employment
            }
        },
        created() {
        },
        mounted() {
            this.EmploymentMyEcharts = this.$echarts.init(document.getElementById('Employment-chart'));
            this.EmploymentMyEcharts.showLoading();
            window.addEventListener('resize', () => {
                this.EmploymentMyEcharts.resize();
            });
        },
        methods: {
            //获取就业比例数据
            get_Employment() {
                this.$nextTick(() => {
                    if(this.EmploymentData){
                        this.chartNoDataShow = false;
                        this.Employment_charts(this.stateEmploymentData.accommodations, this.stateEmploymentData.administration, this.stateEmploymentData.agriculture, this.stateEmploymentData.arts,
                            this.stateEmploymentData.construction, this.stateEmploymentData.education, this.stateEmploymentData.finance, this.stateEmploymentData.arts,
                            this.stateEmploymentData.accommodations, this.stateEmploymentData.administration, this.stateEmploymentData.agriculture, this.stateEmploymentData.arts);
                    }else{
                        this.chartNoDataShow = true;
                        this.$refs.Employment_chart_NoData.innerText = data.msg;
                    }
                })
            },
            //地区级别Change事件
            regionTypeChange(value){
                if (value == 'state') {
                    this.Employment_charts(this.stateEmploymentData.accommodations,
                        this.stateEmploymentData.administration,
                        this.stateEmploymentData.agriculture,
                        this.stateEmploymentData.arts,
                        this.stateEmploymentData.construction,
                        this.stateEmploymentData.education,
                        this.stateEmploymentData.finance,
                        this.stateEmploymentData.government,
                        this.stateEmploymentData.healthcare,
                        this.stateEmploymentData.management,
                        this.stateEmploymentData.manufacturing,
                        this.stateEmploymentData.mining,
                        this.stateEmploymentData.other,
                        this.stateEmploymentData.professional,
                        this.stateEmploymentData.realestate,
                        this.stateEmploymentData.retail,
                        this.stateEmploymentData.technology,
                        this.stateEmploymentData.transportation,
                        this.stateEmploymentData.utilities,
                        this.stateEmploymentData.wholesale);
                }else if (value == 'city') {
                    this.Employment_charts(this.cityEmploymentData.accommodations,
                        this.cityEmploymentData.administration,
                        this.cityEmploymentData.agriculture,
                        this.cityEmploymentData.arts,
                        this.cityEmploymentData.construction,
                        this.cityEmploymentData.education,
                        this.cityEmploymentData.finance,
                        this.cityEmploymentData.government,
                        this.cityEmploymentData.healthcare,
                        this.cityEmploymentData.management,
                        this.cityEmploymentData.manufacturing,
                        this.cityEmploymentData.mining,
                        this.cityEmploymentData.other,
                        this.cityEmploymentData.professional,
                        this.cityEmploymentData.realestate,
                        this.cityEmploymentData.retail,
                        this.cityEmploymentData.technology,
                        this.cityEmploymentData.transportation,
                        this.cityEmploymentData.utilities,
                        this.cityEmploymentData.wholesale);
                }else if (value == 'zip') {
                    this.Employment_charts(this.zipEmploymentData.accommodations,
                        this.zipEmploymentData.administration,
                        this.zipEmploymentData.agriculture,
                        this.zipEmploymentData.arts,
                        this.zipEmploymentData.construction,
                        this.zipEmploymentData.education,
                        this.zipEmploymentData.finance,
                        this.zipEmploymentData.government,
                        this.zipEmploymentData.healthcare,
                        this.zipEmploymentData.management,
                        this.zipEmploymentData.manufacturing,
                        this.zipEmploymentData.mining,
                        this.zipEmploymentData.other,
                        this.zipEmploymentData.professional,
                        this.zipEmploymentData.realestate,
                        this.zipEmploymentData.retail,
                        this.zipEmploymentData.technology,
                        this.zipEmploymentData.transportation,
                        this.zipEmploymentData.utilities,
                        this.zipEmploymentData.wholesale);
                }else if (value == 'county') {
                    this.Employment_charts(this.countyEmploymentData.accommodations,
                        this.countyEmploymentData.administration,
                        this.countyEmploymentData.agriculture,
                        this.countyEmploymentData.arts,
                        this.countyEmploymentData.construction,
                        this.countyEmploymentData.education,
                        this.countyEmploymentData.finance,
                        this.countyEmploymentData.government,
                        this.countyEmploymentData.healthcare,
                        this.countyEmploymentData.management,
                        this.countyEmploymentData.manufacturing,
                        this.countyEmploymentData.mining,
                        this.countyEmploymentData.other,
                        this.countyEmploymentData.professional,
                        this.countyEmploymentData.realestate,
                        this.countyEmploymentData.retail,
                        this.countyEmploymentData.technology,
                        this.countyEmploymentData.transportation,
                        this.countyEmploymentData.utilities,
                        this.countyEmploymentData.wholesale);
                }else if (value == 'neighbourhood') {
                    this.Employment_charts(this.neighbourhoodEmploymentData.accommodations,
                        this.neighbourhoodEmploymentData.administration,
                        this.neighbourhoodEmploymentData.agriculture,
                        this.neighbourhoodEmploymentData.arts,
                        this.neighbourhoodEmploymentData.construction,
                        this.neighbourhoodEmploymentData.education,
                        this.neighbourhoodEmploymentData.finance,
                        this.neighbourhoodEmploymentData.government,
                        this.neighbourhoodEmploymentData.healthcare,
                        this.neighbourhoodEmploymentData.management,
                        this.neighbourhoodEmploymentData.manufacturing,
                        this.neighbourhoodEmploymentData.mining,
                        this.neighbourhoodEmploymentData.other,
                        this.neighbourhoodEmploymentData.professional,
                        this.neighbourhoodEmploymentData.realestate,
                        this.neighbourhoodEmploymentData.retail,
                        this.neighbourhoodEmploymentData.technology,
                        this.neighbourhoodEmploymentData.transportation,
                        this.neighbourhoodEmploymentData.utilities,
                        this.neighbourhoodEmploymentData.wholesale);
                }
            },
            //就业比例——饼图
            Employment_charts(accommodations, administration, agriculture, arts, construction, education, finance, government, healthcare, management, manufacturing, mining, other, professional, realestate, retail, technology, transportation, utilities, wholesale){
                this.EmploymentMyEcharts.hideLoading();
                this.EmploymentMyEcharts.setOption({
                    baseOption:{
                        title: {
                            text: '就业比例',
                            left: 'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/> <span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#00b8ee'></span> {b}: {c}%"
                        },
                        legend: {
                            orient: 'vertical',
                            left: '20',
                            data: ['住宿', '行政机构', '农业', '艺术', '建设', '教育', '金融', '政府', '医疗卫生', '管理部门', '制造业', '矿业', '其他', 'professional', '房地产', '零售', '技术', '运输', '公共事业', '批发']
                        },
                        series : [{
                            name: '就业比例',
                            type: 'pie',
                            radius :  ['23%', '53%'],//圆的内外半径
                            center: ['47%', '60%'],//圆的X,Y轴平移
                            data:[
                                {
                                    value: accommodations,
                                    name: '住宿',
                                },
                                {
                                    value: administration,
                                    name: '行政机构',
                                },
                                {
                                    value: agriculture,
                                    name: '农业',
                                },
                                {
                                    value: arts,
                                    name: '艺术',
                                },
                                {
                                    value: construction,
                                    name: '建设',
                                },
                                {
                                    value: education,
                                    name: '教育',
                                },
                                {
                                    value: finance,
                                    name: '金融',
                                },
                                {
                                    value: government,
                                    name: '政府',
                                },
                                {
                                    value: healthcare,
                                    name: '医疗卫生',
                                },
                                {
                                    value: management,
                                    name: '管理部门',
                                },
                                {
                                    value: manufacturing,
                                    name: '制造业',
                                },
                                {
                                    value: mining,
                                    name: '矿业',
                                },
                                {
                                    value: other,
                                    name: '其他',
                                },
                                {
                                    value: professional,
                                    name: 'professional',
                                },
                                {
                                    value: realestate,
                                    name: '房地产',
                                },
                                {
                                    value: retail,
                                    name: '零售',
                                },
                                {
                                    value: technology,
                                    name: '技术',
                                },
                                {
                                    value: transportation,
                                    name: '运输',
                                },
                                {
                                    value: utilities,
                                    name: '公共事业',
                                },
                                {
                                    value: wholesale,
                                    name: '批发',
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
</script>w

<style scoped lang="less" type="text/less">
</style>
