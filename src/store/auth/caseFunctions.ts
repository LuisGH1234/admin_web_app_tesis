import { IState, initialState } from './reducer';
import { IAction } from '../../@types';

//#region LOGIN
export function loginUser(state: IState): IState {
    return {
        ...state,
        loggedInUser: {
            value: undefined,
            loading: true,
            error: undefined,
            message: undefined,
        },
    };
}

export function loginUserSuccess(state: IState, action: IAction): IState {
    return {
        ...state,
        authenticated: true,
        loggedInUser: {
            value: action.payload.user,
            loading: false,
            error: false,
            message: action.payload.message,
        },
    };
}

export function loginUserFailure(state: IState, action: IAction): IState {
    return {
        ...state,
        authenticated: false,
        loggedInUser: {
            value: undefined,
            loading: false,
            error: true,
            message: action.payload.message || action.payload.Message,
        },
    };
}
//#endregion

export function logoutUser(): IState {
    return {
        ...initialState,
        authenticated: false,
    };
}
