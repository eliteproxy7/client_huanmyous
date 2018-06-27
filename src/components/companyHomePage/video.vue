<template>
    <section>
        <h3>宣传视频</h3>
        <article class="homepage-video-box" v-html="setVideoIframeCode"></article>
        <div v-show="false">{{getSetVideoIframeCode}}</div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                companyUUID: this.$route.query.companyUUID,//公司UUID
                setVideoIframeCode: null,//配置的宣传视频模块的内容
            }
        },
        computed: {
            getSetVideoIframeCode() {
                this.$store.getters.get_sevenModuleContent['modules'].forEach((i) => {
                    if (i.moduleName.indexOf('video') != -1) {
                        this.setVideoIframeCode = i.moduleValue;
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
        }
    }
</style>
