import { stopSubmit } from "redux-form"
import { authAPI } from "../api/api"

const SET_USER_DATA = 'SET_USER_DATA'



let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const authReduser = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        default:
            return state

    }
}

export const setAuthUserData = (id, email, login, isAuth) => ({
    type: SET_USER_DATA,
    data: { id, email, login, isAuth }
})

export const isAuthCheck = () => async (dispatch) => {
    const data = await authAPI.authMe()
    if (data.resultCode === 0 /* Если мы авторизованы на сервере */) {
        let { id, email, login } = data.data /* Деструктурирующее присваивание */
        dispatch(setAuthUserData(id, email, login, true))
    }
}


export const login = (email, password, rememberMe) => async (dispatch) => {

    const data = await authAPI.login(email, password, rememberMe)

    if (data.resultCode === 0) {
        dispatch(isAuthCheck())
    } else /* Если пришла ошибка авторизации выводим ее в форме */ {
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { _error: message }))
    }
}


export const logout = () => async (dispatch) => {

    const data = await authAPI.logout()

    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReduser