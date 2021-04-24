import React from 'react'
import Classes from './profileInfo.module.css'
import one from '../../../images/avatars/one.png'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatus from './ProfileStatus/ProfileStatus'
import Contacts from './Contacts/Contacts'


const ProfileInfo = (props) => {
    
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    if (!props.userProfile) { 
        return <Preloader isFetching={true}/>
    } else {
        return (
            <div className={Classes.profileInformation}>
                <div className={Classes.avatar}>
                    <img src={props.userProfile.photos.large != null ? props.userProfile.photos.large : one} />
                </div>
                <div className={Classes.aboutUser}>
                    <div className={Classes.infoAboutUser}>
                        <span>Полное имя: {props.userProfile.fullName}</span>
                    </div>
                    <div className={Classes.infoAboutUser}>
                        <span>Обо мне: {props.userProfile.aboutMe}</span>
                    </div>
                    <div className={Classes.infoAboutUser}>
                        <span>мои контакты: </span> {Object.keys(props.userProfile.contacts).map(key => {
                            return <Contacts contactTitle={key} contactValue={props.userProfile.contacts[key]}/>
                        }) }
                    </div>
                    <div className={Classes.infoAboutUser}>
                        <span>Ищу работу: {props.userProfile.lookingForAJob ? 'да' : 'нет'}</span>
                    </div>
                    {props.userProfile.lookingForAJob &&
                        <div className={Classes.infoAboutUser}>
                            <span>Мои навыки: {props.userProfile.lookingForAJobDescription}</span>
                        </div>
                    }
                    <div>
                        <ProfileStatus 
                        status={props.status} 
                        updateStatus={props.updateStatus}
                        getStatus={props.getStatus}
                        />
                    </div>
                    <div>
                        {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
                    </div>
                </div>
            </div>
        )
    } 
}

export default ProfileInfo