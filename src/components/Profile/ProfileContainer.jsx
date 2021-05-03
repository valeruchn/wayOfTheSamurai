import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getStatus, getUserProfile, updateStatus, savePhoto, saveProfile } from '../../redux/profileReducer'
import Profile from './Profile'
// import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.id
        if(!userId) {
          this.props.history.push('/login')
        }
    }
    this.props.getUserProfile(userId) /* sunk */
    this.props.getStatus(userId)
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.match.params.userId != prevProps.match.params.userId) {
      this.refreshProfile()
    }
  }

  render() {
    return(
      <div>
        <Profile 
          {...this.props} 
          savePhoto={this.props.savePhoto}
          isOwner={!this.props.match.params.userId}
          userProfile={this.props.userProfile} 
          status={this.props.status}
          updateStatus={this.props.updateStatus}
          getStatus={this.props.getStatus}
          saveProfile={this.props.saveProfile}
        />
      </div>
    ) 
  }
   
}

 let mapStateToProps = (state) => ({
  userProfile : state.profilePage.userProfile,
  isAuth : state.auth.isAuth,
  id : state.auth.id,
  status : state.profilePage.status
})

export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
  withRouter, /* Чтобы получить массив,
  содержащий обьект с ид пользователя из адресной строки используем hoc withRouter*/
  // withAuthRedirect /* hoc получение данных о авторизации */
)(ProfileContainer)