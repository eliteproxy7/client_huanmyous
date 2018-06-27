<template>
    <section>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" status-icon label-position="top">
            <el-form-item label="选择邮件模板" prop="emailFormworkId">
                <el-select v-model="ruleForm.emailFormworkId" clearable filterable placeholder="请选择邮件模板"
                           @change="selectEmailFormworkChange">
                    <el-option
                        v-for="item in emailTemplateListItem"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="邮件标题" prop="emailHeader">
                <el-input v-model="ruleForm.emailHeader" placeholder="请输入邮件标题"></el-input>
            </el-form-item>
            <el-form-item label="邮件内容" prop="formworkContent">
                <el-input type="textarea" v-html="ruleForm.formworkContent" readonly style="border:1px solid #dddddd; min-height: 64px;"></el-input>
            </el-form-item>
            <el-form-item label="模板参数-激活链接" prop="activationURL" v-show="formworkTypeIsShow">
                <el-input v-model="ruleForm.activationURL" placeholder="请输入激活链接（必须以http://或https://开头）"></el-input>
            </el-form-item>

            <el-form-item label="模板参数-活动日期" prop="activityDate" v-show="!formworkTypeIsShow">
                <el-date-picker
                    v-model="ruleForm.activityDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择活动日期"
                    :picker-options="timePickerOptions">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="模板参数-活动举办地点" prop="activityPlace" v-show="!formworkTypeIsShow">
                <el-input v-model="ruleForm.activityPlace" placeholder="请输入您规定的活动举办地点"></el-input>
            </el-form-item>
            <el-form-item label="模板参数-活动名称" prop="activityName" v-show="!formworkTypeIsShow">
                <el-input v-model="ruleForm.activityName" placeholder="请输入您规定的活动名称"></el-input>
            </el-form-item>
            <el-form-item label="模板参数-活动报名电话" prop="signUpPhone" v-show="!formworkTypeIsShow">
                <el-input v-model.number="ruleForm.signUpPhone" placeholder="请输入您规定的活动报名电话"></el-input>
            </el-form-item>
            <el-form-item label="模板参数-活动报名链接" prop="signUpURL" v-show="!formworkTypeIsShow">
                <el-input v-model="ruleForm.signUpURL" placeholder="请输入您规定的活动报名链接"></el-input>
            </el-form-item>
            <!--prop="activityPhoto"-->
            <el-form-item label="模板参数-上传活动图片" v-show="!formworkTypeIsShow">
                <el-upload
                    ref="activityPhoto"
                    action="http://beta-business.mf-data.com/api/v1/upload/single/4"
                    :before-upload="beforeAvatarUpload"
                    :on-success="handleAvatarSuccess"
                    :on-remove="handleRemove"
                    list-type="picture"
                    name="myFile"
                    :limit="1"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">
                        上传到服务器
                    </el-button>
                    <div slot="tip" class="el-upload__tip">只能上传1张图片，格式为jpg/png文件，且不超过2M</div>
                    <div slot="tip" class="el-upload__tip">上传并提交修改成功后将会覆盖原来的图片，如果您不修改图片可跳过此项。</div>
                </el-upload>
            </el-form-item>

            <el-form-item label="接收客户（只显示有邮箱的）" prop="selectClientList">
                <el-row :gutter="30" type="flex" justify="space-between">
                    <el-col :span="5" style="text-align: left">为您查询到：{{total}}位客户</el-col>
                    <el-col :span="7" style="text-align: right">
                        <el-input v-model="NamePhoneSearchKeyword" placeholder="输入名字或手机号搜索" clearable
                                  @clear="clearKeyword">
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
                    style="width: 100%; margin: 15px 0 0 0;"
                    @sort-change="sortChange"
                    :default-sort="{prop: 'ctime', order: 'descending'}"
                    @selection-change="handleSelectionChange"
                    :row-key="getRowKeys">
                    <el-table-column
                        type="selection"
                        width="55"
                        reserve-selection>
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
                <el-button type="primary" @click="submitSendEmail" :disabled="isModifyBtnDisabled"
                           icon="iconfont icon-submit">
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
                    emailFormworkId: [],//选择短信模板 选择显示 是 Id
                    emailHeader: '',//邮件标题
                    formworkContent: '',//邮件内容，根据选择的邮件模板显示对应的template
                    activationURL: '',//注册通知类——模板参数——激活链接

                    activityDate: '',//营销类——模板参数-活动日期
                    activityPlace: '',//营销类——模板参数-活动举办地点
                    activityName: '',//营销类——模板参数-活动名称
                    signUpPhone: '',//营销类——模板参数-活动报名电话
                    signUpURL: '',//营销类——模板参数-活动报名链接
                    activityPhoto: [],//营销类——模板参数-活动图片
                    isUpdateActivityPhoto: false,  //判断是否上传了活动图片
                },
                rules: {//表单验证规则
                    emailFormworkId: [
                        {required: true, message: "请选择模板类型！", trigger: 'change'}
                    ],
                    emailHeader: [
                        {required: true, message: "请输入邮件标题！", trigger: 'blur'}
                    ],
                    formworkContent: [
                        {required: true, message: "请选择模板类型, 邮件内容不能为空！"}
                    ],
                },
                //日期选择器——选项配置
                timePickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    onPick(value) {//判断clearable清除时间操作
                        // console.log(value)
                    }
                },
                formworkTypeIsShow: true, //根据选择的模板类型判断显示隐藏模板参数
                tableData: [],//客户列表数据
                pageNumber: 1,//默认显示第一页
                pageSize: 10,//默认每页显示10条
                total: null,//总条数
                NamePhoneSearchKeyword: '',//按名字或手机号搜索客户的关键字
                sortField: '',//排序字段
                direction: '',//排序方向——ASC 升序，DESC 降序
                clientListLoading: true,//客户列表的加载动画

                emailTemplateListItem: [],//邮件模板列表
                checkedClientArr: [],   //选择的接受客户数组
                emailFormworkContentReg: '',// 识别出模板有几个双大括号参数值
                emailFormworkContentRegVal: [],  //过滤掉参数值数组emailFormworkContentReg里每一项的双大括号{{}}
                backend_params: [],//最终要发给后台的被选客户的数据参数数组
                isModifyBtnDisabled: true, //提交发送

            }
        },
        mounted() {
            this.getEmailTemplateListData();//获取邮件模板列表
        },
        methods: {
            //获取邮件模板列表
            getEmailTemplateListData() {
                this.$get('/mail/template/list').then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.emailTemplateListItem = data.data;
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
                    url = '/client/company/list?showMail=true'
                } else if (localStorage.roleId == 2) {
                    url = '/client/list?showMail=true'
                }
                this.$get(url, {
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
            // 获取row的key值，在数据更新之后保留之前选中的数据（需指定 row-key）
            getRowKeys(row) {
                return row.userId;
            },
            //客户列表单选全选事件
            handleSelectionChange(rows) {
                this.checkedClientArr = [];
                if (rows) {
                    rows.forEach(row => {
                        if (row) {
                            this.checkedClientArr.push(row);
                        }
                    });
                }
                if (rows.length > 0) {
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
            selectEmailFormworkChange() { //短信内容根据短信模板的Id显示template
                this.$get('/mail/template/details?id=' + this.ruleForm.emailFormworkId).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.ruleForm.emailHeader = data.data.title;
                        this.ruleForm.formworkContent = data.data.template;
                        //识别出模板有几个双大括号参数值
                        this.emailFormworkContentReg = data.data.template.match(/{{[^\\}]*\}}/g);
                        //过滤掉参数值数组SMSFormworkContentReg里每一项的双大括号{{}}
                        if (this.emailFormworkContentReg) {
                            this.emailFormworkContentRegVal.length = 0;
                            this.emailFormworkContentReg.forEach((value, key, arr) => {
                                this.emailFormworkContentRegVal.push(value.replace(/^\s*{{|}}\s*$/g, ''));
                            });
                        }
                        // console.log(this.emailFormworkContentReg, this.emailFormworkContentRegVal)

                        //判断模板参数里是否是模板1，有则显示对应的input
                        if (this.emailFormworkContentRegVal.indexOf('name') != -1 && this.emailFormworkContentRegVal.indexOf('url') != -1) {
                            this.formworkTypeIsShow = true;
                            this.rules = {//表单验证规则
                                emailFormworkId: [
                                    {required: true, message: "请选择模板类型！", trigger: 'change'}
                                ],
                                emailHeader: [
                                    {required: true, message: "请输入邮件标题！", trigger: 'blur'}
                                ],
                                formworkContent: [
                                    {required: true, message: "请选择模板类型, 邮件内容不能为空！"}
                                ],
                                activationURL: [
                                    {validator: this.url_validation, trigger: 'blur'}
                                ],
                            };
                        } else if (this.emailFormworkContentRegVal.indexOf('name') != -1 && this.emailFormworkContentRegVal.indexOf('activityDate') != -1 &&
                            this.emailFormworkContentRegVal.indexOf('activityPlace') != -1 && this.emailFormworkContentRegVal.indexOf('activityName') != -1 &&
                            this.emailFormworkContentRegVal.indexOf('phone') != -1 && this.emailFormworkContentRegVal.indexOf('companyUrl') != -1) {
                            this.formworkTypeIsShow = false;
                            this.rules = {//表单验证规则
                                emailFormworkId: [
                                    {required: true, message: "请选择模板类型！", trigger: 'change'}
                                ],
                                emailHeader: [
                                    {required: true, message: "请输入邮件标题！", trigger: 'blur'}
                                ],
                                formworkContent: [
                                    {required: true, message: "请选择模板类型, 邮件内容不能为空！"}
                                ],
                                activityDate: [
                                    {required: true, message: "请选择活动日期！", trigger: 'blur'}
                                ],
                                activityPlace: [
                                    {required: true, message: "请输入活动举办地点！", trigger: 'blur'}
                                ],
                                activityName: [
                                    {required: true, message: "请输入活动名称！", trigger: 'blur'}
                                ],
                                signUpPhone: [
                                    {required: true, message: "请输入活动报名电话！", trigger: 'blur'}
                                ],
                                signUpURL: [
                                    {required: true, validator: this.url_validation, trigger: 'blur'}
                                ],
                                activityPhoto: [
                                    {required: true, validator: this.activityPhoto_validation}
                                ],
                                selectClientList: [
                                    {required: true, validator: this.selectClientList_validation}
                                ],
                            };
                        }
                    }
                });
            },
            // 点击提交发送邮件
            submitSendEmail() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        //判断模板参数里是否有url
                        if (this.emailFormworkContentRegVal.indexOf('name') != -1 && this.emailFormworkContentRegVal.indexOf('url') != -1) {
                            this.backend_params = [];//先清空，避免翻页的时候累计
                            this.checkedClientArr.forEach((value, key, arr) => {
                                this.backend_params.push(
                                    {
                                        "email": value.email,
                                        "params": [
                                            {
                                                "name": "name",
                                                "value": value.name
                                            },
                                            {
                                                "name": "url",
                                                "value": this.ruleForm.activationURL
                                            }
                                        ]
                                    }
                                )
                            });
                        } else if (this.emailFormworkContentRegVal.indexOf('name') != -1 && this.emailFormworkContentRegVal.indexOf('activityDate') != -1 &&
                            this.emailFormworkContentRegVal.indexOf('activityPlace') != -1 && this.emailFormworkContentRegVal.indexOf('activityName') != -1 &&
                            this.emailFormworkContentRegVal.indexOf('phone') != -1 && this.emailFormworkContentRegVal.indexOf('companyUrl') != -1) {
                            this.backend_params = [];//先清空，避免翻页的时候累计
                            this.checkedClientArr.forEach((value, key, arr) => {
                                this.backend_params.push(
                                    {
                                        "email": value.email,
                                        "params": [
                                            {
                                                "name": "name",
                                                "value": value.name
                                            },
                                            {
                                                "name": "activityDate",
                                                "value": this.ruleForm.activityDate
                                            },
                                            {
                                                "name": "activityPlace",
                                                "value": this.ruleForm.activityPlace
                                            },
                                            {
                                                "name": "activityName",
                                                "value": this.ruleForm.activityName
                                            },
                                            {
                                                "name": "phone",
                                                "value": this.ruleForm.signUpPhone
                                            },
                                            {
                                                "name": "companyUrl",
                                                "value": this.ruleForm.signUpURL
                                            },
                                            // ,
                                            // {
                                            //     "name": "img",
                                            //     "value": '<img src="'+ email_params_img_path +'">'
                                            // }
                                        ]
                                    }
                                )
                            });
                        }

                        this.$post('/mail/send2', {
                            tempId: this.ruleForm.emailFormworkId,
                            mails: JSON.stringify(this.backend_params)
                        }).then(res => {
                            const data = res;
                            console.log(data);
                            if (data.status == 0) {
                                this.$message.success('发送成功!');
                                this.$router.push({path: '/massEmail_historyList'});
                            } else {
                                this.$message.warning(data.msg)
                            }
                        })
                    } else {
                        this.$message.warning('表单验证信息有误，请检查并重新输入！');
                    }
                });
            },
            //活动图片——上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                // console.log(isJPG, isPNG, isLt2M)

                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG、PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                // return isJPG && isPNG && isLt2M;
                return isJPG || isPNG || isLt2M;
            },
            //活动图片——文件上传成功时的钩子
            handleAvatarSuccess(res, file) {
                this.$message.success('图片提交成功，点击下面的提交发送按钮即可！');
                this.businessLicensePhoto = [{"url": 'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/' + res.data}];    //公司证件照片
                this.ruleForm.isUpdateActivityPhoto = true;
                this.$refs.ruleForm.validateField('activityPhoto');
            },
            //活动图片——点击上传
            submitUpload() {
                this.$refs.activityPhoto.submit();
            },
            //活动图片——已上传的文件列表移除某个文件时的钩子
            handleRemove(file, fileList) {
                this.$message.warning('图片移除成功，请重新选择活动图片上传！');
                this.ruleForm.activityPhoto = [];    //活动图片
                this.ruleForm.isUpdateActivityPhoto = false;
                this.$refs.ruleForm.validateField('activityPhoto');
            },
            //判断是否上传了活动图片——表单的自定义验证方法
            activityPhoto_validation(rule, value, callback) {
                if (this.ruleForm.isUpdateActivityPhoto) {
                    callback()
                } else {
                    callback(new Error('请上传活动图片！'))
                }
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
