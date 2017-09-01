let subNavService = {
    getSubNavBarData: function(that) {
        let url = "/static/data/subNavBar.json";
        return that.$http.get(url, {});
    },
    getSubNavBarPanelData: function(that) {
        let url = "/static/data/subNavBarPanel.json";
        return that.$http.get(url, {});
    }
};
export default subNavService;