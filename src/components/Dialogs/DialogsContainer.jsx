import Dialogs from './Dialogs'
import { dialogsActions } from './../../redux/dialogsReducer'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import actions from 'redux-form/lib/actions'

let mapStateToProps = (state) => {
    return {
        state : state.dialogsPage,
    }
}

export default compose(
    connect(mapStateToProps, {AddDialog: dialogsActions.AddDialog}),
    withAuthRedirect
)(Dialogs) /* compose вызывает функции с конца для компонента Dialogs */