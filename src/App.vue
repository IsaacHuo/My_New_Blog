<template>
  <div class="container">
    <!-- 顶部导航 -->
    <header class="top-nav">
      <div class="nav-content">
        <div class="logo">天涯社区</div>
        <nav class="nav-links">
          <a href="#" @click="activeSection = 'focus'">聚焦</a>
          <a href="#" @click="activeSection = 'forum'">论坛</a>
          <a href="#" @click="activeSection = 'blog'">博客</a>
          <a href="#" @click="activeSection = 'tribe'">部落</a>
          <a href="#" @click="activeSection = 'mall'">来吧</a>
          <a href="#" @click="activeSection = 'qa'">问答</a>
          <a href="#" @click="activeSection = 'game'">游戏</a>
          <a href="#" @click="activeSection = 'brand'">品牌</a>
          <a href="#" @click="activeSection = 'shop'">购物街</a>
        </nav>
        <div class="user-actions">
          <button @click="showLogin = true">登录</button>
          <button @click="showRegister = true">注册</button>
        </div>
      </div>
    </header>

    <!-- 分类信息横幅 -->
    <section class="category-banner">
      <div class="banner-content">
        <h1 class="banner-title">发信息！找信息！</h1>
        <p class="banner-subtitle">请上"分类信息"频道！</p>
        <div class="banner-links">
          <a href="#">收藏天地</a>
          <a href="#">班竹</a>
          <a href="#">子平</a>
          <a href="#">社区</a>
          <a href="#">最新提交</a>
          <a href="#">热门话题</a>
          <a href="#">精品文章</a>
          <a href="#">本版介绍</a>
        </div>
        <div class="banner-stats">
          论题/回复：{{ stats.topics }}/{{ stats.replies }}
        </div>
      </div>
    </section>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <div class="content-area">
        <div class="content-header">
          <h2 class="section-title">{{ getSectionTitle() }}</h2>
        </div>

        <!-- 话题列表 -->
        <div class="topic-list">
          <div class="topic-header">
            <div>论题</div>
            <div>作者</div>
            <div>访问/回复</div>
            <div>更新日期</div>
          </div>
          
          <TransitionGroup name="slide-up" tag="div">
            <div 
              v-for="topic in getTopicsBySection()" 
              :key="topic.id" 
              class="topic-item"
            >
              <div class="topic-title">
                <span class="topic-icon">{{ topic.category }}</span>
                <a href="#" @click="selectTopic(topic)">{{ topic.title }}</a>
              </div>
              <a href="#" class="topic-author">{{ topic.author }}</a>
              <div class="topic-stats">{{ topic.views }}/{{ topic.replies }}</div>
              <div class="topic-time">{{ topic.updateTime }}</div>
            </div>
          </TransitionGroup>
        </div>
      </div>

      <!-- 侧边栏 -->
      <aside class="sidebar">
        <div class="sidebar-section">
          <div class="sidebar-header">了解天涯</div>
          <div class="sidebar-content">
            <ul class="sidebar-menu">
              <li><a href="#">天涯主版</a></li>
              <li><a href="#">天涯城市</a></li>
              <li><a href="#">天涯别院</a></li>
              <li><a href="#">天涯旅游</a></li>
              <li><a href="#">大学校园</a></li>
              <li><a href="#">职业交流</a></li>
              <li><a href="#">天涯海外</a></li>
              <li><a href="#">天涯网事</a></li>
            </ul>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="ad-banner">
            <h3>第四套人民币特续暴涨</h3>
            <p>第四套人民币大全<br>40张14张,包含80版50元,80版100元</p>
            <p style="margin-top: 10px; color: #ffd700;">后四位同号</p>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-header">世博公园</div>
          <div class="sidebar-content">
            <ul class="sidebar-menu">
              <li><a href="#">经济论坛</a></li>
              <li><a href="#">天涯互助</a></li>
              <li><a href="#">舞文弄墨</a></li>
              <li><a href="#">淮水专区</a></li>
              <li><a href="#">情感天地</a></li>
            </ul>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-header">品牌生活</div>
          <div class="sidebar-content">
            <p style="font-size: 12px; color: #666; line-height: 1.4;">
              发现更多生活品质，分享美好时光
            </p>
          </div>
        </div>
      </aside>
    </main>
  </div>

  <!-- 登录模态框 -->
  <Transition name="fade">
    <div v-if="showLogin" class="modal-overlay" @click="showLogin = false">
      <div class="modal" @click.stop>
        <h3>用户登录</h3>
        <button @click="showLogin = false">关闭</button>
      </div>
    </div>
  </Transition>

  <!-- 注册模态框 -->
  <Transition name="fade">
    <div v-if="showRegister" class="modal-overlay" @click="showRegister = false">
      <div class="modal" @click.stop>
        <h3>用户注册</h3>
        <button @click="showRegister = false">关闭</button>
      </div>
    </div>
  </Transition>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'

