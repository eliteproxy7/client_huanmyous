<template>
    <div v-if="loadComponents">
        <homepage-header></homepage-header>

        <GoldConsultant v-if="module2Content_GoldConsultant || module2Content_companyRecommendHouse || module2Content_consultantRecommendHouse || module2Content_whyChoiceWe || module2Content_video"></GoldConsultant>
        <companyRecommendHouse v-if="module3Content_GoldConsultant || module3Content_companyRecommendHouse || module3Content_consultantRecommendHouse || module3Content_whyChoiceWe || module3Content_video"></companyRecommendHouse>
        <consultantRecommendHouse v-if="module4Content_GoldConsultant || module4Content_companyRecommendHouse || module4Content_consultantRecommendHouse || module4Content_whyChoiceWe || module4Content_video"></consultantRecommendHouse>
        <whyChoiceWe v-if="module5Content_GoldConsultant || module5Content_companyRecommendHouse || module5Content_consultantRecommendHouse || module5Content_whyChoiceWe || module5Content_video"></whyChoiceWe>
        <homepage-video v-if="module6Content_GoldConsultant || module6Content_companyRecommendHouse || module6Content_consultantRecommendHouse || module6Content_whyChoiceWe || module6Content_video"></homepage-video>

        <homepage-footer></homepage-footer>
    </div>
</template>

