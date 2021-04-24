import React from 'react'
import { Field } from 'redux-form'
import { maxLengthCreator, requiredField } from '../../../../utilits/validators/validators'
import { Element } from '../../../common/FormsControls/FormsControls'
import Classes from './MyPostsForm.module.css'

const Textarea = Element('textarea')
const maxLength10 = maxLengthCreator(10)

const MyPostsForm = (props) => {
    return (
        <div className={Classes.postsBlock}>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field 
                    name='text' 
                    component={Textarea} 
                    placeholder='enter your post'
                    validate={[requiredField, maxLength10]}
                    />
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </form>
        </div>
    )
}

export default MyPostsForm