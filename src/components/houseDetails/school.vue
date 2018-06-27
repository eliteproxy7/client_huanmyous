<template>
    <section class="houseDetails-public-header-content">
        <div class="header">
            <i></i>学校
        </div>
        <div class="content clearfix">
            <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
                <el-tab-pane label="小学" name="elementarySchools">
                    <el-table
                        :data="elementaryTableData"
                        stripe
                        border
                        highlight-current-row
                        v-loading="elementaryListLoading"
                        element-loading-text="拼命加载中..."
                        style="width: 100%">
                        <el-table-column
                            property="name"
                            label="名称"
                            :formatter="columnIsNull0">
                        </el-table-column>
                        <el-table-column
                            property="address"
                            label="地址"
                            width="200"
                            :formatter="columnIsNull0">
                        </el-table-column>
                        <el-table-column
                            property="district"
                            label="类型/学区"
                            :formatter="columnIsNull0">
                        </el-table-column>
                        <el-table-column label="学校评分">
                            <template slot-scope="scope">
                                <div class="greatSchoolRating" v-html="columnGSRating(scope.row.gsRating)"></div>
                            </template>
                        </el-table-column>
                        <el-table-column label="家长评分" width="170">
                            <template slot-scope="scope">
                                <div v-if="scope.row.reviewRating >= 0 && scope.row.reviewRating != null">
                                    <el-rate
                                        v-model="scope.row.reviewRating"
                                        disabled
                                        show-score
                                        :colors="['#f26b16', '#bdc01e', '#439326']">
                                        text-color="#ff9900"
                                        score-template="{value}">
                                    </el-rate>
                                </div>
                                <div v-else>-</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            property="grade"
                            label="年级"
                            :formatter="columnIsNull0">
                        </el-table-column>
                        <el-table-column
                            property="distance"
                            label="距离"
                            :formatter="columnDistance">
                        </el-table-column>
                    </el-table>
                    <div class="Pagination" style="text-align: left; margin: 10px 0 0 0;">
                        <el-pagination
                            @size-change="elementaryHandleSizeChange"
                            @current-change="elementaryHandleCurrentChange"
                            :current-page="elementaryPageNumber"
                            :page-sizes="[10, 50, 100, 200, 300]"
                            :page-size="elementaryPageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="elementaryTotal">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="初中" name="middleSchools">
                    <el-table
                        :data="middleTableData"
                        stripe
                        border
                        highlight-current-row
                        v-loading="middleListLoading"
                        element-loading-text="拼命加载中..."
                        style="width: 100%">
                        <el-table-column
                            property="name"
                            label="名称"
                            :formatter="columnIsNull0">
                        </el-table-column>
                        <el-table-column
                            property="address"
                            label="地址"
                            width="200"
                            :formatter="columnIsNull0">
                        </el-table-column>
                        <el-table-column
                            property="district"
                            label="类型/学区"
                            :formatter="columnIsNull0">
                        </el-table-column>
                        <el-table-column label="学校评分">
                            <template slot-scope="scope">
                                <div class="greatSchoolRating" v-html="columnGSRating(scope.row.gsRating)"></div>
                            </template>
                        </el-table-column>
                        <el-table-column label="家长评分" width="170">
                            <template slot-scope="scope">
                                <div v-if="scope.row.reviewRating >= 0 && scope.row.reviewRating != null">
                                    <el-rate
                                        v-model="scope.row.reviewRating"
                                        disabled
                                        show-score
                                        :colors="['#f26b16', '#bdc01e', '#439326']">
                                        text-color="#ff9900"
                                        score-template="{value}">
                                    </el-rate>
                                </div>
                                <div v-else>-</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            property="grade"
                            label="年级"
                            :formatter="columnIsNull0">
                        </el-table-column>
                        <el-table-column
                            property="distance"
                            label="距离"
                            :formatter="columnDistance">
                        </el-table-column>
                    </el-table>
                    <div class="Pagination" style="text-align: left; margin: 10px 0 0 0;">
                        <el-pagination
                            @size-change="middleHandleSizeChange"
                            @current-change="middleHandleCurrentChange"
                            :current-page="middlePageNumber"
                            :page-sizes="[10, 50, 100, 200, 300]"
                            :page-size="middlePageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="middleTotal">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="高中" name="highSchools">
                    <el-table
                        :data="highTableData"
                        stripe
                        border
                        highlight-current-row
                        v-loading="highListLoading"
                        element-loading-text="拼命加载中..."
                        style="width: 100%">
                        <el-table-column
                            property="name"
                            label="名称"
                            :formatter="columnIsNull0">
                        </el-table-column>
                        <el-table-column
                            property="address"
                            label="地址"
                            width="200"
                            :formatter="columnIsNull0">
                        </el-table-column>
                        <el-table-column
                            property="district"
                            label="类型/学区"
                            :formatter="columnIsNull0">
                        </el-table-column>
                        <el-table-column label="学校评分">
                            <template slot-scope="scope">
                                <div class="greatSchoolRating" v-html="columnGSRating(scope.row.gsRating)"></div>
                            </template>
                        </el-table-column>
                        <el-table-column label="家长评分" width="170">
                            <template slot-scope="scope">
                                <div v-if="scope.row.reviewRating >= 0 && scope.row.reviewRating != null">
                                    <el-rate
                                        v-model="scope.row.reviewRating"
                                        disabled
                                        show-score
                                        :colors="['#f26b16', '#bdc01e', '#439326']">
                                        text-color="#ff9900"
                                        score-template="{value}">
                                    </el-rate>
                                </div>
                                <div v-else>-</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            property="grade"
                            label="年级"
                            :formatter="columnIsNull0">
                        </el-table-column>
                        <el-table-column
                            property="distance"
                            label="距离"
                            :formatter="columnDistance">
                        </el-table-column>
                    </el-table>
                    <div class="Pagination" style="text-align: left; margin: 10px 0 0 0;">
                        <el-pagination
                            @size-change="highHandleSizeChange"
                            @current-change="highHandleCurrentChange"
                            :current-page="highPageNumber"
                            :page-sizes="[10, 50, 100, 200, 300]"
                            :page-size="highPageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="highTotal">
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <aside>
                <p>美国学校年级制度：小学分为1~5年级、初中分为6~8年级、高中分为9~12年级、大学普通学生要就读四年，部分优等生2、3年便可以完成课程，开始实习工作。</p>
                <p>以上学校和学区信息仅供参考，如需确认，请通过经纪人或者直接与学校联系。</p>
                <p v-show="false">{{getzipcode}}</p>
            </aside>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                activeName: 'elementarySchools',    //默认展示小学
                grade: 1,//默认请求参数为1，展示小学
                elementaryTableData: [],    //小学数据
                elementaryPageNumber: 1,    //默认显示第一页
                elementaryPageSize: 10,     //默认每页显示10条
                elementaryTotal: null,      //总条数
                elementaryListLoading: true,    //小学列表table的加载loading

                middleTableData: [],    //初中数据
                middlePageNumber: 1,    //默认显示第一页
                middlePageSize: 10,     //默认每页显示10条
                middleTotal: null,      //总条数
                middleListLoading: true,    //中学列表table的加载loading

                highTableData: [],  //高中数据
                highPageNumber: 1,  //默认显示第一页
                highPageSize: 10,   //默认每页显示10条
                highTotal: null,    //总条数
                highListLoading: true, //高中列表table的加载loading
            }
        },
        computed: {
            getzipcode() {
                if(this.$store.getters.get_houseDetailsZipcode){
                    this.get_school();
                }
                return this.$store.getters.get_houseDetailsZipcode
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            elementaryHandleSizeChange(val) {//小学——处理pagesize页码大小变动的事件
                this.elementaryPageSize = val;
                this.get_school();
            },
            elementaryHandleCurrentChange(val) {//小学——处理currentPage当前页变动的事件
                this.elementaryPageNumber = val;
                this.get_school();
            },
            middleHandleSizeChange(val) {//初中——处理pagesize页码大小变动的事件
                this.elementaryPageSize = val;
                this.get_school();
            },
            middleHandleCurrentChange(val) {//初中——处理currentPage当前页变动的事件
                this.elementaryPageNumber = val;
                this.get_school();
            },
            highHandleSizeChange(val) {//高中——处理pagesize页码大小变动的事件
                this.elementaryPageSize = val;
                this.get_school();
            },
            highHandleCurrentChange(val) {//高中——处理currentPage当前页变动的事件
                this.elementaryPageNumber = val;
                this.get_school();
            },
            //获取学校数据
            get_school() {
                this.$get('/report/school/'+ this.grade +'/'+ this.$store.getters.get_houseDetailsZipcode, {
                    currentPage: this.pageNumber,
                    pageSize: this.pageSize,
                }).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.elementaryTableData = data.rows;
                        this.elementaryTotal = data.total;
                        this.elementaryListLoading = false;

                        this.middleTableData = data.rows;
                        this.middleTotal = data.total;
                        this.middleListLoading = false;

                        this.highTableData = data.rows;
                        this.highTotal = data.total;
                        this.highListLoading = false;
                    } else {
                    }
                });
            },
            //格式化判断是否为空，0或null
            columnIsNull0(row, column, cellValue) {
                return this.isNull0(cellValue);
            },
            //格式化学校的距离
            columnDistance(row, column, cellValue) {
                return this.isNull0(cellValue, 'km') ;
            },
            //tab切换的点击事件
            handleClick(tab, event) {
                if(tab.label == '小学'){
                    this.grade = 1;
                }else if(tab.label == '初中'){
                    this.grade = 2;
                }else{
                    this.grade = 3;
                }
            },
            //格式化学校评分
            columnGSRating(data) {
                let val = '';
                switch (data) {
                    case '10' || '9':
                        val = '<i style="background: #439326">'+ data +'</i>';
                        break;
                    case '8':
                        val = '<i style="background: #6ba822">'+ data +'</i>';
                        break;
                    case '7':
                        val = '<i style="background: #86b320">'+ data +'</i>';
                        break;
                    case '6':
                        val = '<i style="background: #a3be1f">'+ data +'</i>';
                        break;
                    case '5':
                        val = '<i style="background: #bdc01e">'+ data +'</i>';
                        break;
                    case '4':
                        val = '<i style="background: #d2b81b">'+ data +'</i>';
                        break;
                    case '3':
                        val = '<i style="background: #dca21a">'+ data +'</i>';
                        break;
                    case '2':
                        val = '<i style="background: #e78818">'+ data +'</i>';
                        break;
                    case '1':
                        val = '<i style="background: #f26b16">'+ data +'</i>';
                        break;
                    default:
                        val = '-';
                }
                return val;
            },


        },
        components: {}
    }
</script>

<style scoped lang="less" type="text/less">
    body {
        section {
            aside{
                p {
                    margin: 10px 0;
                    font-size: 14px;
                    color: #858585;
                }
                p:first-of-type {
                    margin: 30px 0 0 0;
                }
            }
            /deep/ .greatSchoolRating {
                > i {
                    font-family: 'robotoslab-bold';
                    border-radius: 50%;
                    width: 22px;
                    height: 22px;
                    line-height: 22px;
                    text-align: center;
                    font-size: 12px;
                    color: white;
                    display: inline-block;
                    vertical-align: middle;
                }
            }
        }
    }
</style>
