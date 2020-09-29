import React, { useCallback, useState } from 'react';

import MuiButton from '@material-ui/core/Button';
import MuiGrid from '@material-ui/core/Grid';
import MuiMenuItem from '@material-ui/core/MenuItem';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import { green } from '@material-ui/core/colors';

import Box from '../../components/common/Box';
import BoxTitle from '../../components/common/Box/Title';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import fuzzySearch from '../../modules/fuzzySearch';

import CopicJSON from '../../data/markerColorsCopic';
import SketchmarkerJSON from '../../data/markerColorsSketchmarker';
import FinecolourJSON from '../../data/markerColorsFinecolour';

import { saveChecked, loadUserData } from '../../userData';

const FILTER_BY_CHECKED = {
    ALL: 'FILTER_BY_CHECKED_ALL',
    CHECKED: 'FILTER_BY_CHECKED_CHECKED',
    UNCHECKED: 'FILTER_BY_CHECKED_UNCHECKED',
};

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

const matchBrand = (marker, query) => {
    return fuzzySearch.match(query, marker.brand);
};

const matchText = (marker, query) => {
    return (
        fuzzySearch.match(query, marker.code) ||
        fuzzySearch.match(query, marker.name) ||
        fuzzySearch.match(query, marker.nameRu)
    );
};

const matchColor = (marker, query) => {
    return fuzzySearch.match(query, marker.hex);
};

const Page = () => {
    const copic = CopicJSON.copic;
    const sketchmarker = SketchmarkerJSON.sketchmarker;
    const finecolour = FinecolourJSON.finecolour;
    const markers = copic.concat(sketchmarker).concat(finecolour);

    const userData = loadUserData();
    const [checkedMarkers, setCheckedMarkers] = useState(userData.checked);
    const [filterByBrand, setFilterByBrand] = useState('');
    const [filterByText, setFilterByText] = useState('');
    const [filterByColor, setFilterByColor] = useState('');
    const [filterByChecked, setFilterByChecked] = useState(FILTER_BY_CHECKED.ALL);

    const matchChecked = useCallback(
        (marker, filterType) => {
            switch (filterType) {
                case FILTER_BY_CHECKED.CHECKED:
                    return checkedMarkers.includes(marker.markerId);
                case FILTER_BY_CHECKED.UNCHECKED:
                    return !checkedMarkers.includes(marker.markerId);
                default:
                    return true;
            }
        },
        [checkedMarkers]
    );

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

    const applyFilterByBrand = (value) => {
        setFilterByBrand(value);
    };

    const applyFilterByText = (value) => {
        setFilterByText(value);
    };

    const applyFilterByColor = (value) => {
        setFilterByColor(value);
    };

    const applyFilterByChecked = (value) => {
        console.log(value);
        setFilterByChecked(value);
    };

    const filteredMarkers = markers.filter((marker) => {
        return (
            matchColor(marker, filterByColor) &&
            matchBrand(marker, filterByBrand) &&
            matchText(marker, filterByText) &&
            matchChecked(marker, filterByChecked)
        );
    });

    return (
        <>
            <MuiGrid container spacing={4}>
                <MuiGrid item xs={12} md={12} lg={12}>
                    <BoxTitle>Фильтр</BoxTitle>
                    <Box>
                        <MuiGrid container spacing={3}>
                            <MuiGrid item xs={12} md={3} lg={3}>
                                <Input
                                    value={filterByBrand}
                                    onChange={({ target }) => applyFilterByBrand(target.value)}
                                    label="Производитель"
                                />
                            </MuiGrid>
                            <MuiGrid item xs={12} md={3} lg={3}>
                                <Input
                                    value={filterByText}
                                    onChange={({ target }) => applyFilterByText(target.value)}
                                    label="Код/название"
                                />
                            </MuiGrid>
                            <MuiGrid item xs={12} md={3} lg={3}>
                                <Input
                                    value={filterByColor}
                                    onChange={({ target }) => applyFilterByColor(target.value)}
                                    label="Цвет"
                                />
                            </MuiGrid>
                            <MuiGrid item xs={12} md={3} lg={3}>
                                <Select
                                    value={filterByChecked}
                                    onChange={({ target }) => applyFilterByChecked(target.value)}
                                    label="Выбранные"
                                >
                                    <MuiMenuItem value={FILTER_BY_CHECKED.ALL}>Все</MuiMenuItem>
                                    <MuiMenuItem value={FILTER_BY_CHECKED.CHECKED}>Только выбранные</MuiMenuItem>
                                    <MuiMenuItem value={FILTER_BY_CHECKED.UNCHECKED}>Кроме выбранных</MuiMenuItem>
                                </Select>
                            </MuiGrid>
                        </MuiGrid>
                    </Box>

                    {filteredMarkers.map((marker) => {
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
