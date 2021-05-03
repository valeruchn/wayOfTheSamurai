import { AppStateType } from './reduxStore';
import { PostsType, ProfileType, PhotosProfileType } from './../types/types';
import { stopSubmit } from "redux-form"
import { profileAPI } from "../api/api"
import { ThunkAction } from 'redux-thunk';

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'


const initialState = {
  posts: [
    { id: 1, post: 'first :)', likeCount: 25 },
    { id: 2, post: 'second :)', likeCount: 5 },
    { id: 3, post: 'Yo', likeCount: 10 },
    { id: 4, post: 'How are you?', likeCount: 7 },
    { id: 5, post: 'Thank`s I`m fine :)', likeCount: 11 }
  ] as Array<PostsType>,

  userProfile: null as ProfileType | null,
  status: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

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
        userProfile: { ...state.userProfile, photos: action.photos } as any
      }

    default:
      return state
  }
}

type ActionsTypes = AddPostActionType | SetUserProfileActionType | SetStatusActionType | 
SetStatusActionType | DeletePostActionType | SavePhotoActiontype

type AddPostActionType = {
  type: typeof ADD_POST
  text: string
}

export const addPost = (text: string): AddPostActionType => ({
  type: ADD_POST, text
})

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({
  type: SET_USER_PROFILE, profile
})

type SetStatusActionType = {
  type: typeof SET_STATUS
  status: string
}

export const setStatus = (status: string): SetStatusActionType => ({
  type: SET_STATUS, status
})

type DeletePostActionType = {
  type: typeof DELETE_POST
  postId: number
}

export const deletePost = (postId: number): DeletePostActionType => ({
  type: DELETE_POST, postId
})

type SavePhotoActiontype = {
  type: typeof SAVE_PHOTO_SUCCESS
  photos: PhotosProfileType
}

export const savePhotoSuccess = (photos: PhotosProfileType): SavePhotoActiontype => ({
  type: SAVE_PHOTO_SUCCESS, photos
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getProfile(userId)
  dispatch(setUserProfile(data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getStatus(userId)
  dispatch(setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  try {
    const data = await profileAPI.updateStatus(status)
    if (data.resultcode === 0) {
      dispatch(setStatus(data))
    }
  } catch (exception) {
    console.log(exception)
  }

}

export const savePhoto = (file: any): ThunkType => async (dispatch) => {
  const response = await profileAPI.savePhoto(file)
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos))
  }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
  const userId = getState().auth.id
  const response = await profileAPI.saveProfile(profile)
  if (response.data.resultcode === 0) {
    dispatch(getUserProfile(userId))
  } else /* Если пришла ошибка авторизации выводим ее в форме */ {
    const message = response.data.messages.length > 0 ? response.data.messages[0].split('->') : 'Some error'
    // распарсиваем строку с названием поля соц сети с ошибкой
    const arrField = message[1].substring(0, (message[1].length - 1)).toLowerCase()
    // используем полученное название соц сети для вывода ошибки в необх. поле
    dispatch(stopSubmit('editProfile', { 'contacts': { [arrField]: response.data.messages[0] } }))
    // возвращаем ошибку из санки для того, чтоб не зарезолвилась форма при ошибке
    return Promise.reject(response.data.messages[0])
  }
}

export default profileReducer