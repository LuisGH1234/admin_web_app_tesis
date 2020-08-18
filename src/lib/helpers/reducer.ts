import { IAction } from '../../@types';

export function createReducer<T>(initialState: T, handlers) {
    return function reducer(state = initialState, action: IAction): T {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    };
}
