const ADD_DIALOG = 'ADD-DIALOG'

let initialState = {
  dialogs  : [
    {id : 1, name : 'Dimych'},
    {id : 2, name : 'Andrew'},
    {id : 3, name : 'Sveta'},
    {id : 4, name : 'Egor'},
    {id : 5, name : 'Max'}
  ],
  
  messagesData : [
    {id : 1, message : 'Hi'},
    {id : 2, message : 'Hello'},
    {id : 3, message : 'Yo'},
    {id : 4, message : 'How are you?'},
    {id : 5, message : 'Thank`s I`m fine :)'}
  ],

  newMessage : ''
}

const dialogsReducer = (state = initialState, action) => {

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

export const AddDialog = (message) => ({
    type : ADD_DIALOG, message
  })

export default dialogsReducer