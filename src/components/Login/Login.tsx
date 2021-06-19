import React, { FC } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { reduxForm } from 'redux-form'
import { login } from '../../redux/authReduser'
import Classes from './Login.module.css'
import LoginForm, { LoginFormOwnProps, LoginFormValuesType } from './LoginForm/LoginForm'
import { AppStateType } from './../../redux/reduxStore'

type MapStateToPropsType = {
    isAuth : boolean
    captchaURL: string | null
}

type MapDispatchPropsType = {
    login: (email: string, password: string,
     rememberMe:boolean, captcha:string) => void
}



const Login: FC<MapStateToPropsType & MapDispatchPropsType> = (props) => {
    
    const onSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to='/profile' />
    }
    
    return (
        <div className={Classes.LoginForm}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaURL={props.captchaURL}/>   
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth : state.auth.isAuth,
    captchaURL: state.auth.captchaURL
})


const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form : 'login'})(LoginForm) /* hoc */

export default connect(mapStateToProps, { login })(Login)