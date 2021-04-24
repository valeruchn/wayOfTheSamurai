import React from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User/User'

const Users = (props) => {

    return (
        <div>
            <Paginator 
                totalUsersCount={props.totalUsersCount}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                onPageChanged={props.onPageChanged}
                portionSize={10}
            />

            {props.users
            .map(user => <User user={user} key={user.id} unfollow={props.unfollow} 
                follow={props.follow} followingInProgress={props.followingInProgress}/>)
            }
        </div>
    )
}

export default Users