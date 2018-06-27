<template>
    <footer class="footer">
        <div class="inside">
            <el-row>
                <el-col :span="7">
                    <img v-lazy="'../../../static/img/logo.png'"/>
                    <p>© 优房数据 - 版权所有 | 京ICP备17056447号-1</p>
                    <a target="_blank"
                       href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010102002943">
                        <img src="/static/img/gonganbeian.png"> 京公网安备 11010102002943号
                    </a>
                    <div class="line"></div>
                </el-col>
                <el-col :span="10">
                    <article class="clearfix">
                        <router-link to="/contactUS">联系我们</router-link>
                        <aside>
                            <i class="iconfont icon-dianhua"></i>
                            <span> 400-600-4982</span>
                        </aside>
                    </article>
                    <article class="clearfix">
                        <router-link to="/businessIntroduce">业务介绍</router-link>
                        <aside>
                            <i class="iconfont icon-dkw_youxiang"></i>
                            <span> 429461542@qq.com</span>
                        </aside>
                    </article>
                    <article class="clearfix">
                        <router-link to="/companyIntroduce">公司介绍</router-link>
                        <aside>
                            <i class="iconfont icon-dingwei2"></i>
                            <span> 北京市东城区朝阳门银河SOHO-D座50815</span>
                        </aside>
                    </article>
                    <div class="line"></div>
                </el-col>
                <el-col :span="7" class="footer-company-erweima-box">
                    <h5>微信扫描二维码，关注公众号，获得更多海外房产资讯</h5>
                    <img v-lazy="'../../../static/img/gongzhonghao.jpg'">
                </el-col>
            </el-row>
        </div>
    </footer>
</template>

<script>
    export default {
        data() {
            return {}
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        methods: {},
        components: {}
    }
</script>

<style scoped lang="less" type="text/less">
    body {
        .footer {
            background: url("../../static/img/footer-bg2.jpg") no-repeat center center;
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
