<template>
    <section>
        <el-row>
            <el-col :span="15">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" status-icon class="company-details-Modify">
                    <h4>修改企业信息</h4>
                    <el-form-item label="公司联系电话" prop="companyPhone">
                        <el-input v-model.number="ruleForm.companyTel" maxLength="12" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="公司联系邮箱" prop="companyEmail">
                        <el-input v-model="ruleForm.companyEmail" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="公司所在地">
                        <div class="Site_now">
                            <area-cascader type='text' :level='1' v-model="ruleForm.locationSite" :data="ruleForm.pcaa" placement="bottom"></area-cascader>
                        </div>
                    </el-form-item>
                    <el-form-item label="详细地址">
                        <el-input v-model="ruleForm.address" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="公司人数">
                        <el-select v-model="ruleForm.companyPeopleNumber" placeholder="请选择公司人数">
                            <option value="15人以下">15人以下</option>
                            <option value="15人~50人">15人~50人</option>
                            <option value="50人~100人">50人~100人</option>
                            <option value="100人~200人">100人~200人</option>
                            <option value="200人~500人">200人~500人</option>
                            <option value="500人以上">500人以上</option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="公司网站">
                        <el-input v-model="ruleForm.webSite" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="上传公司Logo">
                        <el-upload
                            ref="uploadLogo"
                            action="http://beta-business.mf-data.com/api/v1/upload/single/4"
                            :before-upload="beforeAvatarUploadLogo"
                            :on-success="handleAvatarSuccessLogo"
                            :file-list="companyLogo"
                            list-type="picture"
                            name="myFile"
                            :limit="2"
                            :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUploadLogo">
                                上传到服务器
                            </el-button>
                            <div slot="tip" class="el-upload__tip">只能上传1张图片，格式为jpg/png文件，且不超过2M</div>
                            <div slot="tip" class="el-upload__tip">上传并提交修改成功后将会覆盖原来的图片，如果您不修改图片可跳过此项。</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="公司微信公众号">
                        <el-input v-model="ruleForm.officialAccounts" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="公司微信服务号">
                        <el-input v-model="ruleForm.serviceNumber" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="请上传公众号二维码">
                        <el-upload
                            ref="uploadQRCode"
                            action="http://beta-business.mf-data.com/api/v1/upload/single/4"
                            :before-upload="beforeAvatarUploadQRCode"
                            :on-success="handleAvatarSuccessQRCode"
                            :file-list="QRCode"
                            list-type="picture"
                            name="myFile"
                            :limit="2"
                            :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUploadQRCode">
                                上传到服务器
                            </el-button>
                            <div slot="tip" class="el-upload__tip">只能上传1张图片，格式为jpg/png文件，且不超过2M</div>
                            <div slot="tip" class="el-upload__tip">上传并提交修改成功后将会覆盖原来的图片，如果您不修改图片可跳过此项。</div>
                        </el-upload>
                    </el-form-item>

                    <h4>修改负责人信息</h4>

                    <el-form-item label="负责人姓名">
                        <el-input v-model="ruleForm.principalName" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人联系电话" prop="principalPhone">
                        <el-input v-model.number="ruleForm.principalPhone" maxLength="11" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人邮箱" prop="principalEmail">
                        <el-input v-model="ruleForm.principalEmail" size="small"></el-input>
                    </el-form-item>

                    <el-form-item style="text-align: center">
                        <el-button type="warning" @click="$router.back()" style="margin: 0 30px">取消修改</el-button>
                        <el-button type="primary" :disabled="modifyBtnDisabled"
                                   :modifyBtnComputed="modifyBtnComputed" @click="submitModify" style="margin: 0 30px">提交修改
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import {pcaa} from 'area-data';

    const phoneReg = /^(1)[3|4|5|6|7|8|9](\d){9}$/;
    const emailReg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;

    export default {
        data() {
            return {
                ruleForm: {
                    companyTel: '',  //公司联系电话
                    companyEmail: '',  //公司联系邮箱
                    locationSite: [],   //公司所在地
                    address: '',    //公司所在地详细地址
                    pcaa: [],   //公司所在地的省市区三级联动存数据
                    webSite: '',    //公司网站
                    companyPeopleNumber: '',//公司人数
                    officialAccounts: '',   //公司微信公众号
                    serviceNumber: '',  //公司微信服务号

                    principalName: '',  //负责人姓名
                    principalPhone: '', //负责人联系电话
                    principalEmail: '',  //负责人邮箱
                },
                rules: {//表单验证规则
                    companyPhone: [
                        {type: 'number', message: '公司联系电话格式是数字', trigger: 'blur',},
                    ],
                    companyEmail: [
                        {validator: this.email_validation, trigger: 'blur',}
                    ],
                    principalPhone: [
                        {validator: this.phone_validation, trigger: 'blur',}
                    ],
                    principalEmail: [
                        {validator: this.email_validation, trigger: 'blur',}
                    ],
                },
                companyLogo: [],  //公司Logo
                QRCode: [], //公司公众号二维码
                modifyBtnDisabled: true, //修改按钮的状态
                getData: '', //存取回来的数据
                res: [], //监测标识符
                companyId: '' // 公司信息的Id
            }

        },
        created() {
            this.ruleForm.pcaa = pcaa;//地址数据赋值
        },
        mounted() {
            this.getCompanyData();
        },
        computed: {
            modifyBtnComputed() {//修改按钮的状态
                if (phoneReg.test(this.ruleForm.principalPhone) && emailReg.test(this.ruleForm.principalEmail)) {
                    this.modifyBtnDisabled = false;
                } else {
                    this.modifyBtnDisabled = true;
                }
            },
            revise() {
                if (this.res.length == 0) {
                    this.modifyBtnDisabled = true;
                }
            }
        },
        methods: {
            getCompanyData() {//获取要修改的企业的数据并赋值到页面
                this.$get('/company/details').then(res => {
                    let data = res.data;
                    this.getData = data;
                    if (data.city == '天津市' || data.city == '北京市' || data.city == '上海市' || data.city == '重庆市') {
                        data.city = '市辖区'
                    }
                    this.companyId = data.companyId;    //公司的Id
                    this.ruleForm.companyTel = data.companyTel;  //公司联系电话
                    this.ruleForm.companyEmail = data.companyEmail;    //公司联系邮箱
                    this.ruleForm.locationSite = [data.province, data.city, data.area];    //公司所在地址
                    this.ruleForm.address = data.address;   //详细地址
                    this.ruleForm.webSite = data.website;   //公司网站
                    this.ruleForm.companyPeopleNumber = data.scale; //公司人数
                    this.ruleForm.officialAccounts = data.officialAccounts; //公司微信公众号
                    this.ruleForm.serviceNumber = data.serviceNumber; //公司微信服务号
                    this.ruleForm.principalName = data.principalName; //负责人姓名
                    this.ruleForm.principalPhone = data.principalPhone;   //负责人联系电话
                    this.ruleForm.principalEmail = data.principalEmail;  //负责人邮箱

                    this.companyLogo = [{"url": 'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ data.logo}];    //公司Logo
                    this.QRCode = [{"url": 'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ data.officialAccountsQRCode}]; //公司公众号二维码QRCode
                })
            },
            //公司Logo——上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
            beforeAvatarUploadLogo(file) {
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
            //公司Logo——文件上传成功时的钩子
            handleAvatarSuccessLogo(res, file) {
                this.$message.success('图片提交成功，点击下面的提交按钮即可上传！');
                this.companyLogo = [{"url": 'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ res.data}];    //公司Logo
            },
            //公司Logo——点击上传
            submitUploadLogo() {
                this.$refs.uploadLogo.submit();
            },
            //公众号二维码——上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
            beforeAvatarUploadQRCode(file) {
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
            //公众号二维码——文件上传成功时的钩子
            handleAvatarSuccessQRCode(res, file) {
                this.$message.success('图片提交成功，点击下面的提交按钮即可上传！');
                this.QRCode = [{"url": 'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ res.data}];    //公司Logo
            },
            //公众号二维码——点击上传
            submitUploadQRCode() {
                this.$refs.uploadQRCode.submit();
            },
            //点击提交修改
            submitModify() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.$post('/company/update', {
                            companyId: this.companyId,
                            companyTel: this.ruleForm.companyTel,
                            companyEmail: this.ruleForm.companyEmail,
                            province: this.ruleForm.locationSite[0],
                            city: this.ruleForm.locationSite[1],
                            area: this.ruleForm.locationSite[2],
                            address: this.ruleForm.address,
                            scale: this.ruleForm.companyPeopleNumber,
                            website: this.ruleForm.webSite,
                            official_accounts: this.ruleForm.officialAccounts,
                            service_number: this.ruleForm.serviceNumber,
                            principalName: this.ruleForm.principalName,
                            principalPhone: this.ruleForm.principalPhone,
                            principalEmail: this.ruleForm.principalEmail,
                            logo: this.companyLogo[0].url.split('.com/')[1],
                            official_accounts_qr_code: this.QRCode[0].url.split('.com/')[1],
                        }).then(res => {
                            const data = res;
                            if (data.status == 0) {
                                this.$message.success('修改成功！!');
                                this.$router.push({path: '/company_details'});
                            } else {
                                this.$message.warning(data.msg)
                            }
                        })
                    }else{
                        this.$message.warning('输入有误，请检查并重新输入！');
                    }
                });
            },


        },
        // watch: {
        //     'ruleForm.companyTel': function (val) {//phone
        //         const data = this.getData;
        //         const oldVal = data.companyTel;
        //         let iTem = [];
        //         if (val != oldVal) {
        //             this.modifyBtnDisabled = false;
        //             this.res.push('a');
        //         } else {
        //             if (this.res.length > 0) {
        //                 for (let i = 0; i < this.res.length; i++) {
        //                     if (this.res[i] != 'a') {
        //                         iTem.push(this.res[i]);
        //                     }
        //                 }
        //             }
        //             this.res = iTem;
        //         }
        //     },
        //     'ruleForm.companyEmail': function (val) {//email
        //         const data = this.getData;
        //         const oldVal = data.companyEmail;
        //         let iTem = [];
        //         if (val != oldVal) {
        //             this.modifyBtnDisabled = false;
        //             this.res.push('b');
        //         } else {
        //             if (this.res.length > 0) {
        //                 for (let i = 0; i < this.res.length; i++) {
        //                     if (this.res[i] != 'b') {
        //                         iTem.push(this.res[i]);
        //                     }
        //                 }
        //             }
        //             this.res = iTem;
        //         }
        //     },
        //     'ruleForm.locationSite': function (val) {//目前所在地
        //         const data = this.getData;
        //         let arr = [];
        //         let iTem = [];
        //         const oldVal = [data.province, data.city, data.area];
        //         for (let i = 0; i < val.length; i++) {
        //             arr.push(val[i]);
        //         }
        //         if (arr.sort().toString() != oldVal.sort().toString()) {
        //             this.modifyBtnDisabled = false;
        //             this.res.push('c');
        //         } else {
        //             if (this.res.length > 0) {
        //                 for (let i = 0; i < this.res.length; i++) {
        //                     if (this.res[i] != 'c') {
        //                         iTem.push(this.res[i]);
        //                     }
        //                 }
        //             }
        //             this.res = iTem;
        //         }
        //     },
        //     'ruleForm.address': function (val) {//详细地址
        //         const data = this.getData;
        //         const oldVal = data.address;
        //         let iTem = [];
        //         if (val != oldVal) {
        //             this.modifyBtnDisabled = false;
        //             this.res.push('d');
        //         } else {
        //             if (this.res.length > 0) {
        //                 for (let i = 0; i < this.res.length; i++) {
        //                     if (this.res[i] != 'd') {
        //                         iTem.push(this.res[i]);
        //                     }
        //                 }
        //             }
        //             this.res = iTem;
        //         }
        //     },
        //     'ruleForm.companyPeopleNumber': function (val) {//公司人数
        //         const data = this.getData;
        //         const oldVal = data.scale;
        //         let iTem = [];
        //         if (val != oldVal) {
        //             this.modifyBtnDisabled = false;
        //             this.res.push('e');
        //         } else {
        //             if (this.res.length > 0) {
        //                 for (let i = 0; i < this.res.length; i++) {
        //                     if (this.res[i] != 'e') {
        //                         iTem.push(this.res[i]);
        //                     }
        //                 }
        //
        //             }
        //             this.res = iTem;
        //         }
        //     },
        //     'ruleForm.webSite': function (val) {//公司网址
        //         const data = this.getData;
        //         const oldVal = data.website;
        //         let iTem = [];
        //         if (val != oldVal) {
        //             this.modifyBtnDisabled = false;
        //             this.res.push('f');
        //         } else {
        //             if (this.res.length > 0) {
        //                 for (let i = 0; i < this.res.length; i++) {
        //                     if (this.res[i] != 'f') {
        //                         iTem.push(this.res[i]);
        //                     }
        //                 }
        //
        //             }
        //             this.res = iTem;
        //         }
        //     },
        //     'ruleForm.officialAccounts': function (val) {//公司微信公众号
        //         const data = this.getData;
        //         const oldVal = data.officialAccounts;
        //         let iTem = [];
        //         if (val != oldVal) {
        //             this.modifyBtnDisabled = false;
        //             this.res.push('g');
        //         } else {
        //             if (this.res.length > 0) {
        //                 for (let i = 0; i < this.res.length; i++) {
        //                     if (this.res[i] != 'g') {
        //                         iTem.push(this.res[i]);
        //                     }
        //                 }
        //
        //             }
        //             this.res = iTem;
        //         }
        //     },
        //     'ruleForm.serviceNumber': function (val) {//公司微信服务号
        //         const data = this.getData;
        //         const oldVal = data.serviceNumber;
        //         let iTem = [];
        //         if (val != oldVal) {
        //             this.modifyBtnDisabled = false;
        //             this.res.push('h');
        //         } else {
        //             if (this.res.length > 0) {
        //                 for (let i = 0; i < this.res.length; i++) {
        //                     if (this.res[i] != 'h') {
        //                         iTem.push(this.res[i]);
        //                     }
        //                 }
        //
        //             }
        //             this.res = iTem;
        //         }
        //     },
        //     'ruleForm.principalName': function (val) {//负责人姓名
        //         const data = this.getData;
        //         const oldVal = data.principalName;
        //         let iTem = [];
        //         if (val != oldVal) {
        //             this.modifyBtnDisabled = false;
        //             this.res.push('i');
        //         } else {
        //             if (this.res.length > 0) {
        //                 for (let i = 0; i < this.res.length; i++) {
        //                     if (this.res[i] != 'i') {
        //                         iTem.push(this.res[i]);
        //                     }
        //                 }
        //
        //             }
        //             this.res = iTem;
        //         }
        //     },
        //     'ruleForm.principalPhone': function (val) {//负责人电话
        //         const data = this.getData;
        //         const oldVal = data.principalPhone;
        //         let iTem = [];
        //         if (val != oldVal) {
        //             this.modifyBtnDisabled = false;
        //             this.res.push('j');
        //         } else {
        //             if (this.res.length > 0) {
        //                 for (let i = 0; i < this.res.length; i++) {
        //                     if (this.res[i] != 'j') {
        //                         iTem.push(this.res[i]);
        //                     }
        //                 }
        //
        //             }
        //             this.res = iTem;
        //         }
        //     },
        //     'ruleForm.principalEmail': function (val) {//负责人邮箱
        //         const data = this.getData;
        //         const oldVal = data.principalEmail;
        //         let iTem = [];
        //         if (val != oldVal) {
        //             this.modifyBtnDisabled = false;
        //             this.res.push('k');
        //         } else {
        //             if (this.res.length > 0) {
        //                 for (let i = 0; i < this.res.length; i++) {
        //                     if (this.res[i] != 'k') {
        //                         iTem.push(this.res[i]);
        //                     }
        //                 }
        //
        //             }
        //             this.res = iTem;
        //         }
        //     }
        // }

    }
</script>
<style scoped lang="less" type="text/less">
    body {
        section {

            .company-details-Modify {
                h4 {
                    font-size: 18px;
                }
                .base64-upload {
                    position: relative;
                    width: 200px;
                    height: 150px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    input {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        opacity: 0;
                    }
                }

                .area-select .area-selected-trigger {
                    padding: 0 0 0 10px;
                    line-height: 32px;
                }

                > div {
                    margin: 30px 0;
                    div {
                        > label {
                            float: left;
                            width: 170px;
                            font-weight: normal;
                        }
                        .el-checkbox + .el-checkbox {
                            margin: 0;
                        }
                    }
                    .Marital-type,
                    .sex-type,
                    .Sources-of-funding {
                        > label {
                            width: auto;
                        }
                    }

                    .checkBox-greatSchool {
                        label {
                            > span {
                                > i {
                                    display: inline-block;
                                    width: 22px;
                                    height: 22px;
                                    line-height: 22px;
                                    text-align: center;
                                    font-size: 12px;
                                    color: #fff;
                                    border-radius: 50%;
                                }
                            }
                        }
                        label.Not-ideal {
                            > span {
                                > i {
                                    background: #f75355;
                                }
                            }
                        }
                        label.qualified {
                            > span {
                                > i {
                                    background: #fbaa60;
                                }
                            }
                        }
                        label.good {
                            > span {
                                > i {
                                    background: #83bb71;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

</style>

