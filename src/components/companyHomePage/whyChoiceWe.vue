<template>
    <section>
        <h3>为什么选择我们</h3>
        <ul class="clearfix whyChoiceWe-box">
            <li v-for="(item, index) in setWhyChoiceWe" :key="index">
                <img v-lazy="'/static/img/'+ item.photo">
                <h5>{{item.title}}</h5>
                <p>{{item.introduction}}</p>
            </li>
        </ul>
        <div v-show="false">{{getSetWhyChoiceWe}}</div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                companyUUID: this.$route.query.companyUUID,//公司UUID
                setWhyChoiceWe: null,//配置的为什么选择我们模块的内容
            }
        },
        computed: {
            getSetWhyChoiceWe() {
                this.$store.getters.get_sevenModuleContent['modules'].forEach((i) => {
                    if (i.moduleName.indexOf('whyChoiceWe') != -1) {
                        this.setWhyChoiceWe = JSON.parse(i.moduleValue);
                        return i.moduleValue;
                    }
                });
            },
        },
        created() {
        },
        mounted() {

        },
        methods: {},
        components: {}
    }
</script>

<style scoped lang="less" type="text/less">
    body {
        section {
            padding: 60px 100px;
            background: #fff;
            > h3 {
                text-align: center;
                font-size: 27px;
                color: #474747;
                font-weight: bold;
                margin: 0 0 60px 0;
            }
            /deep/ .whyChoiceWe-box {
                > li {
                    float: left;
                    width: 20% !important;
                    text-align: center;
                    > img {
                        width: auto;
                        height: auto;
                    }
                    > h5 {
                        font-size: 23px;
                        color: #000;
                        margin: 20px 0 0 0;
                    }
                    > p {
                        width: 113px;
                        margin: 0 auto;
                        font-size: 18px;
                        color: #868686;
                        padding-top: 20px;
                    }
                }
                @media (min-width: 450px) and (max-width: 710px) {
                    > li {
                        width: 33.33% !important;
                    }

                    > li:nth-of-type(4),
                    > li:nth-of-type(5) {
                        width: 50% !important;
                        margin-top: 40px;
                    }
                }
            }
            @media (max-width: 450px) {
                .whyChoiceWe-box {
                    padding: 50px 0 50px 0;
                    > li {
                        width: 100% !important;
                        margin: 10px 0;
                        > p {
                            width: 100%;
                        }
                    }
                }
            }

        }
    }
</style>
