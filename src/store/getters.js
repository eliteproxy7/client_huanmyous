export default{
    //获取——房源详情页图表用——本房源所在邮zipcode
    get_houseDetailsZipcode(state){
        return state.houseDetailsZipcode;
    },
    //获取——房源详情页图表用——房源价格
    get_housePrice(state){
        return state.housePrice;
    },
    //获取——房源详情页图表用——homejunction数据
    get_homejunctionData(state){
        return state.homejunctionData;
    },

    //获取公司详情信息——二级主页用
    get_homePageCompanyDetails(state){
        return state.homePageCompanyDetails;
    },
    //配置的七个模块的内容——二级主页用
    get_sevenModuleContent(state){
        return state.sevenModuleContent;
    },

}
