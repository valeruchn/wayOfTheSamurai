import { AppStateType, InferActionsTypes, BaseThunkType } from './reduxStore';
import { UserType } from './../types/types';
import { usersAPI } from "../api/usersAPI";
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';


const initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 20,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number> // array user id
}

type InitialStateType = typeof initialState


const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

  switch (action.type) {

    case 'FOLLOW':
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

    case 'UNFOLLOW':
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return { ...user, followed: false }
          }
          return user
        })
      }

    case 'SET_USERS':
      // Копируем стейт, в массив с пользователями добавляем массив с новыми пользователями
      return {
        ...state,
        users: action.users
      }

    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage
      }

    case 'SET_TOTAL_USERS_COUNT':
      return {
        ...state,
        totalUsersCount: action.usersCount
      }

    case 'TOGGLE_IS_FETCHING':
      return {
        ...state,
        isFetching: action.isFetching
      }

    case 'TOGGLE_IS_FOLLOWING_PROGRESS':
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

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
  followSuccess : (userId: number) => ({ type: 'FOLLOW', userId } as const),
  unfollowSuccess : (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
  setUsers : (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
  setCurrentPage : (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
  setTotalUsersCount : (usersCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', usersCount } as const),
  toggleIsFetching : (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
  toggleIsFollowingProgress : 
  (followingInProgress: boolean, userId: number) => ({
  type: 'TOGGLE_IS_FOLLOWING_PROGRESS', followingInProgress, userId
  } as const)
}



/* 1. Вариант типизации санки */
type GetStateType = () => AppStateType
type DispatchTypeRedux = Dispatch<ActionsTypes>

export const getUsers = (currentPage: number, pageSize: number): BaseThunkType<Action> => {
  return async (dispatch, getState) => {
    dispatch(actions.setCurrentPage(currentPage))
    // Получаем данные о пользователях с сервера, передаем в стейт
    dispatch(actions.toggleIsFetching(true)) // Вкл анимация загрузки
    const data = await usersAPI.getUsers(currentPage, pageSize) /* axios запрос с сервера импорттируем из api.js */
    dispatch(actions.toggleIsFetching(false)) // Выкл анимация загрузки
    dispatch(actions.setUsers(data.items)) // Передаю пользователей в стейт
    dispatch(actions.setTotalUsersCount(data.totalCount)) // Устанавливаю общее число пользователей
  }
}
/* 2. Вариант типизации санки ThunkAction(import type from redux thunk)
<Return, State, E(параметр который пока не используем), ActionsTypes>*/
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFollowingProgress(true, userId))
    const data = await usersAPI.unfollowRequest(userId) 
    if (data.resultCode == 0) {  /* Сервер подтвердил что подписка произошла */
      dispatch(actions.unfollowSuccess(userId)) /* Диспатчим изменения в стор */
    }
    dispatch(actions.toggleIsFollowingProgress(false, userId))  
  }
}

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFollowingProgress(true, userId))
    const data = await usersAPI.followRequest(userId)
    if (data.resultCode == 0) {  /* Сервер подтвердил что подписка произошла */
      dispatch(actions.followSuccess(userId)) /* Диспатчим изменения в стор */
    }
    dispatch(actions.toggleIsFollowingProgress(false, userId))
  }
}


export default usersReducer