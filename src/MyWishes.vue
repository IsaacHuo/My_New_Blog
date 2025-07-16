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
          <span class="breadcrumb-current">我的愿望</span>
        </div>
      </div>
    </section>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 愿望内容区域 -->
      <div class="articles-container">
        <!-- 页面标题 -->
        <header class="category-header">
          <h1 class="category-title">🌟 我的愿望</h1>
          <div class="category-stats">
            <span class="wish-count">共 {{ wishes.length }} 个愿望</span>
            <span class="last-update">最后更新：{{ lastUpdate }}</span>
          </div>
        </header>

        <!-- 愿望卡片列表 -->
        <div class="wishes-container">
          <div v-for="wish in wishes" :key="wish.id" class="wish-card" :class="wish.status">
            <div class="wish-header">
              <div class="wish-category">{{ wish.category }}</div>
              <div class="wish-status-badge" :class="wish.status">
                {{ getStatusText(wish.status) }}
              </div>
            </div>
            <div class="wish-content">
              <h3 class="wish-title">{{ wish.title }}</h3>
              <p class="wish-description">{{ wish.description }}</p>
              <div class="wish-progress" v-if="wish.progress">
                <div class="progress-label">完成进度</div>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: wish.progress + '%' }"></div>
                </div>
                <div class="progress-text">{{ wish.progress }}%</div>
              </div>
              <div class="wish-timeline" v-if="wish.timeline">
                <div class="timeline-label">预期时间</div>
                <div class="timeline-value">{{ wish.timeline }}</div>
              </div>
            </div>
            <div class="wish-footer">
              <div class="wish-tags">
                <span v-for="tag in wish.tags" :key="tag" class="wish-tag">{{ tag }}</span>
              </div>
              <div class="wish-date">添加于 {{ wish.createdAt }}</div>
            </div>
          </div>
        </div>

        <!-- 愿望统计 -->
        <div class="wishes-stats">
          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-info">
              <div class="stat-number">{{ completedCount }}</div>
              <div class="stat-label">已完成</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🔄</div>
            <div class="stat-info">
              <div class="stat-number">{{ inProgressCount }}</div>
              <div class="stat-label">进行中</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⭐</div>
            <div class="stat-info">
              <div class="stat-number">{{ plannedCount }}</div>
              <div class="stat-label">计划中</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🌈</div>
            <div class="stat-info">
              <div class="stat-number">{{ dreamCount }}</div>
              <div class="stat-label">梦想</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 侧边栏 -->
      <aside class="sidebar">
        <div class="sidebar-section">
          <div class="sidebar-header">愿望分类</div>
          <div class="sidebar-content">
            <ul class="category-menu">
              <li v-for="category in wishCategories" :key="category.name" class="category-item">
                <span class="category-icon">{{ category.icon }}</span>
                <span class="category-name">{{ category.name }}</span>
                <span class="category-count">({{ category.count }})</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-header">愿望清单</div>
          <div class="sidebar-content">
            <div class="wishlist-summary">
              <p class="summary-text">
                每个人都应该有梦想，有目标，有希望。这里记录了我的愿望清单，包括技术成长、生活体验、个人发展等各个方面。
              </p>
              <p class="summary-text">
                有些已经实现，有些正在努力，有些还在计划中。愿望的意义不在于全部实现，而在于给生活一个方向。
              </p>
            </div>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-header">激励语录</div>
          <div class="sidebar-content">
            <div class="quote-card">
              <p class="quote-text">"{{ currentQuote.text }}"</p>
              <p class="quote-author">— {{ currentQuote.author }}</p>
            </div>
            <button @click="changeQuote" class="quote-btn">换一句</button>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-header">愿望标签</div>
          <div class="sidebar-content">
            <div class="tag-cloud">
              <span v-for="tag in wishTags" :key="tag.name" class="popular-tag wish-cloud-tag" :style="{ fontSize: tag.size + 'px' }">
                {{ tag.name }}
              </span>
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
  name: 'MyWishes',
  setup() {
    const router = useRouter()
    const showContact = ref(false)
    const lastUpdate = ref('2025年7月17日')

    const wishes = reactive([
      {
        id: 1,
        title: '成为全栈开发专家',
        description: '深入掌握前后端技术栈，能够独立完成复杂的全栈项目开发，成为技术领域的专家。',
        category: '技术成长',
        status: 'in-progress',
        progress: 65,
        timeline: '2025年底',
        tags: ['技术', '全栈', '专业能力'],
        createdAt: '2024-01-15'
      },
      {
        id: 2,
        title: '开发一个成功的开源项目',
        description: '创建一个对开发者有价值的开源项目，获得1000+ GitHub Stars，为开源社区做贡献。',
        category: '技术目标',
        status: 'in-progress',
        progress: 30,
        timeline: '2026年中',
        tags: ['开源', 'GitHub', '社区贡献'],
        createdAt: '2024-02-20'
      },
      {
        id: 3,
        title: '写一本技术书籍',
        description: '将自己的技术经验和心得整理成书，帮助更多的开发者学习和成长。',
        category: '知识分享',
        status: 'planned',
        timeline: '2027年',
        tags: ['写作', '技术分享', '知识传播'],
        createdAt: '2024-03-10'
      },
      {
        id: 4,
        title: '环游世界',
        description: '到世界各地旅行，体验不同的文化，开阔眼界，丰富人生阅历。重点想去日本、欧洲、新西兰。',
        category: '生活体验',
        status: 'dream',
        timeline: '人生规划',
        tags: ['旅行', '文化', '体验'],
        createdAt: '2024-01-01'
      },
      {
        id: 5,
        title: '学会一门新的编程语言',
        description: '深入学习 Rust 或 Go 语言，拓展技术栈，提升编程能力。',
        category: '技能提升',
        status: 'completed',
        progress: 100,
        timeline: '已完成',
        tags: ['编程语言', 'Rust', '技能'],
        createdAt: '2023-08-15'
      },
      {
        id: 6,
        title: '拥有自己的房子',
        description: '在心仪的城市买一套属于自己的房子，有一个温馨的家，安定下来。',
        category: '生活目标',
        status: 'planned',
        timeline: '未来5年',
        tags: ['房子', '安家', '生活'],
        createdAt: '2024-04-01'
      },
      {
        id: 7,
        title: '建立技术博客品牌',
        description: '通过持续输出高质量的技术文章，建立个人技术品牌，成为技术KOL。',
        category: '个人品牌',
        status: 'in-progress',
        progress: 45,
        timeline: '2025年',
        tags: ['博客', '品牌', '影响力'],
        createdAt: '2024-05-10'
      },
      {
        id: 8,
        title: '学会做一手好菜',
        description: '掌握各种菜系的烹饪技巧，能够为家人朋友做出美味的饭菜，享受烹饪的乐趣。',
        category: '生活技能',
        status: 'in-progress',
        progress: 25,
        timeline: '持续进行',
        tags: ['烹饪', '生活技能', '美食'],
        createdAt: '2024-06-01'
      },
      {
        id: 9,
        title: '参与大型技术会议演讲',
        description: '在知名的技术大会上分享自己的技术见解和项目经验，影响更多的开发者。',
        category: '职业发展',
        status: 'dream',
        timeline: '未来几年',
        tags: ['演讲', '技术大会', '分享'],
        createdAt: '2024-07-01'
      },
      {
        id: 10,
        title: '养成规律运动的习惯',
        description: '每周坚持运动3-4次，保持健康的身体状态，提升生活质量。',
        category: '健康生活',
        status: 'completed',
        progress: 100,
        timeline: '已养成',
        tags: ['运动', '健康', '习惯'],
        createdAt: '2023-12-01'
      }
    ])

    const quotes = reactive([
      { text: '梦想不会逃跑，会逃跑的永远都是自己', author: '村上春树' },
      { text: '未来属于那些相信梦想之美的人', author: '埃莉诺·罗斯福' },
      { text: '你的唯一限制是你的想象力', author: '匿名' },
      { text: '成功的秘诀就是每天都进步一点点', author: '匿名' },
      { text: '不要等待机会，而要创造机会', author: 'George Bernard Shaw' },
      { text: '今天的努力是为了明天的收获', author: '匿名' }
    ])

    const currentQuote = ref(quotes[0])

    const wishCategories = reactive([
      { name: '技术成长', icon: '💻', count: 3 },
      { name: '生活体验', icon: '🌍', count: 2 },
      { name: '职业发展', icon: '🚀', count: 2 },
      { name: '生活技能', icon: '🎯', count: 2 },
      { name: '健康生活', icon: '💪', count: 1 }
    ])

    const wishTags = reactive([
      { name: '技术', size: 16 },
      { name: '生活', size: 15 },
      { name: '成长', size: 14 },
      { name: '梦想', size: 13 },
      { name: '学习', size: 12 },
      { name: '分享', size: 11 },
      { name: '健康', size: 13 },
      { name: '旅行', size: 12 }
    ])

    const completedCount = computed(() => {
      return wishes.filter(w => w.status === 'completed').length
    })

    const inProgressCount = computed(() => {
      return wishes.filter(w => w.status === 'in-progress').length
    })

    const plannedCount = computed(() => {
      return wishes.filter(w => w.status === 'planned').length
    })

    const dreamCount = computed(() => {
      return wishes.filter(w => w.status === 'dream').length
    })

    const getStatusText = (status) => {
      const statusMap = {
        'completed': '已完成',
        'in-progress': '进行中',
        'planned': '计划中',
        'dream': '梦想'
      }
      return statusMap[status] || status
    }

    const changeQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length)
      currentQuote.value = quotes[randomIndex]
    }

    const goHome = () => {
      router.push('/')
    }

    onMounted(() => {
      console.log('我的愿望页面已加载')
      // 随机显示一句名言
      changeQuote()
    })

    return {
      showContact,
      lastUpdate,
      wishes,
      currentQuote,
      wishCategories,
      wishTags,
      completedCount,
      inProgressCount,
      plannedCount,
      dreamCount,
      getStatusText,
      changeQuote,
      goHome
    }
  }
}
</script>

