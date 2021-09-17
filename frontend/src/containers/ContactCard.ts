import { Action } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { RootState } from '../interfaces/state';
import ContactCard from '../components/pages/dashboard/contactsContainer/ContactCard';
import { ROUTES } from '../constants';
import { addNewConversation } from '../actions/conversations';
import { routeChange } from '../actions/routes';

const mapStateToProps = (state: RootState) => ({
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
    redirectToContactProfile: (_id: string) => {
        dispatch(routeChange(ROUTES.CONTACT_PROFILE, { ':id': _id }));
    },
    addNewConversation: async (_id: string) => {
        await dispatch(addNewConversation([_id]));
    }
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(ContactCard);
