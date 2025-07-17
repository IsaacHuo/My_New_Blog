<template>
  <div class="container">
    <!-- 顶部导航 -->
    <header class="top-nav">
      <div class="nav-content">
        <div class="logo-centered">
          霍玮放的博客
        </div>
        <div class="user-actions">
          <button @click="goHome" class="contact-btn">返回首页</button>
          <button @click="showContact = true" class="contact-btn">联系我</button>
        </div>
      </div>
    </header>

    <!-- 分类导航横幅 -->
    <section class="category-banner">
      <div class="banner-content">
        <div class="category-breadcrumb">
          <button @click="goHome" class="breadcrumb-btn">首页</button>
          <span class="breadcrumb-separator">></span>
          <button class="breadcrumb-btn breadcrumb-current" disabled>技术随笔</button>
        </div>
      </div>
    </section>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 文章列表区域 -->
      <div class="articles-container">
        <!-- 分类标题 -->
        <header class="category-header">
          <h1 class="category-title">
            <span class="title-emoji">💻</span> 技术文章
          </h1>
          <div class="category-stats">
            <span class="article-count">共 {{ techArticles.length }} 篇文章</span>
            <span class="last-update">最后更新：{{ lastUpdate }}</span>
          </div>
        </header>

        <!-- 文章列表 -->
        <div class="articles-list">
          <div 
            v-for="article in techArticles" 
            :key="article.id" 
            class="article-card"
            :class="{ 'no-detail': !hasArticleDetail('tech', article.id) }"
            @click="goToArticle(article)"
          >
            <div class="article-status" v-if="article.status">
              {{ article.status }}
            </div>
            <div class="article-main">
              <h3 class="article-title">{{ article.title }}</h3>
              <p class="article-summary">{{ article.summary }}</p>
              <div class="article-meta">
                <div class="meta-left">
                  <span class="article-author">{{ article.author }}</span>
                  <span class="article-date">{{ article.date }}</span>
                  <span class="article-category">{{ article.category }}</span>
                </div>
                <div class="meta-right">
                  <span class="article-reads">{{ article.readCount }} 阅读</span>
                  <span class="article-likes">{{ article.likes }} 点赞</span>
                </div>
              </div>
            </div>
            <div class="article-tags">
              <span v-for="tag in article.tags" :key="tag" class="article-tag">{{ tag }}</span>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <div class="pagination">
          <button 
            class="page-btn" 
            :class="{ disabled: currentPage === 1 }"
            @click="prevPage"
          >
            上一页
          </button>
          <span class="page-info">第 {{ currentPage }} 页，共 {{ totalPages }} 页</span>
          <button 
            class="page-btn" 
            :class="{ disabled: currentPage === totalPages }"
            @click="nextPage"
          >
            下一页
          </button>
        </div>
      </div>

      <!-- 侧边栏 -->
      <aside class="sidebar">
        <div class="sidebar-section">
          <div class="sidebar-header">文章分类</div>
          <div class="sidebar-content">
            <ul class="category-menu">
              <li class="category-item active">
                <span class="category-icon">
                  <span class="sidebar-emoji">💻</span>
                </span>
                <span class="category-name">技术文章</span>
                <span class="category-count">({{ techArticles.length }})</span>
              </li>
              <li class="category-item" @click="goToCategory('projects')">
                <span class="category-emoji">🚀</span>
                <span class="category-name">项目分享</span>
                <span class="category-count">(12)</span>
              </li>
              <li class="category-item" @click="goToCategory('life')">
                <span class="category-emoji">📚</span>
                <span class="category-name">生活杂想</span>
                <span class="category-count">(8)</span>
              </li>
              <li class="category-item" @click="goToCategory('about')">
                <span class="category-icon">
                  <img src="/MyPicture.jpeg" alt="作者" class="author-avatar">
                </span>
                <span class="category-name">关于我</span>
                <span class="category-count">(3)</span>
              </li>
              <li class="category-item" @click="goToCategory('wishes')">
                <span class="category-icon">⭐</span>
                <span class="category-name">我的愿望</span>
                <span class="category-count">(10)</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-header">热门标签</div>
          <div class="sidebar-content">
            <div class="tag-cloud">
              <span v-for="tag in popularTags" :key="tag.name" class="popular-tag" :style="{ fontSize: tag.size + 'px' }">
                {{ tag.name }}
              </span>
            </div>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-header">最新评论</div>
          <div class="sidebar-content">
            <div v-for="comment in recentComments" :key="comment.id" class="recent-comment">
              <div class="comment-author">{{ comment.author }}</div>
              <div class="comment-content">{{ comment.content }}</div>
              <div class="comment-article">在《{{ comment.article }}》</div>
            </div>
          </div>
        </div>
      </aside>
    </main>

    <!-- 页脚 -->
    <footer class="site-footer">
      <div class="footer-simple">
        <p>&copy; 2025 霍玮放的博客. All rights reserved.</p>
        <p>本站已运行 <span class="running-time">365</span> 天 | 总访问量 <span class="visit-count">12580</span></p>
      </div>
    </footer>
  </div>

  <!-- 联系方式模态框 -->
  <Transition name="fade">
    <div v-if="showContact" class="modal-overlay" @click="showContact = false">
      <div class="modal contact-modal" @click.stop>
        <div class="modal-header">
          <h3>联系我</h3>
          <button @click="showContact = false" class="close-btn">×</button>
        </div>
        <div class="modal-content">
          <div class="contact-info">
            <h4>加Q群：105653726</h4>
            <div class="qr-code">
              <img src="/QQ 群.png" alt="QQ群二维码" class="qr-image">
            </div>
            <p class="contact-desc">扫描二维码或搜索群号加入技术交流群</p>
            <div style="margin-top: 15px;">
              <p><strong>邮箱:</strong> 2210286979@qq.com</p>
              <p><strong>GitHub:</strong> https://github.com/IsaacHuo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { hasArticleDetail } from '../utils/helpers.js'

