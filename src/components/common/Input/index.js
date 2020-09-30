import React from 'react';
import { TextField } from '@material-ui/core';

export default function Input(props) {
    return (
        <TextField
            size="small"
            fullWidth
            onFocus={({ target }) => {
                target.select();
            }}
            {...props}
        />
    );
}
