<template>
    <section>
        <!--轮播背景图-->
        <div class="document-bg">
            <div class="swiper-container" id="document-bg-swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <img data-src="/static/img/header-bg1.jpg" class="swiper-lazy">
                        <div class="swiper-lazy-preloader"></div>
                    </div>
                    <div class="swiper-slide">
                        <img data-src="/static/img/header-bg2.jpg" class="swiper-lazy">
                        <div class="swiper-lazy-preloader"></div>
                    </div>
                    <div class="swiper-slide">
                        <img data-src="/static/img/header-bg3.jpg" class="swiper-lazy">
                        <div class="swiper-lazy-preloader"></div>
                    </div>
                    <div class="swiper-slide">
                        <img data-src="/static/img/header-bg4.jpg" class="swiper-lazy">
                        <div class="swiper-lazy-preloader"></div>
                    </div>
                    <div class="swiper-slide">
                        <img data-src="/static/img/header-bg5.jpg" class="swiper-lazy">
                        <div class="swiper-lazy-preloader"></div>
                    </div>
                    <div class="swiper-slide">
                        <img data-src="/static/img/header-bg6.jpg" class="swiper-lazy">
                        <div class="swiper-lazy-preloader"></div>
                    </div>
                    <div class="swiper-slide">
                        <img data-src="/static/img/header-bg7.jpg" class="swiper-lazy">
                        <div class="swiper-lazy-preloader"></div>
                    </div>
                    <div class="swiper-slide">
                        <img data-src="/static/img/header-bg8.jpg" class="swiper-lazy">
                        <div class="swiper-lazy-preloader"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="content">
            <div class="col-md-12 clearfix">
                <div class="header clearfix">
                    <a><img src="/static/img/logo.png"/></a>
                    <p class="no-login-box">
                        <router-link to="/" class="active">登录</router-link>
                        |
                        <router-link to="/register">企业注册</router-link>
                    </p>
                    <p class="is-login-box">
                        <a href="javascript:;" id="lander-type"></a> |
                        <a href="javascript:;" id="lander-name"></a> |
                        <a href="javascript:;" id="logout">注销</a>
                    </p>
                </div>

                <div class="logoBox">
                    <div class="header">
                        <img src="/static/img/reigster-logo.png"/>
                    </div>
                    <div class="inside">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon
                                 class="demo-ruleForm">
                            <el-form-item prop="phone">
                                <el-input v-model.number="ruleForm.phone" maxLength="11" size="small"
                                          auto-complete="on" placeholder="电话"
                                          prefix-icon="iconfont icon-dianhua"
                                          @keyup.enter.native="loginFN"></el-input>
                            </el-form-item>
                            <el-form-item prop="code">
                                <el-input v-model.number="ruleForm.code" maxLength="6" size="small"
                                          placeholder="验证码" prefix-icon="iconfont icon-icon_sms"
                                          @keyup.enter.native="loginFN"></el-input>
                                <el-button type="primary" class="login-verification-code" @click="sendCode"
                                           :disabled="code_disabled">{{ codeText }}
                                </el-button>
                            </el-form-item>
                            <el-form-item style="text-align: center">
                                <el-button type="primary" @click.stop="loginFN" icon="iconfont icon-denglu"
                                           style="padding: 10px 30px"> 登录
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="footer">
                        <p>还没有账号？
                            <router-link to="/register">立即注册</router-link>
                        </p>
                    </div>
                </div>

            </div>
        </div>

    </section>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'

    let phoneReg = /^(1)[3|4|5|6|7|8|9](\d){9}$/;

    export default {
        data() {
            return {
                ruleForm: {
                    phone: '', //手机号
                    code: '', //6位数验证码
                },
                rules: {//表单验证规则
                    phone: [
                        {required: true, message: '请输入联系电话'},
                        {required: true, type: 'number', message: '电话号码必须是数字'},
                        {required: true, validator: this.phone_validation, trigger: 'blur',}
                    ],
                    code: [
                        {required: true, validator: this.code_validation, trigger: 'blur'},
                    ],
                },

                verificationCode: '', //验证码的验证串
                codeTime: 0,  //获取验证码倒计时
                codeText: '获取验证码',  //获取验证码按钮的提示文本
                code_disabled: false, //获取验证码按钮的状态
                mySwiper: null,
            }
        },
        mounted() {
            //背景轮播图swiper配置
            this.mySwiper = new Swiper('#document-bg-swiper-container', {
                autoplay: {
                    delay: 5000,//自动切换的时间间隔，单位ms
                    stopOnLastSlide: false,//如果设置为true，当切换到最后一个slide时停止自动切换
                    disableOnInteraction: true,//用户操作swiper之后，是否禁止autoplay。默认为true,如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay
                },
                effect: 'fade',//slide的切换效果：淡入淡出
                spaceBetween: 0,//slide之间的距离（单位px）
                lazy: {
                    loadPrevNext: true,
                    loadPrevNextAmount: 1,
                },
            });

            this.isLogin(); //是否已经登录

            // this.$axios.get('http://192.168.1.103:8081/api/v1/homes/list',{
            //     headers: {'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJrZXkiOiIyMjUyZjNmMzdmYTg3MGZkNjU4ZWIxMGU4ZWYxYjAwNSJ9.7SuuJKNYC3_Zfmd04m_n9JE61YsrLvM1205CRBKqrtw'}
            // }).then(res => {
            //     Promise.resolve(res.data);
            //     console.log(res)
            // }).catch(error => {
            //     Promise.reject(error);
            //     console.log(error)
            // });
            //
            // fetch('http://192.168.1.103:8081/api/v1/homes/list', {
            //     method:"get",
            //     headers:{
            //         "Authorization":"eyJhbGciOiJIUzI1NiJ9.eyJrZXkiOiIyMjUyZjNmMzdmYTg3MGZkNjU4ZWIxMGU4ZWYxYjAwNSJ9.7SuuJKNYC3_Zfmd04m_n9JE61YsrLvM1205CRBKqrtw"
            //     },
            // }).then(res => {
            //     if (res.status == 200){
            //         console.log(res);
            //         return res;
            //     }
            // }).then(data => {
            //     console.log(data);
            //     return data.text();
            // }).then(data => {
            //     console.log(data);
            //     this.houseBasicInfoTranslation = JSON.parse(data);
            //     console.log(typeof this.houseBasicInfoTranslation);
            // }).catch(err => {
            //     console.log("Fetch错误:"+ err);
            // });

        },
        computed: {},
        methods: {
            // 是否已经登录
            isLogin() {
                if (localStorage.userid || localStorage.roleId) {
                    this.$message.success('您已登录，将为您跳转至账户主页。');
                    setTimeout(timeout => {
                        if (localStorage.roleId == 1) {
                            this.$router.push({path: '/company'});
                        } else if (localStorage.roleId == 2) {
                            this.$router.push({path: '/consultant'});
                        }
                    }, 2000)
                }
                // 防刷新：检测是否存在倒计时计算localStorage.codeTime
                if (localStorage.codeTime) {
                    this.codeTime = parseInt(localStorage.codeTime);
                    this.codeText = this.codeTime + "s后重新获取";
                    this.code_disabled = true;
                    let resend = setInterval(() => {
                        this.codeTime--;
                        if (this.codeTime > 0) {
                            this.codeText = this.codeTime + "s后重新获取";
                            localStorage.codeTime = this.codeTime;
                        } else {
                            localStorage.removeItem('codeTime');
                            clearInterval(resend);
                            this.codeText = '获取验证码';
                            this.code_disabled = true;
                        }
                    }, 1000);
                }
            },
            //发送验证码
            sendCode() {
                let phone = this.ruleForm.phone;
                // 手机号正则验证
                if (phoneReg.test(phone)) {// 手机号符合验证
                    this.codeTime = 60;
                    this.code_disabled = true;
                    this.codeCountdown();
                    this.$get('sms/code/login/' + phone).then(res => {
                        const data = res.data;
                        if (data.status == 0) {
                            this.verificationCode = data.data;
                            this.$message.success('发送成功，请您耐心等待短信通知。');
                        }
                    })
                } else {
                    this.$message.warning('手机号格式错误。');
                }
            },
            //验证码倒计时计算
            codeCountdown() {
                if (this.codeTime > 0) {
                    this.codeTime--;
                    this.codeText = this.codeTime + "s后重新获取";
                    setTimeout(this.codeCountdown, 1000);
                    localStorage.codeTime = this.codeTime;
                } else {
                    this.codeTime = 0;
                    this.codeText = "获取验证码";
                    this.code_disabled = false;
                    localStorage.removeItem('codeTime');
                }
            },
            // 登录
            loginFN() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.$post('/login', {
                            phone: this.ruleForm.phone,
                            code: this.ruleForm.code,
                            msgid: this.verificationCode
                        }).then(res => {
                            const data = res;
                            if (data.status == 0) {
                                localStorage.userphone = data.data.phone;
                                localStorage.userid = data.data.userId;
                                localStorage.roleId = data.data.roles[0].roleId;
                                //判断后台返回的登录账号的角色ID来跳转对应页面
                                if (data.data.roles[0].roleId == 1) {
                                    this.$router.push({path: '/company'});
                                } else if (data.data.roles[0].roleId == 2) {
                                    this.$router.push({path: '/consultant'});
                                }
                            } else {
                                this.$message.warning(data.msg);
                            }
                        })
                    } else {
                        this.$message.warning('手机号或验证码格式错误，请检查并重新输入！');
                        return false;
                    }
                });
            },

        },
        components: {}
    }
