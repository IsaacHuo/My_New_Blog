import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import TechArticles from './views/TechArticles.vue'
import ProjectShare from './views/ProjectShare.vue'
import LifeThoughts from './views/LifeThoughts.vue'
import AboutMe from './views/AboutMe.vue'
import MyWishes from './views/MyWishes.vue'

// 技术文章详情页
import TechArticle1 from './views/articles/tech/TechArticle1.vue'
import TechArticle2 from './views/articles/tech/TechArticle2.vue'

// 项目分享详情页
import ProjectArticle1 from './views/articles/projects/ProjectArticle1.vue'
import ProjectArticle2 from './views/articles/projects/ProjectArticle2.vue'

// 生活杂想详情页
import LifeArticle1 from './views/articles/life/LifeArticle1.vue'

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
  // 技术文章详情页路由
  {
    path: '/article/tech/1',
    name: 'TechArticle1',
    component: TechArticle1
  },
  {
    path: '/article/tech/2',
    name: 'TechArticle2',
    component: TechArticle2
  },
  // 项目分享详情页路由
  {
    path: '/article/projects/1',
    name: 'ProjectArticle1',
    component: ProjectArticle1
  },
  {
    path: '/article/projects/2',
    name: 'ProjectArticle2',
    component: ProjectArticle2
  },
  // 生活杂想详情页路由
  {
    path: '/article/life/1',
    name: 'LifeArticle1',
    component: LifeArticle1
  },
  // 兼容旧的路由格式，重定向到首页或相应分类页
  {
    path: '/article/:category/:id',
    redirect: to => {
      // 如果访问了不存在的文章，重定向到对应分类页面
      const { category } = to.params
      switch (category) {
        case 'tech':
          return '/tech'
        case 'projects':
          return '/projects'
        case 'life':
          return '/life'
        default:
          return '/'
      }
    }
  },
  {
    path: '/article/:id',
    redirect: () => {
      return `/tech`
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
