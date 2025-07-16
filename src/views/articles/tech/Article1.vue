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
          <span @click="goBack" class="breadcrumb-link">首页</span>
          <span class="breadcrumb-separator">></span>
          <span @click="goToTech" class="breadcrumb-link">技术文章</span>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-current">{{ article.title }}</span>
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
              <span class="article-date">发布时间：{{ article.fullDate }}</span>
              <span class="article-category">分类：{{ article.category }}</span>
            </div>
            <div class="meta-right">
              <span class="article-views">阅读量：{{ article.readCount }}</span>
              <span class="article-likes">点赞：{{ article.likes }}</span>
            </div>
          </div>
        </header>

        <!-- 文章正文 -->
        <article class="article-content">
          <div class="content-section">
            <h2>前言</h2>
            <p>Vue 3 作为 Vue.js 的最新版本，引入了许多令人兴奋的新特性，其中最重要的就是组合式 API（Composition API）。本文将深入探讨 Vue 3 组合式 API 的核心概念、使用方法和最佳实践。</p>
          </div>

          <div class="content-section">
            <h2>什么是组合式 API？</h2>
            <p>组合式 API 是 Vue 3 中引入的一套全新的 API，它提供了一种更灵活的方式来组织组件逻辑。与传统的选项式 API 不同，组合式 API 允许我们将相关的逻辑组织在一起，提高代码的可维护性和重用性。</p>
            
            <div class="code-block">
              <div class="code-header">
                <span class="code-title">基础示例</span>
                <button class="copy-btn">复制</button>
              </div>
              <pre><code>import { ref, reactive, computed, onMounted } from 'vue'

export default {
  setup() {
    // 响应式数据
    const count = ref(0)
    const user = reactive({
      name: '张三',
      age: 25
    })
    
    // 计算属性
    const doubleCount = computed(() => count.value * 2)
    
    // 方法
    const increment = () => {
      count.value++
    }
    
    // 生命周期
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    return {
      count,
      user,
      doubleCount,
      increment
    }
  }
}</code></pre>
            </div>
          </div>

          <div class="content-section">
            <h2>核心概念详解</h2>
            
            <h3>1. ref 和 reactive</h3>
            <p><code>ref</code> 用于创建单个响应式数据，而 <code>reactive</code> 用于创建响应式对象。这两个函数是组合式 API 的基础。</p>
            
            <h3>2. computed 计算属性</h3>
            <p>计算属性在组合式 API 中通过 <code>computed</code> 函数创建，它会根据依赖的响应式数据自动更新。</p>
            
            <h3>3. watch 侦听器</h3>
            <p>侦听器用于响应数据变化，执行相应的副作用操作。</p>
          </div>

          <div class="content-section">
            <h2>最佳实践</h2>
            <div class="practice-list">
              <div class="practice-item">
                <div class="practice-icon">💡</div>
                <div class="practice-content">
                  <h4>逻辑分组</h4>
                  <p>将相关的响应式数据、计算属性和方法组织在一起，提高代码的可读性。</p>
                </div>
              </div>
              <div class="practice-item">
                <div class="practice-icon">🔧</div>
                <div class="practice-content">
                  <h4>可组合函数</h4>
                  <p>将可重用的逻辑提取到独立的可组合函数中，实现逻辑复用。</p>
                </div>
              </div>
              <div class="practice-item">
                <div class="practice-icon">⚡</div>
                <div class="practice-content">
                  <h4>性能优化</h4>
                  <p>合理使用 ref 和 reactive，避免不必要的响应式转换。</p>
                </div>
              </div>
            </div>
          </div>

          <div class="content-section">
            <h2>总结</h2>
            <p>Vue 3 的组合式 API 为我们提供了更灵活、更强大的开发体验。通过合理使用这些新特性，我们可以编写出更加清晰、可维护的代码。希望本文能帮助您更好地理解和应用 Vue 3 组合式 API。</p>
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
          <div class="sidebar-header">文章目录</div>
          <div class="sidebar-content">
            <ul class="toc-list">
              <li><a href="#section1">前言</a></li>
              <li><a href="#section2">什么是组合式 API？</a></li>
              <li><a href="#section3">核心概念详解</a></li>
              <li><a href="#section4">最佳实践</a></li>
              <li><a href="#section5">总结</a></li>
            </ul>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-header">相关文章</div>
          <div class="sidebar-content">
            <div class="related-article" v-for="related in relatedArticles" :key="related.id">
              <a href="#" class="related-link">{{ related.title }}</a>
              <div class="related-meta">{{ related.date }}</div>
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
  name: 'TechArticle1',
  setup() {
    const router = useRouter()
    const showContact = ref(false)
    const showComments = ref(false)
    const newComment = ref('')
    
    const article = reactive({
      id: 1,
      title: 'Vue 3 组合式API详解与实践',
      author: '霍玮放',
      readCount: 1205,
      likes: 48,
      fullDate: '2025年7月16日',
      category: '前端框架',
      tags: ['Vue.js', 'JavaScript', '前端开发']
    })

    const comments = reactive([
      {
        id: 1,
        author: '张三',
        date: '2025-07-16 15:30',
        content: '写得很详细，对我帮助很大！特别是组合式 API 的实践部分。'
      },
      {
        id: 2,
        author: '李四',
        date: '2025-07-16 16:45',
        content: '代码示例很清晰，已经收藏了。期待更多 Vue 3 相关的文章。'
      },
      {
        id: 3,
        author: '王五',
        date: '2025-07-16 18:20',
        content: '学到了很多新知识，感谢分享！'
      }
    ])

    const relatedArticles = reactive([
      { id: 4, title: 'React Hooks最佳实践总结', date: '07-13' },
      { id: 6, title: 'TypeScript进阶使用技巧', date: '07-11' },
      { id: 9, title: '前端工程化最佳实践', date: '07-08' }
    ])

    const goBack = () => {
      router.push('/')
    }

    const goToTech = () => {
      router.push('/tech')
    }

    const toggleLike = () => {
      article.likes++
    }

    const shareArticle = () => {
      navigator.share({
        title: article.title,
        text: '推荐一篇好文章',
        url: window.location.href
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href)
        alert('链接已复制到剪贴板')
      })
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
      relatedArticles,
      goBack,
      goToTech,
      toggleLike,
      shareArticle,
      addComment
    }
  }
}
</script>

