export default{
    //设置——房源详情页图表用——本房源所在邮zipcode
    set_houseDetailsZipcode (state, zip) {
        state.houseDetailsZipcode = zip;
    },
    //设置——房源详情页图表用——房源价格
    set_housePrice (state, price) {
        state.housePrice = price;
    },
    //设置——房源详情页图表用——homejunction数据
    set_homejunctionData (state, data) {
        state.homejunctionData = data;
        console.log("state.homejunctionData"+state.homejunctionData)
        console.log(data)
    },

    //设置——公司详情信息——二级主页用
    set_homePageCompanyDetails (state, data) {
        state.homePageCompanyDetails = data;
    },
    //设置——配置的七个模块的内容——二级主页用
    set_sevenModuleContent (state, data) {
        state.sevenModuleContent = data;
    },

}
