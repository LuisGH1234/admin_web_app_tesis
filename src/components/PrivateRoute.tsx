import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { Role } from '../lib/constants';
import { useSelector, useRootPath, useRole } from '../lib/hooks';
import { paths } from '../router';

interface IOwnProps {
    component: React.ComponentType<any>;
    layout?: React.ComponentType<any>;
    roles?: Role[];
}

export type IProps = IOwnProps & RouteProps;

const PrivateRoute: FC<IProps> = props => {
    const { component: RenderComponent, layout: Layout, roles, ...rest } = props;
    const role = useRole();
    const authenticated = useSelector(state => state.auth.authenticated);
    const route = useRootPath();
    console.log(role);
    const renderRoute = (props: any) => {
        if (!authenticated) {
            console.log('no esta autenticado, redireccionando al login...');
            return <Redirect to={{ pathname: paths.LOGIN, state: { from: props.location } }} />;
        } else if (roles && !roles.includes(role)) {
            console.log('estas autenticado pero no tienes permisos...', route);
            return <Redirect to={{ pathname: route, state: { from: props.location } }} />;
        } else if (Layout) {
            return (
                <Layout>
                    <RenderComponent {...props} />
                </Layout>
            );
        }
        return <RenderComponent {...props} />;
    };

    return <Route {...rest} render={renderRoute} />;
};

export default PrivateRoute;
