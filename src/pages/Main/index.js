import React, { useState } from 'react';

import MuiGrid from '@material-ui/core/Grid';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import { green } from '@material-ui/core/colors';

import CopicJSON from '../../data/markerColorsCopic';
import SketchmarkerJSON from '../../data/markerColorsSketchmarker';
import FinecolourJSON from '../../data/markerColorsFinecolour';

import { saveChecked, loadUserData } from '../../userData';

const Marker = ({ markerId, brand, hex, rgb, code, name, checked, onClick }) => {
    const luma = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    const color = luma < 128 ? '#ffffff' : '#000000';
    return (
        <div
            className={`marker ${checked ? 'marker_checked' : ''}`}
            style={{ backgroundColor: hex }}
            onClick={() => {
                onClick(markerId, !checked);
            }}
        >
            <span className="marker-brand">{brand}</span>
            <span className="marker-code" style={{ color }}>
                {code}
            </span>
            <span className="marker-name">{name}</span>
            {checked && (
                <span className="marker-checked">
                    <CheckCircleRoundedIcon style={{ color: green[500] }} />
                </span>
            )}
        </div>
    );
};

const Page = () => {
    const copic = CopicJSON.copic;
    const sketchmarker = SketchmarkerJSON.sketchmarker;
    const finecolour = FinecolourJSON.finecolour;
    const markers = copic.concat(sketchmarker).concat(finecolour);

    const userData = loadUserData();
    const [checkedMarkers, setCheckedMarkers] = useState(userData.checked);

    markers.sort((a, b) => parseInt(b.hex.replace('#', ''), 16) - parseInt(a.hex.replace('#', ''), 16));
    markers.forEach((marker) => {
        marker.markerId = `${marker.brand}-${marker.code}`;
    });

    const onClick = (markerId, newChecked) => {
        const newCheckedMarkers = newChecked
            ? [...checkedMarkers, markerId]
            : checkedMarkers.filter((id) => id !== markerId);
        setCheckedMarkers(newCheckedMarkers);
        saveChecked(newCheckedMarkers);
    };

    return (
        <>
            <MuiGrid container spacing={4}>
                <MuiGrid item xs={12} md={12} lg={12}>
                    {markers.map((marker) => {
                        return (
                            <Marker
                                key={marker.markerId}
                                {...marker}
                                onClick={onClick}
                                checked={checkedMarkers.includes(marker.markerId)}
                            />
                        );
                    })}
                </MuiGrid>
            </MuiGrid>
        </>
    );
};

export default function MainPage() {
    return <Page />;
}
