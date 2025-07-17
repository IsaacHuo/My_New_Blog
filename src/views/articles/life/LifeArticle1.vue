<template>
  <ArticleDetailLayout 
    :article="article" 
    :category="'life'"
    :table-of-contents="tableOfContents"
    :related-articles="relatedArticles"
    @like-toggled="onLikeToggled"
  >
    <template #content>
      <div class="content-section">
        <h2 id="section1">前言</h2>
        <p>作为一名程序员，我们总是沉浸在代码的世界里。每天面对着屏幕，敲击着键盘，思考着算法和逻辑。但生活不只有代码，还有诗和远方。这篇文章想要分享的，是我在工作之余探索生活的一些感悟和体验。</p>
      </div>

      <div class="content-section">
        <h2 id="section2">从代码世界走向生活</h2>
        <p>记得刚开始工作的时候，我几乎把所有的时间都投入到了编程中。从早上起床第一件事就是查看GitHub上的新消息，到晚上睡前还在思考今天遇到的技术难题。那时候的我认为，成为一名优秀的程序员就是要全身心地投入到技术学习中。</p>
        
        <p>然而，随着时间的推移，我开始意识到这种生活方式的问题。长期的高强度工作让我感到疲惫，创造力也在下降。更重要的是，我发现自己与周围的世界渐行渐远，除了技术话题，我似乎没有什么可以和朋友们分享的。</p>
        
        <div class="life-quote">
          <div class="quote-icon">
            <span class="quote-img">💭</span>
          </div>
          <div class="quote-content">
            <p>"生活就像编程，需要的不仅仅是逻辑，还需要创意、情感和美感。"</p>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h2 id="section3">寻找生活中的美好</h2>
        <p>转变从一次意外的周末开始。那天原本计划写代码，但朋友突然邀请我去爬山。虽然内心有些抗拒（毕竟有好多技术文档还没看完），但最终还是答应了。</p>
        
        <p>那次爬山的经历让我重新审视了生活。站在山顶俯瞰城市，看着远处的夕阳，我突然意识到，这种美好是任何代码都无法表达的。那一刻，我理解了什么叫做"诗和远方"。</p>

        <div class="life-moments">
          <div class="moment-item">
            <div class="moment-icon">
              <span class="moment-img">🌄</span>
            </div>
            <div class="moment-content">
              <h4>山顶日出</h4>
              <p>早起看日出，感受大自然的力量与美丽</p>
            </div>
          </div>
          <div class="moment-item">
            <div class="moment-icon">
              <span class="moment-img">📚</span>
            </div>
            <div class="moment-content">
              <h4>读书时光</h4>
              <p>放下技术书籍，阅读文学作品，滋养心灵</p>
            </div>
          </div>
          <div class="moment-item">
            <div class="moment-icon">
              <span class="moment-img">🍳</span>
            </div>
            <div class="moment-content">
              <h4>学做料理</h4>
              <p>用心制作每一道菜，体验创造的乐趣</p>
            </div>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h2 id="section4">工作与生活的平衡</h2>
        <p>找到工作与生活的平衡并不容易，特别是对于程序员这个群体。我们总是被快速发展的技术所驱动，害怕停下脚步就会被淘汰。但我逐渐学会了给自己设定边界。</p>
        
        <h3>我的平衡法则</h3>
        <ul class="balance-rules">
          <li><span class="list-icon">⏰</span> 工作时间内专注工作，下班后不看工作消息</li>
          <li><span class="list-icon">🌐</span> 减少无意义的网络浏览，多与现实世界互动</li>
          <li><span class="list-icon">🚶</span> 每天至少半小时的散步时间，思考和放松</li>
          <li><span class="list-icon">👥</span> 保持社交活动，与朋友家人分享生活</li>
          <li><span class="list-icon">🎨</span> 培养技术之外的兴趣爱好</li>
        </ul>
      </div>

      <div class="content-section">
        <h2 id="section5">生活带给编程的灵感</h2>
        <p>有趣的是，当我开始关注生活的时候，我发现生活中的很多事物都可以为编程带来灵感。比如：</p>
        
        <div class="inspiration-list">
          <div class="inspiration-item">
            <div class="inspiration-icon">
              <span class="inspiration-img">⭐</span>
            </div>
            <div class="inspiration-content">
              <h4>园艺与代码重构</h4>
              <p>照料植物需要耐心和持续关注，就像代码重构一样，需要持续改进和优化。</p>
            </div>
          </div>
          <div class="inspiration-item">
            <div class="inspiration-icon">
              <span class="inspiration-img">⭐</span>
            </div>
            <div class="inspiration-content">
              <h4>烘焙与算法设计</h4>
              <p>烘焙需要精确的比例和步骤，这让我更好地理解了算法设计的重要性。</p>
            </div>
          </div>
          <div class="inspiration-item">
            <div class="inspiration-icon">
              <span class="inspiration-img">⭐</span>
            </div>
            <div class="inspiration-content">
              <h4>音乐与代码节奏</h4>
              <p>音乐的节拍和代码的逻辑有着相似的美感，都需要和谐与平衡。</p>
            </div>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h2 id="section6">写在最后</h2>
        <p>生活中的每一个瞬间都值得记录，每一次思考都是成长的印记。作为程序员，我们拥有逻辑思维和解决问题的能力，但不要忘记，我们首先是一个完整的人。</p>
        
        <p>希望每一位读到这篇文章的朋友，都能在繁忙的工作之余，为自己留出一片天空，去感受生活的美好，去体验代码之外的精彩世界。毕竟，最好的代码，往往来自于对生活的深度理解。</p>
        
        <div class="life-quote">
          <div class="quote-icon">
            <span class="quote-img">⭐</span>
          </div>
          <div class="quote-content">
            <p>"代码是我们的工具，但生活才是我们的目的。"</p>
          </div>
        </div>
      </div>
    </template>
  </ArticleDetailLayout>
