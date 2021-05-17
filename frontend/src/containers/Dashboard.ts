import { connect } from 'react-redux';
import {RootState} from '../../typings/redux';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import Home from '../components/pages/Home';
import Dashboard from '../components/pages/Dashboard';

const mapStateToProps = (state: RootState) => ({
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
});

export default connect(
    null, null
)(Dashboard);
