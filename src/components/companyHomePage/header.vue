<template>
    <section class="clearfix">
        <!--轮播背景图-->
        <div class="header-bg clearfix">
            <div class="swiper-container" id="header-bg-swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <img data-src="../../../static/img/header-bg1.jpg" class="swiper-lazy">
                        <div class="swiper-lazy-preloader"></div>
                    </div>
                    <div class="swiper-slide">
                        <img data-src="../../../static/img/header-bg2.jpg" class="swiper-lazy">
                        <div class="swiper-lazy-preloader"></div>
                    </div>
                    <div class="swiper-slide">
                        <img data-src="../../../static/img/header-bg3.jpg" class="swiper-lazy">
                        <div class="swiper-lazy-preloader"></div>
                    </div>
                    <div class="swiper-slide">
                        <img data-src="../../../static/img/header-bg4.jpg" class="swiper-lazy">
                        <div class="swiper-lazy-preloader"></div>
                    </div>
                    <div class="swiper-slide">
                        <img data-src="../../../static/img/header-bg5.jpg" class="swiper-lazy">
                        <div class="swiper-lazy-preloader"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-opacity clearfix">
            <article class="company-header clearfix">
                <img v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ getLogo">
                <div>
                    <i class="iconfont icon-dianhua"></i>
                    <span>{{getTel}}</span>
                </div>
            </article>
            <h1>{{getSetHeaderTitle}}</h1>

            <!--首页banner房源统计-->
            <el-row :gutter="30" class="House-statistics">
                <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="12">
                    <div class="inside">
                        <h3 id="all-America-housing-average-price">$200,700</h3>
                        <span>全美房产平均价格</span>
                    </div>
                </el-col>
                <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="12">
                    <div class="inside">
                        <h3 id="all-America-housing-monthly-change">0.2%</h3>
                        <span>全美房产月度变化</span>
                    </div>
                </el-col>
                <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="12">
                    <div class="inside">
                        <h3 id="all-America-housing-Annual-change">6.8%</h3>
                        <span>全美房产年度变化</span>
                    </div>
                </el-col>
                <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="12">
                    <div class="inside">
                        <h3 id="all-America-housing-price-forecast">2.7%</h3>
                        <span>优房数据全美房价预测</span>
                    </div>
                </el-col>
            </el-row>
        </div>
    </section>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'

    export default {
        data() {
            return {
                mySwiper: null,
                setHeaderTitle: null,//配置的头部模块的标题的内容
            }
        },
        computed: {
            getLogo() {
                return this.$store.getters.get_homePageCompanyDetails.logo
            },
            getTel() {
                return this.$store.getters.get_homePageCompanyDetails.companyTel
            },
            getSetHeaderTitle() {
                this.$store.getters.get_sevenModuleContent['modules'].forEach((i) => {
                    if (i.moduleName.indexOf('header') != -1) {
                        this.setHeaderTitle = i.moduleValue;
                    }
                });
                return this.setHeaderTitle;
            },
        },
        created() {
        },
        mounted() {
            //背景轮播图swiper配置
            this.mySwiper = new Swiper('#header-bg-swiper-container', {
                autoplay: {
                    delay: 5000,//自动切换的时间间隔，单位ms
                    stopOnLastSlide: false,//如果设置为true，当切换到最后一个slide时停止自动切换
                    disableOnInteraction: true,//用户操作swiper之后，是否禁止autoplay。默认为true,如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay
                },
                effect: 'fade',//slide的切换效果：淡入淡出
                spaceBetween: 0,//slide之间的距离（单位px）
                lazy: {
                    loadPrevNext: true,
                    loadPrevNextAmount: 1,
                },
            });
        },
        methods: {},
        components: {}
    }
</script>

<style scoped lang="less" type="text/less">
    body {
        section {
            position: relative;
            width: 100%;
            >.header-bg {
                position: absolute;
                z-index: 1;
                left: 0;
                right: 0;
                top: 0;
                width: 100%;
                height: 100%;
                .swiper-container {
                    width: 100%;
                    height: 100%;
                    .swiper-slide {
                        width: 100%;
                        height: 100%;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                        @media (max-width: 1100px) {
                            img {
                                width: auto;
                            }
                        }
                    }
                }
            }
            >.bg-opacity {
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                position: relative;
                z-index: 2;
                padding: 0 30px;
                >.company-header {
                    margin: 15px 0 0 0;
                    > img {
                        float: left;
                        max-width: 160px;
                    }
                    > div {
                        float: right;
                        color: #fff;
                        font-size: 18px;
                        margin-right: 30px;
                    }
                }
                >h1 {
                    margin-top: 180px;
                    color: #fff;
                    text-align: center;
                }
                /*首页banner全美房源数据统计*/
                >.House-statistics {
                    padding: 200px 0;
                    overflow: hidden;
                    width: 100%;
                    > div {
                        > .inside {
                            background: #fff;
                            padding: 20px 15px;
                            text-align: center;
                            color: #000;
                            border-radius: 5px;
                            > h3 {
                                font-size: 35px;
                                font-weight: bold;
                            }
                            > span {
                                font-size: 16px;
                                margin-top: 5px;
                            }
                        }
                    }
                }
            }


        }
    }
</style>
