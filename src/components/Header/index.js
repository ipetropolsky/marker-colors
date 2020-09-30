import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MuiTypography from '@material-ui/core/Typography';

import routes from '../../routes';

export default function Header() {
    return (
        <MuiTypography component="h1" variant="h5" color="inherit">
            <Switch>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} exact>
                        {route.title}
                    </Route>
                ))}
            </Switch>
        </MuiTypography>
    );
}
