import {SET_LOCATION, SET_ID_PERSONAL,SET_LAST_DATE} from './types'

function setLocation(location) {
    return {
        type: 'SET_LOCATION',
        location
    };
}

function setPersonal(idPersonal) {
    return {
        type: 'SET_ID_PERSONAL',
        idPersonal
    };
}

function setLastDate(lastDate) {
    return {
        type: 'SET_LAST_DATE',
        lastDate
    };
}

const actionCreators={
    setLocation,
    setPersonal,
    setLastDate
}

export {actionCreators};
