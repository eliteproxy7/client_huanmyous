<template>
    <section class="houseDetails-public-header-content">
        <div class="header">
            <i></i>周边相似房源
        </div>
        <el-row class="content similarHouseContent clearfix" :gutter="30" type="flex" justify="center" style="margin: 0">
            <el-col :span="14" class="map-half">
                <div id="map-container"></div>
            </el-col>
            <el-col :span="10" class="rightBox">
                <article v-for="(item, index) in rightSimilarHouseItem" :key="index">
                    <img v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ item.heroImage" @click="goHouseDetails(item.houseId)">
                    <el-row class="right-box">
                        <h3 class="webkit-text-overflow-1lines">{{isNull0(item.address)}}</h3>
                        <el-col :span="12" class="left-content">
                            <p class="webkit-text-overflow-1lines">年份: {{isNull0(item.yearBuilt, '年')}}</p>
                            <p class="webkit-text-overflow-1lines">面积: {{isNull0_sqmt(item.livingArea)}}</p>
                            <p class="webkit-text-overflow-1lines" style="color: #2ea2f9;">{{isNull0_USD(item.listPrice)}}</p>
                            <p class="webkit-text-overflow-1lines">{{isNull0_RMB(item.listPrice)}}</p>
                        </el-col>
                        <el-col :span="12" class="right-content">
                            <i class="iconfont icon-dingwei2"></i>
                            <p>距离：{{isNull0($accounting.formatMoney(item.distance/1000, "", 1, "", ".", "%s%v"), 'km')}}</p>
                        </el-col>
                    </el-row>
                </article>

            </el-col>
        </el-row>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                houseId: this.$route.query.houseId, //房源id
                mainSimilarHouseItem:[],//周边相似房源里的主房源的数据
                rightSimilarHouseItem:[],//过滤掉了主房源的周边相似房源的数组
                myMap: null,
                options: null,
                marker: null,
                infowindow: null,
                bounds: null,
                oms: null,
                filterlongLat0: [],//过滤掉经纬度是0的数据，避免经纬度是0,0定位到非洲大西洋
            }
        },
        computed: {},
        created() {
        },
        mounted() {
            this.getSimilarityHouseData();//获取周边相似房源数据
        },
        methods: {
            //获取周边相似房源数据
            getSimilarityHouseData(){
                this.$get('/report/circum/house/'+ this.houseId).then(res => {
                    const data = res;
                    //取出周边相似房源里的主房源的数据
                    data.data.forEach((i) => {
                        if (i.isMain) {
                            this.mainSimilarHouseItem.push(i);
                        }
                    });
                    //过滤掉了主房源的周边相似房源的数组
                    data.data.forEach((i) => {
                        if (!i.isMain) {
                            this.rightSimilarHouseItem.push(i);
                        }
                    });
                    // console.log(this.mainSimilarHouseItem)
                    // console.log(this.rightSimilarHouseItem)

                    //地图配置
                    this.options = {
                        center: {lat: this.mainSimilarHouseItem[0].latitude, lng: this.mainSimilarHouseItem[0].longitude},//地图居中房源坐标
                        zoom: 12,
                        minZoom: 4,//最大缩小比例
                        mapTypeId: google.maps.MapTypeId.ROADMAP,//道路图
                        scrollwheel: true, //禁用滚轮缩放
                        panControl: true,    //
                        zoomControl: true,   //点击缩放按钮
                        mapTypeControl: true, //切换地图类型
                        scaleControl: true,  //缩放比例尺
                        streetViewControl: true, //街景控件
                        overviewMapControl: true, //
                        rotateControl: true,     //
                        fullscreenControl: true, //全屏查看
                    };
                    this.myMap = new google.maps.Map(document.getElementById("map-container"), this.options);

                    //
                    this.infowindow = new google.maps.InfoWindow();
                    this.bounds = new google.maps.LatLngBounds();
                    this.oms = new OverlappingMarkerSpiderfier(this.myMap, {
                        markersWontMove: true, // 我们保证不移动任何标记，允许优化
                        markersWontHide: true, // 我们承诺不改变任何标记的可见性，允许优化
                        basicFormatEvents: true, // 允许库跳过计算高级格式化信息
                        keepSpiderfied: true,   //默认情况下，OverlappingMarkerSpiderfier的工作原理与“Google地球”一样，当您单击蜘蛛标记时，标记在任何其他操作发生之前都将无法识别。
                        ignoreMapClick: true,   //默认情况下，单击地图上的空白位置会导致蜘蛛标记无法识别。设置此选项以true抑制该行为
                        nearbyDistance: 20 //这是标记被认为与点击的标记重叠的像素半径
                    });

                    //过滤掉经纬度是0的数据，避免经纬度是0,0定位到非洲大西洋
                    this.rightSimilarHouseItem.forEach((i) => {
                        if (i.latitude != 0 && i.latitude != null && i.latitude != '') {
                            this.filterlongLat0.push(i);
                        }
                    });

                    //创建标注点
                    this.filterlongLat0.forEach((i) => {
                        this.marker = new google.maps.Marker({
                            position: new google.maps.LatLng(i.latitude, i.longitude),
                            map: this.myMap,
                            thisID: i.houseId,
                            icon: '../../../static/img/hotCity-marker-img.png',
                            animation: google.maps.Animation.DROP//加载marker动画
                        });
                        //调整map，使其适应LatLngBounds,实现展示最佳视野的功能
                        this.bounds.extend(this.marker.getPosition());
                        this.myMap.fitBounds(this.bounds);
                        this.oms.addMarker(this.marker);
                        this.infowindow_open(this.marker);
                    });
                });
            },

            //调用打开infowindow函数
            infowindow_open(marker) {
                let _this = this;
                google.maps.event.addListener(marker, 'spider_click', function () {
                    let thisID = this.thisID;
                    //点击下一个infowindow时关闭上一个infowindow
                    if (_this.infowindow) {
                        _this.infowindow.close();
                    }
                    //获取infowindow要展示的数据
                    _this.$get('/report/circum/house/'+ thisID).then(res => {
                        const data = res;
                        if (data.status == 0) {
                            let infowindowMainHouseItem = [];
                            //取出周边相似房源里的主房源的数据
                            data.data.forEach((i) => {
                                if (i.isMain) {
                                    infowindowMainHouseItem.push(i);
                                }
                            });

                            let contentString = `<div id="map-house-infoWindow-content" houseid="${infowindowMainHouseItem[0].houseId}">
                                <div class="map-house-infoWindow-content-left">
                                    <img src="http://youhome.oss-cn-zhangjiakou.aliyuncs.com/${infowindowMainHouseItem[0].heroImage}"/>
                                </div>
                                <div class="map-house-infoWindow-content-right">
                                    <p>${_this.houseName(infowindowMainHouseItem[0])}</p>
                                    <p>面积：${_this.isNull0_sqft(infowindowMainHouseItem[0].livingArea)}（ ${_this.isNull0_sqmt(infowindowMainHouseItem[0].livingArea)}）</p>
                                    <p class="infoWindow-status">状态：${_this.house_status(infowindowMainHouseItem[0].listingStatus)}</p>
                                    <p class="infoWindow-housePrice">${_this.isNull0_USD(infowindowMainHouseItem[0].listPrice)}（${_this.isNull0_RMB(infowindowMainHouseItem[0].listPrice)}）</p>
                                </div>
                            </div>`;

                            _this.infowindow = new google.maps.InfoWindow({
                                content: contentString,
                                maxWidth: 450
                            });
                            _this.infowindow.open(_this.myMap, marker);
                            _this.myMap.setCenter(marker.getPosition());

                            //点击图片跳转到房源详情页
                            let addEvent = document.getElementById("map-house-infoWindow-content");
                            addEvent.addEventListener("click", () => {
                                _this.goHouseDetails(addEvent.getAttribute('houseid'));
                            },false);
                        } else {
                            _this.$message.error('暂无数据！')
                        }
                    });
                });
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
                window.location.reload();
            },

        },
        components: {}
    }
