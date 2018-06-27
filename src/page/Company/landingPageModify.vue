<template>
    <section>
        <el-form>
            <el-form-item>
                <h3>第一屏-公司名称、优势以及Logo</h3>
                <h4>第一屏背景图</h4>
                <article class="check-bg-box clearfix">
                    <el-radio-group
                        v-for="(item, index) in BackgroundMap"
                        :key="index"
                        v-model="background1">
                        <img v-lazy="item.src"/>
                        <el-radio :label="item.value">{{item.pictureName}}</el-radio>
                    </el-radio-group>
                </article>
                <el-row style="margin: 0 15px;">
                    <el-col :span="3">公司优势标题：</el-col>
                    <el-col :span="10">
                        <el-input v-model="tagline" size="small"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <h3>第二屏-本公司金牌顾问</h3>
                <aside>
                    <span>{{goldConsultantNumber}}</span>
                    <el-button type="primary" @click="goConsultantList" icon="iconfont icon-qianwang1" size="medium"> 前往顾问列表</el-button>
                </aside>
            </el-form-item>
            <el-form-item>
                <h3>第三屏-公司简介</h3>
                <el-input type="textarea" :rows="10" :cols="20" v-model="modifyCompanyProfile" resize="none"></el-input>
                <p style="font-size: 14px; color: #858585;">公司简介内容请控制在430个字左右，目前字符数：{{modifyCompanyProfile.length}}个</p>
                <p style="font-size: 14px; color: #858585;">
                    公司简介里的公司地址、联系电话和联系邮箱使用的是对应的公司注册信息，如您需要修改相应信息，请前往公司信息管理页面修改。
                </p>
            </el-form-item>
            <el-form-item>
                <h3>第四屏-本公司推荐房源</h3>
                <aside>
                    <span>{{recommendHouseNumber}}</span>
                    <el-button type="primary" @click="goRecommendHouseList" icon="iconfont icon-qianwang1" size="medium"> 前往房源列表</el-button>
                </aside>
            </el-form-item>
            <el-form-item>
                <h3>第五屏-客户注册</h3>
                <h4>第五屏背景图</h4>
                <article class="check-bg-box clearfix">
                    <el-radio-group
                        v-for="(item, index) in BackgroundMap"
                        :key="index"
                        v-model="background5">
                        <img v-lazy="item.src"/>
                        <el-radio :label="item.value">{{item.pictureName}}</el-radio>
                    </el-radio-group>
                </article>
            </el-form-item>
            <el-form-item style="text-align: center">
                <el-button v-ripple type="success" @click="previewCompanyLandingPage" icon="iconfont icon-yanjing2 transition" style="margin: 0 30px"> 预览落地页</el-button>
                <el-button v-ripple type="primary" @click="modifyCompanyLandingPageSubmit" icon="iconfont icon-submit transition" style="margin: 0 30px"> 提交修改</el-button>
            </el-form-item>
        </el-form>
        <el-dialog
            title="使用微信扫描二维码预览并分享！"
            :visible.sync="myModalPromp_dialog"
            width="30%"
            center>
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="23">
                    <qrcode-vue :value="previewCompanyLandingPageURL_value" size="250" level="H"
                                class="companyLandingPageQRcode-img"></qrcode-vue>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="center" style="margin: 15px 0 0 0">
                <el-col :span="23">
                    <el-input placeholder="复制分享链接" id="share-link" v-model="previewCompanyLandingPageURL_value">
                        <el-button slot="append" icon="el-icon-document" data-clipboard-target="#share-link"
                                   id="share-link-btn"></el-button>
                    </el-input>
                </el-col>
            </el-row>
        </el-dialog>
    </section>
</template>

