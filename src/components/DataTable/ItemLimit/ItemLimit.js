import React from 'react';

const ItemLimit = ({ItemsPerPage,onChange}) => {
    return (
        <select
            className="btn btn-secondary"
            defaultValue={ItemsPerPage}
            onChange={e =>  onChange(e.target.value)}
        >
            <option className="bg-white text-muted">5</option>
            <option className="bg-white text-muted">10</option>
            <option className="bg-white text-muted">20</option>
        </select>
    );
};

export default ItemLimit;