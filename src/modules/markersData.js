import memoize from 'memoize-one';

import CopicJSON from '../data/markerColorsCopic';
import SketchmarkerJSON from '../data/markerColorsSketchmarker';
import FinecolourJSON from '../data/markerColorsFinecolour';
import fuzzySearch from './fuzzySearch';

export const getMarkers = memoize(() => {
    const copic = CopicJSON.copic;
    const sketchmarker = SketchmarkerJSON.sketchmarker;
    const finecolour = FinecolourJSON.finecolour;
    const result = {
        markersById: {},
        markersByCode: {},
        markersByBrand: {
            copic,
            sketchmarker,
            finecolour,
        },
        allMarkers: copic.concat(sketchmarker).concat(finecolour),
    };
    result.allMarkers.forEach((marker) => {
        marker.markerId = `${marker.brand}-${marker.code}`;
        result.markersById[marker.markerId] = marker;
        result.markersByCode[marker.code] = marker;
    });
    return result;
});

export const sortMarkersByHex = (markers) => {
    return [...markers].sort((a, b) => parseInt(b.hex.replace('#', ''), 16) - parseInt(a.hex.replace('#', ''), 16));
};

const matchBrand = (marker, collection) => {
    return !collection.length || collection.includes(marker.brand);
};

const matchCode = (marker, query) => {
    return fuzzySearch.match(query, marker.code);
};

const matchName = (marker, query) => {
    return fuzzySearch.match(query, marker.name) || fuzzySearch.match(query, marker.nameRu);
};

const matchColor = (marker, query) => {
    return fuzzySearch.match(query, marker.hex);
};

const matchCollection = (marker, collection = []) => {
    return !collection.length || collection.includes(marker.markerId);
};

export const filterMarkers = (
    markers,
    filter = { color: null, brand: null, code: null, name: null, collection: [] }
) => {
    const allFilterCollections = (filter.collection || []).reduce(
        (result, collection) => result.concat(collection),
        []
    );
    return markers.filter(
        (marker) =>
            matchColor(marker, filter.color) &&
            matchBrand(marker, filter.brand) &&
            matchCode(marker, filter.code) &&
            matchName(marker, filter.name) &&
            matchCollection(marker, allFilterCollections)
    );
};

export const getMarkersByCollection = (markersById = { markersById: [] }, collections = {}) => {
    const names = Object.keys(collections);
    return names.reduce((result, name) => {
        result[name] = collections[name].map((markerId) => markersById[markerId]);
        return result;
    }, {});
};
