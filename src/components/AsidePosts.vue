<template>
  <aside class="aside-posts">
    <h3 class="single-title">
      {{ asideMessage.toUpperCase() }}
    </h3>
    <div class="card" v-for="(post, index) in posts" :key="index">
      <router-link :to="`/post/${post.slug}`">
        <div class="img-content">
          <img 
            class="img-fluid"
            v-if="post.acf.featured_image"
            :src="post.acf.featured_image"
            :alt="post.title.rendered"
          >
          <img 
            class="img-fluid"
            v-else src="https://via.placeholder.com/300x220"
            alt="Card image cap"
          >
        </div>
      </router-link>
      <div class="card-body">
        <time class="post-time">
          {{ post.date }}
        </time>
        <router-link :to="`/post/${post.slug}`">
          <h5 class="card-title">
            {{ post.title.rendered }}
          </h5>
        </router-link>
        <p 
          class="card-text"
          v-html="post.excerpt.rendered"
        ></p>
      </div>
      <div class="card-footer">
        <router-link :to="`/post/${post.slug}`" class="btn btn-primary">
          <i class="fas fa-plus"></i>
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "AsidePosts",
    data() {
      return {
        asideMessage: 'Saiba Mais',
        error: false,
        posts: {},
      }
    },

    watch: {
      '$route'(to, from) {
        this.getPosts(to.params.slug);
      }
    },

    methods: {
      getPosts() {
        axios.get('/wp/v2/posts', {
          params: {
            per_page: 2,
          }
        })
        .then(( res ) => {
          this.posts = res.data;
        })
        .catch(( res ) => {
          this.error = true;
          console.log('Error:', res);
        })
        .finally(() => {
          console.log('Finally');
        })
      },
    },

    created() {
      this.getPosts();
    }
  }
</script>

<style scoped lang="scss">

</style>