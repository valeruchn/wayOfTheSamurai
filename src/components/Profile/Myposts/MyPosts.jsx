import React from 'react'
import { reduxForm } from 'redux-form'
import Classes from './MyPosts.module.css'
import MyPostsForm from './MyPostsForm/MyPostsForm'
import Post from './Post/Post'

const MyPosts = (props) => {
    
    let postsElements = props.posts.map(post => 
    <Post message={post.post} likeCount={post.likeCount} key={post.id}/>)

    let addNewPost = (text) => {
      props.addPost(text.text)
    }

    return (
      <div>
        <div className={Classes.postsBlock}>
          <h3>myPosts</h3>
        </div>
        <MyPostsReduxForm onSubmit={addNewPost}/>
        <div className={Classes.posts}>
          {postsElements}
        </div>
      </div>
    ) 
}

const MyPostsReduxForm = reduxForm({form : 'profilePost'})(MyPostsForm)

export default MyPosts