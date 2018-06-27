<template>
    <section>
        <el-table
            :data="tableData"
            stripe
            border
            highlight-current-row
            v-loading="SMSDetailsListLoading"
            element-loading-text="拼命加载中..."
            style="width: 100%">
            <el-table-column
                property="name"
                label="接收客户姓名"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="phone"
                label="接收客户电话"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="sms"
                label="短信模板内容"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                label="状态">
                <template slot-scope="scope">
                    <div v-html="SMS_EmailSendStatus(scope.row.status)"></div>
                </template>
            </el-table-column>
            <el-table-column
                property="ctime"
                label="发送时间"
                :formatter="columnDate">
            </el-table-column>
        </el-table>
        <div class="Pagination" style="text-align: left;margin-top: 10px;">
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
                total: null,//总条数
                SMSDetailsListLoading: true,//短信详情列表table的加载loading
                SMSId: this.$route.query.SMSId,
            }
        },
        mounted() {
            // 获取短信详情
            if(this.SMSId){
                this.getSMSDetailsData();
            }else{
                this.$message.error('参数错误，请返回短信列表点击查看重新进入');
            }
        },
        computed: {
        },
        methods: {
            handleSizeChange(val) {//处理pagesize页码大小变动的事件
                this.pageSize = val;
                this.getSMSDetailsData();
            },
            handleCurrentChange(val) {//处理currentPage当前页变动的事件
                this.pageNumber = val;
                this.getSMSDetailsData();
            },
            //获取短信详情
            getSMSDetailsData() {
                this.$get('/sms/history/detail',{
                    pageNumber: this.page,
                    pageSize: this.pageSize,
                    gatherId: this.SMSId
                }).then(res => {
                    const data = res;
                    this.tableData = data.rows;
                    this.total = data.total;
                    this.SMSDetailsListLoading = false;
                    console.log(this.tableData)
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
