<template>
    <section>
        <h3>公司推荐房源</h3>
        <div class="swiper-container" id="companyRecommendHouse-swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in companyRecommendHouseItem" :key="index">
                    <img v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ item.heroImage">
                    <div class="kz-flash-light"></div>
                    <div class="info">
                        <h5 class="webkit-text-overflow-1lines">{{houseName(item)}}</h5>
                        <p class="webkit-text-overflow-1lines"><i class="iconfont icon-dingwei"></i> {{isNull0(item.address)}}</p>
                        <p class="price webkit-text-overflow-1lines">{{isNull0_USD(item.listPrice)}}（{{isNull0_RMB(item.listPrice)}}）</p>
                        <el-button v-ripple size="small" type="primary" icon="iconfont icon-chakan"
                                   @click="goHouseDetails(item.houseId)"> 查看详情
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="swiper-button-next swiper-button-white iconfont icon-zuoyou"></div>
            <div class="swiper-button-prev swiper-button-white iconfont icon-zuoyou1"></div>
        </div>
        <div v-show="false">{{getSetCompanyRecommendHouse}}</div>
    </section>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'

    export default {
        data() {
            return {
                companyUUID: this.$route.query.companyUUID,//公司UUID
                setCompanyRecommendHouse: null,//配置的公司推荐房源的内容
                companyRecommendHouseItem: [],//公司推荐房源列表数据
                mySwiper: null,
            }
        },
        computed: {
            getSetCompanyRecommendHouse() {
                this.$store.getters.get_sevenModuleContent['modules'].forEach((i) => {
                    if (i.moduleName.indexOf('companyRecommendHouse') != -1) {
                        this.setCompanyRecommendHouse = i.moduleValue;
                        return i.moduleValue;
                    }
                });
            },
        },
        created() {
        },
        mounted() {
            //顾问列表swiper配置
            this.mySwiper = new Swiper('#companyRecommendHouse-swiper-container', {
                autoplay: {
                    delay: 5000,//自动切换的时间间隔，单位ms
                    stopOnLastSlide: false,//如果设置为true，当切换到最后一个slide时停止自动切换
                    disableOnInteraction: true,//用户操作swiper之后，是否禁止autoplay。默认为true,如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay
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

            this.getCompanyRecommendHouseList();//获取公司推荐房源列表数据

        },
        methods: {
            //获取公司推荐房源列表数据
            getCompanyRecommendHouseList() {
                this.$get('/homepage/recommendhouse/' + this.companyUUID).then(res => {
                    if (res.status == 0) {
                        this.companyRecommendHouseItem = res.data.slice(0, this.setCompanyRecommendHouse);
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
                        >img{
                            width: 100%;
                            height: 280px;
                            z-index: 3;
                        }
                        @media (max-width: 350px) {
                            img{
                                height: 230px;
                            }
                        }
                        >.kz-flash-light {
                            width: 100%;
                            height: 280px;
                            position: absolute;
                            top: 0;
                            left: 0;
                            background-image: linear-gradient(-70deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.4) 50%, rgba(0, 0, 0, 0) 60%);
                            background-size: 100% 100%;
                            background-repeat: no-repeat;
                            background-position: -300px 0px;
                            z-index: 2;
                            cursor: pointer;
                        }
                        >.kz-flash-light:hover {
                            animation: light_move 1s;
                        }
                        @keyframes light_move {
                            from {
                                background-position: -300px 0px;
                            }
                            to {
                                background-position: 300px 0px;
                            }
                        }
                        > .info {
                            padding: 20px;
                            overflow: hidden;
                            > h5 {
                                color: #000;
                                font-size: 18px;
                            }
                            >p {
                                color: #888;
                                height: 35px;
                                line-height: 35px;
                                font-size: 15px;
                                > i {
                                    float: left;
                                    font-size: 25px;
                                    color: #2fa3f6;
                                }
                            }
                            >p.price{
                                color: #00aced;
                                font-weight: bold;
                            }
                            > button {
                                color: #fff;
                                border: none;
                                outline: none;
                                border-radius: 20px;
                                background: #05bcf8;
                                margin: 5px 0 0 0;
                                -webkit-box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
                                box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
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
