<template>
  <div class="container">
    <!-- 顶部导航 -->
    <header class="top-nav">
      <div class="nav-content">
        <div class="logo-centered">
          霍玮放的博客
        </div>
        <div class="user-actions">
          <button @click="goBack" class="contact-btn">返回首页</button>
          <button @click="showContact = true" class="contact-btn">联系我</button>
        </div>
      </div>
    </header>

    <!-- 文章导航横幅 -->
    <section class="article-banner">
      <div class="banner-content">
        <div class="article-breadcrumb">
          <button @click="goBack" class="breadcrumb-btn">首页</button>
          <span class="breadcrumb-separator">></span>
          <button @click="goToCategory" class="breadcrumb-btn">项目分享</button>
          <span class="breadcrumb-separator">></span>
          <button class="breadcrumb-current-btn">{{ article.title }}</button>
        </div>
      </div>
    </section>

    <!-- 主要内容区域 -->
    <main class="article-main">
      <!-- 文章内容区域 -->
      <div class="article-container">
        <!-- 文章标题区域 -->
        <header class="article-header">
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <div class="meta-left">
              <span class="article-author">作者：{{ article.author }}</span>
              <span class="article-date">发布时间：{{ article.date }}</span>
              <span class="article-category">分类：{{ article.category }}</span>
            </div>
            <div class="meta-right">
              <span class="article-views">阅读量：{{ article.readCount }}</span>
              <span class="article-likes">点赞：{{ article.likes }}</span>
              <span class="project-stars">⭐ {{ article.stars }}</span>
            </div>
          </div>
        </header>

        <!-- 文章正文 -->
        <article class="article-content">
          <div class="content-section">
            <h2>项目简介</h2>
            <p>基于 Vue3 和 Vite 构建的现代化个人博客系统，支持文章管理、分类浏览、评论互动等功能，采用响应式设计，兼容多端设备。这个项目展示了现代前端技术栈的完整应用，是学习Vue3开发的优秀案例。</p>
          </div>

          <div class="content-section">
            <h2>技术栈</h2>
            <div class="tech-stack">
              <div class="tech-item">
                <div class="tech-icon">⚡</div>
                <div class="tech-content">
                  <h4>Vue 3</h4>
                  <p>使用最新的组合式API，享受更好的TypeScript支持和性能优化</p>
                </div>
              </div>
              <div class="tech-item">
                <div class="tech-icon">🚀</div>
                <div class="tech-content">
                  <h4>Vite</h4>
                  <p>极速的开发服务器和构建工具，提供更好的开发体验</p>
                </div>
              </div>
              <div class="tech-item">
                <div class="tech-icon">🎨</div>
                <div class="tech-content">
                  <h4>CSS3</h4>
                  <p>现代CSS特性，支持响应式设计和动画效果</p>
                </div>
              </div>
            </div>
          </div>

          <div class="content-section">
            <h2>核心功能</h2>
            <ul class="feature-list">
              <li>✅ 文章分类管理（技术文章、项目分享、生活杂想等）</li>
              <li>✅ 响应式设计，支持桌面端和移动端</li>
              <li>✅ 评论系统，支持实时互动</li>
              <li>✅ 文章搜索和标签过滤</li>
              <li>✅ 黑暗模式支持</li>
              <li>✅ SEO优化</li>
            </ul>
          </div>

          <div class="content-section">
            <h2>项目结构</h2>
            <div class="code-block">
              <div class="code-header">
                <span class="code-title">目录结构</span>
                <button class="copy-btn">复制</button>
              </div>
              <pre><code><span class="property">src</span>/
