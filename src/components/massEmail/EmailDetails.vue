<template>
    <section>
        <el-table
            :data="tableData"
            stripe
            border
            highlight-current-row
            v-loading="emailDetailsListLoading"
            element-loading-text="拼命加载中..."
            style="width: 100%">
            <el-table-column
                property="name"
                label="接收客户姓名"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="toaddress"
                label="接收客户邮箱"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="toaddress"
                label="接收客户电话"
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
            <el-table-column label="操作">
                <template slot-scope="scope" >
                    <el-button
                        size="small"
                        type="success"
                        icon="iconfont icon-chakan"
                        @click="lookEmailDetails(scope.row.id)"> 查看
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
            title="邮件详情内容："
            :visible.sync="emailDetails_dialog"
            width="50%"
            center>
            <el-row type="flex" class="row-bg" justify="center">
                <el-col>
                    <el-input type="textarea" v-html="emailDetailsContent" readonly style="border:1px solid #dddddd; min-height: 64px;"></el-input>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="emailDetails_dialog = false">确定</el-button>
            </span>
        </el-dialog>
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
                emailDetailsListLoading: true,//短信详情列表table的加载loading
                id: this.$route.query.id,//邮件id
                emailDetails_dialog: false,//邮件详情的Dialog对话框
                emailDetailsContent: '',//邮件详情的内容
            }
        },
        mounted() {
            //获取邮件详情
            if(this.id){
                this.getEmailDetailsData();
            }else{
                this.$message.error('参数错误，请返回邮件列表点击查看重新进入');
            }
        },
        computed: {
        },
        methods: {
            handleSizeChange(val) {//处理pagesize页码大小变动的事件
                this.pageSize = val;
                this.getEmailDetailsData();
            },
            handleCurrentChange(val) {//处理currentPage当前页变动的事件
                this.pageNumber = val;
                this.getEmailDetailsData();
            },
            //获取邮件详情
            getEmailDetailsData() {
                this.$get('/mail/history/gather/list',{
                    pageNumber: this.page,
                    pageSize: this.pageSize,
                    gatherId: this.id
                }).then(res => {
                    const data = res;
                    this.tableData = data.rows;
                    this.total = data.total;
                    this.emailDetailsListLoading = false;
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
            //查看邮件详情
            lookEmailDetails(emailid) {
                this.$get('/mail/history/details?id='+ emailid).then(res => {
                    const data = res;
                    if(data.status == 0){
                        this.emailDetailsContent = data.data.htmlbody;
                    }else{
                        this.emailDetailsContent = data.msg;
                    }
                    this.emailDetails_dialog = true;
                });
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
