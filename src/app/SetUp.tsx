import React, { FC, useEffect } from 'react';
import moment from 'moment';
import { validateStillLoggedInUser } from '../store/auth/actions';
import { useSelector } from '../lib/hooks/store';
import Router from '../router';

export const SetUp: FC = () => {
    const authenticated = useSelector(state => state.auth.authenticated);
    const loggedInUser = useSelector(state => state.auth.loggedInUser);

    useEffect(() => {
        moment.locale('es');
        // validateStillLoggedInUser();
    }, []);

    if (authenticated === undefined) return <div />;
    return <Router authenticated={authenticated} loggedInUser={loggedInUser} />;
};

export default SetUp;
