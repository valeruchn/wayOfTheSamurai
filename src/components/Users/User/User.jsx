import React from 'react'
import one from './../../../images/avatars/one.png'
import { NavLink } from 'react-router-dom'


const User = ({ user, ...props }) => {
    
    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        {<img src={user.photos.small != null ? user.photos.small : one}/>}
                    </NavLink>
                </div>
                <div>
                    {user.followed 
                    ? <button disabled={props.followingInProgress.some(id => id === user.id)}
                     onClick={() => {props.unfollow(user.id)} /* sunk */}>Unfollow</button> 
                    : <button disabled={props.followingInProgress.some(id => id === user.id)}
                     onClick={() => {props.follow(user.id) /* sunk */}}>Follow</button>
                    }   
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{'user.location.city'}</div>
                    <div>{'user.location.country'}</div>
                </span>
            </span>
        </div>
    )
}

export default User