import React from 'react';

import MuiTextField from '@material-ui/core/TextField';

const LargeSelect = ({ children, ...otherProps }) => {
    return (
        <MuiTextField select fullWidth {...otherProps}>
            {children}
        </MuiTextField>
    );
};

export default LargeSelect;
