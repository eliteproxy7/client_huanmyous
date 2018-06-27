<template>
    <section>
        <el-table
            :data="tableData"
            stripe
            border
            highlight-current-row
            v-loading="homePageListLoading"
            element-loading-text="拼命加载中..."
            style="width: 100%">
            <el-table-column
                property="templateCustomName"
                label="模板名">
            </el-table-column>
            <el-table-column label="审核状态">
                <template slot-scope="scope">
                    <div v-html="columnAuditStatus(scope.row.status)"></div>
                </template>
            </el-table-column>
            <el-table-column label="发布状态">
                <template slot-scope="scope">
                    <div v-html="columnReleaseStatus(scope.row.issue)"></div>
                </template>
            </el-table-column>
            <el-table-column
                property="ctime"
                label="发送时间"
                :formatter="columnDate">
            </el-table-column>
            <el-table-column
                property="utime"
                label="最后更新时间"
                :formatter="columnDate">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope" >
                    <!--禁用-->
                    <div v-if="scope.row.status==0">
                        <el-button
                            size="small"
                            type="success"
                            icon="iconfont icon-yanjing2"
                            @click="previewHomePage(scope.row.id, scope.row.issue)"> 预览
                        </el-button>
                    </div>
                    <!--草稿-->
                    <div v-if="scope.row.status==1">
                        <el-button
                            size="small"
                            type="success"
                            icon="iconfont icon-yanjing2"
                            @click="previewHomePage(scope.row.id, scope.row.issue)"> 预览
                        </el-button>
                        <el-button
                            size="small"
                            type="primary"
                            icon="iconfont icon-submit"
                            @click="submitAuditHomePage(scope.row.id)"> 提交审核
                        </el-button>
                        <el-button
                            size="small"
                            type="warning"
                            icon="iconfont icon-xiugai"
                            @click="modifyHomePage(scope.row.id)"> 修改
                        </el-button>
                    </div>
                    <!--正在审核中-->
                    <div v-if="scope.row.status==2">
                        <el-button
                            size="small"
                            type="success"
                            icon="iconfont icon-yanjing2"
                            @click="previewHomePage(scope.row.id, scope.row.issue)"> 预览
                        </el-button>
                    </div>
                    <!--未通过审核-->
                    <div v-if="scope.row.status==3">
                        <el-button
                            size="small"
                            type="success"
                            icon="iconfont icon-yanjing2"
                            @click="previewHomePage(scope.row.id, scope.row.issue)"> 预览
                        </el-button>
                        <el-button
                            size="small"
                            type="warning"
                            icon="iconfont icon-xiugai"
                            @click="modifyHomePage(scope.row.id)"> 修改
                        </el-button>
                    </div>
                    <!--通过审核-->
                    <div v-if="scope.row.status==4">
                        <!--已发布-->
                        <div v-if="scope.row.issue">
                            <el-button
                                size="small"
                                type="success"
                                icon="iconfont icon-chakan"
                                @click="lookHomePage(scope.row.id, scope.row.issue)"> 查看
                            </el-button>
                            <el-button
                                size="small"
                                type="danger"
                                icon="iconfont icon-quxiaofabu"
                                @click="issueHomePage(scope.row.id)"> 取消发布
                            </el-button>
                        </div>
                        <!--未发布-->
                        <div v-else>
                            <el-button
                                size="small"
                                type="success"
                                icon="iconfont icon-yanjing2"
                                @click="previewHomePage(scope.row.id, scope.row.issue)"> 预览
                            </el-button>
                            <el-button
                                size="small"
                                type="primary"
                                icon="iconfont icon-qianwang1"
                                @click="issueHomePage(scope.row.id)"> 发布
                            </el-button>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="Pagination" style="text-align: left; margin-top: 10px;">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNumber"
                :page-sizes="[10, 50, 100, 200, 300]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                pageNumber: 1,//默认显示第一页
                pageSize: 10,//默认每页显示10条
                total: null,//总条数
                homePageListLoading: true,//二级主页模板列表的加载动画

            }
        },
        mounted() {
            this.getHomePageData();//获取二级主页模板数据列表数据
        },
        computed: {
        },
        methods: {
            handleSizeChange(val) {//处理pagesize页码大小变动的事件
                this.pageSize = val;
                this.getHouseData()
            },
            handleCurrentChange(val) {//处理currentPage当前页变动的事件
                this.pageNumber = val;
                this.getHouseData()
            },
            //获取二级主页模板数据列表数据
            getHomePageData() {
                this.$get('/template/html/data/list', {
                    page: this.pageNumber,
                    pageSize: this.pageSize,
                }).then(res => {
                    this.tableData = res.rows;
                    this.total = res.total;
                    this.homePageListLoading = false;
                });
            },
            //格式化审核状态
            columnAuditStatus (value) {
                let val = '';
                if(value == 0){
                    val = '<span style="color: #d9534f">禁用</span>';
                }else if(value == 1){
                    val = '<span style="color: #5bc0de">草稿</span>';
                }else if(value == 2){
                    val = '<span style="color: #f0ad4e">正在审核中</span>';
                }else if(value == 3){
                    val = '<span style="color: red">未通过审核</span>';
                }else if(value == 4){
                    val = '<span style="color: green">通过审核</span>';
                }
                return val
            },
            //格式化发布状态
            columnReleaseStatus(value) {
                let val = '';
                if(value == true){
                    val = '<span style="color: green">发布成功，使用中</span>';
                }else if(value == false){
                    val = '未发布';
                }
                return val
            },
            //格式化时间戳
            columnDate(row, column, cellValue, index) {
                return this.momentFormat(cellValue, 'YYYY-MM-DD HH:mm');
            },
            //预览
            previewHomePage(homePageId, issue) {
                // var tempId = $(this).attr('tempId'),
                //     hid = $(this).attr('hid');
                // if (tempId == 1) {
                //     window.open('company-homePage1.html?uuid=' + uuid + '&hid=' + hid + '&issue=false');
                // } else if (tempId == 2) {
                //     window.open('company-homePage2.html?uuid=' + uuid + '&hid=' + hid + '&issue=false');
                // }
                this.$router.push({path: '/companyHomePage1', query: {companyUUID: localStorage.companyUUID, hid: homePageId, issue: issue}});
            },
            //提交审核
            submitAuditHomePage(homePageId) {
                this.$put('/template/html/submit/audit?id='+ homePageId).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.$message.success('提交审核成功！');
                        this.getHomePageData();
                    } else {
                        this.$message.warning(data.msg)
                    }
                })
            },
            //修改
            modifyHomePage(homePageId) {
                this.$router.push({path: '/company_homePageCreateModify', query: {homePageId: homePageId}});
            },
            //查看
            lookHomePage(homePageId) {
                // var tempId = $(this).attr('tempId'),
                //     hid = $(this).attr('hid');
                // if (tempId == 1) {
                //     window.open('company-homePage1.html?uuid=' + uuid + '&hid=' + hid + '&issue=false');
                // } else if (tempId == 2) {
                //     window.open('company-homePage2.html?uuid=' + uuid + '&hid=' + hid + '&issue=false');
                // }
                this.$router.push({path: '/companyHomePage1', query: {companyUUID: localStorage.companyUUID, hid: homePageId, issue: issue}});
            },
            //发布和取消发布
            issueHomePage(homePageId) {
                this.$put('/template/html/data/issue?id='+ homePageId).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.$message.success('设置成功！');
                        this.getHomePageData();
                    } else {
                        this.$message.warning(data.msg)
                    }
                })
            },


        },
        components: {
        }
    }
</script>

<style scoped lang="less" type="text/less">
    body {
        section {
            .el-button + .el-button{
                margin-left: 0;
            }
        }
    }
</style>
