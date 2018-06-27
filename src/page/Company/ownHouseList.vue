<template>
    <section>
        <el-row style="margin: 30px 0;" :gutter="30">
            <el-col :span="12">
                <el-radio-group v-model="searchKeywordType" :SearchKeywordTypeFN="SearchKeywordTypeFN" @change="searchKeywordTypeChange"
                                style="margin: 0 0 10px 0;">
                    <el-radio label="house">按地址/MLS搜索</el-radio>
                    <el-radio label="city" style="margin: 0 20px">按城市搜索</el-radio>
                    <el-radio label="zipcode">按邮编搜索</el-radio>
                </el-radio-group>
                <el-autocomplete
                    v-show="searchKeywordTypeShow_house"
                    popper-class="searchKeyword-list"
                    v-model.trim="searchKeyword"
                    :fetch-suggestions="querySearchAsync_houses"
                    placeholder="请输入地址 / MLS"
                    @select="handleSelect"
                    :debounce="1000"
                    :trigger-on-focus="false"
                    class="search-input">
                    <i class="el-icon-edit el-input__icon"></i>
                    <template slot-scope="scope">
                        <p>{{scope.item.value}}</p>
                        <el-tag size="mini" color="#2196f3">地址</el-tag>
                    </template>
                </el-autocomplete>
                <el-autocomplete
                    v-show="searchKeywordTypeShow_city"
                    popper-class="searchKeyword-list"
                    v-model.trim="searchKeyword"
                    :fetch-suggestions="querySearchAsync_citys"
                    placeholder="请输入城市名"
                    @select="handleSelect"
                    :debounce="1000"
                    :trigger-on-focus="false"
                    class="search-input">
                    <i class="el-icon-edit el-input__icon"></i>
                    <template slot-scope="scope">
                        <p>{{scope.item.value}}</p>
                        <el-tag size="mini" color="#4caf50">城市</el-tag>
                    </template>
                </el-autocomplete>
                <el-autocomplete
                    v-show="searchKeywordTypeShow_zipcode"
                    popper-class="searchKeyword-list"
                    v-model.trim="searchKeyword"
                    :fetch-suggestions="querySearchAsync_zipcodes"
                    placeholder="请输入邮编"
                    @select="handleSelect"
                    :debounce="1000"
                    :trigger-on-focus="false"
                    class="search-input">
                    <i class="el-icon-edit el-input__icon"></i>
                    <template slot-scope="scope">
                        <p>{{scope.item.value}}</p>
                        <el-tag size="mini" color="#9c27b0">邮编</el-tag>
                    </template>
                </el-autocomplete>
            </el-col>

        </el-row>

        <el-table
            :data="tableData"
            stripe
            border
            highlight-current-row
            v-loading="houseListLoading"
            element-loading-text="拼命加载中..."
            style="width: 100%">
            <el-table-column label="房源图片" width="170px">
                <template slot-scope="scope">
                    <img v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ scope.row.heroImage" width="150" height="100"/>
                </template>
            </el-table-column>
            <el-table-column
                property="address"
                label="房源地址"
                width="150"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="propertySubtype"
                label="房源类型"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column property="listPrice" label="价格" sortable="custom" width="110">
                <template slot-scope="scope">
                    <p>{{isNull0_USD(scope.row.listPrice)}}</p>
                    <p>{{isNull0_RMB(scope.row.listPrice)}}</p>
                </template>
            </el-table-column>
            <el-table-column property="livingArea" label="面积" sortable="custom" width="120">
                <template slot-scope="scope">
                    <p>{{isNull0_sqft(scope.row.livingArea)}}</p>
                    <p>{{isNull0_sqmt(scope.row.livingArea)}}</p>
                </template>
            </el-table-column>
            <el-table-column
                property="bedroomCount"
                label="卧室 (间)"
                sortable="custom"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="bathroomCount"
                label="卫浴 (间)"
                sortable="custom"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="yearBuilt"
                label="年份"
                sortable="custom"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                label="状态">
                <template slot-scope="scope">
                    <!--格式化房源售卖状态-->
                    <div v-html="house_status(scope.row.listingStatus)"></div>
                </template>
            </el-table-column>
            <el-table-column
                property="listingDate"
                label="上市时间"
                :formatter="columnDate">
            </el-table-column>
            <el-table-column
                label="在售天数">
                <template slot-scope="scope">
                    <div>{{DateMinus(momentFormat(scope.row.listingDate, 'YYYY-MM-DD'))}}天</div>
                </template>
            </el-table-column>
            <el-table-column
                label="审核状态">
                <template slot-scope="scope">
                    <div v-html="isCheck_status(scope.row.isCheck)"></div>
                </template>
            </el-table-column>
            <el-table-column
                label="明星房源" width="150">
                <template slot-scope="scope">
                    <el-button v-ripple size="small" type="primary" icon="el-icon-setting"
                               @click="setStarHouse(scope.row.houseId)"
                               v-show="!scope.row.isStar"> 设为明星房源</el-button>
                    <el-button v-ripple size="small" type="warning" icon="el-icon-circle-close-outline"
                               @click="setStarHouse(scope.row.houseId)"
                               v-show="scope.row.isStar"> 取消明星房源</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <el-button
                        size="small"
                        type="success"
                        icon="iconfont icon-chakan"
                        @click="goHouseDetails(scope.row.houseId)"> 查看
                    </el-button>
                    <el-button
                        size="small"
                        type="primary"
                        icon="iconfont icon-xiugai"
                        @click="houseEdit(scope.row.houseId)"> 修改
                    </el-button>
                    <el-button
                        size="small"
                        type="danger"
                        icon="iconfont icon-whole_delete"
                        @click="houseDelete(scope.row.houseId)"> 删除
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


    </section>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                pageNumber: 1, //默认显示第一页
                pageSize: 10, //默认每页显示10条
                total: null,//总条数
                filed: '', //排序字段
                direction: '', //排序方向——ASC 升序，DESC 降序
                action: '',//搜索方法：房源地址/MLS、城市、邮编
                searchKeyword: '',//搜索框关键字
                searchKeywordType: 'house',//要按什么类型来搜索：房源地址/MLS、城市、邮编
                searchKeywordTypeShow_house: true,//按地址/MLS搜索——判断是否显示对应的搜索框
                searchKeywordTypeShow_city: false,//按城市搜索——判断是否显示对应的搜索框
                searchKeywordTypeShow_zipcode: false,//按邮编搜索——判断是否显示对应的搜索框
                houseListLoading: true, //房源列表table的加载loading
                filterIsOwnHouse: true, //是否筛选本公司自有房源
            }
        },
        mounted() {
            this.getHouseData();

        },
        computed: {
            SearchKeywordTypeFN() {//判断选择普通营业执照or多证合一营业执照
                if (this.searchKeywordType == 'house') {//按地址/MLS搜索
                    this.searchKeywordTypeShow_house = true;
                    this.searchKeywordTypeShow_city = false;
                    this.searchKeywordTypeShow_zipcode = false;
                } else if (this.searchKeywordType == 'city') {//按城市搜索
                    this.searchKeywordTypeShow_house = false;
                    this.searchKeywordTypeShow_city = true;
                    this.searchKeywordTypeShow_zipcode = false;
                } else {//按邮编搜索
                    this.searchKeywordTypeShow_house = false;
                    this.searchKeywordTypeShow_city = false;
                    this.searchKeywordTypeShow_zipcode = true;
                }
            },

        },
        methods: {
            handleSizeChange(val) {//处理pagesize页码大小变动的事件
                this.pageSize = val;
                this.getHouseData()
            },
            handleCurrentChange(val) {//处理currentPage当前页变动的事件
                this.pageNumber = val;
                this.getHouseData()
            },
            //获取房源列表
            getHouseData() {
                this.$get('/house/search', {
                    page: this.pageNumber,
                    pageSize: this.pageSize,
                    action: this.action, //搜索方法：房源地址/MLS、城市、邮编
                    keyword: this.searchKeyword, //搜索关键字
                    filed: this.filed, //排序字段
                    direction: this.direction, //排序方向——ASC 升序，DESC 降序
                    isOwn: this.filterIsOwnHouse,   //筛选本公司自有房源
                }).then(res => {
                    const data = res;
                    this.tableData = data.rows;
                    this.total = data.total;
                    this.houseListLoading = false;
                });
            },
            //格式化判断是否为空，0或null
            columnIsNull0(row, column, cellValue) {
                return this.isNull0(cellValue)
            },
            //格式化时间戳
            columnDate(row, column, cellValue, index) {
                return this.momentFormat(cellValue, 'YYYY-MM-DD')
            },
            //判断自有房源的审核状态
            isCheck_status(data){
                let val = '';
                if (data == true) {
                    val = '已通过';
                } else if (data == false) {
                    val = '未通过';
                } else if (data == null || data == '') {
                    val = '-';
                }
                return val;
            },
            //设置、取消明星房源
            setStarHouse(houseId){
                this.$post('/own/star/'+ houseId).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.$message.success('修改成功！');
                        this.getHouseData();
                    } else {
                        this.$message.error(data.msg)
                    }
                });

            },
            //搜索模式radio切换的时候清空搜索关键字
            searchKeywordTypeChange(){
                this.searchKeyword = '';
            },
            //搜索房源功能——按地址/MLS搜索
            querySearchAsync_houses(queryString, callback) {
                //queryString 为在框中输入的值，callback 回调函数,将处理好的数据推回
                let list = [{}];
                if (this.getByteLen(queryString) > 3) {
                    this.$get('/house/search/' ,{
                        action: 'address', //搜索方法：房源地址/MLS、城市、邮编
                        keyword: queryString, //搜索关键字
                        isOwn: this.filterIsOwnHouse,   //筛选本公司自有房源
                    }).then(res => {
                        //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
                        for (let i of res.rows) {
                            i.value = i.address;
                        }
                        list = res.rows;
                        callback(list);
                    });
                }
            },
            //搜索房源功能——按城市搜索
            querySearchAsync_citys(queryString, callback) {
                //queryString 为在框中输入的值，callback 回调函数,将处理好的数据推回
                let list = [{}];
                if (this.getByteLen(queryString) > 3) {
                    this.$get('/house/search/' ,{
                        action: 'city', //搜索方法：房源地址/MLS、城市、邮编
                        keyword: queryString, //搜索关键字
                        isOwn: this.filterIsOwnHouse,   //筛选本公司自有房源
                    }).then(res => {
                        //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
                        for (let i of res.rows) {
                            i.value = i.address.split(',')[2] + ' , ' + i.address.split(',')[3];
                        }
                        list = res.rows;
                        callback(list);
                    });
                }
            },
            //搜索房源功能——按邮编搜索
            querySearchAsync_zipcodes(queryString, callback) {
                //queryString 为在框中输入的值，callback 回调函数,将处理好的数据推回
                let list = [{}];
                if (this.getByteLen(queryString) > 3) {
                    this.$get('/house/search/' ,{
                        action: 'zip', //搜索方法：房源地址/MLS、城市、邮编
                        keyword: queryString, //搜索关键字
                        isOwn: this.filterIsOwnHouse,   //筛选本公司自有房源
                    }).then(res => {
                        //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
                        for (let i of res.rows) {
                            i.value = i.address.split(',')[4] + ' , ' + i.address.split(',')[2];
                        }
                        list = res.rows;
                        callback(list);
                    });
                }
            },
            //选中某一列触发的事件,在这里item为选中字段所在的对象
            handleSelect(item) {
                if (this.searchKeywordType == 'house') {//按地址/MLS搜索——跳转到房源详情页
                    console.log(item)
                } else if (this.searchKeywordType == 'city') {//按城市搜索——刷新下面的房源列表
                    this.action = 'city';//搜索方法：房源地址/MLS、城市、邮编
                    this.searchKeyword = item.value.split(',')[0].trim();//搜索关键字
                    this.getHouseData();
                } else {//按邮编搜索——刷新下面的房源列表
                    this.action = 'zip';//搜索方法：房源地址/MLS、城市、邮编
                    this.searchKeyword = item.value.split(',')[0].trim();//搜索关键字
                    this.getHouseData();
                }
            },
            //查看详情
            goHouseDetails(houseId) {
                this.$router.push({path: "/houseDetails", query: {houseId: houseId}});
            },
            //修改自有房源
            houseEdit(houseId) {
                this.$router.push({path: "/company_uplodeOwnHouse", query: {houseId: houseId}});
            },
            //删除自有房源
            houseDelete(houseId) {
                this.$confirm('是否要删除此自有房源？', '删除自有房源').then(() => {
                    this.$delete('/own/delete/' + houseId).then(res => {
                        const data = res;
                        if (data.status == 0) {
                            this.$message.success('删除成功！');
                            this.getHouseData();
                        } else {
                            this.$message.error(data.msg)
                        }
                    });
                }).catch(() => {
                    this.$message.info('已取消操作.');
                });
            }

        },
        components: {}
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
