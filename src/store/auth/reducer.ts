import { IProcessState, IObjectState } from '../../@types';
import { createReducer } from '../../lib/helpers/reducer';
import actionTypes from './actionTypes';
import * as caseFunctions from './caseFunctions';
import { ILogin, IUser } from '../../@types/entities';

export interface IState {
    authenticated?: boolean;
    verifyLoggedInUser: IProcessState;
    loggedInUser: IObjectState<IUser>;
}

export const initialState: IState = {
    authenticated: false,
    verifyLoggedInUser: { success: false, loading: false, error: undefined },
    loggedInUser: { value: undefined, loading: false, error: undefined },
};

export default createReducer(initialState, {
    [actionTypes.LOGIN_USER]: caseFunctions.loginUser,
    [actionTypes.LOGIN_USER_SUCCESS]: caseFunctions.loginUserSuccess,
    [actionTypes.LOGIN_USER_FAILURE]: caseFunctions.loginUserFailure,
});
