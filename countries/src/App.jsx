import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setCountry(null);
  };

  const handleShowClick = (country) => {
    setCountry(country);
  };

  const filteredCountries = filter
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <Country country={filteredCountries[0]} />
      ) : (
        <>
          <Countries
            countries={filteredCountries}
            handleShowClick={handleShowClick}
          />
          {country && <Country country={country} />}
        </>
      )}
    </div>
  );
};

export default App;
