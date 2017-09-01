import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home/Home';
import About from '@/components/about/About';
import Person from '@/components/person/Person';
Vue.use(Router);
let routes = [{
        path: '/',
        redirect: '/home',
    }, {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/person',
        name: 'person',
        component: Person
    }
];
export default new Router({
    // history: true,
    // saveScrollPosition: true,
    // transitionOnLoad:true,
    mode: "history",
    scrollBehavior: function(to, from, savedPosition) {
        return { x: 0, y: 0 }
        // if (savedPosition) {
        //     return savedPosition;
        // }
        // const position = {};
        // if (to.hash) {
        //     position.selector = to.hash;
        // }
        // if (to.matched.some(m => m.meta.scrollToTop)) {
        //     position.x = 0;
        //     position.y = 0;
        // }
        // return position;
    },
    routes: routes
})