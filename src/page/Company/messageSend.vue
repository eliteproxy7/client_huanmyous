<template>
    <section>
        <el-row :gutter="30">
            <el-col>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" status-icon>
                    <el-form-item label="站内信标题" prop="messageHeader">
                        <el-input v-model="ruleForm.messageHeader" placeholder="请输入站内信标题"></el-input>
                    </el-form-item>
                    <el-form-item label="站内信内容" prop="messageContent">
                        <el-input type="textarea" v-model="ruleForm.messageContent" placeholder="请输入站内信内容"></el-input>
                    </el-form-item>

                    <el-form-item label="顾问列表">
                        <el-col :span="5" style="text-align: left">本公司共：{{total}}位顾问</el-col>
                        <el-col :span="5">
                            <el-switch
                                v-ripple
                                v-model="filterGoldSwich"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-text="只看金牌顾问"
                                @change="filterGoldConsultantChange">
                            </el-switch>
                        </el-col>
                        <el-col :span="7" style="text-align: right">
                            <el-input v-model="NamePhoneSearchKeyword" placeholder="输入名字或手机号搜索" clearable
                                      @clear="clearKeyword">
                                <el-button v-ripple type="primary" slot="append" icon="el-icon-search"
                                           @click="NamePhoneSearchClient"></el-button>
                            </el-input>
                        </el-col>
                        <br/>
                        <br/>
                        <el-table
                            :data="tableData"
                            stripe
                            border
                            highlight-current-row
                            ref="multipleTable"
                            v-loading="clientListLoading"
                            element-loading-text="拼命加载中..."
                            style="width: 100%"
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
                                property="jobNumber"
                                label="工号"
                                width="130"
                                :formatter="columnIsNull0">
                            </el-table-column>
                            <el-table-column
                                property="responsiblePlace"
                                label="负责销售地区"
                                :formatter="columnIsNull0">
                            </el-table-column>
                            <el-table-column
                                property="clientCount"
                                label="客户数量（位）"
                                :formatter="columnIsNull0">
                            </el-table-column>
                            <el-table-column
                                label="金牌顾问" >
                                <template slot-scope="scope">
                                    <div v-html="isGoldConsultant(scope.row.istop)"></div>
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
                    </el-form-item>
                    <el-form-item style="text-align: center">
                        <el-button type="primary" @click="submitSendMessage" :disabled="submitSendBtnDisabled">
                            提交发送
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    messageHeader:'',//邮件标题
                    messageContent: '',//站内信内容
                },
                rules: {//表单验证规则
                    messageHeader: [
                        {required: true, message: "请输入站内信标题", trigger: 'blur'}
                    ],
                    messageContent: [
                        {required: true, message: "请输入站内信内容", trigger: 'blur'}
                    ]
                },
                tableData: [],
                pageNumber: 1,//默认显示第一页
                pageSize: 10,//默认每页显示10条
                total: null,//总条数
                clientListLoading: true,    //顾问列表的加载动画
                filterGoldSwich: false,     //只看金牌顾问Switch 开关 true or flase
                NamePhoneSearchKeyword: '',     //按名字或手机号搜索客户的关键字
                checked_consultant_arr:[],      //记录check选择的接受者顾问数组
                checked_consultantId_arr :[],   //存储check选择的顾问的ID数组

                submitSendBtnDisabled: true, //提交创建

            }
        },
        mounted() {
            this.getCounselorData();//获取顾问数据列表
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
            getCounselorData() {//获取顾问数据列表
                this.$get('/counselor/list', {
                    pageNumber: this.pageNumber,
                    pageSize: this.pageSize,
                    keyword: this.NamePhoneSearchKeyword,
                    istop: this.filterGoldSwich
                }).then(res => {
                    const data = res;
                    this.tableData = data.rows;
                    this.total = data.total;
                    this.clientListLoading = false;
                })
            },
            columnIsNull0(row, column, cellValue) {//格式化判断是否为空，0或null
                return this.isNull0(cellValue);
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
            //判断是否金牌顾问
            isGoldConsultant(value) {
                let val = '';
                if(value == true){
                    val = '是';
                }else if(value == false){
                    val = '否';
                }
                return val;
            },
            //金牌顾问切换
            filterGoldConsultantChange(value) {
                this.getCounselorData();
            },
            //按名字或手机号搜索客户
            NamePhoneSearchClient() {
                this.getCounselorData();
            },
            //清空按名字或手机号搜索客户的关键字
            clearKeyword() {
                this.getCounselorData();
            },
            //顾问列表单选全选事件
            handleSelectionChange(val) {
                this.checked_consultant_arr = val;
                if(this.checked_consultant_arr.length > 0) {
                    this.submitSendBtnDisabled = false;
                } else {
                    this.submitSendBtnDisabled = true;
                }
            },
            //提交发送
            submitSendMessage() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.checked_consultantId_arr = [];//先清空一遍，避免重复push
                        this.checked_consultant_arr.forEach((value, key, arr) => {
                            this.checked_consultantId_arr.push(value.userId);
                        });
                        // console.log(this.checked_consultantId_arr);

                        this.$post('/message/message/send', {
                            receivers: this.checked_consultantId_arr.join(),
                            title: this.ruleForm.messageHeader,
                            content: this.ruleForm.messageContent
                        }).then(res => {
                            const data = res;
                            if (data.status == 0) {
                                this.$message.success('发送成功!');
                                localStorage.messageHeader = this.ruleForm.messageHeader;
                                localStorage.messageContent = this.ruleForm.messageContent;
                                this.ruleForm.messageHeader = '';   //清除邮件标题
                                this.ruleForm.messageContent = '';  //清除站内信内容
                                this.$refs.ruleForm.clearValidate();    //移除整个表单的校验结果
                                this.$refs.multipleTable.clearSelection();  //清空多选框

                            } else {
                                this.$message.warning(data.msg)
                            }
                        })
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
    }
</style>
