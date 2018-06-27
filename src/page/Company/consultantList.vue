<template>
    <section>
        <el-row class="consultant-list-toolbar" :gutter="30" type="flex" justify="space-between">
            <el-col :span="13" style="text-align: left">
                <span>本公司共：{{total}}位顾问</span>
                <el-button
                    v-ripple
                    type="primary"
                    icon="iconfont icon-daochuexcel-copy"
                    @click="exportAllConsultant"
                    style="margin: 0 15px"> 导出全部顾问Excel
                </el-button>
                <el-switch
                    v-ripple
                    v-model="filterGoldSwich"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="只看金牌顾问"
                    @change="filterGoldConsultantChange">
                </el-switch>
            </el-col>
            <el-col :span="6" style="text-align: right">
                <el-input v-model="NamePhoneSearchKeyword" placeholder="输入名字或手机号搜索" clearable @clear="clearKeyword">
                    <el-button v-ripple type="primary" slot="append" icon="el-icon-search"
                               @click="NamePhoneSearchClient"></el-button>
                </el-input>
            </el-col>
        </el-row>

        <el-table
            :data="tableData"
            stripe
            border
            highlight-current-row
            v-loading="consultantListLoading"
            element-loading-text="拼命加载中..."
            style="width: 100%">
            <el-table-column
                property="name"
                label="姓名"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="phone"
                label="电话"
                width="130"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="jobNumber"
                label="工号"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="responsiblePlace"
                label="负责地区"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="clientCount"
                label="客户数量（位）"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column label="金牌顾问" width="170">
                <template slot-scope="scope">
                    <el-button
                        v-ripple
                        size="small"
                        type="primary"
                        v-if="!scope.row.istop"
                        icon="el-icon-setting"
                        @click="setGoldConsultant(scope.row.counselorId)"> 设为金牌顾问
                    </el-button>
                    <el-button
                        v-ripple
                        size="small"
                        type="warning"
                        v-if="scope.row.istop"
                        icon="el-icon-circle-close-outline"
                        @click="setGoldConsultant(scope.row.counselorId)"> 取消金牌顾问
                    </el-button>
                    <el-input-number
                        v-model="scope.row.sort"
                        v-if="scope.row.istop"
                        controls-position="right"
                        size="small"
                        :min="1"
                        :max="9"
                        @change="GoldConsultantSortChange(scope.row.sort, scope.row.uuid)"
                        style="margin: 10px 0 0 0">
                    </el-input-number>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="140">
                <template slot-scope="scope">
                    <el-button
                        v-ripple
                        size="small"
                        type="success"
                        icon="iconfont icon-chakan"
                        @click="lookConsultantDetails(scope.row.counselorId)"> 查看
                    </el-button>
                    <el-button
                        v-ripple
                        size="small"
                        type="primary"
                        icon="iconfont icon-xiugai"
                        @click="consultantEdit(scope.row.counselorId)"> 修改
                    </el-button>
                    <el-button
                        v-ripple
                        size="small"
                        type="danger"
                        icon="iconfont icon-whole_delete"
                        @click="consultantDelete(scope.row.counselorId)"> 删除
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
            title="导出全部顾问Excel"
            :visible.sync="exportAllConsultantDialog"
            width="30%">
            <span>点击确定则导出所有顾问信息Excel（链接有效期30分钟）！</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="exportAllConsultantDialog = false">取 消</el-button>
                <el-button type="primary" @click="exportAllConsultantDialog = false" class="exportAllConsultantDownload-button">
                    <a :href="exportAllConsultantDownloadHref" download="所有顾问信息.xlsx">下 载</a>
                </el-button>
            </span>
        </el-dialog>
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
                NamePhoneSearchKeyword: '',//按名字或手机号搜索客户的关键字
                consultantListLoading: true,//客户列表的加载动画

                exportAllConsultantDialog: false,   //导出全部客户Excel的Dialog对话框
                exportAllConsultantDownloadHref: '',//导出全部客户Excel的下载按钮的href

                filterGoldSwich: false, //只看金牌顾问Switch 开关 true or flase
                // consultantGoldSort:'0',//修改金牌顾问排序-InputNumber 计数器
                // uuid:''//修改金牌顾问排序-uuid
            }
        },
        mounted() {
            this.getCounselorData();//获取顾问列表
        },
        methods: {
            handleSizeChange(val) {//处理pagesize页码大小变动的事件
                this.pageSize = val;
                this.getCounselorData();
            },
            handleCurrentChange(val) {//处理currentPage当前页变动的事件
                this.pageNumber = val;
                this.getCounselorData();
            },
            //获取顾问列表
            getCounselorData() {
                this.$get('/counselor/list', {
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    keyword: this.NamePhoneSearchKeyword,
                    istop: this.filterGoldSwich
                }).then(res => {
                    const data = res;
                    this.tableData = data.rows;
                    this.total = data.total;
                    this.consultantListLoading = false;
                })
            },
            columnIsNull0(row, column, cellValue) {//格式化判断是否为空，0或null
                return this.isNull0(cellValue);
            },
            //金牌顾问切换
            filterGoldConsultantChange(value) {
                this.getCounselorData();
            },
            //设置金牌顾问
            setGoldConsultant(counselorId) {
                this.$put('/counselor/istop?counselorId=' + counselorId).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.$message.success('设置金牌顾问状态成功！');
                        this.getCounselorData();
                    } else {
                        this.$message.error(data.msg)
                    }
                });
            },
            //修改金牌顾问排序
            GoldConsultantSortChange(sortNum, uuid) {
                if (isNaN(sortNum)) {
                    sortNum = '0';
                }
                this.$put('/counselor/sort', {
                    uuid: uuid,
                    sort: sortNum
                }).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.$message.success('修改金牌顾问排序成功！');
                        this.getCounselorData();
                    } else {
                        this.$message.error(data.msg)
                    }
                });
            },
            //按名字或手机号搜索客户
            NamePhoneSearchClient() {
                this.getCounselorData();
            },
            //清空按名字或手机号搜索客户的关键字
            clearKeyword() {
                this.getCounselorData();
            },
            //查看顾问
            lookConsultantDetails(counselorId) {
                this.$router.push({path: "/company_consultantDetails", query: {counselorId: counselorId}});
            },
            //修改顾问
            consultantEdit(counselorId) {
                this.$router.push({path: '/company_consultantCreateModify', query: {counselorId: counselorId}});
            },
            //删除顾问（假删除）
            consultantDelete(counselorId) {
                this.$confirm('是否要删除此顾问？', '删除顾问').then(() => {
                    this.$delete('/counselor/delete?counselorId=' + counselorId).then(res => {
                        const data = res;
                        if (data.status == 0) {
                            this.$message.success('删除成功！');
                            this.getCounselorData();
                        } else {
                            this.$message.error(data.msg)
                        }
                    });
                }).catch(() => {
                    this.$message.info('已取消操作.');
                });
            },
            //获取导出全部顾问Excel的下载链接并赋值给a标签下载按钮
            exportAllConsultant() {
                this.$get('/counselor/export').then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.exportAllConsultantDialog = true;
                        this.exportAllConsultantDownloadHref = data.data;
                        this.$message.success('下载链接获取成功，请尽快点击确定下载Excel！');
                    } else {
                        this.$message.error(data.msg)
                    }
                });
            },


        },
        computed: {},
        components: {}
    }
</script>
<style scoped lang="less" type="text/less">
    body {
        section {
            .consultant-list-toolbar {
                align-items: center;
                margin: 30px 0;
            }
            .exportAllConsultantDownload-button {
                padding: 0;
                span {
                    a {
                        display: inline-block;
                        padding: 12px 20px;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>
