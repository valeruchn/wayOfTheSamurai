import { profileAPI, usersAPI } from "../api/api"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 20,
  currentPage: 1,
  isFetching: false,
  followingInProgress: []
}

const usersReducer = (state = initialState, action) => {

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

export const followSuccess = (userId) => ({
  type: FOLLOW, userId
})

export const unfollowSuccess = (userId) => ({
  type: UNFOLLOW, userId
})

export const setUsers = (users) => ({
  type: SET_USERS, users
})

export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE, currentPage
})

export const setTotalUsersCount = (usersCount) => ({
  type: SET_TOTAL_USERS_COUNT, usersCount
})

export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING, isFetching
})

export const toggleIsFollowingProgress = (followingInProgress, userId) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress, userId
})




export const getUsers = (currentPage, pageSize) => { /* Функция возвращает другую функцию санку */
  return (dispatch) => {
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

export const unfollow = (userId) => { /* Функция возвращает другую функцию санку */
  return (dispatch) => {
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

export const follow = (userId) => { /* Функция возвращает другую функцию санку */
  return (dispatch) => {
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