<template>
    <section>
        <el-row class="client-list-toolbar" :gutter="20">
            <el-col :span="4">
                <el-select v-model="clientFilterConsultantId" filterable clearable placeholder="以顾问筛选" @change="selectedFilterConsultant">
                    <el-option
                        v-for="item in consultantListItem"
                        :key="item.name"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select v-model="clientFilterSource" filterable clearable placeholder="以来源筛选" @change="selectedFilterSource">
                    <el-option label="通过房源分享页注册" value="房源分享"></el-option>
                    <el-option label="顾问创建" value="顾问创建"></el-option>
                    <el-option label="通过落地页注册" value="公司主页"></el-option>
                </el-select>
            </el-col>
            <el-col :span="9">
                <el-date-picker
                    v-model="clientFilterBEtime"
                    type="daterange"
                    align="center"
                    value-format="yyyy-MM-dd"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="BEtimePickerOptions"
                    @change="selectedClientFilterBEtime">
                </el-date-picker>
            </el-col>
            <el-col :span="6">
                <el-input v-model="NamePhoneSearchKeyword" placeholder="输入名字或手机号搜索" clearable @clear="clearKeyword">
                    <el-button v-ripple type="primary" slot="append" icon="el-icon-search"
                               @click="NamePhoneSearchClient"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4" style="margin:20px 0 0 0; line-height: 40px;">查询到：{{total}}位客户</el-col>
            <el-col :span="4">
                <el-button v-ripple type="primary" icon="iconfont icon-daochuexcel-copy" @click="exportAllClient" style="margin:20px 0 0 0;"> 导出全部客户Excel</el-button>
            </el-col>
        </el-row>

        <el-table
            :data="tableData"
            stripe
            border
            highlight-current-row
            v-loading="clientListLoading"
            element-loading-text="拼命加载中..."
            style="width: 100%"
            @sort-change="sortChange"
            :default-sort="{prop: 'ctime', order: 'descending'}">
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
                property="email"
                label="邮箱"
                width="130"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="sex"
                label="性别"
                :formatter="columnSex">
            </el-table-column>
            <el-table-column
                property="birthdate"
                label="年龄"
                :formatter="columnAge"
                sortable="custom">
            </el-table-column>
            <el-table-column label="标签" width="250">
                <template slot-scope="scope">
                    <div v-show="scope.row.tags.length" v-for="item in scope.row.tags" class="el-tag-div">
                        <el-tag size="mini" :style="{ backgroundColor: '#'+ item.tag.split('/')[1]}">{{
                            item.tag.split('/')[0]}}
                        </el-tag>
                    </div>
                    <span v-show="!scope.row.tags.length">-</span>
                </template>
            </el-table-column>
            <el-table-column
                property="ctime"
                width="110"
                label="创建时间"
                :formatter="columnDate"
                sortable="custom">
            </el-table-column>
            <el-table-column
                property="source"
                label="获客来源"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="shareGroupName"
                label="来源分享组"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="counselorName"
                label="所属顾问"
                width="100"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button
                        v-ripple
                        size="small"
                        type="success"
                        icon="iconfont icon-chakan"
                        @click="lookDetailsClient(scope.row.clientId)"> 查看
                    </el-button>
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

        <el-dialog
            title="导出全部客户Excel"
            :visible.sync="exportAllClientDialog"
            width="30%">
            <span>点击确定则导出您名下的所有客户信息Excel（链接有效期30分钟）！</span>
            <span slot="footer" class="dialog-footer">
                <el-button v-ripple type="warning" @click="exportAllClientDialog = false">取 消</el-button>
                <el-button v-ripple type="primary" @click="exportAllClientDialog = false" class="exportAllClientDownload-button">
                    <a :href="exportAllClientDownloadHref" download="顾问所有客户信息导出列表.xlsx">下 载</a>
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
                sortField: '',//排序字段
                direction: '',//排序方向——ASC 升序，DESC 降序
                clientListLoading: true,//客户列表的加载动画

                consultantListItem: '',//按顾问筛选——顾问的列表
                clientFilterConsultantId: '',//按顾问筛选——顾问的ID
                clientFilterSource: '',//按客户来源筛选
                clientFilterBEtime: '',//按创建时间筛选
                clientFilterBtime: '',//按创建时间筛选——开始时间
                clientFilterEtime: '',//按创建时间筛选——结束时间
                //按创建时间筛选——选项配置
                BEtimePickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
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

                exportAllClientDialog: false,//导出全部客户Excel的Dialog对话框
                exportAllClientDownloadHref: '',//导出全部客户Excel的下载按钮的href

            }
        },
        mounted() {
            this.getConsultantListData();//获取顾问列表，遍历到select
        },
        computed: {
        },
        methods: {
            handleSizeChange(val) {//处理pagesize页码大小变动的事件
                this.pageSize = val;
                this.getClientData();
            },
            handleCurrentChange(val) {//处理currentPage当前页变动的事件
                this.pageNumber = val;
                this.getClientData();
            },
            getClientData() {//获取客户列表
                this.$get('/client/company/list', {
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    keyword: this.NamePhoneSearchKeyword,
                    sortField: this.sortField,
                    direction: this.direction,
                    counselorId: this.clientFilterConsultantId,
                    source: this.clientFilterSource,
                    btime: this.clientFilterBtime,
                    etime: this.clientFilterEtime,
                }).then(res => {
                    const data = res;
                    this.tableData = data.rows;
                    this.total = data.total;
                    this.clientListLoading = false;
                })
            },
            columnSex(row, column, cellValue, index) {//格式化性别
                return this.sex_FN(cellValue);
            },
            columnAge(row, column, cellValue, index) {//格式化年龄
                return this.age_FN(cellValue);
            },
            columnDate(row, column, cellValue, index) {//格式化时间戳
                return this.momentFormat(cellValue, 'YYYY-MM-DD');
            },
            columnIsNull0(row, column, cellValue){//格式化判断是否为空，0或null
                return this.isNull0(cellValue);
            },
            //排序的回调
            sortChange(column, prop, order) {
                // console.log(column, prop, order)
                this.sortField = column.prop;   //排序字段
                //判断要排序的字段是否是年龄
                if (column.prop == 'birthdate') {
                    this.direction = column.order == 'ascending' ? 'desc' : 'asc';//排序方向——ASC 升序，DESC 降序，年龄排序要反着来展示
                } else {
                    this.direction = column.order == 'ascending' ? 'asc' : 'desc';//排序方向——ASC 升序，DESC 降序，除了年龄排序，其他都正常展示
                }
                this.getClientData();
            },
            //按名字或手机号搜索客户
            NamePhoneSearchClient() {
                this.clientListLoading = true;
                this.getClientData();
            },
            //清空按名字或手机号搜索客户的关键字
            clearKeyword() {
                this.getClientData();
            },
            //查看详情
            lookDetailsClient(clientId) {
                this.$router.push({path: "/company_clientDetails", query: {clientId: clientId}});
            },
            //获取顾问列表，遍历到select
            getConsultantListData(){
                this.$get('/counselor/list/select').then(res => {
                    const data = res;
                    this.consultantListItem = data.data;
                });
            },
            //按顾问筛选
            selectedFilterConsultant(){
                this.clientListLoading = true;
                this.getClientData();
            },
            //按客户来源筛选
            selectedFilterSource(){
                this.clientListLoading = true;
                this.getClientData();
            },
            //按创建时间筛选
            selectedClientFilterBEtime(value){
                // console.log(value)
                //判断clearable清除时间操作
                this.clientFilterBtime = value ? value[0] : '';
                this.clientFilterEtime = value ? value[1] : '';
                this.getClientData();
            },

            //获取导出全部客户Excel的下载链接并赋值给a标签下载按钮
            exportAllClient(){
                this.$get('/client/company/export').then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.exportAllClientDialog = true;
                        this.exportAllClientDownloadHref = data.data;
                        this.$message.success('下载链接获取成功，请尽快点击确定下载Excel！');
                    } else {
                        this.$message.error(data.msg)
                    }
                });
            },


        },
        components: {
        }
    }
</script>
<style scoped lang="less" type="text/less">
    body{
        section {
            .client-list-toolbar {
                align-items: center;
                margin: 30px 0;
            }
            table {
                > tbody {
                    > tr {
                        > td {
                            span {
                                margin: 0 5px;
                            }
                            button {
                                display: block;
                                margin: 8px auto;
                            }
                            .el-tag-div {
                                display: inline-block;
                                .el-tag {
                                    color: #fff;
                                    margin: 3px;
                                }
                            }
                        }
                    }
                }
            }
        }

        .exportAllClientDownload-button{
            padding: 0;
            span {
                a{
                    display: inline-block;
                    padding: 12px 20px;
                    color: #fff;
                }
            }
        }
    }




</style>
