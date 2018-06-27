<template>
    <article class="echart-chart">
        <div class="inside">
            <header>面积比例</header>
            <div class="chartBox clearfix">
                <div class="regionType-button clearfix" v-show="!chartNoDataShow">
                    <el-button-group>
                        <el-button type="primary" v-for="(item, key, index) in areaData" :key="index" v-if="item" size="mini" @click="regionTypeChange(key)">{{key}}</el-button>
                    </el-button-group>
                </div>
                <div class="chart-div" id="area-chart" v-show="!chartNoDataShow"></div>
                <h4 ref="area_chart_NoData" v-show="chartNoDataShow"></h4>
            </div>
            <p v-show="false">{{getArea}}</p>
        </div>
    </article>
</template>

<script>
    export default {
        data() {
            return {
                areaData: null,//面积数据
                stateAreaData: null,//州——面积数据
                cityAreaData: null,//城市——面积数据
                zipAreaData: null,//邮编——面积数据
                countyAreaData: null,//郡县——面积数据
                neighbourhoodAreaData: null,//附近——面积数据

                areaMyEcharts: '',//面积比例——饼图
                regionType: 'state',//地区级别

                chartNoDataShow: false, //判断是否有无数据
            }
        },
        computed: {
            getArea() {
                if(this.$store.getters.get_homejunctionData.area){
                    this.areaData = this.$store.getters.get_homejunctionData.area;
                    this.stateAreaData = this.$store.getters.get_homejunctionData.area.state;
                    this.cityAreaData = this.$store.getters.get_homejunctionData.area.city;
                    this.zipAreaData = this.$store.getters.get_homejunctionData.area.zip;
                    this.countyAreaData = this.$store.getters.get_homejunctionData.area.county;
                    this.neighbourhoodAreaData = this.$store.getters.get_homejunctionData.area.neighbourhood;

                    this.get_area();
                }
                return this.$store.getters.get_homejunctionData.area
            }
        },
        created() {
        },
        mounted() {
            this.areaMyEcharts = this.$echarts.init(document.getElementById('area-chart'));
            this.areaMyEcharts.showLoading();
            window.addEventListener('resize', () => {
                this.areaMyEcharts.resize();
            });
        },
        methods: {
            //获取面积比例数据
            get_area() {
                this.$nextTick(() => {
                    if(this.areaData){
                        this.chartNoDataShow = false;
                        this.area_charts(this.stateAreaData.land, this.stateAreaData.water, this.stateAreaData.total);
                    }else{
                        this.chartNoDataShow = true;
                        this.$refs.area_chart_NoData.innerText = data.msg;
                    }
                })
            },
            //地区级别Change事件
            regionTypeChange(value){
                if (value == 'state') {
                    this.area_charts(this.stateAreaData.land, this.stateAreaData.water, this.stateAreaData.total);
                }else if (value == 'city') {
                    this.area_charts(this.cityAreaData.land, this.cityAreaData.water, this.cityAreaData.total);
                }else if (value == 'zip') {
                    this.area_charts(this.zipAreaData.land, this.zipAreaData.water, this.zipAreaData.total);
                }else if (value == 'county') {
                    this.area_charts(this.countyAreaData.land, this.countyAreaData.water, this.countyAreaData.total);
                }else if (value == 'neighbourhood') {
                    this.area_charts(this.neighbourhoodAreaData.land, this.neighbourhoodAreaData.water, this.neighbourhoodAreaData.total);
                }
            },
            //面积比例——饼图
            area_charts(land, water, total){
                this.areaMyEcharts.hideLoading();
                this.areaMyEcharts.setOption({
                    baseOption:{
                        title: {
                            text: '面积比例',
                            subtext: '总面积：'+ total +'平方英里',
                            left: 'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/> <span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#00b8ee'></span> {b}: {c} 平方英里"
                        },
                        legend: {
                            orient: 'vertical',
                            left: '20',
                            data: ['陆地面积', '水域面积']
                        },
                        series : [{
                            name: '面积比例',
                            type: 'pie',
                            radius :  ['23%', '53%'],//圆的内外半径
                            center: ['47%', '60%'],//圆的X,Y轴平移
                            data:[
                                {
                                    value: land,
                                    name: '陆地面积',
                                },
                                {
                                    value: water,
                                    name: '水域面积',
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
                                    formatter:'{b}：{c} 平方英里'
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
