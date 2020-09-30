import React, { useCallback, useState } from 'react';

import MuiGrid from '@material-ui/core/Grid';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiTypography from '@material-ui/core/Typography';
import MuiExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { loadUserData } from '../../userData';
import Marker from '../../components/Marker';
import { getMarkers, sortMarkersByHex, getMarkersByCollection } from '../../modules/markersData';

// .MuiAccordionSummary-content.Mui-expanded

const Page = () => {
    const { markersById } = getMarkers();

    const userData = loadUserData();
    const collectionNames = Object.keys(userData.collections);
    const markersByCollection = getMarkersByCollection(markersById, userData.collections);

    return (
        <>
            <MuiGrid container spacing={4}>
                <MuiGrid item xs={12} md={12} lg={12}>
                    {collectionNames.map((name) => (
                        <MuiAccordion>
                            <MuiAccordionSummary expandIcon={<MuiExpandMoreIcon />}>
                                <MuiTypography variant="h5">{name}</MuiTypography>
                            </MuiAccordionSummary>
                            <MuiAccordionDetails>
                                <MuiTypography>
                                    {sortMarkersByHex(markersByCollection[name]).map((marker) => {
                                        return <Marker key={marker.markerId} {...marker} />;
                                    })}
                                </MuiTypography>
                            </MuiAccordionDetails>
                        </MuiAccordion>
                    ))}
                </MuiGrid>
            </MuiGrid>
        </>
    );
};

export default function CollectionsPage() {
    return <Page />;
}
