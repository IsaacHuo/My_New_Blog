import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import TechArticles from './views/TechArticles.vue'
import ProjectShare from './views/ProjectShare.vue'
import LifeThoughts from './views/LifeThoughts.vue'
import AboutMe from './views/AboutMe.vue'
import MyWishes from './views/MyWishes.vue'
import ArticleDetail from './views/ArticleDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tech',
    name: 'TechArticles',
    component: TechArticles
  },
  {
    path: '/projects',
    name: 'ProjectShare',
    component: ProjectShare
  },
  {
    path: '/life',
    name: 'LifeThoughts',
    component: LifeThoughts
  },
  {
    path: '/about',
    name: 'AboutMe',
    component: AboutMe
  },
  {
    path: '/wishes',
    name: 'MyWishes',
    component: MyWishes
  },
  {
    path: '/article/:id',
    name: 'ArticleDetail',
    component: ArticleDetail,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