├── <span class="property">components</span>/          <span class="comment"># 公共组件</span>
│   ├── <span class="string">TopNavigation.vue</span>
│   ├── <span class="string">SiteFooter.vue</span>
│   └── <span class="string">ContactModal.vue</span>
├── <span class="property">views</span>/              <span class="comment"># 页面组件</span>
│   ├── <span class="string">Home.vue</span>
│   ├── <span class="string">TechArticles.vue</span>
│   ├── <span class="string">ProjectShare.vue</span>
│   ├── <span class="string">LifeThoughts.vue</span>
│   └── <span class="property">articles</span>/       <span class="comment"># 文章详情页</span>
│       ├── <span class="property">tech</span>/
│       ├── <span class="property">projects</span>/
│       └── <span class="property">life</span>/
├── <span class="property">styles</span>/             <span class="comment"># 样式文件</span>
├── <span class="property">utils</span>/              <span class="comment"># 工具函数</span>
└── <span class="string">router.js</span>           <span class="comment"># 路由配置</span></code></pre>
            </div>
          </div>

          <div class="content-section">
            <h2>开发心得</h2>
            <div class="experience-list">
              <div class="experience-item">
                <div class="experience-icon">💡</div>
                <div class="experience-content">
                  <h4>组件化设计</h4>
                  <p>合理拆分组件，提高代码复用性和维护性。每个组件都有单一职责，便于测试和调试。</p>
                </div>
              </div>
              <div class="experience-item">
                <div class="experience-icon">🎯</div>
                <div class="experience-content">
                  <h4>用户体验优化</h4>
                  <p>注重页面加载速度和交互流畅性，使用合适的动画效果提升用户体验。</p>
                </div>
              </div>
              <div class="experience-item">
                <div class="experience-icon">📱</div>
                <div class="experience-content">
                  <h4>响应式布局</h4>
                  <p>采用移动优先的设计策略，确保在各种设备上都有良好的显示效果。</p>
                </div>
              </div>
            </div>
          </div>

          <div class="content-section">
            <h2>总结</h2>
            <p>这个博客项目的开发过程让我学到了很多，也希望能够对其他开发者有所帮助。从技术选型到架构设计，从UI实现到性能优化，每一个环节都是宝贵的学习经验。欢迎大家交流讨论，共同进步。</p>
          </div>
        </article>

        <!-- 文章底部操作 -->
        <footer class="article-footer">
          <div class="article-actions">
            <button class="action-btn like-btn" @click="toggleLike">
              <span class="btn-icon">👍</span>
              <span>{{ article.likes }}</span>
            </button>
            <button class="action-btn share-btn" @click="shareArticle">
              <span class="btn-icon">📤</span>
              <span>分享</span>
            </button>
            <button class="action-btn comment-btn" @click="showComments = !showComments">
              <span class="btn-icon">💬</span>
              <span>评论</span>
            </button>
            <button class="action-btn github-btn" @click="openGithub">
              <span class="btn-icon">🔗</span>
              <span>GitHub</span>
            </button>
          </div>
          
          <div class="article-tags">
            <span class="tag-label">标签：</span>
            <span class="article-tag" v-for="tag in article.tags" :key="tag">{{ tag }}</span>
          </div>
        </footer>

        <!-- 评论区域 -->
        <section v-if="showComments" class="comments-section">
          <div class="comments-header">
            <h3>评论区</h3>
            <span class="comments-count">共 {{ comments.length }} 条评论</span>
          </div>
          
          <div class="comment-form">
            <textarea 
              v-model="newComment" 
              placeholder="写下你的评论..." 
              class="comment-input"
              rows="4"
            ></textarea>
            <button @click="addComment" class="submit-btn">发表评论</button>
          </div>
          
          <div class="comments-list">
            <div v-for="comment in comments" :key="comment.id" class="comment-item">
              <div class="comment-avatar">👤</div>
              <div class="comment-content">
                <div class="comment-header">
                  <span class="comment-author">{{ comment.author }}</span>
                  <span class="comment-date">{{ comment.date }}</span>
                </div>
                <p class="comment-text">{{ comment.content }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- 侧边栏 -->
      <aside class="article-sidebar">
        <div class="sidebar-section">
          <div class="sidebar-header">项目信息</div>
          <div class="sidebar-content">
            <div class="project-info">
              <div class="info-item">
                <span class="info-label">开发时间:</span>
                <span class="info-value">2025年7月</span>
              </div>
              <div class="info-item">
                <span class="info-label">技术栈:</span>
                <span class="info-value">Vue3 + Vite</span>
              </div>
              <div class="info-item">
                <span class="info-label">项目状态:</span>
                <span class="info-value status-active">进行中</span>
              </div>
              <div class="info-item">
                <span class="info-label">开源协议:</span>
                <span class="info-value">MIT</span>
              </div>
            </div>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-header">相关项目</div>
          <div class="sidebar-content">
            <div class="related-article" v-for="related in relatedProjects" :key="related.id">
              <a href="#" class="related-link">{{ related.title }}</a>
              <div class="related-meta">{{ related.tech }}</div>
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
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'ProjectArticle1',
  setup() {
    const router = useRouter()
    const showContact = ref(false)
    const showComments = ref(false)
    const newComment = ref('')
    
    const article = reactive({
      id: 101,
      title: '个人博客系统 - Vue3 + Vite',
      author: '霍玮放',
      readCount: 523,
      likes: 28,
      stars: 23,
      date: '2025年7月16日',
      category: '开源项目',
      tags: ['Vue3', 'Vite', '博客系统', '响应式设计']
    })

    const comments = reactive([
      {
        id: 1,
        author: '开发者小王',
        date: '2025-07-16 10:30',
        content: '项目结构很清晰，代码质量很高，学到了很多！'
      },
      {
        id: 2,
        author: '前端爱好者',
        date: '2025-07-16 14:20',
        content: 'Vue3的组合式API用得很好，响应式设计也很棒。'
      }
    ])

    const relatedProjects = reactive([
      { id: 102, title: '智能代码审查工具', tech: 'AI + VSCode' },
      { id: 103, title: '微信小程序 - 待办清单', tech: '小程序' },
      { id: 104, title: 'React组件库', tech: 'React + TS' }
    ])

    const goBack = () => {
      router.push('/')
    }

    const goToCategory = () => {
      router.push('/projects')
    }

    const toggleLike = () => {
      article.likes++
    }

    const shareArticle = () => {
      navigator.share({
        title: article.title,
        text: '推荐一个好项目',
        url: window.location.href
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href)
        alert('链接已复制到剪贴板')
      })
    }

    const openGithub = () => {
      window.open('https://github.com/IsaacHuo/My_New_Blog', '_blank')
    }

    const addComment = () => {
      if (newComment.value.trim()) {
        comments.push({
          id: comments.length + 1,
          author: '游客',
          date: new Date().toLocaleString('zh-CN'),
          content: newComment.value
        })
        newComment.value = ''
      }
    }

    onMounted(() => {
      article.readCount++
    })

    return {
      showContact,
      showComments,
      newComment,
      article,
      comments,
      relatedProjects,
      goBack,
      goToCategory,
      toggleLike,
      shareArticle,
      openGithub,
      addComment
    }
  }
}
</script>

