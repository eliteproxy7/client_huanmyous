<template>
    <section>
        <el-row style="margin: 20px 0;">
            <el-col :span="15">
                <h5 v-show="isCreateModifyShow">创建客户</h5>
                <h5 v-show="!isCreateModifyShow">修改客户信息</h5>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" status-icon>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="ruleForm.name" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="phone">
                        <el-input v-model.number="ruleForm.phone" maxLength="11" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="ruleForm.email" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="ruleForm.sex" class="sex-type">
                            <el-radio label="1" :label="1">先生</el-radio>
                            <el-radio label="0" :label="0">女士</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="微信">
                        <el-input v-model="ruleForm.weixin" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="QQ">
                        <el-input v-model="ruleForm.qq" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="投资目的">
                        <el-checkbox-group v-model="ruleForm.investmentObjective" class="clearfix">
                            <el-checkbox label="长期持有"></el-checkbox>
                            <el-checkbox label="自住"></el-checkbox>
                            <el-checkbox label="增值投资"></el-checkbox>
                            <el-checkbox label="租金收益"></el-checkbox>
                            <el-checkbox label="儿女留学居住"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="资金来源">
                        <el-radio-group v-model="ruleForm.capitalSource" class="Sources-of-funding">
                            <el-radio label="国内来源">国内来源</el-radio>
                            <el-radio label="海外资金">海外资金</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="房型倾向">
                        <el-checkbox-group v-model="ruleForm.tendencyRoom" class="clearfix">
                            <el-checkbox label="独栋别墅"></el-checkbox>
                            <el-checkbox label="联排别墅"></el-checkbox>
                            <el-checkbox label="公寓"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="价位倾向">
                        <el-checkbox-group v-model="ruleForm.tendencyPrice" class="clearfix">
                            <el-checkbox label="100万人民币以内"></el-checkbox>
                            <el-checkbox label="100-200万人民币"></el-checkbox>
                            <el-checkbox label="200-400万人民币"></el-checkbox>
                            <el-checkbox label="400-700万人民币"></el-checkbox>
                            <el-checkbox label="700-1000万人民币"></el-checkbox>
                            <el-checkbox label="1000万人民币以上"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="面积倾向">
                        <el-checkbox-group v-model="ruleForm.tendencySize" class="clearfix">
                            <el-checkbox label="100平米以内"></el-checkbox>
                            <el-checkbox label="150平米以内"></el-checkbox>
                            <el-checkbox label="200平米以内"></el-checkbox>
                            <el-checkbox label="250平米以内"></el-checkbox>
                            <el-checkbox label="300平米以内"></el-checkbox>
                            <el-checkbox label="400平米以内"></el-checkbox>
                            <el-checkbox label="500平米以内"></el-checkbox>
                            <el-checkbox label="500平米以上"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="学区评分倾向">
                        <el-checkbox-group v-model="ruleForm.greatSchool" class="checkBox-greatSchool">
                            <el-tooltip class="item" effect="dark" content="不理想" placement="top">
                                <el-checkbox label="1~5" class="Not-ideal">
                                    <i>1</i> ~ <i>5</i>
                                </el-checkbox>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="合格" placement="top">
                                <el-checkbox label="6~7" class="qualified">
                                    <i>6</i> ~ <i>7</i>
                                </el-checkbox>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="优秀" placement="top">
                                <el-checkbox label="8~10" class="good">
                                    <i>8</i> ~ <i>10</i>
                                </el-checkbox>
                            </el-tooltip>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="城市倾向">
                        <el-input v-model="ruleForm.tendencySite" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="目前所在地">
                        <div class="Site_now">
                            <area-cascader type='text' :level='1' placeholder="请选择地区" v-model="ruleForm.locationSite" :data="ruleForm.pcaa"></area-cascader>
                        </div>
                    </el-form-item>
                    <el-form-item label="详细地址">
                        <el-input v-model="ruleForm.address" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="出生日期">
                        <div class="block">
                            <span class="demonstration"></span>
                            <el-date-picker
                                v-model="ruleForm.birthdate"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="婚姻状况">
                        <el-radio-group v-model="ruleForm.marital" class="Marital-type">
                            <el-radio :label="0">已婚</el-radio>
                            <el-radio :label="1">未婚</el-radio>
                            <el-radio :label="2">保密</el-radio>
                            <el-radio :label="3">离异</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="工作行业">
                        <el-input v-model="ruleForm.jobType" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="职称">
                        <el-input v-model="ruleForm.jobtitle" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="年收入">
                        <el-input v-model="ruleForm.income" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="客户来源途径" v-show="!isCreateModifyShow">
                        <p>{{ruleForm.source}}</p>
                    </el-form-item>
                    <el-form-item style="text-align: center">
                        <el-button type="primary" @click="submitCreateModify" v-show="isCreateModifyShow" icon="iconfont icon-submit" style="margin: 0 30px">
                            提交创建
                        </el-button>
                        <el-button type="warning" @click="$router.back()" v-show="!isCreateModifyShow" icon="iconfont icon-cencel" style="margin: 0 30px">
                            取消修改
                        </el-button>
                        <el-button type="primary" :disabled="modifyBtnDisabled" v-show="!isCreateModifyShow" icon="iconfont icon-submit" :revise="revise" style="margin: 0 30px"
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
    // 省市区三级联动
    import { pcaa } from 'area-data'; // v5 or higher

    export default {
        data() {
            return {
                isCreateModifyShow: true,     //判断是修改还是创建客户
                ruleForm: {
                    name: '',       //姓名
                    phone: '',     //电话
                    email: '',     //邮箱
                    sex: '1',       //性别
                    weixin: '',     //weixin
                    qq: '',         //QQ
                    investmentObjective: [],        //投资目的
                    capitalSource: '',    //资金来源
                    tendencyRoom: [],       //房型倾向
                    tendencyPrice: [],      //价位倾向
                    tendencySize: [],       //面积倾向
                    greatSchool: [],     //学区评分倾向
                    tendencySite: '',   //城市倾向
                    locationSite: [],       //目前所在地
                    address: '',     //目前所在地详细地址
                    pcaa: pcaa,        //目前所在地存数据
                    birthdate: '',       //出生日期
                    marital: '0',    //婚姻状况
                    jobType: '',        //工作行业
                    jobtitle: '',         //职称
                    income: '',      //年收入
                    source: '',//客户来源途径
                },
                rules: {//表单验证规则
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                    ],
                    phone: [
                        {required: true, validator: this.phone_validation, trigger: 'blur',}
                    ],
                    email: [
                        {required: true, validator: this.email_validation, trigger: 'blur',}
                    ],
                },
                clientId: this.$route.query.clientId,   //客户id
                modifyBtnDisabled: false,   //修改按钮的状态
                getData: {}, //用来存校验数据
                res: []   // 判断所有字段到底有没有修改，每个字段存入单独标识符

            };
        },
        created() {
        },
        mounted() {
            this.getClientData();
        },
        computed: {
            revise() {//判断是否有修改的字段，并解除disabled
                if (this.res.length == 0) {
                    this.modifyBtnDisabled = true;
                }
            },
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

        methods: {
            getClientData() {//获取要修改的客户的数据并赋值到页面
                if (this.clientId) {//判断有clientid则为修改，加载客户信息
                    this.isCreateModifyShow = false;
                    this.$get('client/detail/'+ this.clientId).then(res => {
                        let data = res.data;
                        this.getData = data;
                        this.ruleForm.name = data.name;
                        this.ruleForm.phone = parseInt(data.phone);
                        this.ruleForm.email = data.email;
                        this.ruleForm.sex = data.sex;
                        this.ruleForm.weixin = data.weixin;
                        this.ruleForm.qq = data.qq;
                        this.ruleForm.investmentObjective = data.investmentObjective ? data.investmentObjective.split(',') : [];
                        this.ruleForm.capitalSource = data.capitalSource;
                        this.ruleForm.tendencyRoom = data.tendencyRoom ? data.tendencyRoom.split(',') : [];
                        this.ruleForm.tendencyPrice = data.tendencyPrice ? data.tendencyPrice.split(',') : [];
                        this.ruleForm.tendencySize = data.tendencySize ? data.tendencySize.split(',') : [];
                        this.ruleForm.greatSchool = data.tendencySchool ? data.tendencySchool.split(',') : [];
                        this.ruleForm.tendencySite = data.tendencySite;
                        this.ruleForm.locationSite = [data.province ? data.province : '', data.city ? data.city : '', data.area ? data.area : ''];
                        this.ruleForm.address = data.address;
                        this.ruleForm.birthdate = this.momentFormat(data.birthdate, 'YYYY-MM-DD');
                        this.ruleForm.marital = data.marital;
                        this.ruleForm.jobType = data.jobType;
                        this.ruleForm.jobtitle = data.jobTitle;
                        this.ruleForm.income = data.income;
                        this.ruleForm.source = data.source;
                    });
                }
            },
            submitCreateModify() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        if (this.clientId) {
                            this.$put('/client/update', {
                                clientId: this.clientId,
                                name: this.ruleForm.name,
                                phone: this.ruleForm.phone,
                                email: this.ruleForm.email,
                                sex: this.ruleForm.sex,
                                weixin: this.ruleForm.weixin,
                                qq: this.ruleForm.qq,
                                investmentObjective: this.ruleForm.investmentObjective.toString(),
                                capitalSource: this.ruleForm.capitalSource,
                                tendencyRoom: this.ruleForm.tendencyRoom.toString(),
                                tendencyPrice: this.ruleForm.tendencyPrice.toString(),
                                tendencySize: this.ruleForm.tendencySize.toString(),
                                tendencySchool: this.ruleForm.greatSchool.toString(),
                                tendencySite: this.ruleForm.tendencySite,
                                province: this.ruleForm.locationSite[0],
                                city: this.ruleForm.locationSite[1],
                                area: this.ruleForm.locationSite[2],
                                address: this.ruleForm.address,
                                birthdate: this.ruleForm.birthdate,
                                marital: this.ruleForm.marital,
                                jobType: this.ruleForm.jobType,
                                jobTitle: this.ruleForm.jobtitle,
                                income: this.ruleForm.income
                            }).then(res => {
                                const data = res;
                                if (data.status == 0) {
                                    this.$message.success('修改成功!');
                                    this.$router.push({path: '/consultant_clientList'});
                                } else {
                                    this.$message.warning(data.msg)
                                }
                            })
                        } else {
                            this.$post('/client/signin', {
                                source: '2',
                                uuid: '',
                                msg: '',
                                msgId: '',
                                name: this.ruleForm.name,
                                phone: this.ruleForm.phone,
                                email: this.ruleForm.email,
                                sex: this.ruleForm.sex,
                                weixin: this.ruleForm.weixin,
                                qq: this.ruleForm.qq,
                                investmentObjective: this.ruleForm.investmentObjective.toString(),
                                capitalSource: this.ruleForm.capitalSource,
                                tendencyRoom: this.ruleForm.tendencyRoom.toString(),
                                tendencyPrice: this.ruleForm.tendencyPrice.toString(),
                                tendencySize: this.ruleForm.tendencySize.toString(),
                                tendencySchool: this.ruleForm.greatSchool.toString(),
                                tendencySite: this.ruleForm.tendencySite,
                                province: this.ruleForm.locationSite[0],
                                city: this.ruleForm.locationSite[1],
                                area: this.ruleForm.locationSite[2],
                                address: this.ruleForm.address,
                                birthdate: this.ruleForm.birthdate,
                                marital: this.ruleForm.marital,
                                jobType: this.ruleForm.jobType,
                                jobTitle: this.ruleForm.jobtitle,
                                income: this.ruleForm.income
                            }).then(res => {
                                const data = res;
                                if (data.status == 0) {
                                    this.$message.success('创建成功!');
                                    this.$router.push({path: '/consultant_clientList'});
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


        },
        // watch: {
        //     'ruleForm.name': function (val) {//name
        //         const data = this.getData;  //数据
        //         const oldVal = data.name; //比对的对象
        //         let iTem = []; // 判断到底原数据有没有改动
        //         if (val != oldVal) {
        //             this.modifyBtnDisabled = false;
        //             this.res.push('a');   //push 标识符
        //         } else {
        //             if (this.res.length > 0) {
        //                 for (let i = 0; i < this.res.length; i++) {
        //                     if (this.res[i] != 'a') {  //如果数据相同 删除自己的标识符 保留其他人的标识
        //                         iTem.push(this.res[i]);
        //                     }
        //                 }
        //             }
        //             this.res = iTem;
        //         }
        //     },
        //     'ruleForm.phone': function (val) {//phone
        //         const data = this.getData;
        //         const oldVal = data.phone;
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
        //     'ruleForm.email': function (val) {//email
        //         const data = this.getData;
        //         const oldVal = data.email;
        //         let iTem = [];
        //         if (val != oldVal) {
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
        //     'ruleForm.sex': function (val) {//sex
        //         const data = this.getData;
        //         const oldVal = data.sex;
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
        //     'ruleForm.weixin': function (val) {//weixin
        //         const data = this.getData;
        //         const oldVal = data.weixin;
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
        //             }
        //             this.res = iTem;
        //         }
        //     },
        //     'ruleForm.qq': function (val) {//qq
        //         const data = this.getData;
        //         const oldVal = data.qq;
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
        //             }
        //             this.res = iTem;
        //         }
        //     },
        //     'ruleForm.investmentObjective': function (val) {//投资目的
        //         const data = this.getData;
        //         let arr = [];
        //         let iTem = [];
        //         const oldVal = data.investmentObjective ? data.investmentObjective.split(',') : '';
        //         for (let i = 0; i < val.length; i++) {
        //             arr.push(val[i]);
        //         }
        //         if (oldVal) {
        //             if (arr.sort().toString() != oldVal.sort().toString()) {
        //                 this.modifyBtnDisabled = false;
        //                 this.res.push('g');
        //             } else {
        //                 if (this.res.length > 0) {
        //                     for (let i = 0; i < this.res.length; i++) {
        //                         if (this.res[i] != 'g') {
        //                             iTem.push(this.res[i]);
        //                         }
        //                     }
        //                 }
        //                 this.res = iTem;
        //             }
        //         } else {
        //             this.modifyBtnDisabled = true;
        //         }
        //
        //     },
        //     'ruleForm.capitalSource': function (val) {//资金来源
        //         const data = this.getData;
        //         const oldVal = data.capitalSource;
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
        //             }
        //             this.res = iTem;
        //         }
        //     },
        //     'ruleForm.tendencyRoom': function (val) {//房型倾向
        //         const data = this.getData;
        //         let arr = [];
        //         let iTem = [];
        //         const oldVal = data.tendencyRoom ? data.tendencyRoom.split(',') : '';
        //         for (let i = 0; i < val.length; i++) {
        //             arr.push(val[i]);
        //         }
        //         if (oldVal) {
        //             if (arr.sort().toString() != oldVal.sort().toString()) {
        //                 this.modifyBtnDisabled = false;
        //                 this.res.push('i');
        //             } else {
        //                 if (this.res.length > 0) {
        //                     for (let i = 0; i < this.res.length; i++) {
        //                         if (this.res[i] != 'i') {
        //                             iTem.push(this.res[i]);
        //                         }
        //                     }
        //                 }
        //                 this.res = iTem;
        //             }
        //         } else {
        //             this.modifyBtnDisabled = true;
        //         }
        //
        //     },
        //     'ruleForm.tendencyPrice': function (val) {//价位倾向
        //         const data = this.getData;
        //         let arr = [];
        //         let iTem = [];
        //         const oldVal = data.tendencyPrice ? data.tendencyPrice.split(',') : '';
        //         for (let i = 0; i < val.length; i++) {
        //             arr.push(val[i]);
        //         }
        //         if (oldVal) {
        //             if (arr.sort().toString() != oldVal.sort().toString()) {
        //                 this.modifyBtnDisabled = false;
        //                 this.res.push('j');
        //             } else {
        //                 if (this.res.length > 0) {
        //                     for (let i = 0; i < this.res.length; i++) {
        //                         if (this.res[i] != 'j') {
        //                             iTem.push(this.res[i]);
        //                         }
        //                     }
        //                 }
        //                 this.res = iTem;
        //             }
        //         } else {
        //             this.modifyBtnDisabled = true;
        //         }
        //
        //     },
        //     'ruleForm.tendencySize': function (val) {//面积倾向
        //         const data = this.getData;
        //         let arr = [];
        //         let iTem = [];
        //         const oldVal = data.tendencySize ? data.tendencySize.split(',') : '';
        //         for (let i = 0; i < val.length; i++) {
        //             arr.push(val[i]);
        //         }
        //         if (oldVal) {
        //             if (arr.sort().toString() != oldVal.sort().toString()) {
        //                 this.modifyBtnDisabled = false;
        //                 this.res.push('k');
        //             } else {
        //                 if (this.res.length > 0) {
        //                     for (let i = 0; i < this.res.length; i++) {
        //                         if (this.res[i] != 'k') {
        //                             iTem.push(this.res[i]);
        //                         }
        //                     }
        //                 }
        //                 this.res = iTem;
        //             }
        //         } else {
        //             this.modifyBtnDisabled = true;
        //         }
        //
        //     },
        //     'ruleForm.greatSchool': function (val) {//学校评分
        //         const data = this.getData;
        //         let arr = [];
        //         let iTem = [];
        //         const oldVal = data.tendencySchool ? data.tendencySchool.split(',') : '';
        //         for (let i = 0; i < val.length; i++) {
        //             arr.push(val[i]);
        //         }
        //         if (oldVal) {
        //             if (arr.sort().toString() != oldVal.sort().toString()) {
        //                 this.modifyBtnDisabled = false;
        //                 this.res.push('l');
        //             } else {
        //                 if (this.res.length > 0) {
        //                     for (let i = 0; i < this.res.length; i++) {
        //                         if (this.res[i] != 'l') {
        //                             iTem.push(this.res[i]);
        //                         }
        //                     }
        //                 }
        //                 this.res = iTem;
        //             }
        //         } else {
        //             this.modifyBtnDisabled = true;
        //         }
        //
        //     },
        //     'ruleForm.tendencyCity': function (val) {//城市倾向
        //         const data = this.getData;
        //         const oldVal = data.tendencySite;
        //         let iTem = [];
        //         if (val != oldVal) {
        //             this.modifyBtnDisabled = false;
        //             this.res.push('m');
        //         } else {
        //             if (this.res.length > 0) {
        //                 for (let i = 0; i < this.res.length; i++) {
        //                     if (this.res[i] != 'm') {
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
        //             this.res.push('n');
        //         } else {
        //             if (this.res.length > 0) {
        //                 for (let i = 0; i < this.res.length; i++) {
        //                     if (this.res[i] != 'n') {
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
        //             this.res.push('o');
        //         } else {
        //             if (this.res.length > 0) {
        //                 for (let i = 0; i < this.res.length; i++) {
        //                     if (this.res[i] != 'o') {
        //                         iTem.push(this.res[i]);
        //                     }
        //                 }
        //             }
        //             this.res = iTem;
        //         }
        //     },
        //     'ruleForm.birthdate': function (val) {//出生日期
        //         const data = this.getData;
        //         let iTem = [];
        //         const oldVal = this.momentFormat(data.birthdate, 'YYYY-MM-DD');
        //         if (val != oldVal) {
        //             this.modifyBtnDisabled = false;
        //             this.res.push('p');
        //         } else {
        //             if (this.res.length > 0) {
        //                 for (let i = 0; i < this.res.length; i++) {
        //                     if (this.res[i] != 'p') {
        //                         iTem.push(this.res[i]);
        //                     }
        //                 }
        //             }
        //             this.res = iTem;
        //         }
        //     },
        //     'ruleForm.marital': function (val) {//婚姻状况
        //         const data = this.getData;
        //         const oldVal = data.marital;
        //         let iTem = [];
        //         if (val != oldVal) {
        //             this.modifyBtnDisabled = false;
        //             this.res.push('q');
        //         } else {
        //             if (this.res.length > 0) {
        //                 for (let i = 0; i < this.res.length; i++) {
        //                     if (this.res[i] != 'q') {
        //                         iTem.push(this.res[i]);
        //                     }
        //                 }
        //             }
        //             this.res = iTem;
        //         }
        //     },
        //     'ruleForm.WorkIndustry': function (val) {//行业
        //         const data = this.getData;
        //         const oldVal = data.jobType;
        //         let iTem = [];
        //         if (val != oldVal) {
        //             this.modifyBtnDisabled = false;
        //             this.res.push('r');
        //         } else {
        //             if (this.res.length > 0) {
        //                 for (let i = 0; i < this.res.length; i++) {
        //                     if (this.res[i] != 'r') {
        //                         iTem.push(this.res[i]);
        //                     }
        //                 }
        //             }
        //             this.res = iTem;
        //         }
        //     },
        //     'ruleForm.JobTitle': function (val) { //职称
        //         const data = this.getData;
        //         const oldVal = data.jobTitle;
        //         let iTem = [];
        //         if (val != oldVal) {
        //             this.modifyBtnDisabled = false;
        //             this.res.push('s');
        //         } else {
        //             if (this.res.length > 0) {
        //                 for (let i = 0; i < this.res.length; i++) {
        //                     if (this.res[i] != 's') {
        //                         iTem.push(this.res[i]);
        //                     }
        //                 }
        //             }
        //             this.res = iTem;
        //         }
        //     },
        //     'ruleForm.AnnualIncome': function (val) { //收入
        //         const data = this.getData;
        //         const oldVal = data.income;
        //         let iTem = [];
        //         if (val != oldVal) {
        //             this.modifyBtnDisabled = false;
        //             this.res.push('t');
        //         } else {
        //             if (this.res.length > 0) {
        //                 for (let i = 0; i < this.res.length; i++) {
        //                     if (this.res[i] != 't') {
        //                         iTem.push(this.res[i]);
        //                     }
        //                 }
        //             }
        //             this.res = iTem;
        //         }
        //     },

        // },


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
                    div {
                        > label {
                            width: 170px;
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

