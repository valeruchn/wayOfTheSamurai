import React from 'react'
import { NavLink } from 'react-router-dom'
import Friends from './Friends/Friends'
import Classes from './Navbar.module.css'

const Navbar = (props) => {
  
    let friendsElements = props.state.friends.map(friend =>
    <Friends id={friend.id} name={friend.name} key={friend.id}/>
    )

    return (
    <nav className={Classes.nav}>
      <div className={Classes.item}>
        <NavLink to='/profile' activeClassName={Classes.active}>Profile</NavLink>
      </div>
      <div className={Classes.item}>
        <NavLink to='/dialogs' activeClassName={Classes.active}>Messages</NavLink>
      </div>
      <div className={Classes.item}>
        <NavLink to='/users' activeClassName={Classes.active}>Users</NavLink>
      </div>
      <div className={Classes.item}>
        <NavLink to='/news' activeClassName={Classes.active}>News</NavLink>
      </div>
      <div className={Classes.item}>
        <NavLink to='/music' activeClassName={Classes.active}>Music</NavLink>
      </div>
      <div className={Classes.item}>
        <NavLink to='/settings' activeClassName={Classes.active}>Settings</NavLink>
      </div>
      <div className={Classes.friendsBar}>
        <div className={Classes.text}>friends</div>
        <div className={Classes.friendsItem}>
          {friendsElements}
        </div>
      </div>
      
  </nav>
    )
}

export default Navbar