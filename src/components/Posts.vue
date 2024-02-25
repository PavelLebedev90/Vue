<script setup lang="ts">
import { IPost } from '@/stores/posts'
import Post from '../components/Post.vue'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { accessOptions } from '@/constant/accessOptions'
interface IProp {
  posts?: IPost[]
}
const router = useRouter()
const access = ref('all')
const props = withDefaults(defineProps<IProp>(), {
  posts: () => []
})
const emits = defineEmits<{
  (e: 'deletePost', postId: number, postIndex: number): void
}>()
const filterOptions = computed(() => {
  return [{ value: 'all', title: 'все' }, ...accessOptions]
})
const filteredPosts = computed(() => {
  if (access.value === 'all') {
    return props.posts
  }
  return props.posts.filter((post) => post.access === access.value)
})
</script>

<template>
  <main>
    <h1>{{ filteredPosts.length ? 'Список постов' : 'Список постов пуст' }}</h1>
    <div class="filter_container" v-show="posts.length > 0">
      <span>Фильтр:</span>
      <my-select v-model="access" :options="filterOptions" />
    </div>
    <ul class="list" v-if="filteredPosts.length > 0">
      <Post
        v-for="(post, index) of filteredPosts"
        :key="post.id"
        :post="post"
        @deletePost="emits('deletePost', post.id, index)"
      />
    </ul>
    <my-button @click="router.push('/create_post')" btnType="danger" v-else
      >Перейти к созданию</my-button
    >
  </main>
</template>
<style lang="scss" scoped>
.list {
  list-style: none;
  padding: 0;
}
.filter_container {
  margin: 10px 0;
}
</style>
