# 霍玮放的博客 - 项目结构说明

## 📁 项目文件结构

```
src/
├── components/          # 可复用组件
│   ├── ContactModal.vue    # 联系方式模态框组件
│   ├── SiteFooter.vue      # 网站页脚组件
│   └── TopNavigation.vue   # 顶部导航组件
├── views/               # 页面组件
│   ├── Home.vue            # 首页
│   ├── TechArticles.vue    # 技术文章列表页
│   ├── ProjectShare.vue    # 项目分享页面
│   ├── LifeThoughts.vue    # 生活杂想页面
│   ├── AboutMe.vue         # 关于我页面
│   ├── MyWishes.vue        # 我的愿望页面
│   └── ArticleDetail.vue   # 文章详情页
├── styles/              # 样式文件
│   ├── style.css           # 主样式文件
│   ├── style-final.css     # 最终版样式
│   ├── style-new.css       # 新版样式
│   └── style-old.css       # 旧版样式
├── utils/               # 工具函数
│   └── helpers.js          # 通用辅助函数
├── MainApp.vue          # 主应用组件（路由容器）
├── main.js              # 应用入口文件
└── router.js            # 路由配置文件
```

## 🎯 文件夹作用说明

### `/components/`
存放可复用的Vue组件，这些组件可以在多个页面中使用：
- `ContactModal.vue` - 联系方式弹窗
- `SiteFooter.vue` - 页脚组件
- `TopNavigation.vue` - 顶部导航栏

### `/views/`
存放页面级别的Vue组件，每个文件对应一个路由页面：
- `Home.vue` - 博客首页，展示文章列表和分类
- `TechArticles.vue` - 技术文章专题页面
- `ProjectShare.vue` - 项目分享页面
- `LifeThoughts.vue` - 生活杂想页面
- `AboutMe.vue` - 个人介绍页面
- `MyWishes.vue` - 个人愿望清单页面
- `ArticleDetail.vue` - 文章详情页面

### `/styles/`
存放CSS样式文件：
- `style.css` - 主要样式文件，包含全局样式和组件样式
- 其他样式文件为不同版本的样式备份

### `/utils/`
存放工具函数和辅助方法：
- `helpers.js` - 包含日期格式化、数字格式化、分享功能等通用函数

## 🔧 技术栈

- **Vue 3** - 前端框架，使用组合式 API
- **Vue Router** - 路由管理
- **Vite** - 构建工具
- **CSS3** - 样式设计，支持渐变、动画、响应式布局

## 📱 功能特性

1. **响应式设计** - 支持桌面端和移动端
2. **分类浏览** - 技术文章、项目分享、生活杂想等分类
3. **文章详情** - 支持评论、点赞、分享功能
4. **个人展示** - 关于我、愿望清单等个人信息页面
5. **美观UI** - 统一的设计风格，圆角、阴影、渐变效果

## 🚀 路由配置

```javascript
/ - 首页
/tech - 技术文章列表
/projects - 项目分享
/life - 生活杂想
/about - 关于我
/wishes - 我的愿望
/article/:id - 文章详情页
```

## 💡 设计亮点

1. **组件化设计** - 将公共部分提取为独立组件，提高代码复用性
2. **文件分类清晰** - 按功能分类组织文件，便于维护和扩展
3. **工具函数封装** - 将通用功能封装为工具函数，提高代码质量
4. **统一UI风格** - 所有页面保持一致的视觉风格和交互体验
5. **现代化技术栈** - 使用Vue 3最新特性，提供优秀的开发体验

这个文件结构为项目提供了良好的可维护性和可扩展性，便于后续功能的添加和代码的维护。
