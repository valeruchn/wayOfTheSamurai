const ADD_DIALOG: string = 'ADD-DIALOG'

type DialogType = {
  id: number
  name: string
}

type MessagesDataType = {
  id: number
  message: string
}

let initialState = {
  dialogs  : [
    {id : 1, name : 'Dimych'},
    {id : 2, name : 'Andrew'},
    {id : 3, name : 'Sveta'},
    {id : 4, name : 'Egor'},
    {id : 5, name : 'Max'}
  ] as Array<DialogType>,
  
  messagesData : [
    {id : 1, message : 'Hi'},
    {id : 2, message : 'Hello'},
    {id : 3, message : 'Yo'},
    {id : 4, message : 'How are you?'},
    {id : 5, message : 'Thank`s I`m fine :)'}
  ] as Array<MessagesDataType>
}

export type initialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any) => {

    switch (action.type) {

          case ADD_DIALOG : 
            let newDialog = {
              id: state.messagesData.length +1,
              message: action.message
            }
            return {
              ...state,
              messagesData : [...state.messagesData, newDialog],
            }

          default:
            return state
        }
    
}

type AddDialogActionType = {
  type: typeof ADD_DIALOG
  message: string
}

export const AddDialog = (message:string): AddDialogActionType => ({
    type : ADD_DIALOG, message
  })

export default dialogsReducer