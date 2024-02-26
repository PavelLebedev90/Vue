<script setup lang="ts">
import Posts from '../components/Posts.vue'
import useStore from '@/stores/posts'
const store = useStore()
</script>

<template>
  <main>
    <Posts :posts="store.posts"/>
  </main>
</template>
