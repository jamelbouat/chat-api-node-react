import { Action, Dispatch } from 'redux';
import { push } from 'connected-react-router';

import { ROUTES } from '../constants';
import { ROUTE_CHANGE } from './types';

// export interface IRouteAction extends Action {
//     payload: {
//         pathname: ROUTES
//     }
// }
//
// export const routeChange = (pathname: ROUTES) => (dispatch: Dispatch<Action>): void => {
//     dispatch(routeChangeAction(pathname));
//     push(pathname);
// };
//
// const routeChangeAction = (pathname: ROUTES): IRouteAction => (
//     {
//         type: ROUTE_CHANGE,
//         payload: {
//             pathname
//         }
//     }
// );
