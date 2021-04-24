import React from 'react'
import Classes from './Post.module.css'
import one from './../../../../images/avatars/one.png'

const Post = (props) => {
    return (
          <div className={Classes.item}>
            <div className={Classes.avatar}>
              <img src={one} />
            </div>
            <div className={Classes.message}>
              <div className={Classes.messageItem}>
                {props.message}
              </div>
              <div className={Classes.likes}>
                <span>{'like: ' + props.likeCount}</span>
              </div>   
            </div>
                    
          </div>
    ) 
}

export default Post