import React, {useEffect, useState} from 'react';
import "./Home.scss";
import CountryCard from "../../components/CountryCard/CountryCard";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import getAllCountriesThunk from "../../redux/actions/fetchAllCountries";
import Loader from "../../components/Loader/Loader";
import getCountrybyNameThunk from "../../redux/actions/fetchCountryByName";
import getSearchedCountryThunk from "../../redux/actions/fetchSearchedCountries";



const Home = ({getAllCountriesThunk, countries, country, getSearchedCountryThunk }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [searchText, setSearchText] = useState('')

    const fetchCountries = async ()=>{
        await getAllCountriesThunk()
    }

    const fetchSearchedCountry = async (searchTerm)=>{
        setSearchText(searchTerm);
        await getSearchedCountryThunk(searchTerm)
    }



    useEffect(()=>{
        Promise.all([
            fetchCountries(),
            fetchSearchedCountry()
    ])
    }, [])


    const countryData = searchText ? country : countries

    return (
        <React.Fragment>

            <div className="search-filter">
             <input
                 type="text"
                 placeholder="Search Country.."
                 value={searchText}
                 onChange={fetchSearchedCountry}
             />

             <select>
                 <option>Filter by Region</option>
             </select>
            </div>

            <div className="countries">
                {isLoading ? (<Loader/>):
                    (
                        countryData && countryData?.data?.map((country, index)=>(

                            <Link to={`${country.name}`}>
                                <CountryCard
                                    name={country.name}
                                    image={country.flag}
                                    population={country.population}
                                    region={country.region}
                                    capital={country.capital}
                                />
                            </Link>
                        ))
                    )

                }


            </div>

        </React.Fragment>

    )
}

const mapStateToProps = state => ({
    countries: state.countries.countries,
    country: state.countries.searchedCountry

});

export default connect(mapStateToProps, {getAllCountriesThunk, getSearchedCountryThunk,
    getCountrybyNameThunk})(Home);