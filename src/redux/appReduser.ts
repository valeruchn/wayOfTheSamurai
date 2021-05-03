import { AppStateType } from './reduxStore';
import { ThunkAction } from "redux-thunk"
import { isAuthCheck } from "./authReduser"

const INITIALISED_SUCCESS: string = 'INITIALISED_SUCCESS'

const initialState = {
    initialized: false as boolean
}


const appReduser = (state = initialState, action: initializedSuccessActionType): typeof initialState => {
    switch (action.type) {
        case INITIALISED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }

        default:
            return state
    }
}

type initializedSuccessActionType = {
    type: typeof INITIALISED_SUCCESS
}

export const initializedSuccess = (): initializedSuccessActionType => ({
    type: INITIALISED_SUCCESS,
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, initializedSuccessActionType>

export const initializeApp = (): ThunkType => async (dispatch) => {

    await dispatch(isAuthCheck())
    /* После проверки авторизации инициализируем приложение */
    dispatch(initializedSuccess())
}


export default appReduser