<template>
    <section>
        <el-row style="margin: 20px 0;">
            <el-col :span="15">
                <h5 v-show="isCreateModifyShow">创建顾问</h5>
                <h5 v-show="!isCreateModifyShow">修改顾问信息</h5>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" status-icon>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="ruleForm.name" size="small" :disabled="!isCreateModifyShow"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="phone">
                        <el-input v-model.number="ruleForm.phone" maxLength="11" size="small" :disabled="!isCreateModifyShow"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="ruleForm.email" size="small" :disabled="!isCreateModifyShow"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-radio-group v-model="ruleForm.sex" class="sex-type" :disabled="!isCreateModifyShow">
                            <el-radio label="1" :label="1">先生</el-radio>
                            <el-radio label="0" :label="0">女士</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="负责售卖地区" prop="responsiblePlace">
                        <el-input v-model="ruleForm.responsiblePlace" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="工号">
                        <el-input v-model="ruleForm.jobNumber" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="微信号">
                        <el-input v-model="ruleForm.weixin" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="QQ号">
                        <el-input v-model="ruleForm.qq" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="顾问的名片">
                        <el-upload
                            ref="uploadBusinessCard"
                            action="http://beta-business.mf-data.com/api/v1/upload/single/4"
                            :before-upload="beforeAvatarUploadBusinessCard"
                            :on-success="handleAvatarSuccessBusinessCard"
                            :file-list="businessCard"
                            list-type="picture"
                            name="myFile"
                            :limit="2"
                            :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUploadBusinessCard">
                                上传到服务器
                            </el-button>
                            <div slot="tip" class="el-upload__tip">只能上传1张图片，格式为jpg/png文件，且不超过2M</div>
                            <div slot="tip" class="el-upload__tip">上传并提交修改成功后将会覆盖原来的图片，如果您不修改图片可跳过此项。</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="顾问的头像">
                        <el-upload
                            ref="uploadHeadPhoto"
                            action="http://beta-business.mf-data.com/api/v1/upload/single/4"
                            :before-upload="beforeAvatarUploadHeadPhoto"
                            :on-success="handleAvatarSuccessHeadPhoto"
                            :file-list="headPhoto"
                            list-type="picture"
                            name="myFile"
                            :limit="2"
                            :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUploadHeadPhoto">
                                上传到服务器
                            </el-button>
                            <div slot="tip" class="el-upload__tip">只能上传1张图片，格式为jpg/png文件，且不超过2M</div>
                            <div slot="tip" class="el-upload__tip">上传并提交修改成功后将会覆盖原来的图片，如果您不修改图片可跳过此项。</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item style="text-align: center">
                        <el-button v-ripple type="primary" @click="submitCreateModify" v-show="isCreateModifyShow" icon="iconfont icon-submit" style="margin: 0 30px">
                            提交创建
                        </el-button>
                        <el-button v-ripple type="warning" @click="$router.back()" v-show="!isCreateModifyShow" icon="iconfont icon-cencel" style="margin: 0 30px">
                            取消修改
                        </el-button>
                        <el-button v-ripple type="primary" :disabled="modifyBtnDisabled" v-show="!isCreateModifyShow" icon="iconfont icon-submit" style="margin: 0 30px"
                                   @click="submitCreateModify" :isModifyBtnDisabled="isModifyBtnDisabled">
                            提交修改
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
                isCreateModifyShow: true,   //判断是修改还是创建顾问
                ruleForm: {
                    name: '',       //姓名
                    phone: '',      //电话
                    email: '',      //邮箱
                    sex: '1',       //性别
                    responsiblePlace: '',   //负责售卖地区
                    jobNumber: '',  //工号
                    weixin: '',     //weixin
                    qq: ''          //QQ
                },
                rules: {//表单验证规则
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                    ],
                    phone: [
                        {required: true, validator: this.phone_validation, trigger: 'blur'}
                    ],
                    email: [
                        {required: true, validator: this.email_validation, trigger: 'blur'}
                    ],
                    responsiblePlace: [
                        {required: true, message: '请填写一个负责地区，如：洛杉矶/西雅图/旧金山/纽约', trigger: 'blur'}
                    ]
                },
                businessCard: [],   //名片
                headPhoto: [],      //头像
                counselorId: this.$route.query.counselorId,//顾问id
                modifyBtnDisabled: false,   //修改按钮的状态

            };
        },
        computed: {
            isModifyBtnDisabled(){
                // const serverData = this.getData;
                // let nowData = this.ruleForm;
                // console.log(nowData.name ,'-', serverData.name)
                // console.log(nowData.phone.toString() ,'-', serverData.phone)
                // if(nowData.name != serverData.name || nowData.phone.toString() != serverData.phone || nowData.email != serverData.email || nowData.sex != serverData.sex
                //     || nowData.weixin != serverData.weixin || nowData.qq != serverData.qq || nowData.investmentObjective != serverData.investmentObjective.split(',') || nowData.capitalSource != serverData.capitalSource
                //     || nowData.tendencyRoom != serverData.tendencyRoom.split(',') || nowData.tendencyPrice != serverData.tendencyPrice.split(',') || nowData.tendencySize != serverData.tendencySize.split(',') || nowData.tendencySchool != serverData.tendencySchool.split(',')
                //     || nowData.tendencySite != serverData.tendencySite || nowData.locationSite[0] != serverData.province || nowData.locationSite[1] != serverData.city || nowData.locationSite[2] != serverData.area
                //     || nowData.address != serverData.address || nowData.birthdate != this.momentFormat(serverData.birthdate, 'YYYY-MM-DD') || nowData.marital != serverData.marital || nowData.jobType != serverData.jobType
                //     || nowData.jobtitle != serverData.jobTitle || nowData.income != serverData.income){
                //     this.modifyBtnDisabled = false;
                // }else{
                //     this.modifyBtnDisabled = true;
                // }
            }
        },
        created() {
        },
        mounted() {
            this.getCounselorData();
        },
        methods: {
            getCounselorData() {//获取要修改的客户的数据并赋值到页面
                if (this.counselorId) {//判断有clientid则为修改，加载客户信息
                    this.isCreateModifyShow = false;
                    this.$get('counselor/detail?counselorId=' + this.counselorId).then(res => {
                        let data = res.data;
                        this.ruleForm.name = data.name;
                        this.ruleForm.phone = parseInt(data.phone);
                        this.ruleForm.email = data.email;
                        this.ruleForm.sex = data.sex;
                        this.ruleForm.responsiblePlace = data.responsiblePlace;
                        this.ruleForm.jobNumber = data.jobNumber;
                        this.ruleForm.weixin = data.weixin;
                        this.ruleForm.qq = data.qq;

                        this.businessCard = [{"url": 'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ data.businessCard}];    //顾问的名片
                        this.headPhoto = [{"url": 'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ data.photo}]; //顾问的头像
                    });
                }
            },
            //顾问的名片——上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
            beforeAvatarUploadBusinessCard(file) {
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
            //顾问的名片——文件上传成功时的钩子
            handleAvatarSuccessBusinessCard(res, file) {
                this.$message.success('图片提交成功，点击下面的提交按钮即可上传！');
                this.businessCard = [{"url": 'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ res.data}];    //公司Logo
            },
            //顾问的名片——点击上传
            submitUploadBusinessCard() {
                this.$refs.uploadBusinessCard.submit();
            },
            //顾问的头像——上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
            beforeAvatarUploadHeadPhoto(file) {
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
            //顾问的头像——文件上传成功时的钩子
            handleAvatarSuccessHeadPhoto(res, file) {
                this.$message.success('图片提交成功，点击下面的提交按钮即可上传！');
                this.headPhoto = [{"url": 'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ res.data}];    //公司Logo
            },
            //顾问的头像——点击上传
            submitUploadHeadPhoto() {
                this.$refs.uploadHeadPhoto.submit();
            },
            //点击提交修改
            submitCreateModify() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        if (this.counselorId) {
                            this.$put('/counselor/update', {
                                counselorId: this.counselorId,
                                // name: this.ruleForm.name,
                                // phone: this.ruleForm.phone,
                                // email: this.ruleForm.email,
                                // sex: this.ruleForm.sex,
                                jobNumber: this.ruleForm.jobNumber,
                                weixin: this.ruleForm.weixin,
                                qq: this.ruleForm.qq,
                                responsiblePlace: this.ruleForm.responsiblePlace,
                                businessCard: this.businessCard[0].url.split('.com/')[1],
                                photo: this.headPhoto[0].url.split('.com/')[1],
                            }).then(res => {
                                const data = res;
                                if (data.status == 0) {
                                    this.$message.success('修改成功！');
                                    this.$router.push('/company_consultantList');
                                } else {
                                    this.$message.warning(data.msg)
                                }
                            })
                        } else {
                            this.$post('/counselor/create', {
                                name: this.ruleForm.name,
                                phone: this.ruleForm.phone,
                                email: this.ruleForm.email,
                                sex: this.ruleForm.sex,
                                jobNumber: this.ruleForm.jobNumber,
                                weixin: this.ruleForm.weixin,
                                qq: this.ruleForm.qq,
                                responsiblePlace: this.ruleForm.responsiblePlace,
                                businessCard: this.businessCard[0].url.split('.com/')[1],
                                photo: this.headPhoto[0].url.split('.com/')[1],
                            }).then(res => {
                                const data = res;
                                if (data.status == 0) {
                                    this.$message.success('创建成功！');
                                    this.$router.push('/company_consultantList');
                                } else {
                                    this.$message.warning(data.msg)
                                }
                            })
                        }
                    } else {
                        this.$message.warning('表单验证信息有误，请检查并重新输入！');
                    }
                });
            },

            //点击上传图片
            submitUpload() {
                this.$refs.upload.submit();
                console.log(this.$refs)
            },
            //上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG、PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isPNG && isLt2M;
            },
            //文件上传成功时的钩子
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.$message.success('图片上传成功！');
            },
            //点击文件列表中已上传的文件时的钩子, 可以通过 file.response 拿到服务端返回数据
            handlePreview(file) {
                console.log(file);
            },
            //文件列表移除文件时的钩子
            handleRemove(file, fileList) {
                console.log(file, fileList, '文件列表移除文件');
            },

        }
    }
</script>
<style scoped lang="less" type="text/less">
    body {
        section {
            h5 {
                text-align: center;
            }
            form {
                > div {
                    margin: 30px 0;
                }
            }
        }
    }
</style>

