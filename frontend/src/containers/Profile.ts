import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import Profile from '../components/pages/Profile';
import { RootState } from '../../typings/redux';

const mapStateToProps = (state: RootState) => ({
    user: state.loginState.user
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({

});

export default connect(
    mapStateToProps, mapDispatchToProps
)(Profile);
