import { GET_DOG, GET_DOGS, GET_DOGS_BY_NAME, LOADER, GET_TEMPERAMENTS, FILTER_BY_TEMPERAMENTS, FILTER_BY_EXISTING_C, GET_CURRENT_PAGE } from "../actions";

const initialState = {
    dogs: [],
    breed: {},
    temperaments: [],
    loader: false,
    currentPage: 1
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
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case FILTER_BY_TEMPERAMENTS:
            if(action.payload === 'todos' || action.payload === '') return {...state}
            const result = state.dogs.filter(e => {
                if(e.temperament) return e.temperament.includes(action.payload)
                else return false
            });
            return {
                ...state,
                dogs: result
            }
        case FILTER_BY_EXISTING_C:
            if(action.payload === 'todos' || action.payload === '') return {...state}
            let filtered;
            if(action.payload === 'api'){
                filtered = state.dogs.filter(e => {
                if(e.createInDb) return false
                else return true
                });
            }
            if(action.payload === 'db'){
                filtered = state.dogs.filter(e => {
                if(e.createInDb) return true
                else return false
                });
            }
            return {
                ...state,
                dogs: filtered
            }
        case GET_CURRENT_PAGE:
            return{
                ...state,
                currentPage: action.payload
            }
        case LOADER:
            const loader = state.loader;
            return loader === true ? {...state, loader: false} : {...state, loader: true};       
        default:
            return {...state}
    }
}

export default rootReducer;