import React, { useEffect, useState, FC, ChangeEvent } from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from './../../../../redux/reduxStore'
// import Classes from './ProfileStatus.module.css'

type PropsType = {
    status: string
    updateStatus: (status: string) => any
    getStatus: (userId: number | null) => void
}

const ProfileStatus: FC<PropsType> = (props) => {

    const [localStateStatus, setLocalStateStatus] = useState(props.status)

    const [localStateEditMode, setLocalStateEditMode] = useState(false)

    const userId = useSelector((state: AppStateType) => state.auth.id)
    

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalStateStatus(e.currentTarget.value)
   }

    const activateEditMode = () => {
        setLocalStateEditMode(true)
    }

    const deactivateEditMode = () => {
        setLocalStateEditMode(false)
        props.updateStatus(localStateStatus)
        // .then(() => {props.getStatus(userId)})
    }

    const handleFocus = (event: any) => {
        event.target.select(); /* выделить весь текст */
    }

    useEffect(() => {
        setLocalStateStatus(props.status)
    }, [props.status])
    
    
    return (
        <div>
            {!localStateEditMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status}</span>
                </div>
            }
            {localStateEditMode &&
                <div>
                    <input 
                        onChange={onStatusChange}
                        onFocus={handleFocus} /* выделить весь текст */
                        autoFocus={true}
                        value={localStateStatus} 
                        onBlur={deactivateEditMode}
                        />
                </div> 
            }
           
        </div>
    )
      
}

export default ProfileStatus;