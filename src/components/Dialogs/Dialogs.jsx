import React from 'react'
import { Redirect } from 'react-router'
import { reduxForm } from 'redux-form'
import DialogItem from './DialogItem/DialogItem'
import Classes from './Dialogs.module.css'
import DialogsForm from './DialogsForm/DialogsForm'
import Message from './Message/Message'

const Dialogs = (props) => {

    let dialogsElements = props.state.dialogs.map(dialog => 
    <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />)

    let messageElements = props.state.messagesData.map(message =>
        <Message message={message.message} key={message.id}/>)

    let addNewMessage = (text) => {
        props.AddDialog(text.text)
    }

    return (
        <div className={Classes.dialogs}>
            <div className={Classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={Classes.messages}>
                <div>
                    {messageElements}
                </div>
                <DialogsReduxForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

const DialogsReduxForm = reduxForm({form : 'dialogs'})(DialogsForm)

export default Dialogs