import React from 'react'
import Classes from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './Myposts/MyPostsContainer'


const Profile = (props) => {
    return(
      <div>
        <ProfileInfo 
          savePhoto={props.savePhoto}
          isOwner={props.isOwner}
          userProfile={props.userProfile} 
          status={props.status}
          updateStatus={props.updateStatus}
          getStatus={props.getStatus}
          saveProfile={props.saveProfile}
        />
        <MyPostsContainer />
      </div>
    ) 
}

export default Profile