import axios from 'axios';

export const GET_DOG = 'GET_DOG';
export const GET_DOGS = 'GET_DOGS';
export const GET_DOGS_BY_NAME = 'GET_DOGS_BY_NAME';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const GET_CURRENT_PAGE = 'GET_CURRENT_PAGE';
export const FILTER_BY_TEMPERAMENTS = 'FILTER_BY_TEMPERAMENTS';
export const FILTER_BY_EXISTING_C = 'FILTER_BY_EXISTING_C';
export const LOADER = 'LOADER';

export const getDog = idBreed => {
    return function(dispatch){
        axios.get(`http://localhost:3001/dogs/${idBreed}`)
            .then(response => response.data)
            .then(data => dispatch({type: GET_DOG, payload: data}));
    }
}

export const getDogs = () => {
    return async dispatch => {
        await axios.get(`http://localhost:3001/dogs`)
            .then(response => response.data)
            .then(data => dispatch({type: GET_DOGS, payload: data}));
    }
}

export const getDogsByName = name => {
    return async dispatch => {
        await axios.get(`http://localhost:3001/dogs?name=${name}`)
            .then(response => response.data)
            .then(data => dispatch({type: GET_DOGS_BY_NAME, payload: data}))
            .catch(err => alert(err.response.data))
    }
}

export const getTemperaments = () => {
    return dispatch => {
        axios.get('http://localhost:3001/temperaments')
           .then(response => response.data)
           .then(data => dispatch({type: GET_TEMPERAMENTS, payload: data}));
    }
}

export const filterByTemperaments = payload => {
    return dispatch => dispatch({type: FILTER_BY_TEMPERAMENTS, payload});
}

export const filterByExistingC = payload => {
    return dispatch => dispatch({type: FILTER_BY_EXISTING_C, payload});
}

export const getCurrentPage = (payload) => {
    return dispatch => dispatch({type: GET_CURRENT_PAGE, payload});
}

export const loading = () => {
    return dispatch => dispatch({type: LOADER});
}