import React from 'react';
import BrushIcon from '@material-ui/icons/Brush';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

import MainPage from './pages/Main';
import CollectionsPage from './pages/Collections';

const routes = [
    {
        path: '/',
        component: MainPage,
        title: 'Маркеры',
        menuIcon: <BrushIcon />,
    },
    {
        path: '/collections',
        component: CollectionsPage,
        title: 'Коллекции',
        menuIcon: <BookmarksIcon />,
    },
];

export default routes;
