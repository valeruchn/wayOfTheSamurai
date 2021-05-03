import React from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User/User'
import { UserType } from './../../types/types'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (page:number) => void
    users: Array<UserType>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    followingInProgress: Array<number>
}

const Users: React.FC<PropsType> = (props) => {

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