<style scoped>
@import './style.css';

/* 我的愿望页面特定样式 */
.wishes-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.wish-card {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.08);
}

.wish-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.15);
}

.wish-card.completed {
  border-left: 6px solid #10b981;
  background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
}

.wish-card.in-progress {
  border-left: 6px solid #f59e0b;
  background: linear-gradient(135deg, #ffffff 0%, #fffbeb 100%);
}

.wish-card.planned {
  border-left: 6px solid #3b82f6;
  background: linear-gradient(135deg, #ffffff 0%, #eff6ff 100%);
}

.wish-card.dream {
  border-left: 6px solid #8b5cf6;
  background: linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%);
}

.wish-header {
  background: #f8fafc;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
}

.wish-category {
  color: #6b7280;
  font-size: 13px;
  font-weight: 600;
}

.wish-status-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
}

.wish-status-badge.completed {
  background: #d1fae5;
  color: #065f46;
}

.wish-status-badge.in-progress {
  background: #fef3c7;
  color: #92400e;
}

.wish-status-badge.planned {
  background: #dbeafe;
  color: #1e40af;
}

.wish-status-badge.dream {
  background: #e9d5ff;
  color: #6b21a8;
}

.wish-content {
  padding: 20px;
}

.wish-title {
  color: #1f2937;
  font-size: 18px;
  margin: 0 0 10px 0;
  line-height: 1.4;
}

