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
    const [region, setRegion] = useState('')
    const [filteredCountries, setFilteredCountries] = useState([])

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

// const filterCountry = (region)=>{
//
// }
//
// const filterCountry = (e)=>{
//       setRegion(e.target.textContent.toLowerCase())
// }


    // useEffect(() => {
    //     if (region !== '' && countries?.data.length !== 0) {
    //         setFilteredCountries(
    //             countries?.data.filter(({ region }) => {
    //                 return region.toLowerCase() === region
    //             })
    //         )
    //     }
    // }, [ region])

  const regions = [
        {
            name: 'Africa',
            value: 'africa',
        },
        {
            name: 'America',
            value: 'america',
        },
        {
            name: 'Asia',
            value: 'asia',
        },
      {
          name: 'Europe',
          value: 'europe',
      },
      {
          name: 'Oceania',
          value: 'oceania',
      },
      {
          name: 'Polar',
          value: 'polar',
      }
    ]


    useEffect(()=>{
        Promise.all([
            fetchCountries(),
    ])
    }, [])


    const countryData = searchText ? searchedCountry : countries?.data




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
                 value={region}
             >
                 <option>Filter by Region</option>
                     {
                         regions.map((reg, i)=>(
                             <option key={reg.value} value={reg.value}>{reg.name}</option>
                         ))
                     }

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