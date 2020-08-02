import React, {useState} from 'react';
import "./CountryCard.scss"
import {formatNumber} from "../../lib/lib";
import Loader from "../Loader/Loader";


const CountryCard = ({name, population, image, region, capital}) => {

    const [isLoading, setIsLoading] = useState(false)
    return (
        <React.Fragment>
            <div className="card">
                {isLoading ? <Loader/> :
                    <img src={image} alt="country" className="card__image"/>

                }
              <div className="card__details">
               <div className="card__details--name">
                   <h4> {name}</h4>
               </div>
                  <div className="list">
                      <p> Population: {formatNumber(population)}</p>
                      <p> Region: {region}</p>
                      <p> Capital: {capital || 'none'}</p>
                  </div>
              </div>
            </div>

        </React.Fragment>

    )
}

export default CountryCard;