<script>
    import Header from './header.vue';  //公司二级主页——头部
    import Footer from './footer.vue';  //公司二级主页——底部
    import GoldConsultant from './GoldConsultant.vue'   //公司二级主页——金牌顾问
    import companyRecommendHouse from './companyRecommendHouse.vue' //公司二级主页——公司推荐房源
    import consultantRecommendHouse from './consultantRecommendHouse.vue'   //公司二级主页——顾问推荐房源
    import whyChoiceWe from './whyChoiceWe.vue' //公司二级主页——为什么选择我们
    import video from './video.vue' //公司二级主页——宣传视频

    export default {
        data() {
            return {
                companyUUID: this.$route.query.companyUUID,//公司UUID
                homePageId: this.$route.query.hid,//二级主页的ID
                issue: this.$route.query.issue,//判断是否发布、未发布
                loadComponents: false,//判断是否加载子组件

                module2Content_GoldConsultant: false,//模块2放什么内容——金牌顾问
                module2Content_companyRecommendHouse: false,//模块2放什么内容——公司推荐房源
                module2Content_consultantRecommendHouse: false,//模块2放什么内容——顾问推荐房源
                module2Content_whyChoiceWe: false,//模块2放什么内容——为什么选择我们
                module2Content_video: false,//模块2放什么内容——宣传视频

                module3Content_GoldConsultant: false,//模块3放什么内容——金牌顾问
                module3Content_companyRecommendHouse: false,//模块3放什么内容——公司推荐房源
                module3Content_consultantRecommendHouse: false,//模块3放什么内容——顾问推荐房源
                module3Content_whyChoiceWe: false,//模块3放什么内容——为什么选择我们
                module3Content_video: false,//模块3放什么内容——宣传视频

                module4Content_GoldConsultant: false,//模块4放什么内容——金牌顾问
                module4Content_companyRecommendHouse: false,//模块4放什么内容——公司推荐房源
                module4Content_consultantRecommendHouse: false,//模块4放什么内容——顾问推荐房源
                module4Content_whyChoiceWe: false,//模块4放什么内容——为什么选择我们
                module4Content_video: false,//模块4放什么内容——宣传视频

                module5Content_GoldConsultant: false,//模块5放什么内容——金牌顾问
                module5Content_companyRecommendHouse: false,//模块5放什么内容——公司推荐房源
                module5Content_consultantRecommendHouse: false,//模块5放什么内容——顾问推荐房源
                module5Content_whyChoiceWe: false,//模块5放什么内容——为什么选择我们
                module5Content_video: false,//模块5放什么内容——宣传视频

                module6Content_GoldConsultant: false,//模块6放什么内容——金牌顾问
                module6Content_companyRecommendHouse: false,//模块6放什么内容——公司推荐房源
                module6Content_consultantRecommendHouse: false,//模块6放什么内容——顾问推荐房源
                module6Content_whyChoiceWe: false,//模块6放什么内容——为什么选择我们
                module6Content_video: false,//模块6放什么内容——宣传视频

            }
        },
        computed: {},
        created() {
        },
        mounted() {
            this.getCompanyDetailsData();//获取公司详情信息
            //获取配置的七个模块的内容
            if(this.issue == 'true'){
                this.getSevenModuleContent('/template/html/data/details?uuid=' + this.companyUUID)
            }else{
                this.getSevenModuleContent('/template/html/data/preview?id=' + this.homePageId)
            }
        },
        methods: {
            //获取公司详情信息
            getCompanyDetailsData() {
                this.$get('/homepage/company/details?uuid='+ this.companyUUID).then(res => {
                    this.$store.commit('set_homePageCompanyDetails', res.data);
                })
            },
            //获取配置的七个模块的内容
            getSevenModuleContent(url) {
                this.$get(url).then(res => {
                    this.$store.commit('set_sevenModuleContent', res.data);
                    this.loadComponents = true;

                    //判断模块2~6放什么内容
                    res.data['modules'].forEach((i) => {
                        switch (i.moduleName) {
                            case 'module2/GoldConsultant':
                                this.module2Content_GoldConsultant = true;//模块2放什么内容——金牌顾问
                                break;
                            case 'module2/companyRecommendHouse':
                                this.module2Content_companyRecommendHouse = true;//模块2放什么内容——公司推荐房源
                                break;
                            case 'module2/consultantRecommendHouse':
                                this.module2Content_consultantRecommendHouse = true;//模块2放什么内容——顾问推荐房源
                                break;
                            case 'module2/whyChoiceWe':
                                this.module2Content_whyChoiceWe = true;//模块2放什么内容——为什么选择我们
                                break;
                            case 'module2/video':
                                this.module2Content_video = true;//模块2放什么内容——宣传视频
                                break;

                            case 'module3/GoldConsultant':
                                this.module3Content_GoldConsultant = true;//模块3放什么内容——金牌顾问
                                break;
                            case 'module3/companyRecommendHouse':
                                this.module3Content_companyRecommendHouse = true;//模块3放什么内容——公司推荐房源
                                break;
                            case 'module3/consultantRecommendHouse':
                                this.module3Content_consultantRecommendHouse = true;//模块3放什么内容——顾问推荐房源
                                break;
                            case 'module3/whyChoiceWe':
                                this.module3Content_whyChoiceWe = true;//模块3放什么内容——为什么选择我们
                                break;
                            case 'module3/video':
                                this.module3Content_video = true;//模块3放什么内容——宣传视频
                                break;

                            case 'module4/GoldConsultant':
                                this.module4Content_GoldConsultant = true;//模块4放什么内容——金牌顾问
                                break;
                            case 'module4/companyRecommendHouse':
                                this.module4Content_companyRecommendHouse = true;//模块4放什么内容——公司推荐房源
                                break;
                            case 'module4/consultantRecommendHouse':
                                this.module4Content_consultantRecommendHouse = true;//模块4放什么内容——顾问推荐房源
                                break;
                            case 'module4/whyChoiceWe':
                                this.module4Content_whyChoiceWe = true;//模块4放什么内容——为什么选择我们
                                break;
                            case 'module4/video':
                                this.module4Content_video = true;//模块4放什么内容——宣传视频
                                break;

                            case 'module5/GoldConsultant':
                                this.module5Content_GoldConsultant = true;//模块5放什么内容——金牌顾问
                                break;
                            case 'module5/companyRecommendHouse':
                                this.module5Content_companyRecommendHouse = true;//模块5放什么内容——公司推荐房源
                                break;
                            case 'module5/consultantRecommendHouse':
                                this.module5Content_consultantRecommendHouse = true;//模块5放什么内容——顾问推荐房源
                                break;
                            case 'module5/whyChoiceWe':
                                this.module5Content_whyChoiceWe = true;//模块5放什么内容——为什么选择我们
                                break;
                            case 'module5/video':
                                this.module5Content_video = true;//模块5放什么内容——宣传视频
                                break;

                            case 'module6/GoldConsultant':
                                this.module6Content_GoldConsultant = true;//模块6放什么内容——金牌顾问
                                break;
                            case 'module6/companyRecommendHouse':
                                this.module6Content_companyRecommendHouse = true;//模块6放什么内容——公司推荐房源
                                break;
                            case 'module6/consultantRecommendHouse':
                                this.module6Content_consultantRecommendHouse = true;//模块6放什么内容——顾问推荐房源
                                break;
                            case 'module6/whyChoiceWe':
                                this.module6Content_whyChoiceWe = true;//模块6放什么内容——为什么选择我们
                                break;
                            case 'module6/video':
                                this.module6Content_video = true;//模块6放什么内容——宣传视频
                                break;
                            default:
                                return;
                        }
                    });


                })
            },
        },
        components: {
            'homepage-header': Header,
            'homepage-footer': Footer,
            'GoldConsultant': GoldConsultant,
            'companyRecommendHouse': companyRecommendHouse,
            'consultantRecommendHouse': consultantRecommendHouse,
            'whyChoiceWe': whyChoiceWe,
            'homepage-video': video,
        }
    }
</script>

<style lang="less" type="text/less">
    body {
        .main {
            padding: 30px;
            .content {
            }
        }
    }
</style>