export default {
  name: 'App',
  setup() {
    const activeSection = ref('forum')
    const showLogin = ref(false)
    const showRegister = ref(false)
    const selectedTopic = ref(null)
    
    const stats = reactive({
      topics: 104664,
      replies: 1534557
    })

    const topics = reactive([
      {
        id: 1,
        category: '藏',
        title: '[藏品交流区]龙马精神，欢迎鉴赏',
        author: 'x1zngx10717',
        views: 105,
        replies: 6,
        updateTime: '4-23 16:14',
        section: 'forum'
      },
      {
        id: 2,
        category: '邮',
        title: '[邮币]邮票异类最新动态和发展分析',
        author: '熊猫的腰b',
        views: 5,
        replies: 0,
        updateTime: '4-23 15:25',
        section: 'forum'
      },
      {
        id: 3,
        category: '杂',
        title: '[杂件]1892爱立信老电话机',
        author: 'cyx3333',
        views: 21,
        replies: 2,
        updateTime: '4-23 15:18',
        section: 'forum'
      },
      {
        id: 4,
        category: '陶',
        title: '[陶瓷]可堪比国家级的藏品瓷器宝贝儿，大清乾隆年#8226',
        author: '照蓝',
        views: 112,
        replies: 15,
        updateTime: '4-23 15:17',
        section: 'forum'
      },
      {
        id: 5,
        category: '邮',
        title: '[邮币]发几枚古钱请大家鉴定，谢谢',
        author: '土牛胶',
        views: 1806,
        replies: 29,
        updateTime: '4-23 15:04',
        section: 'forum'
      },
      {
        id: 6,
        category: '杂',
        title: '[杂件]是整全国的紫砂专场在北京举行',
        author: 'fj87663158',
        views: 4,
        replies: 0,
        updateTime: '4-23 14:48',
        section: 'forum'
      },
      {
        id: 7,
        category: '邮',
        title: '[邮币]邮币 邮票 与财富 (贴图)',
        author: '熊猫的腰b',
        views: 12,
        replies: 1,
        updateTime: '4-23 14:48',
        section: 'forum'
      },
      {
        id: 8,
        category: '陶',
        title: '[陶瓷]2010年北京春季拍卖会征集瓷器',
        author: 'fj87663158',
        views: 7,
        replies: 0,
        updateTime: '4-23 14:43',
        section: 'forum'
      },
      {
        id: 9,
        category: '博',
        title: '[博客]分享生活点滴',
        author: '生活达人',
        views: 234,
        replies: 12,
        updateTime: '4-23 14:30',
        section: 'blog'
      },
      {
        id: 10,
        category: '游',
        title: '[游戏]最新网游推荐',
        author: '游戏玩家',
        views: 456,
        replies: 23,
        updateTime: '4-23 14:15',
        section: 'game'
      }
    ])

    const getSectionTitle = () => {
      const titles = {
        focus: '聚焦热点',
        forum: '论坛话题',
        blog: '博客文章',
        tribe: '部落动态',
        mall: '来吧推荐',
        qa: '问答精选',
        game: '游戏天地',
        brand: '品牌展示',
        shop: '购物推荐'
      }
      return titles[activeSection.value] || '论坛话题'
    }

    const getTopicsBySection = () => {
      if (activeSection.value === 'forum') {
        return topics.filter(topic => topic.section === 'forum')
      } else if (activeSection.value === 'blog') {
        return topics.filter(topic => topic.section === 'blog')
      } else if (activeSection.value === 'game') {
        return topics.filter(topic => topic.section === 'game')
      } else {
        // 其他分类显示所有话题
        return topics
      }
    }

    const selectTopic = (topic) => {
      selectedTopic.value = topic
      console.log('选中话题:', topic.title)
    }

    onMounted(() => {
      console.log('天涯博客应用已启动')
    })

    return {
      activeSection,
      showLogin,
      showRegister,
      selectedTopic,
      stats,
      topics,
      getSectionTitle,
      getTopicsBySection,
      selectTopic
    }
  }
}
</script>

<style>
/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  min-width: 300px;
  text-align: center;
}

.modal h3 {
  margin-bottom: 20px;
  color: #333;
}

.modal button {
  background: #4a90e2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.modal button:hover {
  background: #357abd;
}
</style>
