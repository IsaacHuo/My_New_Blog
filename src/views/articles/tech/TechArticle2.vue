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
        <h2 id="section1">前言</h2>
        <p>JavaScript的异步编程是现代前端开发中不可或缺的技能。从回调函数到Promise，再到async/await，JavaScript异步编程经历了巨大的发展。本文将带您深入了解JavaScript异步编程的发展历程和最佳实践。</p>
      </div>

      <div class="content-section">
        <h2 id="section2">异步编程的发展历程</h2>
        <p>JavaScript异步编程的发展可以分为几个重要阶段：</p>
        
        <h3>1. 回调函数时代</h3>
        <p>最初的异步处理方式，简单但容易陷入回调地狱。</p>
        
        <div class="code-block">
          <div class="code-header">
            <span class="code-title">回调函数示例</span>
            <button class="copy-btn">复制</button>
          </div>
          <pre><code><span class="keyword">function</span> <span class="function">fetchData</span>(<span class="variable">callback</span>) {
  <span class="function">setTimeout</span>(() <span class="operator">=></span> {
    <span class="function">callback</span>(<span class="keyword">null</span>, <span class="string">'data from server'</span>);
  }, <span class="number">1000</span>);
}

<span class="function">fetchData</span>((<span class="variable">err</span>, <span class="variable">data</span>) <span class="operator">=></span> {
  <span class="keyword">if</span> (<span class="variable">err</span>) {
    <span class="variable">console</span>.<span class="function">error</span>(<span class="variable">err</span>);
  } <span class="keyword">else</span> {
    <span class="variable">console</span>.<span class="function">log</span>(<span class="variable">data</span>);
  }
});</code></pre>
        </div>

        <h3>2. Promise的出现</h3>
        <p>Promise解决了回调地狱问题，提供了更优雅的异步处理方式。</p>
        
        <div class="code-block">
          <div class="code-header">
            <span class="code-title">Promise示例</span>
            <button class="copy-btn">复制</button>
          </div>
          <pre><code><span class="keyword">function</span> <span class="function">fetchData</span>() {
  <span class="keyword">return</span> <span class="keyword">new</span> <span class="function">Promise</span>((<span class="variable">resolve</span>, <span class="variable">reject</span>) <span class="operator">=></span> {
    <span class="function">setTimeout</span>(() <span class="operator">=></span> {
      <span class="function">resolve</span>(<span class="string">'data from server'</span>);
    }, <span class="number">1000</span>);
  });
}

<span class="function">fetchData</span>()
  .<span class="function">then</span>(<span class="variable">data</span> <span class="operator">=></span> <span class="variable">console</span>.<span class="function">log</span>(<span class="variable">data</span>))
  .<span class="function">catch</span>(<span class="variable">err</span> <span class="operator">=></span> <span class="variable">console</span>.<span class="function">error</span>(<span class="variable">err</span>));</code></pre>
        </div>
      </div>

      <div class="content-section">
        <h2 id="section3">async/await：现代异步编程</h2>
        <p>ES2017引入的async/await语法使得异步代码看起来像同步代码，大大提高了代码的可读性。</p>
        
        <div class="code-block">
          <div class="code-header">
            <span class="code-title">async/await示例</span>
            <button class="copy-btn">复制</button>
          </div>
          <pre><code><span class="keyword">async</span> <span class="keyword">function</span> <span class="function">fetchUserData</span>() {
  <span class="keyword">try</span> {
    <span class="keyword">const</span> <span class="variable">user</span> <span class="operator">=</span> <span class="keyword">await</span> <span class="function">fetch</span>(<span class="string">'/api/user'</span>);
    <span class="keyword">const</span> <span class="variable">userData</span> <span class="operator">=</span> <span class="keyword">await</span> <span class="variable">user</span>.<span class="function">json</span>();
    <span class="keyword">const</span> <span class="variable">posts</span> <span class="operator">=</span> <span class="keyword">await</span> <span class="function">fetch</span>(<span class="string">`/api/posts/${<span class="variable">userData</span>.<span class="property">id</span>}`</span>);
    <span class="keyword">const</span> <span class="variable">postsData</span> <span class="operator">=</span> <span class="keyword">await</span> <span class="variable">posts</span>.<span class="function">json</span>();
    
    <span class="keyword">return</span> { <span class="property">user</span>: <span class="variable">userData</span>, <span class="property">posts</span>: <span class="variable">postsData</span> };
  } <span class="keyword">catch</span> (<span class="variable">error</span>) {
    <span class="variable">console</span>.<span class="function">error</span>(<span class="string">'Failed to fetch data:'</span>, <span class="variable">error</span>);
  }
}</code></pre>
        </div>
      </div>

      <div class="content-section">
        <h2 id="section4">最佳实践</h2>
        <div class="practice-list">
          <div class="practice-item">
            <div class="practice-icon">
              <span class="practice-img">⭐</span>
            </div>
            <div class="practice-content">
              <h4>错误处理</h4>
              <p>在async/await中使用try-catch，在Promise中使用.catch()处理错误。</p>
            </div>
          </div>
          <div class="practice-item">
            <div class="practice-icon">
              <span class="practice-img">⭐</span>
            </div>
            <div class="practice-content">
              <h4>并发处理</h4>
              <p>使用Promise.all()处理并发异步操作，提高性能。</p>
            </div>
          </div>
          <div class="practice-item">
            <div class="practice-icon">
              <span class="practice-img">⭐</span>
            </div>
            <div class="practice-content">
              <h4>避免阻塞</h4>
              <p>合理使用异步操作，避免阻塞主线程。</p>
            </div>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h2 id="section5">总结</h2>
        <p>异步编程是JavaScript的核心特性之一，掌握现代异步编程技术对于前端开发者来说至关重要。从回调函数到Promise，再到async/await，每一次进步都让我们的代码更加优雅和易维护。</p>
      </div>
    </template>
  </ArticleDetailLayout>
</template>

<script>
import { reactive } from 'vue'
import ArticleDetailLayout from '../../../components/ArticleDetailLayout.vue'

export default {
  name: 'TechArticle2',
  components: {
    ArticleDetailLayout
  },
  setup() {
    const article = reactive({
      id: 2,
      title: 'JavaScript异步编程完全指南',
      author: '霍玮放',
      readCount: 892,
      likes: 35,
      date: '2025年7月15日',
      category: '编程语言',
      tags: ['JavaScript', '异步编程', 'Promise', 'async/await']
    })

    const tableOfContents = [
      { id: 'section1', title: '前言' },
      { id: 'section2', title: '异步编程的发展历程' },
      { id: 'section3', title: 'async/await：现代异步编程' },
      { id: 'section4', title: '最佳实践' },
      { id: 'section5', title: '总结' }
    ]

    const relatedArticles = [
      { id: 1, title: 'Vue 3 组合式API详解与实践', date: '07-16' },
      { id: 3, title: 'TypeScript进阶使用技巧', date: '07-14' },
      { id: 5, title: 'ES6+新特性详解', date: '07-12' }
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
