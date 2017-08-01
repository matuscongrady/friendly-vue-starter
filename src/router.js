import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = () => import(/* webpackChunkName: "home" */ './components/Home.vue');
const Counter = () => import(/* webpackChunkName: "counter" */ './components/Counter.vue');
const Posts = () => import(/* webpackChunkName: "posts" */ './components/Posts.vue');

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home, meta: { title: 'Home' } },
  { path: '/counter', component: Counter, meta: { title: 'Counter' } },
  { path: '/posts', component: Posts, meta: { title: 'Posts' } }
];

const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
