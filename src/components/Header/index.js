import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MuiBox from '@material-ui/core/Box';
import MuiToolbar from '@material-ui/core/Toolbar';
import MuiTypography from '@material-ui/core/Typography';
import MuiAppBar from '@material-ui/core/AppBar/AppBar';

import routes from '../../routes';

export default function Header() {
    return (
        <MuiBox mb={4}>
            <MuiAppBar position="static">
                <MuiToolbar>
                    <MuiTypography component="h1" variant="h5" color="inherit">
                        <Switch>
                            {routes.map((route, index) => (
                                <Route key={index} path={route.path} exact>
                                    {route.title}
                                </Route>
                            ))}
                        </Switch>
                    </MuiTypography>
                </MuiToolbar>
            </MuiAppBar>
        </MuiBox>
    );
}
