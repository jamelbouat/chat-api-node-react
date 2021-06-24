import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import { RootState } from '../interfaces';
import Home from '../components/pages/Home';

const mapStateToProps = (state: RootState) => ({
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, Action>) => ({
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(Home);
