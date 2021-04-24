import React from 'react'
import Classes from './LogoImage.module.css'
import four_five_shapka_removebg from '../../images/four_five_shapka_removebg.png'
import bg from '../../images/bg.png'

const LogoImage = () => {
    return (
        <div className={Classes.contentImg}>
          <div className={Classes.bgFon}>
            <img src={bg} />
            <div className={Classes.bgText}>
              <img src={four_five_shapka_removebg} />
            </div>
          </div>
        </div>
    )
}

export default LogoImage