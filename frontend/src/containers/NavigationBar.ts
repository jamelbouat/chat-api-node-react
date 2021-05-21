import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { RootState } from '../../typings/redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import NavigationBar from '../components/NavigationBar';

const mapStateToProps = (state: RootState) => ({
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
    routeChange: () => ('')
});

export default withRouter(connect(
    null, mapDispatchToProps
)(NavigationBar));
