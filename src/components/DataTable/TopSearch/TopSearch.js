import React, { useState } from "react";

const TopSearch = ({ onSearch }) => {
    const [search, setSearch] = useState("");

    const onInputChange = value => {
        setSearch(value);
        onSearch(value);
    };
    return (
        <input
            type="text"
            className="form-control searchInput"
            style={{ width: "240px" }}
            placeholder="Search by ID"
            value={search}
            onChange={e => onInputChange(e.target.value)}
        />
    );
};

export default TopSearch;