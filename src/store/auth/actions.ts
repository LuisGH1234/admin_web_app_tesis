import { authHelper } from '../../lib/helpers';
import { Dispatch } from 'redux';
import actionTypes from './actionTypes';
import { userService } from '../../network/services';
import Store from '..';
import { ILogin } from '../../@types/entities';

export function login(email: string, password: string) {
    Store.dispatch<any>({
        callAPI: () => userService.login(email, password),
        types: [
            actionTypes.LOGIN_USER,
            actionTypes.LOGIN_USER_SUCCESS,
            actionTypes.LOGIN_USER_FAILURE,
        ],
        successFunction: (res: ILogin) => {
            authHelper.saveAuthorizationToken(res.token);
        },
    });
}

export function logout() {
    return async (dispatch: Dispatch) => {
        authHelper.removeAuthorizationToken();
        dispatch({ type: actionTypes.LOGOUT_USER });
    };
}

export function validateStillLoggedInUser() {
    return (dispatch: Dispatch) => {
        dispatch({ type: actionTypes.STILL_LOGGED_IN_USER });
    };
}
