import React from 'react';
import { Link } from 'react-router-dom';
import MuiList from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import MuiListItemText from '@material-ui/core/ListItemText/ListItemText';

import routes from '../../routes';

export default function Menu() {
    return (
        <MuiList>
            {routes.map((route, index) => (
                <MuiListItem key={index} button component={Link} to={route.path}>
                    <MuiListItemIcon>{route.menuIcon}</MuiListItemIcon>
                    <MuiListItemText primary={route.title} />
                </MuiListItem>
            ))}
        </MuiList>
    );
}
