<template>
    <section class="houseDetails-public-header-content">
        <div class="header">
            <i></i>贷款计算器
        </div>
        <el-row class="content clearfix" :gutter="30" type="flex" justify="center" style="margin: 0">
            <el-col :span="12" class="left">
                <h3>房屋总价：{{isNull0_USD(getHousePrice)}}</h3>
                <article>
                    <aside>
                        <h5 class="left">首付（$）</h5>
                        <div class="right input">
                            <el-input v-model="downPaymentPrice" size="medium" auto-complete="on" prefix-icon="iconfont icon-dkw_daikuan-" disabled></el-input>
                        </div>
                    </aside>
                    <aside>
                        <h5 class="left">首付百分比（%）</h5>
                        <div class="right input">
                            <el-tooltip class="item" effect="dark" content="最低为1%，最大为99%" placement="top">
                                <el-input v-model.number="downPaymentPercentage" @change="downPaymentPercentageChange" size="medium" min="1" max="99" step="0.25" auto-complete="on" prefix-icon="iconfont icon-baifenbi"></el-input>
                            </el-tooltip>
                        </div>
                    </aside>
                    <aside>
                        <h5 class="left">年利率（%）</h5>
                        <div class="right input">
                            <el-tooltip class="item" effect="dark" content="最低为1%，最大为99%" placement="top">
                                <el-input v-model.number="AnnualInterestRate" @change="AnnualInterestRateChange" size="medium" min="1" max="99" auto-complete="on" prefix-icon="iconfont icon-icon_lishuaipeizhi"></el-input>
                            </el-tooltip>
                        </div>
                    </aside>
                    <aside>
                        <h5 class="left">贷款计划</h5>
                        <div class="right">
                            <el-select v-model="loanPlan" filterable clearable placeholder="请选择贷款计划" size="medium" @change="loanPlanChange">
                                <el-option label="30年固定利率" value="30"></el-option>
                                <el-option label="20年固定利率" value="20"></el-option>
                                <el-option label="15年固定利率" value="15"></el-option>
                            </el-select>
                        </div>
                    </aside>
                </article>
            </el-col>
            <el-col :span="12" class="right">
                <h3 id="Monthly-repayment">每月还贷总支出：{{isNull0_USD(monthlyLoanTotalSpending)}}</h3>
                <div class="chart-div" id="BarChart-Monthly-repayment-chart"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                houseId: this.$route.query.houseId, //房源id
                downPaymentPrice: 0,    //首付款价钱
                downPaymentPercentage: 20,    //首付款比例
                AnnualInterestRate: 4.2,        //年利率
                loanPlan: '30',     //贷款计划

                homeInsuranceRate: 0,       //房产保险年利率——接口返回的
                propertyTaxRate: 0,         //房产税年利率——接口返回的
                mortgageInsuranceRate: 0,   //抵押贷款保险年利率——接口返回的

                loanPrice: 0,                   //贷款额 = 房屋总价 - 首付款
                monthlyInterestRate: 0,         //月利率 = (年利率 AnnualInterestRate/100) / 12个月
                monthsNumber: 0,                //还款月数 = 选择的贷款计划的年数 * 12个月

                monthlyRepayment: 0,            //每月还款本息(月供) = 贷款额*月利率*(1+月利率)^n/[(1+月利率)^n-1]
                monthlyPropertyTaxes: 0,        //每月房产税 = 房价 * (房产税年利率/100) / 12个月
                monthlyHomeownersInsurance: 0,  //每月房产保险 = 房价 * (房产保险年利率/100) / 12个月
                mortgageInsurance: 0,           //抵押贷款保险(如果贷款比例<20，那么就要计算它) = 贷款额 * (抵押贷款保险年利率/100) / 12个月
                monthlyLoanTotalSpending: 0,    //每月还贷总支出 = 每月还款本息(月供) + 每月房产税 + 每月房产保险 + 抵押贷款保险(如果贷款比例<20，那么就要加上它)

                myEcharts: '',
            }
        },
        computed: {
            getHousePrice() {
                if(this.$store.getters.get_housePrice){
                    this.get_loancalc();
                }
                return this.$store.getters.get_housePrice
            },

        },
        created() {
        },
        mounted() {
            this.myEcharts = this.$echarts.init(document.getElementById('BarChart-Monthly-repayment-chart'));
            this.myEcharts.showLoading();
            window.addEventListener('resize', () => {
                this.myEcharts.resize();
            });
        },
        methods: {
            //获取贷款计算器所需的费率
            get_loancalc() {
                setTimeout(() =>{
                    this.homeInsuranceRate = 0.22;
                    this.mortgageInsuranceRate = 0.75;
                    this.propertyTaxRate = 1.2;
                    // 计算首付款价钱
                    this.downPaymentPrice = Math.round(this.getHousePrice * (parseFloat(this.downPaymentPercentage) / 100));
                    // 计算贷款额
                    this.loanPrice = Math.round(this.getHousePrice - this.downPaymentPrice);
                    // 计算月利率
                    this.monthlyInterestRate = parseFloat(this.AnnualInterestRate) / 100 / 12;
                    // 计算还款月数
                    this.monthsNumber = parseFloat(this.loanPlan) * 12;
                    // 计算每月房产税
                    this.monthlyPropertyTaxes = Math.round(this.getHousePrice * (this.propertyTaxRate / 100) / 12);
                    // 计算每月房产保险
                    this.monthlyHomeownersInsurance = Math.round(this.getHousePrice * (this.mortgageInsuranceRate / 100) / 12);
                    // 计算每月还款本息(月供)
                    this.monthlyRepayment = Math.round(this.loanPrice * this.monthlyInterestRate * Math.pow(1 + this.monthlyInterestRate, this.monthsNumber) / (Math.pow(1 + this.monthlyInterestRate, this.monthsNumber) - 1));
                    // 计算抵押贷款保险
                    this.mortgageInsurance = Math.round(this.loanPrice * (this.mortgageInsuranceRate / 100) / 12);
                    if(Math.round(this.downPaymentPercentage) >= 20){
                        this.mortgageInsurance = 0;
                    }
                    // 计算每月还贷总支出
                    this.monthlyLoanTotalSpending = this.monthlyRepayment + this.monthlyPropertyTaxes + this.monthlyHomeownersInsurance + this.mortgageInsurance;

                    console.log(this.getHousePrice, '房源价钱')
                    console.log(this.downPaymentPrice, '计算首付款的值')
                    console.log(this.loanPrice, '计算贷款额')
                    console.log(this.monthlyInterestRate, '计算月利率')
                    console.log(this.monthsNumber, '计算还款月数')
                    console.log(this.monthlyRepayment, '计算每月还款本息(月供)')
                    console.log(this.monthlyPropertyTaxes, '计算每月房产税')
                    console.log(this.monthlyHomeownersInsurance, '计算每月房产保险')
                    console.log(this.mortgageInsurance, '计算抵押贷款保险')
                    console.log(this.monthlyLoanTotalSpending, '计算每月还贷总支出')

                    this.monthlyLoanTotalSpending_charts(this.monthlyRepayment, this.monthlyPropertyTaxes, this.monthlyHomeownersInsurance, this.mortgageInsurance)
                },1000);


                // this.$get('/search/loancalc/' + this.houseId).then(res => {
                //     const data = res;
                //     if (data.status == 0) {
                //         this.homeInsuranceRate = data.data.homeInsuranceRate;
                //         this.mortgageInsuranceRate = data.data.mortgageInsuranceRate;
                //         this.propertyTaxRate = data.data.propertyTaxRate;
                //     } else {
                //     }
                // });
            },
            // 首付百分比改变，并计算首付款价钱
            downPaymentPercentageChange(value){
                // 计算首付款价钱
                // this.downPaymentPrice = Math.round(this.getHousePrice * (parseFloat(value) / 100));
                this.get_loancalc()
            },
            // 年利率改变
            AnnualInterestRateChange(value){
                // 计算月利率
                // this.monthlyInterestRate = parseFloat(value) / 100 / 12;
                this.get_loancalc()
            },
            //贷款计划变化
            loanPlanChange(value) {
                // 计算还款月数
                // this.monthsNumber = parseFloat(value) * 12;
                this.get_loancalc()
            },
            //每月还贷总支出——饼图
            monthlyLoanTotalSpending_charts(monthlyRepayment, monthlyPropertyTaxes, monthlyHomeownersInsurance, mortgageInsurance){
                this.myEcharts.hideLoading();
                this.myEcharts.setOption({
                    baseOption: {
                        legend: {
                            orient: 'vertical',
                            right: '30',
                            top: '30',
                            data: ['还贷本息', '房产税', '房产保险', '抵押贷款保险']
                        },
                        series: [{
                            type: 'pie',
                            radius: ['25%', '65%'],//圆的内外半径
                            center: ['45%', '55%'],//圆的X,Y轴平移
                            data: [
                                {
                                    value: monthlyRepayment,
                                    name: '还贷本息',
                                    itemStyle: {//圆形颜色
                                        normal: {color: '#00b8ee'}
                                    }
                                },
                                {
                                    value: monthlyPropertyTaxes,
                                    name: '房产税',
                                    itemStyle: {
                                        normal: {color: '#fe9e25'}
                                    }
                                },
                                {
                                    value: monthlyHomeownersInsurance,
                                    name: '房产保险',
                                    itemStyle: {
                                        normal: {color: '#8fc320'}
                                    }
                                },
                                {
                                    value: mortgageInsurance,
                                    name: '抵押贷款保险',
                                    itemStyle: {
                                        normal: {color: '#A22769'}
                                    }
                                }
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            label: {
                                normal: {
                                    formatter: param => {
                                        return param.name + '：' + this.$accounting.formatMoney(param.value, '$', 0);
                                    },
                                }
                            }
                        }]
                    },
                    media:[
                        {
                            query:{
                                maxWidth: 415,
                            },
                            option:{
                                legend: {
                                    orient: 'horizontal',
                                    left: 'center',
                                    top: '10',
                                    textStyle:{
                                        fontSize:11
                                    }
                                },
                                series: [{
                                    radius: ['17%', '50%'],//圆的内外半径
                                    center: ['49%', '55%'],//圆的X,Y轴平移
                                }]
                            }
                        },
                        {
                            query:{
                                maxWidth: 360,
                            },
                            option:{
                                series: [{
                                    radius: ['20%', '49%'],//圆的内外半径
                                    center: ['49%', '55%'],//圆的X,Y轴平移
                                    labelLine:{
                                        normal:{
                                            length
                                        }
                                    }
                                }]
                            }
                        },
                        {
                            query:{
                                maxWidth: 300,
                            },
                            option:{
                                series: [{
                                    radius: ['11%', '25%'],//圆的内外半径
                                    center: ['49%', '55%'],//圆的X,Y轴平移
                                    labelLine:{
                                        normal:{
                                            length
                                        }
                                    }
                                }]
                            }
                        }
                    ]
                });
            },
        },
        components: {}
    }
