# 个人博客

基于 Vue 3 + Vite 构建的响应式个人博客网站。

**在线访问**: https://isaachuo.github.io/My_New_Blog/

## 功能特性

- 技术文章、项目分享、生活随想三大内容板块
- 响应式设计，支持桌面和移动设备
- 文章搜索和分类浏览
- 个人介绍和联系方式展示
- 心情标签和愿望清单管理

## 技术栈

- Vue 3 - 前端框架
- Vue Router - 路由管理
- Vite - 构建工具
- CSS3 - 样式设计

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 部署

项目配置了 GitHub Actions 自动部署到 GitHub Pages。

1. 推送代码到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages，选择 GitHub Actions 作为部署源
3. 代码推送后将自动触发构建和部署

## 项目结构

```
src/
├── components/     # 公共组件
├── views/         # 页面组件
├── styles/        # 样式文件
└── utils/         # 工具函数
```
