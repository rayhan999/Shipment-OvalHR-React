import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAltV, faEdit, faSortAmountDown, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';

const TableHeader = ({ headers, onSorting }) => {
    const [sortingField, setSortingField] = useState();
    const [sortingOrder, setSortingOrder] = useState("asc");

    const onSortingChange = (field) => {
        const order =
            field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

        setSortingField(field);
        setSortingOrder(order);
        onSorting(field, order);
    };
    return (
        <thead>
            <tr>
                {headers.map(({ name, field, sortable }) => (
                    <th
                        key={name}
                        onClick={() =>
                            sortable ? onSortingChange(field) : null
                        }
                    >
                        {name} &nbsp;
                        {sortingField && sortingField === field ? (
                            <FontAwesomeIcon
                                icon={
                                    sortingOrder === "asc"
                                        ? faSortAmountDown
                                        : faSortAmountUp
                                }
                            />
                        )
                    :
                    <FontAwesomeIcon icon={faArrowsAltV} style={{opacity:0.3}}/>
                    }
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader;