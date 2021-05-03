import React, { useState } from 'react'
import Classes from './profileInfo.module.css'
import one from '../../../images/avatars/one.png'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatus from './ProfileStatus/ProfileStatus'
import ProfileData from './ProfileData/ProfileData'
import ProfileDataForm from './ProfileDataForm/ProfileDataForm'
import { reduxForm } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../../redux/profileReducer'


const ProfileInfo = (props) => {

    const [ editMode, setEditMode] = useState(false)
    const dispatch = useDispatch()
    const userId = useSelector(state => state.auth.id)

    const onSubmit = (formData) => {
        props.saveProfile(formData)
        .then(() => {
            setEditMode(false)
            dispatch(getUserProfile(userId))
        })
        
    }
    
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
                    {editMode 
                    ? <EditProfileDataForm initialValues={props.userProfile} onSubmit={onSubmit}
                    profile={props.userProfile}/>
                    : <ProfileData 
                        userProfile={props.userProfile} 
                        isOwner={props.isOwner} 
                        goToEditMode={() => setEditMode(true)}
                        />}
                    <div>
                        <ProfileStatus 
                        status={props.status} 
                        updateStatus={props.updateStatus}
                        getStatus={props.getStatus}
                        />
                    </div>
                    
                </div>
                <div className={Classes.addAvatar}>
                    {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
                </div>
            </div>
        )
    } 
}

const EditProfileDataForm = reduxForm({form : 'editProfile'})(ProfileDataForm) /* hoc reduxForm*/

export default ProfileInfo