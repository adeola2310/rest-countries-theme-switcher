import { FETCH_COUNTRY_BY_NAME} from "../../redux/types";
import axios from 'axios';



const getCountrybyName = payload =>({
    type: FETCH_COUNTRY_BY_NAME,
    payload
})


const getCountrybyNameThunk = (payload) => async (dispatch) => {


    try {
        const {data} = axios.get(`https://restcountries.eu/rest/v2/name/${payload.name}`)
            .then((res)=>{
                dispatch(getCountrybyName(res));
            })
          return data

    }
    catch (error) {
    }
};

export default getCountrybyNameThunk;