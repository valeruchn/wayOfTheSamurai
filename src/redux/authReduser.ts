import { AppStateType, InferActionsTypes, BaseThunkType } from './reduxStore';
import { stopSubmit } from "redux-form"
import { ThunkAction } from "redux-thunk"
import { ResultCodeForCaptha } from "../api/authAPI"
import { securityAPI } from "../api/securityAPI";
import { authAPI } from "../api/authAPI";
import { ResultCodes } from '../api/api';
import { Action } from 'redux';


const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaURL: null as string | null
}

const authReduser = (state = initialState, action: ActionsTypes) : initialStateType => {
    switch (action.type) {
        /* благодаря добавлению свойств action в обьект payload мы можем обьединить два кейса */
        case 'SET_USER_DATA':
        case 'SET_CAPTCHA_URL':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state

    }
}

export const actions = {
    setAuthUserData:  (id: number | null, email: string | null, 
        login: string | null, isAuth: boolean) => ({
        type: 'SET_USER_DATA', 
        payload: { id, email, login, isAuth }
        } as const),
    setCaptchaURL: (captchaURL: string) => ({
        type: 'SET_CAPTCHA_URL', 
        payload: { captchaURL }
        } as const)
}



export const isAuthCheck = (): ThunkType => async (dispatch) => {
    const data = await authAPI.authMe()
    if (data.resultCode === ResultCodes.Success /* Если мы авторизованы на сервере */) {
        let { id, email, login } = data.data /* Деструктурирующее присваивание */
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}


export const login = (email: string, password: string,
     rememberMe:boolean, captcha:string): BaseThunkType<Action> => async (dispatch) => {

    const data = await authAPI.login(email, password, rememberMe, captcha)

    if (data.resultCode === ResultCodes.Success) {
        dispatch(isAuthCheck())
    } else /* Если пришла ошибка авторизации выводим ее в форме */ {
        if (data.resultCode === ResultCodeForCaptha.CapthaIsRequired) {
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
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaURL = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaURL()
    const captchaURL = data.url
    dispatch(actions.setCaptchaURL(captchaURL))
}


export type initialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export default authReduser