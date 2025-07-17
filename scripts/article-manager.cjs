#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('readline')

// 颜色输出函数
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

// 创建命令行接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// 文章分类配置
const categories = {
  '1': { name: 'tech', displayName: '技术随笔', folder: 'tech' },
  '2': { name: 'projects', displayName: '项目分享', folder: 'projects' },
  '3': { name: 'life', displayName: '生活杂想', folder: 'life' }
}

// 项目根目录
const ROOT_DIR = path.resolve(__dirname, '..')
const ARTICLES_DIR = path.join(ROOT_DIR, 'articles')
const SRC_ARTICLES_DIR = path.join(ROOT_DIR, 'src', 'views', 'articles')

// 数据同步工具
class DataSyncManager {
  constructor() {
    this.articlesDataPath = path.join(ROOT_DIR, 'src', 'data', 'articles.js')
  }

  // 更新统一数据源
  updateArticlesData(category, articleData) {
    try {
      log(`📊 更新 ${category} 分类数据到统一数据源`, 'cyan')
      
      // 读取现有数据文件
      const content = fs.readFileSync(this.articlesDataPath, 'utf-8')
      
      // 简单的字符串替换更新（实际项目中可以使用AST解析）
      const newArticleObject = this.generateArticleObject(articleData)
      
      // 找到对应分类的数组并更新
      const categoryPattern = new RegExp(`(${category}:\\s*\\[)([\\s\\S]*?)(\\]\\s*,)`, 'g')
      
      let updatedContent = content.replace(categoryPattern, (match, start, existing, end) => {
        // 检查文章是否已存在
        if (existing.includes(`id: ${articleData.id},`)) {
          // 更新现有文章
          const articlePattern = new RegExp(`{[^}]*id: ${articleData.id},[^}]*}`, 'g')
          const updatedExisting = existing.replace(articlePattern, newArticleObject)
          return start + updatedExisting + end
        } else {
          // 添加新文章
          const trimmedExisting = existing.trim()
          const separator = trimmedExisting.length > 0 ? ',\n    ' : '\n    '
          return start + trimmedExisting + separator + newArticleObject + '\n  ' + end
        }
      })
      
      fs.writeFileSync(this.articlesDataPath, updatedContent, 'utf-8')
      log(`✅ 已更新统一数据源`, 'green')
      
      return true
    } catch (error) {
      log(`❌ 更新数据源失败: ${error.message}`, 'red')
      return false
    }
  }

  generateArticleObject(articleData) {
    return `{
      id: ${articleData.id},
      title: '${articleData.title}',
      summary: '${articleData.summary}',
      author: '${articleData.author}',
      date: '${articleData.date}',
      category: '${articleData.category}',
      readCount: ${articleData.readCount || Math.floor(Math.random() * 500) + 100},
      likes: ${articleData.likes || Math.floor(Math.random() * 30) + 5},
      tags: ${JSON.stringify(articleData.tags)},
      status: '${articleData.status || ''}'
    }`
  }

  // 同步到所有相关页面
  syncToAllPages(articleData) {
    const pagesToUpdate = [
      { file: 'src/views/Home.vue', type: 'home' },
      { file: `src/views/${this.getCategoryPageName(articleData.category.name)}.vue`, type: 'list' }
    ]
    
    pagesToUpdate.forEach(page => {
      try {
        const filePath = path.join(ROOT_DIR, page.file)
        if (fs.existsSync(filePath)) {
          log(`📝 页面 ${page.file} 将通过统一数据源自动更新`, 'cyan')
        }
      } catch (error) {
        log(`❌ 检查页面失败 ${page.file}: ${error.message}`, 'red')
      }
    })
    
    log(`✅ 所有页面将通过 Pinia store 自动同步更新`, 'green')
  }

  getCategoryPageName(categoryName) {
    const pageMap = {
      'tech': 'TechArticles',
      'projects': 'ProjectShare',
      'life': 'LifeThoughts'
    }
    return pageMap[categoryName] || 'TechArticles'
  }
}

