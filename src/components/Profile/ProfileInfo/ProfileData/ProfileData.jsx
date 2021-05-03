import React from 'react'
import Contacts from '../Contacts/Contacts'
import Classes from './ProfileData.module.css'

const ProfileData = ( { userProfile, isOwner, goToEditMode } ) => {
    return (
        <div>
            {isOwner && <div><button onClick={goToEditMode}>Редактировать</button></div>}
            <div className={Classes.infoAboutUser}>
                <span>Полное имя: {userProfile.fullName}</span>
            </div>
            <div className={Classes.infoAboutUser}>
                <span>Обо мне: {userProfile.aboutMe}</span>
            </div>
            <div className={Classes.infoAboutUser}>
                <span>мои контакты: </span> { Object.keys(userProfile.contacts).map(key => {
                    return <Contacts contactTitle={key} key={key} contactValue={userProfile.contacts[key]}/>
                }) }
            </div>
            <div className={Classes.infoAboutUser}>
                <span>Ищу работу: {userProfile.lookingForAJob ? 'да' : 'нет'}</span>
            </div>
            {userProfile.lookingForAJob &&
                <div className={Classes.infoAboutUser}>
                    <span>Мои навыки: {userProfile.lookingForAJobDescription}</span>
                </div>
            }
        </div>
    )
}

export default ProfileData