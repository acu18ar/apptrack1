import {SET_LOCATION, SET_ID_PERSONAL,SET_LAST_DATE} from './types'

const initialState = {
    idPersonal: '',
    lastDate: '',
    lat: 0,
    lon: 0
}

function applySetLocation(state, location) {
    return {
        ...state,
        lat: location.coords.latitude,
        lon: location.coords.longitude
    }
}

function applySetPersonal(state, idPersonal) {
    return {
        ...state,
        idPersonal: idPersonal
    }
}

function applySetLastDate(state, lastDate) {
    return {
        ...state,
        lastDate: lastDate
    }
}

function reducer(state=initialState, action) {
    switch(action.type) {
        case 'SET_LOCATION':
            return applySetLocation(state, action.location);
        case 'SET_ID_PERSONAL':
            return applySetPersonal(state, action.idPersonal);
        case 'SET_LAST_DATE':
            return applySetLastDate(state, action.lastDate);
        default:
            return state
    }
}

export default reducer;