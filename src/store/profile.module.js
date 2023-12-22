import ApiService from "@/common/api.service";

const state = {
    errors: {},
    profile: {}
}
const getters = {
    profile(state) {
        return state.profile
    }
}
const mutations = {
    setProfile(state, profile) {
        state.profile  = profile;
        state.errors = {};
    }
}
const actions = {
    fetchProfile(context, payload) {
        const { username } = payload;
        return ApiService.get("profiles", username)
        .then(({data}) => {
            context.commit('setProfile', data.profile);
            return data;
        })
        .catch()
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}