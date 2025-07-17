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
          <button class="breadcrumb-btn breadcrumb-current" disabled>生活杂想</button>
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
            <img src="/icons/LifeArticle.ico" alt="生活杂想" class="title-icon"> 生活杂想
          </h1>
          <div class="category-stats">
            <span class="article-count">共 {{ lifeArticles.length }} 篇文章</span>
            <span class="last-update">最后更新：{{ lastUpdate }}</span>
          </div>
        </header>

        <!-- 文章列表 -->
        <div class="articles-list">
          <div 
            v-for="article in lifeArticles" 
            :key="article.id" 
            class="article-card life-card"
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
                  <span class="article-mood">
                    <img :src="article.moodIcon" :alt="article.mood" class="mood-icon">
                    {{ article.mood }}
                  </span>
                </div>
                <div class="meta-right">
                  <span class="article-reads">{{ article.readCount }} 阅读</span>
                  <span class="article-likes">{{ article.likes }} 点赞</span>
                </div>
              </div>
            </div>
            <div class="article-tags">
              <span v-for="tag in article.tags" :key="tag" class="article-tag life-tag">{{ tag }}</span>
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
              <li class="category-item" @click="goToCategory('tech')">
                <span class="category-icon">💻</span>
                <span class="category-name">技术文章</span>
                <span class="category-count">(18)</span>
              </li>
              <li class="category-item" @click="goToCategory('projects')">
                <span class="category-icon">🚀</span>
                <span class="category-name">项目分享</span>
                <span class="category-count">(12)</span>
              </li>
              <li class="category-item active">
                <span class="category-icon">
                  <img src="/icons/LifeArticle.ico" alt="生活" class="sidebar-icon">
                </span>
                <span class="category-name">生活杂想</span>
                <span class="category-count">({{ lifeArticles.length }})</span>
              </li>
              <li class="category-item" @click="goToCategory('about')">
                <span class="category-icon">👤</span>
                <span class="category-name">关于我</span>
                <span class="category-count">(3)</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-header">心情标签</div>
          <div class="sidebar-content">
            <div class="tag-cloud">
              <span v-for="mood in moodTags" :key="mood.name" class="popular-tag mood-tag" :style="{ fontSize: mood.size + 'px' }">
                <img :src="mood.icon" :alt="mood.name" class="mood-tag-icon">
                {{ mood.name }}
              </span>
            </div>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-header">生活足迹</div>
          <div class="sidebar-content">
            <div v-for="milestone in lifeMilestones" :key="milestone.id" class="life-milestone">
              <div class="milestone-date">{{ milestone.date }}</div>
              <div class="milestone-content">{{ milestone.content }}</div>
            </div>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-header">心情日历</div>
          <div class="sidebar-content">
            <div class="mood-calendar">
              <div v-for="day in recentMoods" :key="day.date" class="mood-day">
                <div class="mood-date">{{ day.date }}</div>
                <div class="mood-emoji">
                  <img :src="day.emoji" :alt="day.mood" class="mood-day-icon">
                </div>
                <div class="mood-text">{{ day.mood }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-header">阅读记录</div>
          <div class="sidebar-content">
            <div class="reading-list">
              <div v-for="book in recentBooks" :key="book.id" class="reading-item">
                <div class="book-info">
                  <div class="book-title">{{ book.title }}</div>
                  <div class="book-author">{{ book.author }}</div>
                  <div class="book-progress">
                    <div class="progress-bar-small">
                      <div class="progress-fill-small" :style="{ width: book.progress + '%' }"></div>
                    </div>
                    <span class="progress-text-small">{{ book.progress }}%</span>
                  </div>
                </div>
              </div>
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
  name: 'LifeThoughts',
  setup() {
    const router = useRouter()
    const showContact = ref(false)
    const currentPage = ref(1)
    const articlesPerPage = 10
    const lastUpdate = ref('2025年7月17日')

    const lifeArticles = reactive([
      {
        id: 201,
        status: '置顶',
        title: '从程序员到生活家：寻找代码之外的美好',
        summary: '作为一名程序员，我们总是沉浸在代码的世界里。但生活不只有代码，还有诗和远方。这篇文章分享我在工作之余探索生活的一些感悟。',
        author: '霍玮放',
        date: '2025-07-16',
        mood: '愉快',
        moodIcon: '😊',
        readCount: 867,
        likes: 52,
        tags: ['生活感悟', '工作生活平衡', '个人成长']
      },
      {
        id: 202,
        title: '咖啡馆里的思考：关于远程工作的那些事',
        summary: '在这个咖啡馆安静的角落，我想聊聊远程工作这两年来的体验。有收获，也有挑战，更多的是对未来工作方式的思考。',
        author: '霍玮放',
        date: '2025-07-15',
        mood: '思考',
        moodIcon: '🤔',
        readCount: 634,
        likes: 38,
        tags: ['远程工作', '职场思考', '生活方式']
      },
      {
        id: 203,
        status: '热门',
        title: '夜深人静写代码的那些心境',
        summary: '深夜时分，万籁俱寂，只有键盘敲击声陪伴。这是属于程序员的独特时光，也是我最喜欢的编程时刻。',
        author: '霍玮放',
        date: '2025-07-14',
        mood: '专注',
        moodIcon: '😎',
        readCount: 1024,
        likes: 76,
        tags: ['深夜编程', '心境感悟', '程序员生活']
      },
      {
        id: 204,
        title: '旅行中的代码灵感：在路上思考技术',
        summary: '这次云南之行不仅收获了美景，更意外地找到了解决项目难题的灵感。有时候，最好的解决方案往往来自于暂时的放下。',
        author: '霍玮放',
        date: '2025-07-13',
        mood: '兴奋',
        moodIcon: '🎉',
        readCount: 456,
        likes: 29,
        tags: ['旅行', '技术灵感', '生活体验']
      },
      {
        id: 205,
        title: '读书笔记：《程序员修炼之道》读后感',
        summary: '重读这本经典，依然有很多新的收获。书中的很多观点不仅适用于编程，更是做人做事的智慧。',
        author: '霍玮放',
        date: '2025-07-12',
        mood: '学习',
        moodIcon: '📚',
        readCount: 723,
        likes: 45,
        tags: ['读书笔记', '技术成长', '人生感悟']
      },
      {
        id: 206,
        title: '周末农场体验：与大自然的亲密接触',
        summary: '离开城市的喧嚣，来到郊外的农场。亲手种菜、喂鸡、采摘，体验最原始的生活方式，找回内心的宁静。',
        author: '霍玮放',
        date: '2025-07-11',
        mood: '放松',
        moodIcon: '😌',
        readCount: 392,
        likes: 33,
        tags: ['农场体验', '自然生活', '周末休闲']
      },
      {
        id: 207,
        title: '学做饭的程序员：算法思维在厨房的应用',
        summary: '谁说程序员不会做饭？把写代码的逻辑思维运用到厨房里，竟然意外地做出了不错的菜品。',
        author: '霍玮放',
        date: '2025-07-10',
        mood: '创造',
        moodIcon: '💡',
        readCount: 589,
        likes: 41,
        tags: ['学做饭', '生活技能', '创意料理']
      },
      {
        id: 208,
        title: '雨夜听歌：音乐与代码的奇妙联系',
        summary: '雨夜，一个人，一首歌，一段代码。发现音乐的节奏和代码的逻辑有着奇妙的相似性。',
        author: '霍玮放',
        date: '2025-07-09',
        mood: '感性',
        moodIcon: '💕',
        readCount: 445,
        likes: 37,
        tags: ['音乐', '代码艺术', '情感表达']
      }
    ])

    const moodTags = reactive([
      { name: '愉快', icon: '😊', size: 14 },
      { name: '思考', icon: '🤔', size: 13 },
      { name: '专注', icon: '😎', size: 15 },
      { name: '兴奋', icon: '🎉', size: 12 },
      { name: '学习', icon: '📚', size: 13 },
      { name: '放松', icon: '😌', size: 11 },
      { name: '创造', icon: '💡', size: 12 },
      { name: '感性', icon: '💕', size: 14 }
    ])

    const lifeMilestones = reactive([
      {
        id: 1,
        date: '2025-07',
        content: '开始写博客，记录技术和生活'
      },
      {
        id: 2,
        date: '2025-06',
        content: '学会了做蛋炒饭，终于不用天天外卖'
      },
      {
        id: 3,
        date: '2025-05',
        content: '第一次云南旅行，被美景震撼'
      },
      {
        id: 4,
        date: '2025-04',
        content: '开始远程工作，生活节奏大改变'
      }
    ])

    const recentMoods = reactive([
      { date: '07-17', emoji: '😊', mood: '愉快' },
      { date: '07-16', emoji: '🤔', mood: '思考' },
      { date: '07-15', emoji: '💪', mood: '充实' },
      { date: '07-14', emoji: '😌', mood: '放松' },
      { date: '07-13', emoji: '🎉', mood: '兴奋' },
      { date: '07-12', emoji: '📚', mood: '学习' },
      { date: '07-11', emoji: '🌱', mood: '成长' }
    ])

    const recentBooks = reactive([
      {
        id: 1,
        title: '程序员修炼之道',
        author: 'Andrew Hunt',
        progress: 75
      },
      {
        id: 2,
        title: '人类简史',
        author: '尤瓦尔·赫拉利',
        progress: 45
      },
      {
        id: 3,
        title: '深入理解计算机系统',
        author: 'Randal E. Bryant',
        progress: 30
      }
    ])

    const totalPages = computed(() => {
      return Math.ceil(lifeArticles.length / articlesPerPage)
    })

    const goHome = () => {
      router.push('/')
    }

    const goToArticle = (article) => {
      // 将生活文章 ID 转换为详情页 ID（生活文章 ID 201-210 对应详情页 ID 1-10）
      const articleId = article.id - 200
      
      // 检查是否有详情页
      if (hasArticleDetail('life', articleId)) {
        router.push(`/article/life/${articleId}`)
      } else {
        console.log('文章暂无详情页，点击无效')
        // 无详情页的文章点击无反应
      }
    }

    const goToCategory = (category) => {
      switch(category) {
        case 'tech':
          router.push('/tech')
          break
        case 'projects':
          router.push('/projects')
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
      console.log('生活杂想页面已加载')
    })

    return {
      showContact,
      currentPage,
      lastUpdate,
      lifeArticles,
      moodTags,
      lifeMilestones,
      totalPages,
      goHome,
      goToArticle,
      goToCategory,
      prevPage,
      nextPage,
      recentMoods,
      recentBooks
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
  max-width: 1400px;
  margin: 0 auto;
}

.articles-container {
  flex: 1;
  min-width: 0; /* 防止flex子项溢出 */
}

.sidebar {
  width: 300px;
  flex-shrink: 0;
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
  border-radius: 6px;
  font-size: 12px;
  border: 1px solid #e2e8f0;
  height: 28px;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.article-tag:hover {
  background: #3b82f6;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
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
  height: 36px;
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
  height: 36px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
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
  height: 36px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.category-item.active {
  background: linear-gradient(to right, #60a5fa 0%, #3b82f6 100%);
  color: white;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
}

.category-item:not(.active):hover {
  background: #e2e8f0;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #e2e8f0;
  height: 28px;
  display: inline-flex;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.popular-tag:hover {
  background: #3b82f6;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
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

/* 生活杂想特定样式 */
.life-card {
  background: linear-gradient(135deg, #fefefe 0%, #f8f9fa 100%);
  border-left: 4px solid #10b981;
}

.life-card:hover {
  border-left-color: #059669;
  box-shadow: 0 8px 16px rgba(16, 185, 129, 0.15);
}

.life-tag {
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  color: #10b981;
  border: 1px solid #a7f3d0;
  border-radius: 6px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.life-tag:hover {
  background: #10b981;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
}

.mood-tag {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #d97706;
  border: 1px solid #fbbf24;
  border-radius: 6px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.mood-tag:hover {
  background: #d97706;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(217, 119, 6, 0.2);
}

.article-mood {
  color: #10b981;
  font-weight: 600;
}

.life-milestone {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px dotted #cbd5e1;
}

.life-milestone:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.milestone-date {
  background: #10b981;
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: bold;
  white-space: nowrap;
  height: 28px;
  display: inline-flex;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.milestone-date:hover {
  background: #059669;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
}

.milestone-content {
  color: #4b5563;
  font-size: 12px;
  line-height: 1.4;
  flex: 1;
}

/* 心情日历样式 */
.mood-calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.mood-day {
  text-align: center;
  padding: 8px 4px;
  border-radius: 6px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.mood-day:hover {
  background: #e2e8f0;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.mood-date {
  font-size: 10px;
  color: #6b7280;
  margin-bottom: 4px;
}

.mood-emoji {
  font-size: 16px;
  margin-bottom: 2px;
}

.mood-text {
  font-size: 9px;
  color: #4b5563;
}

/* 阅读记录样式 */
.reading-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.reading-item {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
  transition: all 0.2s ease;
}

.reading-item:hover {
  background: #f1f5f9;
  transform: translateY(-1px);
}

.book-title {
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
  line-height: 1.3;
}

.book-author {
  font-size: 11px;
  color: #6b7280;
  margin-bottom: 8px;
}

.book-progress {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-bar-small {
  flex: 1;
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill-small {
  height: 100%;
  background: linear-gradient(to right, #10b981 0%, #34d399 100%);
  transition: width 0.8s ease;
}

.progress-text-small {
  font-size: 10px;
  font-weight: 600;
  color: #10b981;
  min-width: 30px;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .main-content {
    max-width: 100%;
    padding: 15px;
  }
  
  .sidebar {
    width: 280px;
  }
}

@media (max-width: 968px) {
  .main-content {
    flex-direction: column;
    gap: 15px;
  }
  
  .articles-container {
    width: 100%;
  }
  
  .sidebar {
    width: 100%;
    order: -1; /* 在移动端将侧边栏移到上方 */
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

@media (max-width: 768px) {
  .sidebar {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
  }
  
  .sidebar-section {
    margin-bottom: 0;
  }
}
</style>
