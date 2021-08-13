import React, { useEffect, useState, useMemo } from "react";
import PaginationComponent from "react-bootstrap/Pagination";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSortAmountDown, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

// json-server --watch data/db.json --port 8000
const DataTable = () => {
    const [comments, setComments] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [ItemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");
    const [EditName, setEditName] = useState(false);
    const [IdforEditName, setIdforEditName] = useState();

    const headers = [
        { name: "ID", field: "id", sortable: true },
        { name: "Name", field: "name", sortable: true },
        { name: "Origin", field: "origin", sortable: true },
        { name: "Destination", field: "destination", sortable: true },
        { name: "Total", field: "total", sortable: true },
        { name: "Status", field: "status", sortable: true },
        // { name: "Action", field: "", sortable: false }
    ];

    useEffect(() => {
        axios.get(`http://localhost:8000/shipments`)
            .then(res => {
                setComments(res.data);
                // console.log(res.data);

            })
            .catch(error => console.log(error.message))
        if (totalItems > 0 && ItemsPerPage > 0) {
            setTotalPages(Math.ceil(totalItems / ItemsPerPage));
        }

    }, [totalItems, ItemsPerPage]);
    const commentsData = useMemo(() => {
        let computedComments = comments;
        // // console.log("search", search,computedComments);
        if (search && computedComments) {
            computedComments = computedComments.filter(
                comment =>
                    comment.id.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(computedComments.length);

        //Sorting comments
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedComments = computedComments.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }

        //Current Page slice
        return computedComments.slice(
            (currentPage - 1) * ItemsPerPage,
            (currentPage - 1) * ItemsPerPage + ItemsPerPage
        );
    }, [comments, currentPage, search, sorting, ItemsPerPage]);

    const paginationItems = useMemo(() => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <PaginationComponent.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </PaginationComponent.Item>
            );
        }

        return pages;
    }, [totalPages, currentPage]);


    const onInputChange = value => {
        setSearch(value);
        setCurrentPage(1);
    };


    const onSortingChange = (field) => {
        const order =
            field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

        setSortingField(field);
        setSortingOrder(order);
        // onSorting(field, order);
        setSorting({ field, order })
    };

    return (
        <div>
            <div className="">
                <h1>Shipments</h1>
                <div className="row w-100">
                    <div className="col mb-3 col-12 text-center ">
                        <div className="d-flex justify-content-between mb-3">
                            <div className="">
                                <span>Show </span>
                                <select
                                    className="btn btn-secondary"
                                    defaultValue={ItemsPerPage}
                                    onChange={e => { setItemsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}
                                >
                                    <option className="bg-white text-muted">2</option>
                                    <option className="bg-white text-muted">3</option>
                                    <option className="bg-white text-muted">5</option>
                                    <option className="bg-white text-muted">10</option>
                                </select>

                                <span> Entries</span>

                            </div>
                            <div className="">

                                <input
                                    type="text"
                                    className="form-control"
                                    style={{ width: "240px" }}
                                    placeholder="Search"
                                    value={search}
                                    onChange={e => onInputChange(e.target.value)}
                                />
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table className="table table-striped table-bordered align-middle">

                                <thead>
                                    <tr>
                                        {headers.map(({ name, field, sortable }) => (
                                            <th
                                                key={name}
                                                onClick={() =>
                                                    sortable ? onSortingChange(field) : null
                                                }
                                                style={{ cursor: "pointer" }}
                                            >
                                                {name} &nbsp;

                                                {sortingField && sortingField === field && (
                                                    <FontAwesomeIcon
                                                        icon={
                                                            sortingOrder === "asc"
                                                                ? faSortAmountDown
                                                                : faSortAmountUp
                                                        }
                                                    />
                                                )}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {commentsData.map(comment => (

                                        <tr key={comment.id}>
                                            <th scope="row" >
                                                {comment.id}
                                            </th>
                                            <td class="col-4">
                                                {
                                                    EditName && IdforEditName === comment.id ?
                                                        <div className="d-flex">
                                                            <div className="col-11 p-0">
                                                                <input type="text" />
                                                            </div>
                                                            <div className="col-1 p-0">
                                                                <FontAwesomeIcon
                                                                    icon={faCheckCircle}
                                                                    onClick={() => { setEditName(!EditName); setIdforEditName(comment.id) }}
                                                                ></FontAwesomeIcon></div>
                                                        </div>
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

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="d-flex justify-content-end">
                            <PaginationComponent>
                                <PaginationComponent.Prev
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                />
                                {paginationItems}
                                <PaginationComponent.Next
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                />
                            </PaginationComponent>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataTable;