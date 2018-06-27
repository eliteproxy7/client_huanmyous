<template>
    <article>
        <el-row :gutter="30">
            <el-col :span="3">姓名</el-col>
            <el-col :span="10">{{isNull0(detailsData.name)}}</el-col>
        </el-row>
        <el-row :gutter="30">
            <el-col :span="3">联系电话</el-col>
            <el-col :span="3">{{isNull0(detailsData.phone)}}</el-col>
        </el-row>
        <el-row :gutter="30">
            <el-col :span="3">邮箱</el-col>
            <el-col :span="3">{{isNull0(detailsData.email)}}</el-col>
        </el-row>
        <el-row :gutter="30">
            <el-col :span="3">性别</el-col>
            <el-col :span="3">{{sex_FN(detailsData.sex)}}</el-col>
        </el-row>
        <el-row :gutter="30">
            <el-col :span="3">工号</el-col>
            <el-col :span="3">{{isNull0(detailsData.jobNumber)}}</el-col>
        </el-row>
        <el-row :gutter="30">
            <el-col :span="3">微信号</el-col>
            <el-col :span="3">{{isNull0(detailsData.weixin)}}</el-col>
        </el-row>
        <el-row :gutter="30">
            <el-col :span="3">QQ号</el-col>
            <el-col :span="3">{{isNull0(detailsData.qq)}}</el-col>
        </el-row>
        <el-row :gutter="30">
            <el-col :span="3">负责售卖地区</el-col>
            <el-col :span="3">{{isNull0(detailsData.responsiblePlace)}}</el-col>
        </el-row>
        <el-row :gutter="30">
            <el-col :span="3">头像</el-col>
            <img v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ detailsData.photo" style="max-width: 200px">
        </el-row>
        <el-row :gutter="30">
            <el-col :span="3">名片</el-col>
            <img v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ detailsData.businessCard" style="max-width: 500px">
        </el-row>
    </article>
</template>

<script>
    export default {
        data() {
            return {
                detailsData: {}
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.$get('/counselor/detail').then(res => {
                    this.detailsData = res.data;
                })
            }
        }
    }
</script>

<style scoped lang="less" type="text/less">
    body{
        article {
            >div{
                margin: 30px 0;
                text-align: left;
                vertical-align: middle;
            }
        }
    }
</style>
