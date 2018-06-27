<template>
    <section>
        <h3>金牌顾问</h3>
        <div class="swiper-container" id="GoldConsultant-swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in consultantListItem" :key="index">
                    <img v-lazy="item.photo">
                    <p>{{item.responsiblePlace}}</p>
                    <span>{{item.name}}</span>
                </div>
            </div>
            <div class="swiper-button-next swiper-button-white iconfont icon-zuoyou"></div>
            <div class="swiper-button-prev swiper-button-white iconfont icon-zuoyou1"></div>
        </div>
        <div v-show="false">{{getSetGoldConsultant}}</div>
    </section>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'

    export default {
        data() {
            return {
                companyUUID: this.$route.query.companyUUID,//公司UUID
                setGoldConsultant: null,//配置的金牌顾问模块的内容
                consultantListItem: [],//顾问列表数据
                mySwiper: null,
            }
        },
        computed: {
            getSetGoldConsultant() {
                this.$store.getters.get_sevenModuleContent['modules'].forEach((i) => {
                    if (i.moduleName.indexOf('GoldConsultant') != -1) {
                        this.setGoldConsultant = i.moduleValu;
                        return i.moduleValue;
                    }
                });
            },
        },
        created() {
        },
        mounted() {
            //顾问列表swiper配置
            this.mySwiper = new Swiper('#GoldConsultant-swiper-container', {
                autoplay: {
                    delay: 5000,//自动切换的时间间隔，单位ms
                    stopOnLastSlide: false,//如果设置为true，当切换到最后一个slide时停止自动切换
                    disableOnInteraction: true,//用户操作swiper之后，是否禁止autoplay。默认为true,如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay
                },
                lazy: {
                    loadPrevNext: true,
                    loadPrevNextAmount: 1,
                },
                slidesPerView: 5,//设置slider容器能够同时显示的slides数量
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

            this.getConsultantList();//获取顾问列表数据

        },
        methods: {
            //获取顾问列表数据
            getConsultantList() {
                this.$get('/homepage/counselor/istop/list?uuid=' + this.companyUUID).then(res => {
                    if (res.status == 0) {
                        this.consultantListItem = res.rows.slice(0, this.setGoldConsultant);
                        this.mySwiper.update();
                    }
                })
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
                    > .swiper-slide {
                        height: auto;
                        -webkit-transition: .35s;
                        -moz-transition: .35s;
                        -ms-transition: .35s;
                        -o-transition: .35s;
                        transition: .35s;
                        overflow: hidden;
                        text-align: center;
                        > img {
                            width: 100%;
                            height: 280px;
                        }
                        > p {
                            font-size: 18px;
                            color: #666;
                            margin: 15px 0 10px 0;
                        }
                        > span {
                            display: inline-block;
                            font-size: 16px;
                            color: #3caae6;
                            margin: 0 0 15px 0;
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
            }
        }
    }
</style>