</template>

<script>
import { reactive } from 'vue'
import ArticleDetailLayout from '../../../components/ArticleDetailLayout.vue'

export default {
  name: 'LifeArticle1',
  components: {
    ArticleDetailLayout
  },
  setup() {
    const article = reactive({
      id: 201,
      title: '从程序员到生活家：寻找代码之外的美好',
      author: '霍玮放',
      readCount: 867,
      likes: 52,
      date: '2025年7月16日',
      category: '生活感悟',
      tags: ['生活感悟', '工作生活平衡', '个人成长']
    })

    const tableOfContents = [
      { id: 'section1', title: '前言' },
      { id: 'section2', title: '从代码世界走向生活' },
      { id: 'section3', title: '寻找生活中的美好' },
      { id: 'section4', title: '工作与生活的平衡' },
      { id: 'section5', title: '生活带给编程的灵感' },
      { id: 'section6', title: '写在最后' }
    ]

    const relatedArticles = [
      { id: 202, title: '咖啡馆里的思考：关于远程工作的那些事', date: '07-15' },
      { id: 203, title: '夜深人静写代码的那些心境', date: '07-14' },
      { id: 204, title: '旅行中的代码灵感：在路上思考技术', date: '07-13' }
    ]

    const onLikeToggled = (newLikes) => {
      console.log('文章点赞数更新:', newLikes)
    }

    return {
      article,
      tableOfContents,
      relatedArticles,
      onLikeToggled
    }
  }
}
</script>

<style scoped>
@import '../../../styles/article-content.css';

/* 生活文章特有样式 */
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
  background: linear-gradient(135deg, #fefefe 0%, #f0fdf4 100%);
  border: 2px solid #d1fae5;
  border-left: 6px solid #10b981;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.08);
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
  border-top: 1px solid #d1fae5;
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

.article-mood {
  color: #10b981 !important;
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
  border-bottom: 2px solid #10b981;
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

/* 生活语录样式 */
.life-quote {
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border-left: 3px solid #10b981;
  border-radius: 6px;
  padding: 15px 18px;
  margin: 18px 0;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.quote-icon {
  font-size: 18px;
  flex-shrink: 0;
  margin-top: 0;
}

.quote-content p {
  font-style: italic;
  color: #059669;
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
}

/* 生活时刻样式 */
.life-moments {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 18px 0;
}

.moment-item {
  display: flex;
  align-items: flex-start;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  padding: 12px 15px;
  border-radius: 6px;
  border-left: 3px solid #f59e0b;
  min-height: 50px;
}

.moment-icon {
  font-size: 18px;
  margin-right: 10px;
  flex-shrink: 0;
}

.moment-content h4 {
  color: #1f2937;
  margin-bottom: 3px;
  font-size: 15px;
  line-height: 1.3;
}

.moment-content p {
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
  font-size: 13px;
}

/* 平衡法则样式 */
.balance-rules {
  color: #4b5563;
  line-height: 1.8;
  padding-left: 0;
  list-style: none;
}

.balance-rules li {
  margin-bottom: 8px;
  padding-left: 0;
}

/* 灵感列表样式 */
.inspiration-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 18px 0;
}

.inspiration-item {
  display: flex;
  align-items: flex-start;
  background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
  padding: 12px 15px;
  border-radius: 6px;
  border-left: 3px solid #8b5cf6;
  min-height: 50px;
}

.inspiration-icon {
  font-size: 18px;
  margin-right: 10px;
  flex-shrink: 0;
}

.inspiration-content h4 {
  color: #1f2937;
  margin-bottom: 3px;
  font-size: 15px;
  line-height: 1.3;
}

.inspiration-content p {
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
  font-size: 13px;
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
  background: linear-gradient(to bottom, #10b981 0%, #059669 100%);
  color: white;
  border: 1px solid #047857;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action-btn:hover {
  background: linear-gradient(to bottom, #34d399 0%, #10b981 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.2);
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

.life-tag {
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  color: #10b981;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  border: 1px solid #a7f3d0;
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
  background: linear-gradient(to bottom, #10b981 0%, #059669 100%);
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
  border-color: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.submit-btn {
  background: linear-gradient(to bottom, #10b981 0%, #059669 100%);
  color: white;
  border: 1px solid #047857;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.submit-btn:hover {
  background: linear-gradient(to bottom, #34d399 0%, #10b981 100%);
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
  background: #ecfdf5;
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
  background: linear-gradient(to bottom, #10b981 0%, #059669 100%);
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

.life-insights {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.insight-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: #ecfdf5;
  border-radius: 6px;
  border-left: 3px solid #10b981;
}

.insight-icon {
  font-size: 16px;
}

.insight-text {
  color: #1f2937;
  font-size: 13px;
  font-weight: 500;
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
  color: #10b981;
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
  
  .life-moments,
  .inspiration-list {
    gap: 12px;
  }
  
  .moment-item,
  .inspiration-item {
    padding: 12px;
  }
  
  .life-quote {
    padding: 15px;
  }
}
</style>
