import { AppStateType } from './reduxStore';
import { stopSubmit } from "redux-form"
import { ThunkAction } from "redux-thunk"
import { authAPI, securityAPI } from "../api/api"

const SET_USER_DATA = 'SET_USER_DATA'
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL'

const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaURL: null as string | null
}

export type initialStateType = typeof initialState
type ActionsTypes = setAuthUserDataActionType | setCaptchaURLActionType

const authReduser = (state = initialState, action: ActionsTypes) : initialStateType => {
    switch (action.type) {
        /* благодаря добавлению свойств action в обьект payload мы можем обьединить два кейса */
        case SET_USER_DATA:
        case SET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state

    }
}

type setAuthUserDataActionPayloadType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: setAuthUserDataActionPayloadType
}

export const setAuthUserData = 
    (id: number | null, email: string | null, 
        login: string | null, isAuth: boolean): setAuthUserDataActionType => ({
    type: SET_USER_DATA, payload:
        { id, email, login, isAuth }
})

type setCaptchaURLActionPayloadType = {
     captchaURL: string
}

type setCaptchaURLActionType = {
    type: typeof SET_CAPTCHA_URL
    payload: setCaptchaURLActionPayloadType
}

export const setCaptchaURL = (captchaURL: string): setCaptchaURLActionType => ({
    type: SET_CAPTCHA_URL, payload: { captchaURL }
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const isAuthCheck = (): ThunkType => async (dispatch) => {
    const data = await authAPI.authMe()
    if (data.resultCode === 0 /* Если мы авторизованы на сервере */) {
        let { id, email, login } = data.data /* Деструктурирующее присваивание */
        dispatch(setAuthUserData(id, email, login, true))
    }
}


export const login = (email: string, password: string,
     rememberMe:boolean, captcha:string) => async (dispatch: any) => {

    const data = await authAPI.login(email, password, rememberMe, captcha)

    if (data.resultCode === 0) {
        dispatch(isAuthCheck())
    } else /* Если пришла ошибка авторизации выводим ее в форме */ {
        if (data.resultCode === 10) {
            // 10 код означает что нужна каптча, запрашиваем в этом случае
            dispatch(getCaptchaURL())
        }
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { _error: message }))
    }
}


export const logout = (): ThunkType => async (dispatch) => {

    const data = await authAPI.logout()

    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaURL = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaURL()
    const captchaURL = response.data.url
    dispatch(setCaptchaURL(captchaURL))
}

export default authReduser