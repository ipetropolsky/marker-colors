import React from 'react';
import BrushIcon from '@material-ui/icons/Brush';

import MainPage from './pages/Main';

const routes = [
    {
        path: '/',
        component: MainPage(),
        title: 'Marker Colors',
        menuIcon: <BrushIcon />,
    },
];

export default routes;
