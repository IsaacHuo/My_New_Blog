<template>
  <footer class="site-footer">
    <div class="footer-simple">
      <p>&copy; 2025 霍玮放的博客. All rights reserved.</p>
      <p>本站已运行 <span class="running-time">{{ runningDays }}</span> 天 | 总访问量 <span class="visit-count">{{ visitCount }}</span></p>
    </div>
  </footer>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'SiteFooter',
  setup() {
    const runningDays = ref(365)
    const visitCount = ref('12.5K')

    onMounted(() => {
      // 计算网站运行天数
      const startDate = new Date('2024-01-01')
      const currentDate = new Date()
      const timeDiff = currentDate.getTime() - startDate.getTime()
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
      runningDays.value = daysDiff
    })

    return {
      runningDays,
      visitCount
    }
  }
}
</script>

<style scoped>
.site-footer {
  background: linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%);
  border-top: 2px solid #cbd5e1;
  padding: 15px 20px;
  text-align: center;
  margin-top: auto;
}

.footer-simple {
  color: #64748b;
  font-size: 13px;
  line-height: 1.6;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-simple p {
  margin: 0;
}

.running-time,
.visit-count {
  color: #3b82f6;
  font-weight: bold;
}
</style>
