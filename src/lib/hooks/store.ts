import { useSelector as $useSelector, Provider } from 'react-redux';
import { IRootState } from '../../store';
import { Role } from '../constants';
import { IObjectState } from '../../@types';
import { IUser } from '../../@types/entities';

export function useSelector<T>(
    fn: (state: IRootState) => T,
    equalityFn?: (left: T, right: T) => boolean,
) {
    return $useSelector<IRootState, T>(fn, equalityFn);
}

export function useLoggedUser() {
    return $useSelector<IRootState, IObjectState<IUser>>(state => state.auth.loggedInUser);
}

export function useRole(): Role {
    const loggedInUser = useLoggedUser();
    return loggedInUser.value?.roleID as Role;
}
