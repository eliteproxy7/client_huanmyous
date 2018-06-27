// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
import {routes} from './routes.js'
Vue.use(VueRouter);
const router = new VueRouter({
    routes,
    mode: 'history',
    //解决使用keep-alive后，第二个页面可能继承第一个页面的滚动条的高度
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
});

// 引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';//引入element-ui样式
Vue.use(ElementUI);

//引入懒加载插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: '../../../static/img/houseList-noData.jpg',//当加载图片失败的时候
    loading: '../../../static/img/loading1.svg',//当加载图片中的时候
    // loading: '../../../static/img/loading.gif',//当加载图片中的时候
    attempt: 1
});

//省市区三级联动
import 'vue-area-linkage/dist/index.css'; // v2 or higher
import VueAreaLinkage from 'vue-area-linkage';
Vue.use(VueAreaLinkage);

//axios及其封装方法
import axios from 'axios'
import {Get, Post, Put, Delete} from './axios.js'
//定义全局变量
Vue.prototype.$get = Get;
Vue.prototype.$post = Post;
Vue.prototype.$put = Put;
Vue.prototype.$delete = Delete;
Vue.prototype.$axios = axios;

//点击水波纹效果
import Ripple from 'vue-ripple-directive';

Ripple.color = 'rgba(255, 255, 255, 0.35)';
Vue.directive('ripple', Ripple);

// 引入echarts基本模板
let echarts = require('echarts/lib/echarts');
// 引入饼图
require('echarts/lib/chart/pie');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入折线图
require('echarts/lib/chart/line');
// 引入提示框、图例和标题等组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/title');
require("echarts/lib/component/dataZoom");
require("echarts/lib/component/markPoint");
require("echarts/lib/component/toolbox");
require("echarts/lib/component/grid");
require("echarts/lib/component/visualMap");
Vue.prototype.$echarts = echarts;

//货币格式化
import accounting from '../static/js/accounting.min.js'
Vue.prototype.$accounting = accounting;

//全屏相册插件
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview);




Vue.config.productionTip = false;//阻止vue在启动时生成生产提示。为true会在生产环境提示
Vue.config.debug = true;//开启debug模式

//引用全局方法
import globalBase from './globalBase.js'
Vue.use(globalBase);//将全局方法和自定义过滤器当做插件来进行注册

//vuex全局状态管理
import store from './store';

// 全局守卫
router.beforeEach(function (to, from, next) {
    // 公司主页/也叫管理员主页
    const companyRoutes = [
        '/company_details',      //公司详情
        '/company_modify',       //修改公司信息
        '/company_houseList',    //房源列表
        '/company_clientList',   //客户列表
        '/company_clientDetails',        //客户详情
        '/company_consultantList',      //顾问列表
        '/company_consultantDetails',    //顾问详情
        '/company_consultantCreateModify',     //创建顾问
        '/company_ownHouseList',         //本公司自有房源列表
        '/company_uplodeOwnHouse',       //上传修改自有房源
        '/company_landingPageModify',    //公司落地页配置
        '/company_homePageList',         //公司二级主页列表
        '/company_homePageCreateModify', //新建修改二级主页模板
        '/company_messageList',          //站内信列表
        '/company_messageSend',          //发送站内信
        '/company_statisticalDataChart', //统计数据图表
        '/massSMS', //群发短信
        '/massSMS_sendSMS', //发送短信
        '/massSMS_historyList', //短信历史列表
        '/massSMS_details', //短信详情
        '/massEmail',   //群发邮件
        '/massEmail_sendEmail', //发送邮件
        '/massEmail_historyList',   //邮件历史列表
        '/massEmail_details',   //邮件详情
    ];

    // 顾问主页
    const consultantRoutes = [
        '/consultant_details',  //顾问个人信息
        '/consultant_clientList',   //客户列表
        '/consultant_clientCreateModify',   //创建修改客户
        '/consultant_houseList',    //房源列表
        '/consultant_shareGroupList',   //分享组列表
        '/consultant_shareGroupDetails',    //分享组详情
        '/consultant_messageList',  //站内信列表
        '/massSMS', //群发短信
        '/massSMS_sendSMS', //发送短信
        '/massSMS_historyList', //短信历史列表
        '/massSMS_details', //短信详情
        '/massEmail',   //群发邮件
        '/massEmail_sendEmail', //发送邮件
        '/massEmail_historyList',   //邮件历史列表
        '/massEmail_details',   //邮件详情
    ];

    // 公共组件——不拦截
    const componentsArr = [
        '/landingPage',//公司落地页
        '/companyHomePage1',//公司落地页
        '/clientShareHouse',//移动端-客户看的房源分享页
        '/houseDetails',//房源详情页
        '/companyIntroduce',//优房数据公司介绍
        '/businessIntroduce',//业务介绍
        '/useTerms',//使用条款
        '/privacyAgreement',//隐私协议
        '/contactUS',//联系我们
        '/',//登录页
        '/register',//注册页
    ];

    //已登录状态
    if (localStorage.userid || localStorage.roleId) {
        next();//不拦截
        if (localStorage.roleId == 1) {//判断登录账号是公司管理员账号，则不能访问顾问主页
            //检测某个数组是否包含给定的值，返回一个布尔值
            if(companyRoutes.includes(to.path)){
                next();//不拦截，//表示路由成功，直接进入to路由，不会再次调用router.beforeEach()
            }else{
                if(componentsArr.includes(to.path)){
                    next();//不拦截，//表示路由成功，直接进入to路由，不会再次调用router.beforeEach()
                }else{
                    next('/company');//表示路由拦截成功，重定向至公司管理员主页，会再次调用router.beforeEach()
                }
            }
        } else if (localStorage.roleId == 2) {//判断登录账号是顾问账号，则不能访问公司管理员主页
            if(consultantRoutes.includes(to.path)){
                next();//不拦截，//表示路由成功，直接进入to路由，不会再次调用router.beforeEach()
            }else{
                if(componentsArr.includes(to.path)){
                    next();//不拦截，//表示路由成功，直接进入to路由，不会再次调用router.beforeEach()
                }else{
                    next('/consultant');//表示路由拦截成功，重定向至顾问主页，会再次调用router.beforeEach()
                }
            }
        }
    } else {
        //未登录状态
        //检测某个数组是否包含给定的值，返回一个布尔值
        if(componentsArr.includes(to.path)){
            next();//不拦截，//表示路由成功，直接进入to路由，不会再次调用router.beforeEach()
        }else{
            next('/');//表示路由拦截成功，重定向至login，会再次调用router.beforeEach()
        }
    }
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App,
    },
    template: '<App/>',
    store
});

