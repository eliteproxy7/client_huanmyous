<template>
    <div class="swiper-container swiper-container-father">
        <div class="swiper-wrapper">
            <!--第一屏-->
            <div class="swiper-slide swiper-slide-BG first-page" :style="{background:background1}">
                <section>
                    <img v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ companyDetailsData.logo" style="max-width: 200px">
                    <h2>{{isNull0(tagline)}}</h2>
                    <p>
                        <i></i> 专业 高效 及时 智能 <i></i>
                    </p>
                </section>
            </div>
            <!--第二屏-->
            <div class="swiper-slide second-page">
                <section>
                    <h3>金牌顾问团队</h3>
                    <article>
                        <h4 v-show="consultantNoData">暂无金牌顾问</h4>
                        <aside v-for="(item, index) in goldConsultantItem" :key="index">
                            <img v-lazy="item.photo" alt="">
                            <!--<img v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ item.photo" alt="">-->
                            <p>{{item.responsiblePlace}}</p>
                            <span>{{item.name}}</span>
                        </aside>
                    </article>
                </section>
            </div>
            <!--第三屏-->
            <div class="swiper-slide third-page">
                <section>
                    <h3>公司简介</h3>
                    <article>
                        <p v-for="item in introduction">{{item}}</p>
                    </article>
                    <p><i class="iconfont icon-dianhua"></i> <span>{{isNull0(companyDetailsData.companyTel)}}</span></p>
                    <p><i class="iconfont icon-dkw_youxiang"></i> <span>{{isNull0(companyDetailsData.companyEmail)}}</span>
                    </p>
                    <p><i class="iconfont icon-dingwei2"></i> <span>{{isNull0(companyDetailsData.province)}}-{{isNull0(companyDetailsData.city)}}-{{isNull0(companyDetailsData.area)}}-{{isNull0(companyDetailsData.address)}}</span>
                    </p>
                    <div class="erweima-box">
                        <p>微信扫描二维码，关注公众号，获得更多海外房产资讯</p>
                        <img v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ companyDetailsData.officialAccountsQRCode" style="max-width: 200px">
                    </div>
                </section>
            </div>
            <!--第四屏-->
            <div class="swiper-slide fourth-page">
                <section>
                    <h3>本公司推荐房源</h3>
                    <el-carousel height="460px" :interval="5000" arrow="always">
                        <el-carousel-item v-for="(item, index) in recommendHouseItem" :key="index"
                                          class="companyRecommendHouse-box clearfix">
                            <div class="inside" @click="goHouseDetails(item.houseId)">
                                <div class="left">
                                    <img v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ item.heroImage">
                                    <p>
                                        <span>{{isNull0_USD(item.listPrice)}}</span>
                                        <span>{{isNull0_RMB(item.listPrice)}}</span>
                                    </p>
                                </div>
                                <div class="right">
                                    <h2><i></i> {{houseName(item)}}</h2>
                                    <div class="info">
                                        <div class="address">
                                            <i class="iconfont icon-dingwei"></i>{{item.address}}
                                        </div>
                                        <p>占地：{{isNull0_sqft(item.livingArea) + '（' + isNull0_sqmt(item.livingArea) +'）'}}</p>
                                        <p>
                                            <span class="left">卧室：{{isNull0(item.bedroomCount)}}间</span>
                                            <span class="right">卫浴：{{isNull0(item.bathroomCount)}}间</span>
                                        </p>
                                        <p>
                                            <span class="left">年份：{{isNull0(item.yearBuilt)}}</span>
                                            <span class="right">状态：<span v-html="house_status(item.listingStatus)"></span></span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                    <p>想要了解更多优质房源及周边信息，获取详细房源投资报告，请往下继续翻页留下您的联系方式↓</p>
                </section>
            </div>
            <!--第五屏-->
            <div class="swiper-slide swiper-slide-BG fifth-page" :style="{background:background5}">
                <section>
                    <clientRegister></clientRegister>
                </section>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'
    import clientRegister from '../components/clientRegister.vue'

    export default {
        data() {
            return {
                companyDetailsData: '',    //加载公司信息数据
                background1: '',    //第一屏幕数据背景图
                background5: '',    //第五屏幕数据背景图
                tagline: '', //第一屏-公司优势标题
                consultantNoData: false, //金牌顾问没有数据
                goldConsultantItem: [], //第二屏-金牌顾问数据
                introduction: [],   //第三屏-公司简介
                recommendHouseItem: [],   //第四屏-本公司推荐房源数据
                mySwiper: null,
                companyUUID: window.location.href.split('?uuid=')[1],//公司UUID

            }
        },
        mounted() {
            //获取公司信息
            this.getCompanyDetailsData();
            //获取第二屏 -金牌顾问团队
            this.getGoldConsultantData();
            //获取第四屏 -本公司推荐房源
            this.getRecommendHouseData();
            //swiper配置
            this.mySwiper = new Swiper('.swiper-container-father', {
                direction: 'vertical',//垂直滚动
                autoHeight: true, //高度随内容变化
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });

            localStorage.companyUUID = this.companyUUID;//公共组件：客户注册使用
        },

        methods: {
            //获取公司信息数据
            getCompanyDetailsData() {
                this.$get('/homepage/company/details?uuid='+ this.companyUUID).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.companyDetailsData = data.data;
                        this.background1 = `url('/static/img/${data.data.background1}') center center / cover no-repeat`;
                        this.background5 = `url('/static/img/${data.data.background5}') center center / cover no-repeat`;
                        if(data.data.tagline){
                            this.tagline = data.data.tagline;
                        }else{
                            this.tagline = '您还未设置标题';
                        }
                        this.introduction = this.isNull0(data.data.introduction).split('-');
                        this.mySwiper.update();
                    } else {
                    }
                })
            },
            //获取第二屏 -金牌顾问团队
            getGoldConsultantData() {
                this.$get('/homepage/counselor/istop/list?uuid='+ this.companyUUID).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.consultantNoData = false;
                        this.goldConsultantItem = data.rows;
                    } else {
                        this.consultantNoData = true;
                    }
                })
            },
            //获取第四屏-本公司推荐房源
            getRecommendHouseData() {
                this.$get('/homepage/recommendhouse/' + this.companyUUID).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.recommendHouseItem = data.data;
                    }
                })
            },
            //跳转到房源详情页
            goHouseDetails(houseId) {
                this.$router.push({path: "/houseDetails", query: {houseId: houseId}});
            }
        },
        components: {
            clientRegister
        }
    }
