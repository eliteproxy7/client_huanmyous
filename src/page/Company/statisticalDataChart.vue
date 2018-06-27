<template>
    <section>
        <article>
            <header>公司落地页访问统计</header>
            <div class="inside">
                <div class="chartBox-toolbar clearfix">
                    <el-date-picker
                        v-model="companyLandingPageVisitBEtime"
                        type="daterange"
                        align="center"
                        value-format="yyyy-MM-dd"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="BEtimePickerOptions"
                        @change="companyLandingPageVisitChange">
                    </el-date-picker>
                </div>
                <div class="chartBox" id="company-landingPage-visit-chart"></div>
                <h4 ref="companyLandingPageVisit_NoData"></h4>
            </div>
        </article>

        <article>
            <header>公司二级主页访问统计</header>
            <div class="inside">
                <div class="chartBox-toolbar clearfix">
                    <el-date-picker
                        v-model="companyHomePageVisitBEtime"
                        type="daterange"
                        align="center"
                        value-format="yyyy-MM-dd"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="BEtimePickerOptions"
                        @change="companyHomePageVisitChange">
                    </el-date-picker>
                </div>
                <div class="chartBox" id="company-homePage-visit-chart"></div>
                <h4 ref="companyHomePageVisit_NoData"></h4>
            </div>
        </article>

        <article>
            <header>群发短信统计</header>
            <div class="inside">
                <div class="chartBox-toolbar clearfix">
                    <el-date-picker
                        v-model="massSMSBEtime"
                        type="daterange"
                        align="center"
                        value-format="yyyy-MM-dd"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="BEtimePickerOptions"
                        @change="massSMSChange">
                    </el-date-picker>
                </div>
                <div class="chartBox" id="mass-SMS-statistical-chart"></div>
                <h4 ref="massSMS_NoData"></h4>
            </div>
        </article>

        <article>
            <header>群发邮件统计</header>
            <div class="inside">
                <div class="chartBox-toolbar clearfix">
                    <el-date-picker
                        v-model="massEmailBEtime"
                        type="daterange"
                        align="center"
                        value-format="yyyy-MM-dd"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="BEtimePickerOptions"
                        @change="massEmailChange">
                    </el-date-picker>
                </div>
                <div class="chartBox" id="mass-email-statistical-chart"></div>
                <h4 ref="massEmail_NoData"></h4>
            </div>
        </article>

        <article>
            <header>新增客户统计（通过落地页和房源分享页注册，以及顾问创建）</header>
            <div class="inside">
                <div class="chartBox-toolbar clearfix">
                    <el-date-picker
                        v-model="newClientBEtime"
                        type="daterange"
                        align="center"
                        value-format="yyyy-MM-dd"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="BEtimePickerOptions"
                        @change="newClientChange">
                    </el-date-picker>
                </div>
                <div class="chartBox" id="new-client-statistical-chart"></div>
                <h4 ref="newClient_NoData"></h4>
            </div>
        </article>

        <article>
            <header>当前管理员账户接口访问日志</header>
            <div class="inside">
                <div class="chartBox-toolbar clearfix">
                    <el-date-picker
                        v-model="nowAdminAPIVisitLogBEtime"
                        type="daterange"
                        align="center"
                        value-format="yyyy-MM-dd"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="BEtimePickerOptions"
                        @change="nowAdminAPIVisitLogChange">
                    </el-date-picker>
                </div>
                <div class="chartBox" id="now-admin-API-visit-log-chart"></div>
                <h4 ref="nowAdminAPIVisitLog_NoData"></h4>
            </div>
        </article>

    </section>
</template>

