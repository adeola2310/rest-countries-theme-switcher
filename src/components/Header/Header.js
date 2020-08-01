import React from 'react';
import "./Header.scss"
import {Link} from "react-router-dom";
import moonIcon from "../../icons/moon.svg"


const Header = ({children}) => {

    const toggle = ()=>{
        document.body.classList.toggle('light')
    }


    return (
        <React.Fragment>

            <div className="header">
                <div className="header__content">
                    <Link to="/">
                        <h3>Where in the World?</h3>
                    </Link>
                   <img src={moonIcon} className="header__content--toggle" onClick={()=>toggle()}/>
                   <p onClick={()=>toggle()}>Dark Mode</p>
                </div>
            </div>

            {children}
        </React.Fragment>




    )
}

export default Header;