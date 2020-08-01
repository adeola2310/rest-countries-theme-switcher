import {FETCH_ALL_COUNTRIES,
    FETCH_COUNTRY_BY_NAME} from "../../redux/types";

const initialState = {
    countries:[]
};

const countriesReducer = (state = initialState, action) =>{
    switch (action.type) {
        case FETCH_ALL_COUNTRIES:
            return{
                ...state,
                countries: action.payload
            }

        case FETCH_COUNTRY_BY_NAME:
            return {
                ...state,
                countryDetail: action.payload
            }
        default:
            return state

    }

}

export default countriesReducer;