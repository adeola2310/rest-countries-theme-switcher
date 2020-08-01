import {FETCH_ALL_COUNTRIES} from "../../redux/types";
import axios from 'axios';



const getAllCountries = payload =>({
    type: FETCH_ALL_COUNTRIES,
    payload
})


const getAllCountriesThunk = () => async (dispatch) => {

    try {
        const {data} = axios.get("https://restcountries.eu/rest/v2/")
            .then((res)=>{
                dispatch(getAllCountries(res));
            })
        return data

    }
    catch (error) {
    }
};

export default getAllCountriesThunk;