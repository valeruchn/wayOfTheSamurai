import React from 'react'
import { addPost, updateNewPostText } from '../../../redux/profileReducer'
import MyPosts from './MyPosts'
import {connect} from 'react-redux'

let mapStateToProps = (state) => {
  return {
    posts : state.profilePage.posts
  }
}

export default connect(mapStateToProps, { addPost }) (MyPosts)