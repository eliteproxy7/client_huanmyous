<template>
    <section>
        <h4>
            <el-tooltip class="item" effect="dark" content="返回" placement="top">
                <i class="el-icon-arrow-left" @click="$router.back()"></i>
            </el-tooltip>
            客户基本信息
        </h4>
        <aside>
            <span>名称</span>
            <p>{{isNull0(detailsData.name)}}</p>
        </aside>
        <aside>
            <span>电话</span>
            <p>{{isNull0(detailsData.phone)}}</p>
        </aside>
        <aside>
            <span>邮箱</span>
            <p>{{isNull0(detailsData.email)}}</p>
        </aside>
        <aside>
            <span>性别</span>
            <p>{{sex_FN(detailsData.sex)}}</p>
        </aside>
        <aside>
            <span>微信</span>
            <p>{{isNull0(detailsData.email)}}</p>
        </aside>
        <aside>
            <span>QQ</span>
            <p>{{isNull0(detailsData.qq)}}</p>
        </aside>
        <aside>
            <span>目前所在地</span>
            <p>{{isNull0(detailsData.province) +'/'+ isNull0(detailsData.city) +'/'+ isNull0(detailsData.area)}}</p>
        </aside>
        <aside>
            <span>详细地址</span>
            <p>{{isNull0(detailsData.address)}}</p>
        </aside>
        <aside>
            <span>出生日期</span>
            <p>{{momentFormat(detailsData.birthdate, 'YYYY-MM-DD')}}</p>
        </aside>
        <aside>
            <span>年龄</span>
            <p>{{age_FN(new Date(parseInt(detailsData.birthdate)).toLocaleDateString())}}</p>
        </aside>
        <aside>
            <span>婚姻状况</span>
            <p>{{isMarital_FN(detailsData.marital)}}</p>
        </aside>
        <aside>
            <span>工作行业</span>
            <p>{{isNull0(detailsData.jobType)}}</p>
        </aside>
        <aside>
            <span>年收入</span>
            <p>{{isNull0(detailsData.income)}}</p>
        </aside>
        <aside>
            <span>职称</span>
            <p>{{isNull0(detailsData.jobTitle)}}</p>
        </aside>
        <aside>
            <span>获客来源</span>
            <p>{{isNull0(detailsData.source)}}</p>
        </aside>
        <aside>
            <span>所属顾问</span>
            <p>{{isNull0(detailsData.counselorName)}}</p>
        </aside>
        <h4>房源偏好</h4>
        <aside>
            <span>投资目的</span>
            <p>{{isNull0(detailsData.investmentObjective)}}</p>
        </aside>
        <aside>
            <span>资金来源</span>
            <p>{{isNull0(detailsData.capitalSource)}}</p>
        </aside>
        <aside>
            <span>房型倾向</span>
            <p>{{isNull0(detailsData.tendencyRoom)}}</p>
        </aside>
        <aside>
            <span>价位倾向</span>
            <p>{{isNull0(detailsData.tendencyPrice)}}</p>
        </aside>
        <aside>
            <span>面积倾向</span>
            <p>{{isNull0(detailsData.tendencySize)}}</p>
        </aside>
        <aside>
            <span>地点倾向</span>
            <p>{{isNull0(detailsData.tendencySite)}}</p>
        </aside>
        <aside>
            <span>学区评分倾向</span>
            <p>{{isNull0(detailsData.tendencySchool)}}</p>
        </aside>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                detailsData: {},//客户详情数据
                clientId: this.$route.query.clientId,
            }
        },
        created() {
        },
        mounted() {
            this.getCompanyData();//初始化数据
        },
        methods: {
            getCompanyData(){
                if (this.clientId) {//判断是否有clientid
                    this.$get('/client/detail/'+ this.clientId).then(res => {
                        // console.log(res.data)
                        this.detailsData = res.data;
                    })
                }
            },

        },
        computed: {
        }
    }
</script>

<style scoped lang="less" type="text/less">
    body {
        h4 {
            text-align: center;
            margin: 30px 0;
            > i {
                cursor: pointer;
                float: left;
                margin: 5px 0 0 0;
            }
            > i:hover {
                color: #00aced;
            }
        }
        section {
            padding: 0 0 0 15px;
            > aside {
                overflow: hidden;
                display: block;
                padding: 12px 0;
                font-size: 14px;
                border-bottom: 1px solid #e6e9f0;
                > span {
                    width: 100px;
                    text-align: left;
                    color: #afafaf;
                    float: left;
                }
                > p {
                    width: calc(~'100% - 100px');
                    color: #000;
                    float: left;
                }
            }
        }
    }
</style>