<style scoped>
@import '../../../styles/style.css';

/* 项目文章特有样式 */
.article-banner {
  background: linear-gradient(to bottom, #60a5fa 0%, #3b82f6 100%);
  padding: 10px 20px;
  border-top: 3px solid #1d4ed8;
  border-bottom: 3px solid #1d4ed8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.article-breadcrumb {
  display: flex;
  align-items: center;
  font-size: 14px;
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

.breadcrumb-separator {
  margin: 0 8px;
  color: #e2e8f0;
  font-weight: bold;
}

.breadcrumb-current-btn {
  background: linear-gradient(to bottom, #ffd700 0%, #f59e0b 100%);
  color: #1d4ed8;
  border: 1px solid #f59e0b;
  padding: 6px 16px;
  border-radius: 6px;
  cursor: default;
  font-weight: bold;
  text-shadow: 0 1px 1px rgba(0,0,0,0.2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  white-space: nowrap;
  font-size: 12px;
  box-shadow: 
    inset 0 1px 0 rgba(255,255,255,0.3),
    0 2px 4px rgba(0,0,0,0.15);
}

.article-main {
  display: flex;
  background: white;
  gap: 20px;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.article-container {
  flex: 1;
  min-width: 0;
}

.article-sidebar {
  width: 300px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.article-header {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.08);
}

.article-title {
  font-size: 28px;
  color: #1f2937;
  margin-bottom: 15px;
  line-height: 1.3;
  font-weight: bold;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #e2e8f0;
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

.project-stars {
  color: #f59e0b !important;
  font-weight: 600;
}

.article-content {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.08);
  overflow: hidden;
}

.content-section {
  padding: 25px;
  border-bottom: 1px solid #f1f5f9;
}

.content-section:last-child {
  border-bottom: none;
}

.content-section h2 {
  color: #1f2937;
  font-size: 22px;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid #3b82f6;
}

.content-section p {
  line-height: 1.7;
  color: #4b5563;
  margin-bottom: 15px;
}

/* 技术栈样式 */
.tech-stack {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.tech-item {
  display: flex;
  align-items: flex-start;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #10b981;
}

.tech-icon {
  font-size: 20px;
  margin-right: 12px;
  flex-shrink: 0;
}

.tech-content h4 {
  color: #1f2937;
  margin-bottom: 5px;
  font-size: 16px;
}

.tech-content p {
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

/* 功能列表样式 */
.feature-list {
  color: #4b5563;
  line-height: 1.8;
  padding-left: 0;
  list-style: none;
}

.feature-list li {
  margin-bottom: 8px;
  padding-left: 0;
}

/* 开发心得样式 */
.experience-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.experience-item {
  display: flex;
  align-items: flex-start;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #f59e0b;
}

.experience-icon {
  font-size: 20px;
  margin-right: 12px;
  flex-shrink: 0;
}

.experience-content h4 {
  color: #1f2937;
  margin-bottom: 5px;
  font-size: 16px;
}

.experience-content p {
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

/* 文章底部操作 */
.article-footer {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.08);
}

.article-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: linear-gradient(to bottom, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: 1px solid #1d4ed8;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action-btn:hover {
  background: linear-gradient(to bottom, #60a5fa 0%, #3b82f6 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.2);
}

.github-btn {
  background: linear-gradient(to bottom, #374151 0%, #1f2937 100%);
  border-color: #111827;
}

.github-btn:hover {
  background: linear-gradient(to bottom, #4b5563 0%, #374151 100%);
}

.btn-icon {
  font-size: 16px;
}

.article-tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 15px;
  border-top: 1px solid #e2e8f0;
}

.tag-label {
  color: #6b7280;
  font-weight: 500;
}

.article-tag {
  background: #f1f5f9;
  color: #3b82f6;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  border: 1px solid #e2e8f0;
}

/* 评论区域 */
.comments-section {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  margin-top: 20px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.08);
}

.comments-header {
  background: linear-gradient(to bottom, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comments-header h3 {
  margin: 0;
  font-size: 16px;
}

.comments-count {
  font-size: 14px;
  opacity: 0.9;
}

.comment-form {
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
}

.comment-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  margin-bottom: 10px;
  font-family: inherit;
}

.comment-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.submit-btn {
  background: linear-gradient(to bottom, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: 1px solid #1d4ed8;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.submit-btn:hover {
  background: linear-gradient(to bottom, #60a5fa 0%, #3b82f6 100%);
  transform: translateY(-1px);
}

.comments-list {
  padding: 20px;
}

.comment-item {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f1f5f9;
}

.comment-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  background: #f1f5f9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.comment-author {
  font-weight: 600;
  color: #1f2937;
}

.comment-date {
  font-size: 12px;
  color: #6b7280;
}

.comment-text {
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
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

.project-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px dotted #cbd5e1;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  color: #6b7280;
  font-size: 13px;
}

.info-value {
  color: #1f2937;
  font-size: 13px;
  font-weight: 500;
}

.status-active {
  color: #10b981 !important;
  font-weight: 600 !important;
}

.related-article {
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px dotted #cbd5e1;
}

.related-article:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.related-link {
  color: #374151;
  text-decoration: none;
  font-size: 13px;
  line-height: 1.4;
  display: block;
  margin-bottom: 4px;
  transition: color 0.3s;
}

.related-link:hover {
  color: #3b82f6;
}

.related-meta {
  font-size: 12px;
  color: #6b7280;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .article-main {
    max-width: 100%;
    padding: 15px;
  }
  
  .article-sidebar {
    width: 280px;
  }
}

@media (max-width: 968px) {
  .article-main {
    flex-direction: column;
    gap: 15px;
  }
  
  .article-container {
    width: 100%;
  }
  
  .article-sidebar {
    width: 100%;
    order: -1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
  }
  
  .article-header {
    padding: 20px;
  }
  
  .article-title {
    font-size: 24px;
  }
  
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .content-section {
    padding: 20px;
  }
  
  .article-actions {
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {
  .sidebar-section {
    margin-bottom: 0;
  }
  
  .tech-stack,
  .experience-list {
    gap: 12px;
  }
  
  .tech-item,
  .experience-item {
    padding: 12px;
  }
}
</style>
