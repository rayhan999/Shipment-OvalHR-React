import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-primary mb-5 pt-3">
            <div className="container-fluid">
                <h1 class="navbar-brand" >OVAL-HR</h1>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon float-end"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto float-end" align="right">
                        <li class="nav-item ">
                            <Link class="nav-link active" aria-current="page" to="/">Shipments</Link>
                        </li>
                       
                        
                    </ul>

                </div>
            </div>
        </nav>
    </div>
    );
};

export default Navbar;