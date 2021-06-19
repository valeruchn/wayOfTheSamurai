import React, { FC } from 'react'
import { Field, InjectedFormProps } from 'redux-form'
import { maxLengthCreator, requiredField } from '../../../utilits/validators/validators'
import { Element } from '../../common/FormsControls/FormsControls'
import Classes from './LoginForm.module.css'

const Input = Element('input')
const maxlength50 = maxLengthCreator(50)

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export interface LoginFormOwnProps {
    captchaURL: string | null
}

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = 
({handleSubmit, error, captchaURL}) => {
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <Field placeholder={"Email"} name={"email"} component={Input}
                        validate={[requiredField, maxlength50]} />
                </div>
                <div>
                    <Field placeholder={"Password"} name={"password"} component={Input} 
                        validate={[requiredField, maxlength50]}/>
                </div>
                <div>
                    <Field type={"checkbox"} name={"rememberMy"} component={Input} /> Remember me
                </div>

                {captchaURL && <img src={captchaURL} /> }
                {captchaURL && 
                    <div>
                        <Field placeholder={"Введите код с картинки"} name={"captcha"} component={Input} 
                            validate={[requiredField, maxlength50]}/>
                    </div>
                }

                {error && <div className={Classes.formSummaryError}>
                    {error}
                </div>
                }
                <div>
                    <button>Login</button>
                </div>
            </form>
        </div>
    )
}



export default LoginForm