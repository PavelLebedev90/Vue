import { reactive, readonly, ref } from 'vue'
export type IAccess = 'admin' | 'user' | 'employee'
export type IMode =
  | 'title_edit'
  | 'access_edit'
  | 'count_edit'
  | 'email_edit'
  | 'description_edit'
  | 'default'
export interface IPost {
  id: number
  title: string
  description: string
  access: IAccess
  count: number | string
  email: string
  mode: IMode
}
export const posts = reactive<IPost[]>([])
const postId = ref(0)
export default function () {
  function addPost(post: Omit<IPost, 'id' | 'mode'>) {
    posts.push({ ...post, id: postId.value++, mode: 'default' })
  }
  function deletePost(postIndex: number) {
    posts.splice(postIndex, 1)
  }
  function editPost(newPost: IPost, postIndex: number) {
    posts.splice(postIndex, 1, newPost)
  }
  function editEntity<T extends IPost, U extends keyof IPost>(
    postId: number,
    entity: U,
    value: T[U]
  ) {
    const curPost = posts.find((post) => post.id === postId)
    if (curPost) {
      curPost[entity] = value
    }
  }
  function changePostMode(postId: number, mode: IMode) {
    const curPost = posts.find((post) => post.id === postId)
    if (curPost) {
      curPost.mode = mode
    }
  }
  return {
    addPost,
    deletePost,
    editPost,
    changePostMode,
    editEntity,
    posts: readonly(posts)
  }
}
