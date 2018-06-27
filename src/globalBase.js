// moment时间格式化
import moment from 'moment'
//货币格式化
import accounting from '../static/js/accounting.min.js'


// 全局方法
exports.install = function (Vue, options) {
    //判断是否为空，0或null
    Vue.prototype.isNull0 = function (data, txt) {
        let val = '';
        if (data == 0 || data == null || data == '') {
            val = '-';
        } else {
            if(txt == undefined || txt == 0 || txt == null || txt == ''){
                val = data;
            }else{
                val = data + txt;
            }
        }
        return val;
    };

    //计算美元价钱的亿和万
    Vue.prototype.countUSD_BillionsMillion = function (data) {
        let val = '';
        if (data == 0 || data == null || data == '') {
            val = '-';
        } else {
            if (parseInt(data.toString()).length >= 9) {
                val = accounting.formatMoney(parseInt(data / 100000000), "$", 2) + '亿';
            } else {
                val = accounting.formatMoney(parseInt(data / 10000), "$", 0) + '万';
            }
        }
        return val;
    };


    //计算RMB价钱的亿和万
    Vue.prototype.countRMB_BillionsMillion = function (data) {
        let val = '';
        if (data == 0 || data == null || data == '') {
            val = '-';
        } else {
            if (parseInt(data * 6.657).toString().length >= 9) {
                val = accounting.formatMoney(parseInt(data * 6.3239) / 100000000, "约¥ ", 2) + '亿';
            } else {
                val = accounting.formatMoney(parseInt(data * 6.3239) / 10000, "约¥ ", 0) + '万';
            }
        }
        return val;
    };

    //判断美元价钱信息是否为0或null
    Vue.prototype.isNull0_USD = function (data, txt) {
        let val = '';
        if (data == null || data == 0 || data == '$0' || data == '$-') {
            val = '-';
        } else {
            if (txt == undefined || txt == '') {
                val = accounting.formatMoney(data, "$ ", 0);
            } else {
                val = accounting.formatMoney(data, "$ ", 0) + txt;
            }
        }
        return val;
    };

    //判断RMB价钱信息是否为0或null
    Vue.prototype.isNull0_RMB = function (data, txt) {
        let val = '';
        if (data == null || data == 0 || data == '$0' || data == '$-') {
            val = '-';
        } else {
            if (txt == undefined || txt == '') {
                val = accounting.formatMoney(parseInt(data * 6.3239), "约¥ ", 0);
            } else {
                val = accounting.formatMoney(parseInt(data * 6.3239), "约¥ ", 0) + txt;
            }
        }
        return val;
    };

    //判断平方英尺是否为0或null
    Vue.prototype.isNull0_sqft = function (data, txt) {
        let val = '';
        if (data == 0 || data == null || data == '') {
            val = '-';
        } else {
            val = data +'平方英尺';
        }
        return val;
    };

    //判断平方米是否为0或null
    Vue.prototype.isNull0_sqmt = function (data, txt) {
        let val = '';
        if (data == 0 || data == null || data == '') {
            val = '-';
        } else {
            val ='约'+ parseInt(data * 0.0929) +'平米';
        }
        return val;
    };

    //判断房源售卖状态
    Vue.prototype.house_status = function (data) {
        let val = '';
        if (data == 'Active') {
            val = '<span style="color: red">热卖中</span>';
        } else if (data == 'Sold') {
            val = '<span style="color: red">已售出</span>';
        } else if (data == null || data == '') {
            val = '-';
        }
        return val;
    };

    //判断房名的拼接
    Vue.prototype.houseName = function (data) {
        let city = data.city ? data.city : '-';
        let bedrooms = data.bedroomCount ? data.bedroomCount : '-';
        let bathrooms = data.bathroomCount ? data.bathroomCount : '-';
        let houseType = data.propertySubtype ? data.propertySubtype : '-';
        return city + bedrooms +'卧 '+ bathrooms +'卫 '+ houseType;
    };

    //moment时间格式化
    Vue.prototype.momentFormat = function (data, formatString) {
        let val = '';
        if (data == 0 || data == null || data == '') {
            val = '-';
        } else {
            val = moment(data).format(formatString);
        }
        return val;
    };

    //计算年龄
    Vue.prototype.age_FN = function (data) {
        let val = '';
        if (data == 'Invalid Date' || data == 0 || data == null || data == '' || data < 0) {
            val = '-';
        } else {
            let D = new Date();
            let nowYear = D.getFullYear();
            let clientBirthdate = parseInt(moment(data).format('YYYY'));
            val = nowYear - clientBirthdate +'周岁';
        }
        return val;
    };

    //性别判断
    Vue.prototype.sex_FN = function (data) {
        let val = '';
        if (data == 1) {
            val = '先生';
        } else if (data == 0) {
            val = '女士';
        } else {
            val = '-';
        }
        return val;
    };

    //判断客户婚姻状况
    Vue.prototype.isMarital_FN = function (data) {
        let val = '';
        if (data == 0) {
            val = '保密';
        } else if (data == 1) {
            val = '已婚';
        } else if (data == 2) {
            val = '未婚';
        } else if (data == 3) {
            val = '离异';
        } else {
            val = '-';
        }
        return val;
    };

    //手机号正则验证
    const phoneReg = /^(1)[3|4|5|6|7|8|9](\d){9}$/;
    Vue.prototype.phone_validation = function (rule, value, callback) {
        if (phoneReg.test(value)) {
            callback()
        } else {
            callback(new Error('手机号格式不能含有空格、不能为空！'))
        }
    };

    //邮箱正则验证
    const emailReg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    Vue.prototype.email_validation = function (rule, value, callback) {
        if (emailReg.test(value)) {
            callback()
        } else {
            callback(new Error('邮箱格式不能含有空格、不能为空！'))
        }
    };

    //验证码6位数验证
    Vue.prototype.code_validation = function (rule, value, callback) {
        if (parseInt(value).toString().length == 6) {
            callback()
        } else {
            callback(new Error('验证码格式为6位数字，不能含有空格、不能为空！'))
        }
    };

    //URL验证
    const urlReg = /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
    Vue.prototype.url_validation = function (rule, value, callback) {
        if (urlReg.test(value)) {
            callback()
        } else {
            callback(new Error("URL格式不合法，格式请参考：'http://www.google.com'"))
        }
    };

    //计算关键字字符个数(汉字算两个字符，字母数字算一个)
    Vue.prototype.getByteLen = function (data) {
        let len = 0;
        for (let i = 0; i < data.length; i++) {
            let a = data.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null) {
                len += 2;
            }else {
                len += 1;
            }
        }
        return len;
    };


    //-----------------------时间戳转化为几月前、几天前、几小时前、几分钟前-----------------------
    Vue.prototype.getDateDiff = function (dateTimeStamp) {
        let minute = 1000 * 60;
        let hour = minute * 60;
        let day = hour * 24;
        let halfamonth = day * 15;
        let month = day * 30;
        let now = new Date().getTime();
        let diffValue = now - dateTimeStamp;
        if(diffValue < 0){return;}
        let monthC = diffValue/month;
        let weekC = diffValue/(7*day);
        let dayC = diffValue/day;
        let hourC = diffValue/hour;
        let minC = diffValue/minute;
        let result = '';
        if(monthC >= 1){
            result = "" + parseInt(monthC) + "月前";
        }else if(weekC>=1){
            result = "" + parseInt(weekC) + "周前";
        }else if(dayC>=1){
            result = ""+ parseInt(dayC) +"天前";
        }else if(hourC>=1){
            result = ""+ parseInt(hourC) +"小时前";
        }else if(minC>=1){
            result = ""+ parseInt(minC) +"分钟前";
        }else{
            result = "刚刚";
        }
        return result;
    };

    //-----------------------复选框取消选中时把对应的值从数组删除-----------------------
    Vue.prototype.removeByValue = function (val, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
        return arr;
    };

    // 短信、邮件发送状态
    Vue.prototype.SMS_EmailSendStatus = function (data) {
        let val = '';
        if(data == 1){
            val = '<span style="color: green">发送成功</span>';
        }else{
            val = '<span style="color: red">发送失败</span>';
        }
        return val;
    };

    //格式化经纪公司
    Vue.prototype.BrokerCompany = function (providerUrl, providerName) {
        let val = '';
        if (providerUrl == 0 || providerUrl == null || providerUrl == '') {
            val = '-';
        } else {
            val = '<a href="'+ providerUrl +'" target="_blank">'+ providerName +'</a>';
        }
        return val;

    };

    //计算今天相减的相差天数
    Vue.prototype.DateMinus = function (sDate) {
        let sdate = new Date(sDate.replace(/-/g, "/"));
        let now = new Date();
        let days = now.getTime() - sdate.getTime();
        let day = parseInt(days / (1000 * 60 * 60 * 24));
        return day;
    };

};
