<template>
    <div>
        <el-table
            :data="tableData"
            stripe
            border
            highlight-current-row
            v-loading="houseListLoading"
            element-loading-text="拼命加载中..."
            style="width: 100%">
            <el-table-column
                label="标题和内容">
                <template slot-scope="scope">
                    <h4 style="font-size: 20px">{{isNull0(scope.row.title)}}</h4>
                    <p>{{isNull0(scope.row.content)}}</p>
                </template>
            </el-table-column>

            <el-table-column
                property="receiverName"
                label="接收顾问"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="ctime"
                label="发送时间"
                :formatter="columnDate"
                sortable>
            </el-table-column>
            <el-table-column label="操作" width="140">
                <template slot-scope="scope">
                    <el-button
                        size="small"
                        type="primary"
                        icon="iconfont icon-chakan"
                        @click="lookMessageDetails(scope.row.id)"> 查看详情
                    </el-button>
                    <el-button
                        size="small"
                        type="warning"
                        icon="iconfont icon-whole_delete"
                        @click="messageDelete(scope.row.id)"> 删除
                    </el-button>
                </template>
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
        <el-dialog
            title="站内信详情内容："
            :visible.sync="messageDetails_dialog"
            width="30%"
            center>
            <el-row type="flex" class="row-bg" justify="center">
                <el-col>{{messageDetailsContent}}</el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="messageDetails_dialog = false">确定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                page: 1,//默认显示第一页
                pageSize: 10,//默认每页显示10条
                total: null,//总条数
                houseListLoading: true,
                messageDetails_dialog: false,//站内信详情的Dialog对话框
                messageDetailsContent: '',//站内信详情的内容

            }
        },
        mounted() {
            this.getMessageListData();//获取站内信息
        },
        computed: {
        },
        methods: {
            handleSizeChange(val) {//处理pagesize页码大小变动的事件
                this.pageSize = val;
                this.getMessageListData()
            },
            handleCurrentChange(val) {//处理currentPage当前页变动的事件
                this.pageNumber = val;
                this.getMessageListData()
            },
            columnDate(row, column, cellValue, index) {//格式化时间戳
                return this.momentFormat(cellValue, 'YYYY-MM-DD HH:mm:ss');
            },
            columnIsNull0(row, column, cellValue) {//格式化判断是否为空，0或null
                return this.isNull0(cellValue);
            },
            getMessageListData() {//获取站内信息
                let that = this;
                this.$get('/message/message/history/list', {
                    page: that.page,
                    pageSize: that.pageSize,
                }).then(res => {
                    const data = res;

                    this.tableData = data.rows;
                    this.total = data.total;
                    this.houseListLoading = false;
                    console.log(this.tableData)
                });
            },
            //查看站内信详情
            lookMessageDetails(messageId) {
                this.$get('/message/message/details?id='+ messageId).then(res => {
                    const data = res;
                    if(data.status == 0){
                        this.messageDetailsContent = data.data.content;
                    }else{
                        this.messageDetailsContent = data.msg;
                    }
                    this.messageDetails_dialog = true;
                });
            },
            //删除站内信
            messageDelete(messageId) {
                this.$confirm('是否要删除此站内信？', '删除站内信').then(() => {
                    this.$put('/message/message/delete',{
                        id: messageId,
                        type: 0//0：发送者，1：接收者
                    }).then(res => {
                        const data = res;
                        if (data.status == 0) {
                            this.$message.success('删除成功！');
                            this.getMessageListData();
                        } else {
                            this.$message.error(data.msg)
                        }
                    });
                }).catch(() => {
                    this.$message.info('已取消操作.');
                });
            }
        },
        components: {
        }
    }
</script>

<style scoped lang="less" type="text/less">
    body {
        .search-input {
            background-color: #fff;
            width: 100%;
        }

        .el-select {
            margin-bottom: 10px !important;
        }
        .house-filter-dialog {
        .el-dialog__body {
            padding: 0 20px !important;
            .el-row {
                margin: 6px 0;
                .el-select {
                    width: 100%;
                    }
                }
            }
        }
        .searchKeyword-list {
            ul.el-scrollbar__view {
                > li {
                    > p {
                        width: calc(100% - 40px);
                        float: left;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: block;
                        text-align: justify;
                        white-space: nowrap;
                        word-wrap: normal;
                    }
                    > span {
                        color: #fff;
                    }
                }
            }
        }
    }
</style>
