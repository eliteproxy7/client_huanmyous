<template>
    <section class="houseDetails-public-header-content">
        <div class="header">
            <i></i>基本信息
        </div>
        <div class="content clearfix">
            <el-row :gutter="20">
                <el-col>
                    <aside>
                        <div>地址</div>
                        <div>{{isNull0(houseBasicInfoAddress)}}</div>
                    </aside>
                </el-col>
                <el-col :span="8" v-for="(item, key, index) in houseBasicInfo" :key="index">
                    <aside>
                        <div>{{houseBasicInfoTranslation[key]}}</div>
                        <div>{{isPrice(key, item)}}</div>
                    </aside>
                </el-col>
            </el-row>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                houseId: this.$route.query.houseId,    //房源ID
                houseBasicInfoAddress: '',//房源基本信息——地址
                houseBasicInfo: [],//房源基本信息
                houseBasicInfoTranslation:{},//基本信息翻译字典

            }
        },
        created() {
        },
        mounted() {
            this.getHouseZipcode(); //获取房源所在邮编
            this.getHouseBasicInfoTranslation();//获取房源基本信息的翻译字典
            this.getHouseBasicInfo();//获取房源基本信息数据
        },
        computed: {},
        methods: {
            //获取房源基本信息的翻译字典
            getHouseBasicInfoTranslation(){
                this.$axios.get('static/js/details_values_translation.json').then(res => {
                    Promise.resolve(res.data);
                    this.houseBasicInfoTranslation = res.data;
                }).catch(error => {
                    Promise.reject(error);
                });
            },
            //获取房源所在邮编
            getHouseZipcode(){
                this.$get('/house/zip/'+ this.houseId).then(res => {
                    this.$store.commit('set_houseDetailsZipcode', res.data);
                });
            },
            //获取房源基本信息数据
            getHouseBasicInfo(){
                this.$get('/house/basic/info/'+ this.houseId).then(res => {
                    const data = res.data;
                    this.houseBasicInfoAddress = res.data.address;
                    this.houseBasicInfo = res.data;
                    delete this.houseBasicInfo.address;//删掉地址
                    // console.log(this.houseBasicInfo);
                    this.$store.commit('set_housePrice', res.data.listing_price);
                });
            },
            //判断要翻译的字段
            isPrice (key, item) {
                let val = '';
                // console.log(key, typeof item);
                if(key == 'listing_price' || key == 'average_price' || key == 'rent_price' || key == 'hoa_fee'){
                    val = item ? this.isNull0_USD(item) +'（'+ this.isNull0_RMB(item) +'）' : '-';
                }else if(key == 'property_tax'){
                    val = item ? item.split(':')[0] +'年缴纳$'+ item.split(':')[1] : '-';
                }else if(key == 'living_area'){
                    val = this.isNull0(item, '平方英尺')
                }else if( key == 'lot_area'){
                    val = this.isNull0(item, '英亩')
                }else{
                    val = this.isNull0(item)
                }
                return val;
            },

        },
        components: {}
    }
</script>

<style scoped lang="less" type="text/less">
    body {
        .houseDetails-public-header-content {
            > .content {
                aside {
                    width: 100%;
                    margin-top: 1px;
                    overflow: hidden;
                    > div:first-of-type {
                        width: 90px;
                        float: left;
                        padding: 10px 0 10px 10px;
                        text-align: left;
                        background: #efeff1;
                        font-size: 14px;
                        color: #343436;
                    }
                    > div:last-of-type {
                        width: calc(~"100% - 90px");
                        float: left;
                        padding: 10px 0 10px 10px;
                        text-align: left;
                        background: #fff;
                        font-size: 14px;
                        color: #343436;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -o-text-overflow: ellipsis;
                        -webkit-text-overflow: ellipsis;
                        -moz-text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
                .infoCenter {
                    > aside {
                        > div:first-of-type {
                            width: 118px;
                        }
                        > div:last-of-type {
                            width: calc(~"100% - 118px");
                        }
                        > div:last-of-type {
                            > i {
                                display: inline-block;
                                margin-left: 10px;
                                font-size: 14px;
                                color: #00b6ef;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
