import React from 'react'
import { Field } from 'redux-form'
import { maxLengthCreator, requiredField } from '../../../utilits/validators/validators'
import { Element } from '../../common/FormsControls/FormsControls'
import Classes from './DialogsForm.module.css'

const Textarea = Element('textarea')
const maxLength50 = maxLengthCreator(50)

const DialogsForm = (props) => {

    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div className={Classes.addDialog}>
                    <Field 
                    name='text' 
                    component={Textarea} 
                    placeholder='Enter you message'
                    validate={[requiredField, maxLength50]}
                    />
                </div> 
                <div>
                    <button>Add post</button>
                </div>
            </form>
        </div>
    )
}

export default DialogsForm