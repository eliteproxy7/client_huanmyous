<template>
    <section class="houseDetails-public-header-content">
        <div class="header">
            <i></i>房源特征
        </div>
        <div class="content clearfix">
            <el-row :gutter="20">
                <!--v-if="index == asideIsShow"-->
                <el-col :span="8" v-for="(item, key, index) in houseCharacteristics" :key="index" v-show="asideIsShowFN(item, key, index)">
                    <aside>
                        <div>{{houseCharacteristicsTranslation[key]}}</div>
                        <div>{{translationFN(key, item)}}</div>
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
                houseId: '',    //房源ID
                houseCharacteristics: [],//房源特征
                houseCharacteristicsTranslation:{},//房源特征翻译字典

            }
        },
        created() {
        },
        mounted() {
            this.houseId = this.$route.query.houseId;
            this.getHouseCharacteristicsTranslation();//获取房源特征的翻译字典
            this.getHouseCharacteristics();//获取房源基本信息数据
        },
        computed: {},
        methods: {
            //获取房源特征的翻译字典
            getHouseCharacteristicsTranslation(){
                this.$axios.get('static/js/details_values_translation.json').then(res => {
                    Promise.resolve(res.data);
                    this.houseCharacteristicsTranslation = res.data;
                }).catch(error => {
                    Promise.reject(error);
                });
            },
            //获取房源基本信息数据
            getHouseCharacteristics(){
                this.$get('/house/characteristics/'+ this.houseId).then(res => {
                    const data = res.data;
                    this.houseCharacteristics = res.data;
                });
            },
            //判断要翻译的字段
            translationFN (key, item, index) {
                let val = '';
                if(Object.prototype.toString.call(item) === '[object Array]'){
                    if(item.length > 0){
                        let translationArr = [];
                        item.forEach((value, key, arr) => {
                            translationArr.push(this.houseCharacteristicsTranslation[value]);
                        });
                        val = translationArr.join();
                    }else{
                        val = '-';
                    }
                }else if(Object.prototype.toString.call(item) === '[object Number]'){//是Number类型直接展示出来
                    if(item){
                        val = this.isNull0(item);
                    }else{
                        val = '-';
                    }
                }else if(Object.prototype.toString.call(item) === '[object Boolean]'){//是Boolean类型直接展示出来
                    val = item ? '有' : '无';
                }else{
                    if(item){
                        val = this.houseCharacteristicsTranslation[item];
                    }else{
                        val = '-';
                    }
                }
                return val;
            },
            //根据翻译字段来判断，没有翻译的话就隐藏
            asideIsShowFN (key, item, index) {
                let val = '';
                if(key == null || key.length == 0){
                    val = false;
                }else{
                    val = true;
                }
                return val;
            }

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
                        width: 200px;
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
                        /*overflow: hidden;*/
                        /*text-overflow: ellipsis;*/
                        /*-o-text-overflow: ellipsis;*/
                        /*-webkit-text-overflow: ellipsis;*/
                        /*-moz-text-overflow: ellipsis;*/
                        /*white-space: nowrap;*/
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
