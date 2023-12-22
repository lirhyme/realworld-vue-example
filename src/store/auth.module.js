import ApiService from "@/common/api.service";
import jwtService from "@/common/jwt.service";

const state = {
    errors: null,
    user: {},
    isAuthenticated: !!jwtService.getToken()
}

const getters = {
    currentUser(state) {
        return state.user;
    },
    isAuthenticated(state) {
        return state.isAuthenticated;
    }
}

const mutations = {
    setError(state, error) {
        state.errors = error;
    },
    setAuth(state, user) {
        state.isAuthenticated = true;
        state.user = user;
        state.errors = {};
        jwtService.saveToken(state.user.token);
    },
    purgeAuth(state) {
        state.isAuthenticated = false;
        state.user = {};
        state.errors = {};
        jwtService.destroyToken();
    }
}

const actions = {
    login(context, credentials) {
        return new Promise(resolve => {
            ApiService.post("users/login", {user: credentials})
            .then(({data}) => {
                context.commit('setAuth',data.user);
                resolve(data);
            })
            .catch(({response}) => {
                context.commit('setError',response.data.errors);
            })
        });
    },
    logout(context) {
        context.commit('purgeAuth');
    },
    register(context, credentials) {
        return new Promise((resolve, reject) => {
            ApiService.post("users", { user: credentials})
            .then(({ data }) => {
                context.commit('setAuth', data.user);
                resolve(data);
            })
            .catch(({response}) => {
                context.commit('setError', response.data.errors);
            })
        });
    }
    ,getUser(context) {
        return ApiService.get("user")
        .then(({data}) => {
            context.commit('setAuth', data.user);
        })
        // .catch(({response}) => {
        //     context.commit('setError',response.data.errors);
        //  })
    },
    checkAuth(context) {
        if(jwtService.getToken()) {
            // ApiService;
            ApiService.get("user")
            .then(({data}) => {
                context.commit("setAuth", data.user);
            })
            .catch(({ response }) => {
                context.commit("setError", response.data.errors);
            })
        }else {
            context.commit("purgeAuth");
        }
    },
    updateUser(context, payload) {
        const { email, username, password, image, bio} = payload;
        const user = { 
            email,
            username, 
            image,
            bio
         };
        if (password) {
            user.password = password;
        }
        console.log(user);
        return ApiService.put('user', { user })
        .then(({data}) => {
            context.commit("setAuth",data.user);
            return data;
        });
    }
}

export default { state, getters, mutations, actions};