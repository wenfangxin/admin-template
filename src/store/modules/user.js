import cookie from 'js-cookie';
export default {
    namespaced: true,
    state: {
        userId: cookie.get('userId'),
        token: cookie.get('token'),
    },
    mutations: {
        //修改token
        SET_TOKEN(state, data) {
            state.token = data;
        },
        //修改userId
        SET_USER_ID(state, data) {
            state.userId = data;
        }
    },
    actions: {
        /**
         * 用户登录
         * @param commit
         * @param data
         * @returns {Promise<unknown>}
         */
        userLogin({commit}, data) {
            return new Promise((resolve, reject) => {
                // api.user.login(data).then(res => {
                    commit('SET_TOKEN', 111);
                    cookie.set('token',111);
                    commit('SET_USER_ID',111);
                    cookie.set('userId', 111);
                    resolve()
                // }).catch(error => {
                //     reject(error)
                // })
            })
        },
        /**
         * 退出登录
         * @param commit
         * @returns {Promise<unknown>}
         */
        loginOut({commit}) {
            return new Promise((resolve, reject) => {
                commit('SET_TOKEN', null);
                cookie.remove('token')
                resolve();
            })
        },
        /**
         * 获取用户信息
         * @param commit
         * @param data
         * @returns {Promise<unknown>}
         */
        getUserInfo({commit}) {
            return new Promise((resolve, reject) => {
                resolve()
            })
        }
    },
    getters: {}
}
