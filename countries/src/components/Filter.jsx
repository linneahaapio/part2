const Filter = ({ filter, handleFilterChange }) => (
  <div>
    find countries{" "}
    <input type="text" value={filter} onChange={handleFilterChange} />
  </div>
);

export default Filter;
