import React, { useEffect, useState, useMemo } from "react";
import PaginationComponent from "react-bootstrap/Pagination";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSearch, faSortAmountDown, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useForm } from "react-hook-form";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import './DataTable.css';
import Pagination from "./PaginationComponent/PaginationComponent";
import TopSearch from "./TopSearch/TopSearch";
import TableHeader from "./TableHeader/TableHeader";
import ItemLimit from "./ItemLimit/ItemLimit";
import TableBody from "./TableBody/TableBody";

const DataTable = () => {
    const [comments, setComments] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [ItemsPerPage, setItemsPerPage] = useState(10);

    const headers = [
        { name: "ID", field: "id", sortable: true },
        { name: "Name", field: "name", sortable: true },
        { name: "Origin", field: "origin", sortable: true },
        { name: "Destination", field: "destination", sortable: true },
        { name: "Mode", field: "mode", sortable: true },
        { name: "Type", field: "type", sortable: true },
        { name: "Total", field: "total", sortable: true },
        { name: "Status", field: "status", sortable: true },
        { name: "UserID", field: "userId", sortable: true }
    ];
    useEffect(() => {
        // getComments()
        axios.get(`${process.env.REACT_APP_API}`)
            .then(res => {
                setComments(res.data);
                // console.log(res.data);

            })
            .catch(error => console.log(error.message))
    }, [comments]);

    const commentsData = useMemo(() => {
        let computedComments = comments;
        if (search && computedComments) {
            computedComments = computedComments.filter(
                comment =>
                    comment.id.toLowerCase().includes(search.toLowerCase())
            );
        }
        setTotalItems(computedComments.length);
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedComments = computedComments.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }
        return computedComments.slice(
            (currentPage - 1) * ItemsPerPage,
            (currentPage - 1) * ItemsPerPage + ItemsPerPage
        );
    }, [comments, currentPage, search, sorting, ItemsPerPage]);

    return (
        <div>
            <div className="">
                <h1 className="text-secondary mb-3">Shipments List</h1>
                <div className="row w-100">
                    <div className="col mb-3 col-12 ">
                        <div className="d-flex justify-content-between mb-3">
                            <div className="">
                                <span>Show  &nbsp;
                                    <ItemLimit
                                        ItemsPerPage={ItemsPerPage}
                                        onChange={value => {
                                            setItemsPerPage(parseInt(value));
                                            setCurrentPage(1);
                                        }}
                                    />

                                    &nbsp; Entries</span>

                            </div>
                            <div className="topSearch">
                               <TopSearch
                                    onSearch={value => {
                                        setSearch(value);
                                        setCurrentPage(1);
                                    }}
                                /> 
                                <FontAwesomeIcon icon={faSearch} className="searchIcon"></FontAwesomeIcon>
                            </div>
                        </div>
                        <div className="shipmentTable table-responsive">
                            <table className="table table-striped table-borderless ">
                                <TableHeader
                                    headers={headers}
                                    onSorting={(field, order) =>
                                        setSorting({ field, order })
                                    }
                                />
                                <TableBody
                                    commentsData={commentsData}
                                />
                            </table>
                        </div>
                        <div className="d-flex justify-content-end">

                            <Pagination
                                total={totalItems}
                                itemsPerPage={ItemsPerPage}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataTable;