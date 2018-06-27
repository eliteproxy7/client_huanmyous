<template>
    <div class="swiper-container swiper-container-clientShareHouse">
        <div class="swiper-wrapper">
            <div class="swiper-slide first-page">
                <section>
                    <header>
                        <img v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ companyDetailsData.logo"
                             style="max-width: 150px">
                    </header>
                    <h4>{{companyDetailsData.name}}-精品房源分享</h4>
                    <el-carousel height="460px" :interval="5000" arrow="always">
                        <el-carousel-item v-for="(item, index) in shareGroupHouseItem" :key="index"
                                          class="shareGroupHouse-box clearfix">
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
                                        <p>占地：{{isNull0_sqft(item.livingArea) + '（' + isNull0_sqmt(item.livingArea)
                                            +'）'}}</p>
                                        <p>
                                            <span class="left">卧室：{{isNull0(item.bedroomCount)}}间</span>
                                            <span class="right">卫浴：{{isNull0(item.bathroomCount)}}间</span>
                                        </p>
                                        <p>
                                            <span class="left">年份：{{isNull0(item.yearBuilt)}}</span>
                                            <span class="right">状态：<span
                                                v-html="house_status(item.listingStatus)"></span></span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                    <p>想要了解更多优质房源及周边信息，获取详细房源投资报告，请往下继续翻页留下您的联系方式↓</p>
                </section>
            </div>
            <div class="swiper-slide second-page">
                <clientRegister></clientRegister>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'
    import clientRegister from '../components/clientRegister.vue'

    let phoneReg = /^(1)[3|4|5|6|7|8|9](\d){9}$/;
    export default {
        data() {
            return {
                companyDetailsData: '',  //加载公司信息数据
                shareGroupHouseItem: [],    //本公司推荐房源数据
                mySwiper: null,
                shareId: window.location.href.split('shareId=')[1].split('&companyUuid=')[0],//分享组ID
                companyUUID: window.location.href.split('companyUuid=')[1].split('&level=')[0],//公司UUID
                level: window.location.href.split('&level=')[1],//用户查看层级
            }
        },
        mounted() {
            //swiper配置
            this.mySwiper = new Swiper('.swiper-container-clientShareHouse', {
                direction: 'vertical',//垂直滚动
                autoHeight: true, //高度随内容变化
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });
            //获取公司信息
            this.getCompanyDetailsData();
            //第一屏-获取分享组的房源详情
            this.getShareGroupHouseData();

        },

        methods: {
            //获取公司信息数据
            getCompanyDetailsData() {
                this.$get('/homepage/company/details?uuid=' + this.companyUUID).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.companyDetailsData = data.data;
                    } else {
                    }
                })
            },
            //第一屏-获取分享组的房源数据
            getShareGroupHouseData() {
                this.$get('/sharegroup/house/list?shareId=' + this.shareId).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.shareGroupHouseItem = data.data;
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
            > .swiper-wrapper {
                > .swiper-slide {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    overflow: auto;
                    > section {
                        width: 100%;
                        height: auto;
                        text-align: center;
                    }
                }
            }
        }

        /*第一屏——公司Logo、标题和分享房源列表*/
        .first-page {
            > section {
                height: 100% !important;
                > header {
                    background: #fff;
                    padding: 0.3rem;
                    text-align: center;
                    > img {
                        width: auto;
                        height: auto;
                        max-width: 150px;
                    }
                }
                > h4 {
                    font-size: 0.6rem;
                    margin: 0.6rem 0;
                    text-align: center;
                }
                .shareGroupHouse-box {
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
                > p {
                    font-size: 0.35rem;
                    color: #333;
                    text-align: center;
                    padding: 15px;
                }
            }
        }

        /*第二屏——客户注册*/
        .second-page {
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: url(/static/img/header-bg6.jpg) no-repeat center center;
            background-size: cover;
        }
    }

</style>
