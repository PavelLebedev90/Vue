<script setup lang="ts">
import { IMode, IPost } from '@/stores/posts'
import { computed, ref } from 'vue'
import PostForm from '@/components/PostForm.vue'
import useStore from '@/stores/posts'
interface IProp {
  post: IPost
  postIndex: number
}
const props = defineProps<IProp>()

const { deletePost, changePostMode } = useStore()
const deleteHandler = () => {
  deletePost(props.postIndex)
}

const changeMode = (mode: IMode) => {
  changePostMode(props.post.id, mode)
}
const disabledDeleteBtn = computed(() => {
  return props.post.access !== 'admin' || props.post.mode?.includes('edit')
})
</script>

<template>
  <li class="list_item">
    <div>
      <h3 @dblclick="changeMode('title_edit')">
        <span> Название: </span>
        <slot name="title_edit">
          <span class="item_title">
            {{ post.title }}
          </span>
        </slot>
      </h3>
      <p @dblclick="changeMode('access_edit')">
        Доступ:
        <slot name="access_edit"> {{ post.access }} </slot>
      </p>
      <p @dblclick="changeMode('description_edit')" v-show="post.description">
        Описание:
        <slot name="description_edit"> {{ post.description }} </slot>
      </p>
      <p @dblclick="changeMode('count_edit')">
        Количество:
        <slot name="count_edit"> {{ post.count }} </slot>
      </p>
      <p @dblclick="changeMode('email_edit')">
        Почта:
        <slot name="email_edit"> {{ post.email }} </slot>
      </p>
    </div>
    <div class="btn_container">
      <my-button btnType="danger" @click="deleteHandler" :disabled="disabledDeleteBtn"
        >Удалить</my-button
      >
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
