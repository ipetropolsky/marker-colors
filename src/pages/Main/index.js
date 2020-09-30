import React, { useCallback, useMemo, useState } from 'react';

import MuiGrid from '@material-ui/core/Grid';
import MuiBox from '@material-ui/core/Box';

import Box from '../../components/common/Box';
import Input from '../../components/common/Input';
import MultiSelect from '../../components/common/MultiSelect';
import { getMarkers, filterMarkers, sortMarkersByHex } from '../../modules/markersData';
import { toggle } from '../../modules/toggle';
import Marker from '../../components/Marker';

import { loadUserData } from '../../userData';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    filterButton: {
        marginLeft: theme.spacing(2),
    },
}));

const Page = () => {
    const classes = useStyles();

    const { allMarkers, markersByBrand } = getMarkers();
    const markers = sortMarkersByHex(allMarkers);
    const brands = Object.keys(markersByBrand);
    brands.sort();

    const userData = loadUserData();
    const collections = Object.keys(userData.collections);

    const [filterByBrand, setFilterByBrand] = useState([]);
    const [filterByCode, setFilterByCode] = useState('');
    const [filterByName, setFilterByName] = useState('');
    const [filterByColor, setFilterByColor] = useState('');
    const [filterByCollection, setFilterByCollection] = useState([]);

    const toggleFilterByBrand = (name, checked) => {
        setFilterByBrand(toggle(filterByBrand, name, checked));
    };

    const applyFilterByCode = (value) => {
        setFilterByCode(value);
    };

    const applyFilterByName = (value) => {
        setFilterByName(value);
    };

    const applyFilterByColor = (value) => {
        setFilterByColor(value);
    };

    const toggleFilterByCollection = (name, checked) => {
        setFilterByCollection(toggle(filterByCollection, name, checked));
    };

    const filteredMarkers = filterMarkers(markers, {
        color: filterByColor,
        brand: filterByBrand,
        code: filterByCode,
        name: filterByName,
        collection: filterByCollection.map((name) => userData.collections[name] || []),
    });

    const allBrandsSelected = !filterByBrand.length || filterByBrand.length === brands.length;

    return (
        <>
            <MuiGrid container spacing={4}>
                <MuiGrid item xs={12} md={12} lg={12}>
                    <Box>
                        <MuiGrid container spacing={3}>
                            <MuiGrid item xs={6} md={4} lg={4}>
                                <Input
                                    value={filterByCode}
                                    onChange={({ target }) => applyFilterByCode(target.value)}
                                    label="Код"
                                />
                            </MuiGrid>
                            <MuiGrid item xs={6} md={4} lg={4}>
                                <Input
                                    value={filterByName}
                                    onChange={({ target }) => applyFilterByName(target.value)}
                                    label="Название"
                                />
                            </MuiGrid>
                            <MuiGrid item xs={6} md={4} lg={4}>
                                <Input
                                    value={filterByColor}
                                    onChange={({ target }) => applyFilterByColor(target.value)}
                                    label="Цвет"
                                />
                            </MuiGrid>
                            <MuiGrid item xs={6} sm={6} md={12} lg={12}>
                                <MuiBox style={{ display: 'inline-block', marginRight: 10, marginBottom: 10 }}>
                                    <MultiSelect
                                        title={`Производители ${!allBrandsSelected ? `(${filterByBrand.length})` : ''}`}
                                        items={brands.map((id) => ({ id, text: id }))}
                                        checked={filterByBrand}
                                        toggle={toggleFilterByBrand}
                                        className={classes.filterButton}
                                    />
                                </MuiBox>
                                <MultiSelect
                                    title={`В коллекциях ${
                                        filterByCollection.length ? `(${filterByCollection.length})` : ''
                                    }`}
                                    items={collections.map((id) => ({ id, text: id }))}
                                    checked={filterByCollection}
                                    toggle={toggleFilterByCollection}
                                />
                            </MuiGrid>
                        </MuiGrid>
                    </Box>

                    {filteredMarkers.map((marker) => {
                        return <Marker key={marker.markerId} {...marker} />;
                    })}
                </MuiGrid>
            </MuiGrid>
        </>
    );
};

export default function MainPage() {
    return <Page />;
}
