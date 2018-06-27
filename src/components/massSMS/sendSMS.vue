<template>
    <section>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" status-icon label-position="top">
            <el-form-item label="选择短信模板" prop="SMSId">
                <el-select v-model="ruleForm.SMSId" clearable filterable placeholder="请选择短信模板" @change="selectSMSFormworkChange">
                    <el-option
                        v-for="item in SMSTemplateListItem"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="短信内容" prop="SMSFormworkContent">
                <el-input type="textarea" v-model="ruleForm.SMSFormworkContent" disabled></el-input>
            </el-form-item>
            <el-form-item label="模板参数-验证码" prop="SMSVerificationCode" v-show="formworkTypeIsShow">
                <el-input v-model.number="ruleForm.SMSVerificationCode" maxLength="6" placeholder="请输入您规定的六位数验证码"></el-input>
            </el-form-item>
            <el-form-item label="接收客户" prop="selectClientList">
                <el-row :gutter="30" type="flex" justify="space-between">
                    <el-col :span="5" style="text-align: left">为您查询到：{{total}}位客户</el-col>
                    <el-col :span="7" style="text-align: right">
                        <el-input v-model="NamePhoneSearchKeyword" placeholder="输入名字或手机号搜索" clearable @clear="clearKeyword">
                            <el-button v-ripple type="primary" slot="append" icon="el-icon-search" @click="NamePhoneSearchClient"></el-button>
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
                    style="width: 100%; margin: 15px 0 0 0;"
                    @sort-change="sortChange"
                    :default-sort="{prop: 'ctime', order: 'descending'}"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
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
                            <div v-show="scope.row.tags.length" v-for="item in scope.row.tags"
                                 class="el-tag-div">
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
            </el-form-item>
            <el-form-item style="text-align: center">
                <el-button type="primary" @click="submitSendSMS" :disabled="isModifyBtnDisabled" icon="iconfont icon-submit">
                     提交发送
                </el-button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    SMSId: [],//选择短信模板 选择显示 是 Id
                    SMSFormworkContent: '',//短信模板的内容，根据选择的短信模板显示对应的template
                    SMSVerificationCode: '',//模板参数-验证码
                },
                rules: {//表单验证规则
                    SMSId: [
                        {required: true, message: "请选择短信模板！", trigger: 'change'}
                    ],
                    SMSFormworkContent: [
                        {required: true, message: "请选择短信模板！",}
                    ],
                    SMSVerificationCode: [
                        {required: true, message: "请输入您规定的六位数验证码！", trigger: 'blur'}
                    ],
                    selectClientList: [
                        {required: true, validator: this.selectClientList_validation}
                    ],
                },
                formworkTypeIsShow: false, //根据选择的模板类型判断显示隐藏模板参数
                tableData: [],//客户列表数据
                pageNumber: 1,//默认显示第一页
                pageSize: 10,//默认每页显示10条
                total: null,//总条数
                NamePhoneSearchKeyword: '',//按名字或手机号搜索客户的关键字
                sortField: '',//排序字段
                direction: '',//排序方向——ASC 升序，DESC 降序
                clientListLoading: true,//客户列表的加载动画

                SMSTemplateListItem: [],//短信模板列表
                checkedClientArr: [],  //选择的接受客户数组
                SMSFormworkContentReg: [],// 识别出模板有几个双大括号参数值
                SMSFormworkContentRegVal: [],  //过滤掉参数值数组SMSFormworkContentReg里每一项的双大括号{{}}
                backend_params: [],//最终要发给后台的被选客户的数据参数数组
                isModifyBtnDisabled: true, //提交发送
            }
        },
        mounted() {
            this.getSMSTemplateListData();//获取短信模板列表
        },
        methods: {
            // 获取短信模板列表
            getSMSTemplateListData() {
                this.$get('/sms/template/list').then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.SMSTemplateListItem = data.data;
                    }
                });
            },
            handleSizeChange(val) {//处理pagesize页码大小变动的事件
                this.pageSize = val;
                this.getClientData();
            },
            handleCurrentChange(val) {//处理currentPage当前页变动的事件
                this.pageNumber = val;
                this.getClientData();
            },
            //获取客户列表
            getClientData() {
                let url = '';
                if (localStorage.roleId == 1) {
                    url = '/client/company/list'
                } else if (localStorage.roleId == 2) {
                    url = '/client/list'
                }
                this.$get(url, {
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    keyword: this.NamePhoneSearchKeyword,
                    sortField: this.sortField,
                    direction: this.direction,
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
                return this.momentFormat(cellValue, 'YYYY-MM-DD HH:mm:ss');
            },
            columnIsNull0(row, column, cellValue) {//格式化判断是否为空，0或null
                return this.isNull0(cellValue);
            },
            //排序的回调
            sortChange(column, prop, order) {
                this.sortField = column.prop;//排序字段
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
                this.getClientData();
            },
            //清空按名字或手机号搜索客户的关键字
            clearKeyword() {
                this.getClientData();
            },
            //客户列表单选全选事件
            handleSelectionChange(val) {
                this.checkedClientArr = val;
                if (this.checkedClientArr.length > 0) {
                    this.isModifyBtnDisabled = false;
                    this.$refs.ruleForm.validateField('selectClientList');
                } else {
                    this.isModifyBtnDisabled = true;
                    this.$refs.ruleForm.validateField('selectClientList');
                }
            },
            //判断是否选择了目标客户
            selectClientList_validation(rule, value, callback) {
                if (!this.isModifyBtnDisabled) {
                    callback()
                } else {
                    callback(new Error('请选择目标客户！'))
                }
            },
            //短信内容根据短信模板的Id显示template
            selectSMSFormworkChange() {
                //根据选择的短信模板显示对应的template-短信模板的内容
                this.SMSTemplateListItem.forEach((value, key, arr) => {
                    if (this.ruleForm.SMSId == value.id) {
                        this.ruleForm.SMSFormworkContent = value.template;
                        this.SMSFormworkContentReg = value.template.match(/{{[^\\}]*\}}/g);//识别出模板有几个双大括号参数值

                        //过滤掉参数值数组SMSFormworkContentReg里每一项的双大括号{{}}
                        if(this.SMSFormworkContentReg){
                            this.SMSFormworkContentRegVal.length = 0;
                            this.SMSFormworkContentReg.forEach((value, key, arr) => {
                                this.SMSFormworkContentRegVal.push(value.replace(/^\s*{{|}}\s*$/g, ''));
                            });
                        }
                    }
                });
                // console.log(this.SMSFormworkContentReg, this.SMSFormworkContentRegVal)

                //根据选择的模板类型判断显示隐藏对应的模板参数input
                if(this.SMSFormworkContentRegVal.indexOf('code') != -1) {
                    this.formworkTypeIsShow = true;
                } else {
                    this.formworkTypeIsShow = false;
                }
            },
            //点击提交发送短信
            submitSendSMS() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        if (this.SMSFormworkContentRegVal.indexOf('code') != -1) {
                            this.checkedClientArr.forEach((value, key, arr) => {
                                this.backend_params.push(
                                    {
                                        "phone": value.phone,
                                        "params": [
                                            {
                                                "name": "name",
                                                "value": value.name
                                            },
                                            {
                                                "name": "code",
                                                "value": this.ruleForm.SMSVerificationCode
                                            }
                                        ]
                                    }
                                )
                            });
                        }
                        // console.log(JSON.stringify(this.backend_params));
                        this.$post('/sms/send2', {
                            tempId: this.ruleForm.SMSId,
                            smss: JSON.stringify(this.backend_params)
                        }).then(res => {
                            const data = res;
                            console.log(data);
                            if (data.status == 0) {
                                this.$message.success('短信发送成功!');
                                this.$router.push({path: '/massSMS_historyList'});
                            } else {
                                this.$message.warning(data.msg);
                            }
                        });
                    } else {
                        this.$message.warning('表单验证信息有误，请检查并重新输入！');
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
            table {
                > tbody {
                    > tr {
                        > td {
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
    }
</style>
