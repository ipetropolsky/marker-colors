import React from 'react';

import MuiTooltip from '@material-ui/core/Tooltip';
import MuiTypography from '@material-ui/core/Typography';
import MuiIconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import { makeStyles } from '@material-ui/core/styles';

// import { withStyles } from '@material-ui/core/styles';
// const LightTooltip = withStyles((theme) => ({
//     tooltip: {
//         backgroundColor: theme.palette.common.white,
//         color: 'rgba(0, 0, 0, 0.87)',
//         boxShadow: theme.shadows[1],
//         fontSize: 11,
//     },
// }))(MuiTooltip);

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
    },
}));

function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();

    return <MuiTooltip arrow classes={classes} {...props} />;
}

const Wtf = ({ children }) => {
    return (
        <BootstrapTooltip title={<MuiTypography>{children}</MuiTypography>}>
            <MuiIconButton size="small">
                <HelpIcon />
            </MuiIconButton>
        </BootstrapTooltip>
    );
};

export default Wtf;