</script>

<style scoped lang="less" type="text/less">
    body {
        section {
            > .similarHouseContent {
                height: 450px;
                > div.map-half {
                    height: 100%;
                    position: relative;
                    #map-container {
                        width: 100%;
                        height: 100%;
                        #map-house-infoWindow-content {
                            overflow: hidden;
                            >.map-house-infoWindow-content-left {
                                width: 40%;
                                height: 107px;
                                float: left;
                                position: relative;
                                > img {
                                    width: 100%;
                                    height: 100%;
                                    cursor: pointer;
                                }
                                > i {
                                    display: block;
                                    cursor: pointer;
                                    font-size: 20px;
                                    z-index: 5;
                                    color: #00b6f6;
                                    font-weight: bold;
                                    -webkit-transition: .35s;
                                    -moz-transition: .35s;
                                    -ms-transition: .35s;
                                    -o-transition: .35s;
                                    transition: .35s;
                                    position: absolute;
                                    right: 10px;
                                    top: 10px;
                                }
                                i:hover {
                                    color: red;
                                    transform: scale(1.2);
                                }
                                > i#UNcollection-infoWindow-this {
                                    color: red;
                                }
                            }
                            >.map-house-infoWindow-content-right {
                                width: 60%;
                                float: left;
                                padding: 0 0 0 10px;
                                p {
                                    font-size: 13px;
                                    color: #000;
                                    overflow: hidden;
                                    margin: 5px 0;
                                }
                                p.infoWindow-houseName {
                                    font-size: 16px;
                                }
                                p.infoWindow-housePrice {
                                    font-size: 16px;
                                    color: #00aced;
                                    font-weight: bold;
                                }
                            }
                        }
                        #marker-label {
                            color: #fff;
                            font-weight: 700;
                            padding: 3px 3px 2px;
                            display: inline-block;
                            font-size: 11px;
                            line-height: 11px;
                            border-radius: 3px;
                            background: #2e7e36;
                            border: 1px solid #2e7e36;
                        }
                        #marker-label:before {
                            content: "";
                            display: block;
                            position: absolute;
                            left: 40%;
                            bottom: -8px;
                            height: 0;
                            border-left: 8px solid transparent;
                            border-right: 8px solid transparent;
                            border-top: 8px solid #2e7e36;
                        }
                        #marker-label.selected {
                            background: #e62e2e;
                            border: 1px solid #e62e2e;
                        }
                        .gmnoprint{
                            width: 40px !important;
                            >img{
                                width: 40px !important;
                            }
                        }
                    }
                }
                > div.rightBox {
                    height: 100%;
                    border: 1px solid #e3e2e7;
                    border-left: none;
                    overflow: auto;
                    >article {
                        margin: 0;
                        padding: 15px 0;
                        border-bottom: 1px solid #dee2e5;
                        overflow: hidden;
                        > img {
                            width: 30%;
                            height: 90px;
                            cursor: pointer;
                            float: left;
                        }
                        >.right-box{
                            width: 70%;
                            float: right;
                            overflow: hidden;
                            padding-left: 10px;
                            > h3 {
                                font-size: 16px;
                                color: #000;
                            }
                            >div.left-content{
                                width: 70%;
                                > p {
                                    color: #858585;
                                }
                            }
                            >div.right-content{
                                width: 30%;
                                height: 100%;
                                display: flex;
                                display: -webkit-flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                                padding: 4px 0;
                                margin: 10px 0 0 0;
                                >i{
                                    font-size: 20px;
                                    color: #2ea2f9;
                                }
                                >p{
                                    font-size: 14px;
                                    color: #000;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
