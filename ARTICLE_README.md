# 📝 文章管理系统

霍玮放博客的文章管理和发布系统，支持从Markdown到Vue组件的完整工作流。

## 🚀 快速使用

### 启动文章管理系统
```bash
npm run article
```

### 功能菜单
1. **📝 创建新文章** - 交互式创建Markdown文章模板
2. **🔄 转换为Vue组件** - 将Markdown转换为网站组件
3. **📋 查看现有文章** - 列出所有已创建的文章
4. **🗑️ 删除文章** - 删除不需要的文章文件

## 📂 文件结构
```
articles/                    # Markdown原始文件
├── tech/                   # 技术随笔 (ID: 1_x)
├── projects/               # 项目分享 (ID: 2_x)  
└── life/                   # 生活杂想 (ID: 3_x)

src/views/articles/         # 转换后的Vue组件
├── tech/TechArticle*.vue
├── projects/ProjectArticle*.vue
└── life/LifeArticle*.vue
```

## ✏️ Markdown扩展语法

### 特性列表
```markdown
:::feature-list
- 🔄 | ref() | 用于创建响应式的基本数据类型
- ⚛️ | reactive() | 用于创建响应式的对象
:::
```

### 最佳实践列表  
```markdown
:::practice-list
- 🎯 | 逻辑分离 | 将相关的逻辑组合在一起
- 🔄 | 可复用性 | 创建组合式函数来封装逻辑
:::
```

### 高亮提示框
```markdown
:::highlight
# 重要提示
这里是需要特别注意的内容
:::
```

## 📋 使用流程

1. **创建** → 运行`npm run article`选择创建新文章
2. **编写** → 在生成的.md文件中用Markdown编写内容  
3. **转换** → 再次运行命令选择转换为Vue组件
4. **发布** → 构建并部署网站

## 📖 详细文档

查看 [ARTICLE_GUIDE.md](./ARTICLE_GUIDE.md) 了解完整使用说明。

---

*系统特色：自动ID生成、文件管理、语法高亮、组件转换*
