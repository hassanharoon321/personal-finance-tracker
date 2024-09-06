import React, { useState } from 'react';

const FilterBar = ({ onFilter }) => {
  const [filterType, setFilterType] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    onFilter({ filterType, startDate, endDate });
  };

  return (
    <div className="filter-bar">
      <label>
        Type:
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>
      <label>
        Start Date:
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </label>
      <label>
        End Date:
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </label>

      <button className="add-entry" onClick={handleFilter}>Apply Filters</button>
    </div>
  );
};

export default FilterBar;
