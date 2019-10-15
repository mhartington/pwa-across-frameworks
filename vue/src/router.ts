import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('./views/Landing.vue')
    },
    {
      path: '/browse',
      name: 'browse',
      component: () => import(/* webpackChunkName: "browse" */'./views/Browse.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/Search.vue')
    },
    {
      path: '/album/:id',
      name: 'album',
      component: () => import('./views/Album.vue')
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: () => import('./views/Playlist.vue')
    }
  ]
});
