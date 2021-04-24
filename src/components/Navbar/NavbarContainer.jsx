import { connect } from 'react-redux'
import Navbar from './Navbar'

let mapStateToProps = (state) => {
    return {
        state : state.navbar
    }
}

const NavbarContainer = connect(mapStateToProps)(Navbar)

export default NavbarContainer