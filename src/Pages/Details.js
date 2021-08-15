import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Details = () => {
    const { id } = useParams();
    const [Value, setValue] = useState("");
    useEffect(() => {
        if (id) {
            axios.get(`${process.env.REACT_APP_API}/${id}`)
                .then(res => {
                    setValue(res.data);
                    console.log(res.data);

                })
                .catch(error => console.log(error.message))
        } else {
            alert("No ID");
        }
    }, [])
    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle">
                <thead className="text-center">
                    <tr>
                        <th scope="col" colSpan="2">Shipment Details</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">ID</th>
                        <td>{Value.id}</td>

                    </tr>
                    <tr>
                        <th scope="row">Name</th>
                        <td>{Value.name}</td>

                    </tr>
                    <tr>
                        <th scope="row">Cargo</th>
                        <td>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Type</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Volume</th>
                                    </tr>
                                </thead>
                                {
                                    Value.cargo && Value.cargo.map(car => (
                                        <tbody>
                                            <tr>
                                                <td>{car.type}</td>
                                                <td>{car.description}</td>
                                                <td>{car.volume}</td>
                                            </tr>
                                        </tbody>

                                    ))
                                }
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Mode</th>
                        <td>{Value.mode}</td>

                    </tr>
                    <tr>
                        <th scope="row">Type</th>
                        <td>{Value.type}</td>

                    </tr>
                    <tr>
                        <th scope="row">Destination</th>
                        <td>{Value.destination}</td>

                    </tr>
                    <tr>
                        <th scope="row">Origin</th>
                        <td>{Value.origin}</td>

                    </tr>
                    <tr>
                        <th scope="row">Services</th>
                        <td>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Type</th>
                                        <th scope="col">Value</th>
                                    </tr>
                                </thead>


                                {
                                    Value.services && Value.services.map(service => (
                                        <tbody>
                                            <tr>
                                                <td>{service.type}</td>
                                                <td>
                                                    {service.value ? service.value : "x"}
                                                </td>
                                            </tr>
                                        </tbody>

                                    ))
                                }



                            </table>

                        </td>

                    </tr>
                    <tr>
                        <th scope="row">Total</th>
                        <td>{Value.total}</td>

                    </tr>
                    <tr>
                        <th scope="row">Status</th>
                        <td>{Value.status}</td>

                    </tr>
                    <tr>
                        <th scope="row">User ID</th>
                        <td>{Value.userId}</td>

                    </tr>


                </tbody>
            </table>
        </div>
    );
};

export default Details;