<script>
    export default {
        data() {
            return {
                uuid: localStorage.companyUUID,     //公司的uuid
                Btime: this.momentFormat(new Date().getTime() - 3600 * 1000 * 24 * 30, 'YYYY-MM-DD'),//默认开始时间为一个月前
                Etime: this.momentFormat(new Date(), 'YYYY-MM-DD'),//默认结束时间为当天
                companyLandingPageVisitBEtime: '',  //公司落地页访问统计——时间筛选
                companyLandingPageVisitBtime: this.momentFormat(new Date().getTime() - 3600 * 1000 * 24 * 30, 'YYYY-MM-DD'),//公司落地页访问统计——时间筛选——开始时间
                companyLandingPageVisitEtime: this.momentFormat(new Date(), 'YYYY-MM-DD'),  //公司落地页访问统计——时间筛选——结束时间

                companyHomePageVisitBEtime: '',  //公司二级主页访问统计——时间筛选
                companyHomePageVisitBtime: this.momentFormat(new Date().getTime() - 3600 * 1000 * 24 * 30, 'YYYY-MM-DD'),//公司二级主页访问统计——时间筛选——开始时间
                companyHomePageVisitEtime: this.momentFormat(new Date(), 'YYYY-MM-DD'),  //公司二级主页访问统计——时间筛选——结束时间

                massSMSBEtime: '',  //群发短信统计——时间筛选
                massSMSBtime: this.momentFormat(new Date().getTime() - 3600 * 1000 * 24 * 30, 'YYYY-MM-DD'),//群发短信统计——时间筛选——开始时间
                massSMSEtime: this.momentFormat(new Date(), 'YYYY-MM-DD'),  //群发短信统计——时间筛选——结束时间

                massEmailBEtime: '',  //群发邮件统计——时间筛选
                massEmailBtime: this.momentFormat(new Date().getTime() - 3600 * 1000 * 24 * 30, 'YYYY-MM-DD'),//群发邮件统计——时间筛选——开始时间
                massEmailEtime: this.momentFormat(new Date(), 'YYYY-MM-DD'),  //群发邮件统计——时间筛选——结束时间

                newClientBEtime: '',  //新增客户统计——时间筛选
                newClientBtime: this.momentFormat(new Date().getTime() - 3600 * 1000 * 24 * 30, 'YYYY-MM-DD'),//新增客户统计——时间筛选——开始时间
                newClientEtime: this.momentFormat(new Date(), 'YYYY-MM-DD'),  //新增客户统计——时间筛选——结束时间

                nowAdminAPIVisitLogBEtime: '',  //当前管理员账户接口访问日志——时间筛选
                nowAdminAPIVisitLogBtime: this.momentFormat(new Date().getTime() - 3600 * 1000 * 24 * 30, 'YYYY-MM-DD'),//当前管理员账户接口访问日志——时间筛选——开始时间
                nowAdminAPIVisitLogEtime: this.momentFormat(new Date(), 'YYYY-MM-DD'),  //当前管理员账户接口访问日志——时间筛选——结束时间

                //按创建时间筛选——快捷选项配置
                BEtimePickerOptions: {
                    shortcuts: [{
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一季度',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一年',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                            picker.$emit('pick', [start, end]);
                        }
                    }],
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    onPick(value){//判断clearable清除时间操作
                        // console.log(value)
                    }
                },
            }
        },
        created() {
        },
        mounted() {
            // console.log(this.uuid, this.Btime, this.Etime)
            //公司落地页访问统计
            this.companyLandingPageVisitFN();
            //公司二级主页访问统计
            this.companyHomePageVisitFN();
            //群发短信统计
            this.massSMSFN();
            //群发邮件统计
            this.massEmailFN();
            //新增客户统计
            this.newClientFN();
            //当前管理员账户接口访问日志
            this.nowAdminAPIVisitLogFN();

        },
        computed: {
        },
        methods: {
            //公司落地页访问统计
            companyLandingPageVisitFN(){
                this.$get('/data/analysis/stat/homepage',{
                    uuid: this.uuid,
                    btime: this.companyLandingPageVisitBtime,
                    etime: this.companyLandingPageVisitEtime,
                }).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        // console.log(data.data);
                        this.big_data_area_chart_FN(data.data, 'company-landingPage-visit-chart', '次');
                    } else {
                        this.$refs.companyLandingPageVisit_NoData.innerText = data.msg;
                    }
                });
            },
            //公司落地页访问统计——时间筛选
            companyLandingPageVisitChange(value){
                // console.log(value);
                //判断clearable清除时间操作
                this.companyLandingPageVisitBtime = value ? value[0] : this.Btime;
                this.companyLandingPageVisitEtime = value ? value[1] : this.Etime;
                this.companyLandingPageVisitFN();
            },

            //公司二级主页访问统计
            companyHomePageVisitFN(){
                this.$get('/data/analysis/stat/secondaryhomepage',{
                    uuid: this.uuid,
                    btime: this.companyHomePageVisitBtime,
                    etime: this.companyHomePageVisitEtime,
                }).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        // console.log(data.data);
                        this.big_data_area_chart_FN(data.data, 'company-homePage-visit-chart', '次');
                    } else {
                        this.$refs.companyHomePageVisit_NoData.innerText = data.msg;
                    }
                });
            },
            //公司二级主页访问统计——时间筛选
            companyHomePageVisitChange(value){
                // console.log(value);
                //判断clearable清除时间操作
                this.companyHomePageVisitBtime = value ? value[0] : this.Btime;
                this.companyHomePageVisitEtime = value ? value[1] : this.Etime;
                this.companyHomePageVisitFN();
            },

            //群发短信统计
            massSMSFN(){
                this.$get('/data/analysis/stat/sms',{
                    btime: this.massSMSBtime,
                    etime: this.massSMSEtime,
                }).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        // console.log(data.data);
                        this.big_data_area_chart_FN(data.data, 'mass-SMS-statistical-chart', '条');
                    } else {
                        this.$refs.massSMS_NoData.innerText = data.msg;
                    }
                });
            },
            //群发短信统计——时间筛选
            massSMSChange(value){
                // console.log(value);
                //判断clearable清除时间操作
                this.massSMSBtime = value ? value[0] : this.Btime;
                this.massSMSEtime = value ? value[1] : this.Etime;
                this.massSMSFN();
            },

            //群发邮件统计
            massEmailFN(){
                this.$get('/data/analysis/stat/mail',{
                    btime: this.massEmailBtime,
                    etime: this.massEmailEtime,
                }).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        // console.log(data.data);
                        this.big_data_area_chart_FN(data.data, 'mass-email-statistical-chart', '封');
                    } else {
                        this.$refs.massEmail_NoData.innerText = data.msg;
                    }
                });
            },
            //群发邮件统计——时间筛选
            massEmailChange(value){
                // console.log(value);
                //判断clearable清除时间操作
                this.massEmailBtime = value ? value[0] : this.Btime;
                this.massEmailEtime = value ? value[1] : this.Etime;
                this.massEmailFN();
            },

            //新增客户统计
            newClientFN(){
                this.$get('/data/analysis/stat/register',{
                    uuid: this.uuid,
                    btime: this.newClientBtime,
                    etime: this.newClientEtime,
                }).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        // console.log(data.data);
                        this.big_data_area_chart_FN(data.data, 'new-client-statistical-chart', '封');
                    } else {
                        this.$refs.newClient_NoData.innerText = data.msg;
                    }
                });
            },
            //新增客户统计——时间筛选
            newClientChange(value){
                // console.log(value);
                //判断clearable清除时间操作
                this.newClientBtime = value ? value[0] : this.Btime;
                this.newClientEtime = value ? value[1] : this.Etime;
                this.newClientFN();
            },

            //当前管理员账户接口访问日志
            nowAdminAPIVisitLogFN(){
                this.$get('/data/analysis/stat/log',{
                    btime: this.nowAdminAPIVisitLogBtime,
                    etime: this.nowAdminAPIVisitLogEtime,
                }).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        // console.log(data.data);
                        this.big_data_area_chart_FN(data.data, 'now-admin-API-visit-log-chart', '次');
                    } else {
                        this.$refs.nowAdminAPIVisitLog_NoData.innerText = data.msg;
                    }
                });
            },
            //当前管理员账户接口访问日志——时间筛选
            nowAdminAPIVisitLogChange(value){
                // console.log(value);
                //判断clearable清除时间操作
                this.nowAdminAPIVisitLogBtime = value ? value[0] : this.Btime;
                this.nowAdminAPIVisitLogEtime = value ? value[1] : this.Etime;
                this.nowAdminAPIVisitLogFN();
            },

            // 大数据面积图
            big_data_area_chart_FN(data, el, xAxisText){
                let myChart = this.$echarts.getInstanceByDom(document.getElementById(el));
                if (myChart === undefined) {
                    myChart = this.$echarts.init(document.getElementById(el));
                }
                let dateList = data.map(item => {
                    return this.momentFormat(item['date'], 'YYYY-MM-DD');
                });
                let valueList = data.map(function (item) {
                    return item['value'];
                });
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b}<br /> <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#00b6ef"></span>{c}' + xAxisText
                    },
                    toolbox: {
                        show: true,
                        right: 30,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            magicType: { type: ['line', 'bar'] },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: dateList
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, '100%'],
                        axisLabel: {
                            formatter: '{value}' + xAxisText
                        }
                    },
                    dataZoom: [{
                        type: 'inside',
                        start: 0,
                        end: 100
                    }, {
                        start: 0,
                        end: 100,
                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '80%',
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    }],
                    series: [{
                        type: 'line',
                        smooth: true,
                        sampling: 'average',
                        itemStyle: {
                            normal: {
                                color: 'rgb(0, 195, 255)'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgb(117, 221, 253)'
                                }, {
                                    offset: 1,
                                    color: 'rgb(9, 129, 232)'
                                }])
                            }
                        },
                        data: valueList
                    }]
                };
                myChart.setOption(option);
                window.onresize = myChart.resize;
            },
        },
        components: {
        }
    }
</script>

<style scoped lang="less" type="text/less">
    body{
        section{
            > article {
                border: 1px solid #dee2e5;
                padding: 0;
                margin: 0 0 60px 0;
                > header {
                    padding: 20px;
                    background: #dbf1ff;
                    font-size: 17px;
                    color: #3e403f;
                    border-bottom: 1px solid #dee2e5;
                }
                > .inside {
                    width: 100%;
                    min-height: 380px;
                    text-align: center;
                    position: relative;
                    padding: 15px 0;
                    > .chartBox-toolbar {
                        text-align: left;
                        padding: 0 0 0 15px;
                    }
                    > .chartBox {
                        width: 100%;
                        height: 320px;
                        margin: 0 auto;
                    }
                    > h4 {
                        font-size: 20px;
                        color: #000;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        -webkit-transform: translate(-50%, -50%);
                        -moz-transform: translate(-50%, -50%);
                        -ms-transform: translate(-50%, -50%);
                    }
                }
                > p {
                    padding: 0 10px;
                    margin: 30px 0 15px 0;
                    font-size: 14px;
                    color: #23bff0;
                }
            }
        }
    }
</style>
