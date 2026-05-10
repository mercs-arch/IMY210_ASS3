<template>
  <div>
    <NuxtLink to="/">← Back to home</NuxtLink>

    <div v-if="pending">Loading...</div>

    <div v-else-if="post">
      <h1>{{ post.title }}</h1>
      <p>By {{ post.author }}</p>
      <p>Category: {{ post.category?.name }}</p>

      <div class="content" v-html="renderedContent"></div>
    </div>
  </div>
</template>

<script setup>
import { marked } from 'marked'

const route = useRoute()
const { getPost } = useStrapi()

const post = ref(null)
const pending = ref(true)

const raw = await getPost(route.params.id)
post.value = raw
pending.value = false

const renderedContent = computed(() => {
  if (!post.value?.content) return ''
  
  const blocks = post.value.content
  if (!Array.isArray(blocks)) return ''

  const plainText = blocks
    .map(block => {
      if (block.type === 'paragraph') {
        return block.children?.map(c => c.text).join('') || ''
      }
      if (block.type === 'heading') {
        const hashes = '#'.repeat(block.level || 1)
        return `${hashes} ${block.children?.map(c => c.text).join('') || ''}`
      }
      return ''
    })
    .join('\n\n')

  return marked(plainText)
})
</script>

<style>
.content { line-height: 1.8; margin-top: 1rem; }
</style>