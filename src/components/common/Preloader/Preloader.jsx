import React from 'react'
import loader from '../../../images/loader.svg'


const Preloader = (props) => {
    return (
        <div>
            {props.isFetching ? <img src={loader} /> : null}
        </div>
    )

}

export default Preloader