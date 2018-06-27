<template>
    <article class="echart-chart">
        <div class="inside">
            <header>种族比例</header>
            <div class="chartBox clearfix" style="height: 650px;">
                <div class="regionType-button clearfix" v-show="!chartNoDataShow">
                    <el-button-group>
                        <el-button type="primary" v-for="(item, key, index) in RaceData" :key="index" v-if="item" size="mini" @click="regionTypeChange(key)">{{key}}</el-button>
                    </el-button-group>
                </div>
                <div class="chart-div" id="Race-chart" v-show="!chartNoDataShow" style="height: 300px;"></div>
                <div class="chart-div" id="hispanicRace-chart" v-show="!chartNoDataShow" style="height: 300px;"></div>
                <h4 ref="Race_chart_NoData" v-show="chartNoDataShow"></h4>
            </div>
            <p v-show="false">{{getRace}}</p>
        </div>
    </article>
</template>

<script>
    export default {
        data() {
            return {
                RaceData: null,//种族数据
                stateRaceData: null,//州——种族数据
                cityRaceData: null,//城市——种族数据
                zipRaceData: null,//邮编——种族数据
                countyRaceData: null,//郡县——种族数据
                neighbourhoodRaceData: null,//附近——种族数据

                RaceMyEcharts: '',//种族比例——饼图
                hispanicRaceMyEcharts: '',//西班牙裔和非西班牙裔比例——饼图
                regionType: 'state',//地区级别

                chartNoDataShow: false, //判断是否有无数据
            }
        },
        computed: {
            getRace() {
                if(this.$store.getters.get_homejunctionData.race){
                    this.RaceData = this.$store.getters.get_homejunctionData.race;
                    this.stateRaceData = this.$store.getters.get_homejunctionData.race.state;
                    this.cityRaceData = this.$store.getters.get_homejunctionData.race.city;
                    this.zipRaceData = this.$store.getters.get_homejunctionData.race.zip;
                    this.countyRaceData = this.$store.getters.get_homejunctionData.race.county;
                    this.neighbourhoodRaceData = this.$store.getters.get_homejunctionData.race.neighbourhood;

                    this.get_Race();
                }
                return this.$store.getters.get_homejunctionData.race
            }
        },
        created() {
        },
        mounted() {
            this.RaceMyEcharts = this.$echarts.init(document.getElementById('Race-chart'));
            this.RaceMyEcharts.showLoading();

            this.hispanicRaceMyEcharts = this.$echarts.init(document.getElementById('hispanicRace-chart'));
            this.hispanicRaceMyEcharts.showLoading();

            window.addEventListener('resize', () => {
                this.RaceMyEcharts.resize();
                this.hispanicRaceMyEcharts.resize();
            });

        },
        methods: {
            //获取种族比例数据
            get_Race() {
                this.$nextTick(() => {
                    if(this.RaceData){
                        this.chartNoDataShow = false;
                        this.Race_charts(this.stateRaceData.asian, this.stateRaceData.black, this.stateRaceData.natives, this.stateRaceData.white);
                        this.hispanicRace_charts(this.stateRaceData.hispanic);
                    }else{
                        this.chartNoDataShow = true;
                        this.$refs.Race_chart_NoData.innerText = data.msg;
                    }
                })
            },
            //地区级别Change事件
            regionTypeChange(value){
                if (value == 'state') {
                    this.Race_charts(this.stateRaceData.asian, this.stateRaceData.black, this.stateRaceData.natives, this.stateRaceData.white);
                    this.hispanicRace_charts(this.stateRaceData.hispanic);
                }else if (value == 'city') {
                    this.Race_charts(this.cityRaceData.asian, this.cityRaceData.black, this.cityRaceData.natives, this.cityRaceData.white);
                    this.hispanicRace_charts(this.cityRaceData.hispanic);
                }else if (value == 'zip') {
                    this.Race_charts(this.zipRaceData.asian, this.zipRaceData.black, this.zipRaceData.natives, this.zipRaceData.white);
                    this.hispanicRace_charts(this.zipRaceData.hispanic);
                }else if (value == 'county') {
                    this.Race_charts(this.countyRaceData.asian, this.countyRaceData.black, this.countyRaceData.natives, this.countyRaceData.white);
                    this.hispanicRace_charts(this.countyRaceData.hispanic);
                }else if (value == 'neighbourhood') {
                    this.Race_charts(this.neighbourhoodRaceData.asian, this.neighbourhoodRaceData.black, this.neighbourhoodRaceData.natives, this.neighbourhoodRaceData.white);
                    this.hispanicRace_charts(this.neighbourhoodRaceData.hispanic);
                }
            },
            //种族比例——饼图
            Race_charts(asian, black, natives, white){
                let other = 100 - asian - black - natives - white;
                this.RaceMyEcharts.hideLoading();
                this.RaceMyEcharts.setOption({
                    baseOption:{
                        title: {
                            text: '种族比例',
                            left: 'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/> <span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#00b8ee'></span> {b}: {c}%"
                        },
                        legend: {
                            orient: 'vertical',
                            left: '20',
                            data: ['亚裔', '黑人', '土著/原住民', '白人', '其他人种']
                        },
                        series : [{
                            name: '种族比例',
                            type: 'pie',
                            radius :  ['23%', '53%'],//圆的内外半径
                            center: ['47%', '60%'],//圆的X,Y轴平移
                            data:[
                                {
                                    value: asian,
                                    name: '亚裔',
                                },
                                {
                                    value: black,
                                    name: '黑人',
                                },
                                {
                                    value: natives,
                                    name: '土著/原住民',
                                },
                                {
                                    value: white,
                                    name: '白人',
                                },
                                {
                                    value: this.$accounting.formatMoney(other, "", 2),
                                    name: '其他人种',
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
            //西班牙裔和非西班牙裔比例——饼图
            hispanicRace_charts(hispanic){
                let other = 100 - hispanic;
                this.hispanicRaceMyEcharts.hideLoading();
                this.hispanicRaceMyEcharts.setOption({
                    baseOption:{
                        title: {
                            text: '西班牙裔和非西班牙裔比例',
                            left: 'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/> <span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#00b8ee'></span> {b}: {c}%"
                        },
                        legend: {
                            orient: 'vertical',
                            left: '20',
                            data: ['西班牙裔', '非西班牙裔']
                        },
                        series : [{
                            name: '西班牙裔和非西班牙裔比例',
                            type: 'pie',
                            radius :  ['23%', '53%'],//圆的内外半径
                            center: ['47%', '60%'],//圆的X,Y轴平移
                            data:[
                                {
                                    value: hispanic,
                                    name: '西班牙裔',
                                },
                                {
                                    value: this.$accounting.formatMoney(other, "", 2),
                                    name: '非西班牙裔',
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
