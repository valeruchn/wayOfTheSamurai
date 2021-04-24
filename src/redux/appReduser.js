import { isAuthCheck } from "./authReduser"

const INITIALISED_SUCCESS = 'INITIALISED_SUCCESS'

const initialState = {
    initialized: false
}

const appReduser = (state = initialState, action) => {
    switch (action.type) {
        case INITIALISED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state
    }
}

export const initializedSuccess = () => ({
    type: INITIALISED_SUCCESS
})

export const initializeApp = () => async (dispatch) => {

    await dispatch(isAuthCheck())
    /* После проверки авторизации инициализируем приложение */
    dispatch(initializedSuccess())
}


export default appReduser