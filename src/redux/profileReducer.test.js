import profileReduser, { addPost, deletePost } from './profileReducer'

let state = {
  posts: [
    { id: 1, post: 'first :)', likeCount: 25 },
    { id: 2, post: 'second :)', likeCount: 5 },
    { id: 3, post: 'Yo', likeCount: 10 },
    { id: 4, post: 'How are you?', likeCount: 7 },
    { id: 5, post: 'Thank`s I`m fine :)', likeCount: 11 }
  ]
}

it('length of posts should be incremented', () => {
  // 1. test data
  let action = addPost('it-kamasutra.com')
  // 2. action
  let newState = profileReduser(state, action)
  // 3. Проверяем результат теста
  expect(newState.posts.length).toBe(6)
})

it('message of new post should be correct', () => {
  // 1. test data
  let action = addPost('it-kamasutra.com')
  // 2. action
  let newState = profileReduser(state, action)
  // 3. Проверяем результат теста
  expect(newState.posts[5].post).toBe('it-kamasutra.com')
})

it('after deleting length of posts should be decrement', () => {
  // 1. test data
  let action = deletePost(1)
  // 2. action
  let newState = profileReduser(state, action)
  // 3. Проверяем результат теста
  expect(newState.posts.length).toBe(4)
})