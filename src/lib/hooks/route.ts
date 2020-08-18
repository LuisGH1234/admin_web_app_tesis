import { useRole, useSelector } from './store';
import { Role } from '../constants';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { paths } from '../../router';

/** Returns the initial path depending on the user role */
export function useRootPath() {
    const role = useRole();
    // if (role === Role.ADMIN) return paths.MERCHANT_LIST;
    // if (role === Role.MERCHANT) return paths.LOCAL_LIST;
    // if (role === Role.LOCAL) return paths.CASH_LIST;
    return paths.LOGIN;
}

/**
 * Redirects to initial route depending on the user role
 * @param role user role
 */
export function useRedirectEffect(role: string | Role) {
    const authenticated = useSelector(x => x.auth.authenticated);
    const history = useHistory();
    const initialRoute = useRootPath();

    useEffect(() => {
        if (authenticated === true) history.push(initialRoute);
    }, [role]);
}
