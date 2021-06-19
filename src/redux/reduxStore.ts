import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'
import navbarReduser from './navbarReducer'
import usersReducer from './usersReducer'
import authReduser from './authReduser'
import { reducer as formReducer } from 'redux-form'
import appReduser from './appReduser'


const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navbar: navbarReduser,
    usersPage: usersReducer,
    auth: authReduser,
    form: formReducer,
    app: appReduser
})

type RootReduserType = typeof rootReducer

export type AppStateType = ReturnType<RootReduserType> /* Возвращает описанную типизацию всего state */

type PropertiesTypes<T> = T extends {[key: string] : infer U} ? U : never

export type InferActionsTypes<T extends {[key: string] : (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
// Для подключения redux extention в хром
// @ts-ignore - typeScript проигнорирует следующую строку
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store


