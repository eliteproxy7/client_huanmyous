<template>
    <section>
        <span>您共发送过：{{total}}条短信</span>
        <el-table
            :data="tableData"
            stripe
            border
            highlight-current-row
            v-loading="SMSListLoading"
            element-loading-text="拼命加载中..."
            style="width: 100%; margin: 15px 0 0 0">
            <el-table-column
                property="tempName"
                label="短信模板名"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="template"
                label="短信模板内容"
                width="300"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                label="状态">
                <template slot-scope="scope">
                    <div v-html="SMS_EmailSendStatus(scope.row.status)"></div>
                </template>
            </el-table-column>
            <el-table-column
                property="count"
                label="接受客户数量"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="ctime"
                label="发送时间"
                :formatter="columnDate"
                sortable>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope" >
                    <el-button
                        size="small"
                        type="success"
                        icon="iconfont icon-chakan"
                        @click="lookSMSDetails(scope.row.id)"> 查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="Pagination" style="text-align: left; margin-top: 10px;">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
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
                page: 1,//默认显示第一页
                pageSize: 10,//默认每页显示10条
                total: 0,//总条数
                SMSListLoading: true,//短信历史列表table的加载loading
            }
        },
        mounted() {
            this.getSMSHistoryListData();//获取短信历史数据
        },
        computed: {
        },
        methods: {
            handleSizeChange(val) {//处理pagesize页码大小变动的事件
                this.pageSize = val;
                this.getSMSHistoryListData()
            },
            handleCurrentChange(val) {//处理currentPage当前页变动的事件
                this.pageNumber = val;
                this.getSMSHistoryListData()
            },
            //获取短信历史数据列表
            getSMSHistoryListData() {
                this.$get('/sms/history/list', {
                    pageNumber: this.page,
                    pageSize: this.pageSize,
                }).then(res => {
                    const data = res;
                    if(data.status == 0){
                        this.tableData = data.rows;
                        this.total = data.total;
                        this.SMSListLoading = false;
                    }else{
                        this.tableData = [];
                        this.total = 0;
                        this.SMSListLoading = false;
                    }
                });
            },
            //格式化判断是否为空，0或null
            columnIsNull0(row, column, cellValue) {
                return this.isNull0(cellValue)
            },
            //格式化时间戳
            columnDate(row, column, cellValue, index) {
                return this.momentFormat(cellValue, 'YYYY-MM-DD HH:mm:ss');
            },
            //查看详情
            lookSMSDetails(SMSId){
                this.$router.push({path: '/massSMS_details', query: {SMSId: SMSId}});
            }

        },
        components: {
        }
    }
</script>

<style scoped lang="less" type="text/less">
    body {
        section {
        }
    }
</style>
