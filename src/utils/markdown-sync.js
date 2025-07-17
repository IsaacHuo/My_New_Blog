import fs from 'fs'
import path from 'path'

// 解析Markdown文件的frontmatter
export function parseMarkdownFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    
    // 检查是否有frontmatter
    if (!content.startsWith('---')) {
      return null
    }
    
    const endIndex = content.indexOf('---', 3)
    if (endIndex === -1) {
      return null
    }
    
    const frontmatterContent = content.slice(3, endIndex).trim()
    const frontmatter = {}
    
    // 简单解析YAML frontmatter
    frontmatterContent.split('\n').forEach(line => {
      const colonIndex = line.indexOf(':')
      if (colonIndex > 0) {
        const key = line.slice(0, colonIndex).trim()
        const value = line.slice(colonIndex + 1).trim()
        
        // 处理不同类型的值
        if (value.startsWith('[') && value.endsWith(']')) {
          // 数组类型
          frontmatter[key] = value.slice(1, -1).split(',').map(item => item.trim().replace(/['"]/g, ''))
        } else if (value.startsWith('"') && value.endsWith('"')) {
          // 字符串类型
          frontmatter[key] = value.slice(1, -1)
        } else if (!isNaN(value)) {
          // 数字类型
          frontmatter[key] = parseInt(value)
        } else {
          // 默认字符串
          frontmatter[key] = value.replace(/['"]/g, '')
        }
      }
    })
    
    return frontmatter
  } catch (error) {
    console.error('解析Markdown文件失败:', error)
    return null
  }
}

// 生成Vue组件内容
export function generateVueComponent(markdownData, category, id) {
  const categoryDisplayNames = {
    'tech': '技术随笔',
    'projects': '项目分享',
    'life': '生活杂想'
  }

  const template = `<template>
  <ArticleDetailLayout 
    :article="article" 
    :category="'${category}'"
    :table-of-contents="tableOfContents"
    :related-articles="relatedArticles"
    @like-toggled="onLikeToggled"
  >
    <template #content>
      <div class="content-section">
        <h2 id="content">文章内容</h2>
        <p>这里是从Markdown文件生成的内容...</p>
        <!-- 实际内容将由Markdown解析器处理 -->
      </div>
    </template>
  </ArticleDetailLayout>
</template>

<script>
import { reactive } from 'vue'
import ArticleDetailLayout from '../../../components/ArticleDetailLayout.vue'
import { useArticlesStore } from '../../../stores/articles.js'

export default {
  name: '${category.charAt(0).toUpperCase() + category.slice(1)}Article${id}',
  components: {
    ArticleDetailLayout
  },
  setup() {
    const articlesStore = useArticlesStore()
    
    // 从store获取文章数据
    const storeArticle = articlesStore.getById('${category}', ${id})
    
    const article = reactive({
      id: ${id},
      title: '${markdownData.title || '未命名文章'}',
      author: '${markdownData.author || '霍玮放'}',
      readCount: ${markdownData.readCount || 0},
      likes: ${markdownData.likes || 0},
      date: '${markdownData.date || new Date().toISOString().split('T')[0]}',
      category: '${categoryDisplayNames[category]}',
      tags: ${JSON.stringify(markdownData.tags || [])}
    })

    // 同步到store
    if (storeArticle) {
      Object.assign(storeArticle, article)
    }

    const tableOfContents = [
      {
        "id": "content",
        "title": "文章内容"
      }
    ]

    const relatedArticles = [
      {
        "id": 1,
        "title": "相关文章1",
        "date": "07-15"
      },
      {
        "id": 3,
        "title": "相关文章2", 
        "date": "07-14"
      }
    ]

    const onLikeToggled = (newLikes) => {
      console.log('文章点赞数更新:', newLikes)
      articlesStore.toggleLike('${category}', ${id})
    }

    // 增加阅读量
    articlesStore.incrementReadCount('${category}', ${id})

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
</style>`

  return template
}

// 同步Markdown文件到Vue组件
export function syncMarkdownToVue(markdownPath, vuePath) {
  try {
    // 解析Markdown文件
    const markdownData = parseMarkdownFrontmatter(markdownPath)
    if (!markdownData) {
      console.error('无法解析Markdown文件的frontmatter')
      return false
    }

    // 从文件路径获取分类和ID
    const pathParts = markdownPath.split('/')
    const category = pathParts[pathParts.length - 2] // 倒数第二个是分类
    const fileName = pathParts[pathParts.length - 1] // 最后一个是文件名
    const idMatch = fileName.match(/(\d+)_/)
    const id = idMatch ? parseInt(idMatch[1]) : 1

    // 生成Vue组件
    const vueContent = generateVueComponent(markdownData, category, id)
    
    // 写入Vue文件
    fs.writeFileSync(vuePath, vueContent, 'utf-8')
    
    console.log(`✅ 已同步 ${markdownPath} -> ${vuePath}`)
    return true
  } catch (error) {
    console.error('同步失败:', error)
    return false
  }
}

// 监听Markdown文件变化
export function watchMarkdownFiles(articlesDir, srcDir) {
  const categories = ['tech', 'projects', 'life']
  
  categories.forEach(category => {
    const categoryDir = path.join(articlesDir, category)
    const srcCategoryDir = path.join(srcDir, 'views', 'articles', category)
    
    if (fs.existsSync(categoryDir)) {
      fs.watch(categoryDir, (eventType, filename) => {
        if (eventType === 'change' && filename.endsWith('.md')) {
          const markdownPath = path.join(categoryDir, filename)
          const idMatch = filename.match(/(\d+)_/)
          const id = idMatch ? parseInt(idMatch[1]) : 1
          const vueFileName = `${category.charAt(0).toUpperCase() + category.slice(1)}Article${id}.vue`
          const vuePath = path.join(srcCategoryDir, vueFileName)
          
          console.log(`📝 检测到文件变化: ${filename}`)
          syncMarkdownToVue(markdownPath, vuePath)
        }
      })
    }
  })
  
  console.log('🔍 开始监听Markdown文件变化...')
}
