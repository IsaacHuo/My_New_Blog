import { defineStore } from 'pinia'
import { articlesData, getAllArticles, getArticlesByCategory, getArticleById, updateArticle, deleteArticle, getPopularArticles } from '../data/articles.js'

export const useArticlesStore = defineStore('articles', {
  state: () => ({
    articles: articlesData
  }),

  getters: {
    // 获取所有文章的扁平化数组
    allArticles: (state) => {
      return getAllArticles()
    },

    // 获取热门文章
    popularArticles: (state) => {
      return getPopularArticles()
    },

    // 根据分类获取文章
    getByCategory: (state) => {
      return (category) => getArticlesByCategory(category)
    },

    // 根据ID和分类获取单篇文章
    getById: (state) => {
      return (category, id) => getArticleById(category, id)
    },

    // 获取文章总数
    totalCount: (state) => {
      return Object.values(state.articles).reduce((total, categoryArticles) => {
        return total + categoryArticles.length
      }, 0)
    },

    // 根据分类获取文章数量
    getCountByCategory: (state) => {
      return (category) => {
        return state.articles[category]?.length || 0
      }
    }
  },

  actions: {
    // 更新文章
    updateArticle(category, articleData) {
      updateArticle(category, articleData)
    },

    // 删除文章
    deleteArticle(category, id) {
      deleteArticle(category, id)
    },

    // 增加阅读量
    incrementReadCount(category, id) {
      const article = getArticleById(category, id)
      if (article) {
        article.readCount += 1
      }
    },

    // 切换点赞状态
    toggleLike(category, id) {
      const article = getArticleById(category, id)
      if (article) {
        article.likes = (article.likes || 0) + 1
      }
    },

    // 批量导入文章数据
    importArticles(newArticles) {
      Object.keys(newArticles).forEach(category => {
        if (this.articles[category]) {
          this.articles[category] = newArticles[category]
        }
      })
    },

    // 从Markdown文件数据同步文章信息
    syncFromMarkdown(category, id, markdownData) {
      const article = getArticleById(category, id)
      if (article) {
        // 更新可以从Markdown获取的字段
        if (markdownData.title) article.title = markdownData.title
        if (markdownData.summary) article.summary = markdownData.summary
        if (markdownData.tags) article.tags = markdownData.tags
        if (markdownData.date) article.date = markdownData.date
        if (markdownData.category) article.category = markdownData.category
      }
    }
  }
})