class ArticleManager {
  constructor() {
    this.currentStep = 1
    this.articleData = {}
    this.dataSyncManager = new DataSyncManager()
  }

  async start() {
    log('\n🚀 欢迎使用文章管理系统！', 'cyan')
    log('=====================================', 'cyan')
    
    await this.showMenu()
  }

  async showMenu() {
    log('\n请选择操作：', 'yellow')
    log('1. 📝 创建新文章')
    log('2. 🔄 将Markdown转换为Vue组件')
    log('3. 📋 查看现有文章')
    log('4. 🗑️  删除文章')
    log('5. 🚪 退出')
    
    const choice = await this.askQuestion('\n请输入选项 (1-5): ')
    
    switch(choice) {
      case '1':
        await this.createNewArticle()
        break
      case '2':
        await this.convertMarkdownToVue()
        break
      case '3':
        await this.listArticles()
        break
      case '4':
        await this.deleteArticle()
        break
      case '5':
        log('\n👋 再见！', 'green')
        rl.close()
        return
      default:
        log('\n❌ 无效选项，请重新选择', 'red')
        await this.showMenu()
    }
  }

  async createNewArticle() {
    log('\n📝 创建新文章', 'green')
    log('==================', 'green')
    
    // 步骤1：选择分类
    await this.selectCategory()
    
    // 步骤2：输入文章信息
    await this.inputArticleInfo()
    
    // 步骤3：生成文章ID和文件名
    this.generateArticleId()
    
    // 步骤4：创建Markdown文件
    await this.createMarkdownFile()
    
    // 完成
    await this.onArticleCreated()
  }

  async selectCategory() {
    log('\n选择文章分类：', 'yellow')
    Object.entries(categories).forEach(([key, cat]) => {
      log(`${key}. ${cat.displayName}`)
    })
    
    const categoryChoice = await this.askQuestion('\n请输入分类编号 (1-3): ')
    
    if (!categories[categoryChoice]) {
      log('❌ 无效分类，请重新选择', 'red')
      return await this.selectCategory()
    }
    
    this.articleData.category = categories[categoryChoice]
    log(`✅ 已选择：${this.articleData.category.displayName}`, 'green')
  }

  async inputArticleInfo() {
    log('\n请输入文章信息：', 'yellow')
    
    this.articleData.title = await this.askQuestion('文章标题: ')
    this.articleData.author = await this.askQuestion('作者 (默认: 霍玮放): ') || '霍玮放'
    this.articleData.summary = await this.askQuestion('文章摘要: ')
    
    const tagsInput = await this.askQuestion('标签 (用逗号分隔): ')
    this.articleData.tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag)
    
    log('\n📋 文章信息确认：', 'cyan')
    log(`分类: ${this.articleData.category.displayName}`)
    log(`标题: ${this.articleData.title}`)
    log(`作者: ${this.articleData.author}`)
    log(`摘要: ${this.articleData.summary}`)
    log(`标签: ${this.articleData.tags.join(', ')}`)
    
