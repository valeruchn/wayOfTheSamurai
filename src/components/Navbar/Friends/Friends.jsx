import React from 'react'
import Classes from './Friends.module.css'
import {NavLink} from 'react-router-dom'
import one from './../../../images/avatars/one.png'

const Friends = (props) => {
    let path = '/dialogs/' + props.id
    return (
        <div className={Classes.friendsBar}>
            <div className={Classes.friendsItem}>
                <img src={one} />
            </div>
            <div className={Classes.friendName}>
                <NavLink to={path}>{props.name}</NavLink>
            </div>
        </div>
    )
}

export default Friends