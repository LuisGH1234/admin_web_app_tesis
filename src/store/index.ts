import thunk from 'redux-thunk';
import authReducer, { IState as IAuthState } from './auth/reducer';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { callAPIMiddleware } from '../lib/middlewares';

export interface IRootState {
    auth: IAuthState;
}

const rootReducer = combineReducers<IRootState>({
    auth: authReducer,
});

const createStoreWithMiddleware = applyMiddleware(thunk, callAPIMiddleware)(createStore);
const store = createStoreWithMiddleware(rootReducer);

export default store;
