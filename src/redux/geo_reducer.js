

const SET_GEO = 'SET_GEO';

const initialState = {
    latitude: 53,
    longitude: 83,
};

const exchange_reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GEO:
            return {
                ...state,
                latitude: action.geo.latitude,
                longitude: action.geo.longitude,
            }

        default:
            return state;
    }
};

export const setGeo = (geo) => ({type: SET_GEO, geo});


export default exchange_reducer;