#!/bin/bash

# 文章管理系统启动脚本
echo "🚀 启动文章管理系统..."
echo "================================"

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误：未找到Node.js，请先安装Node.js"
    exit 1
fi

# 运行文章管理器
node scripts/article-manager.cjs