export default {
  name: 'TechArticles',
  setup() {
    const router = useRouter()
    const showContact = ref(false)
    const currentPage = ref(1)
    const articlesPerPage = 10
    const lastUpdate = ref('2025年7月17日')

    const techArticles = reactive([
      {
        id: 1,
        status: '置顶',
        title: 'Vue 3 组合式API详解与实践',
        summary: '深入探讨 Vue 3 组合式 API 的核心概念、使用方法和最佳实践，帮助开发者更好地理解和应用这一重要特性。',
        author: '霍玮放',
        date: '2025-07-16',
        category: '前端框架',
        readCount: 1205,
        likes: 48,
        tags: ['Vue.js', 'JavaScript', '前端开发']
      },
      {
        id: 2,
        status: '热门',
        title: 'JavaScript异步编程完全指南',
        summary: '从回调函数到Promise，再到async/await，全面讲解JavaScript异步编程的发展历程和最佳实践。',
        author: '霍玮放',
        date: '2025-07-15',
        category: '编程语言',
        readCount: 856,
        likes: 32,
        tags: ['JavaScript', '异步编程', 'Promise']
      },
      {
        id: 3,
        title: 'CSS Grid布局从入门到精通',
        summary: 'CSS Grid是一个强大的二维布局系统，本文将带你从基础概念到高级应用，掌握Grid布局的精髓。',
        author: '霍玮放',
        date: '2025-07-14',
        category: '前端样式',
        readCount: 642,
        likes: 25,
        tags: ['CSS', '布局', 'Grid']
      },
      {
        id: 4,
        title: 'React Hooks最佳实践总结',
        summary: '总结React Hooks的使用技巧和最佳实践，包括useState、useEffect、useContext等常用Hook的深度应用。',
        author: '霍玮放',
        date: '2025-07-13',
        category: '前端框架',
        readCount: 789,
        likes: 41,
        tags: ['React', 'Hooks', '前端开发']
      },
      {
        id: 5,
        title: '前端性能优化技巧汇总',
        summary: '从代码分割到懒加载，从缓存策略到图片优化，全方位提升前端应用性能的实用技巧。',
        author: '霍玮放',
        date: '2025-07-12',
        category: '性能优化',
        readCount: 923,
        likes: 56,
        tags: ['性能优化', '前端开发', '最佳实践']
      },
      {
        id: 6,
        title: 'TypeScript进阶使用技巧',
        summary: '深入TypeScript的高级特性，包括泛型、装饰器、模块系统等，提升代码的类型安全和开发效率。',
        author: '霍玮放',
        date: '2025-07-11',
        category: '编程语言',
        readCount: 567,
        likes: 28,
        tags: ['TypeScript', 'JavaScript', '类型系统']
      },
      {
        id: 7,
        title: 'Webpack配置优化实战',
        summary: '从基础配置到高级优化，深入理解Webpack的工作原理，提升构建效率和应用性能。',
        author: '霍玮放',
        date: '2025-07-10',
        category: '构建工具',
        readCount: 435,
        likes: 22,
        tags: ['Webpack', '构建工具', '前端工程化']
      },
      {
        id: 8,
        title: 'Node.js微服务架构设计',
        summary: '探讨如何使用Node.js构建可扩展的微服务架构，包括服务拆分、通信机制和部署策略。',
        author: '霍玮放',
        date: '2025-07-09',
        category: '后端开发',
        readCount: 678,
        likes: 35,
        tags: ['Node.js', '微服务', '架构设计']
      },
      {
        id: 9,
        title: '前端工程化最佳实践',
        summary: '从项目初始化到部署上线，构建现代化前端工程体系的完整指南和最佳实践。',
        author: '霍玮放',
        date: '2025-07-08',
        category: '工程化',
        readCount: 812,
        likes: 44,
        tags: ['前端工程化', '最佳实践', '开发流程']
      },
      {
        id: 10,
        title: '算法与数据结构学习笔记',
        summary: '系统梳理常见算法和数据结构，包括排序、搜索、动态规划等，提升编程思维和解决问题的能力。',
        author: '霍玮放',
        date: '2025-07-07',
        category: '算法',
        readCount: 345,
        likes: 18,
        tags: ['算法', '数据结构', '编程基础']
      }
    ])

    const popularTags = reactive([
      { name: 'JavaScript', size: 16 },
      { name: 'Vue.js', size: 14 },
      { name: 'React', size: 13 },
      { name: '前端开发', size: 15 },
      { name: 'TypeScript', size: 12 },
      { name: 'CSS', size: 11 },
      { name: '性能优化', size: 13 },
      { name: '最佳实践', size: 12 }
    ])

    const recentComments = reactive([
      {
        id: 1,
        author: '张三',
        content: '写得很详细，学到了很多...',
        article: 'Vue 3 组合式API详解与实践'
      },
      {
        id: 2,
        author: '李四',
        content: '代码示例很清晰，已收藏',
        article: 'JavaScript异步编程完全指南'
      },
      {
        id: 3,
        author: '王五',
        content: '感谢分享，很有帮助！',
        article: 'CSS Grid布局从入门到精通'
      }
    ])

    const totalPages = computed(() => {
      return Math.ceil(techArticles.length / articlesPerPage)
    })

    const goHome = () => {
      router.push('/')
    }

    const goToArticle = (article) => {
      // 检查是否有详情页
      if (hasArticleDetail('tech', article.id)) {
        router.push(`/article/tech/${article.id}`)
      } else {
        console.log('文章暂无详情页，点击无效')
        // 无详情页的文章点击无反应
      }
    }

    const goToCategory = (category) => {
      console.log('跳转到分类:', category)
      // 根据分类跳转到相应页面
      switch(category) {
        case 'projects':
          router.push('/projects')
          break
        case 'life': 
          router.push('/life')
          break
        case 'about':
          router.push('/about')
          break
        case 'wishes':
          router.push('/wishes')
          break
        default:
          router.push('/')
      }
    }

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }

    onMounted(() => {
      console.log('技术文章页面已加载')
    })

    return {
      showContact,
      currentPage,
      lastUpdate,
      techArticles,
      popularTags,
      recentComments,
      totalPages,
      goHome,
      goToArticle,
      goToCategory,
      prevPage,
      nextPage,
      hasArticleDetail
    }
  }
}
</script>

