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
          <span class="breadcrumb-current">关于我</span>
        </div>
      </div>
    </section>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 个人介绍区域 -->
      <div class="articles-container">
        <!-- 个人简介 -->
        <div class="about-section intro-section">
          <div class="section-header">
            <h2 class="section-title">👨‍💻 个人简介</h2>
          </div>
          <div class="section-content">
            <div class="intro-card">
              <div class="avatar-container">
                <div class="avatar">👨‍💻</div>
                <h3 class="name">霍玮放</h3>
                <p class="title">全栈开发工程师</p>
              </div>
              <div class="intro-text">
                <p>大家好，我是霍玮放，一名热爱技术的全栈开发工程师。</p>
                <p>专注于前端开发，同时也涉足后端技术。喜欢探索新技术，分享学习心得，记录生活点滴。</p>
                <p>相信技术改变生活，用代码创造价值。希望通过这个博客与大家交流学习，共同进步。</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 技能专长 -->
        <div class="about-section skills-section">
          <div class="section-header">
            <h2 class="section-title">🚀 技能专长</h2>
          </div>
          <div class="section-content">
            <div class="skills-grid">
              <div v-for="skill in skills" :key="skill.category" class="skill-category">
                <h4 class="skill-category-title">{{ skill.category }}</h4>
                <div class="skill-items">
                  <div v-for="item in skill.items" :key="item.name" class="skill-item">
                    <span class="skill-name">{{ item.name }}</span>
                    <div class="skill-level">
                      <div class="skill-bar" :style="{ width: item.level + '%' }"></div>
                    </div>
                    <span class="skill-percentage">{{ item.level }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 工作经历 -->
        <div class="about-section experience-section">
          <div class="section-header">
            <h2 class="section-title">💼 工作经历</h2>
          </div>
          <div class="section-content">
            <div class="timeline">
              <div v-for="exp in experiences" :key="exp.id" class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <div class="exp-header">
                    <h4 class="exp-title">{{ exp.position }}</h4>
                    <span class="exp-company">{{ exp.company }}</span>
                  </div>
                  <div class="exp-period">{{ exp.period }}</div>
                  <div class="exp-description">
                    <p v-for="desc in exp.description" :key="desc">{{ desc }}</p>
                  </div>
                  <div class="exp-technologies">
                    <span v-for="tech in exp.technologies" :key="tech" class="tech-tag">{{ tech }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 教育背景 -->
        <div class="about-section education-section">
          <div class="section-header">
            <h2 class="section-title">🎓 教育背景</h2>
          </div>
          <div class="section-content">
            <div v-for="edu in education" :key="edu.id" class="education-item">
              <div class="edu-icon">🏫</div>
              <div class="edu-info">
                <h4 class="edu-school">{{ edu.school }}</h4>
                <p class="edu-major">{{ edu.major }}</p>
                <span class="edu-period">{{ edu.period }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 侧边栏 -->
      <aside class="sidebar">
        <div class="sidebar-section">
          <div class="sidebar-header">联系方式</div>
          <div class="sidebar-content">
            <div class="contact-list">
              <div v-for="contact in contacts" :key="contact.type" class="contact-item">
                <span class="contact-icon">{{ contact.icon }}</span>
                <div class="contact-info">
                  <div class="contact-type">{{ contact.type }}</div>
                  <div class="contact-value">{{ contact.value }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-header">个人标签</div>
          <div class="sidebar-content">
            <div class="tag-cloud">
              <span v-for="tag in personalTags" :key="tag" class="personal-tag">{{ tag }}</span>
            </div>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-header">兴趣爱好</div>
          <div class="sidebar-content">
            <div class="hobbies-list">
              <div v-for="hobby in hobbies" :key="hobby.name" class="hobby-item">
                <span class="hobby-icon">{{ hobby.icon }}</span>
                <span class="hobby-name">{{ hobby.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-header">博客统计</div>
          <div class="sidebar-content">
            <div class="stats-list">
              <div v-for="stat in blogStats" :key="stat.label" class="stat-item">
                <span class="stat-value">{{ stat.value }}</span>
                <span class="stat-label">{{ stat.label }}</span>
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
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AboutMe',
  setup() {
    const router = useRouter()
    const showContact = ref(false)

    const skills = reactive([
      {
        category: '前端技术',
        items: [
          { name: 'JavaScript', level: 90 },
          { name: 'Vue.js', level: 85 },
          { name: 'React', level: 80 },
          { name: 'TypeScript', level: 75 },
          { name: 'CSS/SCSS', level: 85 }
        ]
      },
      {
        category: '后端技术',
        items: [
          { name: 'Node.js', level: 80 },
          { name: 'Python', level: 70 },
          { name: 'Express', level: 75 },
          { name: 'MongoDB', level: 70 },
          { name: 'MySQL', level: 65 }
        ]
      },
      {
        category: '开发工具',
        items: [
          { name: 'Git', level: 85 },
          { name: 'Webpack', level: 75 },
          { name: 'Vite', level: 80 },
          { name: 'Docker', level: 60 },
          { name: 'VS Code', level: 95 }
        ]
      }
    ])

    const experiences = reactive([
      {
        id: 1,
        position: '高级前端开发工程师',
        company: '某科技有限公司',
        period: '2023.03 - 至今',
        description: [
          '负责公司主要产品的前端开发工作，使用 Vue3 + TypeScript 技术栈',
          '优化前端性能，提升用户体验，页面加载速度提升 30%',
          '参与技术架构设计，制定前端开发规范和最佳实践'
        ],
        technologies: ['Vue.js', 'TypeScript', 'Vite', 'Element Plus']
      },
      {
        id: 2,
        position: '前端开发工程师',
        company: '互联网创业公司',
        period: '2021.06 - 2023.02',
        description: [
          '独立完成多个项目的前端开发，从0到1搭建前端工程',
          '负责移动端H5页面开发，兼容性处理和性能优化',
          '与后端工程师协作，定义API接口规范'
        ],
        technologies: ['React', 'JavaScript', 'Webpack', 'Ant Design']
      },
      {
        id: 3,
        position: 'Web开发实习生',
        company: '某软件公司',
        period: '2020.07 - 2021.05',
        description: [
          '参与公司官网和管理系统的开发维护',
          '学习前端开发技术栈，快速上手项目开发',
          '协助测试和bug修复工作'
        ],
        technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery']
      }
    ])

    const education = reactive([
      {
        id: 1,
        school: '某某大学',
        major: '计算机科学与技术 本科',
        period: '2017.09 - 2021.06'
      }
    ])

    const contacts = reactive([
      { type: '邮箱', icon: '📧', value: '2210286979@qq.com' },
      { type: 'GitHub', icon: '🐙', value: 'github.com/IsaacHuo' },
      { type: 'QQ群', icon: '🐧', value: '105653726' },
      { type: '微信', icon: '💬', value: '请邮件联系' }
    ])

    const personalTags = reactive([
      '代码爱好者', '终身学习者', '开源贡献者', '技术分享者',
      '咖啡重度依赖', '夜猫子程序员', '效率工具控', '简约主义者'
    ])

    const hobbies = reactive([
      { name: '编程', icon: '💻' },
      { name: '阅读', icon: '📚' },
      { name: '音乐', icon: '🎵' },
      { name: '摄影', icon: '📷' },
      { name: '旅行', icon: '✈️' },
      { name: '健身', icon: '💪' }
    ])

    const blogStats = reactive([
      { label: '文章总数', value: '45' },
      { label: '总访问量', value: '12.5K' },
      { label: '评论数', value: '328' },
      { label: '点赞数', value: '756' }
    ])

    const goHome = () => {
      router.push('/')
    }

    onMounted(() => {
      console.log('关于我页面已加载')
    })

    return {
      showContact,
      skills,
      experiences,
      education,
      contacts,
      personalTags,
      hobbies,
      blogStats,
      goHome
    }
  }
}
</script>

<style scoped>
@import '../styles/style.css';

/* 关于我页面特定样式 */
.about-section {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.08);
}

.section-header {
  background: linear-gradient(to bottom, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 15px 20px;
}

.section-title {
  font-size: 18px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-content {
  padding: 25px;
  background: #f8fafc;
}

/* 个人简介 */
.intro-card {
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

.avatar-container {
  text-align: center;
  min-width: 150px;
}

.avatar {
  font-size: 80px;
  margin-bottom: 15px;
}

.name {
  font-size: 24px;
  color: #1f2937;
  margin: 0 0 5px 0;
}

.title {
  color: #6b7280;
  font-size: 14px;
  margin: 0;
}

.intro-text {
  flex: 1;
  line-height: 1.8;
  color: #4b5563;
}

.intro-text p {
  margin-bottom: 15px;
}

/* 技能专长 */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.skill-category {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
}

.skill-category-title {
  color: #1f2937;
  font-size: 16px;
  margin: 0 0 15px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #e2e8f0;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 12px;
}

.skill-name {
  width: 100px;
  color: #4b5563;
  font-size: 14px;
}

.skill-level {
  flex: 1;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.skill-bar {
  height: 100%;
  background: linear-gradient(to right, #3b82f6 0%, #60a5fa 100%);
  transition: width 0.8s ease;
}

.skill-percentage {
  width: 40px;
  text-align: right;
  color: #6b7280;
  font-size: 12px;
}

/* 工作经历 */
.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e2e8f0;
}

.timeline-item {
  position: relative;
  margin-bottom: 30px;
}

.timeline-dot {
  position: absolute;
  left: -38px;
  top: 8px;
  width: 12px;
  height: 12px;
  background: #3b82f6;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 0 0 2px #3b82f6;
}

.timeline-content {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.exp-title {
  color: #1f2937;
  font-size: 16px;
  margin: 0;
}

.exp-company {
  color: #6b7280;
  font-size: 14px;
}

.exp-period {
  color: #3b82f6;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 15px;
}

.exp-description p {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 8px;
  font-size: 14px;
}

.exp-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #f1f5f9;
}

.tech-tag {
  background: #eff6ff;
  color: #3b82f6;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  border: 1px solid #dbeafe;
}

/* 教育背景 */
.education-item {
  display: flex;
  align-items: center;
  gap: 20px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
}

.edu-icon {
  font-size: 40px;
}

.edu-school {
  color: #1f2937;
  font-size: 16px;
  margin: 0 0 5px 0;
}

.edu-major {
  color: #4b5563;
  margin: 0 0 5px 0;
  font-size: 14px;
}

.edu-period {
  color: #3b82f6;
  font-size: 13px;
  font-weight: 600;
}

/* 侧边栏联系方式 */
.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
  padding: 10px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

.contact-icon {
  font-size: 20px;
}

.contact-type {
  color: #6b7280;
  font-size: 12px;
}

.contact-value {
  color: #1f2937;
  font-size: 13px;
  font-weight: 600;
}

/* 个人标签 */
.personal-tag {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  color: #3b82f6;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  border: 1px solid #bfdbfe;
  margin: 4px;
  display: inline-block;
  cursor: pointer;
  transition: all 0.2s ease;
}

.personal-tag:hover {
  background: #3b82f6;
  color: white;
}

/* 兴趣爱好 */
.hobby-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 8px 12px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.hobby-item:hover {
  background: #f8fafc;
  border-color: #3b82f6;
}

.hobby-icon {
  font-size: 18px;
}

.hobby-name {
  color: #4b5563;
  font-size: 13px;
}

/* 博客统计 */
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  margin-bottom: 10px;
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #3b82f6;
  margin-bottom: 5px;
}

.stat-label {
  color: #6b7280;
  font-size: 12px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .intro-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .exp-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .education-item {
    flex-direction: column;
    text-align: center;
  }
}
</style>
