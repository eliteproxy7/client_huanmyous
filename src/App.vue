<template>
    <div id="app">
        <!--<router-view></router-view>-->

        <!--<keep-alive include="">-->
            <!--<router-view></router-view>-->
        <!--</keep-alive>-->

        <!--这里是需要keepalive的-->
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>

         <!--这里不会被keepalive-->
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        components: {
        }
    }
</script>

<style scoped lang="less" type="text/less">
    #app {
        height: 100%;
        > div {
            height: 100%;
        }
    }
</style>
