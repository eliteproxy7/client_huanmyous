<template>
    <article>
        <h4 class="">企业信息 <span><i>*</i> 为不可修改项</span></h4>
        <div>
            <span><i>*</i> 公司名称</span>
            <aside>{{isNull0(detailsData.name)}}</aside>
        </div>
        <div>
            <span><i>*</i> 证件类型</span>
            <aside>{{detailsData.credentialType == 1 ? '普通营业执照' : '多证合一营业执照'}}</aside>
        </div>
        <div v-if="isCredentialType">
            <span><i>*</i> 营业执照证件号</span>
            <aside>{{isNull0(detailsData.businessLicenseNumber)}}</aside>
        </div>
        <div v-if="isCredentialType">
            <span><i>*</i> 组织机构代码</span>
            <aside>{{isNull0(detailsData.organizationCode)}}</aside>
        </div>
        <div v-if="!isCredentialType">
            <span><i>*</i> 统一社会信用代码</span>
            <aside>{{isNull0(detailsData.creditCode)}}</aside>
        </div>
        <div>
            <span><i>*</i> 证件图片</span>
            <aside>
                <el-button type="primary" @click="licenseImg_dialog = true" size="small" icon="iconfont icon-tupian"> 查看证件图片</el-button>
            </aside>
        </div>
        <div>
            <span>公司联系电话</span>
            <aside>{{isNull0(detailsData.companyTel)}}</aside>
        </div>
        <div>
            <span>公司联系邮箱</span>
            <aside>{{isNull0(detailsData.companyEmail)}}</aside>
        </div>
        <div>
            <span>公司所在地</span>
            <aside>{{isNull0(detailsData.province) + ' ' + isNull0(detailsData.city) + ' ' + isNull0(detailsData.area)}}</aside>
        </div>
        <div>
            <span>详细地址</span>
            <aside>{{isNull0(detailsData.address)}}</aside>
        </div>
        <div>
            <span>公司人数</span>
            <aside>{{isNull0(detailsData.scale)}}</aside>
        </div>
        <div>
            <span>公司网站</span>
            <aside>{{isNull0(detailsData.website)}}</aside>
        </div>
        <div>
            <span>公司Logo</span>
            <aside>
                <img alt="" v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ detailsData.logo">
            </aside>
        </div>
        <div>
            <span>公司微信公众号</span>
            <aside>{{isNull0(detailsData.officialAccounts)}}</aside>
        </div>
        <div>
            <span>公司微信服务号</span>
            <aside>{{isNull0(detailsData.serviceNumber)}}</aside>
        </div>
        <div>
            <span>公司公众号二维码</span>
            <aside>
                <img alt="" v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ detailsData.officialAccountsQRCode">
            </aside>
        </div>
        <div>
            <span>负责人姓名</span>
            <aside>{{isNull0(detailsData.principalName)}}</aside>
        </div>
        <div>
            <span>负责人联系电话</span>
            <aside>{{isNull0(detailsData.principalPhone)}}</aside>
        </div>
        <div>
            <span>负责人邮箱</span>
            <aside>{{isNull0(detailsData.principalEmail)}}</aside>
        </div>
        <div>
            <span><i>*</i> 管理员联系电话</span>
            <aside>{{isNull0(detailsData.phone)}}</aside>
        </div>

        <el-dialog
            title="证件图片："
            :visible.sync="licenseImg_dialog"
            width="60%"
            center>
            <el-row style="width: 100%; text-align: center">
                <img alt="" v-lazy="'http://youhome.oss-cn-zhangjiakou.aliyuncs.com/'+ detailsData.photo" style="width: auto; max-width: 100%;">
            </el-row>
        </el-dialog>

    </article>
</template>

<script>
    export default {
        data() {
            return {
                detailsData: {},    //公司详情信息
                isCredentialType: true,     //根据证件类型判断显示统一社会信用代码、营业执照证件号-组织机构代码
                licenseImg_dialog: false,   //证件图片大图的Dialog对话框
            }
        },
        created() {
        },
        mounted() {
            this.getCompanyDetailsData();
        },
        methods: {
            //获取公司详情信息
            getCompanyDetailsData() {
                this.$get('/company/details').then(res => {
                    this.detailsData = res.data;
                    //根据证件类型判断显示统一社会信用代码、营业执照证件号-组织机构代码
                    // if(res.data.credentialType == 1){
                    //     this.isCredentialType = true;
                    // }else if(res.data.credentialType == 2){
                    //     this.isCredentialType = false;
                    // }
                    localStorage.companyUUID = res.data.uuid;    //公司的uuid——统计图表用
                })
            }
        }
    }
</script>

<style scoped lang="less" type="text/less">
    body{
        article {
            > h4 {
                font-size: 18px;
                color: #000;
                > span {
                    color: #afafaf;
                    font-size: 13px;
                    > i {
                        font-size: 14px;
                        color: red;
                    }
                }
            }
            > div {
                margin: 30px 0;
                overflow: hidden;
                > span {
                    width: 125px;
                    text-align: left;
                    color: #afafaf;
                    float: left;
                    > i {
                        font-size: 14px;
                        color: red;
                    }
                }
                > aside {
                    padding-left: 38px;
                    color: #000;
                    float: left;
                    >img{
                        max-width: 300px;
                    }
                }
            }
        }
    }
</style>
