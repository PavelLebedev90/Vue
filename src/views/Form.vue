<template>
  <PostForm @createPost="createPost" />
</template>
<script setup lang="ts">
import { IPost, posts } from '@/stores/posts'
import { ref } from 'vue'
import PostForm from '../components/PostForm.vue'
const postId = ref(0)

const createPost = (newPost: Omit<IPost, 'id'>) => {
  posts.push({
    ...newPost,
    id: postId.value++
  })
}
</script>
