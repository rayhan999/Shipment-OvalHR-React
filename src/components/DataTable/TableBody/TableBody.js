import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlane, faShip, faSortAmountDown, faSortAmountUp, faWater, faWind } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { Link } from 'react-router-dom';
import axios from 'axios';

const TableBody = ({commentsData}) => {
    const [EditName, setEditName] = useState(false);
    const [IdforEditName, setIdforEditName] = useState();
    const [InputName, setInputName] = useState(null);

    const handleNameClick = async (comment, id) => {
        // console.log(InputName);
        // console.log(id);
        if (InputName === null) {
            setEditName(!EditName);
        } else {
            const newData = {
                ...comment,
                name: InputName
            }
            // console.log("newdata",newData);
            await axios.put(`${process.env.REACT_APP_API}/${id}`, newData)
                .then(res => {
                    // setComments(res.data);
                    // console.log(res.data);
                    setEditName(!EditName);

                })
                .catch(error => console.log(error.message))
        }
    }
    return (
        <tbody>
            {commentsData.map(comment => (

                <tr key={comment.id}>
                    <th scope="row" >
                        {comment.id}
                    </th>
                    <td data-th="Name">
                        {
                            EditName && IdforEditName === comment.id ?
                                // <form onSubmit={handleSubmit}>
                                <div className="d-flex">

                                    <div className="col-11 p-0">
                                        <input type="text" name="name" onChange={e => setInputName(e.target.value)} />
                                    </div>
                                    <div className="col-1 p-0 checkIcon">
                                        <FontAwesomeIcon
                                            icon={faCheckCircle}
                                            onClick={() => handleNameClick(comment, comment.id)}
                                        ></FontAwesomeIcon>
                                    </div>

                                </div>
                                // </form>
                                :
                                <div className="d-flex">
                                    <div className="col-11 p-0">
                                        <Link to={`shipments/${comment.id}`} style={{ textDecoration: "none" }}>{comment.name}</Link>
                                    </div>
                                    <div className="col-1 p-0 editIcon">
                                        <FontAwesomeIcon
                                            icon={faEdit}
                                            onClick={() => { setEditName(!EditName); setIdforEditName(comment.id) }}
                                        ></FontAwesomeIcon>
                                    </div>
                                </div>

                        }

                    </td>
                    <td data-th="Origin"><div>{comment.origin}</div></td>
                    <td data-th="Destination"><div>{comment.destination}</div></td>
                    <td data-th="Mode"><div>
                        {/* {comment.mode} */}
                        <FontAwesomeIcon icon={
                            comment.mode === 'air' ? faShip : faPlane
                        }></FontAwesomeIcon>
                        </div></td>
                    <td data-th="Type"><div>{comment.type}</div></td>
                    <td data-th="Total"><div>{comment.total}</div></td>
                    <td data-th="Status">
                        <div className=
                            {comment.status === "NEW" ? "text-blue"
                                : comment.status === "ACTIVE" ? "text-yellow"
                                    : "text-green"}>
                            {comment.status}
                        </div>
                    </td>
                    <td data-th="UserID"><div>{comment.userId}</div></td>
                </tr>
            ))}
        </tbody>
    );
};

export default TableBody;