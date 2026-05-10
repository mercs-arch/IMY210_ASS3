export const useStrapi = () => {
  const base = 'http://localhost:1337'

  const getPosts = async () => {
    const res = await $fetch(`${base}/api/posts?populate=*`)
    return res.data
  }
  

  const getCategories = async () => {
    const res = await $fetch(`${base}/api/categories?populate=*`)
    return res.data
  }

const getPost = async (documentId) => {
  const res = await $fetch(`${base}/api/posts/${documentId}?populate=*`)
  return res.data
}

  const searchPosts = async (query) => {
    const res = await $fetch(`${base}/api/posts?populate=*&filters[$or][0][title][$containsi]=${query}&filters[$or][1][author][$containsi]=${query}`)
    return res.data
  }

  return { getPosts, getCategories, getPost, searchPosts }
}