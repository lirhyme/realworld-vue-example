import { de } from "date-fns/locale";
import {createRouter, createWebHistory} from "vue-router";
import LoginVue from "@/views/Login.vue";
import HomeVue from "@/views/Home.vue";
import HomeGlobalVue from "@/views/HomeGlobal.vue";
import HomeMyFeedVue from "@/views/HomeMyFeed.vue";
import HomeTagVue from "@/views/HomeTag.vue";
import RegisterVue from "@/views/Register.vue";
import SettingsVue from "@/views/Settings.vue";
import ArticleVue from "@/views/Article.vue";
import ArticleEditVue from "@/views/ArticleEdit.vue";
import ProfileVue from "@/views/Profile.vue";
import ProfileArticlesVue from "@/views/ProfileArticles.vue";
import ProfileFavoritedVue from "@/views/ProfileFavorited.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: HomeVue
      ,
      children: [
        {
          path: "",
          name: "home",
          component: HomeGlobalVue
        }
        ,
        {
          path: "my-feed",
          name: "home-my-feed",
          component: HomeMyFeedVue
        },
        {
          path: "tag/:tag",
          name: "home-tag",
          component: HomeTagVue
        }
      ]
    },
    {
      name: "login",
      path: "/login",
      component: LoginVue 
    }
    ,
    {
      name: "register",
      path: "/register",
      component: RegisterVue
    }
    ,
    {
      name: "settings",
      path: "/settings",
      component: SettingsVue
    },
    // // Handle child routes with a default, by giving the name to the
    // // child.
    // // SO: https://github.com/vuejs/vue-router/issues/777
    {
      path: "/@:username",
      component: ProfileVue
      ,
      children: [
        {
          path: "",
          name: "profile",
          component: ProfileArticlesVue
        }
        ,
        {
          name: "profile-favorites",
          path: "favorites",
          component: ProfileFavoritedVue
        }
      ]
    }
    ,
    {
      name: "article",
      path: "/articles/:slug",
      component: ArticleVue,
      props: true
    }
    ,
    {
      name: "article-edit",
      path: "/editor/:slug?",
      props: true,
      component: ArticleEditVue
    }
  ]
});

export default router