</script>

<style scoped lang="less" type="text/less">
    body {
        section {
            /*---------------------轮播背景图---------------------*/
            .document-bg {
                position: fixed;
                z-index: 1;
                left: 0;
                right: 0;
                top: 0;
                width: 100%;
                height: 100%;
                .swiper-container {
                    width: 100%;
                    height: 100%;
                    .swiper-button-next,
                    .swiper-button-prev {
                        color: #fff;
                    }
                }
                .swiper-slide {
                    width: 100%;
                    height: 100%;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    @media (max-width: 1400px) {
                        img {
                            width: auto;
                            height: 100%;
                        }
                    }
                }
            }

            /*---------------------登录框内容---------------------*/
            .content {
                width: 100%;
                height: 100%;
                position: relative;
                z-index: 2;
                > div {
                    > .header {
                        position: relative;
                        line-height: 40px;
                        margin: 20px 0 0 0;
                        padding: 0 30px;
                        > a {
                            float: left;
                            display: inline-block;
                            width: auto;
                            height: auto;
                            cursor: pointer;
                            > img {
                                width: auto;
                                height: auto;
                                max-width: 150px;
                            }
                        }
                        > p {
                            float: right;
                            color: #d5d7d8;
                            > a {
                                font-size: 15px;
                                color: #d5d7d8;
                                font-weight: bold;
                                cursor: pointer;
                                -webkit-transition: .35s;
                                -moz-transition: .35s;
                                -ms-transition: .35s;
                                -o-transition: .35s;
                                transition: .35s;
                                text-decoration: none;
                            }
                            > a.active {
                                color: #2196f3;
                                font-weight: bold;
                            }
                            > a:hover {
                                color: #2196f3;
                                font-weight: bold;
                            }
                        }
                        > p.no-login-box {
                            text-align: right;
                        }
                        > p.is-login-box {
                            display: none;
                        }
                    }

                    > .logoBox {
                        width: 400px;
                        background: rgba(40, 40, 40, 0.7);
                        -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
                        -moz-box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
                        -o-box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
                        box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
                        padding: 20px;
                        margin: 0 auto;
                        margin-top: 150px;
                        > .header {
                            text-align: center;
                            img {
                                width: auto;
                                height: auto;
                                max-width: 120px;
                            }
                        }
                        > .inside {
                            > form {
                                padding: 10px 0;
                                .el-form-item__label {
                                    font-size: 15px;
                                    color: #fff !important;
                                }
                                > div {
                                    position: relative;
                                    margin: 30px 0 0 0;
                                    .el-form-item__content {
                                        //.el-input__inner {
                                        //    border: none;
                                        //    border-bottom: 1px solid #9a9797;
                                        //    background: transparent;
                                        //}
                                        //.el-input__inner:focus{
                                        //    color: #1bb8fb;
                                        //    border-bottom: 1px solid #1bb8fb;
                                        //}
                                        button.login-verification-code {
                                            position: absolute;
                                            right: 0;
                                            bottom: 5px;
                                            padding: 10px;
                                            font-size: 13px;
                                            cursor: pointer;
                                            border: none;
                                            border-radius: 4px;
                                        }
                                    }
                                }
                            }
                        }
                        > .footer {
                            > p {
                                color: #fff;
                                margin: 15px 0 0 0;
                                text-align: center;
                                > a {
                                    color: #27aee5;
                                    font-weight: bold;
                                }
                            }
                        }
                    }
                }
            }

            @media (max-width: 430px) {
                .content > .container > .row > div > .logoBox {
                    width: auto;
                }
            }

            @media (max-width: 380px) {
                .content > .container > .row > div > .logoBox {
                    margin-top: 100px;
                }

                .content > .container > .row > div > .logoBox > .header > a > img {
                    width: 100px;
                }
            }

            @media (max-width: 365px) {
                .content > .container > .row > div > .header > a {
                    width: 140px;
                }

                .content > .container > .row > div > .header > a > img {
                    width: 100%;
                }

                .content > .container > .row > div > .logoBox {
                    margin-top: 60px;
                }
            }

            //@media (max-width: 320px) {
            //  .content > .container > .row > div > .logoBox{
            //    width: 310px;
            //  }
            //}

        }
    }
</style>

