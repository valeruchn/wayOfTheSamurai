import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
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


// Для подключения redux extention в хром
// @ts-ignore - typeScript проигнорирует следующую строку
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store