.wish-description {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 15px;
  font-size: 14px;
}

.wish-progress {
  margin-bottom: 15px;
}

.progress-label {
  color: #6b7280;
  font-size: 12px;
  margin-bottom: 5px;
}

.progress-bar {
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 5px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(to right, #10b981 0%, #34d399 100%);
  transition: width 0.8s ease;
}

.progress-text {
  color: #10b981;
  font-size: 12px;
  font-weight: 600;
  text-align: right;
}

.wish-timeline {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.timeline-label {
  color: #6b7280;
  font-size: 12px;
}

.timeline-value {
  color: #3b82f6;
  font-size: 13px;
  font-weight: 600;
}

.wish-footer {
  padding: 15px 20px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
}

.wish-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}

.wish-tag {
  background: #f1f5f9;
  color: #3b82f6;
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 11px;
  border: 1px solid #e2e8f0;
}

.wish-date {
  color: #6b7280;
  font-size: 11px;
  text-align: right;
}

/* 愿望统计 */
.wishes-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.stat-card {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.08);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.15);
}

.stat-icon {
  font-size: 30px;
  margin-bottom: 10px;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 5px;
}

.stat-label {
  color: #6b7280;
  font-size: 13px;
}

/* 侧边栏样式 */
.wishlist-summary {
  line-height: 1.6;
}

.summary-text {
  color: #4b5563;
  font-size: 13px;
  margin-bottom: 12px;
}

.quote-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  border-left: 4px solid #3b82f6;
}

.quote-text {
  color: #1f2937;
  font-style: italic;
  line-height: 1.5;
  margin-bottom: 10px;
  font-size: 13px;
}

.quote-author {
  color: #6b7280;
  font-size: 12px;
  text-align: right;
  margin: 0;
}

.quote-btn {
  background: linear-gradient(to bottom, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: 1px solid #1d4ed8;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
  width: 100%;
}

.quote-btn:hover {
  background: linear-gradient(to bottom, #60a5fa 0%, #3b82f6 100%);
  transform: translateY(-1px);
}

.wish-cloud-tag {
  background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
  color: #8b5cf6;
  border: 1px solid #c4b5fd;
}

.wish-cloud-tag:hover {
  background: #8b5cf6;
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .wishes-container {
    grid-template-columns: 1fr;
  }
  
  .wishes-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .wish-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
