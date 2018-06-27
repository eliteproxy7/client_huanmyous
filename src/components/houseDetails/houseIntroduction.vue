<template>
    <section class="houseDetails-public-header-content">
        <div class="header">
            <i></i>房源介绍
        </div>
        <div class="content clearfix">
            <p v-show="!isNoDataShow">{{isNull0(contentEN)}}</p>
            <h3 v-show="!isNoDataShow">以下翻译信息由百度提供:</h3>
            <p v-show="!isNoDataShow">{{isNull0(contentCN)}}</p>
            <h4 ref="Housing_introduction_content_NoData" v-show="isNoDataShow"></h4>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                houseId: this.$route.query.houseId,
                contentEN: '',//房源介绍英文
                contentCN: '',//房源介绍百度翻译
                isNoDataShow: false, //判断是否有无数据
            }
        },
        computed: {
        },
        created() {
        },
        mounted() {
            this.get_houseIntroduction();
        },
        methods: {
            //获取房源介绍数据
            get_houseIntroduction() {
                this.$get('/report/listings/' + this.houseId).then(res => {
                    const data = res;
                    if (data.status == 0) {
                        this.isNoDataShow = false;
                        this.contentEN = data.data.src;
                        this.contentCN = data.data.dst;
                    } else {
                        this.isNoDataShow = true;
                        this.$refs.Housing_introduction_content_NoData.innerText = data.msg;
                    }
                });
            },
        },
        components: {
        }
    }
</script>

<style scoped lang="less" type="text/less">
    body {
        .houseDetails-public-header-content{
            >.content{
                font-size: 15px;
                text-align: justify;
                >p{
                }
                >h3{
                    font-size: 20px;
                    margin: 20px 0;
                }
                > h4 {
                    font-size: 20px;
                    color: #000;
                    text-align: center;
                }
            }
        }
    }
</style>
