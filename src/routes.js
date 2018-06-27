const Login = r => require.ensure([], () => r(require('@/components/login.vue')), 'Login');//登录页
const Register = r => require.ensure([], () => r(require('@/components/register.vue')), 'Register');//注册页

//公司主页/也叫管理员主页
const company = r => require.ensure([], () => r(require('@/page/Company/company.vue')), 'company');//注册页
const company_details = r => require.ensure([], () => r(require('@/page/Company/companyDetails.vue')), 'company_details');//公司详情
const company_modify = r => require.ensure([], () => r(require('@/page/Company/companyModify.vue')), 'company_modify');//修改公司信息
const company_houseList = r => require.ensure([], () => r(require('@/page/Company/houseList.vue')), 'company_houseList');//房源列表
const company_clientList = r => require.ensure([], () => r(require('@/page/Company/clientList.vue')), 'company_clientList');//客户列表
const company_clientDetails = r => require.ensure([], () => r(require('@/page/Company/clientDetails.vue')), 'company_clientDetails');//客户详情
const company_consultantList = r => require.ensure([], () => r(require('@/page/Company/consultantList.vue')), 'company_consultantList');//顾问列表
const company_consultantDetails = r => require.ensure([], () => r(require('@/page/Company/consultantDetails.vue')), 'company_consultantDetails');//顾问详情
const company_consultantCreateModify = r => require.ensure([], () => r(require('@/page/Company/consultantCreateModify.vue')), 'company_consultantCreateModify');//创建修改顾问
const company_ownHouseList = r => require.ensure([], () => r(require('@/page/Company/ownHouseList.vue')), 'company_ownHouseList');//本公司自有房源列表
const company_uplodeOwnHouse = r => require.ensure([], () => r(require('@/page/Company/uplodeOwnHouse.vue')), 'company_uplodeOwnHouse');//上传修改自有房源
const company_landingPageModify = r => require.ensure([], () => r(require('@/page/Company/landingPageModify.vue')), 'company_landingPageModify');//公司落地页配置
const company_homePageList = r => require.ensure([], () => r(require('@/page/Company/homePageList.vue')), 'company_homePageList');//公司二级主页列表
const company_homePageCreateModify = r => require.ensure([], () => r(require('@/page/Company/homePageCreateModify.vue')), 'company_homePageCreateModify');//新建修改二级主页模板
const company_messageList = r => require.ensure([], () => r(require('@/page/Company/messageList.vue')), 'company_messageList');//站内信列表
const company_messageSend = r => require.ensure([], () => r(require('@/page/Company/messageSend.vue')), 'company_messageSend');//发送站内信
const company_statisticalDataChart = r => require.ensure([], () => r(require('@/page/Company/statisticalDataChart.vue')), 'company_statisticalDataChart');//统计数据图表

// 顾问主页
const consultant = r => require.ensure([], () => r(require('@/page/Consultant/consultant.vue')), 'consultant');
const consultant_details = r => require.ensure([], () => r(require('@/page/Consultant/consultantDetails.vue')), 'consultant_details');//顾问个人信息
const consultant_clientList = r => require.ensure([], () => r(require('@/page/Consultant/clientList.vue')), 'consultant_clientList');//客户列表
const consultant_clientCreateModify = r => require.ensure([], () => r(require('@/page/Consultant/clientCreateModify.vue')), 'consultant_clientCreateModify');//创建修改客户
const consultant_houseList = r => require.ensure([], () => r(require('@/page/Consultant/houseList.vue')), 'consultant_houseList');//房源列表
const consultant_shareGroupList = r => require.ensure([], () => r(require('@/page/Consultant/shareGroupList.vue')), 'consultant_shareGroupList');//分享组列表
const consultant_shareGroupDetails = r => require.ensure([], () => r(require('@/page/Consultant/shareGroupDetails.vue')), 'consultant_shareGroupDetails');//分享组详情
const consultant_messageList = r => require.ensure([], () => r(require('@/page/Consultant/messageList.vue')), 'consultant_messageList');//站内信列表

//群发短信
const massSMS = r => require.ensure([], () => r(require('@/components/massSMS/massSMS.vue')), 'massSMS');
const massSMS_sendSMS = r => require.ensure([], () => r(require('@/components/massSMS/sendSMS.vue')), 'massSMS_sendSMS');//发送短信
const massSMS_historyList = r => require.ensure([], () => r(require('@/components/massSMS/SMSHistoryList.vue')), 'massSMS_historyList');//短信历史列表
const massSMS_details = r => require.ensure([], () => r(require('@/components/massSMS/SMSDetails.vue')), 'massSMS_details');//短信详情

//群发邮件
const massEmail = r => require.ensure([], () => r(require('@/components/massEmail/massEmail.vue')), 'massEmail');
const massEmail_sendEmail = r => require.ensure([], () => r(require('@/components/massEmail/sendEmail.vue')), 'massEmail_sendEmail');//发送邮件
const massEmail_historyList = r => require.ensure([], () => r(require('@/components/massEmail/EmailHistoryList.vue')), 'massEmail_historyList');//邮件历史列表
const massEmail_details = r => require.ensure([], () => r(require('@/components/massEmail/EmailDetails.vue')), 'massEmail_details');//邮件详情

//房源详情页
const houseDetails = r => require.ensure([], () => r(require('@/components/houseDetails/houseDetails.vue')), 'houseDetails');

//公司落地页
const landingPage = r => require.ensure([], () => r(require('@/components/landingpage.vue')), 'landingPage');

