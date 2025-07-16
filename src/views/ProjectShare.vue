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
          <button @click="goHome" class="breadcrumb-btn breadcrumb-link">首页</button>
          <span class="breadcrumb-separator">></span>
          <button class="breadcrumb-btn breadcrumb-current" disabled>项目分享</button>
        </div>
      </div>
    </section>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 项目列表区域 -->
      <div class="articles-container">
        <!-- 分类标题 -->
        <header class="category-header">
          <h1 class="category-title">🚀 项目分享</h1>
          <div class="category-stats">
            <span class="article-count">共 {{ projects.length }} 个项目</span>
            <span class="last-update">最后更新：{{ lastUpdate }}</span>
          </div>
        </header>

        <!-- 项目列表 -->
        <div class="articles-list">
          <div 
            v-for="project in projects" 
            :key="project.id" 
            class="article-card"
            :class="{ 'no-detail': !hasArticleDetail('projects', project.id - 100) }"
            @click="goToArticle(project)"
          >
            <div class="article-status" v-if="project.status">
              {{ project.status }}
            </div>
            <div class="article-main">
              <h3 class="article-title">{{ project.title }}</h3>
              <p class="article-summary">{{ project.summary }}</p>
              <div class="article-meta">
                <div class="meta-left">
                  <span class="article-author">{{ project.author }}</span>
                  <span class="article-date">{{ project.date }}</span>
                  <span class="article-category">{{ project.category }}</span>
                </div>
                <div class="meta-right">
                  <span class="article-reads">{{ project.readCount }} 阅读</span>
                  <span class="article-likes">{{ project.likes }} 点赞</span>
                  <span class="project-stars">⭐ {{ project.stars }}</span>
                </div>
              </div>
            </div>
            <div class="article-tags">
              <span v-for="tag in project.tags" :key="tag" class="article-tag">{{ tag }}</span>
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
          <div class="sidebar-header">项目分类</div>
          <div class="sidebar-content">
            <ul class="category-menu">
              <li class="category-item" @click="goToCategory('tech')">
                <span class="category-icon">💻</span>
                <span class="category-name">技术文章</span>
                <span class="category-count">(18)</span>
              </li>
              <li class="category-item active">
                <span class="category-icon">🚀</span>
                <span class="category-name">项目分享</span>
                <span class="category-count">({{ projects.length }})</span>
              </li>
              <li class="category-item" @click="goToCategory('life')">
                <span class="category-icon">🌱</span>
                <span class="category-name">生活杂想</span>
                <span class="category-count">(8)</span>
              </li>
              <li class="category-item" @click="goToCategory('about')">
                <span class="category-icon">👨‍💻</span>
                <span class="category-name">关于我</span>
                <span class="category-count">(3)</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-header">技术栈</div>
          <div class="sidebar-content">
            <div class="tag-cloud">
              <span v-for="tech in techStack" :key="tech.name" class="popular-tag" :style="{ fontSize: tech.size + 'px' }">
                {{ tech.name }}
              </span>
            </div>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-header">项目状态</div>
          <div class="sidebar-content">
            <div v-for="stat in projectStats" :key="stat.name" class="project-stat">
              <div class="stat-label">{{ stat.name }}</div>
              <div class="stat-value">{{ stat.value }}</div>
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
  name: 'ProjectShare',
  setup() {
    const router = useRouter()
    const showContact = ref(false)
    const currentPage = ref(1)
    const articlesPerPage = 10
    const lastUpdate = ref('2025年7月17日')

    const projects = reactive([
      {
        id: 101,
        status: '开源',
        title: '个人博客系统 - Vue3 + Vite',
        summary: '基于 Vue3 和 Vite 构建的现代化个人博客系统，支持文章管理、分类浏览、评论互动等功能。采用响应式设计，兼容多端设备。',
        author: '霍玮放',
        date: '2025-07-16',
        category: '前端项目',
        readCount: 523,
        likes: 28,
        stars: 15,
        tags: ['Vue.js', 'Vite', '博客系统', '响应式设计']
      },
      {
        id: 102,
        status: '进行中',
        title: '智能代码审查工具',
        summary: '基于AI的智能代码审查工具，能够自动检测代码质量问题、安全漏洞和性能优化建议。支持多种编程语言和IDE集成。',
        author: '霍玮放',
        date: '2025-07-15',
        category: '开发工具',
        readCount: 356,
        likes: 42,
        stars: 23,
        tags: ['AI', '代码审查', 'VSCode', 'Python']
      },
      {
        id: 103,
        title: '微信小程序 - 待办清单',
        summary: '简洁实用的微信小程序待办清单，支持任务分类、提醒设置、数据同步等功能。界面美观，操作流畅。',
        author: '霍玮放',
        date: '2025-07-14',
        category: '小程序',
        readCount: 789,
        likes: 56,
        stars: 31,
        tags: ['微信小程序', '待办清单', 'JavaScript', '云开发']
      },
      {
        id: 104,
        status: '已完成',
        title: 'React 组件库 - UIKit',
        summary: '轻量级 React 组件库，包含常用的UI组件如按钮、表单、模态框等。支持主题定制，TypeScript 友好。',
        author: '霍玮放',
        date: '2025-07-13',
        category: '组件库',
        readCount: 445,
        likes: 38,
        stars: 67,
        tags: ['React', 'TypeScript', '组件库', 'npm']
      },
      {
        id: 105,
        title: 'Node.js API 服务框架',
        summary: '基于 Express 和 TypeScript 的 API 服务框架，集成了用户认证、权限管理、数据验证、日志记录等功能。',
        author: '霍玮放',
        date: '2025-07-12',
        category: '后端框架',
        readCount: 667,
        likes: 45,
        stars: 89,
        tags: ['Node.js', 'Express', 'TypeScript', 'JWT']
      },
      {
        id: 106,
        status: '开源',
        title: '前端性能监控平台',
        summary: '实时监控前端应用性能的平台，包括页面加载时间、用户交互响应、错误追踪等。提供详细的性能分析报告。',
        author: '霍玮放',
        date: '2025-07-11',
        category: '监控工具',
        readCount: 334,
        likes: 29,
        stars: 45,
        tags: ['性能监控', 'JavaScript', '数据可视化', 'WebAPI']
      },
      {
        id: 107,
        title: 'Chrome 扩展 - 开发者工具',
        summary: '为前端开发者设计的 Chrome 扩展，提供颜色拾取、尺寸测量、代码格式化等实用功能。',
        author: '霍玮放',
        date: '2025-07-10',
        category: '浏览器扩展',
        readCount: 512,
        likes: 33,
        stars: 21,
        tags: ['Chrome扩展', '开发者工具', 'JavaScript', 'CSS']
      },
      {
        id: 108,
        status: '已完成',
        title: 'Vue 表格组件 - DataTable',
        summary: '功能强大的 Vue 表格组件，支持排序、筛选、分页、虚拟滚动等特性。可配置性强，性能优秀。',
        author: '霍玮放',
        date: '2025-07-09',
        category: 'Vue组件',
        readCount: 721,
        likes: 51,
        stars: 128,
        tags: ['Vue.js', '表格组件', '虚拟滚动', 'TypeScript']
      },
      {
        id: 109,
        title: 'Webpack 插件集合',
        summary: '自研的 Webpack 插件集合，包括代码分析、性能优化、自动部署等插件。提升前端构建效率。',
        author: '霍玮放',
        date: '2025-07-08',
        category: '构建工具',
        readCount: 267,
        likes: 19,
        stars: 34,
        tags: ['Webpack', '插件开发', 'Node.js', '前端工程化']
      },
      {
        id: 110,
        status: '进行中',
        title: '全栈项目 - 在线协作平台',
        summary: '基于现代技术栈的在线协作平台，支持实时协作编辑、视频会议、文件分享等功能。前后端分离架构。',
        author: '霍玮放',
        date: '2025-07-07',
        category: '全栈应用',
        readCount: 456,
        likes: 62,
        stars: 78,
        tags: ['全栈开发', 'WebRTC', 'Socket.io', 'MongoDB']
      }
    ])

    const techStack = reactive([
      { name: 'Vue.js', size: 16 },
      { name: 'React', size: 15 },
      { name: 'Node.js', size: 14 },
      { name: 'TypeScript', size: 13 },
      { name: 'JavaScript', size: 15 },
      { name: 'Python', size: 12 },
      { name: 'MongoDB', size: 11 },
      { name: 'Express', size: 13 }
    ])

    const projectStats = reactive([
      { name: '开源项目', value: '8个' },
      { name: '进行中', value: '3个' },
      { name: '已完成', value: '7个' },
      { name: 'GitHub Stars', value: '456+' }
    ])

    const totalPages = computed(() => {
      return Math.ceil(projects.length / articlesPerPage)
    })

    const goHome = () => {
      router.push('/')
    }

    const goToArticle = (project) => {
      // 将项目 ID 转换为文章 ID（项目 ID 101-110 对应文章 ID 1-10）
      const articleId = project.id - 100
      
      // 检查是否有详情页
      if (hasArticleDetail('projects', articleId)) {
        router.push(`/article/projects/${articleId}`)
      } else {
        console.log('项目暂无详情页，点击无效')
        // 无详情页的项目点击无反应
      }
    }

    const goToCategory = (category) => {
      switch(category) {
        case 'tech':
          router.push('/tech')
          break
        case 'life':
          router.push('/life')
          break
        case 'about':
          router.push('/about')
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
      console.log('项目分享页面已加载')
    })

    return {
      showContact,
      currentPage,
      lastUpdate,
      projects,
      techStack,
      projectStats,
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

/* 无详情页项目卡片样式 */
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

/* 项目特定样式 */
.project-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px dotted #cbd5e1;
}

.project-stat:last-child {
  border-bottom: none;
}

.stat-label {
  color: #4b5563;
  font-size: 13px;
}

.stat-value {
  color: #1f2937;
  font-weight: 600;
  font-size: 13px;
}

.project-stars {
  color: #f59e0b;
  font-weight: 600;
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
