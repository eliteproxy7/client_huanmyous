<template>
    <section>
        <h4>
            <el-tooltip class="item" effect="dark" content="返回" placement="top">
                <i class="el-icon-arrow-left" @click="$router.back()"></i>
            </el-tooltip>
            顾问详情信息
        </h4>
        <aside>
            <span>是否金牌顾问</span>
            <p>{{consultantDetailsData.istop == true ? '是' : '否'}}</p>
        </aside>
        <aside>
            <span>姓名</span>
            <p>{{isNull0(consultantDetailsData.name)}}</p>
        </aside>
        <aside>
            <span>电话</span>
            <p>{{isNull0(consultantDetailsData.phone)}}</p>
        </aside>
        <aside>
            <span>邮箱</span>
            <p>{{sex_FN(consultantDetailsData.email)}}</p>
        </aside>
        <aside>
            <span>性别</span>
            <p>{{sex_FN(consultantDetailsData.sex)}}</p>
        </aside>
        <aside>
            <span>工号</span>
            <p>{{isNull0(consultantDetailsData.jobNumber)}}</p>
        </aside>
        <aside>
            <span>微信</span>
            <p>{{isNull0(consultantDetailsData.weixin)}}</p>
        </aside>
        <aside>
            <span>QQ</span>
            <p>{{isNull0(consultantDetailsData.qq)}}</p>
        </aside>
        <aside>
            <span>负责售卖地区</span>
            <p>{{isNull0(consultantDetailsData.responsiblePlace)}}</p>
        </aside>
        <aside>
            <span>头像</span>
            <p>
                <img v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ consultantDetailsData.photo" style="max-width: 200px">
            </p>
        </aside>
        <aside>
            <span>名片</span>
            <p>
                <img v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ consultantDetailsData.businessCard" style="max-width: 500px">
            </p>
        </aside>

        <h4>所属客户列表</h4>

        <el-table
            :data="clientTableData"
            stripe
            border
            highlight-current-row
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
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="email"
                label="邮箱"
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
                property="ctime"
                label="创建时间"
                :formatter="columnDate"
                sortable="custom">
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

        <h4>平台使用情况</h4>

        <el-table
            :data="platformUsageTableData"
            stripe
            border
            highlight-current-row
            style="width: 100%">
            <el-table-column
                property="description"
                label="操作"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="ip"
                label="访问IP"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="createTime"
                label="访问时间"
                :formatter="columnDate">
            </el-table-column>

        </el-table>
        <div class="Pagination" style="text-align: left; margin-top: 10px;">
            <el-pagination
                @size-change="platformUsagehHandleSizeChange"
                @current-change="platformUsageHandleCurrentChange"
                :current-page="platformUsagePageNumber"
                :page-sizes="[10, 50, 100, 200, 300]"
                :page-size="platformUsagePageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="platformUsageTotal">
            </el-pagination>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                counselorId: this.$route.query.counselorId,
                consultantDetailsData: {},  //顾问基本信息
                clientTableData: [],   //所属客户列表数据
                pageNumber: 1,  //默认显示第一页
                pageSize: 10,   //默认每页显示10条
                total: null,    //总条数
                NamePhoneSearchKeyword: '', //按名字或手机号搜索客户的关键字
                sortField: '',  //排序字段
                direction: '',  //排序方向——ASC 升序，DESC 降序
                consultantDetailsClientLoading: true,   //所属客户列表的加载动画

                platformUsageTableData: [],   //所属客户列表数据
                platformUsagePageNumber: 1,  //默认显示第一页
                platformUsagePageSize: 10,   //默认每页显示10条
                platformUsageTotal: null,    //总条数
                platformUsageLoading: true,   //所属客户列表的加载动画

            }
        },
        created() {
        },
        mounted() {
            //判断是否有counselorId
            if (this.counselorId) {
                this.getConsultantDetailsData();  //获取顾问基本信息
                this.getPlatformUsageData();    //初始化平台使用情况
            }
        },
        methods: {
            //获取顾问基本信息
            getConsultantDetailsData(){
                this.$get('counselor/detail?counselorId='+ this.counselorId).then(res => {
                    this.consultantDetailsData = res.data;
                })
            },
            //所属客户列表——处理pagesize页码大小变动的事件
            handleSizeChange(val) {
                this.pageSize = val;
                this.getConsultantDetailsClientData();
            },
            //所属客户列表——处理currentPage当前页变动的事件
            handleCurrentChange(val) {
                this.pageNumber = val;
                this.getConsultantDetailsClientData();
            },
            //获取所属客户列表
            getConsultantDetailsClientData() {
                this.$get('/client/company/list', {
                    counselorId: this.counselorId,
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    sortField: this.sortField,
                    direction: this.direction,
                }).then(res => {
                    const data = res;
                    this.clientTableData = data.rows;
                    this.total = data.total;
                    this.clientListLoading = false;
                })
            },
            //排序的回调
            sortChange(column, prop, order) {
                // console.log(column, prop, order)
                this.sortField = column.prop;//排序字段
                //判断要排序的字段是否是年龄
                if (column.prop == 'birthdate') {
                    this.direction = column.order == 'ascending' ? 'desc' : 'asc';//排序方向——ASC 升序，DESC 降序，年龄排序要反着来展示
                } else {
                    this.direction = column.order == 'ascending' ? 'asc' : 'desc';//排序方向——ASC 升序，DESC 降序，除了年龄排序，其他都正常展示
                }
                if (this.counselorId) {
                    this.getConsultantDetailsClientData();  //获取所属客户列表
                }
            },

            //所属客户列表——处理pagesize页码大小变动的事件
            platformUsagehHandleSizeChange(val) {
                this.platformUsagePageSize = val;
                this.getPlatformUsageData();
            },
            //所属客户列表——处理currentPage当前页变动的事件
            platformUsageHandleCurrentChange(val) {
                this.platformUsagePageNumber = val;
                this.getPlatformUsageData();
            },
            //平台使用情况
            getPlatformUsageData() {
                this.$get('log/counselor/list', {
                    counselorId: this.counselorId,
                    pageNumber: this.platformUsagePageNumber,
                    pageSize: this.platformUsagePageSize,
                }).then(res => {
                    const data = res;
                    this.platformUsageTableData = data.rows;
                    this.platformUsageTotal = data.total;
                    this.platformUsageLoading = false;
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

        },
        computed: {

        }
    }
</script>

<style scoped lang="less" type="text/less">
    body {
        section {
            padding: 0 0 0 15px;
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
            > aside {
                overflow: hidden;
                display: block;
                padding: 12px 0;
                font-size: 14px;
                border-bottom: 1px solid #e6e9f0;
                > span {
                    width: 100px;
                    text-align: left;
                    color: #afafaf;
                    float: left;
                }
                > p {
                    width: calc(~'100% - 100px');
                    color: #000;
                    float: left;
                }
            }
            table {
                > tbody {
                    > tr {
                        > td {
                            div.el-tag-div {
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
    }
</style>
