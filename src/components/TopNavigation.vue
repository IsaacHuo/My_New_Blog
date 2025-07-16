<template>
  <header class="top-nav">
    <div class="nav-content">
      <div class="logo-centered">
        霍玮放的博客
      </div>
      <div class="user-actions">
        <button @click="goHome" class="contact-btn">返回首页</button>
        <button @click="$emit('showContact')" class="contact-btn">联系我</button>
      </div>
    </div>
  </header>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'TopNavigation',
  emits: ['showContact'],
  setup() {
    const router = useRouter()

    const goHome = () => {
      router.push('/')
    }

    return {
      goHome
    }
  }
}
</script>

<style scoped>
/* 顶部导航样式 */
.top-nav {
  background: linear-gradient(to bottom, #3b82f6 0%, #2563eb 100%);
  border-top: 3px solid #1d4ed8;
  border-bottom: 3px solid #1d4ed8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.logo-centered {
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.user-actions {
  display: flex;
  gap: 10px;
}

.contact-btn {
  background: linear-gradient(to bottom, #60a5fa 0%, #3b82f6 100%);
  color: white;
  border: 1px solid #1d4ed8;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.contact-btn:hover {
  background: linear-gradient(to bottom, #93c5fd 0%, #60a5fa 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.2);
}
</style>
