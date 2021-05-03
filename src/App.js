import React, { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router'
import './App.css'
import Preloader from './components/common/Preloader/Preloader'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import LogoImage from './components/LogoImage/LogoImage'
import Music from './components/Music/Music'
import NavbarContainer from './components/Navbar/NavbarContainer'
import News from './components/News/News'
import Settings from './components/settings/Settings'
import { initializeApp } from './redux/appReduser'
import { HashRouter, BrowserRouter } from 'react-router-dom';
import store from './redux/reduxStore';
import { Provider } from 'react-redux';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))


const App = (props) => {

  const initialized = useSelector(state => state.app.initialized)
  const dispatch = useDispatch()

  const catchAllUnhandledErrors = (PromiseRejectionEvent) => {
    console.log('Some error occured')
  }

  useEffect(() => {
    dispatch(initializeApp())
    window.addEventListener('unhandledrejection', catchAllUnhandledErrors)
    return window.removeEventListener('unhandledrejection', catchAllUnhandledErrors)
  }, [dispatch])

  if (!initialized) {
    return <Preloader isFetching={true} />
  }

  return (
    <div className='app-wrapper'>
      <HeaderContainer />
      <NavbarContainer />
      <div className='app-wrapper-content'>
        <LogoImage />

        <Route exact path='/' render={() => <Redirect to={'/profile'} />} />

        <Suspense fallback={<Preloader isFetching={true} />}>
          <Route path='/users' render={() => <UsersContainer />} />
          <Route path='/dialogs' render={() => <DialogsContainer />} />
          <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
        </Suspense>

        <Route path='/news' component={News} />
        <Route path='/music' component={Music} />
        <Route path='/settings' component={Settings} />
        <Route path='/login' render={() => <Login />} />

      </div>
    </div>
  )

}

const AppContainer = (props) => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  )
}


export default AppContainer
