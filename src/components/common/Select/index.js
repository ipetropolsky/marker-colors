import React from 'react';
import MuiTextField from '@material-ui/core/TextField';

export default function Select({ children, ...otherProps }) {
    return (
        <MuiTextField select size="small" fullWidth {...otherProps}>
            {children}
        </MuiTextField>
    );
}
