const state = ()=>({
    user:[]
})

const mutations = {
    setUser(state,params){
        state.user = params
    },
    updateIsLogin(state,params){
     state.user.udhLogin=params
    }
    
}
const actions = {
    setUser(store,params){
        store.commit("setUser",params)
    },
    updateIsLogin(store,params){
        store.commit("updateIsLogin",params)
    }

}

export default {
    state,mutations,actions
}