</script>

<style scoped lang="less" type="text/less">
    body {
        section{
            >.content{
                >div.left{
                    >h3{
                        font-size: 20px;
                        color: #000;
                        text-align: center;
                        margin: 0 0 30px 0;
                    }
                    >article{
                        width: 100%;
                        border: 1px solid #dfe3e6;
                        margin-top: 30px;
                        >aside{
                            width: 100%;
                            height: 60px;
                            line-height: 60px;
                            border-bottom: 1px solid #dfe3e6;
                            >h5{
                                width: 25%;
                                font-size: 15px;
                                color: #000;
                                text-align: center;
                                border-right: 1px solid #dfe3e6;
                            }
                            >div.right{
                                text-align: center;
                                width: 75%;
                                position: relative;
                                padding: 0 30px;
                                >div{
                                    width: 100%;
                                    text-indent: 10px;
                                }
                            }
                        }
                        >aside:last-of-type{
                            border: none;
                        }
                    }
                }
                >div.right{
                    position: relative;
                    >h3{
                        font-size: 20px;
                        color: #000;
                        text-align: center;
                        margin: 0 0 30px 0;
                    }
                    >p{
                        font-size: 14px;
                        color: #000;
                        text-align: center;
                        margin-top: 4px;
                    }
                    >div.chart-div{
                        width: 100%;
                        height: 250px;
                        border: 1px solid #dfe3e6;
                    }
                }
            }
        }
    }
</style>