<style scoped>
/* 分类页面特定样式 */

/* 分类导航横幅 */
.category-banner {
  background: linear-gradient(to bottom, #60a5fa 0%, #3b82f6 100%);
  padding: 10px 20px;
  border-top: 3px solid #1d4ed8;
  border-bottom: 3px solid #1d4ed8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.category-breadcrumb {
  font-size: 14px;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 10px;
}

.breadcrumb-btn {
  display: flex;
  align-items: center;
  padding: 6px 16px;
  background: linear-gradient(to bottom, #3b82f6 0%, #2563eb 100%);
  border: 1px solid #1d4ed8;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 
    inset 0 1px 0 rgba(255,255,255,0.2),
    0 2px 4px rgba(0,0,0,0.15);
  min-width: 80px;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 500;
  color: #ffffff;
  text-shadow: 0 1px 1px rgba(0,0,0,0.4);
  justify-content: center;
}

.breadcrumb-btn:hover:not(:disabled) {
  background: linear-gradient(to bottom, #60a5fa 0%, #3b82f6 100%);
  transform: translateY(-1px);
  box-shadow: 
    inset 0 1px 0 rgba(255,255,255,0.3),
    0 3px 6px rgba(0,0,0,0.2);
}

.breadcrumb-btn:disabled {
  background: linear-gradient(to bottom, #ffd700 0%, #f59e0b 100%);
  color: #1d4ed8;
  border-color: #f59e0b;
  cursor: default;
  font-weight: bold;
  text-shadow: 0 1px 1px rgba(0,0,0,0.2);
  box-shadow: 
    inset 0 1px 0 rgba(255,255,255,0.3),
    0 2px 4px rgba(0,0,0,0.15);
}

.breadcrumb-btn:active:not(:disabled) {
  background: linear-gradient(to bottom, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(0);
  box-shadow: 
    inset 0 2px 4px rgba(0,0,0,0.2),
    0 1px 2px rgba(0,0,0,0.15);
}

/* 主要内容布局 */
.main-content {
  display: flex;
  background: white;
  gap: 20px;
  padding: 20px;
}

.articles-container {
  flex: 1;
  max-width: calc(100% - 280px);
}

.sidebar {
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 分类标题区域 */
.category-header {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.08);
}

.category-title {
  font-size: 24px;
  color: #1f2937;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.category-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #6b7280;
  padding-top: 10px;
  border-top: 1px solid #e2e8f0;
}

/* 文章列表 */
.articles-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.article-card {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.08);
  position: relative;
}

.article-card:hover {
  border-color: #3b82f6;
  background: #f8fafc;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.15);
}

/* 无详情页文章卡片样式 */
.article-card.no-detail {
  cursor: default !important;
  opacity: 0.6;
}

.article-card.no-detail:hover {
  border-color: #e2e8f0 !important;
  background: white !important;
  transform: none !important;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.08) !important;
}

.article-card.no-detail .article-title {
  color: #9ca3af !important;
}

.article-card.no-detail .article-summary {
  color: #d1d5db !important;
}

.article-status {
  position: absolute;
  top: -2px;
  right: 15px;
  background: linear-gradient(to bottom, #ef4444 0%, #dc2626 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 0 0 8px 8px;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.article-main {
  margin-bottom: 8px;
}

.article-title {
  font-size: 18px;
  color: #1f2937;
  margin-bottom: 8px;
  line-height: 1.4;
  font-weight: 600;
}

.article-summary {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 12px;
  font-size: 14px;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #6b7280;
}

.meta-left span,
.meta-right span {
  margin-right: 15px;
}

.meta-right span {
  margin-right: 0;
  margin-left: 15px;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #f1f5f9;
}

.article-tag {
  background: #f1f5f9;
  color: #3b82f6;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 12px;
  border: 1px solid #e2e8f0;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  padding: 20px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.08);
}

.page-btn {
  background: linear-gradient(to bottom, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: 1px solid #1d4ed8;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.page-btn:hover:not(.disabled) {
  background: linear-gradient(to bottom, #60a5fa 0%, #3b82f6 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.2);
}

.page-btn.disabled {
  background: #e5e7eb;
  color: #9ca3af;
  border-color: #d1d5db;
  cursor: not-allowed;
  transform: none;
}

.page-info {
  color: #4b5563;
  font-size: 14px;
}

/* 侧边栏样式 */
.sidebar-section {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.08);
}

.sidebar-header {
  background: linear-gradient(to bottom, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 12px 15px;
  font-size: 14px;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.sidebar-content {
  padding: 15px;
  background: #f8fafc;
}

.category-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 5px;
}

.category-item.active {
  background: linear-gradient(to right, #60a5fa 0%, #3b82f6 100%);
  color: white;
}

.category-item:not(.active):hover {
  background: #e2e8f0;
}

.category-icon {
  margin-right: 8px;
  font-size: 16px;
}

.category-name {
  flex: 1;
  font-size: 13px;
}

.category-count {
  font-size: 12px;
  opacity: 0.8;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.popular-tag {
  background: #f1f5f9;
  color: #3b82f6;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #e2e8f0;
}

.popular-tag:hover {
  background: #3b82f6;
  color: white;
}

.recent-comment {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px dotted #cbd5e1;
}

.recent-comment:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.comment-author {
  font-weight: 600;
  color: #1f2937;
  font-size: 13px;
  margin-bottom: 4px;
}

.comment-content {
  color: #4b5563;
  font-size: 12px;
  line-height: 1.4;
  margin-bottom: 4px;
}

.comment-article {
  color: #6b7280;
  font-size: 11px;
  font-style: italic;
}

/* Emoji 字体设置 */
.title-emoji,
.sidebar-emoji,
.category-emoji {
  font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Twemoji Mozilla", "Android Emoji", "EmojiOne Color", sans-serif !important;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  font-weight: normal !important;
  font-style: normal !important;
  margin-right: 8px;
}

/* 图标样式 */
.title-icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
  margin-right: 8px;
  vertical-align: middle;
}

.sidebar-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.author-avatar {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  object-fit: cover;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
    padding: 15px;
  }
  
  .articles-container {
    max-width: 100%;
  }
  
  .sidebar {
    width: 100%;
  }
  
  .category-header {
    padding: 20px;
  }
  
  .category-title {
    font-size: 20px;
  }
  
  .category-stats {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .pagination {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
