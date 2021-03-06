import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Single from './views/Single.vue'
import Page from './views/Page.vue'
import AllPost from './views/AllPost.vue'
import PageNews from './views/PageNews.vue'
import PageModal from './views/PageModal.vue'
import Search from './views/Search.vue'
import TimeLine from './views/TimeLine.vue'
import LoginForm from './components/LoginForm.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/post/:slug',
      name: 'Single',
      component: Single
    },
    {
      path: '/page/:slug',
      name: 'Page',
      component: Page,
    },
    {
      path: '/page/controles-ambientais/plantas',
      name: 'PageModal',
      component: PageModal,
    },
    {
      path: '/page/imprensa/posts',
      name: 'AllPost',
      component: AllPost
    },
    {
      path: '/search/:slug',
      name: 'Search',
      component: Search,
    },
    {
      path: '/search/',
      component: Search,
    },
    {
      path: '/page/imprensa/:slug',
      name: 'PageNews',
      component: PageNews
    },
    {
      path: '/page/categories/:slug',
      component: AllPost
    },
    {
      path: '/page/meio-ambiente/linha-do-tempo-sustentavel',
      name: 'TimeLine',
      component: TimeLine
    },
    {
      path: '/page/sala-de-imprensa/login',
      name: 'LoginForm',
      component: LoginForm
    }
  ],

  // scroll to top when change routes
  scrollBehavior(to, from, scrollPosition) {
    return { x: 0, y: 0 };
  }
})
