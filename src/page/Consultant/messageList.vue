<template>
    <div>
        <el-row type="flex" class="row-bg messageList-toolbar" :gutter="30">
            <el-col :span="4">您共有：{{total}}封站内信</el-col>
            <el-col :span="4" style="text-align: left">
                <el-select v-model="selectedMessageStatusFilter" filterable clearable placeholder="默认展示全部站内信"
                           @change="MessageFilterChange">
                    <el-option label="只看未读站内信" value="0"></el-option>
                    <el-option label="只看已读站内信" value="1"></el-option>
                    <el-option label="展示全部信息" value=""></el-option>
                </el-select>
            </el-col>
        </el-row>

        <el-table
            :data="tableData"
            stripe
            border
            highlight-current-row
            v-loading="messageListLoading"
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
                label="状态">
                <template slot-scope="scope">
                    <!--格式化站内信状态-->
                    <div v-html="columnStatus(scope.row.status)"></div>
                </template>
            </el-table-column>
            <el-table-column
                property="ctime"
                label="接收时间"
                :formatter="columnDate">
            </el-table-column>
            <el-table-column label="操作" width="130">
                <template slot-scope="scope">
                    <el-button
                        size="small"
                        type="success"
                        icon="iconfont icon-renzhengtongguo"
                        v-if="scope.row.status == 0 ? true : false"
                        @click="alreadyStatusMessage(scope.row.id)"> 标为已读
                    </el-button>
                    <el-button
                        size="small"
                        type="primary"
                        icon="iconfont icon-chakan"
                        @click="lookMessageDetails(scope.row.id)"> 查看详情
                    </el-button>
                    <el-button
                        size="small"
                        type="danger"
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
                :current-page="pageNumber"
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
                <el-button type="primary" @click="messageDetails_dialog = false">确定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [],
                pageNumber: 1,//默认显示第一页
                pageSize: 10,//默认每页显示10条
                total: null,//总条数
                selectedMessageStatusFilter: '',//按站内信状态筛选
                messageListLoading: true,//站内信列表table的加载loading
                alreadyStatusMessageShow: false,//根据站内信的状态判断标为已读是否显示

                messageDetails_dialog: false,//站内信详情的Dialog对话框
                messageDetailsContent: '',//站内信详情的内容
            }
        },
        mounted() {
            this.getMessageListData();
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
            //获取站内信列表
            getMessageListData() {
                this.$get('/message/message/list', {
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    status: this.selectedMessageStatusFilter,
                }).then(res => {
                    const data = res;
                    this.tableData = data.rows;
                    this.total = data.total;
                    this.messageListLoading = false;
                })
            },
            //格式化时间戳
            columnDate(row, column, cellValue, index) {
                return this.momentFormat(cellValue, 'YYYY-MM-DD');
            },
            //格式化站内信状态
            columnStatus(cellValue) {
                let val = '';
                if (cellValue == 0) {
                    val = '<span style="color: red">未读</span>';
                } else if (cellValue == 1) {
                    val = '<span style="color: green">已读</span>';
                } else if (cellValue == null || cellValue == '') {
                    val = '-';
                }
                return val;
            },
            //按站内信状态筛选
            MessageFilterChange(value) {
                this.selectedMessageStatusFilter = value;
                this.getMessageListData();
            },
            //标为已读
            alreadyStatusMessage(messageId) {
                this.$put('/message/message/update/status', {
                    id: messageId,
                    status: 1
                }).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.$message.success('标为已读成功！');
                        this.messageListLoading = false;//显示分享组管理dialog
                        // this.getMessageListData();
                        window.location.reload();
                    } else {
                        this.$message.error(data.msg)
                    }
                });
            },
            //查看详情
            lookMessageDetails(messageId) {
                this.$get('/message/message/details?id='+ messageId).then(res => {
                    const data = res;
                    this.messageDetailsContent = data.data.content;
                    this.messageDetails_dialog = true;
                });
            },
            //删除站内信
            messageDelete(messageId) {
                this.$confirm('是否要删除此站内信？', '删除站内信').then(() => {
                    this.$put('/message/message/delete',{
                        id: messageId,
                        type: 1//0：发送者，1：接收者
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
            },


        },
        computed: {},
        components: {}
    }
</script>
<style scoped lang="less" type="text/less">
    body {
        .messageList-toolbar {
            align-items: center;
            margin: 30px 0;
        }
    }
</style>
