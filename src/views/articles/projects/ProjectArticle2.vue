<template>
  <ArticleDetailLayout 
    :article="article" 
    :category="'projects'"
    :table-of-contents="tableOfContents"
    :related-articles="relatedArticles"
    @like-toggled="onLikeToggled"
  >
    <template #content>
      <div class="content-section">
        <h2 id="section1">前言</h2>
        <p>随着AI技术的快速发展，越来越多的用户希望能够便捷地使用各种AI聊天服务。由于网络环境的限制，国内用户往往需要通过镜像站来访问这些服务。因此整理了几个目前正常使用的镜像站，供大家参考。</p>
      </div>

      <div class="content-section">
        <h2 id="section2">推荐镜像站列表</h2>
        
        <h3>1. 在问（强烈推荐）</h3>
        <p><strong>访问地址：</strong> <a href="https://zaiwen.xueban.org.cn/chat/working-edition" target="_blank" class="external-link">zaiwen.xueban.org.cn</a></p>
        <p>【最喂饭】当下国内（几乎）唯一合法的最大转接国外模型的网站。这是由某清华团队开发的平台，提供了多种国外AI模型的选择。</p>
        
        <div class="feature-list">
          <div class="feature-item">
            <div class="feature-icon">🆓</div>
            <div class="feature-content">
              <h4>完全免费</h4>
              <p>无需付费即可使用多种AI模型，包括GPT、Claude等热门模型。</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <span class="feature-img">⭐</span>
            </div>
            <div class="feature-content">
              <h4>清华背景</h4>
              <p>由清华团队开发维护，技术实力强，服务稳定可靠。</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <span class="feature-img">⭐</span>
            </div>
            <div class="feature-content">
              <h4>响应快速</h4>
              <p>国内服务器，访问速度快，模型响应时间短。</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🤖</div>
            <div class="feature-content">
              <h4>模型丰富</h4>
              <p>支持多种最新的AI模型，满足不同使用需求。</p>
            </div>
          </div>
        </div>

        <h3>2. SharedChat 镜像站</h3>
        <p><strong>访问地址：</strong> <a href="https://sharedchat.fun/" target="_blank" class="external-link">sharedchat.fun</a></p>
        <p>需输入八位数字以区隔对话。这个平台要求用户输入八位数字来创建独立的对话会话，确保不同用户之间的对话不会相互干扰。</p>

        <h3>3. ChatGPT Plus 镜像站</h3>
        <p><strong>访问地址：</strong> <a href="https://chatgptplus.cn/" target="_blank" class="external-link">chatgptplus.cn</a></p>
        <p>同样需要输入八位数字以区隔对话，与SharedChat类似，采用会话隔离机制。</p>

        <h3>4. OAI Chat 镜像站</h3>
        <p><strong>访问地址：</strong> <a href="https://chat2.oaichat.cc/" target="_blank" class="external-link">chat2.oaichat.cc</a></p>
        <p>这个镜像站接入了ChatGPT Plus的API，但效果一般，建议作为备用选择。</p>
      </div>

      <div class="content-section">
        <h2 id="section3">使用技巧与建议</h2>
        
        <div class="practice-list">
          <div class="practice-item">
            <div class="practice-icon">🥇</div>
            <div class="practice-content">
              <h4>优先级排序</h4>
              <p>建议按照稳定性顺序使用：在问 > SharedChat > ChatGPT Plus > OAI Chat。</p>
            </div>
          </div>
          <div class="practice-item">
            <div class="practice-icon">
              <span class="practice-img">⭐</span>
            </div>
            <div class="practice-content">
              <h4>隐私保护</h4>
              <p>使用镜像站时注意保护个人隐私，避免输入敏感或机密信息。</p>
            </div>
          </div>
          <div class="practice-item">
            <div class="practice-icon">
              <span class="practice-img">⭐</span>
            </div>
            <div class="practice-content">
              <h4>备用方案</h4>
              <p>建议收藏多个镜像站链接，以防某个站点临时无法访问。</p>
            </div>
          </div>
          <div class="practice-item">
            <div class="practice-icon">
              <span class="practice-img">⭐</span>
            </div>
            <div class="practice-content">
              <h4>合理使用</h4>
              <p>请合理使用这些免费资源，避免滥用导致服务不稳定。</p>
            </div>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h2 id="section4">注意事项与风险提示</h2>
        
        <blockquote>
          <p><strong>重要提醒：</strong>镜像站的可用性可能会因网络环境和政策变化而发生改变，请及时关注更新。</p>
        </blockquote>

        <div class="practice-list">
          <div class="practice-item">
            <div class="practice-icon">
              <span class="practice-img">⭐</span>
            </div>
            <div class="practice-content">
              <h4>网络环境</h4>
              <p>镜像站可用性会受到网络政策影响，使用前请确认当前状态。</p>
            </div>
          </div>
          <div class="practice-item">
            <div class="practice-icon">
              <span class="practice-img">⭐</span>
            </div>
            <div class="practice-content">
              <h4>数据安全</h4>
              <p>第三方镜像站存在数据泄露风险，请谨慎处理敏感信息。</p>
            </div>
          </div>
          <div class="practice-item">
            <div class="practice-icon">
              <span class="practice-img">⭐</span>
            </div>
            <div class="practice-content">
              <h4>服务质量</h4>
              <p>不同镜像站的响应速度和稳定性有差异，建议多方测试。</p>
            </div>
          </div>
          <div class="practice-item">
            <div class="practice-icon">�</div>
            <div class="practice-content">
              <h4>移动端适配</h4>
              <p>大部分镜像站都支持移动端访问，但体验可能有所不同。</p>
            </div>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h2 id="section5">总结</h2>
        <p>以上推荐的镜像站都是目前相对稳定可用的AI聊天服务。其中"在问"平台由于其官方背景和稳定性，是最值得推荐的选择。</p>
        <p>希望这份整理能够帮助大家更好地使用AI聊天服务！如果你发现了其他好用的镜像站，也欢迎在评论区分享。</p>
        
        <div class="highlight-box">
          <h4>
            <span class="tip-icon">⭐</span> 免责声明
          </h4>
          <p>本文仅供学习交流使用，请大家合理使用相关服务，遵守相关法律法规。作者不对镜像站的可用性、安全性承担任何责任。</p>
        </div>
      </div>
    </template>
  </ArticleDetailLayout>
