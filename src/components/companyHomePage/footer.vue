<template>
    <footer class="footer">
        <div class="inside">
            <el-row>
                <el-col :span="8">
                    <img v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ getLogo"/>
                    <p class="webkit-text-overflow-4lines">{{getSetAboutUS}}</p>
                    <div class="line"></div>
                </el-col>
                <el-col :span="8">
                    <article class="clearfix">
                        <router-link to="/contactUS">联系我们</router-link>
                        <aside>
                            <i class="iconfont icon-dianhua"></i>
                            <span> {{getTel}}</span>
                        </aside>
                    </article>
                    <article class="clearfix">
                        <router-link to="/businessIntroduce">业务介绍</router-link>
                        <aside>
                            <i class="iconfont icon-dkw_youxiang"></i>
                            <span> {{getEmail}}</span>
                        </aside>
                    </article>
                    <article class="clearfix">
                        <router-link to="/companyIntroduce">公司介绍</router-link>
                        <aside>
                            <i class="iconfont icon-dingwei2"></i>
                            <span> {{getAddress}}</span>
                        </aside>
                    </article>
                    <div class="line"></div>
                </el-col>
                <el-col :span="8" class="footer-company-erweima-box">
                    <h5>微信扫描二维码，关注公众号，获得更多海外房产资讯</h5>
                    <img v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ getQRCode">
                </el-col>
                <!--<div v-show="false">{{getSetAboutUS}}</div>-->
            </el-row>
        </div>
    </footer>
</template>

<script>
    export default {
        data() {
            return {
                setAboutUS: null,//配置的底部模块的关于我们的内容
            }
        },
        computed: {
            getLogo() {
                return this.$store.getters.get_homePageCompanyDetails.logo
            },
            getTel() {
                return this.$store.getters.get_homePageCompanyDetails.companyTel
            },
            getEmail() {
                return this.$store.getters.get_homePageCompanyDetails.companyEmail
            },
            getAddress() {
                return this.isNull0(this.$store.getters.get_homePageCompanyDetails.province) + ' ' +
                    this.isNull0(this.$store.getters.get_homePageCompanyDetails.city) + ' ' +
                    this.isNull0(this.$store.getters.get_homePageCompanyDetails.area) + ' ' +
                    this.isNull0(this.$store.getters.get_homePageCompanyDetails.address)
            },
            getQRCode() {
                return this.$store.getters.get_homePageCompanyDetails.officialAccountsQRCode
            },
            getSetAboutUS() {
                this.$store.getters.get_sevenModuleContent['modules'].forEach((i) => {
                    if (i.moduleName.indexOf('footer') != -1) {
                        this.setAboutUS = i.moduleValue;
                    }
                });
                return this.setAboutUS;
            },
        },
        created() {
        },
        mounted() {
        },
        methods: {

        },
        components: {}
    }
</script>

<style scoped lang="less" type="text/less">
    body {
        .footer {
            background: url("../../../static/img/footer-bg2.jpg") no-repeat center center;
            background-size: 100% 100%;
            > .inside {
                background: rgba(15, 40, 54, 0.5);
                padding: 75px 30px;
                > div {
                    > div {
                        height: auto;
                        min-height: 150px;
                        border: none;
                        position: relative;
                        padding: 0 15px;
                        text-align: center;
                        color: #fff;
                        > .line {
                            width: 1px;
                            height: 180px;
                            background-color: #ffffff7d;
                            position: absolute;
                            right: 0;
                            top: 0;
                        }
                        > article {
                            margin: 20px 0;
                            text-align: left;
                            line-height: 28px;
                            > a {
                                float: left;
                                color: #fff;
                            }
                            > aside {
                                float: left;
                                margin: 0 0 0 30px;
                                > i {
                                    font-size: 19px;
                                }
                            }
                        }
                        a {
                            color: #fff;
                        }
                    }
                    > div:first-of-type {
                        > img {
                            max-width: 150px;
                            margin: 0 0 20px 0;
                        }
                        > p {
                            margin: 10px 0;
                        }
                    }
                    .footer-company-erweima-box {
                        > h5 {
                            font-size: 14px;
                            color: rgb(255, 255, 255);
                            text-align: center;
                        }
                        > p,
                        > a {
                            margin: 20px 0;
                            font-size: 15px;
                            color: #fff;
                        }
                        > img {
                            width: 150px;
                            height: auto;
                            margin: 15px 0 0 0;
                        }
                    }
                }
            }
        }
    }
</style>
