import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSortAmountDown, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
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
                    <td >
                        {
                            EditName && IdforEditName === comment.id ?
                                // <form onSubmit={handleSubmit}>
                                <div className="d-flex">

                                    <div className="col-11 p-0">
                                        <input type="text" name="name" onChange={e => setInputName(e.target.value)} />
                                    </div>
                                    <div className="col-1 p-0">
                                        <FontAwesomeIcon
                                            icon={faCheckCircle}
                                            onClick={() => handleNameClick(comment, comment.id)}
                                        ></FontAwesomeIcon>
                                    </div>

                                </div>
                                // </form>
                                :
                                <div className="d-flex p-0">
                                    <div className="col-11 p-0">
                                        <Link to={`shipments/${comment.id}`} style={{ textDecoration: "none" }}>{comment.name}</Link>
                                    </div>
                                    <div className="col-1 p-0">
                                        <FontAwesomeIcon
                                            icon={faEdit}
                                            onClick={() => { setEditName(!EditName); setIdforEditName(comment.id) }}
                                        ></FontAwesomeIcon>
                                    </div>
                                </div>

                        }

                    </td>
                    <td>{comment.origin}</td>
                    <td>{comment.destination}</td>
                    <td>{comment.total}</td>
                    <td>
                        <span className=
                            {comment.status === "NEW" ? "bg-primary text-blue p-2"
                                : comment.status === "ACTIVE" ? "bg-warning text-yellow p-2"
                                    : "bg-success text-green p-2"}>
                            {comment.status}
                        </span>
                    </td>
                    <td>{comment.userId}</td>
                </tr>
            ))}
        </tbody>
    );
};

export default TableBody;