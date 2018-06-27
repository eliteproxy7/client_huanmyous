<template>
    <div>
        <app-header></app-header>
        <el-row class="main row-bg" :gutter="30" type="flex" justify="space-around">
            <el-col :span="20" :style="{background: '#fff', padding: '30px'}">
                <el-col :span="16">
                    <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="200px" status-icon class="company-register-box">
                        <h4>企业信息 <span>请和证书上的内容保持一致</span></h4>
                        <el-form-item label="证件类型" prop="checkLicenseType">
                            <el-radio-group v-model="ruleForm.checkLicenseType" :selectLicenseType="selectLicenseType"
                                            class="licenseType-radio-box">
                                <el-radio label="1">普通营业执照（有独立的组织机构代码证）</el-radio>
                                <el-radio label="2">多证合一营业执照（没有独立的组织机构代码证）</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="公司名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="营业执照证件号" v-if="LicenseTypeisShow" prop="businessLicenseNumber">
                            <el-input v-model.number="ruleForm.businessLicenseNumber" maxLength="15"
                                      placeholder="格式为15位数字"></el-input>
                        </el-form-item>
                        <el-form-item label="组织机构代码" v-if="LicenseTypeisShow" prop="organizationCode">
                            <el-input v-model="ruleForm.organizationCode" maxLength="10"
                                      placeholder="格式为10位，'xxxxxxxx-x'"></el-input>
                        </el-form-item>
                        <el-form-item label="统一社会信用代码" v-if="!LicenseTypeisShow" prop="creditCode">
                            <el-input v-model="ruleForm.creditCode" maxLength="18" placeholder="格式为18位数字或字母"></el-input>
                        </el-form-item>
                        <el-form-item label="请根据以上选项上传本公司营业执照或多证合一照" prop="businessLicensePhoto">
                            <el-upload
                                ref="uploadBusinessLicense"
                                action="http://beta-business.mf-data.com/api/v1/upload/single/4"
                                :before-upload="beforeAvatarUploadBusinessLicense"
                                :on-success="handleAvatarSuccessBusinessLicense"
                                :on-remove="handleRemoveBusinessLicense"
                                list-type="picture"
                                name="myFile"
                                :limit="1"
                                :auto-upload="false">
                                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUploadBusinessLicense">
                                    上传到服务器
                                </el-button>
                                <div slot="tip" class="el-upload__tip">只能上传1张图片，格式为jpg/png文件，且不超过2M</div>
                                <div slot="tip" class="el-upload__tip">上传并提交修改成功后将会覆盖原来的图片，如果您不修改图片可跳过此项。</div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="公司联系电话" prop="companyTel">
                            <el-input v-model.number="ruleForm.companyTel" maxLength="12"></el-input>
                        </el-form-item>
                        <el-form-item label="公司联系邮箱" prop="companyEmail">
                            <el-input v-model="ruleForm.companyEmail"></el-input>
                        </el-form-item>
                        <el-form-item label="公司所在地" prop="companySite">
                            <div class="Site_now">
                                <area-cascader type='text' :level='1' placeholder="请选择地区" v-model="ruleForm.companySite" :data="ruleForm.pcaa"></area-cascader>
                            </div>
                        </el-form-item>
                        <el-form-item label="详细地址" prop="address">
                            <el-input v-model.trim="ruleForm.address"></el-input>
                        </el-form-item>
                        <el-form-item label="公司人数" prop="companyPeopleNumber">
                            <el-select v-model="ruleForm.companyPeopleNumber" placeholder="选择人数">
                                <el-option label="15人以下" value="15人以下"></el-option>
                                <el-option label="15人~50人" value="15人~50人"></el-option>
                                <el-option label="50人~100人" value="50人~100人"></el-option>
                                <el-option label="100人~200人" value="100人~200人"></el-option>
                                <el-option label="200人~500人" value="200人~500人"></el-option>
                                <el-option label="500人以上" value="500人以上"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="公司网站" prop="website">
                            <el-input v-model="ruleForm.website"></el-input>
                        </el-form-item>
                        <el-form-item label="请上传本公司Logo" prop="companyLogo">
                            <el-upload
                                ref="uploadLogo"
                                action="http://beta-business.mf-data.com/api/v1/upload/single/4"
                                :before-upload="beforeAvatarUploadLogo"
                                :on-success="handleAvatarSuccessLogo"
                                :on-remove="handleRemoveLogo"
                                list-type="picture"
                                name="myFile"
                                :limit="1"
                                :auto-upload="false">
                                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUploadLogo">
                                    上传到服务器
                                </el-button>
                                <div slot="tip" class="el-upload__tip">只能上传1张图片，格式为jpg/png文件，且不超过2M</div>
                                <div slot="tip" class="el-upload__tip">上传并提交修改成功后将会覆盖原来的图片，如果您不修改图片可跳过此项。</div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="公司微信公众号" prop="officialAccounts">
                            <el-input v-model="ruleForm.officialAccounts"></el-input>
                        </el-form-item>
                        <el-form-item label="请上传公众号二维码"  prop="QRCode">
                            <el-upload
                                ref="uploadQRCode"
                                action="http://beta-business.mf-data.com/api/v1/upload/single/4"
                                :before-upload="beforeAvatarUploadQRCode"
                                :on-success="handleAvatarSuccessQRCode"
                                :on-remove="handleRemoveQRCode"
                                list-type="picture"
                                name="myFile"
                                :limit="1"
                                :auto-upload="false">
                                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUploadQRCode">
                                    上传到服务器
                                </el-button>
                                <div slot="tip" class="el-upload__tip">只能上传1张图片，格式为jpg/png文件，且不超过2M</div>
                                <div slot="tip" class="el-upload__tip">上传并提交修改成功后将会覆盖原来的图片，如果您不修改图片可跳过此项。</div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="公司微信服务号" prop="serviceNumber">
                            <el-input v-model="ruleForm.serviceNumber"></el-input>
                        </el-form-item>

                        <h4>负责人信息</h4>
                        <el-form-item label="负责人姓名" prop="principalName">
                            <el-input v-model="ruleForm.principalName"></el-input>
                        </el-form-item>
                        <el-form-item label="负责人联系电话" prop="principalPhone">
                            <el-input v-model.number="ruleForm.principalPhone" maxLength="11"></el-input>
                        </el-form-item>
                        <el-form-item label="负责人邮箱" prop="principalEmail">
                            <el-input v-model="ruleForm.principalEmail"></el-input>
                        </el-form-item>

                        <h4>本账户管理员信息 <span>（登录使用）</span></h4>
                        <el-form-item label="管理员联系电话" prop="phone">
                            <el-input v-model.number="ruleForm.phone" maxLength="11"></el-input>
                        </el-form-item>
                        <el-form-item label="6位数验证码" prop="code" class="reg_code">
                            <el-input v-model.number="ruleForm.code" maxLength="6"></el-input>
                            <el-button type="primary" class="reg_code_btn" @click="sendCode" :disabled="code_disabled">
                                {{ codeText }}
                            </el-button>
                        </el-form-item>
                        <el-form-item class="submit-btn-box" style="text-align: center; margin: 60px 0 0 0">
                            <el-button type="success" @click="goLogin" style="margin: 0 30px">已有账号？请登录</el-button>
                            <el-button type="primary" @click="submitRegister" style="margin: 0 30px">提交注册
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-col>
        </el-row>
        <app-footer></app-footer>
    </div>