<style scoped>
@import '../../styles/style.css';

/* 文章页面特定样式 */

/* 文章导航横幅 */
.article-banner {
  background: linear-gradient(to bottom, #60a5fa 0%, #3b82f6 100%);
  padding: 10px 20px;
  border-top: 3px solid #1d4ed8;
  border-bottom: 3px solid #1d4ed8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.article-breadcrumb {
  font-size: 14px;
  color: #ffffff;
}

.breadcrumb-link {
  color: #ffffff;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s;
}

.breadcrumb-link:hover {
  color: #93c5fd;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #e2e8f0;
}

.breadcrumb-current {
  color: #ffd700;
  font-weight: bold;
}

/* 主要内容布局 */
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

/* 文章标题区域 */
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

/* 文章正文 */
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

.content-section h3 {
  color: #374151;
  font-size: 18px;
  margin: 20px 0 10px 0;
}

.content-section p {
  line-height: 1.7;
  color: #4b5563;
  margin-bottom: 15px;
}

.content-section code {
  background: #f1f5f9;
  color: #3b82f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}

/* 代码块样式 */
.code-block {
  background: #1f2937;
  border-radius: 8px;
  margin: 20px 0;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.code-header {
  background: #374151;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #4b5563;
}

.code-title {
  color: #e5e7eb;
  font-size: 14px;
  font-weight: 500;
}

.copy-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.3s;
}

.copy-btn:hover {
  background: #2563eb;
}

.code-block pre {
  margin: 0;
  padding: 20px;
  overflow-x: auto;
}

.code-block code {
  color: #e5e7eb;
  background: none;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
}

/* 最佳实践列表 */
.practice-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.practice-item {
  display: flex;
  align-items: flex-start;
  background: #f8fafc;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.practice-icon {
  font-size: 20px;
  margin-right: 12px;
  flex-shrink: 0;
}

.practice-content h4 {
  color: #1f2937;
  margin-bottom: 5px;
  font-size: 16px;
}

.practice-content p {
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
  font-family: 'WenQuanYi Bitmap Song', sans-serif;
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

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-list li {
  margin-bottom: 8px;
}

.toc-list a {
  color: #475569;
  text-decoration: none;
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 6px;
  display: block;
  transition: all 0.2s ease;
}

.toc-list a:hover {
  background: linear-gradient(to right, #60a5fa 0%, #3b82f6 100%);
  color: white;
  transform: translateX(5px);
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
}
</style>
