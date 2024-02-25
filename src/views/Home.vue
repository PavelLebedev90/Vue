<script setup lang="ts">
import Posts from '../components/Posts.vue'
import { posts } from '@/stores/posts';
const deletePost = (postId: number, postIndex: number) => {
  // posts.filter(post=>post.id !== postId)
   posts.splice(postIndex, 1)
}

</script>

<template>
  <main>
    <Posts :posts="posts" @deletePost="deletePost"/>
  </main>
</template>