</template>

<script>
    import Header from '../components/header.vue'
    import Footer from '../components/footer.vue'
    // 省市区三级联动
    import { pcaa } from 'area-data'; // v5 or higher

    let phoneReg = /^(1)[3|4|5|6|7|8|9](\d){9}$/;
    let emailReg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;

    export default {
        data() {
            return {
                ruleForm: {
                    checkLicenseType: '1', //选择的证件类型
                    name: '', //公司名称
                    businessLicenseNumber: '',  //营业执照证件号
                    organizationCode: '',  //组织机构代码
                    creditCode: '',  //统一社会信用代码
                    companyTel: '',  //公司联系电话
                    companyEmail: '',  //公司联系邮箱
                    companySite: [],//公司所在地
                    pcaa: pcaa,        //公司所在地存数据
                    address: '',  //详细地址
                    companyPeopleNumber: '',  //公司人数
                    website: '', //公司网站
                    officialAccounts: '',   //公司微信公众号
                    serviceNumber: '',      //公司微信服务号
                    principalName: '',       //负责人姓名
                    principalPhone: '',    //负责人联系电话
                    principalEmail: '',        //负责人邮箱
                    phone: '',         //管理员联系电话
                    code: '',      //6位数验证码
                },
                rules: {//表单验证规则
                    checkLicenseType: [
                        {required: true, message: '请选择证件类型', trigger: 'change'}
                    ],
                    name: [
                        {required: true, message: '请输入公司名称不能含有空格、不能为空！', trigger: 'blur'}
                    ],
                    businessLicenseNumber: [
                        {required: true, validator: this.fifteen_Places, trigger: 'blur'}
                    ],
                    organizationCode: [
                        {required: true, validator: this.ten_Places, trigger: 'blur'}
                    ],
                    creditCode: [
                        {required: true, validator: this.eighteenth_Places, trigger: 'blur'}
                    ],
                    companyTel: [
                        {required: true, message: '请输入联系电话'},
                        {type: 'number', message: '格式为400电话或者固话，可参考：400-888-8888 / 010-88888888'},
                    ],
                    companyEmail: [
                        {required: true, validator: this.email_validation, trigger: 'blur',}
                    ],
                    address: [
                        {required: true, message: '请输入详细地址，不能含有空格、不能为空！', trigger: 'blur'}
                    ],
                    companyPeopleNumber: [
                        {required: true, message: '请选择公司人数', trigger: 'change'}
                    ],
                    website: [
                        {required: true, message: '请输入公司网站，不能含有空格、不能为空！', trigger: 'blur'}
                    ],
                    officialAccounts: [
                        {required: true, message: '请输入公司微信公众号，不能含有空格、不能为空！', trigger: 'blur'}
                    ],
                    principalName: [
                        {required: true, message: '请输入负责人姓名，不能含有空格、不能为空！', trigger: 'blur'}
                    ],
                    principalPhone: [
                        {required: true, validator: this.phone_validation, trigger: 'blur'}
                    ],
                    principalEmail: [
                        {required: true, validator: this.email_validation, trigger: 'blur',}
                    ],
                    phone: [
                        {required: true, validator: this.phone_validation, trigger: 'blur'}
                    ],
                    code: [
                        {required: true, validator: this.code_validation, trigger: 'blur'}
                    ],
                    businessLicensePhoto: [
                        {required: true, validator: this.BusinessLicensePhoto_validation}
                    ],
                    companyLogo: [
                        {required: true, validator: this.CompanyLogo_validation}
                    ],
                    QRCode: [
                        {required: true, validator: this.QRCode_validation}
                    ],
                },
                businessLicensePhoto: [],  //公司营业执照或多证合一照
                isUpdateBusinessLicensePhoto: false,  //判断是否上传了公司营业执照或多证合一照
                companyLogo: [],   //请上传公司Logo
                isUpdateCompanyLogo: false,  //判断是否上传了公司Logo
                QRCode: [],     //请上传公众号二维码
                isUpdateQRCode: false,  //判断是否上传了公众号二维码
                LicenseTypeisShow: true,     //判断证件类型的显示隐藏
                verificationCode: '', //验证码的验证串
                codeTime: 0,  //获取验证码倒计时
                codeText: '获取验证码',  //获取验证码按钮的提示文本
                code_disabled: false, //获取验证码按钮的状态
            }
        },
        created() {
        },
        mounted() {
            this.isLogin(); //判断是否已经登录
        },
        computed: {
            selectLicenseType() {//判断选择普通营业执照or多证合一营业执照
                if (this.ruleForm.checkLicenseType == 1) {
                    this.LicenseTypeisShow = true;
                } else {
                    this.LicenseTypeisShow = false;
                }
            },

        },
        methods: {
            // 判断是否已经登录
            isLogin() {
                if (localStorage.userid || localStorage.roleId) {
                    this.$message.success('您已登录，将为您跳转至账户主页。');
                    setTimeout(timeout => {
                        if (localStorage.roleId == 1) {
                            this.$router.push({path: '/company'});
                        } else if (localStorage.roleId == 2) {
                            this.$router.push({path: '/conseltant'});
                        }
                    }, 2000)
                }
                // 防刷新：检测是否存在倒计时计算localStorage.codeTime
                if (localStorage.codeTime) {
                    this.codeTime = parseInt(localStorage.codeTime);
                    this.codeText = this.codeTime + "s后重新获取";
                    this.code_disabled = true;
                    let resend = setInterval(function () {
                        this.codeTime--;
                        if (this.codeTime > 0) {
                            this.codeText = this.codeTime + "s后重新获取";
                            localStorage.codeTime = this.codeTime;
                        } else {
                            localStorage.removeItem('codeTime');
                            clearInterval(resend);
                            this.codeText = '获取验证码';
                            this.code_disabled = true;
                        }
                    }, 1000);
                }
            },
            //判断营业执照证件号是否为15位数
            fifteen_Places(rule, value, callback) {
                if (parseInt(value).toString().length == 15) {
                    callback()
                } else {
                    callback(new Error('请输入营业执照证件号，格式为15位数字，不能含有空格、不能为空！'))
                }
            },
            //判断组织机构代码是否为10位数
            ten_Places(rule, value, callback) {
                if (value.toString().length == 10) {
                    callback()
                } else {
                    callback(new Error('请输入组织机构代码，格式为10位，例如：xxxxxxxx-x，不能含有空格、不能为空！'))
                }
            },
            //判断统一社会信用代码是否为18位数
            eighteenth_Places(rule, value, callback) {
                if (parseInt(value).toString().length == 18) {
                    callback()
                } else {
                    callback(new Error('请输入统一社会信用代码，格式为18位数字或字母，不能含有空格、不能为空！'))
                }
            },
            //发送验证码
            sendCode() {
                let phone = this.ruleForm.phone;
                // 手机号正则验证
                if (phoneReg.test(phone)) {// 手机号符合验证
                    this.codeTime = 60;
                    this.code_disabled = true;
                    this.codeCountdown();
                    this.$get('sms/code/register/' + phone).then(res => {
                        const data = res.data;
                        if (data.status == 0) {
                            this.buttonDisabled = false;
                            this.verificationCode = data.data;
                            this.$message.success('发送成功，请您耐心等待短信通知。');
                        }
                    })
                } else {
                    this.$message.warning('手机号格式错误。');
                }
            },
            //验证码倒计时计算
            codeCountdown() {
                if (this.codeTime > 0) {
                    this.codeTime--;
                    this.codeText = this.codeTime + "s后重新获取";
                    setTimeout(this.codeCountdown, 1000);
                    localStorage.codeTime = this.codeTime;
                } else {
                    this.codeTime = 0;
                    this.codeText = "获取验证码";
                    this.code_disabled = false;
                    localStorage.removeItem('codeTime');
                }
            },
            //公司证件照片——上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
            beforeAvatarUploadBusinessLicense(file) {
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
            //公司证件照片——文件上传成功时的钩子
            handleAvatarSuccessBusinessLicense(res, file) {
                this.$message.success('图片提交成功，点击下面的提交按钮即可上传！');
                this.businessLicensePhoto = [{"url": 'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ res.data}];    //公司证件照片
                this.isUpdateBusinessLicensePhoto = true;
                this.$refs.ruleForm.validateField('businessLicensePhoto');
            },
            //公司证件照片——点击上传
            submitUploadBusinessLicense() {
                this.$refs.uploadBusinessLicense.submit();
            },
            //公司证件照片——已上传的文件列表移除某个文件时的钩子
            handleRemoveBusinessLicense(file, fileList) {
                this.$message.warning('图片移除成功，请重新选择公司证件照片上传！');
                this.businessLicensePhoto = [];    //公司证件照片
                this.isUpdateBusinessLicensePhoto = false;
                this.$refs.ruleForm.validateField('businessLicensePhoto');
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
                this.isUpdateCompanyLogo = true;
                this.$refs.ruleForm.validateField('companyLogo');
            },
            //公司Logo——点击上传
            submitUploadLogo() {
                this.$refs.uploadLogo.submit();
            },
            //公司Logo——已上传的文件列表移除某个文件时的钩子
            handleRemoveLogo(file, fileList) {
                this.$message.warning('图片移除成功，请重新选择公司Logo上传！');
                this.companyLogo = [];    //公司证件照片
                this.isUpdateCompanyLogo = false;
                this.$refs.ruleForm.validateField('companyLogo');
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
                this.QRCode = [{"url": 'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ res.data}];   //公众号二维码
                this.isUpdateQRCode = true;
                this.$refs.ruleForm.validateField('QRCode');
            },
            //公众号二维码——点击上传
            submitUploadQRCode() {
                this.$refs.uploadQRCode.submit();
            },
            //公众号二维码——已上传的文件列表移除某个文件时的钩子
            handleRemoveQRCode(file, fileList) {
                this.$message.warning('图片移除成功，请重新选择公司公众号二维码上传！');
                this.QRCode = [];    //公众号二维码
                this.isUpdateQRCode = false;
                this.$refs.ruleForm.validateField('QRCode');
            },

            //判断是否上传了公司营业执照或多证合一照——表单的自定义验证方法
            BusinessLicensePhoto_validation(rule, value, callback) {
                if (this.isUpdateBusinessLicensePhoto) {
                    callback()
                } else {
                    callback(new Error('请上传公司营业执照或多证合一照！'))
                }
            },
            //判断是否上传了公司Logo——表单的自定义验证方法
            CompanyLogo_validation(rule, value, callback) {
                if (this.isUpdateCompanyLogo) {
                    callback()
                } else {
                    callback(new Error('请上传公司Logo！'))
                }
            },
            //判断是否上传了公众号二维码——表单的自定义验证方法
            QRCode_validation(rule, value, callback) {
                if (this.isUpdateQRCode) {
                    callback()
                } else {
                    callback(new Error('请上传公司公众号二维码！'))
                }
            },

            //提交注册
            submitRegister() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.$post('/register', {
                            credentialType: this.ruleForm.checkLicenseType,   //证件类型
                            name: this.ruleForm.name, //公司名称
                            businessLicenseNumber: this.ruleForm.businessLicenseNumber,   //营业执照证件号
                            organizationCode: this.ruleForm.organizationCode, // 组织机构代码
                            creditCode: this.ruleForm.creditCode, // 统一社会信用代码
                            companyTel: this.ruleForm.companyTel,     // 公司联系电话
                            companyEmail: this.ruleForm.companyEmail,     // 公司联系邮箱
                            province: this.ruleForm.companySite[0],     // 公司所在地省
                            city: this.ruleForm.companySite[1], // 公司所在地市
                            area: this.ruleForm.companySite[2],     // 公司所在地区
                            address: this.ruleForm.address,   // 详细地址
                            scale: this.ruleForm.companyPeopleNumber,   // 公司人数
                            website: this.ruleForm.website,   // 公司网站
                            officialAccounts: this.ruleForm.officialAccounts, //公司微信公众号
                            serviceNumber: this.ruleForm.serviceNumber,   //公司微信服务号
                            principalName: this.ruleForm.principalName,   // 负责人姓名
                            principalPhone: this.ruleForm.principalPhone,     //负责人联系电话
                            principalEmail: this.ruleForm.principalEmail, //负责人邮箱
                            phone: this.ruleForm.phone,   // 管理员联系电话
                            code: this.ruleForm.code,     // 验证码
                            msgid: '123',
                            photo: this.businessLicensePhoto[0].url.split('.com/')[1],  //证件图片
                            logo: this.companyLogo[0].url.split('.com/')[1],  //公司Logo图片
                            officialAccountsQRCode: this.QRCode[0].url.split('.com/')[1],  //公众号二维码图片
                        }).then(res => {
                            const data = res;
                            if (data.status == 0) {
                                this.$message.success('注册成功！!');
                                this.$router.push({path: '/'});
                            } else {
                                this.$message.error(data.msg);
                            }
                        })
                    } else {
                        this.$message.warning('表单验证信息有误，请检查并重新输入！');
                    }
                });
            },
            //已有账号前往登录
            goLogin() {
                this.$router.push({path: '/'});
            }
        },
        components: {
            'app-header': Header,
            'app-footer': Footer
        }
    }
</script>
<style scoped lang="less" type="text/less">
    body {
        .reg_code {
            position: relative;
            .reg_code_btn {
                position: absolute;
                right: 0px;
                top: 0px;
            }
        }

        .main {
            padding: 30px;
            .company-register-box {
                >h4 {
                    font-size: 20px;
                    padding: 10px 0;
                    margin: 30px 0;
                    border-bottom: 1px dashed #d6d5d5;
                    > span {
                        font-size: 14px;
                        color: #858585;
                    }
                }
                >.el-form-item{
                    margin: 30px 0;
                    .licenseType-radio-box {
                        label:last-of-type {
                            margin: 10px 0 0 0;
                        }
                        .el-radio + .el-radio {
                            margin-left: 0;
                        }
                    }
                    .submit-btn-box {
                        button {
                            margin: 30px;
                        }
                    }
                }
            }
        }
    }
</style>

