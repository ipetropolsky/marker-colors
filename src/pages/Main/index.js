import React from 'react';

import MuiGrid from '@material-ui/core/Grid';

export default function MainPage() {
    return (
        <>
            <MuiGrid container spacing={4}>
                <MuiGrid item xs={12} md={12} lg={12}>
                    Hello, World!
                </MuiGrid>
            </MuiGrid>
        </>
    );
}
