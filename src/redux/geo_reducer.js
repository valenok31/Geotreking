const SET_GEO = 'SET_GEO';

const initialState = {
    coords: [

        {
            latitude: 53.4259274,
            longitude: 83.9368934
        }
    ],
    latitude: 53.4259274,
    longitude: 83.9368934
};

const exchange_reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GEO:
            return {
                ...state,
                coords: [...state.coords, action.geo],
                latitude: action.geo.latitude,
                longitude: action.geo.longitude,
            }

        default:
            return state;
    }
};

export const setGeo = (geo) => ({type: SET_GEO, geo});


export default exchange_reducer;