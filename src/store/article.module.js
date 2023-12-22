import { ArticlesService, CommentsService, FavoriteService} from "@/common/api.service";

const state = {
    article: {
        author: {},
        title: "",
        description:"",
        body: "",
        tagList: []
    },
    comments: []
}
const getters = {
    article(state) {
        return state.article;
    },
    comments(state) {
        return state.comments;
    }
}
const mutations = {
    setArticle(state, article) {
        state.article = article;
    },
    setCommnets(state, comments) {
        state.comments = comments;
    }
}
const actions = {
    async fetchArticle(context, articleSlug, prevArticle) {
        if (prevArticle != undefined) {
            return context.commit('setArticle', prevArticle);
        }
        const {data} = await  ArticlesService.get(articleSlug);
        context.commit('setArticle', data.article);
        return data;
    }
}
export default {
    state, getters, mutations, actions
}