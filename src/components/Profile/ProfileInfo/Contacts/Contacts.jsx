import React from 'react'

const Contacts = ({contactTitle, contactValue}) => {
    if (contactValue) {
        return (
            <div>
                {contactTitle} : {contactValue}
            </div>
        )
    } else return <></>   
}

export default Contacts