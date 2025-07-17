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
                <div class="category-icon-flat">
                  <img src="/icons/TechArticle.ico" alt="技术随笔" class="icon-img">
                </div>
                <span>技术随笔</span>
              </div>
              <div class="category-item-flat" @click="goToProjects">
                <div class="category-icon-flat">
                  <img src="/icons/ProjectArticle.ico" alt="项目分享" class="icon-img">
                </div>
                <span>项目分享</span>
              </div>
              <div class="category-item-flat" @click="goToLife">
                <div class="category-icon-flat">
                  <img src="/icons/LifeArticle.ico" alt="生活杂想" class="icon-img">
                </div>
                <span>生活杂想</span>
              </div>
              <div class="category-item-flat" @click="goToAbout">
                <div class="category-icon-flat">
                  <img src="/icons/AboutMe.ico" alt="关于我" class="icon-img">
                </div>
                <span>关于我</span>
              </div>
              <div class="category-item-flat" @click="goToWishes">
                <div class="category-icon-flat">
                  <img src="/icons/MyWishes.ico" alt="我的愿望" class="icon-img">
                </div>
                <span>我的愿望</span>
              </div>
            </div>
            
            <!-- 右侧搜索栏 -->
            <div class="search-section-compact">
              <input 
                ref="searchInput"
                type="text" 
                placeholder="搜索文章... (Ctrl+K)" 
                class="search-input-compact"
                v-model="searchQuery"
                @keyup.enter="performSearch"
                @input="onSearchInput"
              >
              <button class="search-btn-compact" @click="performSearch">
                <span class="search-icon">🔍</span>
              </button>
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
              <div class="profile-avatar">
                <img src="/MyPicture.jpeg" alt="霍玮放" class="profile-picture">
              </div>
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
                    <img src="/github-mark.png" alt="GitHub" class="contact-icon">
                    <a href="https://github.com/IsaacHuo" target="_blank" class="contact-link">GitHub.com/IsaacHuo</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div class="content-area">
        <!-- 搜索结果区域 -->
        <div v-if="showSearchResults" class="search-results-section">
          <div class="search-results-header">
            <h2>搜索结果</h2>
            <div class="search-info">
              <span class="search-query">关键词: "{{ searchQuery }}"</span>
              <span class="search-count">共找到 {{ searchResults.length }} 篇文章</span>
              <button @click="clearSearch" class="clear-search-btn">清除搜索</button>
            </div>
          </div>
          <div class="search-results-list">
            <div v-if="searchResults.length === 0" class="search-empty-state">
              <div class="empty-icon">🔍</div>
              <h3 class="empty-title">未找到相关文章</h3>
              <p class="empty-desc">
                尝试使用不同的关键词搜索，或者
                <button @click="clearSearch" class="link-btn">浏览所有文章</button>
              </p>
            </div>
            
            <div 
              v-for="article in paginatedSearchResults()" 
              :key="'search-' + article.id"
              class="search-result-item"
              @click="selectArticle(article)"
              :class="{ 'no-detail': !checkArticleDetail(article.id) }"
            >
              <div class="result-main">
                <div class="result-status" v-if="article.status">{{ article.status }}</div>
                <h3 class="result-title" v-html="highlightText(article.title, searchQuery)"></h3>
                <p class="result-summary" v-if="article.summary" v-html="highlightText(article.summary, searchQuery)"></p>
                <div class="result-meta">
                  <span class="result-author">作者: {{ article.author }}</span>
                  <span class="result-date">发布: {{ article.date }}</span>
                  <span class="result-category">分类: {{ getArticleCategoryName(article.id) }}</span>
                  <span class="result-stats">{{ article.readCount }} 阅读</span>
                </div>
              </div>
            </div>
            
            <!-- 搜索结果分页 -->
            <div v-if="searchResults.length > searchPageSize && totalSearchPages() > 1" class="search-pagination">
              <button 
                @click="goToSearchPage(searchPage - 1)" 
                :disabled="searchPage === 1"
                class="pagination-btn pagination-prev"
              >
                上一页
              </button>
              
              <div class="pagination-info">
                第 {{ searchPage }} 页 / 共 {{ totalSearchPages() }} 页
              </div>
              
              <button 
                @click="goToSearchPage(searchPage + 1)" 
                :disabled="searchPage === totalSearchPages()"
                class="pagination-btn pagination-next"
              >
                下一页
              </button>
            </div>
          </div>
        </div>

        <!-- 文章列表 - 四栏并排展示 -->
        <div class="topic-list" v-show="!showSearchResults">
          <div class="four-columns-layout">
            <!-- 最新发布栏 -->
            <div class="column-section">
              <div class="column-header">最新发布</div>
              <div class="column-content">
                <div 
                  v-for="article in getArticlesByCategory('latest')" 
                  :key="'latest-' + article.id" 
                  class="article-item-compact"
                  @click="selectArticle(article)"
                  :class="{ 'no-detail': !checkArticleDetail(article.id) }"
                >
                  <div class="article-title-compact">
                    {{ article.title }}
                  </div>
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
                  @click="selectArticle(article)"
                  :class="{ 'no-detail': !checkArticleDetail(article.id) }"
                >
                  <div class="article-title-compact">
                    {{ article.title }}
                  </div>
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
                  @click="selectArticle(article)"
                  :class="{ 'no-detail': !checkArticleDetail(article.id) }"
                >
                  <div class="article-title-compact">
                    {{ article.title }}
                  </div>
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
                  @click="selectArticle(article)"
                  :class="{ 'no-detail': !checkArticleDetail(article.id) }"
                >
                  <div class="article-title-compact">
                    {{ article.title }}
                  </div>
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
import { ref, reactive, onMounted, onUnmounted } from 'vue'
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
    const searchInput = ref(null)
    
    // 搜索相关状态
    const searchQuery = ref('')
    const searchResults = ref([])
    const showSearchResults = ref(false)
    const searchPage = ref(1)
    const searchPageSize = ref(5) // 每页显示5篇文章
    
    const stats = reactive({
      todayVisits: 156,
      totalVisits: 12580,
      articleCount: 48,
      lastUpdate: '2025-7-17'
    })

    const articles = reactive([
      {
        id: 102,
        status: '推荐',
        title: '国内可用的AI聊天镜像站推荐',
        author: '霍玮放',
        readCount: 245,
        date: '07-17',
        tab: 'latest',
        summary: '整理了多个稳定可用的AI聊天服务镜像站，包括ChatGPT、Claude等模型的访问方式，为国内用户提供便捷的AI工具体验。'
      },
      {
        id: 1,
        status: '',
        title: 'Vue 3 组合式API详解与实践',
        author: '霍玮放',
        readCount: 1205,
        date: '07-16',
        tab: 'latest',
        summary: '深入解析Vue 3组合式API的核心概念和实际应用，包括setup函数、响应式系统、生命周期钩子等内容的详细说明。'
      },
      {
        id: 2,
        status: '',
        title: 'JavaScript异步编程完全指南',
        author: '霍玮放',
        readCount: 856,
        date: '07-15',
        tab: 'popular',
        summary: '全面介绍JavaScript异步编程的各种方式，从回调函数到Promise，再到async/await的演进历程和最佳实践。'
      },
      {
        id: 3,
        status: '',
        title: 'CSS Grid布局从入门到精通',
        author: '霍玮放',
        readCount: 642,
        date: '07-14',
        tab: 'featured',
        summary: '系统学习CSS Grid布局系统，掌握现代网页布局技术，通过实例演示Grid的强大功能和实际应用场景。'
      },
      {
        id: 4,
        status: '',
        title: 'React Hooks最佳实践总结',
        author: '霍玮放',
        readCount: 789,
        date: '07-13',
        tab: 'latest',
        summary: '总结React Hooks的使用技巧和最佳实践，包括useState、useEffect、useContext等常用Hook的深度解析。'
      },
      {
        id: 5,
        status: '',
        title: '前端性能优化技巧汇总',
        author: '霍玮放',
        readCount: 923,
        date: '07-12',
        tab: 'popular',
        summary: '整理前端性能优化的各种技巧和策略，从代码层面到网络层面的全方位优化方案，提升用户体验。'
      },
      {
        id: 6,
        status: '',
        title: 'TypeScript进阶使用技巧',
        author: '霍玮放',
        readCount: 567,
        date: '07-11',
        tab: 'featured',
        summary: '探索TypeScript的高级特性和使用技巧，包括泛型、装饰器、模块系统等进阶内容的实战应用。'
      },
      {
        id: 7,
        status: '',
        title: 'Webpack配置优化实战',
        author: '霍玮放',
        readCount: 435,
        date: '07-10',
        tab: 'latest',
        summary: '深入Webpack配置优化的实战技巧，包括构建速度优化、打包体积优化、开发体验提升等多个方面。'
      },
      {
        id: 8,
        status: '',
        title: 'Node.js微服务架构设计',
        author: '霍玮放',
        readCount: 678,
        date: '07-09',
        tab: 'popular',
        summary: '介绍基于Node.js的微服务架构设计原则和实现方案，包括服务拆分、通信机制、部署策略等。'
      },
      {
        id: 9,
        status: '',
        title: '前端工程化最佳实践',
        author: '霍玮放',
        readCount: 812,
        date: '07-08',
        tab: 'featured',
        summary: '分享前端工程化的完整解决方案，包括项目架构、开发规范、构建流程、部署策略等最佳实践。'
      },
      {
        id: 10,
        status: '',
        title: '算法与数据结构学习笔记',
        author: '霍玮放',
        readCount: 345,
        date: '07-07',
        tab: 'archived',
        summary: '整理常用算法和数据结构的学习笔记，包括时间复杂度分析、代码实现和实际应用场景的讲解。'
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

    // 根据文章ID判断分类和文章ID
    const getArticleCategory = (articleId) => {
      if (articleId >= 101 && articleId <= 110) {
        return { category: 'projects', id: articleId - 100 }
      } else if (articleId <= 10) {
        return { category: 'tech', id: articleId }
      } else if (articleId <= 20) {
        return { category: 'projects', id: articleId - 10 }
      } else if (articleId <= 30) {
        return { category: 'life', id: articleId - 20 }
      }
      return { category: 'tech', id: articleId }
    }

    // 检查文章是否有详情页
    const checkArticleDetail = (articleId) => {
      const { category, id } = getArticleCategory(articleId)
      return hasArticleDetail(category, id)
    }

    const selectArticle = (article) => {
      selectedArticle.value = article
      console.log('点击文章:', article.title)
      
      // 使用辅助函数获取正确的分类和文章ID
      const { category, id: articleId } = getArticleCategory(article.id)
      
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
      
      // 添加键盘事件监听
      document.addEventListener('keydown', handleKeydown)
    })
    
    // 组件卸载时移除事件监听
    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeydown)
    })

    // 搜索相关方法
    const performSearch = () => {
      if (!searchQuery.value.trim()) {
        clearSearch()
        return
      }
      
      const query = searchQuery.value.toLowerCase().trim()
      console.log('执行搜索:', query)
      
      // 搜索逻辑：在标题、作者和摘要中查找关键词
      const results = articles.filter(article => {
        const titleMatch = article.title.toLowerCase().includes(query)
        const authorMatch = article.author.toLowerCase().includes(query)
        const summaryMatch = article.summary ? article.summary.toLowerCase().includes(query) : false
        return titleMatch || authorMatch || summaryMatch
      })
      
      searchResults.value = results
      showSearchResults.value = true
      searchPage.value = 1 // 重置到第一页
      
      console.log(`搜索"${query}"找到${results.length}篇文章`)
    }
    
    const clearSearch = () => {
      searchQuery.value = ''
      searchResults.value = []
      showSearchResults.value = false
      searchPage.value = 1
      console.log('已清除搜索结果')
    }
    
    // 分页相关计算
    const paginatedSearchResults = () => {
      const start = (searchPage.value - 1) * searchPageSize.value
      const end = start + searchPageSize.value
      return searchResults.value.slice(start, end)
    }
    
    const totalSearchPages = () => {
      return Math.ceil(searchResults.value.length / searchPageSize.value)
    }
    
    const goToSearchPage = (page) => {
      if (page >= 1 && page <= totalSearchPages()) {
        searchPage.value = page
      }
    }
    
    // 输入时的实时搜索（可选，避免过于频繁的搜索）
    const onSearchInput = () => {
      if (searchQuery.value.trim() === '') {
        clearSearch()
      }
    }
    
    // 快捷键处理
    const handleKeydown = (event) => {
      // Ctrl+K 聚焦搜索框
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        if (searchInput.value) {
          searchInput.value.focus()
        }
      }
      // Escape 清除搜索
      if (event.key === 'Escape' && showSearchResults.value) {
        clearSearch()
      }
    }
    
    // 高亮显示搜索关键词
    const highlightText = (text, query) => {
      if (!query.trim() || !text) return text
      
      const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
      return text.replace(regex, '<mark class="search-highlight">$1</mark>')
    }
    
    // 获取文章分类显示名称
    const getArticleCategoryName = (articleId) => {
      const { category } = getArticleCategory(articleId)
      const categoryNames = {
        'tech': '技术随笔',
        'projects': '项目分享', 
        'life': '生活杂想'
      }
      return categoryNames[category] || '未分类'
    }

    return {
      activeSection,
      activeTab,
      showContact,
      selectedArticle,
      currentTime,
      currentDate,
      searchInput,
      searchQuery,
      searchResults,
      showSearchResults,
      searchPage,
      searchPageSize,
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
      hasArticleDetail,
      checkArticleDetail,
      getArticleCategory,
      getArticleCategoryName,
      performSearch,
      clearSearch,
      onSearchInput,
      highlightText,
      paginatedSearchResults,
      totalSearchPages,
      goToSearchPage
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

/* 图标和按钮样式 */
.category-icon-flat,
.search-btn-compact {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* 确保按钮文字使用指定字体 */
button, .category-item-flat span, .article-title-compact {
  font-family: 'WenQuanYi Bitmap Song', sans-serif;
}

/* 图标样式 */
.icon-img {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.search-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
}

/* 个人头像样式 */
.profile-picture {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #3b82f6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

/* 搜索输入框改进 */
.search-input-compact {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px 0 0 6px;
  outline: none;
  font-size: 14px;
  width: 200px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  font-family: 'WenQuanYi Bitmap Song', sans-serif;
}

.search-input-compact:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.search-section-compact {
  display: flex;
  align-items: center;
}

/* 搜索按钮样式 */
.search-btn-compact {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-left: none;
  background: #f9fafb;
  cursor: pointer;
  border-radius: 0 6px 6px 0;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.search-btn-compact:hover {
  background: #f3f4f6;
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
  margin-bottom: 12px;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
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

/* 搜索结果区域样式 */
.search-results-section {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  padding: 24px;
  border: 1px solid #e5e7eb;
}

.search-results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f3f4f6;
}

.search-results-header h2 {
  color: #1f2937;
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  font-family: 'WenQuanYi Bitmap Song', sans-serif;
}

.search-info {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
}

.search-query {
  color: #3b82f6;
  font-weight: 600;
  background: #eff6ff;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #bfdbfe;
}

.search-count {
  color: #6b7280;
  font-weight: 500;
}

.clear-search-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'WenQuanYi Bitmap Song', sans-serif;
}

.clear-search-btn:hover {
  background: #dc2626;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
}

.search-results-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.search-result-item {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.search-result-item:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  transform: translateY(-2px);
}

.search-result-item.no-detail {
  cursor: default;
  opacity: 0.6;
}

.search-result-item.no-detail:hover {
  border-color: #e5e7eb;
  box-shadow: none;
  transform: none;
}

.result-main {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.result-status {
  display: inline-block;
  background: #fbbf24;
  color: #92400e;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  width: fit-content;
  border: 1px solid #f59e0b;
}

.result-title {
  color: #1f2937;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
  font-family: 'WenQuanYi Bitmap Song', sans-serif;
}

.search-result-item:hover .result-title {
  color: #3b82f6;
}

.search-result-item.no-detail .result-title {
  color: #9ca3af;
}

.result-summary {
  color: #6b7280;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  font-family: 'WenQuanYi Bitmap Song', sans-serif;
}

.result-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 12px;
  color: #6b7280;
}

.result-author,
.result-date,
.result-category,
.result-stats {
  display: flex;
  align-items: center;
  font-weight: 500;
}

.result-category {
  color: #059669;
  background: #ecfdf5;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid #a7f3d0;
}

.result-stats {
  color: #7c3aed;
  background: #f3e8ff;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid #c4b5fd;
}

/* 搜索关键词高亮样式 */
.search-highlight {
  background: #fef08a;
  color: #a16207;
  padding: 1px 2px;
  border-radius: 2px;
  font-weight: 600;
  border: 1px solid #fde047;
}

/* 搜索空状态样式 */
.search-empty-state {
  text-align: center;
  padding: 48px 24px;
  color: #6b7280;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.6;
}

.empty-title {
  font-size: 18px;
  color: #374151;
  margin: 0 0 8px 0;
  font-weight: 600;
  font-family: 'WenQuanYi Bitmap Song', sans-serif;
}

.empty-desc {
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  font-family: 'WenQuanYi Bitmap Song', sans-serif;
}

.link-btn {
  background: none;
  border: none;
  color: #3b82f6;
  text-decoration: underline;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
  padding: 0;
}

.link-btn:hover {
  color: #2563eb;
}

/* 搜索分页样式 */
.search-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  padding: 16px;
  border-top: 1px solid #e5e7eb;
}

.pagination-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'WenQuanYi Bitmap Song', sans-serif;
}

.pagination-btn:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
}

.pagination-btn:disabled {
  background: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.pagination-info {
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  background: #f9fafb;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  font-family: 'WenQuanYi Bitmap Song', sans-serif;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .search-results-header {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .search-info {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  
  .result-meta {
    flex-direction: column;
    gap: 8px;
  }
}

/* 确保个人介绍标题居中 */
.sidebar-header {
  text-align: center !important;
}
</style>

