<template>
  <div class="container">
    <!-- 顶部导航 -->
    <header class="top-nav">
      <div class="nav-content">
        <div class="logo">
          霍玮放的博客
        </div>
        <nav class="nav-links">
          <a href="#" @click="activeSection = 'articles'" :class="{ active: activeSection === 'articles' }">文章</a>
          <a href="#" @click="activeSection = 'projects'" :class="{ active: activeSection === 'projects' }">项目</a>
          <a href="#" @click="activeSection = 'notes'" :class="{ active: activeSection === 'notes' }">笔记</a>
          <a href="#" @click="activeSection = 'resources'" :class="{ active: activeSection === 'resources' }">资源</a>
          <a href="#" @click="activeSection = 'life'" :class="{ active: activeSection === 'life' }">生活</a>
          <a href="#" @click="activeSection = 'about'" :class="{ active: activeSection === 'about' }">关于</a>
          <a href="#" @click="activeSection = 'archive'" :class="{ active: activeSection === 'archive' }">归档</a>
          <a href="#" @click="activeSection = 'help'" :class="{ active: activeSection === 'help' }">帮助</a>
        </nav>
        <div class="user-actions">
          <button @click="showContact = true" class="contact-btn">联系我</button>
          <button class="nav-toggle">快捷导航 ▼</button>
        </div>
      </div>
    </header>

    <!-- 分类导航横幅 -->
    <section class="category-banner">
      <div class="banner-content">
        <div class="category-icons">
          <div class="category-item" @click="activeSection = 'tech'">
            <div class="category-icon">💻</div>
            <span>技术文章</span>
          </div>
          <div class="category-item" @click="activeSection = 'frontend'">
            <div class="category-icon">🎨</div>
            <span>前端开发</span>
          </div>
          <div class="category-item" @click="activeSection = 'backend'">
            <div class="category-icon">⚙️</div>
            <span>后端技术</span>
          </div>
          <div class="category-item" @click="activeSection = 'algorithm'">
            <div class="category-icon">🧮</div>
            <span>算法题解</span>
          </div>
          <div class="category-item" @click="activeSection = 'tools'">
            <div class="category-icon">🔧</div>
            <span>开发工具</span>
          </div>
          <div class="category-item" @click="activeSection = 'tutorials'">
            <div class="category-icon">📚</div>
            <span>教程分享</span>
          </div>
          <div class="category-item" @click="activeSection = 'projects'">
            <div class="category-icon">🚀</div>
            <span>项目展示</span>
          </div>
          <div class="category-item" @click="activeSection = 'thoughts'">
            <div class="category-icon">💭</div>
            <span>技术思考</span>
          </div>
          <div class="category-item" @click="activeSection = 'books'">
            <div class="category-icon">📖</div>
            <span>读书笔记</span>
          </div>
          <div class="category-item" @click="activeSection = 'archives'">
            <div class="category-icon">📂</div>
            <span>文章归档</span>
          </div>
          <div class="category-item" @click="activeSection = 'about-me'">
            <div class="category-icon">👤</div>
            <span>关于我</span>
          </div>
        </div>
        
        <div class="second-row">
          <div class="category-item" @click="activeSection = 'life'">
            <div class="category-icon">🌱</div>
            <span>生活随笔</span>
          </div>
          <div class="category-item" @click="activeSection = 'travel'">
            <div class="category-icon">✈️</div>
            <span>旅行记录</span>
          </div>
          <div class="category-item" @click="activeSection = 'photography'">
            <div class="category-icon">📸</div>
            <span>摄影作品</span>
          </div>
          <div class="category-item" @click="activeSection = 'music'">
            <div class="category-icon">🎵</div>
            <span>音乐分享</span>
          </div>
          <div class="category-item" @click="activeSection = 'movies'">
            <div class="category-icon">🎬</div>
            <span>影视评论</span>
          </div>
          <div class="category-item" @click="activeSection = 'links'">
            <div class="category-icon">🔗</div>
            <span>友情链接</span>
          </div>
          <div class="category-item" @click="activeSection = 'timeline'">
            <div class="category-icon">⏰</div>
            <span>时间轴</span>
          </div>
          <div class="category-item" @click="activeSection = 'guestbook'">
            <div class="category-icon">💬</div>
            <span>留言板</span>
          </div>
          <div class="category-item" @click="activeSection = 'rss'">
            <div class="category-icon">📡</div>
            <span>RSS订阅</span>
          </div>
        </div>
        
        <div class="search-section">
          <input type="text" placeholder="搜索文章内容..." class="search-input">
          <select class="search-select">
            <option>全部</option>
            <option>技术</option>
            <option>生活</option>
          </select>
          <button class="search-btn">🔍</button>
          <div class="hot-tags">
            热搜: 
            <a href="#">Vue</a>
            <a href="#">JavaScript</a> 
            <a href="#">React</a>
            <a href="#">Node.js</a>
            <a href="#">前端</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <div class="content-area">
        <div class="breadcrumb">
          <a href="#">🏠</a> > 
          <a href="#">{{ getSectionTitle() }}</a>
        </div>
        
        <div class="stats-bar">
          欢迎来到霍玮放的博客，分享技术心得和生活感悟 (2025-7-17)
        </div>
        
        <div class="site-stats">
          今日访问: <span class="stat-number">{{ stats.todayVisits }}</span> 
          总访问: <span class="stat-number">{{ stats.totalVisits }}</span>
          文章数: <span class="stat-number">{{ stats.articleCount }}</span>
          最新更新: <span class="new-member">{{ stats.lastUpdate }}</span>
          <a href="#" class="latest-reply">最新文章</a>
        </div>

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
                  <div class="article-status">{{ article.status }}</div>
                  <a href="#" @click="selectArticle(article)" class="article-title-compact">{{ article.title }}</a>
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
                  <div class="article-status">{{ article.status }}</div>
                  <a href="#" @click="selectArticle(article)" class="article-title-compact">{{ article.title }}</a>
                  <div class="article-meta-compact">
                    <span class="article-stats">{{ article.readCount }}阅读</span>
                    <span class="article-date">{{ article.date }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 精选推荐栏 -->
            <div class="column-section">
              <div class="column-header">精选推荐</div>
              <div class="column-content">
                <div 
                  v-for="article in getArticlesByCategory('featured')" 
                  :key="'featured-' + article.id" 
                  class="article-item-compact"
                >
                  <div class="article-status">{{ article.status }}</div>
                  <a href="#" @click="selectArticle(article)" class="article-title-compact">{{ article.title }}</a>
                  <div class="article-meta-compact">
                    <span class="article-stats">{{ article.readCount }}阅读</span>
                    <span class="article-date">{{ article.date }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 文章归档栏 -->
            <div class="column-section">
              <div class="column-header">文章归档</div>
              <div class="column-content">
                <div 
                  v-for="article in getArticlesByCategory('archived')" 
                  :key="'archived-' + article.id" 
                  class="article-item-compact"
                >
                  <div class="article-status">{{ article.status }}</div>
                  <a href="#" @click="selectArticle(article)" class="article-title-compact">{{ article.title }}</a>
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

      <!-- 侧边栏 -->
      <aside class="sidebar">
        <div class="sidebar-section">
          <div class="sidebar-header">博客导航</div>
          <div class="sidebar-content">
            <ul class="sidebar-menu">
              <li><a href="#">首页</a></li>
              <li><a href="#">技术文章</a></li>
              <li><a href="#">项目展示</a></li>
              <li><a href="#">学习笔记</a></li>
              <li><a href="#">生活随笔</a></li>
              <li><a href="#">友情链接</a></li>
              <li><a href="#">关于我</a></li>
              <li><a href="#">RSS订阅</a></li>
            </ul>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="ad-banner">
            <h3>技术分享</h3>
            <p>分享前端开发经验<br>探讨技术发展趋势</p>
            <p style="margin-top: 10px; color: #ffd700;">持续更新中</p>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-header">热门标签</div>
          <div class="sidebar-content">
            <ul class="sidebar-menu">
              <li><a href="#">Vue.js</a></li>
              <li><a href="#">JavaScript</a></li>
              <li><a href="#">React</a></li>
              <li><a href="#">Node.js</a></li>
              <li><a href="#">CSS</a></li>
            </ul>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-header">最近更新</div>
          <div class="sidebar-content">
            <p style="font-size: 12px; color: #666; line-height: 1.4;">
              持续分享技术文章和生活感悟
            </p>
          </div>
        </div>
      </aside>
    </main>
    
    <!-- 页脚 -->
    <footer class="site-footer">
      <div class="footer-content">
        <div class="footer-section">
          <h4>关于本站</h4>
          <p>霍玮放的个人博客，专注于前端技术分享与交流</p>
          <p>记录技术成长路径，分享编程心得体会</p>
        </div>
        
        <div class="footer-section">
          <h4>技术栈</h4>
          <ul>
            <li>Vue.js 3</li>
            <li>JavaScript ES6+</li>
            <li>CSS3 & HTML5</li>
            <li>Node.js</li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>联系方式</h4>
          <ul>
            <li>📧 huowf@example.com</li>
            <li>🔗 github.com/huowf</li>
            <li>💬 QQ群: 105653726</li>
            <li>📱 微信: huowf2024</li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>友情链接</h4>
          <ul>
            <li><a href="#">Vue.js 官网</a></li>
            <li><a href="#">MDN Web Docs</a></li>
            <li><a href="#">GitHub</a></li>
            <li><a href="#">掘金</a></li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="footer-info">
          <p>&copy; 2025 霍玮放的博客. All rights reserved.</p>
          <p>本站已运行 <span class="running-time">365</span> 天 | 总访问量 <span class="visit-count">{{ stats.totalVisits }}</span></p>
          <p>
            <a href="#">隐私政策</a> | 
            <a href="#">使用条款</a> | 
            <a href="#">RSS订阅</a> |
            <a href="#">网站地图</a>
          </p>
        </div>
        
        <div class="footer-badges">
          <span class="badge">Vue 3</span>
          <span class="badge">响应式设计</span>
          <span class="badge">开源</span>
        </div>
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
            <h4>加 QQ 群：105653726</h4>
            <div class="qr-code">
              <img src="/QQ 群.png" alt="QQ群二维码" class="qr-image">
            </div>
            <p class="contact-desc">扫描二维码或搜索群号加入技术交流群</p>
            <div style="margin-top: 15px;">
              <p><strong>邮箱:</strong> huowf@example.com</p>
              <p><strong>GitHub:</strong> github.com/huowf</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'

export default {
  name: 'App',
  setup() {
    const activeSection = ref('articles')
    const activeTab = ref('latest')
    const showContact = ref(false)
    const selectedArticle = ref(null)
    
    const stats = reactive({
      todayVisits: 156,
      totalVisits: 12580,
      articleCount: 48,
      lastUpdate: '2025-7-17'
    })

    const articles = reactive([
      {
        id: 1,
        status: '🔥',
        title: 'Vue 3 组合式API详解与实践',
        author: '霍玮放',
        readCount: 1205,
        date: '07-16',
        tab: 'latest'
      },
      {
        id: 2,
        status: '📌',
        title: 'JavaScript异步编程完全指南',
        author: '霍玮放',
        readCount: 856,
        date: '07-15',
        tab: 'popular'
      },
      {
        id: 3,
        status: '✨',
        title: 'CSS Grid布局从入门到精通',
        author: '霍玮放',
        readCount: 642,
        date: '07-14',
        tab: 'featured'
      },
      {
        id: 4,
        status: '🔥',
        title: 'React Hooks最佳实践总结',
        author: '霍玮放',
        readCount: 789,
        date: '07-13',
        tab: 'latest'
      },
      {
        id: 5,
        status: '📚',
        title: '前端性能优化技巧汇总',
        author: '霍玮放',
        readCount: 923,
        date: '07-12',
        tab: 'popular'
      },
      {
        id: 6,
        status: '✨',
        title: 'TypeScript进阶使用技巧',
        author: '霍玮放',
        readCount: 567,
        date: '07-11',
        tab: 'featured'
      },
      {
        id: 7,
        status: '🎯',
        title: 'Webpack配置优化实战',
        author: '霍玮放',
        readCount: 435,
        date: '07-10',
        tab: 'latest'
      },
      {
        id: 8,
        status: '🚀',
        title: 'Node.js微服务架构设计',
        author: '霍玮放',
        readCount: 678,
        date: '07-09',
        tab: 'popular'
      },
      {
        id: 9,
        status: '💡',
        title: '前端工程化最佳实践',
        author: '霍玮放',
        readCount: 812,
        date: '07-08',
        tab: 'featured'
      },
      {
        id: 10,
        status: '📖',
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
      console.log('选中文章:', article.title)
    }

    onMounted(() => {
      console.log('个人博客应用已启动')
    })

    return {
      activeSection,
      activeTab,
      showContact,
      selectedArticle,
      stats,
      articles,
      getSectionTitle,
      getArticlesByTab,
      getArticlesByCategory,
      selectArticle
    }
  }
}
</script>

<style>
/* 组件特定样式 */
</style>
