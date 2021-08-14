import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [navActice, setNavActive] = useState(false);
    const changeNavBG = () => {
        if (window.scrollY > 80) {
            setNavActive(true);
        } else { setNavActive(false); }
    }
    window.addEventListener('scroll', changeNavBG);
    return (
        <nav className= "navbar navbar-expand-lg bg-primary mb-5"  >
            <h1 className="navbar-brand " style={{ fontWeight: 'bold', color: 'white' }} >OVAL-HR</h1>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon float-end"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item ">
                       <NavLink className="nav-link mr-5 " to="/">Shipments </NavLink>
                    </li>
                    
                   
                    
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;