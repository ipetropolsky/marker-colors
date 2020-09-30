let userData = null;

export const loadUserData = () => {
    if (userData) {
        return userData;
    }
    try {
        userData = JSON.parse(localStorage.getItem('markers') || '');
    } catch (e) {}
    if (!userData) {
        userData = { collections: {} };
    }
    return userData;
};

const saveUserData = () => {
    localStorage.setItem('markers', JSON.stringify(userData));
};

const putCollection = (name, markerIds) => {
    userData = { ...userData, collections: { ...userData.collections, [name]: markerIds } };
    saveUserData();
};

export const putMarkerToCollection = (name, markerId) => {
    const collection = userData.collections[name] || [];
    if (!collection.includes(markerId)) {
        collection.push(markerId);
        userData = { ...userData, collections: { ...userData.collections, [name]: collection } };
        saveUserData();
    }
};

export const deleteMarkerFromCollection = (name, markerId) => {
    const collection = userData.collections[name] || [];
    if (collection.includes(markerId)) {
        userData = {
            ...userData,
            collections: { ...userData.collections, [name]: collection.filter((id) => id !== markerId) },
        };
        saveUserData();
    }
};
