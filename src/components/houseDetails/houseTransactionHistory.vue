<template>
    <section class="houseDetails-public-header-content">
        <div class="header">
            <i></i>本房源成交历史记录
        </div>
        <div class="content clearfix">
            <el-table
                :data="tableData"
                stripe
                border
                highlight-current-row
                v-loading="transactionListLoading"
                element-loading-text="拼命加载中..."
                style="width: 100%">
                <el-table-column
                    property="name"
                    label="时间"
                    :formatter="columnDate">
                </el-table-column>
                <el-table-column property="listPrice" label="成交价格" sortable="custom" width="110">
                    <template slot-scope="scope">
                        <p>{{isNull0_USD(scope.row.price)}}</p>
                        <p>{{isNull0_RMB(scope.row.price)}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    property="description"
                    label="事件"
                    :formatter="columnIsNull0">
                </el-table-column>
                <el-table-column
                    property="source"
                    label="来源"
                    :formatter="columnIsNull0">
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left; margin: 10px 0 0 0;">
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
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                houseId: this.$route.query.houseId,
                tableData: [],    //本房源成交历史记录数据
                pageNumber: 1,    //默认显示第一页
                pageSize: 10,     //默认每页显示10条
                total: null,      //总条数
                transactionListLoading: true,    //成交历史列表table的加载loading
            }
        },
        computed: {},
        created() {
        },
        mounted() {
            // this.get_transactionHistory();
        },
        methods: {
            handleSizeChange(val) {//处理pagesize页码大小变动的事件
                this.elementaryPageSize = val;
                this.get_school();
            },
            handleCurrentChange(val) {//处理currentPage当前页变动的事件
                this.elementaryPageNumber = val;
                this.get_school();
            },
            //获取本房源成交历史记录数据
            get_transactionHistory() {
                this.$get('/report/housebidhistory/' + this.houseId).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.tableData = data.data;
                        this.total = data.total;
                        this.transactionListLoading = false;
                    } else {
                    }
                });
            },
            //格式化判断是否为空，0或null
            columnIsNull0(row, column, cellValue) {
                return this.isNull0(cellValue);
            },
            //格式化时间戳
            columnDate(row, column, cellValue, index) {
                return this.momentFormat(cellValue, 'YYYY-MM-DD');
            },

        },
        components: {}
    }
</script>

<style scoped lang="less" type="text/less">
    body {

    }
</style>
