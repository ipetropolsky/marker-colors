import React from 'react';
import { Link } from 'react-router-dom';
import MuiDivider from '@material-ui/core/Divider';
import MuiList from '@material-ui/core/List';
import MuiDrawer from '@material-ui/core/Drawer/Drawer';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import MuiListItemText from '@material-ui/core/ListItemText/ListItemText';

import './Menu.css';
import routes from '../../routes';

export default function Menu() {
    return (
        <MuiDrawer variant="permanent" className="menu" open={true}>
            <div className="menu__toolbar" />
            <MuiDivider />
            <MuiList>
                {routes.map((route, index) => (
                    <MuiListItem key={index} button component={Link} to={route.path}>
                        <MuiListItemIcon>{route.menuIcon}</MuiListItemIcon>
                        <MuiListItemText primary={route.title} />
                    </MuiListItem>
                ))}
            </MuiList>
        </MuiDrawer>
    );
}