</template>

<script>
import { reactive } from 'vue'
import ArticleDetailLayout from '../../../components/ArticleDetailLayout.vue'

export default {
  name: 'ProjectArticle2',
  components: {
    ArticleDetailLayout
  },
  setup() {
    const article = reactive({
      id: 102,
      title: '国内可用的AI聊天镜像站推荐',
      author: '霍玮放',
      readCount: 245,
      likes: 18,
      date: '2025年7月17日',
      category: '工具推荐',
      tags: ['AI聊天', '镜像站', '工具推荐', 'ChatGPT', '清华']
    })

    const tableOfContents = [
      { id: 'section1', title: '前言' },
      { id: 'section2', title: '推荐镜像站列表' },
      { id: 'section3', title: '使用技巧与建议' },
      { id: 'section4', title: '注意事项与风险提示' },
      { id: 'section5', title: '总结' }
    ]

    const relatedArticles = [
      { id: 101, title: '个人博客系统开发指南', date: '07-16' },
      { id: 103, title: '前端工具集合推荐', date: '07-15' },
      { id: 104, title: '开发效率提升工具', date: '07-14' }
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

.external-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px dotted #3b82f6;
  transition: all 0.2s ease;
  word-break: break-all;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  background: #f8fafc;
  padding: 2px 4px;
  border-radius: 4px;
  margin: 0 2px;
}

.external-link:hover {
  color: #2563eb;
  border-bottom: 1px solid #2563eb;
  text-decoration: none;
  background: #eff6ff;
  transform: translateY(-1px);
}
</style>
