import { GET_DOG, GET_DOGS, GET_DOGS_BY_NAME } from "../actions";

const initialState = {
    dogs: [],
    breed: {},
    temperaments: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_DOG:
            return {
                ...state,
                breed: action.payload
            }
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload
            }
        case GET_DOGS_BY_NAME:
            return {
                ...state,
                dogs: action.payload
            }
        default:
            return {...state}
    }
}

export default rootReducer;