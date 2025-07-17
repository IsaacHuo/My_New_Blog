<template>
  <ArticleDetailLayout 
    :article="article" 
    :category="'tech'"
    :table-of-contents="tableOfContents"
    :related-articles="relatedArticles"
    @like-toggled="onLikeToggled"
  >
    <template #content>

        <p># test</p>

      <div class="content-section">
        <h2 id="前言">前言</h2>

        <p>在这里写文章的前言...</p>
      </div>

      <div class="content-section">
        <h2 id="主要内容">主要内容</h2>

        <h3 id="子标题1">子标题1</h3>

        <p>内容...</p>

        <h3 id="子标题2">子标题2</h3>

        <p>内容...</p>
      </div>

      <div class="content-section">
        <h2 id="总结">总结</h2>

        <p>在这里写总结...</p>

        <p>---</p>

        <p><em>本文完整代码和示例可以在 <a href="https://github.com/IsaacHuo" target="_blank">GitHub</a> 上找到。</em></p>

      </div>
    </template>
  </ArticleDetailLayout>
</template>

<script>
import { reactive } from 'vue'
import ArticleDetailLayout from '../../../components/ArticleDetailLayout.vue'

export default {
  name: 'TechArticle2',
  components: {
    ArticleDetailLayout
  },
  setup() {
    const article = reactive({
      id: 2,
      title: 'test',
      author: '霍玮放',
      readCount: 818,
      likes: 29,
      date: '2025/7/17',
      category: '技术随笔',
      tags: ["sjf"]
    })

    const tableOfContents = [
      {
            "id": "前言",
            "title": "前言"
      },
      {
            "id": "主要内容",
            "title": "主要内容"
      },
      {
            "id": "子标题1",
            "title": "子标题1"
      },
      {
            "id": "子标题2",
            "title": "子标题2"
      },
      {
            "id": "总结",
            "title": "总结"
      }
]

    const relatedArticles = [
      {
            "id": 7,
            "title": "相关文章1",
            "date": "07-15"
      },
      {
            "id": 1,
            "title": "相关文章2",
            "date": "07-14"
      },
      {
            "id": 7,
            "title": "相关文章3",
            "date": "07-13"
      }
]

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
