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
          <button @click="goToCategory" class="breadcrumb-btn">{{ categoryDisplayName }}</button>
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
            </div>
          </div>
        </header>

        <!-- 移动端目录（仅在小屏幕显示） -->
        <div class="mobile-toc sidebar-section">
          <div class="sidebar-header">文章目录</div>
          <div class="sidebar-content">
            <ul class="toc-list">
              <li v-for="toc in tableOfContents" :key="toc.id" :class="{ 'active': activeSection === toc.id }">
                <a @click="scrollToSection(toc.id)" class="toc-link">{{ toc.title }}</a>
              </li>
            </ul>
          </div>
        </div>

        <!-- 文章正文 -->
        <article class="article-content">
          <!-- 动态内容插槽 -->
          <slot name="content"></slot>
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

        <!-- 移动端相关文章（仅在小屏幕显示） -->
        <div class="mobile-related sidebar-section">
          <div class="sidebar-header">相关文章</div>
          <div class="sidebar-content">
            <div class="related-article" v-for="related in relatedArticles" :key="related.id">
              <a href="#" class="related-link" @click="goToRelatedArticle(related)">{{ related.title }}</a>
              <div class="related-meta">{{ related.date }}</div>
            </div>
          </div>
        </div>

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

      <!-- 桌面端侧边栏 -->
      <aside class="article-sidebar desktop-sidebar">
        <!-- 相关文章固定在顶部 -->
        <div class="sidebar-section sidebar-fixed">
          <div class="sidebar-header">相关文章</div>
          <div class="sidebar-content">
            <div class="related-article" v-for="related in relatedArticles" :key="related.id">
              <a href="#" class="related-link" @click="goToRelatedArticle(related)">{{ related.title }}</a>
              <div class="related-meta">{{ related.date }}</div>
            </div>
          </div>
        </div>

        <!-- 文章目录支持吸顶滚动 -->
        <div class="sidebar-section sidebar-sticky" :class="{ 'is-sticky': isSticky }" ref="stickyToc">
          <div class="sidebar-header">文章目录</div>
          <div class="sidebar-content">
            <ul class="toc-list">
              <li v-for="toc in tableOfContents" :key="toc.id" :class="{ 'active': activeSection === toc.id }">
                <a @click="scrollToSection(toc.id)" class="toc-link">{{ toc.title }}</a>
              </li>
            </ul>
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
import { ref, reactive, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'ArticleDetailLayout',
  props: {
    article: {
      type: Object,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    tableOfContents: {
      type: Array,
      default: () => []
    },
    relatedArticles: {
      type: Array,
      default: () => []
    }
  },
  emits: ['like-toggled'],
  setup(props, { emit }) {
    const router = useRouter()
    const showContact = ref(false)
    const showComments = ref(false)
    const newComment = ref('')
    const stickyToc = ref(null)
    const isSticky = ref(false)
    const activeSection = ref('')
    
    const comments = reactive([
      {
        id: 1,
        author: '小明',
        date: '2025-07-15 14:20',
        content: '这篇文章写得很好，学到了很多！'
      },
      {
        id: 2,
        author: '前端新手',
        date: '2025-07-15 16:30',
        content: '感谢分享，很有帮助！'
      }
    ])

    const categoryDisplayName = computed(() => {
      const categoryMap = {
        'tech': '技术文章',
        'projects': '项目分享',
        'life': '生活杂想'
      }
      return categoryMap[props.category] || '文章'
    })

    // 滚动监听函数
    const handleScroll = () => {
      const header = document.querySelector('.top-nav')
      const banner = document.querySelector('.article-banner')
      const relatedArticlesSection = document.querySelector('.sidebar-fixed')
      const headerHeight = header ? header.offsetHeight : 0
      const bannerHeight = banner ? banner.offsetHeight : 0
      // const relatedHeight = relatedArticlesSection ? relatedArticlesSection.offsetHeight : 0
      const topOffset = headerHeight + bannerHeight + 20 // 与顶部保持距离
      
      // 检查是否需要吸顶
      if (stickyToc.value && relatedArticlesSection) {
        // 获取相关文章区域的位置信息
        const relatedRect = relatedArticlesSection.getBoundingClientRect()
        const relatedBottomPosition = relatedRect.bottom + window.scrollY
        
        // 计算目录开始吸顶的临界点（相关文章底部 + 间距）
        const stickyStartPoint = relatedBottomPosition + 20 - topOffset
        
        // 判断是否应该启用吸顶
        // 条件：1. 滚动位置超过临界点 2. 不在页面最顶部（给一些缓冲）
        const shouldStick = window.scrollY > stickyStartPoint && window.scrollY > 50
        
        // 当回到顶部附近时，取消吸顶
        if (window.scrollY <= 50) {
          isSticky.value = false
        } else {
          isSticky.value = shouldStick
        }
        
        // 当吸顶时，动态计算位置确保在相关文章下方
        if (isSticky.value) {
          const dynamicTop = Math.max(topOffset, relatedRect.bottom + 20)
          stickyToc.value.style.top = `${dynamicTop}px`
        } else {
          // 不吸顶时清除内联样式
          stickyToc.value.style.top = ''
        }
      }
      
      // 检查当前激活的目录项
      updateActiveSection()
    }

    // 更新当前激活的章节
    const updateActiveSection = () => {
      if (!props.tableOfContents.length) return
      
      let currentSection = ''
      for (const toc of props.tableOfContents) {
        const element = document.getElementById(toc.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) { // 距离顶部100px内认为是当前章节
            currentSection = toc.id
          }
        }
      }
      activeSection.value = currentSection
    }

    // 滚动到指定章节
    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        const header = document.querySelector('.top-nav')
        const banner = document.querySelector('.article-banner')
        const headerHeight = header ? header.offsetHeight : 0
        const bannerHeight = banner ? banner.offsetHeight : 0
        const offset = headerHeight + bannerHeight + 20
        
        const elementPosition = element.offsetTop - offset
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        })
      }
    }

    const goBack = () => {
      router.push('/')
    }

    const goToCategory = () => {
      const categoryRoutes = {
        'tech': '/tech',
        'projects': '/projects',
        'life': '/life'
      }
      router.push(categoryRoutes[props.category] || '/')
    }

    const toggleLike = () => {
      // 不直接修改props，而是通过emit传递新值
      const newLikes = props.article.likes + 1
      emit('like-toggled', newLikes)
    }

    const shareArticle = () => {
      if (navigator.share) {
        navigator.share({
          title: props.article.title,
          text: '推荐一篇好文章',
          url: window.location.href
        }).catch(() => {
          copyToClipboard()
        })
      } else {
        copyToClipboard()
      }
    }

    const copyToClipboard = () => {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert('链接已复制到剪贴板')
        })
        .catch(() => {
          alert('复制失败，请手动复制链接')
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

    const goToRelatedArticle = (article) => {
      router.push(`/article/${props.category}/${article.id}`)
    }

    onMounted(() => {
      // 不直接修改props，而是通过emit传递阅读数增加事件
      emit('read-count-increased')
      
      // 添加滚动监听
      window.addEventListener('scroll', handleScroll)
      
      // 初始化当前章节
      nextTick(() => {
        updateActiveSection()
        
        // 为文章内容中的标题添加id
        const articleContent = document.querySelector('.article-content')
        if (articleContent && props.tableOfContents.length) {
          props.tableOfContents.forEach(toc => {
            const heading = Array.from(articleContent.querySelectorAll('h1, h2, h3, h4, h5, h6'))
              .find(h => h.textContent.trim() === toc.title.trim())
            if (heading && !heading.id) {
              heading.id = toc.id
            }
          })
        }
      })
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      showContact,
      showComments,
      newComment,
      comments,
      categoryDisplayName,
      stickyToc,
      isSticky,
      activeSection,
      goBack,
      goToCategory,
      toggleLike,
      shareArticle,
      addComment,
      goToRelatedArticle,
      scrollToSection
    }
  }
}
</script>

<style scoped>
@import '../styles/style.css';

/* 移动端专用元素默认隐藏 */
.mobile-toc,
.mobile-related {
  display: none;
}

/* 文章详情页通用样式 */
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
  display: flex;
  align-items: center;
  gap: 8px;
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

.breadcrumb-btn:hover {
  background: linear-gradient(to bottom, #60a5fa 0%, #3b82f6 100%);
  transform: translateY(-1px);
  box-shadow: 
    inset 0 1px 0 rgba(255,255,255,0.3),
    0 3px 6px rgba(0,0,0,0.2);
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #e2e8f0;
}

.breadcrumb-current-btn {
  background: linear-gradient(to bottom, #ffd700 0%, #f59e0b 100%);
  color: #1d4ed8;
  border: 1px solid #f59e0b;
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
  text-shadow: 0 1px 1px rgba(0,0,0,0.2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  white-space: nowrap;
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

/* 相关文章固定在顶部 */
.sidebar-fixed {
  order: 1;
}

/* 文章目录支持吸顶 */
.sidebar-sticky {
  order: 2;
  transition: all 0.3s ease;
}

.sidebar-sticky.is-sticky {
  position: fixed;
  top: 20px;
  width: 300px;
  z-index: 100;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
  animation: stickySlideIn 0.3s ease-out;
  /* 确保吸顶时保持在相关文章下方的合适位置 */
  margin-top: 0;
}

/* 当目录吸顶时，为侧边栏添加占位空间，防止布局跳动 */
.sidebar-sticky.is-sticky + * {
  margin-top: 0;
}

/* 为侧边栏容器添加相对定位，便于计算位置 */
.article-sidebar {
  position: relative;
}

@keyframes stickySlideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

.article-content {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.08);
  overflow: hidden;
}

.article-footer {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 15px;
  margin-top: 15px;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.08);
}

.article-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 15px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  background: #2563eb;
  color: #ffd700;
  border: 1px solid #1d4ed8;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-weight: 500;
}

.action-btn:hover {
  background: #1d4ed8;
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

.sidebar-section {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.08);
}

.sidebar-header {
  background: linear-gradient(to bottom, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 10px 12px;
  font-size: 13px;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.sidebar-content {
  padding: 12px;
  background: #f8fafc;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-list li {
  margin-bottom: 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.toc-list li.active {
  background: linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.1));
  border-left: 3px solid #3b82f6;
}

.toc-list .toc-link {
  color: #475569;
  text-decoration: none;
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 6px;
  display: block;
  transition: all 0.2s ease;
  cursor: pointer;
}

.toc-list li.active .toc-link {
  color: #3b82f6;
  font-weight: 600;
}

.toc-list .toc-link:hover {
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
  cursor: pointer;
}

.related-link:hover {
  color: #3b82f6;
}

.related-meta {
  font-size: 12px;
  color: #6b7280;
}

@media (max-width: 1200px) {
  .article-main {
    max-width: 100%;
    padding: 15px;
  }
  
  .article-sidebar {
    width: 280px;
  }
  
  .sidebar-sticky.is-sticky {
    width: 280px;
  }
}

@media (max-width: 968px) {
  /* 桌面端侧边栏在移动端隐藏 */
  .desktop-sidebar {
    display: none;
  }
  
  /* 移动端专用目录和相关文章显示 */
  .mobile-toc,
  .mobile-related {
    display: block;
    margin: 15px 0;
  }
  
  .article-main {
    flex-direction: column;
    gap: 0;
  }
  
  .article-container {
    width: 100%;
  }
  
  .article-header {
    padding: 15px 20px;
  }
  
  .article-title {
    font-size: 22px;
  }
  
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
  
  .article-actions {
    flex-wrap: wrap;
  }
  
  /* 移动端内容区域优化 */
  .content-section {
    padding: 15px 18px;
  }
  
  .content-section:last-child {
    padding-bottom: 20px;
  }
  
  .sidebar-content {
    padding: 10px;
  }
}

/* 小屏幕进一步优化 */
@media (max-width: 480px) {
  .content-section {
    padding: 12px 15px;
  }
  
  .content-section h2 {
    font-size: 20px;
    margin-bottom: 12px;
    margin-top: 15px;
  }
  
  .content-section h3 {
    font-size: 16px;
    margin: 20px 0 10px 0;
  }
  
  .content-section p {
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 15px;
  }
  
  .article-header {
    padding: 12px 15px;
  }
  
  .article-title {
    font-size: 20px;
  }
  
  .sidebar-content {
    padding: 8px;
  }
  
  .toc-list .toc-link {
    padding: 5px 8px;
    font-size: 12px;
  }
}
</style>
