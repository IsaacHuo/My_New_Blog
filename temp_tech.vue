<template>
  <div class="container">
    <!-- 顶部导航 -->
    <header class="top-nav">
      <div class="nav-content">
        <div class="logo-centered">
          霍玮放的博客
        </div> class="user-actions">
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
          <button class="breadcrumb-btn breadcrumb-current" disabled>技术随笔</button>
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
            <img src="/icons/TechArticle.ico" alt="技术文章" class="title-icon"> 技术文章
          </h1>
          <div class="category-stats">
            <span class="article-count">共 {{ techArticles.length }} 篇文章</span>
            <span class="last-update">最后更新：{{ lastUpdate }}</span>
          </div>
        </header>

        <!-- 文章列表 -->
        <div class="articles-list">
          <div 
            v-for="article in techArticles" 
            :key="article.id" 
            class="article-card"
            :class="{ 'no-detail': !hasArticleDetail('tech', article.id) }"
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
                  <span class="article-category">{{ article.category }}</span>
                </div>
                <div class="meta-right">
                  <span class="article-reads">{{ article.readCount }} 阅读</span>
                  <span class="article-likes">{{ article.likes }} 点赞</span>
                </div>
              </div>
            </div>
            <div class="article-tags">
              <span v-for="tag in article.tags" :key="tag" class="article-tag">{{ tag }}</span>
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
              <li class="category-item active">
                <span class="category-icon">
                  <img src="/icons/TechArticle.ico" alt="技术" class="sidebar-icon">
                </span>
                <span class="category-name">技术文章</span>
                <span class="category-count">({{ techArticles.length }})</span>
              </li>
              <li class="category-item" @click="goToCategory('projects')">
                <span class="category-icon">🚀</span>
                <span class="category-name">项目分享</span>
                <span class="category-count">(12)</span>
              </li>
              <li class="category-item" @click="goToCategory('life')">
                <span class="category-icon">📝</span>
                <span class="category-name">生活杂想</span>
                <span class="category-count">(8)</span>
              </li>
              <li class="category-item" @click="goToCategory('about')">
                <span class="category-icon">
                  <img src="/MyPicture.jpeg" alt="作者" class="author-avatar">
                </span>
                <span class="category-name">关于我</span>
                <span class="category-count">(3)</span>
              </li>
              <li class="category-item" @click="goToCategory('wishes')">
                <span class="category-icon">⭐</span>
                <span class="category-name">我的愿望</span>
                <span class="category-count">(10)</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-header">热门标签</div>
          <div class="sidebar-content">
            <div class="tag-cloud">
              <span v-for="tag in popularTags" :key="tag.name" class="popular-tag" :style="{ fontSize: tag.size + 'px' }">
                {{ tag.name }}
              </span>
            </div>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-header">最新评论</div>
          <div class="sidebar-content">
            <div v-for="comment in recentComments" :key="comment.id" class="recent-comment">
              <div class="comment-author">{{ comment.author }}</div>
              <div class="comment-content">{{ comment.content }}</div>
              <div class="comment-article">在《{{ comment.article }}》</div>
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
