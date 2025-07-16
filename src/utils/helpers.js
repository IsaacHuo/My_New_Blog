// 格式化日期
export const formatDate = (date) => {
  if (typeof date === 'string') {
    return date
  }
  
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  
  return `${year}-${month}-${day}`
}

// 检查文章是否有详情页
export const hasArticleDetail = (category, articleId) => {
  // 定义存在详情页的文章
  const existingArticles = {
    'tech': [1, 2], // 技术文章只有 ID 1 和 2 有详情页
    'projects': [1], // 项目分享只有 ID 1 有详情页
    'life': [1] // 生活杂想只有 ID 1 有详情页
  }
  
  return existingArticles[category] && existingArticles[category].includes(articleId)
}

// 格式化中文日期
export const formatChineseDate = (date) => {
  if (typeof date === 'string') {
    return date
  }
  
  const d = new Date(date)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  
  return `${year}年${month}月${day}日`
}

// 计算阅读时间
export const calculateReadTime = (content) => {
  const wordsPerMinute = 200
  const wordCount = content.length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} 分钟阅读`
}

// 格式化数字（如阅读量）
export const formatNumber = (num) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

// 复制到剪贴板
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    // 降级方案
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    return true
  }
}

// 分享文章
export const shareArticle = async (title, text, url) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url
      })
      return true
    } catch (err) {
      console.log('分享被取消')
      return false
    }
  } else {
    // 降级到复制链接
    const success = await copyToClipboard(url)
    if (success) {
      alert('链接已复制到剪贴板')
    }
    return success
  }
}

// 生成文章摘要
export const generateSummary = (content, maxLength = 100) => {
  const plainText = content.replace(/<[^>]*>/g, '').trim()
  if (plainText.length <= maxLength) {
    return plainText
  }
  return plainText.substring(0, maxLength) + '...'
}

// 获取相对时间
export const getRelativeTime = (date) => {
  const now = new Date()
  const target = new Date(date)
  const diffTime = Math.abs(now - target)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    return '今天'
  } else if (diffDays === 1) {
    return '昨天'
  } else if (diffDays <= 7) {
    return `${diffDays} 天前`
  } else if (diffDays <= 30) {
    const weeks = Math.floor(diffDays / 7)
    return `${weeks} 周前`
  } else if (diffDays <= 365) {
    const months = Math.floor(diffDays / 30)
    return `${months} 个月前`
  } else {
    const years = Math.floor(diffDays / 365)
    return `${years} 年前`
  }
}
