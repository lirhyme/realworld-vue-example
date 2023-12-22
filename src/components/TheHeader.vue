<template>
    <nav class="navbar navbar-light">
      <div class="container">
        <router-link class="navbar-brand" :to="{ name: 'home' }">
          conduit
        </router-link>
        <ul v-if="!isAuthenticated" class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              exact
              :to="{ name: 'home' }"
            >
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              exact
              :to="{ name: 'login' }"
            >
              <i class="ion-compose"></i>Sign in
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              exact
              :to="{ name: 'register' }"
            >
              <i class="ion-compose"></i>Sign up
            </router-link>
          </li>
        </ul>
        <ul v-else class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              exact
              to="/"
            >
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="articleEditLink"
            >
              <i class="ion-compose"></i>&nbsp;New Article
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              exact
              :to="settingsLink"
            
            >
              <i class="ion-gear-a"></i>&nbsp;Settings
            </router-link>
          </li>
          <li class="nav-item" v-if="currentUser.username">
            <router-link
              class="nav-link"
              active-class="active"
              exact
              :to="profileLink"
            >
              {{ currentUser.username }}
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  
  export default {
    name: "RwvHeader",
    computed: {
      ...mapGetters(["currentUser", "isAuthenticated"]),
      settingsLink() {
        return {
            name: 'settings'
        }
      },
      articleEditLink() {
          return { 
            name: 'article-edit'
           };
      },
      profileLink(){
          return {
            name: 'profile',
            params: { username: this.currentUser.username }
          }
      }
    },
    methods: {
      getCurrentUser() {
        this.$store.dispatch('getUser');
      }
    },
    mounted() {
      this.getCurrentUser();
    }
  };
  </script>