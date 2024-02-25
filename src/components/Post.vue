<script setup lang="ts">
import { IPost } from '@/stores/posts'

interface IProp {
  post: IPost
}
defineProps<IProp>()
const emits = defineEmits<{
  (e: 'deletePost'): void
}>()
const deleteHandler = () => {
  emits('deletePost')
}
</script>

<template>
  <li class="list_item">
    <h3 class="item_title">{{ post.title }}</h3>
    <p>Доступ: {{ post.access }}</p>
    <p>Описание: {{ post.description }}</p>
    <my-button btnType="danger" @click="deleteHandler">Удалить</my-button>
  </li>
</template>
<style lang="scss" scoped>
.list_item {
  border: 2px solid green;
  padding: 5px;
  border-radius: 5px;
  margin-top: 10px;
}
.item_title {
  text-transform: uppercase;
}
</style>
