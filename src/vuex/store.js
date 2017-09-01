import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    signin: false,
    subNavBarFixed: false,
    searchContainer: true,
    iframeChange: false
};
const mutations = {
    alreadySignin(state) {
        state.signin = true;
    },
    notSignin(state) {
        state.signin = false;
    },
    subNavBarFixedState(state) {
        state.subNavBarFixed = true;
    },
    subNavBarRelativeState(state) {
        state.subNavBarFixed = false;
    },
    changeSearchContainerStateHide(state) {
        state.searchContainer = false;
    },
    changeSearchContainerStateShow(state) {
        state.searchContainer = true;
    },
    iframeChange(state) {
        state.iframeChange = !state.iframeChange;
    }
};
const actions = {
    alreadySignin(context) {
        context.commit('alreadySignin');
    },
    notSignin(context) {
        context.commit('notSignin');
    },
    subNavBarFixedState(context) {
        context.commit('subNavBarFixedState');
    },
    subNavBarRelativeState(context) {
        context.commit('subNavBarRelativeState');
    },
    changeSearchContainerStateHide(context) {
        context.commit('changeSearchContainerStateHide');
    },
    changeSearchContainerStateShow(context) {
        context.commit('changeSearchContainerStateShow');
    },
    iframeChange(context) {
        context.commit('iframeChange');
    }
};
const Store = new Vuex.Store({
    state,
    mutations,
    actions
});
// state
// store.state.signin || this.$store.state.signin
// mutations
// context.commit('alreadySignin')
// actions
// this.$store.dispatch('alreadySignin')
export default Store