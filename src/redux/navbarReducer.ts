type Friendtype = {
    id: number
    name: string
}

const initialState = {
    friends : [
        {id : 1, name : 'Dimych'},
        {id : 2, name : 'Andrew'},
        {id : 3, name : 'Sveta'},
        {id : 4, name : 'Egor'}
        ] as Array<Friendtype>
}

type InitialStatetype = typeof initialState

export const navbarReducer = (state = initialState, action: any) => {

    return state
}

export default navbarReducer