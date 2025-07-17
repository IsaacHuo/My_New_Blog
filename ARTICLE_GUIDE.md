# 📝 文章管理系统使用指南

这是一个为霍玮放博客定制的文章撰写和发布系统，支持从Markdown到Vue组件的完整工作流。

## 🚀 快速开始

### 方法一：使用npm命令
```bash
npm run article
```

### 方法二：直接运行脚本
```bash
./scripts/start-article-manager.sh
```

### 方法三：使用Node.js
```bash
node scripts/article-manager.js
```

## 📋 功能特性

### 1. 📝 创建新文章
- 交互式选择文章分类（技术随笔/项目分享/生活杂想）
- 自动生成文章ID（格式：分类编号_序号，如 1_1, 2_3）
- 创建结构化的Markdown模板
- 支持自定义标题、作者、摘要、标签

### 2. 🔄 Markdown转Vue组件
- 自动解析Markdown frontmatter
- 转换为完整的Vue单文件组件
- 支持语法高亮
- 自动生成文章目录
- 生成相关文章推荐

### 3. 📁 文件管理
- 自动创建分类文件夹
- 统一的命名规范
- 查看现有文章列表
- 删除不需要的文章

## 📂 文件结构

```
My_New_Blog/
├── articles/                    # Markdown原始文件
│   ├── tech/                   # 技术随笔
│   │   ├── 1_1_vue3-setup.md
│   │   └── 1_2_javascript-async.md
│   ├── projects/               # 项目分享
│   │   ├── 2_1_blog-system.md
│   │   └── 2_2_ai-chat-mirrors.md
│   └── life/                   # 生活杂想
│       ├── 3_1_work-life-balance.md
│       └── 3_2_learning-notes.md
├── src/views/articles/         # Vue组件
│   ├── tech/
│   │   ├── TechArticle1.vue
│   │   └── TechArticle2.vue
│   ├── projects/
│   │   ├── ProjectArticle1.vue
│   │   └── ProjectArticle2.vue
│   └── life/
│       ├── LifeArticle1.vue
│       └── LifeArticle2.vue
└── scripts/                    # 管理脚本
    ├── article-manager.js      # 主管理脚本
    ├── markdown-parser.js      # Markdown解析器
    └── start-article-manager.sh # 启动脚本
```

## ✏️ Markdown扩展语法

### 基础语法
支持标准Markdown语法：标题、段落、列表、链接、图片、代码块等。

### 扩展组件

#### 特性列表
```markdown
:::feature-list
- 🔄 | ref() | 用于创建响应式的基本数据类型
- ⚛️ | reactive() | 用于创建响应式的对象
- ⚡ | computed() | 用于创建计算属性
:::
```

#### 最佳实践列表
```markdown
:::practice-list
- 🎯 | 逻辑分离 | 将相关的逻辑组合在一起，使代码更易于理解
- 🔄 | 可复用性 | 创建组合式函数来封装可复用的逻辑
- 🛡️ | 类型安全 | 结合TypeScript使用，获得更好的类型推导
:::
```

#### 高亮提示框
```markdown
:::highlight
# 提示
这是一个重要的提示信息，会以特殊样式显示。
:::
```

### Frontmatter格式
每篇文章开头需要包含元数据：

```yaml
---
id: 1_1
title: Vue 3 组合式API详解与实践
author: 霍玮放
date: 2025年7月17日
category: 技术随笔
tags: ["Vue.js", "JavaScript", "前端开发"]
summary: 深入解析Vue 3组合式API的核心概念和实际应用
---
```

## 🔧 使用流程

### 1. 创建新文章
1. 运行 `npm run article`
2. 选择 "创建新文章"
3. 选择文章分类（1=技术随笔, 2=项目分享, 3=生活杂想）
4. 输入文章信息（标题、作者、摘要、标签）
5. 确认创建，系统会生成Markdown模板文件

### 2. 编写文章
1. 使用您喜欢的编辑器打开生成的.md文件
2. 按照Markdown格式编写内容
3. 可以使用扩展语法创建特殊组件

### 3. 转换为Vue组件
1. 运行 `npm run article`
2. 选择 "将Markdown转换为Vue组件"
3. 选择要转换的文件或转换所有文件
4. 系统会自动生成对应的Vue组件

### 4. 更新网站
转换完成后，Vue组件会保存到对应目录，您需要：
1. 如有需要，手动更新路由配置
2. 重新构建和部署网站

## 📝 Markdown模板示例

```markdown
---
id: 1_3
title: 我的新技术文章
author: 霍玮放
date: 2025年7月17日
category: 技术随笔
tags: ["Vue.js", "前端", "教程"]
summary: 这是一篇关于Vue.js的技术分享文章
---

# 我的新技术文章

## 前言

在这里写文章的前言和背景介绍...

## 主要内容

### 核心概念

:::feature-list
- 🔄 | 响应式 | Vue 3的响应式系统更加高效
- ⚡ | 性能 | 更好的运行时性能和更小的包体积
- 🛠️ | 工具 | 更好的TypeScript支持和开发工具
:::

### 最佳实践

:::practice-list
- 📝 | 代码规范 | 遵循Vue官方的编码规范
- 🧪 | 测试 | 编写单元测试保证代码质量
- 📚 | 文档 | 为组件编写详细的文档
:::

### 代码示例

```javascript
import { ref, reactive, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const user = reactive({
      name: 'Isaac',
      age: 25
    })
    
    const doubleCount = computed(() => count.value * 2)
    
    return {
      count,
      user,
      doubleCount
    }
  }
}
```

:::highlight
# 重要提示
记住在使用组合式API时要合理组织代码结构。
:::

## 总结

这里写文章的总结...
```

## 🎯 ID命名规则

- **技术随笔**: 1_1, 1_2, 1_3...
- **项目分享**: 2_1, 2_2, 2_3...
- **生活杂想**: 3_1, 3_2, 3_3...

## 🔍 故障排除

### 常见问题

1. **权限错误**: 确保脚本有执行权限
   ```bash
   chmod +x scripts/start-article-manager.sh
   ```

2. **Node.js未安装**: 请先安装Node.js
   ```bash
   # macOS
   brew install node
   
   # 或下载官方安装包
   # https://nodejs.org/
   ```

3. **文件创建失败**: 检查目录权限和磁盘空间

### 获取帮助

如遇到问题，请：
1. 检查控制台错误信息
2. 确认文件路径和权限
3. 联系开发者：2210286979@qq.com

---

*该系统专为霍玮放博客定制开发，支持高效的文章创作和发布工作流。*
