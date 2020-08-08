import React, {useEffect, useState} from 'react';
import "./Home.scss";
import CountryCard from "../../components/CountryCard/CountryCard";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import getAllCountriesThunk from "../../redux/actions/fetchAllCountries";
import Loader from "../../components/Loader/Loader";
import getCountrybyNameThunk from "../../redux/actions/fetchCountryByName";



const Home = ({getAllCountriesThunk, countries }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [searchedCountry, setSearchedCountry] = useState([])
    const [region, setRegion] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);

    const fetchCountries = async ()=>{
        setIsLoading(true)
        await getAllCountriesThunk();
        setIsLoading(false)
    }


const performSearch = (searchText) =>{
        const searchedData = countries?.data.filter((ele)=>{
            let name = ele.name.toLowerCase()
            return name.includes(searchText.toLowerCase())
        })
    setSearchedCountry(searchedData);
    return searchedData

}


const handleChange = (e)=>{
    const searchTerm = e.target.value
    setSearchText(searchTerm);
    performSearch(searchTerm)
}


const performFilter = (region)=>{
    const filteredCountry = countries?.data?.filter((ele)=> {
        let count = ele.region.toLowerCase()
        return count.includes(region.toLowerCase())
    })
    setFilteredCountries(filteredCountry)
    return filteredCountry
}


const handleFilter = (e)=>{
    const region = e.target.value
    setRegion(region);
    performFilter(region)
}


    useEffect(()=>{
        Promise.all([
            fetchCountries(),
    ])
    }, [])



    const countryData = searchText ? searchedCountry : region ? filteredCountries : countries?.data






    return (
        <React.Fragment>

            <div className="search-filter">
             <input
                 type="text"
                 placeholder="Search Country.."
                 value={searchText}
                 onChange={handleChange}
             />

             <select
                 placeholder="filter"
                 value={region}
                 onChange={handleFilter}
             >
                 <option value="">Filter by Region</option>
                     <option value="Asia"> Asia</option>
                     <option value="Africa"> Africa</option>
                     <option value="America"> America</option>
                     <option value="Oceania"> Oceania</option>
                     <option value="Europe"> Europe</option>
                     <option value="Polar"> Polar</option>

             </select>
            </div>



            <div className="countries">
                {isLoading ? (<Loader/> ):

               (         countryData && countryData?.map((country, index)=>(

                            <Link to={`${country.name}`}>
                                <CountryCard
                                    key={country.name}
                                    name={country.name}
                                    image={country.flag}
                                    population={country.population}
                                    region={country.region}
                                    capital={country.capital}
                                />
                            </Link>
                        )))

                }


            </div>

        </React.Fragment>

    )
}

const mapStateToProps = state => ({
    countries: state.countries.countries,

});

export default connect(mapStateToProps, {getAllCountriesThunk,
    getCountrybyNameThunk})(Home);