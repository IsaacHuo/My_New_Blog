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
          <span class="breadcrumb-current">生活杂想</span>
        </div>
      </div>
    </section>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 文章列表区域 -->
      <div class="articles-container">
        <!-- 分类标题 -->
        <header class="category-header">
          <h1 class="category-title">🌱 生活杂想</h1>
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
                  <span class="article-mood">{{ article.mood }}</span>
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
                <span class="category-icon">🌱</span>
                <span class="category-name">生活杂想</span>
                <span class="category-count">({{ lifeArticles.length }})</span>
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
          <div class="sidebar-header">心情标签</div>
          <div class="sidebar-content">
            <div class="tag-cloud">
              <span v-for="mood in moodTags" :key="mood.name" class="popular-tag mood-tag" :style="{ fontSize: mood.size + 'px' }">
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
        mood: '😊 愉快',
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
        mood: '☕ 思考',
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
        mood: '🌙 专注',
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
        mood: '🚗 兴奋',
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
        mood: '📚 学习',
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
        mood: '🌾 放松',
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
        mood: '👨‍🍳 创造',
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
        mood: '🎵 感性',
        readCount: 445,
        likes: 37,
        tags: ['音乐', '代码艺术', '情感表达']
      }
    ])

    const moodTags = reactive([
      { name: '😊 愉快', size: 14 },
      { name: '☕ 思考', size: 13 },
      { name: '🌙 专注', size: 15 },
      { name: '🚗 兴奋', size: 12 },
      { name: '📚 学习', size: 13 },
      { name: '🌾 放松', size: 11 },
      { name: '👨‍🍳 创造', size: 12 },
      { name: '🎵 感性', size: 14 }
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

    const totalPages = computed(() => {
      return Math.ceil(lifeArticles.length / articlesPerPage)
    })

    const goHome = () => {
      router.push('/')
    }

    const goToArticle = (article) => {
      router.push(`/article/${article.id}`)
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
      nextPage
    }
  }
}
</script>

<style scoped>
@import './style.css';

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
}

.mood-tag {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #d97706;
  border: 1px solid #fbbf24;
}

.mood-tag:hover {
  background: #d97706;
  color: white;
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
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: bold;
  white-space: nowrap;
}

.milestone-content {
  color: #4b5563;
  font-size: 12px;
  line-height: 1.4;
  flex: 1;
}
</style>
