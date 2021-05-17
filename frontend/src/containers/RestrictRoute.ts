import { connect } from 'react-redux';
import {RootState} from '../../typings/redux';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import RestrictRoute from '../routes/RestrictRoute';

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: state.loginState.isAuthenticated
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
});

export default connect<any, any, RootState>(
    mapStateToProps, mapDispatchToProps
)(RestrictRoute);
