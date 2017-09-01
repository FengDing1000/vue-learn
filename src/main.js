// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
import store from './vuex/store';
//在入口文件中引入上面的文件并将变量挂到全局
import defines from './defines';
Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(Vuex);
Vue.http.options.emulateJSON = true;
/* eslint-disable no-new */
// 这里的和进入的inde.html的id相关联。
// 再路由跳转的时候判断用户是否登录

router.beforeEach((to, from, next) => {
    // if (to.matched.some(m => m.meta.auth)) {
    //     if (store.state.signin) {
    //         next()
    //     } else {
    //         next({
    //             path: '/home',
    //             query: { redirect: to.fullPath }
    //         })
    //     }
    // } else {
    //     next();
    // }
    next();
});
Object.keys(defines).forEach((key) => {
    global[key] = defines[key];
});
Object.keys(defines).forEach((key) => {
    Vue.prototype[key] = defines[key];
});
//同样在.vue中直接this.name就可以访问到
// 路由跳转
Vue.prototype.$goRoute = function(routerPath) {
    this.$router.push(routerPath);
}
new Vue({
    el: '#my-vue-story',
    router,
    store,
    template: '<App/>',
    components: { App }
})