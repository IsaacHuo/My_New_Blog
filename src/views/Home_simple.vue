<template>
  <div class="container">
    <h1>首页</h1>
    <p>测试页面加载</p>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Home',
  setup() {
    const message = ref('Hello World')
    
    return {
      message
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
