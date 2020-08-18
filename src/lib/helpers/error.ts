import { Dispatch } from 'redux';
import { authHelper } from '.';
import { httpStatus, messages } from '../constants';

export async function handle(error: any, dispatch: Dispatch, actionType: string) {
    const response = error.response;

    if (!response) dispatch({ type: actionType, payload: { error: messages.GENERAL_ERROR } });
    else if (await authHelper.isUnauthorizedCall(dispatch, response)) return;
    else if (response.status == httpStatus.BAD_REQUEST)
        if (response.data.message)
            dispatch({ type: actionType, payload: { error: response.data.message } });
        else dispatch({ type: actionType, payload: { error: messages.GENERAL_ERROR } });
    else dispatch({ type: actionType, payload: { error: messages.GENERAL_ERROR } });
}
