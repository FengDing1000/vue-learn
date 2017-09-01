<template>
<header id="header-nav">
    <!-- 顶部的导航部分 -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container-fluid">
            <!-- (min-width: 768px) 条件下隐藏-->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">菜单栏目</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">乐屋小说网</a>
            </div>

            <!-- 菜单栏 -->
            <div class="menu-container">
                <div class="collapse navbar-collapse navbar-ex1-collapse">
                    <!-- 用户信息 -->
                    <ul class="nav navbar-nav navbar-right">
                        <li data-url="home">
                            <router-link class="router" :to="{path : '/home'}">首页</router-link>
                        </li>
                        <li data-url="about">
                            <router-link class="router" :to="{path : '/about'}">关于</router-link>
                        </li>
                        <li v-show="userNotExist" class="noChange"><a @click="signin">登录</a></li>
                        <li v-show="userNotExist" class="noChange"><a @click="register">注册</a></li>
                        <li v-show="!userNotExist" class="dropdown">
                            <div href="#" class="dropdown-toggle" data-toggle="dropdown"> <span>欢迎您</span>{{user.account}}</div>
                            <ul class="dropdown-menu">
                                <li>
                                    <router-link :to="{path : '/person'}">个人中心</router-link>
                                </li>
                                <li><a href="javascript:void(0)" @click="signout">注销登录</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    <user-modal title="Modal Title" :modalShow="modalSigninShow" :closeWhenOK="btnIsSuccess" :cancelText="cancelText" :okText="okText" @ok="ok" @cancel="cancel">
        <div>
            <form class="form-horizontal" role="form">
                <div class="form-group">
                    <label for="exampleInputEmail1">用户名</label>
                    <input type="text" v-model="account" class="form-control" id="exampleInputEmail1" placeholder="请输入用户名">
                </div>
                <div class="form-group" style="position:relative;">
                    <label for="exampleInputPassword1">密码</label>
                    <input v-show="isEye" type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="请输入密码">
                    <input v-show="!isEye" type="text" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="请输入密码">
                    <i class="fa" :class="isEye?'fa-eye':'fa-eye-slash'" @click="eyeChange" style="position:absolute;right:5px;top:55%;font-size:18px;cursor:pointer;"></i>
                </div>
                <div class="checkbox" v-show="isSigin">
                    <input tabindex="1" type="checkbox" v-model="rememberPassword" id="input-checkbox-signin" ref="input-checkbox-signin">
                    <label for="input-checkbox-signin">记住密码</label>
                </div>
            </form>
        </div>
        <div slot="title" v-show="isSigin">登录</div>
        <div slot="title" v-show="!isSigin">注册</div>
    </user-modal>
</header>
</template>

<script>
import userModal from '../modals/Modal';
import userService from './userService';
export default {
    name: 'nav',
    data: function() {
        return {
            user: {},
            isSigin: true,
            userNotExist: true,
            modalSigninShow: false,
            btnIsSuccess: false,
            cancelText: "取消",
            okText: "确定",
            isEye: true,
            account: "丁锋",
            password: "0000",
            rememberPassword: false
        }
    },
    created: function() {
        if ($.cookie("user") || window.localStorage.getItem("user")) {
            this.user = JSON.parse($.cookie("user") || window.localStorage.getItem("user"))
            this.$store.dispatch('alreadySignin');
        }
    },
    mounted: function() {
        var $this = this;
        if (this.rememberPassword) {
            $(this.$refs['input-checkbox-signin']).iCheck("check");
        } else {
            $(this.$refs['input-checkbox-signin']).iCheck("uncheck");
        }
        $(this.$refs['input-checkbox-signin']).iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
            increaseArea: '20%'
        });
        $(this.$refs['input-checkbox-signin']).on("ifChanged", function() {
            $this.rememberPassword = !$this.rememberPassword;
        })
    },
    computed: {
        changeState() {
            return this.$store.state.signin;
        }
    },
    watch: {
        changeState(state) {
            this.userNotExist = !state;
        }
    },
    methods: {
        eyeChange: function() {
            this.isEye = !this.isEye;
        },
        signin: function() {
            this.isSigin = true;
            this.modalSigninShow = true;
        },
        register: function() {
            this.isSigin = false;
            this.modalSigninShow = true;
        },
        signout: function() {
            this.$store.dispatch('notSignin');
            $.removeCookie('user');
            window.localStorage.removeItem("user");
            this.user = {};
        },
        ok() {
            if (this.isSigin) {
                userService.signin(this, this.account, this.password, this.rememberPassword).then(function(res) {
                    if (res.body.code == "success") {
                        this.user = res.body.user;
                        $.cookie("user", JSON.stringify(res.body.user));
                        window.localStorage.setItem("user", JSON.stringify(res.body.user))
                        this.$store.dispatch('alreadySignin');
                        this.btnIsSuccess = true;
                        this.modalSigninShow = false;
                    } else {
                        alert(res.body.message);
                    }
                });
            } else {
                userService.register(this, this.account, this.password).then(function(res) {
                    if (res.body.code == "success") {
                        alert(res.body.message)
                        this.btnIsSuccess = true;
                        this.modalSigninShow = false;
                    } else {
                        alert(res.body.message);
                    }
                });
            }
        },
        cancel() {
            this.modalSigninShow = false;
        }
    },
    components: {
        userModal
    }
}
</script>

<style scoped>
#header-nav {
    height: 50px;
}

#header-nav a,
#header-nav button {
    outline: none;
}

#header-nav a {
    cursor: pointer;
}

#header-nav .hideContainer {
    display: none;
}

#header-nav .showContainer {
    display: block;
}

#header-nav .absolute {
    position: absolute;
}

#header-nav .navbar {
    color: #9D9D9D;
}

#header-nav .navbar .router.router-link-active {
    background-color: #000;
    color: #fff;
}

#header-nav .navbar .navbar-right>li>a:hover {
    color: #FFF;
}

#header-nav .navbar .dropdown-toggle {
    padding-top: 15px;
    padding-bottom: 15px;
    cursor: pointer;
}

#header-nav .navbar .dropdown-menu {
    min-width: 100px;
}

#header-nav input#input-checkbox-signin {
    top: -1px;
}

#header-nav header {
    padding: 0 20px;
}
</style>