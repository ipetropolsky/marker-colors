import React from 'react';

import Button from '@material-ui/core/Button';
import MuiMenu from '@material-ui/core/Menu';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
import MuiCheckbox from '@material-ui/core/Checkbox';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default function MultiSelect({ title, items, checked, toggle }) {
    return (
        <PopupState variant="popover" popupId="multiselect">
            {(popupState) => (
                <React.Fragment>
                    <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
                        {title}
                    </Button>
                    <MuiMenu variant="menu" keepMounted={true} {...bindMenu(popupState)}>
                        {items.map(({ id, text }) => (
                            <MuiMenuItem
                                key={id}
                                onClick={() => {
                                    toggle(id, !checked.includes(id));
                                }}
                            >
                                <MuiFormControlLabel
                                    control={<MuiCheckbox checked={checked.includes(id)} />}
                                    style={{ pointerEvents: 'none' }}
                                    label={text}
                                />
                            </MuiMenuItem>
                        ))}
                    </MuiMenu>
                </React.Fragment>
            )}
        </PopupState>
    );
}
