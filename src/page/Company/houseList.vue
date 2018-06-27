<template>
    <div>
        <h4>房源列表</h4>
        <el-row style="margin: 30px 0;" :gutter="30">
            <el-col :span="10">
                <el-radio-group v-model="searchKeywordType" :SearchKeywordTypeFN="SearchKeywordTypeFN"
                                @change="searchKeywordTypeChange"
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
                        <p>{{scope.item.address}}</p>
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
                        <p>{{scope.item.city +' , '+ scope.item.state}}</p>
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
                        <p>{{scope.item.zip +' , '+ scope.item.city}}</p>
                        <el-tag size="mini" color="#9c27b0">邮编</el-tag>
                    </template>
                </el-autocomplete>
            </el-col>
            <el-col :span="14" style="text-align: left; margin: 25px 0 0 0;">
                <el-button type="primary" @click="dialogHouseFilterVisible = true" icon="iconfont icon-icon"> 精确筛选</el-button>
                <el-switch
                    v-ripple
                    v-model="filterIsOwnHouse"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="本公司自有房源"
                    @change="filterIsOwnHouseChange"
                    style="margin: 0 15px">
                </el-switch>
                <span>为您找到{{total}}套在售房源</span>
            </el-col>
        </el-row>

        <el-table
            :data="tableData"
            stripe
            border
            highlight-current-row
            v-loading="houseListLoading"
            element-loading-text="拼命加载中..."
            style="width: 100%"
            @sort-change="sortChange"
            :default-sort="{prop: 'yearBuilt', order: 'descending'}">
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
            <el-table-column label="经纪公司" width="150">
                <template slot-scope="scope">
                    <div v-html="BrokerCompany(scope.row.providerUrl, scope.row.providerName)"></div>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="140">
                <template slot-scope="scope">
                    <div v-if="recommendHouseIdArr.indexOf(scope.row.houseId) != -1">
                        <el-button size="small" type="success" icon="iconfont icon-chakan"
                                   @click="goHouseDetails(scope.row.houseId)"> 查看详情
                        </el-button>
                        <el-button size="small" type="primary" plain icon="iconfont icon-renzhengtongguo"> 已添加推荐组
                        </el-button>
                    </div>
                    <div v-else>
                        <el-button size="small" type="success" icon="iconfont icon-chakan"
                                   @click="goHouseDetails(scope.row.houseId)"> 查看详情
                        </el-button>
                        <el-button size="small" type="primary" icon="iconfont icon-tianjiazu"
                                   @click="addRecommendHouse(scope.row.houseId)">
                            添加推荐组
                        </el-button>
                    </div>
                </template>
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

        <el-dialog title="房源筛选条件" :visible.sync="dialogHouseFilterVisible" center width="40%"
                   class="el-dialog__wrapper_absolute house-filter-dialog" :append-to-body="false">
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="10">
                    <el-select v-model="type" multiple filterable placeholder="房源类型">
                        <el-option v-for="item in houseTypeItem" :key="item.explain" :label="item.explain"
                                   :value="item.name">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="10">
                    <el-select v-model="beds" filterable clearable placeholder="卧室数量">
                        <el-option label="1+" value="1"></el-option>
                        <el-option label="2+" value="2"></el-option>
                        <el-option label="3+" value="3"></el-option>
                        <el-option label="4+" value="4"></el-option>
                        <el-option label="5+" value="5"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="10">
                    <el-select v-model="baths" filterable clearable placeholder="卫浴数量">
                        <el-option label="1+" value="1"></el-option>
                        <el-option label="2+" value="2"></el-option>
                        <el-option label="3+" value="3"></el-option>
                        <el-option label="4+" value="4"></el-option>
                        <el-option label="5+" value="5"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="10">
                    <el-select v-model="year" filterable clearable placeholder="房龄">
                        <el-option label="5年内" value="5"></el-option>
                        <el-option label="10年内" value="10"></el-option>
                        <el-option label="20年内" value="20"></el-option>
                        <el-option label="30年内" value="30"></el-option>
                        <el-option label="40年内" value="40"></el-option>
                        <el-option label="50年内" value="50"></el-option>
                        <el-option label="60年内" value="60"></el-option>
                        <el-option label="70年内" value="70"></el-option>
                        <el-option label="80年内" value="80"></el-option>
                        <el-option label="90年内" value="90"></el-option>
                        <el-option label="100年内" value="100"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="10">
                    <el-select v-model="minprice" filterable clearable placeholder="最低价格">
                        <el-option label="20万美元" value="200000"></el-option>
                        <el-option label="30万美元" value="300000"></el-option>
                        <el-option label="40万美元" value="400000"></el-option>
                        <el-option label="50万美元" value="500000"></el-option>
                        <el-option label="60万美元" value="600000"></el-option>
                        <el-option label="70万美元" value="700000"></el-option>
                        <el-option label="80万美元" value="800000"></el-option>
                        <el-option label="90万美元" value="900000"></el-option>
                        <el-option label="100万美元" value="1000000"></el-option>
                        <el-option label="150万美元" value="1500000"></el-option>
                        <el-option label="200万美元" value="2000000"></el-option>
                        <el-option label="250万美元" value="2500000"></el-option>
                        <el-option label="300万美元" value="3000000"></el-option>
                        <el-option label="350万美元" value="3500000"></el-option>
                        <el-option label="400万美元" value="4000000"></el-option>
                        <el-option label="450万美元" value="4500000"></el-option>
                        <el-option label="500万美元" value="5000000"></el-option>
                        <el-option label="600万美元" value="6000000"></el-option>
                        <el-option label="700万美元" value="7000000"></el-option>
                        <el-option label="800万美元" value="8000000"></el-option>
                        <el-option label="900万美元" value="9000000"></el-option>
                        <el-option label="1000万美元" value="10000000"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="10">
                    <el-select v-model="maxprice" filterable clearable placeholder="最高价格">
                        <el-option label="20万美元" value="200000"></el-option>
                        <el-option label="30万美元" value="300000"></el-option>
                        <el-option label="40万美元" value="400000"></el-option>
                        <el-option label="50万美元" value="500000"></el-option>
                        <el-option label="60万美元" value="600000"></el-option>
                        <el-option label="70万美元" value="700000"></el-option>
                        <el-option label="80万美元" value="800000"></el-option>
                        <el-option label="90万美元" value="900000"></el-option>
                        <el-option label="100万美元" value="1000000"></el-option>
                        <el-option label="150万美元" value="1500000"></el-option>
                        <el-option label="200万美元" value="2000000"></el-option>
                        <el-option label="250万美元" value="2500000"></el-option>
                        <el-option label="300万美元" value="3000000"></el-option>
                        <el-option label="350万美元" value="3500000"></el-option>
                        <el-option label="400万美元" value="4000000"></el-option>
                        <el-option label="450万美元" value="4500000"></el-option>
                        <el-option label="500万美元" value="5000000"></el-option>
                        <el-option label="600万美元" value="6000000"></el-option>
                        <el-option label="700万美元" value="7000000"></el-option>
                        <el-option label="800万美元" value="8000000"></el-option>
                        <el-option label="900万美元" value="9000000"></el-option>
                        <el-option label="1000万美元" value="10000000"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="10">
                    <el-select v-model="minsize" filterable clearable placeholder="最小面积">
                        <el-option label="50平米" value="50"></el-option>
                        <el-option label="100平米" value="100"></el-option>
                        <el-option label="150平米" value="150"></el-option>
                        <el-option label="200平米" value="200"></el-option>
                        <el-option label="250平米" value="250"></el-option>
                        <el-option label="300平米" value="300"></el-option>
                        <el-option label="350平米" value="350"></el-option>
                        <el-option label="400平米" value="400"></el-option>
                        <el-option label="450平米" value="450"></el-option>
                        <el-option label="500平米" value="500"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="10">
                    <el-select v-model="maxsize" filterable clearable placeholder="最大面积">
                        <el-option label="50平米" value="50"></el-option>
                        <el-option label="100平米" value="100"></el-option>
                        <el-option label="150平米" value="150"></el-option>
                        <el-option label="200平米" value="200"></el-option>
                        <el-option label="250平米" value="250"></el-option>
                        <el-option label="300平米" value="300"></el-option>
                        <el-option label="350平米" value="350"></el-option>
                        <el-option label="400平米" value="400"></el-option>
                        <el-option label="450平米" value="450"></el-option>
                        <el-option label="500平米" value="500"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button type="warning" icon="iconfont icon-zhongzhi" @click="resetFilterOptions"
                           style="margin: 0 15px"> 重置选项
                </el-button>
                <el-button type="primary" icon="iconfont icon-icon" @click="FindHouse" style="margin: 0 15px"> 开始选房
                </el-button>
            </div>
        </el-dialog>

        <h4>主页推荐房源组列表</h4>

        <aside style="margin: 15px 0">
            <span style="margin: 0 15px 0 0">已设置：{{recommendHouseTotal}}套推荐房源</span>
            <el-button type="danger" size="small" icon="iconfont icon-whole_delete" @click="deleteAllRecommendHouse"> 全部删除
            </el-button>
        </aside>

        <el-table
            :data="recommendHouseTableData"
            stripe
            border
            highlight-current-row
            v-loading="recommendHouseListLoading"
            element-loading-text="拼命加载中..."
            style="width: 100%"
            :default-sort="{prop: 'yearBuilt', order: 'descending'}">
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
            <el-table-column property="listPrice" label="价格" width="110">
                <template slot-scope="scope">
                    <p>{{isNull0_USD(scope.row.listPrice)}}</p>
                    <p>{{isNull0_RMB(scope.row.listPrice)}}</p>
                </template>
            </el-table-column>
            <el-table-column property="livingArea" label="面积" width="120">
                <template slot-scope="scope">
                    <p>{{isNull0_sqft(scope.row.livingArea)}}</p>
                    <p>{{isNull0_sqmt(scope.row.livingArea)}}</p>
                </template>
            </el-table-column>
            <el-table-column
                property="bedroomCount"
                label="卧室 (间)"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="bathroomCount"
                label="卫浴 (间)"
                :formatter="columnIsNull0">
            </el-table-column>
            <el-table-column
                property="yearBuilt"
                label="年份"
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
            <el-table-column label="经纪公司" width="150">
                <template slot-scope="scope">
                    <div v-html="BrokerCompany(scope.row.providerUrl, scope.row.providerName)"></div>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="140">
                <template slot-scope="scope">
                    <el-button size="small" type="success" icon="iconfont icon-chakan"
                               @click="goHouseDetails(scope.row.houseId)"> 查看详情
                    </el-button>
                    <el-button size="small" type="warning" icon="iconfont icon-tianjiazu"
                               @click="deteleRecommendHouseGroup(scope.row.houseId)"> 删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                pageNumber: 1, //默认显示第一页
                pageSize: 10, //默认每页显示10条
                total: null, //总条数
                filed: '', //排序字段
                direction: '', //排序方向——ASC 升序，DESC 降序
                type: [], //房屋类型
                beds: '', //卧室数量
                baths: '', //卫浴数量
                year: '', //房龄
                minprice: '', //最低价格
                maxprice: '', //最高价格
                minsize: '', //最小面积
                maxsize: '', //最大面积
                action: '', //搜索方法：房源地址/MLS、城市、邮编
                searchKeyword: '', //搜索框关键字
                searchKeywordType: 'house', //要按什么类型来搜索：房源地址/MLS、城市、邮编
                searchKeywordTypeShow_house: true, //按地址/MLS搜索——判断是否显示对应的搜索框
                searchKeywordTypeShow_city: false, //按城市搜索——判断是否显示对应的搜索框
                searchKeywordTypeShow_zipcode: false, //按邮编搜索——判断是否显示对应的搜索框
                dialogHouseFilterVisible: false, //精确筛选显示隐藏
                houseTypeItem: [], //房源类型数组
                houseListLoading: true, //房源列表table的加载loading
                filterIsOwnHouse: false, //是否筛选本公司自有房源

                recommendHouseTableData: [], //公司推荐房源列表
                recommendHouseTotal: 0, //公司推荐房源总数
                recommendHouseListLoading: true, //房源列表table的加载loading
                recommendHouseIdArr: [] //保存房源推荐组每个房源的id
            }
        },
        mounted() {
            // this.getHouseData();
            this.getHouseType(); //获取房源类型
            this.getRecommendHouseData(); //获取公司推荐房源列表
        },
        computed: {
            SearchKeywordTypeFN() {
                //判断选择普通营业执照or多证合一营业执照
                if (this.searchKeywordType == 'house') {
                    //按地址/MLS搜索
                    this.searchKeywordTypeShow_house = true;
                    this.searchKeywordTypeShow_city = false;
                    this.searchKeywordTypeShow_zipcode = false;
                } else if (this.searchKeywordType == 'city') {
                    //按城市搜索
                    this.searchKeywordTypeShow_house = false;
                    this.searchKeywordTypeShow_city = true;
                    this.searchKeywordTypeShow_zipcode = false;
                } else {
                    //按邮编搜索
                    this.searchKeywordTypeShow_house = false;
                    this.searchKeywordTypeShow_city = false;
                    this.searchKeywordTypeShow_zipcode = true;
                }
            }
        },
        methods: {
            //处理pagesize页码大小变动的事件
            handleSizeChange(val) {
                this.pageSize = val;
                this.getHouseData()
            },
            //处理currentPage当前页变动的事件
            handleCurrentChange(val) {
                this.pageNumber = val;
                this.getHouseData()
            },
            //获取房源列表
            getHouseData() {
                // 计算选择的房龄
                let houseAge;
                if (isNaN(this.year) || !this.year) {
                    houseAge = ''
                } else {
                    houseAge = new Date().getFullYear() - parseInt(this.year)
                }
                let min_size = Math.round(parseInt(this.minsize * 10.7639104)) //计算选择的最小面积
                let max_size = Math.round(parseInt(this.maxsize * 10.7639104)) //计算选择的最大面积
                this.$get('/house/search', {
                    page: this.pageNumber,
                    pageSize: this.pageSize,
                    action: this.action, //搜索方法：房源地址/MLS、城市、邮编
                    keyword: this.searchKeyword, //搜索关键字
                    filed: this.filed, //排序字段
                    direction: this.direction, //排序方向——ASC 升序，DESC 降序
                    type: this.type.toString(), //房屋类型
                    beds: this.beds, //卧室数量
                    baths: this.baths, //卫浴数量
                    year: houseAge, //房龄
                    minprice: this.minprice ? this.minprice : '', //最低价格
                    maxprice: this.maxprice ? this.maxprice : '', //最高价格
                    minsize: min_size ? min_size : '', //最小面积
                    maxsize: max_size ? max_size : '', //最大面积
                    isOwn: this.filterIsOwnHouse,   //筛选本公司自有房源
                }).then(res => {
                    const data = res;
                    this.tableData = data.rows;
                    this.total = data.total;
                    this.houseListLoading = false;
                })
            },
            // 获取房源类型数组，遍历到select
            getHouseType() {
                this.$get('/own/property/subtype').then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.houseTypeItem = data.data
                    }
                })
            },
            //格式化判断是否为空，0或null
            columnIsNull0(row, column, cellValue) {
                return this.isNull0(cellValue)
            },
            //格式化时间戳
            columnDate(row, column, cellValue, index) {
                return this.momentFormat(cellValue, 'YYYY-MM-DD')
            },
            //开始选房
            FindHouse() {
                this.dialogHouseFilterVisible = false;
                this.getHouseData()
            },
            //重置选项
            resetFilterOptions() {
                this.dialogHouseFilterVisible = false;
                this.type = []; //清空已选择的房源类型
                this.beds = ''; //清空已选择的卧室数量
                this.baths = '';    //清空已选择的卫浴数量
                this.year = ''; //清空已选择的房龄
                this.minprice = ''; //清空已选择的最低价格
                this.maxprice = ''; //清空已选择的最高价格
                this.minsize = '';  //清空已选择的最小面积
                this.maxsize = '';  //清空已选择的最大面积
                this.action = '';   //搜索方法：房源地址/MLS、城市、邮编
                this.searchKeyword = '';    //搜索关键字
                this.getHouseData();
            },
            //搜索模式radio切换的时候清空搜索关键字
            searchKeywordTypeChange() {
                this.searchKeyword = ''
            },
            //搜索房源功能——按地址/MLS搜索
            querySearchAsync_houses(queryString, callback) {
                //queryString 为在框中输入的值，callback 回调函数,将处理好的数据推回
                let list = [{}];
                if (this.getByteLen(queryString) > 3) {
                    this.$get('/house/associate/address/' + queryString).then(res => {
                        //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
                        if (res.data.length > 0) {
                            for (let i of res.data) {
                                i.value = i.address;
                            }
                            list = res.data;
                        } else {
                            list = [];
                            this.$message.error('暂无数据！')
                        }
                        callback(list);
                    });
                }
            },
            //搜索房源功能——按城市搜索
            querySearchAsync_citys(queryString, callback) {
                //queryString 为在框中输入的值，callback 回调函数,将处理好的数据推回
                let list = [{}];
                if (this.getByteLen(queryString) > 3) {
                    this.$get('/house/associate/city/' + queryString).then(res => {
                        //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
                        if (res.data.length > 0) {
                            for (let i of res.data) {
                                i.value = i.city + ' , ' + i.state;
                            }
                            list = res.data;
                        } else {
                            list = [];
                            this.$message.error('暂无数据！')
                        }
                        callback(list);
                    });
                }
            },
            //搜索房源功能——按邮编搜索
            querySearchAsync_zipcodes(queryString, callback) {
                //queryString 为在框中输入的值，callback 回调函数,将处理好的数据推回
                let list = [{}];
                if (this.getByteLen(queryString) > 3) {
                    this.$get('/house/associate/zip/' + queryString).then(res => {
                        //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
                        if (res.data.length > 0) {
                            for (let i of res.data) {
                                i.value = i.zip + ' , ' + i.city;
                            }
                            list = res.data;
                        } else {
                            list = [];
                            this.$message.error('暂无数据！')
                        }
                        callback(list);
                    });
                }
            },
            //搜索结果选中某一列触发的事件,在这里item为选中字段所在的对象
            handleSelect(item) {
                if (this.searchKeywordType == 'house') {//按地址/MLS搜索——跳转到房源详情页
                    // console.log(item)
                    // let routeData = this.$router.resolve({
                    //     path: '/houseDetails',
                    //     query: {
                    //         houseId: item.houseId
                    //     }
                    // });
                    // window.open(routeData.href, '_blank');
                    this.$router.push({path: "/houseDetails", query: {houseId: item.houseId}});
                } else if (this.searchKeywordType == 'city') {//按城市搜索——刷新下面的房源列表
                    this.action = 'city';//搜索方法：房源地址/MLS、城市、邮编
                    this.searchKeyword = item.city;//搜索关键字
                    this.getHouseData();
                } else {//按邮编搜索——刷新下面的房源列表
                    this.action = 'zip';//搜索方法：房源地址/MLS、城市、邮编
                    this.searchKeyword = item.zip;//搜索关键字
                    this.getHouseData();
                }
            },
            //排序的回调
            sortChange(column, prop, order) {
                // console.log(column, prop, order)
                this.filed = column.prop; //排序字段
                //判断要排序的字段是否是年龄
                this.direction = column.order == 'ascending' ? 'asc' : 'desc'; //排序方向——ASC 升序，DESC 降序
                this.getHouseData()
            },
            //筛选本公司自有房源
            filterIsOwnHouseChange(value) {
                this.getHouseData();
            },
            //跳转到房源详情页
            goHouseDetails(houseId) {
                // let routeData = this.$router.resolve({
                //     path: '/houseDetails',
                //     query: {
                //         houseId: houseId
                //     }
                // });
                // window.open(routeData.href, '_blank')
                this.$router.push({path: "/houseDetails", query: {houseId: houseId}});
            },
            //获取公司推荐房源列表
            getRecommendHouseData() {
                this.$get('/recommend/house/list').then(res => {
                    const data = res;
                    this.recommendHouseTableData = data.data;
                    this.recommendHouseTotal = data.data.length;
                    this.recommendHouseListLoading = false;

                    // 房源推荐组每个房源的id数组
                    this.recommendHouseIdArr = data.data.map(function (obj) {
                        let newArr = {};
                        newArr = obj.houseId;
                        return newArr
                    })
                })
            },
            // 添加至公司推荐房源组
            addRecommendHouse(houseId) {
                this.$post('/recommend/house/create?houseId=' + houseId).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.$message.success('添加公司房源推荐组成功！');
                        this.houseListLoading = true; //房源列表table的加载loading
                        this.recommendHouseListLoading = true; //推荐房源列表table的加载loading
                        this.getHouseData();
                        this.getRecommendHouseData();
                        this.recommendHouseIdArr.push(parseInt(houseId)) //此推荐房源添加到房源推荐组每个房源的id数组
                    } else {
                        this.$message.error(data.msg)
                    }
                })
            },
            //全部删除公司推荐房源
            deleteAllRecommendHouse() {
                this.$confirm('是否要全部删除公司推荐房源？', '全部删除公司推荐房源').then(() => {
                    this.$delete('/recommend/house/delete/all').then(res => {
                        const data = res;
                        if (data.status == 0) {
                            this.$message.success('删除成功！');
                            this.houseListLoading = true; //房源列表table的加载loading
                            this.recommendHouseListLoading = true; //推荐房源列表table的加载loading
                            this.getHouseData();
                            this.getRecommendHouseData();
                            this.recommendHouseIdArr = []; //清空——房源推荐组每个房源的id
                        } else {
                            this.$message.error(data.msg)
                        }
                    })
                }).catch(() => {
                    this.$message.info('已取消操作。')
                })
            },
            //单个删除公司推荐房源
            deteleRecommendHouseGroup(houseId) {
                this.$confirm('是否要删除此推荐房源？', '删除推荐房源').then(() => {
                    this.$delete('/recommend/house/delete?houseId=' + houseId).then(res => {
                        const data = res;
                        if (data.status == 0) {
                            this.$message.success('删除成功！');
                            this.houseListLoading = true; //房源列表table的加载loading
                            this.recommendHouseListLoading = true; //推荐房源列表table的加载loading
                            this.getHouseData();
                            this.getRecommendHouseData();
                            this.removeByValue(parseInt(houseId), this.recommendHouseIdArr) //从房源推荐组每个房源的id——数组中删除此推荐房源
                        } else {
                            this.$message.error(data.msg)
                        }
                    })
                }).catch(() => {
                    this.$message.info('已取消操作。')
                })
            }
        },
        components: {}
    }
</script>

<style scoped lang="less" type="text/less">
    body {
        h4 {
            text-align: center;
            margin: 30px 0;
        }
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
