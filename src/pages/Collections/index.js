import React, { useCallback, useState } from 'react';

import MuiGrid from '@material-ui/core/Grid';
import MuiList from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';

import { loadUserData } from '../../userData';
import { Link } from 'react-router-dom';
import MuiTypography from '@material-ui/core/Typography';

const Page = () => {
    const userData = loadUserData();
    const collections = Object.keys(userData.collections);
    console.log(collections);

    return (
        <>
            <MuiGrid container spacing={4}>
                <MuiGrid item xs={12} md={12} lg={12}>
                    <MuiList>
                        {collections.map((name) => (
                            <MuiListItem key={name} button onClick={() => {}}>
                                {name}
                            </MuiListItem>
                        ))}
                    </MuiList>
                </MuiGrid>
            </MuiGrid>
        </>
    );
};

export default function CollectionsPage() {
    return <Page />;
}
