import { connect } from 'react-redux';
import { RootState } from '../../typings/redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import Home from '../components/pages/Home';

const mapStateToProps = (state: RootState) => ({
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(Home);
