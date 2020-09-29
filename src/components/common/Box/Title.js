import React from 'react';
import MuiTypography from '@material-ui/core/Typography';

export default function Title(props) {
    return (
        <MuiTypography component="h2" variant="h6" color="primary" paragraph>
            {props.children}
        </MuiTypography>
    );
}
