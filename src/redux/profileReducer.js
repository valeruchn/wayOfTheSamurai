import { profileAPI } from "../api/api"

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

let initialState = {
  posts: [
    { id: 1, post: 'first :)', likeCount: 25 },
    { id: 2, post: 'second :)', likeCount: 5 },
    { id: 3, post: 'Yo', likeCount: 10 },
    { id: 4, post: 'How are you?', likeCount: 7 },
    { id: 5, post: 'Thank`s I`m fine :)', likeCount: 11 }
  ],

  userProfile: null,
  status: ''
}

const profileReducer = (state = initialState, action) => {

  switch (action.type) {

    case ADD_POST:
      let newPost = {
        id: state.posts.length + 1,
        post: action.text,
        likeCount: 0
      }
      return {
        ...state,
        posts: [...state.posts, newPost]
      }

    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.profile
      }

    case SET_STATUS:
      return {
        ...state,
        status: action.status
      }

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id != action.postId)
      }

    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        userProfile: { ...state.userProfile, photos: action.photos }
      }

    default:
      return state
  }
}

export const addPost = (text) => ({
  type: ADD_POST, text
})

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE, profile
})

export const setStatus = (status) => ({
  type: SET_STATUS, status
})

export const deletePost = (postId) => ({
  type: DELETE_POST, postId
})

export const savePhotoSuccess = (photos) => ({
  type: SAVE_PHOTO_SUCCESS, photos
})


export const getUserProfile = (userId) => async (dispatch) => {
  const data = await profileAPI.getProfile(userId)
  dispatch(setUserProfile(data))
}

export const getStatus = (userId) => async (dispatch) => {
  const data = await profileAPI.getStatus(userId)
  dispatch(setStatus(data))
}

export const updateStatus = (status) => async (dispatch) => {
  const data = await profileAPI.updateStatus(status)
  if (data.resultcode === 0) {
    dispatch(setStatus(data))
  }
}

export const savePhoto = (file) => async (dispatch) => {
  const response = await profileAPI.savePhoto(file)
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos))
  }
}

export default profileReducer