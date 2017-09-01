let signinService = {
    signin: function(that, name, password, remember) {
        let url = "http://127.0.0.1:8888/api/user/signin";
        let data = {
            account: name,
            password: password,
            rememberPassword: remember
        }
        return that.$http.post(url, data);
    },
    register: function(that, name, password) {
        let url = "http://127.0.0.1:8888/api/user/register";
        let data = {
            account: name,
            password: password
        }
        return that.$http.post(url, data);
    }
};
export default signinService;