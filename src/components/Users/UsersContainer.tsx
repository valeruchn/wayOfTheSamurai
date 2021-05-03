import React from 'react'
import { connect } from "react-redux";
import { follow, unfollow, getUsers } from "../../redux/usersReducer";
import Users from './Users'
import Preloader from '../common/Preloader/Preloader';
// import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import {getUsersSelector, 
        getPageSize, 
        getTotalUsersCount, 
        getCurrentPage, 
        getIsFetching, 
        getFollowingInProgress} from '../../redux/usersSelectors'
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/reduxStore';

type MapStatePropstype ={
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

type PropsType = MapStatePropstype & MapDispatchPropsType


class UsersContainer extends React.Component<PropsType> {
    // После рендера компонента получаем массив с пользователями
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize) /* thunk */
    }
    // Функция вызывается при клике на страницу и получает данные с сервера по новой
    onPageChanged = (page: number) => {
        this.props.getUsers(page, this.props.pageSize) /* thunk */
    }

    render() {
        
        return <>
            <Preloader  isFetching={this.props.isFetching} />
            <div>
                <Users
                    currentPage={this.props.currentPage} 
                    onPageChanged={this.onPageChanged}
                    users={ this.props.users}
                    unfollow={this.props.unfollow}
                    follow={this.props.follow}
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    followingInProgress={this.props.followingInProgress}
                />
            </div>      
        </>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropstype => {
    return {
        users : getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount : getTotalUsersCount(state),
        currentPage : getCurrentPage(state),
        isFetching : getIsFetching(state),
        followingInProgress : getFollowingInProgress(state)
    } 
}

export default compose(
    connect( mapStateToProps, { follow, unfollow, getUsers } ),
    // withAuthRedirect
)( UsersContainer )