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
          <span @click="goHome" class="breadcrumb-link">首页</span>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-current">项目分享</span>
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
      router.push(`/article/${project.id}`)
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
      nextPage
    }
  }
}
</script>

<style scoped>
@import './style.css';

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
</style>
