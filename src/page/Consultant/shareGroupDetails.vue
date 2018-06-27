<template>
    <article>
        <h4><i class="el-icon-arrow-left" @click="$router.back()"></i> 分享组详情</h4>
        <aside class="share-group-details-toolbar">
            <span>分享组名: {{shareGroupName}}</span>
            <span>创建时间: {{momentFormat(shareGroupCtime, 'YYYY-MM-DD')}}</span>
            <span>客户查看: {{shareGroupClientViewNum}}次</span>
        </aside>

        <el-table
            :data="tableData"
            stripe
            border
            highlight-current-row
            v-loading="houseListLoading"
            element-loading-text="拼命加载中..."
            style="width: 100%">
            <el-table-column label="房源图片" width="170px">
                <template slot-scope="scope">
                    <img v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ scope.row.heroImage" width="150" height="100" />
                </template>
            </el-table-column>
            <el-table-column
                property="address"
                label="房源地址"
                width="110"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="propertySubtype"
                label="房源类型"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column property="listPrice" label="价格" sortable="custom" width="110">
                <template slot-scope="scope">
                    <p>{{isNull0_USD(scope.row.listPrice)}}</p>
                    <p>{{isNull0_RMB(scope.row.listPrice)}}</p>
                </template>
            </el-table-column>
            <el-table-column property="area" label="面积" sortable="custom" width="120">
                <template slot-scope="scope">
                    <p>{{isNull0_sqft(scope.row.livingArea)}}</p>
                    <p>{{isNull0_sqmt(scope.row.livingArea)}}</p>
                </template>
            </el-table-column>
            <el-table-column
                property="bedroomCount"
                label="卧室 (间)"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="bathroomCount"
                label="卫浴 (间)"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="yearBuilt"
                label="年份"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                label="状态">
                <template slot-scope="scope">
                    <!--格式化房源售卖状态-->
                    <div v-html="house_status(scope.row.listingStatus)"></div>
                </template>
            </el-table-column>
            <el-table-column
                property="listingDate"
                label="上市时间"
                :formatter="columnDate">
            </el-table-column>
            <el-table-column
                label="在售天数">
                <template slot-scope="scope">
                    <div>{{DateMinus(momentFormat(scope.row.listingDate, 'YYYY-MM-DD'))}}天</div>
                </template>
            </el-table-column>
            <el-table-column label="经纪公司" width="150">
                <template slot-scope="scope">
                    <div v-html="BrokerCompany(scope.row.providerUrl, scope.row.providerName)"></div>
                </template>
            </el-table-column>
            <!--<el-table-column label="已添加分享组" width="110">-->
                <!--<template slot-scope="scope">-->
                    <!--<div v-for="item in scope.row.shareGroupNames">-->
                        <!--<p>{{item}}</p>-->
                    <!--</div>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column label="操作" width="130">
                <template slot-scope="scope">
                    <el-button
                        size="small"
                        type="primary"
                        icon="iconfont icon-chakan"
                        @click="goHouseDetails(scope.row.houseId)"> 查看详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--<div class="Pagination" style="text-align: left; margin: 10px 0 0 0;">-->
            <!--<el-pagination-->
                <!--@size-change="handleSizeChange"-->
                <!--@current-change="handleCurrentChange"-->
                <!--:current-page="pageNumber"-->
                <!--:page-sizes="[10, 50, 100, 200, 300]"-->
                <!--:page-size="pageSize"-->
                <!--layout="total, sizes, prev, pager, next, jumper"-->
                <!--:total="total">-->
            <!--</el-pagination>-->
        <!--</div>-->

        <h4>分享日志</h4>

        <el-table
            :data="shareLogTableData"
            stripe
            border
            highlight-current-row
            v-loading="shareLogListLoading"
            element-loading-text="拼命加载中..."
            style="width: 100%">
            <el-table-column
                property="ctime"
                label="客户查看时间"
                :formatter="columnDate">
            </el-table-column>
            <el-table-column
                property="ip"
                label="客户IP地址"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="level"
                label="客户查看层级"
                :formatter="columnIsNull0">
            </el-table-column>
        </el-table>
        <div class="Pagination" style="text-align: left;margin-top: 10px;">
            <el-pagination
                @size-change="shareLog_handleSizeChange"
                @current-change="shareLog_handleCurrentChange"
                :current-page="shareLogPageNumber"
                :page-sizes="[10, 50, 100, 200, 300]"
                :page-size="shareLogPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="shareLogTotal">
            </el-pagination>
        </div>
        <div class="echart-chart">
            <div class="inside">
                <header>最近30天分享组被查看次数</header>
                <div class="chartBox">
                    <div id="In-the-last-30-days-look-number-chart"></div>
                    <h4 ref="InTheLast30DaysLookNumber_NoData"></h4>
                </div>
            </div>
        </div>

        <h4>客户注册信息</h4>

        <el-table
            :data="shareClientRegisterTableData"
            stripe
            border
            highlight-current-row
            v-loading="shareClientRegisterListLoading"
            element-loading-text="拼命加载中..."
            style="width: 100%">
            <el-table-column
                property="ctime"
                label="客户注册时间"
                :formatter="columnDate">
            </el-table-column>
            <el-table-column
                property="name"
                label="客户姓名"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="phone"
                label="客户电话"
                :formatter="columnIsNull0">
            </el-table-column>
        </el-table>
        <div class="Pagination" style="text-align: left;margin-top: 10px;">
            <el-pagination
                @size-change="shareClientRegister_handleSizeChange"
                @current-change="shareClientRegister_handleCurrentChange"
                :current-page="shareClientRegisterPageNumber"
                :page-sizes="[10, 50, 100, 200, 300]"
                :page-size="shareClientRegisterPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="shareClientRegisterTotal">
            </el-pagination>
        </div>
        <div class="echart-chart">
            <div class="inside">
                <header>最近30天分享组客户注册量</header>
                <div class="chartBox">
                    <div id="share-client-register-chart"></div>
                    <h4 ref="shareClientRegisterChart_NoData"></h4>
                </div>
            </div>
        </div>

    </article>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],  //分享组房源列表数据
                // pageNumber: 1,  //默认显示第一页
                // pageSize: 10,   //默认每页显示10条
                // total: null,    //总条数
                shareId: this.$route.query.shareId,
                houseListLoading: true, //房源列表table的加载loading
                shareGroupName: '',     //分享组名
                shareGroupCtime: '',    //创建时间
                shareGroupClientViewNum: '',    //客户查看

                shareLogTableData: [],//分享日志列表数据
                shareLogPageNumber: 1,  //默认显示第一页
                shareLogPageSize: 10,   //默认每页显示10条
                shareLogTotal: null,    //总条数
                shareLogListLoading: true, //分享日志列表table的加载loading

                shareClientRegisterTableData: [],//分享组的客户注册信息列表数据
                shareClientRegisterPageNumber: 1,  //默认显示第一页
                shareClientRegisterPageSize: 10,   //默认每页显示10条
                shareClientRegisterTotal: null,    //总条数
                shareClientRegisterListLoading: true, //分享组的客户注册信息列表table的加载loading
            }
        },
        mounted() {
            this.getShareGroupHouseData();//获取房源列表
            this.getShareGroupDetails();//获取分享组名和创建时间
            this.getShareLogTableData();//获取分享日志列表
            this.getShareClientRegisterTableData();//获取分享组的客户注册信息列表
            this.getShareLogLast30dayRegister();//获取最近30天分享组被查看次数——最近30天分享组客户注册量

        },
        methods: {
            // handleSizeChange(val) {//处理pagesize页码大小变动的事件
            //     this.pageSize = val;
            //     this.getShareGroupHouseData()
            // },
            // handleCurrentChange(val) {//处理currentPage当前页变动的事件
            //     this.pageNumber = val;
            //     this.getShareGroupHouseData()
            // },
            //获取房源列表
            getShareGroupHouseData() {
                this.$get('/sharegroup/house/list?shareId='+ this.shareId).then(res => {
                    const data = res;
                    this.tableData = data.data;
                    this.houseListLoading = false;
                });
            },
            //获取分享组名和创建时间
            getShareGroupDetails(){
                this.$get('/sharegroup/detail?shareId='+ this.shareId).then(res => {
                    const data = res;
                    this.shareGroupName = data.data.name;     //分享组名
                    this.shareGroupCtime = data.data.ctime;    //创建时间
                    this.shareGroupClientViewNum = data.data.hits;    //客户查看
                });
            },
            //获取分享日志列表
            getShareLogTableData(){
                this.$get('/sharelog/list?shareId='+ this.shareId).then(res => {
                    const data = res;
                    this.shareLogTableData = data.rows;
                    this.shareLogTotal = data.total;
                    this.shareLogListLoading = false;
                });
            },
            //分享日志列表——处理pagesize页码大小变动的事件
            shareLog_handleSizeChange(val) {
                this.shareLogPageSize = val;
                this.shareLogTableData()
            },
            //分享日志列表——处理currentPage当前页变动的事件
            shareLog_handleCurrentChange(val) {
                this.shareLogPageNumber = val;
                this.shareLogTableData()
            },

            //获取分享组的客户注册信息列表
            getShareClientRegisterTableData(){
                this.$get('/client/list?shareGroupUUID='+ this.shareId).then(res => {
                    const data = res;
                    this.shareClientRegisterTableData = data.rows;
                    this.shareClientRegisterTotal = data.total;
                    this.shareClientRegisterListLoading = false;
                });
            },
            //分享组的客户注册信息列表——处理pagesize页码大小变动的事件
            shareClientRegister_handleSizeChange(val) {
                this.shareClientRegisterPageSize = val;
                this.shareClientRegisterTableData()
            },
            //分享组的客户注册信息列表——处理currentPage当前页变动的事件
            shareClientRegister_handleCurrentChange(val) {
                this.shareClientRegisterPageNumber = val;
                this.shareClientRegisterTableData()
            },

            //格式化判断是否为空，0或null
            columnIsNull0(row, column, cellValue) {
                return this.isNull0(cellValue);
            },
            //格式化时间戳
            columnDate(row, column, cellValue, index) {
                return this.momentFormat(cellValue, 'YYYY-MM-DD');
            },
            //跳转到房源详情页
            goHouseDetails(houseId) {
                this.$router.push({path: "/houseDetails", query: {houseId: houseId}});
            },
            //获取最近30天分享组被查看次数——最近30天分享组客户注册量
            getShareLogLast30dayRegister(){
                this.$get('/sharelog/last30day?shareId='+ this.shareId).then(res => {
                    const data = res;
                    if(data.status == 0) {
                        this.timeline_chart_FN(data.data, 'In-the-last-30-days-look-number-chart', '最近30天分享组被查看次数');
                    }else{
                        this.$refs.InTheLast30DaysLookNumber_NoData.innerText = data.msg;
                    }
                });

                this.$get('/sharegroup/register/last30day?shareId='+ this.shareId).then(res => {
                    const data = res;
                    if(data.status == 0) {
                        this.timeline_chart_FN(data.data, 'share-client-register-chart', '最近30天分享组客户注册量');
                    }else{
                        this.$refs.shareClientRegisterChart_NoData.innerText = data.msg;
                    }
                });
            },
            // 时间轴折线图
            timeline_chart_FN(data, el, seriesName){
                let myChart = this.$echarts.getInstanceByDom(document.getElementById(el));
                if (myChart === undefined) {
                    myChart = this.$echarts.init(document.getElementById(el));
                }
                let dateList = data.map(function (item) {
                    return item['date'];
                });
                let valueList = data.map(function (item) {
                    return item['count'];
                });
                let option = {
                    tooltip: {
                        trigger: 'axis',
                    },
                    toolbox: {
                        show: true,
                        right: 30,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    visualMap: {
                        show: false,
                        type: 'continuous',
                        seriesIndex: 0,
                        min: 0,
                        max: 400,
                        inRange: {
                            color: ['#5bc0de','#00b6ef']
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '7%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        data: dateList
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            // formatter:function(value){
                            //     return ;
                            // },
                            textStyle:{//坐标轴文字颜色
                                color: '#000'
                            }
                        }
                    },
                    series: [{
                        name: seriesName,
                        type: 'line',
                        smooth: true,
                        data: valueList,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ],
                            itemStyle:{
                                normal:{
                                    color:'#5bc0de'
                                }
                            },
                        }
                    }]
                };
                myChart.setOption(option);
                window.onresize = myChart.resize;
            },

        },
        computed: {},
        components: {}
    }
</script>

<style scoped lang="less" type="text/less">
    body{
        h4 {
            text-align: center;
            margin: 30px 0;
            > i {
                cursor: pointer;
                float: left;
                margin: 5px 0 0 0;
            }
            > i:hover {
                color: #00aced;
            }
        }
        .share-group-details-toolbar{
            margin: 20px 0;
            >span{
                margin: 0 15px;
            }
        }

        .echart-chart {
            margin: 30px 0;
            padding: 0;
            > .inside {
                border: 1px solid #dee2e5;
                padding: 0;
                > header {
                    padding: 20px;
                    background: #dbf1ff;
                    font-size: 17px;
                    color: #3e403f;
                    border-bottom: 1px solid #dee2e5;
                }
                > .chartBox {
                    width: 100%;
                    height: 300px;
                    text-align: center;
                    position: relative;
                    > div {
                        width: 95%;
                        height: 95%;
                        margin: 0 auto;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        -webkit-transform: translate(-50%, -50%);
                        -moz-transform: translate(-50%, -50%);
                        -ms-transform: translate(-50%, -50%);
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
            }
        }
    }

</style>
