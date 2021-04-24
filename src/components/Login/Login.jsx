import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { reduxForm } from 'redux-form'
import { login, logout } from '../../redux/authReduser'
import Classes from './Login.module.css'
import LoginForm from './LoginForm/LoginForm'

const Login = (props) => {
    
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to='/profile' />
    }
    
    return (
        <div className={Classes.LoginForm}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>   
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth : state.auth.isAuth
})


const LoginReduxForm = reduxForm({form : 'login'})(LoginForm) /* hoc */

export default connect(mapStateToProps, {login, logout})(Login)