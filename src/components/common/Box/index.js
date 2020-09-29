import React from 'react';
import { Paper } from '@material-ui/core';

import './Box.css';

export default function Box({ children, ...props }) {
    return (
        <Paper className="box" {...props}>
            {children}
        </Paper>
    );
}
