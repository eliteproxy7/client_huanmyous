<template>
    <div>
        <el-row style="margin: 30px 0;" :gutter="30">
            <el-col :span="12">
                <el-radio-group v-model="searchKeywordType" :SearchKeywordTypeFN="SearchKeywordTypeFN"
                                @change="searchKeywordTypeChange"
                                style="margin: 0 0 10px 0;">
                    <el-radio label="house">按地址/MLS搜索</el-radio>
                    <el-radio label="city">按城市搜索</el-radio>
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
            <el-col :span="10" style="text-align: left; margin: 25px 0 0 0;">
                <el-button type="primary" @click="dialogHouseFilterVisible = true" icon="iconfont icon-icon"> 精确筛选</el-button>
                <span style="margin: 0 0 0 15px;">为您找到{{total}}套在售房源</span>
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
                    <img v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ scope.row.heroImage" width="150" height="100" />
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
            <el-table-column label="已添加分享组" width="110">
                <template slot-scope="scope">
                    <div v-for="item in scope.row.shareGroupNames">
                        <p>{{item}}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="130">
                <template slot-scope="scope">
                    <el-button
                        size="small"
                        type="success"
                        icon="iconfont icon-chakan"
                        @click="goHouseDetails(scope.row.houseId)"> 查看详情
                    </el-button>
                    <el-button
                        size="small"
                        type="primary"
                        icon="iconfont icon-tianjiazu"
                        @click="openShareGroupDialog(scope.row.houseId)"> 添加分享组
                    </el-button>
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
                   class="el-dialog__wrapper_absolute house-filter-dialog" :append-to-body="true">
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="10">
                    <el-select v-model="type" multiple filterable placeholder="房源类型">
                        <el-option
                            v-for="item in houseTypeItem"
                            :key="item.explain"
                            :label="item.explain"
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

        <el-dialog title="分享组管理" :visible.sync="shareGroup_dialog" width="30%" :append-to-body="true" class="el-dialog__wrapper_absolute">
            <el-form :model="shareGroupForm" label-position="top">
                <el-form-item label="选择分享组">
                    <el-row :gutter="10">
                        <el-col :span="15">
                            <el-select v-model="shareGroupForm.selectedShareGroupId" filterable clearable placeholder="请选择分享组(支持搜索)" @change="shareGroupChange" class="select-shareGroup">
                                <el-option
                                    v-for="item in shareGroupForm.shareGroupItem"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.shareId">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="9">
                            <el-button v-ripple type="primary" icon="iconfont icon-chakan"
                                       :disabled="shareGroupForm.lookDetailsShareGroupBtnDisabled"
                                       :lookDetailsShareGroupComputed="lookDetailsShareGroupComputed"
                                       @click="lookDetailsShareGroupFN" size="medium"> 查看分享组
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="新建分享组">
                    <el-row :gutter="10">
                        <el-col :span="18">
                            <el-input v-model="shareGroupForm.createShareGroupName" placeholder="请输入新分享组的名称"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button v-ripple type="success" icon="iconfont icon-tongyongleifenzugongxiang"
                                       :disabled="shareGroupForm.createShareGroupBtnDisabled"
                                       :createShareGroupComputed="createShareGroupComputed" @click="createShareGroupFN" size="medium"> 创建
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="shareGroup_dialog = false">取 消</el-button>
                <el-button type="primary" @click="addShareGroup">添加至分享组</el-button>
            </span>
        </el-dialog>


        <el-dialog
            title="房源分享组详情"
            :visible.sync="shareGroupForm.shareGroupDetails_dialog"
            width="60%">
            <el-carousel height="460px" :interval="5000" :autoplay="false" indicator-position="outside" type="card" trigger="click">
                <el-carousel-item v-for="(item, index) in shareGroupForm.shareGroupDetailsItem" :key="index"
                                  class="selected-share-group-details-dialog clearfix">
                    <div class="inside" @click="goHouseDetails(item.houseId)">
                        <div class="left">
                            <img v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ item.heroImage">
                            <p>
                                <span>{{isNull0_USD(item.listPrice)}}</span>
                                <span>{{isNull0_RMB(item.listPrice)}}</span>
                            </p>
                        </div>
                        <div class="right">
                            <h2><i></i> {{houseName(item)}}</h2>
                            <div class="info">
                                <div class="address">
                                    <i class="iconfont icon-dingwei"></i>{{item.address}}
                                </div>
                                <p>占地：{{isNull0_sqft(item.livingArea) + '（' + isNull0_sqmt(item.livingArea) +'）'}}</p>
                                <p>
                                    <span class="left">卧室：{{isNull0(item.bedroomCount)}}间</span>
                                    <span class="right">卫浴：{{isNull0(item.bathroomCount)}}间</span>
                                </p>
                                <p>
                                    <span class="left">年份：{{isNull0(item.yearBuilt)}}</span>
                                    <span class="right">状态：<span v-html="house_status(item.listingStatus)"></span></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </el-dialog>




    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                pageNumber: 1,  //默认显示第一页
                pageSize: 10,   //默认每页显示10条
                total: null,    //总条数
                filed: '',      //排序字段
                direction: '',  //排序方向——ASC 升序，DESC 降序
                type: [],       //房屋类型
                beds: '',       //卧室数量
                baths: '',      //卫浴数量
                year: '',       //房龄
                minprice: '',   //最低价格
                maxprice: '',   //最高价格
                minsize: '',    //最小面积
                maxsize: '',    //最大面积
                action: '',     //搜索方法：房源地址/MLS、城市、邮编
                searchKeyword: '',  //搜索框关键字
                searchKeywordType: 'house',//要按什么类型来搜索：房源地址/MLS、城市、邮编
                searchKeywordTypeShow_house: true,//按地址/MLS搜索——判断是否显示对应的搜索框
                searchKeywordTypeShow_city: false,//按城市搜索——判断是否显示对应的搜索框
                searchKeywordTypeShow_zipcode: false,//按邮编搜索——判断是否显示对应的搜索框
                dialogHouseFilterVisible: false, //精确筛选显示隐藏
                houseTypeItem: [],//房源类型数组
                houseListLoading: true, //房源列表table的加载loading

                shareGroup_houseid: '', //添加到分享组要用的房源id
                shareGroup_dialog: false,   //分享组管理的Dialog对话框
                shareGroupForm: {//分享组管理
                    shareGroupItem: [],//分享组列表数组
                    selectedShareGroupId: '',   //选择的分享组的id
                    lookDetailsShareGroupBtnDisabled: true, //查看分享组按钮的状态
                    shareGroupDetailsItem: [],  //分享组详情的房源数据
                    shareGroupDetails_dialog: false,// 分享组详情的Dialog对话框

                    createShareGroupName: '',   //创建新的分享组的名称
                    createShareGroupBtnDisabled: false, //创建分享组按钮的状态

                },

            }
        },
        mounted() {
            // this.getHouseData();
            this.getHouseType();
            this.getShareGroupData();
        },
        computed: {
            //选择搜索模式：房源地址/MLS、城市、邮编
            SearchKeywordTypeFN() {
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
            //判断查看分享组按钮的实时状态
            lookDetailsShareGroupComputed() {
                if (this.shareGroupForm.selectedShareGroupId) {
                    this.shareGroupForm.lookDetailsShareGroupBtnDisabled = false;
                } else {
                    this.shareGroupForm.lookDetailsShareGroupBtnDisabled = true;
                }
            },
            //判断创建分享组的提交按钮的实时状态
            createShareGroupComputed() {
                if (this.shareGroupForm.createShareGroupName) {
                    this.shareGroupForm.createShareGroupBtnDisabled = false;
                } else {
                    this.shareGroupForm.createShareGroupBtnDisabled = true;
                }
            },
        },
        methods: {
            handleSizeChange(val) {//处理pagesize页码大小变动的事件
                this.pageSize = val;
                this.getHouseData();
            },
            handleCurrentChange(val) {//处理currentPage当前页变动的事件
                this.pageNumber = val;
                this.getHouseData();
            },
            getHouseData() {//获取房源列表
                // 计算选择的房龄
                let houseAge;
                if (isNaN(this.year) || !this.year) {
                    houseAge = '';
                } else {
                    houseAge = new Date().getFullYear() - parseInt(this.year);
                }
                let min_size = Math.round(parseInt(this.minsize * 10.7639104)); //计算选择的最小面积
                let max_size = Math.round(parseInt(this.maxsize * 10.7639104)); //计算选择的最大面积
                this.$get('/house/search', {
                    page: this.pageNumber,
                    pageSize: this.pageSize,
                    action: this.action,//搜索方法：房源地址/MLS、城市、邮编
                    keyword: this.searchKeyword,//搜索关键字
                    filed: this.filed,//排序字段
                    direction: this.direction,//排序方向——ASC 升序，DESC 降序
                    type: this.type.toString(),//房屋类型
                    beds: this.beds,//卧室数量
                    baths: this.baths,//卫浴数量
                    year: houseAge,//房龄
                    minprice: this.minprice ? this.minprice : '',   //最低价格
                    maxprice: this.maxprice ? this.maxprice : '',   //最高价格
                    minsize: min_size ? min_size : '',   //最小面积
                    maxsize: max_size ? max_size : '',   //最大面积
                    isShowShareGroup: true,//是否过滤临时分享房源
                }).then(res => {
                    const data = res;
                    this.tableData = data.rows;
                    this.total = data.total;
                    this.houseListLoading = false;
                });
            },
            getHouseType() {// 获取房源类型数组，遍历到select
                this.$get('/own/property/subtype').then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.houseTypeItem = data.data;
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

            FindHouse() {//开始选房
                this.dialogHouseFilterVisible = false;
                this.getHouseData();
            },
            resetFilterOptions() {//重置选项
                this.dialogHouseFilterVisible = false;
                this.type = [];      //清空已选择的房源类型
                this.beds = '';     //清空已选择的卧室数量
                this.baths = '';    //清空已选择的卫浴数量
                this.year = '';       //清空已选择的房龄
                this.minprice = '';  //清空已选择的最低价格
                this.maxprice = '';  //清空已选择的最高价格
                this.minsize = '';   //清空已选择的最小面积
                this.maxsize = '';   //清空已选择的最大面积
                this.action = '';   //搜索方法：房源地址/MLS、城市、邮编
                this.searchKeyword = '';    //搜索关键字
                this.getHouseData();
            },
            //搜索模式radio切换的时候清空搜索关键字
            searchKeywordTypeChange() {
                this.searchKeyword = '';
            },
            //搜索房源功能——按地址/MLS搜索
            querySearchAsync_houses(queryString, callback) {
                //queryString 为在框中输入的值，callback 回调函数,将处理好的数据推回
                let list = [{}];
                if (this.getByteLen(queryString) > 3) {
                    this.$get('/house/associate/address/'+ queryString).then(res => {
                        //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
                        if(res.data.length > 0){
                            for (let i of res.data) {
                                i.value = i.address;
                            }
                            list = res.data;
                        }else{
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
                    this.$get('/house/associate/city/'+ queryString).then(res => {
                        //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
                        if(res.data.length > 0){
                            for (let i of res.data) {
                                i.value = i.city + ' , ' + i.state;
                            }
                            list = res.data;
                        }else{
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
                    this.$get('/house/associate/zip/'+ queryString).then(res => {
                        //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
                        if(res.data.length > 0){
                            for (let i of res.data) {
                                i.value = i.zip + ' , ' + i.city;
                            }
                            list = res.data;
                        }else{
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
                this.filed = column.prop;//排序字段
                //判断要排序的字段是否是年龄
                this.direction = column.order == 'ascending' ? 'asc' : 'desc';//排序方向——ASC 升序，DESC 降序
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
                // window.open(routeData.href, '_blank');
                this.$router.push({path: "/houseDetails", query: {houseId: houseId}});
            },
            //打开分享组管理dialog
            openShareGroupDialog(houseId) {
                this.shareGroup_houseid = houseId;//添加到分享组要用的房源id
                this.shareGroup_dialog = true;//显示分享组管理dialog
            },
            //获取分享组列表
            getShareGroupData() {
                this.$get('/sharegroup/list').then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.shareGroupForm.shareGroupItem = data.rows; //分享组列表数组
                    }
                });
            },
            //选择分享组事件
            shareGroupChange(value) {
                console.log(value)
            },
            //点击查看分享组详情
            lookDetailsShareGroupFN() {
                this.shareGroupForm.shareGroupDetails_dialog = true;
                this.$get('/sharegroup/house/list?shareId=' + this.shareGroupForm.selectedShareGroupId).then(res => {
                    if (res.status == 0) {
                        this.shareGroupForm.shareGroupDetailsItem = res.data; //分享组详情的房源数据
                    }
                });
            },
            //创建分享组
            createShareGroupFN(){
                this.$confirm('是否要创建此分享组？', '创建分享组').then(() => {
                    this.$post('/sharegroup/create?shareGroupName=' + this.shareGroupForm.createShareGroupName).then(res => {
                        const data = res;
                        if (data.status == 0) {
                            this.$post('/sharegroup/add/' + data.data.shareId +'/'+ this.shareGroup_houseid).then(res => {
                                const data = res;
                                if (data.status == 0) {
                                    this.$message.success('成功创建分享组，已自动为您把此房源添加到新创建的分享组！');
                                    this.shareGroup_dialog = false;//显示分享组管理dialog
                                    this.getShareGroupData();
                                    this.getHouseData();
                                } else {
                                    this.$message.error(data.msg)
                                }
                            });
                        } else {
                            this.$message.error(data.msg)
                        }
                    });
                }).catch(() => {
                    this.$message.info('已取消操作.');
                });
            },
            // 添加至分享组
            addShareGroup() {
                this.$post('/sharegroup/add/' + this.shareGroupForm.selectedShareGroupId +'/'+ this.shareGroup_houseid).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.$message.success('添加分享组成功！');
                        this.shareGroup_dialog = false;//显示分享组管理dialog
                        this.getHouseData();
                    } else {
                        this.$message.error(data.msg)
                    }
                });
            },


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
        .select-shareGroup {
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

        .selected-share-group-details-dialog {
            overflow: initial;
            .inside {
                overflow: hidden;
                border-radius: 7px;
                box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                -moz-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                -ms-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                -o-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                > .left,
                > .right {
                    width: 100%;
                    float: none;
                }
                > .left {
                    cursor: pointer;
                    text-align: center;
                    position: relative;
                    border-top-left-radius: 7px;
                    border-top-right-radius: 7px;
                    overflow: hidden;
                    > img {
                        width: 100%;
                        height: 270px;
                        z-index: 1;
                        -webkit-transition: 1.5s ease;
                        -moz-transition: 1.5s ease;
                        -ms-transition: 1.5s ease;
                        -o-transition: 1.5s ease;
                        transition: 1.5s ease;
                    }
                    > p {
                        position: absolute;
                        left: 10px;
                        bottom: 10px;
                        z-index: 5;
                        font-size: 26px;
                        color: #89d3d9;
                        text-align: left;
                        > span {
                            display: block;
                        }
                        > span:last-of-type {
                            font-size: 23px;
                        }
                    }
                }
                > .right {
                    padding: 10px 10px 20px 0;
                    background: #fff;
                    border-bottom-left-radius: 7px;
                    border-bottom-right-radius: 7px;
                    > h2 {
                        display: block;
                        width: 100%;
                        line-height: 26px;
                        font-size: 19px;
                        color: #333;
                        font-weight: bold;
                        text-indent: 18px;
                        cursor: pointer;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -o-text-overflow: ellipsis;
                        -webkit-text-overflow: ellipsis;
                        -moz-text-overflow: ellipsis;
                        white-space: nowrap;
                        > i {
                            float: left;
                            width: 5px;
                            height: 26px;
                            margin: 2px 0 0 0;
                            background: #00aeef;
                        }
                    }
                    > .info {
                        padding: 10px 0 0 20px;
                        > .address {
                            height: 35px;
                            line-height: 35px;
                            font-size: 15px;
                            color: #000;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -o-text-overflow: ellipsis;
                            -webkit-text-overflow: ellipsis;
                            -moz-text-overflow: ellipsis;
                            white-space: nowrap;
                            > i {
                                font-size: 25px;
                                color: #2fa3f6;
                                float: left;
                            }
                        }
                        > p {
                            height: 14px;
                            line-height: 14px;
                            margin: 14px 0 0 0;
                            overflow: hidden;
                            font-size: 14px;
                            color: #000;
                            > span {
                                width: 50%;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
