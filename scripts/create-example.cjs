#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// 创建示例文章
const createExampleArticle = () => {
  const exampleContent = `---
id: 1_3
title: 文章管理系统使用教程
author: 霍玮放
date: 2025年7月17日
category: 技术随笔
tags: ["Node.js", "工具", "博客系统"]
summary: 介绍如何使用新开发的文章管理系统来高效地创作和发布博客文章
---

# 文章管理系统使用教程

## 前言

随着博客内容的增多，手动创建和管理文章变得越来越繁琐。为了提高写作效率，我开发了这个文章管理系统，可以自动化处理从Markdown到Vue组件的整个工作流。

## 主要功能

:::feature-list
- 📝 | 交互式创建 | 通过命令行交互式创建新文章
- 🔄 | 自动转换 | 将Markdown自动转换为Vue组件
- 📁 | 文件管理 | 自动管理文件夹结构和命名规则
- 🎨 | 语法高亮 | 支持代码语法高亮和自定义组件
:::

## 使用流程

### 1. 启动系统

有多种方式启动文章管理系统：

\`\`\`bash
# 方式一：使用npm命令
npm run article

# 方式二：直接运行脚本
./scripts/start-article-manager.sh

# 方式三：使用Node.js
node scripts/article-manager.cjs
\`\`\`

### 2. 创建新文章

选择"创建新文章"选项后，系统会引导您完成以下步骤：

1. **选择分类**：技术随笔(1)、项目分享(2)、生活杂想(3)
2. **输入文章信息**：标题、作者、摘要、标签
3. **确认创建**：系统自动生成Markdown模板文件

### 3. 编写内容

使用您喜欢的编辑器打开生成的Markdown文件，支持以下扩展语法：

:::practice-list
- 🎯 | 标准Markdown | 支持所有标准Markdown语法
- 🧩 | 自定义组件 | 特性列表、实践列表、高亮框等
- 💡 | 语法高亮 | JavaScript、Vue、CSS等语言高亮
- 🖼️ | 媒体支持 | 图片、链接等媒体内容
:::

### 4. 转换发布

编写完成后，选择"转换Markdown为Vue组件"：

\`\`\`javascript
// 系统会自动生成如下Vue组件结构
export default {
  name: 'TechArticle3',
  components: {
    ArticleDetailLayout
  },
  setup() {
    const article = reactive({
      id: 3,
      title: '文章管理系统使用教程',
      author: '霍玮放',
      // ...更多属性
    })
    
    return {
      article,
      tableOfContents,
      relatedArticles
    }
  }
}
\`\`\`

## 高级特性

:::highlight
# 自动化优势
这个系统的最大优势是实现了完全自动化的工作流，从创建到发布只需几分钟时间。
:::

### 文件命名规则

- **技术随笔**: 1_1, 1_2, 1_3...
- **项目分享**: 2_1, 2_2, 2_3...
- **生活杂想**: 3_1, 3_2, 3_3...

### 自定义组件语法

系统支持多种自定义组件，让文章内容更加丰富：

\`\`\`markdown
:::feature-list
- 🎯 | 标题 | 描述内容
:::

:::practice-list  
- 💡 | 最佳实践 | 实践说明
:::

:::highlight
# 重要提示
高亮显示的重要信息
:::
\`\`\`

## 总结

通过这个文章管理系统，我们实现了：

1. **提高效率**：从创建到发布的全流程自动化
2. **规范管理**：统一的文件结构和命名规则
3. **增强体验**：丰富的Markdown扩展语法
4. **简化操作**：友好的命令行交互界面

这个系统大大简化了博客文章的创作和发布流程，让我们能够专注于内容本身而非技术细节。

---

*通过 [文章管理系统](https://github.com/IsaacHuo/My_New_Blog) 创建和发布。*`

  // 确保目录存在
  const techDir = path.join(__dirname, '..', 'articles', 'tech')
  if (!fs.existsSync(techDir)) {
    fs.mkdirSync(techDir, { recursive: true })
  }

  // 写入示例文件
  const examplePath = path.join(techDir, '1_3_article-management-system.md')
  fs.writeFileSync(examplePath, exampleContent, 'utf8')

  console.log('✅ 成功创建示例文章:', examplePath)
  return examplePath
}

// 如果直接运行此脚本
if (require.main === module) {
  console.log('🚀 创建示例文章...')
  const examplePath = createExampleArticle()
  console.log('📝 示例文章已创建，您可以:')
  console.log('1. 查看文件:', examplePath)
  console.log('2. 运行 npm run article 来转换为Vue组件')
}

module.exports = { createExampleArticle }
