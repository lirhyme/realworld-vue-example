<template>
    <div class="profile-page">
      <RwvArticleList :author="author" :items-per-page="5"></RwvArticleList>
    </div>
  </template>
  
  <script>
  import RwvArticleList from "@/components/ArticleList.vue";
  
  export default {
    name: "RwvProfileArticles",
    components: {
      RwvArticleList
    },
    computed: {
      author() {
        return this.$route.params.username;
      }
    }
  };
  </script>
  