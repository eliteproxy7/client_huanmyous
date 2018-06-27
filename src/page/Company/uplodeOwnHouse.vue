<template>
    <section>
        <el-row>
            <el-col :span="15">
                <h5 v-show="isCreateModifyShow">上传自有房源</h5>
                <h5 v-show="!isCreateModifyShow">修改自有房源</h5>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" status-icon>
                    <el-form-item label="请根据以上选项上传本公司营业执照或多证合一照" prop="housePhoto">
                        <el-upload
                            ref="upload"
                            action="http://beta-business.mf-data.com/api/v1/upload/multiple/3"
                            :before-upload="beforeAvatarUpload"
                            :on-success="handleAvatarSuccess"
                            :on-remove="handleRemove"
                            :file-list="housePhotosItem"
                            list-type="picture"
                            multiple
                            name="myFile"
                            :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">
                                上传到服务器
                            </el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="房源的门牌号" prop="unitNumber">
                        <el-input v-model="ruleForm.unitNumber" placeholder="格式可参考：'306'"></el-input>
                    </el-form-item>
                    <el-form-item label="房源所在街道名称" prop="fullStreetAddress">
                        <el-input v-model="ruleForm.fullStreetAddress" placeholder="格式可参考：'606 Arcadia Terrace'"></el-input>
                    </el-form-item>
                    <el-form-item label="房源所在城市" prop="city">
                        <el-input v-model="ruleForm.city" placeholder="格式可参考：'Sunnyvale'"></el-input>
                    </el-form-item>
                    <el-form-item label="房源所在邮编" prop="zip">
                        <el-input v-model="ruleForm.zip" placeholder="格式可参考：'94085'"></el-input>
                    </el-form-item>
                    <el-form-item label="房源所在州" prop="state">
                        <el-select v-model="ruleForm.state" clearable filterable placeholder="请选择州">
                            <el-option
                                v-for="item in stateItem"
                                :key="item.englishName"
                                :label="item.chineseName"
                                :value="item.abbreviation">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="房源所在郡县" prop="county">
                        <el-input v-model="ruleForm.county" placeholder="格式可参考：'94085'"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="房源所在社区" prop="community">-->
                        <!--<el-input v-model="ruleForm.community" placeholder="格式为社区名，可参考：'Nob Hill'"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item label="房源一级类型" prop="houseType">
                        <el-select v-model="ruleForm.houseType" clearable filterable placeholder="请选择一级类型">
                            <el-option
                                v-for="item in houseTypeItem"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="房源二级类型" prop="houseSubtype">
                        <el-select v-model="ruleForm.houseSubtype" clearable filterable placeholder="请选择二级类型">
                            <el-option
                                v-for="item in houseSubtypeItem"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="房屋面积（sq.ft）" prop="livingArea">
                        <el-input v-model.number="ruleForm.livingArea" placeholder="格式为纯数字，可参考：'3088'"></el-input>
                    </el-form-item>
                    <el-form-item label="占地面积（sq.ft）" prop="lotArea">
                        <el-input v-model.number="ruleForm.lotArea" placeholder="格式为纯数字，可参考：'4000'"></el-input>
                    </el-form-item>
                    <el-form-item label="土地编号" prop="parcelId">
                        <el-input v-model.number="ruleForm.parcelId" placeholder="格式为纯数字，可参考：'2323123'"></el-input>
                    </el-form-item>
                    <el-form-item label="建筑年份" prop="yearBuilt">
                        <el-date-picker
                            v-model="ruleForm.yearBuilt"
                            type="year"
                            placeholder="请选择建筑年份"
                            :picker-options="timePickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <!--<el-form-item label="建筑风格" prop="style">-->
                        <!--<el-select v-model="ruleForm.style" clearable filterable placeholder="请选择建筑风格">-->
                            <!--<el-option-->
                                <!--v-for="item in styleItem"-->
                                <!--:key="item.explain"-->
                                <!--:label="item.explain"-->
                                <!--:value="item.name">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                    <el-form-item label="开发商名称" prop="builderName">
                        <el-input v-model.number="ruleForm.builderName" placeholder="格式可参考：'2323123'"></el-input>
                    </el-form-item>
                    <el-form-item label="经度" prop="longitude">
                        <el-input v-model.number="ruleForm.longitude" placeholder="格式为纯数字，格式可参考：'2017'"></el-input>
                    </el-form-item>
                    <el-form-item label="纬度" prop="latitude">
                        <el-input v-model.number="ruleForm.latitude" placeholder="格式为纯数字，格式可参考：'2017'"></el-input>
                    </el-form-item>
                    <el-form-item label="卧室数量（间）" prop="bedroomCount">
                        <el-input v-model.number="ruleForm.bedroomCount" placeholder="格式为纯数字，格式可参考：'3'"></el-input>
                    </el-form-item>
                    <el-form-item label="卫浴数量（间）" prop="bathroomCount">
                        <el-input v-model.number="ruleForm.bathroomCount" max="99" placeholder="格式为纯数字，格式可参考：'4'"></el-input>
                    </el-form-item>
                    <el-form-item label="完整卫浴数（间）" prop="fullBathroomCount">
                        <el-input v-model.number="ruleForm.fullBathroomCount" max="99" placeholder="格式为纯数字，格式可参考：'4'"></el-input>
                    </el-form-item>
                    <el-form-item label="1/2卫浴数量（间）" prop="halfBathroomCount">
                        <el-input v-model.number="ruleForm.halfBathroomCount" max="99" placeholder="格式为纯数字，格式可参考：'3'"></el-input>
                    </el-form-item>
                    <el-form-item label="3/4卫浴数量（间）" prop="threeQuarterBathroomCount">
                        <el-input v-model.number="ruleForm.threeQuarterBathroomCount" max="99" placeholder="格式为纯数字，格式可参考：'3'"></el-input>
                    </el-form-item>
                    <el-form-item label="1/4卫浴数量（间）" prop="oneQuarterBathroomCount">
                        <el-input v-model.number="ruleForm.oneQuarterBathroomCount" max="99" placeholder="格式为纯数字，格式可参考：'3'"></el-input>
                    </el-form-item>
                    <el-form-item label="房源价格（$）" prop="listPrice">
                        <el-input v-model.number="ruleForm.listPrice" placeholder="格式为纯数字，格式可参考：'1275000'"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="房源均价（$）" prop="averagePrice">-->
                        <!--<el-input v-model.number="ruleForm.averagePrice" placeholder="格式为纯数字，格式可参考：'1275000'"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="最近一年缴纳房产税（$）" prop="propertyTax">-->
                        <!--<el-input v-model.number="ruleForm.propertyTax" placeholder="格式为纯数字，格式可参考：'2016-1000'"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="预估月租（$）" prop="rentPrice">-->
                        <!--<el-input v-model.number="ruleForm.rentPrice" placeholder="格式为纯数字，格式可参考：'1275000'"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="物业费/年（$）" prop="hoaFee">-->
                        <!--<el-input v-model.number="ruleForm.hoaFee" placeholder="格式为纯数字，格式可参考：'1275000'"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item label="MLSId" prop="MLSId">
                        <el-input v-model.number="ruleForm.MLSId" placeholder="格式为纯数字，格式可参考：'1550280'"></el-input>
                    </el-form-item>
                    <el-form-item label="MLS名称" prop="MLSName">
                        <el-input v-model.number="ruleForm.MLSName" placeholder="格式为纯数字，格式可参考：'1550280'"></el-input>
                    </el-form-item>
                    <el-form-item label="MLS号码" prop="MLSNumber">
                        <el-input v-model.number="ruleForm.MLSNumber" placeholder="格式为纯数字，格式可参考：'1550280'"></el-input>
                    </el-form-item>
                    <el-form-item label="上市时间" prop="listingDate">
                        <el-date-picker
                            v-model="ruleForm.listingDate"
                            type="date"
                            align="center"
                            value-format="yyyy-MM-dd"
                            :picker-options="timePickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="上市类型" prop="listingCategory">
                        <el-radio-group v-model="ruleForm.listingCategory">
                            <el-radio label="Lease">Lease</el-radio>
                            <el-radio label="Purchase">Purchase</el-radio>
                            <el-radio label="Rent">Rent</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="上市标题" prop="listingTitle">
                        <el-input v-model="ruleForm.listingTitle" placeholder="格式可参考：'123123'"></el-input>
                    </el-form-item>
                    <el-form-item label="房源介绍" prop="listingDescription">
                        <el-input type="textarea" v-model="ruleForm.listingDescription" placeholder="请输入介绍内容"></el-input>
                    </el-form-item>
                    <el-form-item label="售卖状态" prop="listingStatus">
                        <el-radio-group v-model="ruleForm.listingStatus">
                            <el-radio label="Active">热卖中</el-radio>
                            <el-radio label="Cancelled">Cancelled</el-radio>
                            <el-radio label="Closed">Closed</el-radio>
                            <el-radio label="Expired">Expired</el-radio>
                            <el-radio label="Pending">Pending</el-radio>
                            <el-radio label="Withdrawn">Withdrawn</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="明星房源" prop="isStar">
                        <el-radio-group v-model="ruleForm.isStar">
                            <el-radio label="true">是</el-radio>
                            <el-radio label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item style="text-align: center">
                        <el-button type="primary" @click="submitCreateModify" v-show="isCreateModifyShow" icon="iconfont icon-submit" style="margin: 0 30px">
                            提交创建
                        </el-button>
                        <el-button type="warning" @click="$router.back()" v-show="!isCreateModifyShow" icon="iconfont icon-cencel" style="margin: 0 30px">
                            取消修改
                        </el-button>
                        <el-button type="primary" :disabled="modifyBtnDisabled" v-show="!isCreateModifyShow" icon="iconfont icon-submit" style="margin: 0 30px"
                                   @click="submitCreateModify">
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
                isCreateModifyShow: true,   //判断是修改还是创建房源
                houseId: this.$route.query.houseId,    //房源ID
                ruleForm: {
                    unitNumber: '',    //房源的门牌号
                    fullStreetAddress: '',    //房源所在街道名称
                    city: '',    //房源所在城市
                    zip: '',    //房源所在邮编
                    state: '',    //房源所在州
                    county: '',     //房源所在郡县
                    houseType: '',  //房屋一级类型
                    houseSubtype: '',  //房屋二级类型
                    livingArea: '', //房源面积
                    lotArea: '',    //占地面积
                    parcelId: '',    //土地编号
                    // community: '',  //社区
                    yearBuilt: '',   //建筑年份
                    // style: '',  //建筑风格
                    builderName: '',  //开发商名称
                    longitude: '',  //经度
                    latitude: '',  //纬度
                    bedroomCount: '',   //卧室数
                    bathroomCount: '',  //卫生间数
                    fullBathroomCount: '', //完整卫浴数
                    halfBathroomCount: '',  //1/2卫浴数
                    threeQuarterBathroomCount: '',   //3/4卫浴数
                    oneQuarterBathroomCount: '',   //1/4卫浴数
                    listPrice: '',   //价格
                    // averagePrice: '',   //均价
                    // propertyTax: '',    //房产税
                    // rentPrice: '',  //预估月租
                    // hoaFee: '',     //物业费
                    MLSId: '',  //MLSId
                    MLSName: '',  //MLS名称
                    MLSNumber: '',  //MLS号码
                    listingDate: '',  //上市时间
                    listingCategory: '',  //上市类型
                    listingTitle: '',  //上市标题
                    listingDescription: '',  //房源介绍
                    listingStatus: 'Active',  //售卖状态
                    isStar: 'false',  //是否明星房源
                },
                rules: {//表单验证规则
                    housePhoto: [
                        {required: true, validator: this.housePhoto_validation}
                    ],
                    unitNumber: [//房源的门牌号
                        {required: true, message: "必填项，格式可参考：'306'", trigger: 'blur'}
                    ],
                    fullStreetAddress: [//房源所在街道名称
                        {required: true, message: "必填项，格式可参考：'606 Arcadia Terrace'", trigger: 'blur'}
                    ],
                    city: [//房源所在城市
                        {required: true, message: "必填项，格式可参考：'Sunnyvale'", trigger: 'blur'}
                    ],
                    zip: [//房源所在邮编
                        {required: true, message: "必填项，格式可参考：'94085'", trigger: 'blur'}
                    ],
                    state: [//房源所在州
                        {required: true, message: "必填项，格式可参考：'CA'", trigger: 'blur'}
                    ],
                    // county: [//房源所在郡县
                    //     {message: "必填项，格式可参考：'Sunnyvale'", trigger: 'blur'}
                    // ],
                    // houseType: [//房源一级类型
                    //     {message: "请选择房源一级类型", trigger: 'blur'}
                    // ],
                    // houseSubtype: [//房屋二级类型
                    //     {message: "请选择房屋二级类型", trigger: 'blur'}
                    // ],
                    // livingArea: [//房源面积
                    //     {message: "必填项，格式为纯数字，可参考：'3088'", trigger: 'blur'}
                    // ],
                    // lotArea: [//占地面积
                    //     {message: "必填项，格式为纯数字，可参考：'4000'", trigger: 'blur'}
                    // ],
                    // parcelId: [//土地编号
                    //     {message: "必填项，格式为纯数字，可参考：'123123'", trigger: 'blur'}
                    // ],
                    // builderName: [//开发商名称
                    //     {message: "必填项，格式为纯数字，可参考：'123123'", trigger: 'blur'}
                    // ],
                    bedroomCount: [//卧室数
                        {required: true, message: "必填项，格式为纯数字，可参考：'2017'", trigger: 'blur'}
                    ],
                    bathroomCount: [//卫生间数
                        {required: true, message: "必填项，格式为纯数字，可参考：'2017'", trigger: 'blur'}
                    ],
                    listPrice: [//价格
                        {required: true, message: "必填项，格式为纯数字，可参考：'2017'", trigger: 'blur'}
                    ],
                    listingDate: [//上市时间
                        {required: true, message: "请选择上市时间", trigger: 'blur'}
                    ],
                    listingCategory: [//上市类型
                        {required: true, message: "请选择上市类型", trigger: 'blur'}
                    ],
                    // listingTitle: [//上市标题
                    //     {message: "必填项，格式为纯数字，可参考：'2017'", trigger: 'blur'}
                    // ],
                    listingStatus: [//售卖状态
                        {required: true, message: "请选择售卖状态", trigger: 'blur'}
                    ],
                },
                stateItem: [],  //美国50个州的数组
                houseTypeItem: [],  //房源一级类型数组
                houseSubtypeItem: [],  //房源二级类型数组
                // styleItem: [],  //建筑风格数组
                //日期选择器——选项配置
                timePickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    onPick(value){//判断clearable清除时间操作
                        // console.log(value)
                    }
                },

                modifyBtnDisabled: false,   //修改按钮的状态
                listingKey: '',//修改的时候用
                housePhotosItem: [],//获取该自有房源的图片
                housePhotosItemString: [],//图片数组转字符串
                isUpdateHousePhotos: false,  //判断是否上传了房源图片


            };
        },
        created() {
        },
        mounted() {
            this.getHouseType();
            this.getUSAFiftyState();//获取美国50个州的数组
            this.getHouseDetails();//获取要修改的自有房源的数据并赋值到页面
            if (this.houseId) {//获取房源图片数据
                this.getHousePhotosData();
            }
        },
        methods: {
            // 获取美国50个州的数组，遍历到select
            getUSAFiftyState() {
                this.$get('/own/roperty/state').then(res => {
                    if (res.status == 0) {
                        this.stateItem = res.data;
                    }
                });
            },
            // 获取房源一级、二级类型数组，遍历到select
            getHouseType() {
                this.$get('/own/property/type').then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.houseTypeItem = data.data;
                    }
                });
                this.$get('/own/property/subtype').then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.houseSubtypeItem = data.data;
                    }
                });
            },
            //获取房源图片数据
            getHousePhotosData(){
                this.$get('/house/photo/'+ this.houseId).then(res => {
                    if (res.status == 0) {
                        this.housePhotosItem = res.data.map(function(obj) {
                            let newArr = {};
                            newArr["url"] = 'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ obj;
                            return newArr;
                        });
                        // console.log( this.housePhotosItem)
                    }
                });
            },
            //获取要修改的自有房源的数据并赋值到页面
            getHouseDetails() {
                if (this.houseId) {//判断有houseId则为修改，加载自有房源信息
                    this.isCreateModifyShow = false;
                    this.isUpdateHousePhotos = true;//解开判断是否上传了房源图片的开关
                    this.$get('own/detail/'+ this.houseId).then(res => {
                        const data = res.data;
                        this.ruleForm.unitNumber = data.unitNumber; //房源的门牌号
                        this.ruleForm.fullStreetAddress = data.fullStreetAddress;    //房源所在街道名称
                        this.ruleForm.city = data.city;    //房源所在城市
                        this.ruleForm.zip = data.zip;    //房源所在邮编
                        this.ruleForm.state = data.province;    //房源所在州
                        this.ruleForm.county = data.county;     //房源所在郡县
                        this.ruleForm.houseType = data.houseType;  //房屋一级类型
                        this.ruleForm.houseSubtype = data.houseSubtype;  //房屋二级类型
                        this.ruleForm.livingArea = data.livingArea; //房源面积
                        this.ruleForm.lotArea = data.lotArea;    //占地面积
                        this.ruleForm.parcelId = data.parcelId;    //土地编号
                        this.ruleForm.yearBuilt = data.yearBuilt;   //建筑年份
                        this.ruleForm.builderName = data.builderName;  //开发商名称
                        this.ruleForm.longitude = data.longitude;  //经度
                        this.ruleForm.latitude = data.latitude;  //纬度
                        this.ruleForm.bedroomCount = data.bedroomCount;   //卧室数
                        this.ruleForm.bathroomCount = data.bathroomCount;  //卫生间数
                        this.ruleForm.fullBathroomCount = data.fullBathroomCount; //完整卫浴数
                        this.ruleForm.halfBathroomCount = data.halfBathroomCount;  //1/2卫浴数
                        this.ruleForm.threeQuarterBathroomCount = data.threeQuarterBathroomCount;   //3/4卫浴数
                        this.ruleForm.oneQuarterBathroomCount = data.oneQuarterBathroomCount;   //1/4卫浴数
                        this.ruleForm.listPrice = data.listPrice;   //价格
                        this.ruleForm.MLSId = data.MLSId;  //MLSId
                        this.ruleForm.MLSName = data.MLSName;  //MLS名称
                        this.ruleForm.MLSNumber = data.MLSNumber;  //MLS号码
                        this.ruleForm.listingDate = data.listingDate;  //上市时间
                        this.ruleForm.listingCategory = data.listingCategory;  //上市类型
                        this.ruleForm.listingTitle = data.listingTitle;  //上市标题
                        this.ruleForm.listingDescription = data.listingDescription;  //房源介绍
                        this.ruleForm.listingStatus = data.listingStatus;  //售卖状态
                        this.ruleForm.isStar = data.isStar.toString();  //是否明星房源
                        this.listingKey = data.listingKey;//修改的时候用
                    });
                }
            },
            //上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
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
            //文件上传成功时的钩子
            handleAvatarSuccess(res, file) {
                this.$message.success('图片提交成功，点击下面的提交按钮即可上传！');
                this.housePhotosItemString.push(res.data);
                this.isUpdateHousePhotos = true;
                this.$refs.ruleForm.validateField('housePhoto');
            },
            //点击上传图片
            submitUpload() {
                this.$refs.upload.submit();
            },
            //文件列表移除文件时的钩子
            handleRemove(file, fileList) {
                this.$delete('/own/delete/photo/'+ this.houseId +'?ossUrl='+ file.url.split('.com/')[1]).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.$message.success('图片删除成功！');
                        console.log(file, fileList, '文件列表移除文件');
                        if(fileList.length == 0){
                            this.isUpdateHousePhotos = false;
                            this.$refs.ruleForm.validateField('housePhoto');
                        }else{
                            this.isUpdateHousePhotos = true;
                            this.$refs.ruleForm.validateField('housePhoto');
                        }
                    } else {
                        this.$message.error(data.msg)
                    }
                })
            },
            //判断是否上传了房源图片
            housePhoto_validation(rule, value, callback) {
                if (this.isUpdateHousePhotos) {
                    callback()
                } else {
                    callback(new Error('请上传房源图片！'))
                }
            },
            submitCreateModify() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        if (this.houseId) {
                            this.$post('/own/save', {
                                houseId: this.houseId,//修改的时候用
                                listingKey: this.listingKey,//修改的时候用
                                unitNumber: this.ruleForm.unitNumber,//房源的门牌号
                                fullStreetAddress: this.ruleForm.fullStreetAddress,//房源所在街道名称
                                city: this.ruleForm.city,//房源所在城市
                                zip: this.ruleForm.zip,//房源所在邮编
                                state: this.ruleForm.state,//房源所在州
                                county: this.ruleForm.county,//房源所在郡县
                                houseType: this.ruleForm.houseType,//房屋一级类型
                                houseSubtype: this.ruleForm.houseSubtype,//房屋二级类型
                                livingArea: this.ruleForm.livingArea,//房源面积
                                lotArea: this.ruleForm.lotArea,//占地面积
                                parcelId: this.ruleForm.parcelId,//土地编号
                                yearBuilt: this.ruleForm.yearBuilt,//建筑年份
                                builderName: this.ruleForm.builderName,//开发商名称
                                longitude: this.ruleForm.longitude,//经度
                                latitude: this.ruleForm.latitude,//纬度
                                bedroomCount: this.ruleForm.bedroomCount,//卧室数
                                bathroomCount: this.ruleForm.bathroomCount,//卫生间数
                                fullBathroomCount: this.ruleForm.fullBathroomCount,//完整卫浴数
                                halfBathroomCount: this.ruleForm.halfBathroomCount,//1/2卫浴数
                                threeQuarterBathroomCount: this.ruleForm.threeQuarterBathroomCount,//3/4卫浴数
                                oneQuarterBathroomCount: this.ruleForm.oneQuarterBathroomCount,//1/4卫浴数
                                listPrice: this.ruleForm.listPrice,//价格
                                MLSId: this.ruleForm.MLSId,//MLSId
                                MLSName: this.ruleForm.MLSName,//MLS名称
                                MLSNumber: this.ruleForm.MLSNumber,//MLS号码
                                listingDate: this.ruleForm.listingDate,//上市时间
                                listingCategory: this.ruleForm.listingCategory,//上市类型
                                listingTitle: this.ruleForm.listingTitle,//上市标题
                                listingDescription: this.ruleForm.listingDescription,//房源介绍
                                listingStatus: this.ruleForm.listingStatus,//售卖状态
                                isStar: this.ruleForm.isStar,//是否明星房源
                                photos: this.housePhotosItemString.join()
                            }).then(res => {
                                const data = res;
                                if (data.status == 0) {
                                    this.$message.success('修改成功!');
                                    this.$router.push({path: '/company_ownHouseList'});
                                } else {
                                    this.$message.warning(data.msg)
                                }
                            })
                        } else {
                            this.$post('/own/save', {
                                unitNumber: this.ruleForm.unitNumber,//房源的门牌号
                                fullStreetAddress: this.ruleForm.fullStreetAddress,//房源所在街道名称
                                city: this.ruleForm.city,//房源所在城市
                                zip: this.ruleForm.zip,//房源所在邮编
                                state: this.ruleForm.state,//房源所在州
                                county: this.ruleForm.county,//房源所在郡县
                                houseType: this.ruleForm.houseType,//房屋一级类型
                                houseSubtype: this.ruleForm.houseSubtype,//房屋二级类型
                                livingArea: this.ruleForm.livingArea,//房源面积
                                lotArea: this.ruleForm.lotArea,//占地面积
                                parcelId: this.ruleForm.parcelId,//土地编号
                                yearBuilt: this.ruleForm.yearBuilt,//建筑年份
                                builderName: this.ruleForm.builderName,//开发商名称
                                longitude: this.ruleForm.longitude,//经度
                                latitude: this.ruleForm.latitude,//纬度
                                bedroomCount: this.ruleForm.bedroomCount,//卧室数
                                bathroomCount: this.ruleForm.bathroomCount,//卫生间数
                                fullBathroomCount: this.ruleForm.fullBathroomCount,//完整卫浴数
                                halfBathroomCount: this.ruleForm.halfBathroomCount,//1/2卫浴数
                                threeQuarterBathroomCount: this.ruleForm.threeQuarterBathroomCount,//3/4卫浴数
                                oneQuarterBathroomCount: this.ruleForm.oneQuarterBathroomCount,//1/4卫浴数
                                listPrice: this.ruleForm.listPrice,//价格
                                MLSId: this.ruleForm.MLSId,//MLSId
                                MLSName: this.ruleForm.MLSName,//MLS名称
                                MLSNumber: this.ruleForm.MLSNumber,//MLS号码
                                listingDate: this.ruleForm.listingDate,//上市时间
                                listingCategory: this.ruleForm.listingCategory,//上市类型
                                listingTitle: this.ruleForm.listingTitle,//上市标题
                                listingDescription: this.ruleForm.listingDescription,//房源介绍
                                listingStatus: this.ruleForm.listingStatus,//售卖状态
                                isStar: this.ruleForm.isStar,//是否明星房源
                                photos: this.housePhotosItemString.join()
                            }).then(res => {
                                const data = res;
                                if (data.status == 0) {
                                    this.$message.success('创建自有房源成功!');
                                    this.$router.push({path: '/company_ownHouseList'});
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


        }
    }
</script>
<style scoped lang="less" type="text/less">
    body {
        section{
            h5 {
                text-align: center;
            }
            form {
                > div {
                    margin: 30px 0;
                    div {
                        > label {
                            width: 150px;
                            margin: 15px 0;
                        }
                    }
                }
            }
        }
    }

</style>

