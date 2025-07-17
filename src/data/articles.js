import { reactive } from 'vue'

// 统一的文章数据源
export const articlesData = reactive({
  tech: [
    {
      id: 1,
      title: 'Vue 3 组合式API详解与实践',
      summary: '深入探讨 Vue 3 组合式 API 的核心概念、使用方法和最佳实践，帮助开发者更好地理解和应用这一重要特性。',
      author: '霍玮放',
      date: '2025-07-16',
      category: '前端框架',
      readCount: 1205,
      likes: 48,
      tags: ['Vue.js', 'JavaScript', '前端开发'],
      status: '置顶'
    },
    {
      id: 2,
      title: 'test',
      summary: '测试文章内容，包含前言、主要内容和总结等部分。',
      author: '霍玮放',
      date: '2025-07-17',
      category: '技术随笔',
      readCount: 818,
      likes: 29,
      tags: ['sjf'],
      status: '热门'
    }
  ],
  projects: [
    {
      id: 1,
      title: '个人博客系统开发',
      summary: '基于Vue 3和Vite构建的响应式个人博客系统，支持文章管理、搜索功能等。',
      author: '霍玮放',
      date: '2025-07-15',
      category: '全栈开发',
      readCount: 652,
      likes: 23,
      tags: ['Vue.js', 'Vite', '博客'],
      status: '精选'
    }
  ],
  life: [
    {
      id: 1,
      title: '程序员的日常思考',
      summary: '记录作为程序员在日常工作和生活中的一些思考和感悟。',
      author: '霍玮放',
      date: '2025-07-14',
      category: '生活感悟',
      readCount: 345,
      likes: 15,
      tags: ['生活', '思考'],
      status: ''
    }
  ]
})

// 获取所有文章的扁平化数组（用于首页显示）
export const getAllArticles = () => {
  const allArticles = []
  
  Object.keys(articlesData).forEach(category => {
    articlesData[category].forEach(article => {
      allArticles.push({
        ...article,
        categoryType: category,
        // 为了兼容首页的显示格式
        tab: getTabByCategory(article.status)
      })
    })
  })
  
  return allArticles
}

// 根据状态映射到首页的tab
const getTabByCategory = (status) => {
  if (status === '置顶') return 'featured'
  if (status === '热门') return 'popular'
  if (status === '精选') return 'featured'
  return 'latest'
}

// 根据分类获取文章
export const getArticlesByCategory = (category) => {
  return articlesData[category] || []
}

// 根据ID和分类获取单篇文章
export const getArticleById = (category, id) => {
  const articles = articlesData[category] || []
  return articles.find(article => article.id === parseInt(id))
}

// 更新文章数据
export const updateArticle = (category, articleData) => {
  const articles = articlesData[category] || []
  const index = articles.findIndex(article => article.id === articleData.id)
  
  if (index !== -1) {
    // 更新现有文章
    Object.assign(articles[index], articleData)
  } else {
    // 添加新文章
    articles.push(articleData)
  }
}

// 删除文章
export const deleteArticle = (category, id) => {
  const articles = articlesData[category] || []
  const index = articles.findIndex(article => article.id === parseInt(id))
  
  if (index !== -1) {
    articles.splice(index, 1)
  }
}

// 获取热门文章（按阅读量和点赞数排序）
export const getPopularArticles = (limit = 6) => {
  return getAllArticles()
    .sort((a, b) => {
      const scoreA = a.readCount + (a.likes || 0) * 10
      const scoreB = b.readCount + (b.likes || 0) * 10
      return scoreB - scoreA
    })
    .slice(0, limit)
}
