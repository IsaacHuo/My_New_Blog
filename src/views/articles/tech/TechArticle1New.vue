<template>
  <ArticleDetailLayout 
    :article="article" 
    :category="'tech'"
    :table-of-contents="tableOfContents"
    :related-articles="relatedArticles"
    @like-toggled="onLikeToggled"
  >
    <template #content>
      <div class="content-section">
        <h2>前言</h2>
        <p>Vue 3 的组合式 API（Composition API）是 Vue.js 框架的一个重大更新，它为开发者提供了一种全新的组织组件逻辑的方式。相比于 Vue 2 的选项式 API，组合式 API 提供了更好的逻辑复用、类型推导和更灵活的代码组织方式。</p>
      </div>

      <div class="content-section">
        <h2>组合式 API 的核心概念</h2>
        <p>组合式 API 的核心是 setup() 函数，它是组件初始化时执行的函数，也是使用组合式 API 的入口点。</p>
        
        <h3>setup() 函数</h3>
        <p>setup() 函数在组件创建之前执行，它接收 props 和 context 两个参数。</p>
        
        <div class="code-block">
          <div class="code-header">
            <span class="code-title">基本的 setup 函数</span>
            <button class="copy-btn">复制</button>
          </div>
          <pre><code>import { ref, reactive, computed, onMounted } from 'vue'

export default {
  setup(props, context) {
    // 响应式数据
    const count = ref(0)
    const user = reactive({
      name: 'Isaac',
      age: 25
    })
    
    // 计算属性
    const doubleCount = computed(() => count.value * 2)
    
    // 生命周期钩子
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    // 返回需要在模板中使用的数据和方法
    return {
      count,
      user,
      doubleCount
    }
  }
}</code></pre>
        </div>
      </div>

      <div class="content-section">
        <h2>响应式 API</h2>
        <p>Vue 3 提供了多种创建响应式数据的方法：</p>
        
        <div class="feature-list">
          <div class="feature-item">
            <div class="feature-icon">📦</div>
            <div class="feature-content">
              <h4>ref()</h4>
              <p>用于创建响应式的基本数据类型，返回一个包含 .value 属性的 ref 对象。</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🏗️</div>
            <div class="feature-content">
              <h4>reactive()</h4>
              <p>用于创建响应式的对象，返回对象的响应式代理。</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">⚡</div>
            <div class="feature-content">
              <h4>computed()</h4>
              <p>用于创建计算属性，基于其依赖的响应式数据自动更新。</p>
            </div>
          </div>
        </div>

        <div class="code-block">
          <div class="code-header">
            <span class="code-title">响应式 API 示例</span>
            <button class="copy-btn">复制</button>
          </div>
          <pre><code>// ref - 基本类型
const count = ref(0)
const message = ref('Hello Vue 3')

// reactive - 对象类型
const state = reactive({
  user: {
    name: 'Isaac',
    email: 'isaac@example.com'
  },
  todos: []
})

// computed - 计算属性
const fullName = computed(() => {
  return `${state.user.firstName} ${state.user.lastName}`
})

// watch - 侦听器
watch(count, (newValue, oldValue) => {
  console.log(`count changed from ${oldValue} to ${newValue}`)
})</code></pre>
        </div>
      </div>

      <div class="content-section">
        <h2>组合式函数（Composables）</h2>
        <p>组合式函数是利用 Vue 组合式 API 来封装和复用有状态逻辑的函数。这是组合式 API 最大的优势之一。</p>
        
        <div class="code-block">
          <div class="code-header">
            <span class="code-title">useCounter 组合式函数</span>
            <button class="copy-btn">复制</button>
          </div>
          <pre><code>// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  const isEven = computed(() => count.value % 2 === 0)
  
  return {
    count,
    increment,
    decrement,
    reset,
    isEven
  }
}</code></pre>
        </div>

        <div class="code-block">
          <div class="code-header">
            <span class="code-title">在组件中使用组合式函数</span>
            <button class="copy-btn">复制</button>
          </div>
          <pre><code>// 在组件中使用
import { useCounter } from './composables/useCounter'

export default {
  setup() {
    const { count, increment, decrement, reset, isEven } = useCounter(10)
    
    return {
      count,
      increment,
      decrement,
      reset,
      isEven
    }
  }
}</code></pre>
        </div>
      </div>

      <div class="content-section">
        <h2>最佳实践</h2>
        <div class="practice-list">
          <div class="practice-item">
            <div class="practice-icon">🎯</div>
            <div class="practice-content">
              <h4>逻辑分离</h4>
              <p>将相关的逻辑组合在一起，使代码更易于理解和维护。</p>
            </div>
          </div>
          <div class="practice-item">
            <div class="practice-icon">🔄</div>
            <div class="practice-content">
              <h4>可复用性</h4>
              <p>创建组合式函数来封装可复用的逻辑，提高代码复用率。</p>
            </div>
          </div>
          <div class="practice-item">
            <div class="practice-icon">📝</div>
            <div class="practice-content">
              <h4>类型安全</h4>
              <p>结合 TypeScript 使用，获得更好的类型推导和代码提示。</p>
            </div>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h2>总结</h2>
        <p>Vue 3 的组合式 API 为我们提供了更强大、更灵活的开发体验。通过 setup() 函数、响应式 API 和组合式函数，我们可以编写更模块化、可维护的 Vue 应用。虽然学习曲线可能比选项式 API 稍陡，但掌握后将大大提升开发效率和代码质量。</p>
        
        <div class="highlight-box">
          <h4>💡 提示</h4>
          <p>组合式 API 并不是为了取代选项式 API，而是为了提供更好的逻辑复用和更灵活的代码组织方式。在小型项目中，选项式 API 仍然是一个很好的选择。</p>
        </div>
      </div>
    </template>
  </ArticleDetailLayout>
</template>

<script>
import { reactive } from 'vue'
import ArticleDetailLayout from '../../../components/ArticleDetailLayout.vue'

export default {
  name: 'TechArticle1',
  components: {
    ArticleDetailLayout
  },
  setup() {
    const article = reactive({
      id: 1,
      title: 'Vue 3 组合式API详解与实践',
      author: '霍玮放',
      readCount: 1205,
      likes: 48,
      date: '2025年7月16日',
      category: '前端框架',
      tags: ['Vue.js', 'JavaScript', '前端开发']
    })

    const tableOfContents = [
      { id: 'section1', title: '前言', href: '#section1' },
      { id: 'section2', title: '组合式 API 的核心概念', href: '#section2' },
      { id: 'section3', title: '响应式 API', href: '#section3' },
      { id: 'section4', title: '组合式函数', href: '#section4' },
      { id: 'section5', title: '最佳实践', href: '#section5' },
      { id: 'section6', title: '总结', href: '#section6' }
    ]

    const relatedArticles = [
      { id: 2, title: 'JavaScript异步编程完全指南', date: '07-15' },
      { id: 3, title: 'TypeScript进阶使用技巧', date: '07-14' },
      { id: 4, title: 'React Hooks深度解析', date: '07-13' }
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
</style>
