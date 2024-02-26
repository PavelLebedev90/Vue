<script setup lang="ts">
import { IPost } from '@/stores/posts'
import { computed, ref } from 'vue'
import PostForm from '@/components/PostForm.vue'
import useStore from '@/stores/posts'
interface IProp {
  post: IPost
  postIndex: number
}
const props = defineProps<IProp>()

const { editPost, deletePost } = useStore()
const mode = ref<'default' | 'edit'>('default')
const deleteHandler = () => {
  deletePost(props.postIndex)
}
const isDefaultMode = computed(() => {
  return mode.value === 'default'
})

const changeMode = () => {
  mode.value = mode.value === 'default' ? 'edit' : 'default'
}
const updatePost = (newPost: Omit<IPost, 'id'>) => {
  editPost(
    {
      ...newPost,
      id: props.post.id
    },
    props.postIndex
  )
  changeMode()
}
</script>

<template>
  <li class="list_item">
    <div v-if="isDefaultMode">
      <h3 class="item_title">{{ post.title }}</h3>
      <p>Доступ: {{ post.access }}</p>
      <p v-show="post.description">Описание: {{ post.description }}</p>
      <p>Количество: {{ post.count }}</p>
      <p>Почта: {{ post.email }}</p>
    </div>
    <PostForm
      @updatePost="updatePost"
      :initValue="post"
      :isDefaultMode="isDefaultMode"
      @changeMode="changeMode"
      v-if="!isDefaultMode"
    />
    <div class="btn_container" v-if="isDefaultMode">
      <my-button btnType="danger" @click="deleteHandler" :disabled="post.access !== 'admin'"
        >Удалить</my-button
      >
      <my-button btnType="default" @click="changeMode">Редактировать</my-button>
    </div>
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
.btn_container {
  display: flex;
  gap: 10px;
}
</style>