//公司二级主页
const companyHomePage1 = r => require.ensure([], () => r(require('@/components/companyHomePage/companyHomePage1.vue')), 'companyHomePage1');

//移动端-客户看的房源分享页
const clientShareHouse = r => require.ensure([], () => r(require('@/components/clientShareHouse.vue')), 'clientShareHouse');

// 优房数据公司介绍
const YFSJinfo = r => require.ensure([], () => r(require('@/components/YFSJinfo/YFSJinfo.vue')), 'YFSJinfo');
const companyIntroduce = r => require.ensure([], () => r(require('@/components/YFSJinfo/companyIntroduce.vue')), 'companyIntroduce');//公司介绍
const businessIntroduce = r => require.ensure([], () => r(require('@/components/YFSJinfo/businessIntroduce.vue')), 'businessIntroduce');//业务介绍
const useTerms = r => require.ensure([], () => r(require('@/components/YFSJinfo/useTerms.vue')), 'useTerms');//使用条款
const privacyAgreement = r => require.ensure([], () => r(require('@/components/YFSJinfo/privacyAgreement.vue')), 'privacyAgreement');//隐私协议
const contactUS = r => require.ensure([], () => r(require('@/components/YFSJinfo/contactUS.vue')), 'contactUS');//联系我们


export const routes = [
    {path: '/', component: Login, meta: {keepAlive: true}},//登录页
    {path: '/register', component: Register, meta: {keepAlive: true}},//注册页

    //公司主页/也叫管理员主页
    {
        path: '/company', component: company, redirect: '/company_details', children: [
            {path: '/company_details', component: company_details},             //公司信息
            {path: '/company_modify', component: company_modify},               //修改公司信息
            {path: '/company_houseList', component: company_houseList},         //房源列表
            {path: '/company_clientList', component: company_clientList},       //客户列表
            {path: '/company_clientDetails', component: company_clientDetails},     //客户详情
            {path: '/company_consultantList', component: company_consultantList}, //顾问列表
            {path: '/company_consultantDetails', component: company_consultantDetails}, //顾问详情
            {path: '/company_consultantCreateModify', component: company_consultantCreateModify},   //创建修改顾问
            {path: '/company_ownHouseList', component: company_ownHouseList},       //本公司自有房源列表
            {path: '/company_uplodeOwnHouse', component: company_uplodeOwnHouse},   //上传修改自有房源
            {path: '/company_landingPageModify', component: company_landingPageModify}, //公司落地页配置
            {path: '/company_homePageList', component: company_homePageList},       //公司二级主页列表
            {path: '/company_homePageCreateModify', component: company_homePageCreateModify},   //新建修改二级主页模板
            {path: '/company_messageList', component: company_messageList},         //站内信列表
            {path: '/company_messageSend', component: company_messageSend},         //发送站内信
            {path: '/company_statisticalDataChart', component: company_statisticalDataChart},   //统计数据图表
        ], meta: {keepAlive: true}
    },

    //顾问主页
    {
        path: '/consultant', component: consultant, redirect: 'consultant_details',
        children: [
            {path: '/consultant_details', component: consultant_details},       //顾问个人信息
            {path: '/consultant_clientList', component: consultant_clientList}, //客户列表
            {path: '/consultant_clientCreateModify', component: consultant_clientCreateModify}, //创建修改客户
            {path: '/consultant_houseList', component: consultant_houseList},   //房源列表
            {path: '/consultant_shareGroupList', component: consultant_shareGroupList}, //分享组列表
            {path: '/consultant_shareGroupDetails', component: consultant_shareGroupDetails},   //分享组详情
            {path: '/consultant_messageList', component: consultant_messageList}    //站内信列表
        ], meta: {keepAlive: true}
    },
    //群发短信
    {path: '/massSMS', component: massSMS, redirect: 'massSMS_sendSMS',
        children: [
            {path: '/massSMS_sendSMS', component: massSMS_sendSMS}, //发送短信
            {path: '/massSMS_historyList', component: massSMS_historyList}, //短信历史列表
            {path: '/massSMS_details', component: massSMS_details},     //短信详情
        ], meta: {keepAlive: true}
    },

    //群发邮件
    {path: '/massEmail', component: massEmail, redirect: 'massEmail_sendEmail',
        children: [
            {path: '/massEmail_sendEmail', component: massEmail_sendEmail}, //发送邮件
            {path: '/massEmail_historyList', component: massEmail_historyList}, //邮件历史列表
            {path: '/massEmail_details', component: massEmail_details},     //邮件详情
        ], meta: {keepAlive: true}
    },

    //房源详情页
    {path: '/houseDetails', component: houseDetails, meta: {keepAlive: false}},

    //公司落地页
    {path: '/landingPage', component: landingPage, meta: {keepAlive: true}},

    //公司二级主页
    {path: '/companyHomePage1', component: companyHomePage1, meta: {keepAlive: false}},

    //移动端-客户看的房源分享页
    {path: '/clientShareHouse', component: clientShareHouse, meta: {keepAlive: true}},

    //优房数据公司介绍
    {path: '/YFSJinfo', component: YFSJinfo, redirect: 'companyIntroduce',
        children: [
            {path: '/companyIntroduce', component: companyIntroduce},   //公司介绍
            {path: '/businessIntroduce', component: businessIntroduce}, //业务介绍
            {path: '/useTerms', component: useTerms},   //使用条款
            {path: '/privacyAgreement', component: privacyAgreement}, //隐私协议
            {path: '/contactUS', component: contactUS}, //联系我们
        ], meta: {keepAlive: true}
    },



];

