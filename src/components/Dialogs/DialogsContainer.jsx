import Dialogs from './Dialogs'
import {AddDialog} from './../../redux/dialogsReducer'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

let mapStateToProps = (state) => {
    return {
        state : state.dialogsPage,
    }
}

export default compose(
    connect(mapStateToProps, {AddDialog}),
    withAuthRedirect
)(Dialogs) /* compose вызывает функции с конца для компонента Dialogs */