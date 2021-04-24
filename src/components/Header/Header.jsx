import React from 'react'
import Classes from './Header.module.css'
import four_five_big_logo from '../../images/four_five_big_logo.png'
import { NavLink } from 'react-router-dom'

const Header = (props) => {
    return <header className={Classes.header}>
        <div className={Classes.logoImg}>
            <img src={four_five_big_logo} />
        </div>
        <div className={Classes.loginBlock}>
            {props.isAuth ? <div>{props.login} <button onClick={props.logout}>Logout</button></div>
            : <NavLink to={'/login'}>Login</NavLink>}  
        </div>
    </header>
}

export default Header