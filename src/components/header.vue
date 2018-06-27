<template>
    <el-row class="header">
        <el-col :span="4" class="img-box">
            <img v-lazy="'../../../static/img/logo.png'">
        </el-col>
        <el-col :span="20" class="text-right" v-show="user.isLogin">
            <router-link to="/">登录</router-link>
            |
            <router-link to="/register" class="active">企业注册</router-link>
        </el-col>
        <el-col :span="20" class="text-right" v-show="!user.isLogin">
            <el-popover
                placement="bottom"
                width="300"
                trigger="click"
                v-if="messageInform">
                <div class="unread-message-list">
                    <ul v-for="item in unreadMessageItem" @click="$router.push('/consultant_messageList')">
                        <li>
                            <p><i class="iconfont icon-weidu"></i>标题：{{item.title}}</p>
                            <p>内容：{{item.content}}</p>
                            <p>{{getDateDiff(item.ctime)}}</p>
                        </li>
                    </ul>
                    <aside>
                        <span><i class="iconfont icon-weidu"></i>{{unreadNumber}}条未读信息</span>
                    </aside>
                </div>
                <div slot="reference">
                    <el-badge :value="unreadNumber" style="display: inline; padding: 5px">
                        <i :class="messageInformIconClass" :style="messageInformIconStyle"></i>
                    </el-badge>
                </div>
            </el-popover>

            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  {{user.ID}} <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>{{user.name}}</el-dropdown-item>
                    <el-dropdown-item command="logout">注销</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>

    </el-row>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    ID: '',           //登录角色
                    name: '',        // 用户名
                    isLogin: true,  // false隐藏未登录情况下用 true 显示已登录状态
                },
                messageInform: false,//根据登录账户角色判断是否显示站内信通知
                messageInformIconClass: '',//站内信通知i标签的类名
                messageInformIconStyle: {},//站内信通知i标签的颜色
                unreadMessageItem: [],
                unreadNumber: '',//有几条未读信息
            }
        },
        mounted() {
            this.isLogin_user();
            //每隔1分钟检测一次是否有未读站内信
            if(localStorage.roleId == 2){
                this.everyOneMinuteDetectionMessage();
                this.getLatest10UnreadMessage();
                setInterval(() => {
                    this.everyOneMinuteDetectionMessage();
                }, 60000);
            }

        },
        computed: {
        },
        methods: {
            handleCommand(command) {
                if (command == 'logout') {
                    this.$get('/exit').then(res => {
                        const data = res;
                        if (data.status == 0) {
                            localStorage.removeItem('userphone');
                            localStorage.removeItem('userid');
                            localStorage.removeItem('roleId');
                            this.$router.push('/');
                        } else {
                            this.$message.warning(data.msg)
                        }
                    })
                }
            },
            // 判断是否已经登录,如果登录则赋值账号手机号和角色名
            isLogin_user() {
                if (localStorage.roleId == 1) {
                    this.user.ID = "公司管理员";
                    this.messageInform = false;
                } else if (localStorage.roleId == 2) {
                    this.user.ID = "公司顾问";
                    this.messageInform = true;
                }
                this.user.name = localStorage.userphone;

                if (localStorage.userid || localStorage.roleId) {
                    this.user.isLogin = false;
                } else {
                    this.user.isLogin = true;
                }
            },
            //每隔1分钟检测一次是否有未读站内信
            everyOneMinuteDetectionMessage(){
                this.$get('/message/message/count?status=0').then(res => {
                    const data = res;
                    if(data.data > 0){
                        this.messageInformIconClass = 'iconfont icon-ic_notifications_active_px';
                        this.messageInformIconStyle = {'color': 'red'};
                    }else{
                        this.messageInformIconClass = 'iconfont icon-lingdang';
                        this.messageInformIconStyle = {'color': 'black'};
                    }
                    this.unreadNumber = data.data;
                });
            },
            //获取最新10条未读站内信
            getLatest10UnreadMessage(){
                this.$get('/message/message/list?status=0').then(res => {
                    const data = res;
                    this.unreadMessageItem = data.rows;
                });
            }
        }
    }
</script>

<style scoped lang="less" type="text/less">
    body {
        .header {
            width: 100%;
            line-height: 70px;
            padding: 0 30px;
            background: #fff;
            position: relative;
            > .img-box {
                line-height: 60px;
                > img {
                    max-width: 150px;
                    display: inline-block;
                    vertical-align: middle;
                }
            }
            > div {
                > span {
                    display: inline-block;
                    padding: 0 15px;
                    cursor: pointer;
                }
            }
        }
        .unread-message-list {
            > ul {
                max-height: 350px;
                overflow-y: auto;
                > li {
                    padding: 10px 15px;
                    font-size: 13px;
                    color: #5e6166;
                    text-align: justify;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -o-text-overflow: ellipsis;
                    -webkit-text-overflow: ellipsis;
                    -moz-text-overflow: ellipsis;
                    white-space: nowrap;
                    cursor: pointer;
                    >p{
                        line-height: initial;
                        > i.icon-weidu {
                            color: red;
                            font-size: 20px;
                        }
                        > span {
                            display: block;
                            margin: 5px 0 0 0;
                            font-size: 12px;
                            color: #7C8486;
                        }
                    }
                }
                > li:hover {
                    background: #f5f7fa;
                }
            }
            > aside {
                font-size: 13px;
                padding: 15px;
                background: #f5f7fa;
                > span {
                    > i.icon-weidu {
                        color: red;
                        font-size: 20px;
                    }
                }
            }
        }
        #unread-message-list:before {
            content: '';
            display: block;
            border: 8px solid transparent;
            border-bottom-color: #e6e9f0;
            position: absolute;
            top: -17px;
            right: 90px;
        }
        #unread-message-list:after {
            content: '';
            display: block;
            border: 8px solid transparent;
            border-bottom-color: #f5f7fa;
            position: absolute;
            top: -15px;
            right: 90px;
        }
    }


</style>

