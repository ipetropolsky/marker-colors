let userData = null;

export const loadUserData = () => {
    if (userData) {
        return userData;
    }
    try {
        userData = JSON.parse(localStorage.getItem('markers') || '');
    } catch (e) {}
    if (!userData) {
        userData = { checked: [] };
    }
    return userData;
};

export const saveChecked = (checked) => localStorage.setItem('markers', JSON.stringify({ ...userData, checked }));
