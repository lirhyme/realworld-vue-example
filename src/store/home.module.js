import {TagsService, ArticlesService} from "@/common/api.service"
import { FETCH_TAGS } from "./actions.type";
import { SET_TAGS } from "./mutations.type";


const state =  {
    tags:[],
    articles:[],
    articlesCount: 0,
    isLoading: true
}
const getters = {
    tags(state) {
        return state.tags;
    },
    isLoading(state) {
        return state.isLoading;
    },
    articles(state){
        return state.articles;
    },
    articlesCount(state) {
        return state.articlesCount;
    }
}

const mutations = {
   setTags(state, tags){
        state.tags = tags;
   } ,
   fetch_start(state) {
    state.isLoading = true;
   },
   fetch_end(state, { articles, articlesCount}) {
    state.articles = articles;
    state.articlesCount = articlesCount;
    state.isLoading = false;
   }
}

const actions = {
    fetchArticles(context, params) {
        context.commit('fetch_start');
        return ArticlesService.query(params.type, params.filters)
        .then(({data}) => {
            context.commit('fetch_end', data);
        })
        .catch(error => {
            throw new Error(error);
        });
    },
    fetchTags(context) {
        return TagsService.get()
        .then(({data}) =>{
          context.commit('setTags', data.tags)
          console.log(data.tags);
        })
        .catch(error => {
             throw new Error(error)
    });
    }
}


export default {
    state,
    getters,
    mutations,
    actions
};