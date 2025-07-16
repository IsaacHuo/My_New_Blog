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
        <p>JavaScript的异步编程是现代前端开发中不可或缺的技能。从回调函数到Promise，再到async/await，JavaScript异步编程经历了巨大的发展。本文将带您深入了解JavaScript异步编程的发展历程和最佳实践。</p>
      </div>

      <div class="content-section">
        <h2>异步编程的发展历程</h2>
        <p>JavaScript异步编程的发展可以分为几个重要阶段：</p>
        
        <h3>1. 回调函数时代</h3>
        <p>最初的异步处理方式，简单但容易陷入回调地狱。</p>
        
        <div class="code-block">
          <div class="code-header">
            <span class="code-title">回调函数示例</span>
            <button class="copy-btn">复制</button>
          </div>
          <pre><code>function fetchData(callback) {
  setTimeout(() => {
    callback(null, 'data from server');
  }, 1000);
}

fetchData((err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
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
          <pre><code>function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('data from server');
    }, 1000);
  });
}

fetchData()
  .then(data => console.log(data))
  .catch(err => console.error(err));</code></pre>
        </div>
      </div>

      <div class="content-section">
        <h2>async/await：现代异步编程</h2>
        <p>ES2017引入的async/await语法使得异步代码看起来像同步代码，大大提高了代码的可读性。</p>
        
        <div class="code-block">
          <div class="code-header">
            <span class="code-title">async/await示例</span>
            <button class="copy-btn">复制</button>
          </div>
          <pre><code>async function fetchUserData() {
  try {
    const user = await fetch('/api/user');
    const userData = await user.json();
    const posts = await fetch(`/api/posts/${userData.id}`);
    const postsData = await posts.json();
    
    return { user: userData, posts: postsData };
  } catch (error) {
    console.error('Failed to fetch data:', error);
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
              <h4>错误处理</h4>
              <p>在async/await中使用try-catch，在Promise中使用.catch()处理错误。</p>
            </div>
          </div>
          <div class="practice-item">
            <div class="practice-icon">⚡</div>
            <div class="practice-content">
              <h4>并发处理</h4>
              <p>使用Promise.all()处理并发异步操作，提高性能。</p>
            </div>
          </div>
          <div class="practice-item">
            <div class="practice-icon">🔄</div>
            <div class="practice-content">
              <h4>避免阻塞</h4>
              <p>合理使用异步操作，避免阻塞主线程。</p>
            </div>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h2>总结</h2>
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
      { id: 'section1', title: '前言', href: '#section1' },
      { id: 'section2', title: '异步编程的发展历程', href: '#section2' },
      { id: 'section3', title: 'async/await：现代异步编程', href: '#section3' },
      { id: 'section4', title: '最佳实践', href: '#section4' },
      { id: 'section5', title: '总结', href: '#section5' }
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
