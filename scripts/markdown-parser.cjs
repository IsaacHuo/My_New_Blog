const fs = require('fs')
const path = require('path')

class MarkdownParser {
  constructor() {
    this.componentTemplates = {
      featureList: this.generateFeatureList.bind(this),
      codeBlock: this.generateCodeBlock.bind(this),
      highlightBox: this.generateHighlightBox.bind(this),
      practiceList: this.generatePracticeList.bind(this)
    }
  }

  parseMarkdown(content) {
    let html = content

    // 处理自定义组件
    html = this.parseCustomComponents(html)
    
    // 处理标题
    html = this.parseHeadings(html)
    
    // 处理段落
    html = this.parseParagraphs(html)
    
    // 处理代码块
    html = this.parseCodeBlocks(html)
    
    // 处理列表
    html = this.parseLists(html)
    
    // 处理内联样式
    html = this.parseInlineStyles(html)
    
    // 处理链接
    html = this.parseLinks(html)
    
    // 处理图片
    html = this.parseImages(html)

    return html
  }

  parseCustomComponents(html) {
    // 解析特性列表
    html = html.replace(/:::feature-list\n([\s\S]*?):::/g, (match, content) => {
      return this.generateFeatureList(content)
    })

    // 解析最佳实践列表
    html = html.replace(/:::practice-list\n([\s\S]*?):::/g, (match, content) => {
      return this.generatePracticeList(content)
    })

    // 解析高亮框
    html = html.replace(/:::highlight\n([\s\S]*?):::/g, (match, content) => {
      return this.generateHighlightBox(content)
    })

    return html
  }

  generateFeatureList(content) {
    const items = this.parseListItems(content)
    let html = '        <div class="feature-list">\n'
    
    items.forEach(item => {
      const [icon, title, description] = item.split('|').map(s => s.trim())
      html += `          <div class="feature-item">
            <div class="feature-icon">
              <span class="feature-img">${icon}</span>
            </div>
            <div class="feature-content">
              <h4>${title}</h4>
              <p>${description}</p>
            </div>
          </div>\n`
    })
    
    html += '        </div>'
    return html
  }

  generatePracticeList(content) {
    const items = this.parseListItems(content)
    let html = '        <div class="practice-list">\n'
    
    items.forEach(item => {
      const [icon, title, description] = item.split('|').map(s => s.trim())
      html += `          <div class="practice-item">
            <div class="practice-icon">
              <span class="practice-img">${icon}</span>
            </div>
            <div class="practice-content">
              <h4>${title}</h4>
              <p>${description}</p>
            </div>
          </div>\n`
    })
    
    html += '        </div>'
    return html
  }

  generateHighlightBox(content) {
    const lines = content.trim().split('\n')
    const title = lines[0].replace(/^#\s*/, '')
    const body = lines.slice(1).join('\n').trim()
    
    return `        <div class="highlight-box">
          <h4>
            <span class="tip-icon">💡</span> ${title}
          </h4>
          <p>${body}</p>
        </div>`
  }

  parseListItems(content) {
    return content.trim().split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\s*/, ''))
  }

  parseHeadings(html) {
    // 处理各级标题
    html = html.replace(/^### (.*$)/gm, '        <h3 id="$1">$1</h3>')
    html = html.replace(/^## (.*$)/gm, (match, title) => {
      const id = this.generateId(title)
      return `      <div class="content-section">
        <h2 id="${id}">${title}</h2>`
    })
    html = html.replace(/^# (.*$)/gm, '        <h1>$1</h1>')
    
    return html
  }

  parseParagraphs(html) {
    const lines = html.split('\n')
    const result = []
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      
      // 跳过空行和已处理的标签
      if (!line.trim() || 
          line.includes('<h') || 
          line.includes('<div') || 
          line.includes('```') ||
          line.includes(':::')) {
        result.push(line)
        continue
      }
      
      // 处理普通段落
      if (line.trim() && !line.includes('<')) {
        result.push(`        <p>${line}</p>`)
      } else {
        result.push(line)
      }
    }
    
    return result.join('\n')
  }

  parseCodeBlocks(html) {
    return html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      const language = lang || '代码示例'
      const escapedCode = this.escapeHtml(code.trim())
      
      return `        <div class="code-block">
          <div class="code-header">
            <span class="code-title">${language}</span>
            <button class="copy-btn">复制</button>
          </div>
          <pre><code>${this.addSyntaxHighlighting(escapedCode, lang)}</code></pre>
        </div>`
    })
  }

  addSyntaxHighlighting(code, lang) {
    if (!lang) return code
    
    // 简单的语法高亮（可以扩展）
    switch (lang.toLowerCase()) {
      case 'javascript':
      case 'js':
        return this.highlightJavaScript(code)
      case 'vue':
        return this.highlightVue(code)
      case 'css':
        return this.highlightCSS(code)
      default:
        return code
    }
  }

  highlightJavaScript(code) {
    return code
      .replace(/\b(const|let|var|function|class|import|export|from|default|if|else|for|while|return|try|catch|async|await)\b/g, 
               '<span class="keyword">$1</span>')
      .replace(/'([^']*)'/g, '<span class="string">\'$1\'</span>')
      .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
      .replace(/\/\/.*$/gm, '<span class="comment">$&</span>')
      .replace(/\b(\d+)\b/g, '<span class="number">$1</span>')
  }

  highlightVue(code) {
    // Vue模板高亮
    return code
      .replace(/(<\/?\w+[^>]*>)/g, '<span class="tag">$1</span>')
      .replace(/:(\w+)=/g, '<span class="attribute">:$1=</span>')
      .replace(/@(\w+)=/g, '<span class="event">@$1=</span>')
  }

  highlightCSS(code) {
    return code
      .replace(/([.#]?[\w-]+)\s*{/g, '<span class="selector">$1</span> {')
      .replace(/([\w-]+)\s*:/g, '<span class="property">$1</span>:')
      .replace(/:\s*([^;]+);/g, ': <span class="value">$1</span>;')
  }

  parseLists(html) {
    // 处理无序列表
    html = html.replace(/^(\s*- .+)(?:\n\s*- .+)*/gm, (match) => {
      const items = match.split('\n').map(line => {
        const content = line.replace(/^\s*-\s*/, '')
        return `          <li>${content}</li>`
      }).join('\n')
      
      return `        <ul>\n${items}\n        </ul>`
    })

    // 处理有序列表
    html = html.replace(/^(\s*\d+\. .+)(?:\n\s*\d+\. .+)*/gm, (match) => {
      const items = match.split('\n').map(line => {
        const content = line.replace(/^\s*\d+\.\s*/, '')
        return `          <li>${content}</li>`
      }).join('\n')
      
      return `        <ol>\n${items}\n        </ol>`
    })

    return html
  }

  parseInlineStyles(html) {
    // 粗体
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    
    // 斜体
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
    
    // 行内代码
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
    
    return html
  }

  parseLinks(html) {
    return html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
  }

  parseImages(html) {
    return html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
      return `        <div class="image-container">
          <img src="${src}" alt="${alt}" />
          ${alt ? `<div class="image-caption">${alt}</div>` : ''}
        </div>`
    })
  }

  escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

  generateId(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }
}

module.exports = MarkdownParser
