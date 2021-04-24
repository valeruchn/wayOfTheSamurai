import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'
import navbarReduser from './navbarReducer'

const Store = {

  _state : {

    profilePage : {
      posts : [
        {id : 1, post : 'first :)', likeCount : 25},
        {id : 2, post : 'second :)', likeCount : 5},
        {id : 3, post : 'Yo', likeCount : 10},
        {id : 4, post : 'How are you?', likeCount : 7},
        {id : 5, post : 'Thank`s I`m fine :)', likeCount : 11}
      ],

      newPostText : ''
    },

    dialogsPage : {
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
    },

    navbar : {
      friends : [
        {id : 1, name : 'Dimych'},
        {id : 2, name : 'Andrew'},
        {id : 3, name : 'Sveta'},
        {id : 4, name : 'Egor'}
        ]
      }    
    },

    _callSubscriber() {
      console.log('State changed')
    },

    subscribe(observer) {
      this._callSubscriber = observer
    },

    getState() {
      return this._state
    },

      dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.navbar = navbarReduser(this._state.navbar, action)

        this._callSubscriber()

      }
 
}

export default Store
window.store = Store