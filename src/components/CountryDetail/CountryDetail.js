import React, {useEffect} from "react";
import { withRouter } from 'react-router-dom';
import backIcon from '../../icons/left-arrow.svg'

import "./CountryDetail.scss"
import getCountrybyNameThunk from "../../redux/actions/fetchCountryByName";
import {connect} from "react-redux";
import {formatNumber} from "../../lib/lib";


const CountryDetail = ({getCountrybyNameThunk,
                           count,
                           match: { params },
                           ...props})=>{


    useEffect(()=>{
         getCountrybyNameThunk({name: params.name});

    }, []);

const lang =  count?.data[0]?.languages.map((language, i)=>(
    language.name
))
    const population = count?.data[0].population

    return(
        <React.Fragment>
            <div className="button">
                <button className="back" onClick={props.history.goBack}>
                    <img src={backIcon} className="back__icon"/>
                    Back
                </button>
            </div>

            <div className="details">
                <img src={count?.data[0].flag} alt="image" className="details__image"/>
              <div className="details__name">
                  <h2>{count?.data[0].name}</h2>
                  <div className="details__name--list">
                      <p> <b>Native Name</b>: {count?.data[0].nativeName}</p>
                      <p> <b>Region</b>: {count?.data[0].region}</p>
                      <p> <b>Capital</b>: {count?.data[0].capital}</p>
                      <p> <b>Currencies</b>: {count?.data[0].currencies[0].code}</p>
                      <p> <b>Population</b>: {population}</p>
                      <p> <b>Sub Region</b>: {count?.data[0].subregion}</p>
                      <p> <b>Top Level Domain</b>: {count?.data[0].topLevelDomain[0]}</p>
                      <p> <b>Languages</b>: {lang?.join(' , ')}
                      </p>
                  </div>
                  <div className="details__name--border">
                      <h4>Border Countries:
                          {
                              count?.data[0].borders.length === 0 &&
                                  <p> No Border Country</p>
                          }

                          {count?.data[0].borders.length > 0 &&
                          count?.data[0].borders.map((border, i)=>(
                              <span className="btn">{border}</span>

                          ))
                          }
                      </h4>
                  </div>


              </div>
            </div>


        </React.Fragment>

    )
}

const mapStateToProps = state => ({
    count: state.countries.countryDetail
});


export default connect(mapStateToProps, {getCountrybyNameThunk})(withRouter(CountryDetail));