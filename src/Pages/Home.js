import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import Navbar from '../components/Navbar/Navbar';
import DataTable from '../components/DataTable/DataTable';

const Home = () => {
    return (
        <div>
            {/* <Navbar></Navbar> */}
            <div className="container">
                <DataTable></DataTable>
            </div>
        </div>
    );
};

export default Home;