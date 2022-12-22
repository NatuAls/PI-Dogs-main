import axios from 'axios';

export const GET_DOG = 'GET_DOG';
export const GET_DOGS = 'GET_DOGS';
export const GET_DOGS_BY_NAME = 'GET_DOGS_BY_NAME';

export const getDog = idBreed => {
    return function(dispatch){
        axios.get(`http://localhost:3001/dogs/${idBreed}`)
            .then(response => response.data)
            .then(data => dispatch({type: GET_DOG, payload: data}));
    }
}

export const getDogs = () => {
    return dispatch => {
        axios.get(`http://localhost:3001/dogs`)
            .then(response => response.data)
            .then(data => dispatch({type: GET_DOGS, payload: data}));
    }
}

export const getDogsByName = name => {
    return dispatch => {
        axios.get(`http://localhost:3001/dogs?name=${name}`)
            .then(response => response.data)
            .then(data => dispatch({type: GET_DOGS_BY_NAME, payload: data}))
            .catch(err => alert(err.response.data))
    }
}