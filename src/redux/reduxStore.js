import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'
import navbarReduser from './navbarReducer'
import usersReducer from './usersReducer'
import authReduser from './authReduser'
import { reducer as formReducer } from 'redux-form'
import appReduser from './appReduser'


let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navbar: navbarReduser,
    usersPage: usersReducer,
    auth: authReduser,
    form: formReducer,
    app: appReduser
})
// Для подключения redux extention в хром
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store


