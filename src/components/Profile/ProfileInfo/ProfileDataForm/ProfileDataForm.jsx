import React from 'react'
import { Field, Form } from 'redux-form'
import { Element } from '../../../common/FormsControls/FormsControls'
import Classes from './ProfileDataForm.module.css'

const Input = Element('input')

const ProfileDataForm = ({ handleSubmit, profile, error }) => {

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <div>
                    <button>Сохранить</button>
                </div>
                {error && <div className={Classes.formSummaryError}>
                    {error}
                </div>
                }
                <div>
                    <Field placeholder={"Full name"} name={"fullName"} component={Input} />
                </div>
                <div>
                    <Field placeholder={"About me"} name={"aboutMe"} component={Input} />
                </div>
                <div>
                    <Field placeholder={"About my professional skills"} name={"lookingForAJobDescription"} 
                        component={Input} type={"textarea"} />
                </div>
                <div>
                    Ищу работу: <Field name={"lookingForAJob"} type={"checkbox"} component={Input} />
                </div>
                <div className={Classes.infoAboutUser}>
                    <span>мои контакты: </span> { Object.keys(profile.contacts).map(key => {
                        return <div key={key}>
                            <b>{key} :</b><Field placeholder={"your contact"} name={"contacts." + key} 
                            component={Input} />
                        </div>
                    }) }
                </div>
            </Form>
        </div> 
    )
}

export default ProfileDataForm