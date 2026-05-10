<template>
  <div >
    <h1>Search</h1>

    <input
      v-model="query"
      type="text"
      placeholder="Search by title or author..."
      @keyup.enter="doSearch"
    />
    <button @click="doSearch">Search</button>

    <div class="post-card" v-if="searched && results.length === 0">
      <p>No results found for "{{ query }}".</p>
    </div>

    <div class="post-card" v-for="post in results" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>By {{ post.author }}</p>
      <NuxtLink :to="`/post/${post.id}`">Read more</NuxtLink>
    </div>
  </div>

</template>

<script setup>
const { searchPosts } = useStrapi()

const query = ref('')
const results = ref([])
const searched = ref(false)

const doSearch = async () => {
  if (!query.value.trim()) return
  results.value = await searchPosts(query.value.trim())
  searched.value = true
}
</script>

<style>
.post-card { border: 1px solid #ddd; padding: 1rem; margin-bottom: 1rem; border-radius: 4px; color: rgb(223, 223, 235);}
</style>