    const confirm = await this.askQuestion('\n确认创建？(y/n): ')
    if (confirm.toLowerCase() !== 'y') {
      log('❌ 已取消创建', 'red')
      await this.showMenu()
      return
    }
  }

  generateArticleId() {
    const categoryMap = { 'tech': '1', 'projects': '2', 'life': '3' }
    const categoryPrefix = categoryMap[this.articleData.category.name]
    
    // 获取该分类下现有文章数量
    const categoryDir = path.join(ARTICLES_DIR, this.articleData.category.folder)
    const existingFiles = fs.existsSync(categoryDir) ? 
      fs.readdirSync(categoryDir).filter(file => file.endsWith('.md')) : []
    
    const nextNumber = existingFiles.length + 1
    this.articleData.id = `${categoryPrefix}_${nextNumber}`
    this.articleData.filename = `${this.articleData.id}_${this.slugify(this.articleData.title)}.md`
    
    log(`\n🆔 生成文章ID: ${this.articleData.id}`, 'cyan')
    log(`📄 文件名: ${this.articleData.filename}`, 'cyan')
  }

  async createMarkdownFile() {
    const template = this.generateMarkdownTemplate()
    const categoryDir = path.join(ARTICLES_DIR, this.articleData.category.folder)
    
    // 确保目录存在
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true })
    }
    
    const filePath = path.join(categoryDir, this.articleData.filename)
    
    try {
      fs.writeFileSync(filePath, template, 'utf8')
      this.articleData.filePath = filePath
      log(`\n✅ 成功创建Markdown文件: ${filePath}`, 'green')
    } catch (error) {
      log(`❌ 创建文件失败: ${error.message}`, 'red')
      throw error
    }
  }

  generateMarkdownTemplate() {
    const date = new Date().toLocaleDateString('zh-CN')
    
    return `---
id: ${this.articleData.id}
title: ${this.articleData.title}
author: ${this.articleData.author}
date: ${date}
category: ${this.articleData.category.displayName}
tags: [${this.articleData.tags.map(tag => `"${tag}"`).join(', ')}]
summary: ${this.articleData.summary}
---

# ${this.articleData.title}

## 前言

在这里写文章的前言...

## 主要内容

### 子标题1

内容...

### 子标题2

内容...

## 总结

在这里写总结...

---

*本文完整代码和示例可以在 [GitHub](https://github.com/IsaacHuo) 上找到。*
`
  }

  async onArticleCreated() {
    log('\n🎉 文章创建成功！', 'green')
    log('==================', 'green')
    
    log('\n📝 下一步操作：')
    log(`1. 使用您喜欢的编辑器打开文件：`)
    log(`   ${this.articleData.filePath}`, 'cyan')
    log(`2. 编写文章内容（支持Markdown格式）`)
    log(`3. 写完后运行转换命令将Markdown转为Vue组件`)
    
    const openNow = await this.askQuestion('\n是否立即打开文件进行编辑？(y/n): ')
    if (openNow.toLowerCase() === 'y') {
      await this.openFileInEditor()
    }
    
    const convertNow = await this.askQuestion('是否立即转换为Vue组件？(y/n): ')
    if (convertNow.toLowerCase() === 'y') {
      await this.convertSpecificMarkdown(this.articleData.filePath)
    }
    
    // 同步数据到统一数据源和所有页面
    log('\n🔄 正在同步数据...', 'yellow')
    const syncSuccess = this.dataSyncManager.updateArticlesData(this.articleData.category.name, this.articleData)
    if (syncSuccess) {
      this.dataSyncManager.syncToAllPages(this.articleData)
      log('\n✨ 数据同步完成！所有页面将自动显示新文章', 'green')
    }
    
    await this.showMenu()
  }

  async openFileInEditor() {
    const { exec } = require('child_process')
    
    // 尝试不同的编辑器
    const editors = [
      'code',      // VS Code
      'subl',      // Sublime Text
      'atom',      // Atom
      'vim',       // Vim
      'nano'       // Nano
    ]
    
    for (const editor of editors) {
      try {
        exec(`which ${editor}`, (error) => {
          if (!error) {
            exec(`${editor} "${this.articleData.filePath}"`)
            log(`📝 已使用 ${editor} 打开文件`, 'green')
            return
          }
        })
        break
      } catch (error) {
        continue
      }
    }
  }

  async convertMarkdownToVue() {
    log('\n🔄 Markdown转Vue组件', 'green')
    log('=========================', 'green')
    
    // 列出所有Markdown文件
    const allMarkdownFiles = this.getAllMarkdownFiles()
    
    if (allMarkdownFiles.length === 0) {
      log('❌ 没有找到Markdown文件', 'red')
      await this.showMenu()
      return
    }
    
    log('\n请选择要转换的文件：')
    allMarkdownFiles.forEach((file, index) => {
      log(`${index + 1}. ${file.relativePath}`)
    })
    log(`${allMarkdownFiles.length + 1}. 转换所有文件`)
    
    const choice = await this.askQuestion(`\n请输入选项 (1-${allMarkdownFiles.length + 1}): `)
    const choiceNum = parseInt(choice)
    
    if (choiceNum === allMarkdownFiles.length + 1) {
      // 转换所有文件
      for (const file of allMarkdownFiles) {
        await this.convertSpecificMarkdown(file.fullPath)
      }
    } else if (choiceNum >= 1 && choiceNum <= allMarkdownFiles.length) {
      // 转换指定文件
      const selectedFile = allMarkdownFiles[choiceNum - 1]
      await this.convertSpecificMarkdown(selectedFile.fullPath)
    } else {
      log('❌ 无效选项', 'red')
      await this.convertMarkdownToVue()
      return
    }
    
    await this.showMenu()
  }

  getAllMarkdownFiles() {
    const files = []
    
    Object.values(categories).forEach(category => {
      const categoryDir = path.join(ARTICLES_DIR, category.folder)
      if (fs.existsSync(categoryDir)) {
        const markdownFiles = fs.readdirSync(categoryDir)
          .filter(file => file.endsWith('.md'))
          .map(file => ({
            filename: file,
            fullPath: path.join(categoryDir, file),
            relativePath: `${category.folder}/${file}`,
            category: category
          }))
        files.push(...markdownFiles)
      }
    })
    
    return files
  }

  async convertSpecificMarkdown(markdownPath) {
    try {
      log(`\n🔄 正在转换: ${markdownPath}`, 'yellow')
      
      // 读取Markdown文件
      const markdownContent = fs.readFileSync(markdownPath, 'utf8')
      
      // 解析frontmatter和内容
      const { frontmatter, content } = this.parseMarkdown(markdownContent)
      
      // 生成Vue组件
      const vueComponent = this.generateVueComponent(frontmatter, content)
      
      // 确定Vue文件路径
      const vuePath = this.getVueFilePath(markdownPath, frontmatter)
      
      // 确保目录存在
      const vueDir = path.dirname(vuePath)
      if (!fs.existsSync(vueDir)) {
        fs.mkdirSync(vueDir, { recursive: true })
      }
      
      // 写入Vue文件
      fs.writeFileSync(vuePath, vueComponent, 'utf8')
      
      log(`✅ 成功转换为: ${vuePath}`, 'green')
      
      // 同步文章数据到统一数据源
      log('\n🔄 正在同步文章数据...', 'yellow')
      const categoryKey = this.getCategoryKey(frontmatter.category)
      const articleData = {
        id: this.extractIdNumber(frontmatter.id),
        title: frontmatter.title,
        summary: frontmatter.summary,
        author: frontmatter.author,
        date: frontmatter.date,
        category: frontmatter.category,
        tags: frontmatter.tags,
        status: this.getStatusFromMarkdown(frontmatter)
      }
      
      const syncSuccess = this.dataSyncManager.updateArticlesData(categoryKey, articleData)
      if (syncSuccess) {
        this.dataSyncManager.syncToAllPages({ category: { name: categoryKey }, ...articleData })
        log('✨ 数据同步完成！', 'green')
      }
      
      // 更新路由（可选）
      await this.updateRoutes(frontmatter, vuePath)
      
    } catch (error) {
      log(`❌ 转换失败: ${error.message}`, 'red')
      console.error(error)
    }
  }

  parseMarkdown(content) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
    const match = content.match(frontmatterRegex)
    
    if (!match) {
      throw new Error('Markdown文件格式错误：缺少frontmatter')
    }
    
    const frontmatterText = match[1]
    const markdownContent = match[2]
    
    // 简单解析frontmatter（这里可以使用yaml库来更好地解析）
    const frontmatter = {}
    frontmatterText.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':')
      if (key && valueParts.length > 0) {
        let value = valueParts.join(':').trim()
        
        // 处理数组格式的tags
        if (key.trim() === 'tags' && value.startsWith('[') && value.endsWith(']')) {
          value = value.slice(1, -1).split(',').map(tag => 
            tag.trim().replace(/['"]/g, '')
          )
        }
        
        frontmatter[key.trim()] = value
      }
    })
    
    return { frontmatter, content: markdownContent }
  }

  generateVueComponent(frontmatter, markdownContent) {
    // 将Markdown转换为HTML（这里简化处理，实际可以使用marked库）
    const htmlContent = this.markdownToHtml(markdownContent)
    
    // 生成目录
    const tableOfContents = this.generateTableOfContents(markdownContent)
    
    // 生成相关文章（模拟数据）
    const relatedArticles = this.generateRelatedArticles(frontmatter)
    
    return `<template>
  <ArticleDetailLayout 
    :article="article" 
    :category="'${this.getCategoryKey(frontmatter.category)}'"
    :table-of-contents="tableOfContents"
    :related-articles="relatedArticles"
    @like-toggled="onLikeToggled"
  >
    <template #content>
${htmlContent}
    </template>
  </ArticleDetailLayout>
</template>

<script>
import { reactive } from 'vue'
import ArticleDetailLayout from '../../../components/ArticleDetailLayout.vue'

export default {
  name: '${this.generateComponentName(frontmatter)}',
  components: {
    ArticleDetailLayout
  },
  setup() {
    const article = reactive({
      id: ${this.extractIdNumber(frontmatter.id)},
      title: '${frontmatter.title}',
      author: '${frontmatter.author}',
      readCount: ${Math.floor(Math.random() * 1000) + 100},
      likes: ${Math.floor(Math.random() * 50) + 5},
      date: '${frontmatter.date}',
      category: '${frontmatter.category}',
      tags: ${JSON.stringify(frontmatter.tags)}
    })

    const tableOfContents = ${JSON.stringify(tableOfContents, null, 6)}

    const relatedArticles = ${JSON.stringify(relatedArticles, null, 6)}

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
`
  }

  markdownToHtml(markdown) {
    // 简化的Markdown到HTML转换
    let html = markdown
    
    // 处理标题
    html = html.replace(/^### (.*$)/gm, '        <h3 id="$1">$1</h3>')
    html = html.replace(/^## (.*$)/gm, '      <div class="content-section">\n        <h2 id="$1">$1</h2>')
    
    // 处理段落
    html = html.replace(/^(?!.*<\/h[1-6]>)(.+)$/gm, (match, p1) => {
      if (p1.trim() && !p1.includes('<') && !p1.includes('```')) {
        return `        <p>${p1}</p>`
      }
      return match
    })
    
    // 处理代码块
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      return `        <div class="code-block">
          <div class="code-header">
            <span class="code-title">${lang || '代码示例'}</span>
            <button class="copy-btn">复制</button>
          </div>
          <pre><code>${this.escapeHtml(code.trim())}</code></pre>
        </div>`
    })
    
    // 处理粗体
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    
    // 处理斜体
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
    
    // 处理链接
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
    
    // 关闭content-section标签
    html = html.replace(/(<h2[^>]*>.*?<\/h2>)/g, '$1') + '\n      </div>'
    
    return html
  }

  escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

  generateTableOfContents(markdown) {
    const toc = []
    const lines = markdown.split('\n')
    
    lines.forEach(line => {
      const h2Match = line.match(/^## (.+)$/)
      const h3Match = line.match(/^### (.+)$/)
      
      if (h2Match) {
        toc.push({ id: h2Match[1], title: h2Match[1] })
      } else if (h3Match) {
        toc.push({ id: h3Match[1], title: h3Match[1] })
      }
    })
    
    return toc
  }

  generateRelatedArticles(frontmatter) {
    // 这里应该根据标签和分类生成相关文章，暂时返回模拟数据
    return [
      { id: Math.floor(Math.random() * 10) + 1, title: '相关文章1', date: '07-15' },
      { id: Math.floor(Math.random() * 10) + 1, title: '相关文章2', date: '07-14' },
      { id: Math.floor(Math.random() * 10) + 1, title: '相关文章3', date: '07-13' }
    ]
  }

  getCategoryKey(categoryDisplayName) {
    const reverseMap = {
      '技术随笔': 'tech',
      '项目分享': 'projects',
      '生活杂想': 'life'
    }
    return reverseMap[categoryDisplayName] || 'tech'
  }

  getStatusFromMarkdown(frontmatter) {
    // 根据文章属性判断状态
    if (frontmatter.featured === 'true' || frontmatter.pinned === 'true') {
      return '置顶'
    }
    if (frontmatter.popular === 'true') {
      return '热门'
    }
    return ''
  }

  generateComponentName(frontmatter) {
    const categoryMap = {
      '技术随笔': 'Tech',
      '项目分享': 'Project',
      '生活杂想': 'Life'
    }
    const prefix = categoryMap[frontmatter.category] || 'Tech'
    const number = this.extractIdNumber(frontmatter.id)
    return `${prefix}Article${number}`
  }

  extractIdNumber(id) {
    const match = id.match(/\d+_(\d+)/)
    return match ? match[1] : '1'
  }

  getVueFilePath(markdownPath, frontmatter) {
    const categoryKey = this.getCategoryKey(frontmatter.category)
    const componentName = this.generateComponentName(frontmatter)
    return path.join(SRC_ARTICLES_DIR, categoryKey, `${componentName}.vue`)
  }

  async updateRoutes(frontmatter, vuePath) {
    // 这里可以实现自动更新路由的逻辑
    log('📝 请手动更新路由配置以包含新文章', 'yellow')
  }

  async listArticles() {
    log('\n📋 现有文章列表', 'green')
    log('==================', 'green')
    
    const allFiles = this.getAllMarkdownFiles()
    
    if (allFiles.length === 0) {
      log('📭 暂无文章', 'yellow')
    } else {
      Object.values(categories).forEach(category => {
        const categoryFiles = allFiles.filter(file => file.category.name === category.name)
        if (categoryFiles.length > 0) {
          log(`\n📁 ${category.displayName}:`, 'cyan')
          categoryFiles.forEach(file => {
            log(`  - ${file.filename}`)
          })
        }
      })
    }
    
    await this.showMenu()
  }

  async deleteArticle() {
    log('\n🗑️  删除文章', 'red')
    log('================', 'red')
    
    const allFiles = this.getAllMarkdownFiles()
    
    if (allFiles.length === 0) {
      log('📭 暂无文章可删除', 'yellow')
      await this.showMenu()
      return
    }
    
    log('\n请选择要删除的文章：')
    allFiles.forEach((file, index) => {
      log(`${index + 1}. ${file.relativePath}`)
    })
    
    const choice = await this.askQuestion(`\n请输入选项 (1-${allFiles.length}): `)
    const choiceNum = parseInt(choice)
    
    if (choiceNum >= 1 && choiceNum <= allFiles.length) {
      const selectedFile = allFiles[choiceNum - 1]
      
      const confirm = await this.askQuestion(`\n⚠️  确认删除 "${selectedFile.filename}"？(y/n): `)
      if (confirm.toLowerCase() === 'y') {
        try {
          fs.unlinkSync(selectedFile.fullPath)
          log(`✅ 已删除: ${selectedFile.filename}`, 'green')
        } catch (error) {
          log(`❌ 删除失败: ${error.message}`, 'red')
        }
      } else {
        log('❌ 已取消删除', 'yellow')
      }
    } else {
      log('❌ 无效选项', 'red')
    }
    
    await this.showMenu()
  }

  slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  askQuestion(question) {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer.trim())
      })
    })
  }
}

// 运行程序
if (require.main === module) {
  const manager = new ArticleManager()
  manager.start().catch(error => {
    console.error('程序出错：', error)
    rl.close()
  })
}

module.exports = ArticleManager