<script>
    // 生成二维码插件
    import QrcodeVue from 'qrcode.vue';
    //复制粘贴功能插件
    import Clipboard from 'clipboard';

    export default {
        data() {
            return {
                tagline: '',    //第一屏-公司优势标题
                modifyCompanyProfile: '',   //第三屏-公司简介
                background1: '',    //第一屏背景图
                background5: '',    //第五屏背景图
                BackgroundMap: [
                    {
                        src: '/static/img/header-bg1.jpg',
                        value: 'header-bg1.jpg',
                        pictureName: '图片一'
                    },
                    {
                        src: '/static/img/header-bg2.jpg',
                        value: 'header-bg2.jpg',
                        pictureName: '图片二'
                    },
                    {
                        src: '/static/img/header-bg3.jpg',
                        value: 'header-bg3.jpg',
                        pictureName: '图片三'
                    },
                    {
                        src: '/static/img/header-bg4.jpg',
                        value: 'header-bg4.jpg',
                        pictureName: '图片四'
                    },
                    {
                        src: '/static/img/header-bg5.jpg',
                        value: 'header-bg5.jpg',
                        pictureName: '图片五'
                    },
                    {
                        src: '/static/img/header-bg6.jpg',
                        value: 'header-bg6.jpg',
                        pictureName: '图片六'
                    },
                    {
                        src: '/static/img/header-bg7.jpg',
                        value: 'header-bg7.jpg',
                        pictureName: '图片七'
                    }, {
                        src: '/static/img/header-bg8.jpg',
                        value: 'header-bg8.jpg',
                        pictureName: '图片八'
                    }
                ],
                goldConsultantNumber: '',    //第二屏-获取已设置的本公司金牌顾问数量
                recommendHouseNumber: '',    //第四屏-获取已设置的本公司推荐房源数量
                myModalPromp_dialog: false,     //预览公司落地dialog框
                previewCompanyLandingPageURL_value: '', //预览公司落地页的二维码的链接
                companyUUID: ''//公司UUID


            }

        },
        created() {
            this.getCompanyData();//初始化数据，为了得到background1和background2
            this.getSetGoldConsultant();//第二屏-获取已设置的本公司金牌顾问数量
            this.getSetRecommendHouse();//第四屏-获取已设置的本公司推荐房源数量

        },
        computed: {},
        methods: {
            //获取公司详情数据
            getCompanyData() {
                this.$get('/company/details').then(res => {
                    const data = res.data;
                    if (res.status == 0) {
                        this.background1 = data.background1;
                        this.background5 = data.background5;
                        this.companyUUID = data.uuid;
                        this.tagline = data.tagline; //修改公司落地页-公司优势标题
                        this.modifyCompanyProfile = data.introduction.replace(/-/g, '\r\n\r\n'); //修改公司落地页-公司简介
                    }
                })
            },
            //第二屏-获取已设置的本公司金牌顾问数量
            getSetGoldConsultant() {
                this.$get('/counselor/count').then(res => {
                    const data = res.data;
                    if (res.status == 0) {
                        if (data > 0) {
                            this.goldConsultantNumber = `您已设置过${data}位金牌顾问`;
                        } else {
                            this.goldConsultantNumber = `您尚未设置过金牌顾问`;
                        }
                    }
                })
            },
            //第四屏-获取已设置的本公司推荐房源数量
            getSetRecommendHouse() {
                this.$get('/recommend/house/count').then(res => {
                    const data = res.data;
                    if (res.status == 0) {
                        if (data > 0) {
                            this.recommendHouseNumber = `您已设置过${data}个推荐房源`;
                        } else {
                            this.recommendHouseNumber = `您尚未设置过推荐房源`;
                        }
                    }
                })
            },
            //前往顾问列表
            goConsultantList() {
                this.$router.push({path: '/company_consultantList'});
            },
            // 前往房源列表
            goRecommendHouseList() {
                this.$router.push({path: '/company_houseList'});
            },
            //预览公司落地页
            previewCompanyLandingPage() {
                // console.log(window.location.host)
                this.myModalPromp_dialog = true;
                this.previewCompanyLandingPageURL_value = 'http://'+ window.location.host +'/landingPage?uuid=' + this.companyUUID;
                let clipboard = new Clipboard('#share-link-btn');
                clipboard.on('success', e => {
                    this.$message.success('复制成功！');
                    clipboard.destroy();// 释放内存
                });
                clipboard.on('error', e => {
                    this.$message.error('该浏览器不支持自动复制。');
                    clipboard.destroy();
                });

            },
            //点击提交修改落地页的修改内容
            modifyCompanyLandingPageSubmit() {
                const regEx = /\s+/g;
                const company_profile_val = this.modifyCompanyProfile.replace(regEx, '-');

                this.$post('/company/updatehomepage', {
                    background1: this.background1,  //第一屏背景图
                    tagline: this.tagline,  //第一屏-公司优势标题
                    introduction: company_profile_val,  //第三屏-公司简介
                    background5: this.background5   //第五屏背景图
                }).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.$message.success('设置成功，请点击预览！');
                    } else {
                        this.$message.error(data.msg)
                    }
                });

            }

        },
        components: {
            QrcodeVue
        }
    }
</script>
<style scoped lang="less" type="text/less">
    body {
        section {
            form {
                >.el-form-item{
                    margin: 30px 0;
                    h3{
                        margin: 15px 0;
                        font-size: 16px;
                    }
                    h4{
                        margin: 15px 0;
                        font-size: 14px;
                        padding: 0 0 0 15px;
                    }
                    .check-bg-box{
                        >.el-radio-group{
                            text-align: center;
                            margin: 0 15px;
                            float: left;
                            >img{
                                width: 400px;
                                height: 225px;
                            }
                            >label{
                                display: block;
                                margin: 15px auto;
                            }
                        }
                    }
                    aside{
                       >span{
                           margin: 0 15px;
                       }
                    }
                }
            }
        }
        .companyLandingPageQRcode-img {
            text-align: center;
        }
    }
</style>

