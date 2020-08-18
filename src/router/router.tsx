import React, { FC } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { paths } from './paths';
import { Login, Page404, ContactUs } from '../pages';
import { PrivateRoute } from '../components';
import { Role } from '../lib/constants';

type IProps = {
    loggedInUser: any;
    authenticated: boolean;
};

const Router: FC<IProps> = ({ authenticated, loggedInUser }) => {
    const initialRoute = authenticated === true ? paths.CONTACT_US : paths.LOGIN;
    console.log('Authenticated:', authenticated, initialRoute);

    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact from="/" to={initialRoute} />
                <Route exact path={paths.LOGIN} component={Login} />
                <PrivateRoute
                    exact
                    path={paths.CONTACT_US}
                    component={ContactUs}
                    // layout={MainLayout}
                    roles={[Role.SuperAdmin]}
                />
                <Route component={Page404} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
