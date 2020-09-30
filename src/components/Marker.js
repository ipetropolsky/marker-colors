import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import { green } from '@material-ui/core/colors';
import React from 'react';

const Marker = ({ markerId, brand, hex, rgb, code, name, checked, onClick }) => {
    const luma = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    const color = luma < 128 ? '#ffffff' : '#000000';
    return (
        <div
            className={`marker ${checked ? 'marker_checked' : ''}`}
            style={{ backgroundColor: hex, cursor: onClick ? 'pointer' : 'default' }}
            onClick={() => {
                onClick && onClick(markerId, !checked);
            }}
        >
            <span className="marker-brand">{brand}</span>
            <span className="marker-title" style={{ color }}>
                <span className="marker-code">{code}</span>
                <span className="marker-name">{name}</span>
            </span>
            {checked && (
                <span className="marker-checked">
                    <CheckCircleRoundedIcon style={{ color: green[500] }} />
                </span>
            )}
        </div>
    );
};

export default Marker;
