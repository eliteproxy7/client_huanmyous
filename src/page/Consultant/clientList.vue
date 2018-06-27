<template>
    <div class="client-list">
        <el-row class="client-list-toolbar" style="text-align: center; vertical-align: middle; margin: 30px 0;"
                :gutter="30">
            <el-col :span="9">
                <span style="margin: 0 15px 0 0 ;">为您找到{{total}}位客户</span>
                <el-select v-model="tabsForm.selectedTagsFilter" filterable clearable placeholder="按标签筛选"
                           @change="TagsFilterChange">
                    <el-option
                        v-for="item in tabsForm.tagsFilterItem"
                        :key="item.tag.split('/')[0]"
                        :label="item.tag.split('/')[0]"
                        :value="item.tagId">
                        <el-tag size="mini" :style="{ backgroundColor: '#'+ item.tag.split('/')[1]}">{{
                            item.tag.split('/')[0]}}
                        </el-tag>
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="5">
                <el-button v-ripple type="primary" icon="iconfont icon-daochuexcel-copy" @click="exportAllClient">
                    导出全部客户Excel
                </el-button>
            </el-col>
            <el-col :span="7">
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
            <el-table-column label="操作" width="130">
                <template slot-scope="scope">
                    <el-button
                        v-ripple
                        size="small"
                        type="success"
                        icon="iconfont icon-xiugai"
                        @click="clientEdit(scope.row.clientId)"> 修改
                    </el-button>
                    <el-button
                        v-ripple
                        size="small"
                        type="primary"
                        icon="iconfont icon-biaoqian"
                        @click="tag_management(scope.row.clientId)"> 标签管理
                    </el-button>
                    <el-button
                        v-ripple
                        size="small"
                        type="danger"
                        icon="iconfont icon-whole_delete"
                        @click="clientDelete(scope.row.clientId)"> 删除
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
            title="导出全部客户Excel"
            :visible.sync="exportAllClientDialog"
            width="30%">
            <span>点击确定则导出您名下的所有客户信息Excel（链接有效期30分钟）！</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="exportAllClientDialog = false">取 消</el-button>
                <el-button type="primary" @click="exportAllClientDialog = false" class="exportAllClientDownload-button">
                    <a :href="exportAllClientDownloadHref" download="顾问所有客户信息导出列表.xlsx">下 载</a>
                </el-button>
            </span>
        </el-dialog>

        <el-dialog title="标签管理" :visible.sync="tabs_dialog" width="30%" class="el-dialog__wrapper_absolute"
                   :append-to-body="true">
            <el-form :model="tabsForm" label-position="top">
                <el-form-item label="选择/打标签">
                    <el-select v-model="tabsForm.selectedTagId" multiple filterable placeholder="请选择标签(支持搜索)"
                               @change="tagChange" @remove-tag="removeTag" class="select-tags">
                        <el-option
                            v-for="item in tabsForm.tagItem"
                            :key="item.tag.split('/')[0]"
                            :label="item.tag.split('/')[0]"
                            :value="item.tagId"
                            :disabled="item.disabled">
                            <el-tag size="mini" :style="{ backgroundColor: '#'+ item.tag.split('/')[1]}">{{
                                item.tag.split('/')[0]}}
                            </el-tag>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="创建新标签（标签上限为10个）">
                    <el-row :gutter="10">
                        <el-col>
                            <el-popover
                                ref="popover1"
                                placement="top-start"
                                title="点击更换标签背景色"
                                trigger="hover">
                            </el-popover>
                            <span class="createTagsSelectBgColor" v-show="!tabsForm.createTagsBtnDisabled"
                                  :style="{backgroundColor: '#'+ tabsForm.createTagsBgColor}"
                                  @click="createTagsBgColorFN">{{tabsForm.createTags}}</span>
                        </el-col>

                        <el-col :span="18">
                            <el-input v-model="tabsForm.createTags" placeholder="请输入新标签的名称"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-button v-ripple type="primary" icon="iconfont icon-tianjia"
                                       :disabled="tabsForm.createTagsBtnDisabled"
                                       :createTagsComputed="createTagsComputed" @click="createTagsFN" size="medium"> 创建
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="删除标签">
                    <el-row :gutter="10">
                        <el-col :span="18">
                            <el-select v-model="tabsForm.deleteTagId" filterable clearable placeholder="请选择标签(支持搜索)"
                                       class="select-tags">
                                <el-option
                                    v-for="item in tabsForm.tagItem"
                                    :key="item.tag.split('/')[0]"
                                    :label="item.tag.split('/')[0]"
                                    :value="item.tagId">
                                    <el-tag size="mini" :style="{ backgroundColor: '#'+ item.tag.split('/')[1]}">{{
                                        item.tag.split('/')[0]}}
                                    </el-tag>
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-button v-ripple type="danger" icon="iconfont icon-tianjia"
                                       :disabled="tabsForm.deleteTagsBtnDisabled"
                                       :deleteTagsComputed="deleteTagsComputed" @click="deleteTagsFN" size="medium"> 删除
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>
<script>
    let removeTagId;

    export default {
        data() {
            return {
                tableData: [],
                pageNumber: 1,//默认显示第一页
                pageSize: 10,//默认每页显示10条
                total: null,//总条数
                NamePhoneSearchKeyword: '',//按名字或手机号搜索客户的关键字
                tagId: '',//按标签筛选客户——标签的id
                shareGroupUUID: '',//按分享组筛选客户——分享组的uuid
                sortField: '',//排序字段
                direction: '',//排序方向——ASC 升序，DESC 降序
                tabs_dialog: false,// 标签管理的Dialog对话框
                tabsForm: {//标签管理
                    tagItem: [],//标签列表数组
                    selectedTagId: [],//选择的打标签的id
                    addTag: '',//新建标签
                    addTagBgColor: '',//新建标签的背景色
                    thisClientId: '',       //提交打标签时要用的客户id
                    tagsFilterItem: [],     //按标签筛选的数组
                    selectedTagsFilter: '', //按标签筛选——已选择的标签
                    createTags: '',     //创建新标签的值
                    createTagsBtnDisabled: true,    //创建新标签的提交按钮的状态
                    createTagsBgColor: '409eff',    //新标签的背景色，初始设为蓝色，不设的话为空会是透明色
                    deleteTagId: '',    //要删除的标签的id
                    deleteTagsBtnDisabled: true,    //删除标签的提交按钮的状态
                },

                exportAllClientDialog: false,//导出全部客户Excel的Dialog对话框
                exportAllClientDownloadHref: '',//导出全部客户Excel的下载按钮的href
                clientListLoading: true,//客户列表的加载动画

            }
        },
        mounted() {
            // this.getClientData();//获取客户列表
            this.getTagData();//获取已创建的标签列表
        },
        computed: {
            createTagsComputed() {//判断创建新标签的提交按钮的实时状态
                if (this.tabsForm.createTags) {
                    this.tabsForm.createTagsBtnDisabled = false;
                } else {
                    this.tabsForm.createTagsBtnDisabled = true;
                }
            },
            deleteTagsComputed() {//判断删除标签的提交按钮的实时状态
                if (this.tabsForm.deleteTagId) {
                    this.tabsForm.deleteTagsBtnDisabled = false;
                } else {
                    this.tabsForm.deleteTagsBtnDisabled = true;
                }
            },
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
                this.$get('/client/list', {
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    keyword: this.NamePhoneSearchKeyword,
                    tagId: this.tagId,
                    shareGroupUUID: this.shareGroupUUID,
                    sortField: this.sortField,
                    direction: this.direction,
                }).then(res => {
                    const data = res;
                    this.tableData = data.rows;
                    this.total = data.total;
                    this.clientListLoading = false;
                })
            },
            //获取已创建的标签列表
            getTagData() {
                this.$get('/tag/list/all').then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.tabsForm.tagItem = data.data;
                        this.tabsForm.tagsFilterItem = data.data;
                        // map方法处理老数组，并赋值给新数组，不影响老数组的结构
                        // this.tagsFilterItem = this.tabsForm.tagItem.map(function(obj) {
                        //     let newArr = {};
                        //     newArr["text"] = obj.tag.split('/')[0];
                        //     newArr["id"] = obj.tagId;
                        //     return newArr;
                        // });
                    }
                });
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
            columnIsNull0(row, column, cellValue) {//格式化判断是否为空，0或null
                return this.isNull0(cellValue);
            },
            //排序的回调
            sortChange(column, prop, order) {
                console.log(column, prop, order)
                this.sortField = column.prop;//排序字段
                //判断要排序的字段是否是年龄
                if (column.prop == 'birthdate') {
                    this.direction = column.order == 'ascending' ? 'desc' : 'asc';//排序方向——ASC 升序，DESC 降序，年龄排序要反着来展示
                } else {
                    this.direction = column.order == 'ascending' ? 'asc' : 'desc';//排序方向——ASC 升序，DESC 降序，除了年龄排序，其他都正常展示
                }
                this.getClientData();
            },
            //按标签筛选
            TagsFilterChange(value) {
                this.tagId = value;
                this.getClientData();
            },
            //按名字或手机号搜索客户
            NamePhoneSearchClient() {
                this.getClientData();
            },
            //清空按名字或手机号搜索客户的关键字
            clearKeyword() {
                this.getClientData();
            },
            //编辑客户
            clientEdit(clientId) {
                this.$router.push({path: '/consultant_clientCreateModify', query: {clientId: clientId}});
            },
            //标签管理
            tag_management(clientId) {
                this.getClientTagData(clientId);//获取已创建的标签列表
                this.tabs_dialog = true;
            },
            //删除客户
            clientDelete(clientId) {
                this.$confirm('是否要删除此客户信息？', '删除客户').then(() => {
                    this.$delete('/client/delete?clientId=' + clientId).then(res => {
                        const data = res;
                        if (data.status == 0) {
                            this.$message.success('删除成功！');
                            this.getClientData();
                        } else {
                            this.$message.error(data.msg)
                        }
                    });
                }).catch(() => {
                    this.$message.info('已取消操作.');
                });
            },
            //获取导出全部客户Excel的下载链接并赋值给a标签下载按钮
            exportAllClient() {
                this.$get('/client/export').then(res => {
                    const data = res;
                    if (data.status == 0) {
                        // console.log(data.data)
                        this.exportAllClientDialog = true;
                        this.exportAllClientDownloadHref = data.data;
                        this.$message.success('下载链接获取成功，请尽快点击确定下载Excel！');
                    } else {
                        this.$message.error(data.msg)
                    }
                });
            },
            //---------------------------------标签管理---------------------------------
            //获取客户已有的标签
            getClientTagData(clientid) {
                this.tabsForm.thisClientId = clientid;
                this.$get('/tag/selected?clientId=' + clientid).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        let getClientTags = [];
                        data.data.forEach((value, key, arr) => {
                            getClientTags.push(value.tagId);
                        });
                        this.tabsForm.selectedTagId = getClientTags;
                    }
                });

                //已勾选标签后在下拉框里禁用它，要删除的话只能在div里的Tag列表点×来取消标签
                setTimeout(() => {
                    let a = this.tabsForm.tagItem;
                    let b = this.tabsForm.selectedTagId;
                    for (var i = 0; i < a.length; i++) {
                        if (b.toString().indexOf(a[i].tagId.toString()) > -1) {
                            a[i].disabled = true;
                        } else {
                            a[i].disabled = false;
                        }
                    }
                }, 500);
            },
            tagChange() {//选择标签事件
                let clientId = this.tabsForm.thisClientId;
                setTimeout(() => {//加个延时函数，由于浏览器刷新的时间一般为17ms一次，因此把setTimeout的值设置为17ms之后，即20ms
                    // console.log(removeTagId)
                    if (!removeTagId) {
                        this.$post('/tag/make', {
                            clientId: clientId,
                            tagId: this.tabsForm.selectedTagId[this.tabsForm.selectedTagId.length - 1]
                        }).then(res => {
                            const data = res;
                            if (data.status == 0) {
                                this.getClientData();
                            } else {
                                this.$message.error(data.msg);
                            }
                        });
                    }
                }, 20);

                //已勾选标签后在下拉框里禁用它，要删除的话只能在div里的Tag列表点×来取消标签
                let tagItemArr = this.tabsForm.tagItem;
                let selectedTagIdArr = this.tabsForm.selectedTagId;
                for (var i = 0; i < tagItemArr.length; i++) {
                    if (selectedTagIdArr.toString().indexOf(tagItemArr[i].tagId.toString()) > -1) {
                        tagItemArr[i].disabled = true;
                    } else {
                        tagItemArr[i].disabled = false;
                    }
                }
            },
            removeTag: function (tagid) {//移除客户的标签事件
                removeTagId = tagid;
                let clientId = this.tabsForm.thisClientId;
                this.$post('/tag/make', {
                    clientId: clientId,
                    tagId: tagid
                }).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.getClientData();
                    } else {
                        this.$message.error(data.msg);
                    }
                });
            },
            createTagsBgColorFN() {//创建新标签选择背景色
                this.tabsForm.createTagsBgColor = Math.round(Math.random() * 1000000);
            },
            createTagsFN() {//创建新标签
                let tag = this.tabsForm.createTags + '/' + this.tabsForm.createTagsBgColor;
                this.$post('/tag/create?tag=' + tag).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.$message.success('创建成功！');
                        this.getTagData();
                    } else {
                        this.$message.error(data.msg)
                    }
                });
            },
            deleteTagsFN() {//删除标签
                this.$confirm('是否要删除此标签？', '删除标签').then(() => {
                    this.$delete('/tag/delete?tagId=' + this.tabsForm.deleteTagId).then(res => {
                        const data = res;
                        if (data.status == 0) {
                            this.tabsForm.deleteTagId = '';
                            this.$message.success('删除成功！');
                            this.getTagData();
                            this.getClientData();
                        } else {
                            this.$message.error(data.msg)
                        }
                    });
                }).catch(() => {
                    this.$message.info('已取消操作.');
                });
            },


        },
        components: {}
    }
</script>
<style scoped lang="less" type="text/less">
    body {
        .client-list {
            .client-list-toolbar {
                > .el-col {
                    text-align: left;
                }
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

        /*给客户打标签的选择标签select*/
        .el-select-dropdown__item span {
            line-height: normal !important;
            color: #fff;
        }

        .select-tags {
            width: 100%;
        }

        .exportAllClientDownload-button {
            padding: 0;
            span {
                a {
                    display: inline-block;
                    padding: 12px 20px;
                    color: #fff;
                }
            }
        }

        .createTagsSelectBgColor {
            padding: 3px 8px;
            font-size: 12px;
            color: #fff;
            cursor: pointer;
            border-radius: 3px;
            user-select: none;
            background: #409eff;
        }
    }


</style>
