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
          <!-- 左侧标语 -->
          <div class="site-slogan">
            分享收获、感悟生活、共同成长！
          </div>
          
          <!-- 中间和右侧区域 -->
          <div class="buttons-search-area">
            <!-- 按钮组 -->
            <div class="category-buttons-center">
              <div class="category-item-flat" @click="activeSection = 'tech'">
                <div class="category-icon-flat">💻</div>
                <span>技术随笔</span>
              </div>
              <div class="category-item-flat" @click="activeSection = 'projects'">
                <div class="category-icon-flat">🚀</div>
                <span>项目分享</span>
              </div>
              <div class="category-item-flat" @click="activeSection = 'life'">
                <div class="category-icon-flat">🌱</div>
                <span>生活杂想</span>
              </div>
              <div class="category-item-flat" @click="activeSection = 'about'">
                <div class="category-icon-flat">👤</div>
                <span>关于我</span>
              </div>
              <div class="category-item-flat" @click="activeSection = 'wishes'">
                <div class="category-icon-flat">⭐</div>
                <span>我的愿望</span>
              </div>
            </div>
            
            <!-- 右侧搜索栏 -->
            <div class="search-section-compact">
              <input type="text" placeholder="搜索文章..." class="search-input-compact">
              <select class="search-select-compact">
                <option>全部</option>
                <option>技术</option>
                <option>生活</option>
              </select>
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
              <div class="column-header">我的推荐</div>
              <div class="column-content">
                <div 
                  v-for="article in getArticlesByCategory('featured')" 
                  :key="'featured-' + article.id" 
                  class="article-item-compact"
                >
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
              <div class="column-header">GitHub数据统计</div>
              <div class="column-content">
                <div 
                  v-for="article in getArticlesByCategory('archived')" 
                  :key="'archived-' + article.id" 
                  class="article-item-compact"
                >
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
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
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
</style>

