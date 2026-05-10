<template>
  <div class="post-card">
    <h1>My Blog</h1>

    <select v-model="selectedCategory" @change="filterPosts">
      <option value="">All categories</option>
      <option v-for="cat in categories" :key="cat.id" :value="cat.slug">
        {{ cat.name }}
      </option>
    </select>

    <div v-if="pending">Loading posts...</div>

    <div v-else>
      <div class="postCard" v-for="post in posts" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>By {{ post.author }}</p>
        <p>{{ getSnippet(post.content) }}</p>
        <NuxtLink :to="`/post/${post.documentId}`">Read more</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getPosts, getCategories } = useStrapi()

const posts = ref([])
const categories = ref([])
const selectedCategory = ref('')
const pending = ref(true)

const rawPosts = await getPosts()
posts.value = rawPosts
pending.value = false

const rawCategories = await getCategories()
categories.value = rawCategories.map(cat => ({
  id: cat.id,
  name: cat.name,
  slug: cat.slug,
}))

const filterPosts = async () => {
  pending.value = true
  const all = await getPosts()
  if (!selectedCategory.value) {
    posts.value = all
  } else {
    posts.value = all.filter(post => post.category?.slug === selectedCategory.value)
  }
  pending.value = false
}

const getSnippet = (content) => {
  if (!content || !Array.isArray(content)) return ''
  const firstBlock = content.find(block => block.type === 'paragraph')
  if (!firstBlock) return ''
  const text = firstBlock.children?.map(c => c.text).join('') || ''
  return text.length > 150 ? text.slice(0, 150) + '...' : text
}
</script>

<style>
body { font-family: Arial, sans-serif; max-width: 800px; margin: 2rem auto; padding: 0 1rem; background-color: rgb(223, 223, 235);}
.post-card { border: 1px solid #ddd; padding: 1rem; margin-bottom: 1rem; border-radius: 4px; background-color: #594e7d; }
a { color: #8582a7; }
.post-card a {
  color: rgb(86, 64, 95);
}
select {
  background: rgb(223, 223, 235);
  padding: 0.4rem;
  border-radius: 4px;
}


.postCard {
  border: 1px solid  #000000;
  background-color:  #c0b6dd;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}
</style>