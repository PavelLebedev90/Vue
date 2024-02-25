<script setup lang="ts">
import { IPost } from '@/stores/posts'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { accessOptions } from '@/constant/accessOptions'
const router = useRouter()
const emits = defineEmits<{
  (e: 'createPost', args: Omit<IPost, 'id'>): void
}>()
const newPost = reactive<Omit<IPost, 'id'>>({
  title: '',
  description: '',
  access: 'user'
})
const goBack = () => {
  router.back()
}
const clearForm = () => {
  newPost.description = ''
  newPost.title = ''
}
const createPostHandler = () => {
  emits('createPost', newPost)
  clearForm()
}
</script>

<template>
  <form @submit.prevent class="create_form">
    <my-input v-model="newPost.title" placeholder="Введи название" />
    <my-input v-model="newPost.description" placeholder="Введи описание" />
    <my-select v-model="newPost.access" :options="accessOptions"/>
    <div class="btn_container">
      <my-button @click="goBack" btnType="danger">Назад</my-button>
      <div>
        <my-button @click="clearForm" class="clear_btn">Очистить</my-button>
        <my-button @click="createPostHandler" btnType="success">Создать</my-button>
      </div>
    </div>
  </form>
</template>
<style lang="scss" scoped>
.create_form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.btn_container {
  display: flex;
  justify-content: space-between;
}
.clear_btn {
  display: inline-block;
  margin-right: 10px;
}
</style>
