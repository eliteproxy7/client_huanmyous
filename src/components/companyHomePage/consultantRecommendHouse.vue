<template>
    <section>
        <h3>顾问推荐房源</h3>
        <div class="swiper-container" id="consultantRecommendHouse-swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in consultantRecommendHouseItem" :key="index">
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
                </div>
            </div>
            <div class="swiper-button-next swiper-button-white iconfont icon-zuoyou"></div>
            <div class="swiper-button-prev swiper-button-white iconfont icon-zuoyou1"></div>
        </div>
        <div v-show="false">{{getSetShareGroup}}</div>
    </section>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'

    export default {
        data() {
            return {
                companyUUID: this.$route.query.companyUUID,//公司UUID
                setShareGroup: null,//配置的顾问推荐房源的内容
                consultantRecommendHouseItem: [],//顾问推荐房源列表数据
                mySwiper: null,
            }
        },
        computed: {
            getSetShareGroup() {
                this.$store.getters.get_sevenModuleContent['modules'].forEach((i) => {
                    if (i.moduleName.indexOf('consultantRecommendHouse') != -1) {
                        this.setShareGroup = i.moduleValue.split('/')[1];
                        return i.moduleValue;
                    }
                });
            },
        },
        created() {
        },
        mounted() {
            //顾问列表swiper配置
            this.mySwiper = new Swiper('#consultantRecommendHouse-swiper-container', {
                autoplay: {
                    delay: 5000,//自动切换的时间间隔，单位ms
                    stopOnLastSlide: false,//如果设置为true，当切换到最后一个slide时停止自动切换
                    disableOnInteraction: true,//用户操作swiper之后，是否禁止autoplay。默认为true,如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay
                },
                lazy: {
                    loadPrevNext: true,
                    loadPrevNextAmount: 1,
                },
                slidesPerView: 3,//设置slider容器能够同时显示的slides数量
                spaceBetween: 30,//间距(px)
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                observer: true,//启动动态检查器(OB/观众/观看者)，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
                observeParents: true,//将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新
                onInit: function () {
                    // if ($(document).width() <= 992 && $(document).width() > 600) {
                    //     var swiper = new Swiper('.Gold-consultant-swiper-container', {
                    //         autoplay: 5000,//自动轮播5s
                    //         slidesPerView: 2,//设置slider容器能够同时显示的slides数量
                    //         spaceBetween: 30,//间距(px)
                    //     })
                    // } else if ($(document).width() <= 600) {
                    //     var swiper = new Swiper('.Gold-consultant-swiper-container', {
                    //         autoplay: 5000,//自动轮播5s
                    //         slidesPerView: 1//设置slider容器能够同时显示的slides数量
                    //     })
                    // }
                }
            });

            this.getConsultantRecommendHouseList();//获取公司推荐房源列表数据

        },
        methods: {
            //获取公司推荐房源列表数据
            getConsultantRecommendHouseList() {
                this.$get('/sharegroup/house/list?shareId='+ this.setShareGroup).then(res => {
                    if (res.status == 0) {
                        this.consultantRecommendHouseItem = res.data;
                        this.mySwiper.update();
                    }
                })
            },
            //跳转到房源详情页
            goHouseDetails(houseId) {
                // let routeData = this.$router.resolve({
                //     path: '/houseDetails',
                //     query: {
                //         houseId: houseId
                //     }
                // });
                // window.open(routeData.href, '_blank')
                this.$router.push({path: "/houseDetails", query: {houseId: houseId}});
            },

        },
        components: {}
    }
</script>

<style scoped lang="less" type="text/less">
    body {
        section {
            padding: 60px 100px;
            >h3{
                text-align: center;
                font-size: 27px;
                color: #474747;
                font-weight: bold;
                margin: 0 0 60px 0;
            }
            /deep/ .swiper-container {
                > .swiper-wrapper {
                    padding: 10px 0;
                    .swiper-slide{
                        height: auto;
                        background: #fff;
                        -webkit-transition: .35s;
                        -moz-transition: .35s;
                        -ms-transition: .35s;
                        -o-transition: .35s;
                        transition: .35s;
                        overflow: hidden;
                        text-align: left;
                        >.inside {
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
                    > .swiper-slide:hover {
                        box-shadow: 0px 2px 15px 0px #858585;
                        -webkit-box-shadow: 0px 2px 15px 0px #858585;
                        -moz-box-shadow: 0px 2px 15px 0px #858585;
                        -ms-box-shadow: 0px 2px 15px 0px #858585;
                        -o-box-shadow: 0px 2px 15px 0px #858585;
                        transform: translateY(-2px);
                        -webkit-transform: translateY(-2px);
                        -moz-transform: translateY(-2px);
                        -ms-transform: translateY(-2px);
                        -o-transform: translateY(-2px);
                    }
                }
                @media (max-width: 350px) {
                    .swiper-button-next, .swiper-button-prev{
                        width: 40px;
                        height: 40px;
                        line-height: 40px;
                        font-size: 22px;
                        outline: none;
                    }
                }
            }
        }
    }
</style>
