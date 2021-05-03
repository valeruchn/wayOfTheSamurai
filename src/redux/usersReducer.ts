import { UserType } from './../types/types';
import { usersAPI } from "../api/api"

const FOLLOW: string = 'FOLLOW'
const UNFOLLOW: string = 'UNFOLLOW'
const SET_USERS: string = 'SET_USERS'
const SET_CURRENT_PAGE: string = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT: string = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING: string = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS: string = 'TOGGLE_IS_FOLLOWING_PROGRESS'


const initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 20,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number> // array user id
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {

  switch (action.type) {

    case FOLLOW:
      return {
        ...state,
        users: state.users.map(user => { // функция возвращает новый массив
          if (user.id === action.userId) {
            // если совпадает ид - копируем обьект пользователя и меняем данные
            return { ...user, followed: true }
          }
          return user
        })
      }

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return { ...user, followed: false }
          }
          return user
        })
      }

    case SET_USERS:
      // Копируем стейт, в массив с пользователями добавляем массив с новыми пользователями
      return {
        ...state,
        users: action.users
      }

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      }

    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.usersCount
      }

    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      }

    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.followingInProgress
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id != action.userId)
      }

    default:
      return state
  }
}

type FollowSuccessActionType = {
  type: typeof FOLLOW
  userId: number
}

export const followSuccess = (userId: number): FollowSuccessActionType => ({
  type: FOLLOW, userId
})

type UnfollowSuccessActionType = {
  type: typeof UNFOLLOW
  userId: number
}

export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({
  type: UNFOLLOW, userId
})

type SetUsersActionType = {
  type: typeof SET_USERS
  users: Array<UserType>
}

export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
  type: SET_USERS, users
})

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}

export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
  type: SET_CURRENT_PAGE, currentPage
})

type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT
  usersCount: number
}

export const setTotalUsersCount = (usersCount: number): SetTotalUsersCountActionType => ({
  type: SET_TOTAL_USERS_COUNT, usersCount
})

type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
  type: TOGGLE_IS_FETCHING, isFetching
})

type ToggleIsFollowingProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
  followingInProgress: boolean
  userId: number
}

export const toggleIsFollowingProgress = 
(followingInProgress: boolean, userId: number): ToggleIsFollowingProgressActionType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress, userId
})




export const getUsers = (currentPage: number, pageSize: number) => { /* Функция возвращает другую функцию санку */
  return (dispatch: any) => {
    dispatch(setCurrentPage(currentPage))
    // Получаем данные о пользователях с сервера, передаем в стейт
    dispatch(toggleIsFetching(true)) // Вкл анимация загрузки
    usersAPI.getUsers(currentPage, pageSize) /* axios запрос с сервера импорттируем из api.js */
      .then(data => {
        dispatch(toggleIsFetching(false)) // Выкл анимация загрузки
        dispatch(setUsers(data.items)) // Передаю пользователей в стейт
        dispatch(setTotalUsersCount(data.totalCount)) // Устанавливаю общее число пользователей
      })
  }
}

export const unfollow = (userId: number) => { /* Функция возвращает другую функцию санку */
  return (dispatch: any) => {
    dispatch(toggleIsFollowingProgress(true, userId))
    usersAPI.unfollowRequest(userId)
      .then(data => {
        if (data.resultCode == 0) {  /* Сервер подтвердил что подписка произошла */
          dispatch(unfollowSuccess(userId)) /* Диспатчим изменения в стор */
        }
        dispatch(toggleIsFollowingProgress(false, userId))
      })
  }
}

export const follow = (userId: number) => { /* Функция возвращает другую функцию санку */
  return (dispatch: any) => {
    dispatch(toggleIsFollowingProgress(true, userId))
    /* Асинхронный запрос */
    usersAPI.followRequest(userId)
      .then(data => {
        if (data.resultCode == 0) {  /* Сервер подтвердил что подписка произошла */
          dispatch(followSuccess(userId)) /* Диспатчим изменения в стор */
        }
        dispatch(toggleIsFollowingProgress(false, userId))
      })
  }
}


export default usersReducer