</script>

<style scoped lang="less" type="text/less">
    body {
        .swiper-container {
            width: 100%;
            height: 100%;
            >.swiper-wrapper {
                > .swiper-slide {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    overflow: auto;
                    > section {
                        width: 100%;
                        height: auto;
                        text-align: center;
                        padding: .5rem 0;
                        > h3 {
                            font-size: .5rem;
                            margin: .5rem 0;
                        }
                    }
                }
                > .swiper-slide-BG {
                    background-size: cover;
                    background-position: center center;
                    background-repeat: no-repeat;
                }

                /*第一屏——公司Logo、标题和优势*/
                .first-page {
                    > section {
                        > img {
                            width: auto;
                            max-width: 5rem;
                            height: auto;
                            margin: 0 0 .5rem 0;
                        }
                        > h2 {
                            font-size: .65rem;
                            letter-spacing: 0.05rem;
                            color: #fff;
                        }
                        > p {
                            font-size: 0.5rem;
                            color: #fff;
                            margin: 0.25rem 0 0 0;
                            letter-spacing: 0.05rem;
                            > i {
                                display: inline-block;
                                width: .5rem;
                                height: 1px;
                                background: #f6f6f6;
                                margin: 0.15rem 0.25rem;
                            }
                        }
                    }
                }

                /*第二屏——金牌顾问团队*/
                .second-page {
                    > section {
                        article {
                            overflow: hidden;
                            > aside {
                                text-align: center;
                                float: left;
                                width: 33.33%;
                                padding: 0.25rem 0;
                                > img {
                                    width: 2rem;
                                    height: auto;
                                    max-height: 3rem;
                                }
                                > p {
                                    font-size: 0.3rem;
                                    color: #666;
                                    margin: 0.15rem 0 0 0;
                                }
                                > span {
                                    font-size: 0.35rem;
                                    color: #3caae6;
                                    margin: 0.15rem 0 0 0;
                                }
                            }
                            > h4 {
                                text-align: center;
                                padding: 1rem 0;
                            }
                        }
                    }
                }

                /*第三屏——公司简介*/
                .third-page {
                    height: auto;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    background: #fff;
                    > section {
                        > h3 {
                            margin: .5rem 0 .2rem 0;
                        }
                        >article{
                            max-height: 9.2rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: block;
                            text-align: justify;
                            word-wrap: normal;
                            margin: 0 0 .3rem 0;
                            > p {
                                font-size: 0.35rem;
                                color: #666;
                                text-align: justify;
                                padding: 0.15rem 0.25rem;
                            }
                        }
                        >p {
                            font-size: 0.35rem;
                            color: #666;
                            text-align: justify;
                            padding: 0.1rem 0.25rem;
                            > i {
                                font-size: 0.37rem;
                            }
                        }
                        >.erweima-box {
                            text-align: center;
                            > p {
                                font-size: 0.35rem;
                                color: #333;
                                text-align: center;
                            }
                            > img {
                                width: 3.5rem;
                                height: auto;
                            }
                        }
                    }
                }

                /*第四屏——本公司推荐房源*/
                .fourth-page {
                    > section {
                        .companyRecommendHouse-box {
                            overflow: initial;
                            padding: 0 20px;
                            .inside {
                                overflow: hidden;
                                border-radius: 7px;
                                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
                                -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
                                -moz-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
                                -ms-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
                                -o-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
                                > .left,
                                > .right {
                                    width: 100%;
                                    float: none;
                                }
                                > .left {
                                    cursor: pointer;
                                    text-align: center;
                                    position: relative;
                                    border-top-left-radius: 7px;
                                    border-top-right-radius: 7px;
                                    overflow: hidden;
                                    > img {
                                        width: 100%;
                                        height: 270px;
                                        z-index: 1;
                                        -webkit-transition: 1.5s ease;
                                        -moz-transition: 1.5s ease;
                                        -ms-transition: 1.5s ease;
                                        -o-transition: 1.5s ease;
                                        transition: 1.5s ease;
                                    }
                                    > p {
                                        position: absolute;
                                        left: 10px;
                                        bottom: 10px;
                                        z-index: 5;
                                        font-size: 26px;
                                        color: #89d3d9;
                                        text-align: left;
                                        > span {
                                            display: block;
                                        }
                                        > span:last-of-type {
                                            font-size: 23px;
                                        }
                                    }
                                }
                                > .right {
                                    padding: 10px 10px 20px 0;
                                    background: #fff;
                                    border-bottom-left-radius: 7px;
                                    border-bottom-right-radius: 7px;
                                    text-align: left;
                                    > h2 {
                                        display: block;
                                        width: 100%;
                                        line-height: 26px;
                                        font-size: 19px;
                                        color: #333;
                                        font-weight: bold;
                                        text-indent: 18px;
                                        cursor: pointer;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        -o-text-overflow: ellipsis;
                                        -webkit-text-overflow: ellipsis;
                                        -moz-text-overflow: ellipsis;
                                        white-space: nowrap;
                                        > i {
                                            float: left;
                                            width: 5px;
                                            height: 26px;
                                            margin: 2px 0 0 0;
                                            background: #00aeef;
                                        }
                                    }
                                    > .info {
                                        padding: 10px 0 0 20px;
                                        > .address {
                                            height: 35px;
                                            line-height: 35px;
                                            font-size: 15px;
                                            color: #000;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            -o-text-overflow: ellipsis;
                                            -webkit-text-overflow: ellipsis;
                                            -moz-text-overflow: ellipsis;
                                            white-space: nowrap;
                                            > i {
                                                font-size: 25px;
                                                color: #2fa3f6;
                                                float: left;
                                            }
                                        }
                                        > p {
                                            height: 14px;
                                            line-height: 14px;
                                            margin: 14px 0 0 0;
                                            overflow: hidden;
                                            font-size: 14px;
                                            color: #000;
                                            > span {
                                                width: 50%;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        >p {
                            font-size: 0.35rem;
                            color: #333;
                            text-align: center;
                            padding: 15px;
                        }
                    }
                }

                /*第五屏——客户注册*/
                .fifth-page {
                    > section {

                    }
                }
            }
        }

    }
</style>
