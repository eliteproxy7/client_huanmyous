<template>
    <section>
        <!--<el-carousel height="500px" :interval="5000" :autoplay="false" arrow="always" indicator-position="none" trigger="click" class="house-photo-box">-->
            <!--<el-carousel-item v-for="item in housePhotosItem" :key="item">-->
                <!--<img v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ item +'?x-oss-process=image/resize,h_500'" preview="item.length" preview-text="房源图片">-->
            <!--</el-carousel-item>-->
        <!--</el-carousel>-->
        <div class="swiper-container swiper-container-housePhoto">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in housePhotosItem" :key="item">
                    <!--+'?x-oss-process=image/resize,m_fill,h_200,w_380'-->
                    <img v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ item " preview="item.length" preview-text="房源图片">
                </div>
            </div>
            <div class="swiper-button-next swiper-button-white iconfont icon-zuoyou"></div>
            <div class="swiper-button-prev swiper-button-white iconfont icon-zuoyou1"></div>
            <div class="swiper-pagination"></div>
        </div>
    </section>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'

    export default {
        data() {
            return {
                housePhotosItem: [],    //房源图片数据
                houseId: '',    //房源ID
                mySwiper: null,
            }
        },
        created() {
        },
        mounted() {
            this.houseId = this.$route.query.houseId;
            this.getHousePhotosData();
            //swiper配置
            this.mySwiper = new Swiper('.swiper-container', {
                autoplay: {
                    delay: 5000,//自动切换的时间间隔，单位ms
                    stopOnLastSlide: false,//如果设置为true，当切换到最后一个slide时停止自动切换
                    disableOnInteraction: true,//用户操作swiper之后，是否禁止autoplay。默认为true,如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay
                },
                slidesPerView: 3,
                slidesPerColumn: 2,
                spaceBetween: 10,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                keyboard: { //键盘控制
                    enabled: true,
                    onlyInViewport: true,
                },
                observer: true,//启动动态检查器(OB/观众/观看者)，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
                observeParents: true,//将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新
            });

        },
        computed: {
        },
        methods: {
            //获取房源图片数据
            getHousePhotosData(){
                this.$get('/house/photo/'+ this.houseId).then(res => {
                    this.housePhotosItem = res.data;
                    // console.log(this.housePhotosItem.length)
                    this.mySwiper.update();

                });
            },


        },
        components: {
        }
    }
</script>

<style  lang="less" type="text/less">
    body{
        section {
            .house-photo-box {
                img {
                    /*width: 100%;*/
                    /*height: 100%;*/
                }
            }
            .pswp__caption__center {
                text-align: center;
            }

            .swiper-container {
                width: 100%;
                height: auto;
                margin-left: auto;
                margin-right: auto;
                .swiper-slide {
                    text-align: center;
                    background: #fff;
                    height: 220px;
                    > img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>
