import React from 'react'
import Classes from './DialogItem.module.css'
import {NavLink} from 'react-router-dom'
import one from './../../../images/avatars/one.png'

const DialogItem = (props) => {
    let path = '/dialogs/' + props.id

    return (
        <div className={Classes.dialog}>
            <div className={Classes.avatar}>
                <img src={one} />
            </div>
            <div className={Classes.login}>
                <NavLink to={path}>{props.name}</NavLink>
            </div>           
        </div>
    )

}

export default DialogItem