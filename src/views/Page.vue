<template>
  <section class="section page">
    <div class="container">
      <!-- grid loading -->
      <div v-if="loading" class="row">
        <div class="col-md-9">
          <div class="mb-4">
            <div class="shine"></div>
            <div class="shine"></div>
            <div class="shine"></div>
            <div class="shine"></div>
          </div>
          <div class="mb-4">
            <div class="shine"></div>
            <div class="shine"></div>
            <div class="shine"></div>
            <div class="shine"></div>
          </div>
          <div class="mb-4">
            <div class="shine"></div>
            <div class="shine"></div>
            <div class="shine"></div>
            <div class="shine"></div>
          </div>
          <div class="mb-4">
            <div class="shine"></div>
            <div class="shine"></div>
            <div class="shine"></div>
            <div class="shine"></div>
          </div>
        </div>
      </div>
      <!-- alert error -->
      <ErrorAlert v-else-if="error" />
      <!-- grid -->
      <div v-else class="row">
        <div class="section-page col-md-9">
          <!-- page title -->
          <h2 class="page-title" v-if="locale === 'en'">
            {{ page.acf.title_en }}
          </h2>
          <h2 class="page-title" v-else>
            {{ page.title.rendered }}
          </h2>
          <!-- page content -->
          <div class="page-content"
               v-if="locale === 'en'"
               v-html="page.acf.content_en"
          ></div>
          <div class="page-content"
               v-else
               v-html="page.content.rendered"
          ></div>
          <!-- gallery -->
          <b-carousel v-if="page.acf.galeria"
                      id="carousel1"
                      class="carousel-fade"
                      style="text-shadow: 1px 1px 2px #333;"
                      controls
                      indicators
                      background="#ababab"
                      :interval="4000"
                      img-width="1024"
                      img-height="480"
                      v-model="slide"
                      @sliding-start="onSlideStart"
                      @sliding-end="onSlideEnd"
          >
            <!-- Slides with image only -->
            <b-carousel-slide :img-src="item.sizes.large"
                              v-for="(item, index) in gallery"
                              :key="index">
            </b-carousel-slide>
          </b-carousel>
        </div>
      </div>
      <!-- share buttons -->
      <ShareContent />
    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  import ShareContent from '@/components/ShareContent.vue'
  import ErrorAlert from '../components/ErrorAlert.vue'
  import { mapState } from 'vuex'

  export default {
    name: "Page",
    components: {
      ShareContent,
      ErrorAlert
    },

    data() {
      return {
        loading: true, // show loading lines
        formLoading: false, // show form loading
        error: false,
        page: {},
        gallery: {},
        slide: 0,
        sliding: null,
        titleMeta: '',
        contentMeta: ''
      }
    },

    methods: {
      getPage( slug ) {
        axios.get(`/wp/v2/pages`, {
          params: {
            slug: slug
          }
        })
        .then(( res ) => {
          this.page = res.data[0];
          this.gallery = res.data[0].acf.galeria; // return only images gallery
          this.titleMeta = res.data[0].title.rendered;
          this.contentMeta = res.data[0].excerpt.rendered;
        })
        .catch(() => {
          this.error = true;
        })
        .finally(() => {
          this.loading = false;
        })
      },

      onSlideStart( slide ) {
        this.sliding = true;
      },

      onSlideEnd( slide ) {
        this.sliding = false;
      },
    },

    watch: {
      '$route'(to, from) {
        this.getPage(to.params.slug);
        this.loading = true; // reset loading page when change routes
      },

      locale(val) {
        this.$i18n.locale = val;
        this.loading = true;
        this.getPage(this.$route.params.slug);
      }
    },

    computed: {
      ...mapState([
        'locale'
      ])
    },

    created() {
      this.getPage(this.$route.params.slug); // slug current page
    },

    metaInfo() {
      return {
        title: this.titleMeta + ' | CSP',
        meta: [
          { vmid: 'description', name: 'description', content: this.contentMeta },
        ]
      }
    },
  }
</script>

<style scoped lang="scss">
  .page {
    padding: 30px 0;
    &-title {
      font-family: "Centuma", Roboto, sans-serif;
      color: #65666A;
      margin-bottom: 20px;
    }
  }
</style>