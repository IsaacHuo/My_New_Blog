<template>
  <div class="container">
    <!-- 顶部导航 -->
    <header class="top-nav">
      <div class="nav-content">
        <div class="logo-centered">
          霍玮放的博客
        </div>
        <div class="user-actions">
          <button @click="showContact = true" class="contact-btn">联系我</button>
          <button class="nav-toggle">快捷导航 ▼</button>
        </div>
      </div>
    </header>

    <!-- 分类导航横幅 -->
    <section class="category-banner">
      <div class="banner-content">
        <div class="nav-search-row">
          <!-- 左侧时间显示 -->
          <div class="time-display">
            <div class="current-time">{{ currentTime }}</div>
            <div class="current-date">{{ currentDate }}</div>
          </div>
          
          <!-- 中间标语 -->
          <div class="site-slogan">
            分享收获、感悟生活、共同成长！
          </div>
          
          <!-- 右侧区域 -->
          <div class="buttons-search-area">
            <!-- 按钮组 -->
            <div class="category-buttons-center">
              <div class="category-item-flat" @click="goToTechArticles">
                <div class="category-icon-flat">💻</div>
                <span>技术随笔</span>
              </div>
              <div class="category-item-flat" @click="goToProjects">
                <div class="category-icon-flat">🚀</div>
                <span>项目分享</span>
              </div>
              <div class="category-item-flat" @click="goToLife">
                <div class="category-icon-flat">🌱</div>
                <span>生活杂想</span>
              </div>
              <div class="category-item-flat" @click="goToAbout">
                <div class="category-icon-flat">👤</div>
                <span>关于我</span>
              </div>
              <div class="category-item-flat" @click="goToWishes">
                <div class="category-icon-flat">⭐</div>
                <span>我的愿望</span>
              </div>
            </div>
            
            <!-- 右侧搜索栏 -->
            <div class="search-section-compact">
              <input type="text" placeholder="搜索文章..." class="search-input-compact">
              <button class="search-btn-compact">🔍</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 侧边栏 - 移到最左边 -->
      <aside class="sidebar">
        <div class="sidebar-section">
          <div class="sidebar-header">个人介绍</div>
          <div class="sidebar-content">
            <div class="profile-intro">
              <div class="profile-avatar">👨‍💻</div>
              <div class="profile-info">
                <h3 class="profile-name">霍玮放</h3>
                <p class="profile-title">北京林业大学 本科生</p>
                <p class="profile-desc">
                  电气工程及其自动化专业在读，对编程和机器学习充满热情。
                  喜欢通过代码解决实际问题，探索技术与专业的结合点。
                </p>
                <div class="profile-skills">
                  <span class="skill-tag">Python</span>
                  <span class="skill-tag">JavaScript</span>
                  <span class="skill-tag">机器学习</span>
                  <span class="skill-tag">Vue.js</span>
                </div>
                <div class="profile-contact">
                  <div class="contact-item">
                    <span class="contact-icon">📧</span>
                    <span class="contact-info">2210286979@qq.com</span>
                  </div>
                  <div class="contact-item">
                    <span class="contact-icon">🐙</span>
                    <a href="https://github.com/IsaacHuo" target="_blank" class="contact-link">GitHub.com/IsaacHuo</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div class="content-area">
        <!-- 文章列表 - 四栏并排展示 -->
        <div class="topic-list">
          <div class="four-columns-layout">
            <!-- 最新发布栏 -->
            <div class="column-section">
              <div class="column-header">最新发布</div>
              <div class="column-content">
                <div 
                  v-for="article in getArticlesByCategory('latest')" 
                  :key="'latest-' + article.id" 
                  class="article-item-compact"
                >
                  <a 
                    href="#" 
                    @click="selectArticle(article)" 
                    class="article-title-compact"
                    :class="{ 'no-detail': !hasArticleDetail('tech', article.id) }"
                  >
                    {{ article.title }}
                  </a>
                  <div class="article-meta-compact">
                    <span class="article-stats">{{ article.readCount }}阅读</span>
                    <span class="article-date">{{ article.date }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 热门文章栏 -->
            <div class="column-section">
              <div class="column-header">热门文章</div>
              <div class="column-content">
                <div 
                  v-for="article in getArticlesByCategory('popular')" 
                  :key="'popular-' + article.id" 
                  class="article-item-compact"
                >
                  <a 
                    href="#" 
                    @click="selectArticle(article)" 
                    class="article-title-compact"
                    :class="{ 'no-detail': !hasArticleDetail('tech', article.id) }"
                  >
                    {{ article.title }}
                  </a>
                  <div class="article-meta-compact">
                    <span class="article-stats">{{ article.readCount }}阅读</span>
                    <span class="article-date">{{ article.date }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 精选推荐栏 -->
            <div class="column-section">
              <div class="column-header">我的推荐</div>
              <div class="column-content">
                <div 
                  v-for="article in getArticlesByCategory('featured')" 
                  :key="'featured-' + article.id" 
                  class="article-item-compact"
                >
                  <a 
                    href="#" 
                    @click="selectArticle(article)" 
                    class="article-title-compact"
                    :class="{ 'no-detail': !hasArticleDetail('tech', article.id) }"
                  >
                    {{ article.title }}
                  </a>
                  <div class="article-meta-compact">
                    <span class="article-stats">{{ article.readCount }}阅读</span>
                    <span class="article-date">{{ article.date }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 文章归档栏 -->
            <div class="column-section">
              <div class="column-header">GitHub数据统计</div>
              <div class="column-content">
                <div 
                  v-for="article in getArticlesByCategory('archived')" 
                  :key="'archived-' + article.id" 
                  class="article-item-compact"
                >
                  <a 
                    href="#" 
                    @click="selectArticle(article)" 
                    class="article-title-compact"
                    :class="{ 'no-detail': !hasArticleDetail('tech', article.id) }"
                  >
                    {{ article.title }}
                  </a>
                  <div class="article-meta-compact">
                    <span class="article-stats">{{ article.readCount }}阅读</span>
                    <span class="article-date">{{ article.date }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <!-- 页脚 -->
    <footer class="site-footer">
      <div class="footer-simple">
        <p>&copy; 2025 霍玮放的博客. All rights reserved.</p>
        <p>本站已运行 <span class="running-time">365</span> 天 | 总访问量 <span class="visit-count">{{ stats.totalVisits }}</span></p>
        <p>
          <a href="#">隐私政策</a> | 
          <a href="#">使用条款</a> | 
          <a href="#">RSS订阅</a> |
          <a href="#">网站地图</a>
        </p>
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
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { hasArticleDetail } from '../utils/helpers.js'

export default {
  name: 'App',
  setup() {
    const router = useRouter()
    const activeSection = ref('articles')
    const activeTab = ref('latest')
    const showContact = ref(false)
    const selectedArticle = ref(null)
    const currentTime = ref('')
    const currentDate = ref('')
    
    const stats = reactive({
      todayVisits: 156,
      totalVisits: 12580,
      articleCount: 48,
      lastUpdate: '2025-7-17'
    })

    const articles = reactive([
      {
        id: 1,
        status: '',
        title: 'Vue 3 组合式API详解与实践',
        author: '霍玮放',
        readCount: 1205,
        date: '07-16',
        tab: 'latest'
      },
      {
        id: 2,
        status: '',
        title: 'JavaScript异步编程完全指南',
        author: '霍玮放',
        readCount: 856,
        date: '07-15',
        tab: 'popular'
      },
      {
        id: 3,
        status: '',
        title: 'CSS Grid布局从入门到精通',
        author: '霍玮放',
        readCount: 642,
        date: '07-14',
        tab: 'featured'
      },
      {
        id: 4,
        status: '',
        title: 'React Hooks最佳实践总结',
        author: '霍玮放',
        readCount: 789,
        date: '07-13',
        tab: 'latest'
      },
      {
        id: 5,
        status: '',
        title: '前端性能优化技巧汇总',
        author: '霍玮放',
        readCount: 923,
        date: '07-12',
        tab: 'popular'
      },
      {
        id: 6,
        status: '',
        title: 'TypeScript进阶使用技巧',
        author: '霍玮放',
        readCount: 567,
        date: '07-11',
        tab: 'featured'
      },
      {
        id: 7,
        status: '',
        title: 'Webpack配置优化实战',
        author: '霍玮放',
        readCount: 435,
        date: '07-10',
        tab: 'latest'
      },
      {
        id: 8,
        status: '',
        title: 'Node.js微服务架构设计',
        author: '霍玮放',
        readCount: 678,
        date: '07-09',
        tab: 'popular'
      },
      {
        id: 9,
        status: '',
        title: '前端工程化最佳实践',
        author: '霍玮放',
        readCount: 812,
        date: '07-08',
        tab: 'featured'
      },
      {
        id: 10,
        status: '',
        title: '算法与数据结构学习笔记',
        author: '霍玮放',
        readCount: 345,
        date: '07-07',
        tab: 'archived'
      }
    ])

    const getSectionTitle = () => {
      const titles = {
        articles: '技术文章',
        projects: '项目展示',
        notes: '学习笔记',
        resources: '资源分享',
        life: '生活随笔',
        about: '关于我',
        archive: '文章归档',
        help: '帮助说明'
      }
      return titles[activeSection.value] || '技术文章'
    }

    const getArticlesByTab = () => {
      return articles.filter(article => article.tab === activeTab.value)
    }

    const getArticlesByCategory = (category) => {
      const categoryMap = {
        'latest': 'latest',
        'popular': 'popular', 
        'featured': 'featured',
        'archived': 'archived'
      }
      return articles.filter(article => article.tab === categoryMap[category]).slice(0, 6)
    }

    const selectArticle = (article) => {
      selectedArticle.value = article
      console.log('点击文章:', article.title)
      
      // 根据文章ID确定分类和跳转路径
      let category = 'tech' // 默认技术文章
      let articleId = article.id
      
      // 根据文章ID判断分类
      if (article.id <= 10) {
        // ID 1-10 为技术文章
        category = 'tech'
      } else if (article.id <= 20) {
        // ID 11-20 为项目分享
        category = 'projects' 
        articleId = article.id - 10 // 项目文章从1开始编号
      } else if (article.id <= 30) {
        // ID 21-30 为生活杂想
        category = 'life'
        articleId = article.id - 20 // 生活文章从1开始编号
      }
      
      // 检查是否有对应的详情页面
      const hasDetail = hasArticleDetail(category, articleId)
      
      if (hasDetail) {
        const routePath = `/article/${category}/${articleId}`
        console.log('跳转到详情页:', routePath)
        router.push(routePath)
      } else {
        console.log('文章暂无详情页，点击无效')
        // 无详情页的文章点击无反应
      }
    }

    // 时间更新函数
    const updateTime = () => {
      const now = new Date()
      currentTime.value = now.toLocaleTimeString('zh-CN', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      })
      currentDate.value = now.toLocaleDateString('zh-CN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      })
    }

    const goToTechArticles = () => {
      console.log('跳转到技术文章页面')
      router.push('/tech')
    }

    const goToProjects = () => {
      console.log('跳转到项目分享页面')
      router.push('/projects')
    }

    const goToLife = () => {
      console.log('跳转到生活杂想页面')
      router.push('/life')
    }

    const goToAbout = () => {
      console.log('跳转到关于我页面')
      router.push('/about')
    }

    const goToWishes = () => {
      console.log('跳转到我的愿望页面')
      router.push('/wishes')
    }

    onMounted(() => {
      console.log('个人博客应用已启动')
      // 立即更新一次时间
      updateTime()
      // 每分钟更新一次时间
      setInterval(updateTime, 60000)
    })

    return {
      activeSection,
      activeTab,
      showContact,
      selectedArticle,
      currentTime,
      currentDate,
      stats,
      articles,
      getSectionTitle,
      getArticlesByTab,
      getArticlesByCategory,
      selectArticle,
      goToTechArticles,
      goToProjects,
      goToLife,
      goToAbout,
      goToWishes,
      hasArticleDetail
    }
  }
}
</script>

<style>
/* 组件特定样式 */
/* 全局字体设置 */
* {
  font-family: 'WenQuanYi Bitmap Song', sans-serif;
}

/* Emoji 专用样式 */
.category-icon-flat,
.search-btn-compact,
.emoji {
  font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif;
  font-size: 18px;
  display: inline-block;
  line-height: 1;
}

/* 确保按钮文字使用指定字体 */
button, .category-item-flat span, .article-title-compact {
  font-family: 'WenQuanYi Bitmap Song', sans-serif;
}

/* 修复类别图标显示 */
.category-icon-flat {
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
  vertical-align: middle;
}

/* 搜索按钮样式 */
.search-btn-compact {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: #f5f5f5;
  cursor: pointer;
  border-radius: 4px;
}

.search-btn-compact:hover {
  background: #e5e5e5;
}

/* 无详情页文章样式 */
.article-title-compact.no-detail {
  color: #999 !important;
  cursor: default !important;
  text-decoration: none !important;
  pointer-events: none;
}

.article-title-compact.no-detail:hover {
  color: #999 !important;
  text-decoration: none !important;
}

/* 时间显示样式 */
.time-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  min-width: 100px;
}

.current-time {
  font-size: 18px;
  font-weight: bold;
  font-family: 'WenQuanYi Bitmap Song', 'Courier New', monospace;
  margin-bottom: 2px;
}

.current-date {
  font-size: 14px;
  font-weight: 500;
  opacity: 0.9;
}

/* 个人介绍卡片样式 */
.profile-intro {
  text-align: center;
  padding: 8px 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.profile-avatar {
  font-size: 40px;
  margin-bottom: 12px;
  line-height: 1;
}

.profile-name {
  font-size: 16px;
  color: #1f2937;
  margin: 0 0 4px 0;
  font-weight: bold;
}

.profile-title {
  font-size: 13px;
  color: #3b82f6;
  margin: 0 0 12px 0;
  font-weight: 500;
}

.profile-desc {
  font-size: 12px;
  color: #4b5563;
  line-height: 1.4;
  margin: 0 0 12px 0;
  text-align: left;
  flex: 1;
}

.profile-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
  margin-bottom: 12px;
}

.skill-tag {
  background: #e0f2fe;
  color: #0369a1;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 500;
  border: 1px solid #bae6fd;
}

.profile-contact {
  text-align: left;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
  font-size: 11px;
}

.contact-icon {
  font-size: 12px;
  width: 16px;
  text-align: center;
}

.contact-info {
  color: #4b5563;
  font-weight: 500;
}

.contact-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.contact-link:hover {
  color: #2563eb;
  text-decoration: underline;
}
</style>

