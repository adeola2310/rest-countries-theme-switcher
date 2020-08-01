import { FETCH_SEARCHED_COUNTRIES} from "../../redux/types";
import axios from 'axios';



const getSearchedCountry = payload =>({
    type: FETCH_SEARCHED_COUNTRIES,
    payload
})


const getSearchedCountryThunk = (searchText) => async (dispatch) => {


    try {
        const {data} = axios.get(`https://restcountries.eu/rest/v2/name/${searchText}?fullText=true`)
            .then((res)=>{
                dispatch(getSearchedCountry(res));
            })
        return data

    }
    catch (error) {
    }
};

export default getSearchedCountryThunk;